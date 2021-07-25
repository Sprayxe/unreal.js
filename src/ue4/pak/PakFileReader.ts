import { FPakInfo } from "./objects/FPakInfo";
import { Aes } from "../../encryption/aes/Aes";
import { GameFile } from "./GameFile";
import { InvalidAesKeyException, ParserException } from "../../exceptions/Exceptions";
import { FByteArchive } from "../reader/FByteArchive";
import { FPakEntry } from "./objects/FPakEntry";
import { sprintf } from "sprintf-js";
import { FFileArchive } from "../reader/FFileArchive";
import { Utils } from "../../util/Utils";
import { Compression } from "../../compression/Compression";
import { FArchive } from "../reader/FArchive";
import { EPakVersion } from "./enums/PakVersion";
import { Game } from "../versions/Game";
import { FPakCompressedBlock } from "./objects/FPakCompressedBlock";
import { Config } from "../../Config";

/**
 * UE4 Pak File Reader
 */
export class PakFileReader {
    /**
     * Path to file
     * @type {string}
     * @public
     */
    path: string

    /**
     * UE4 Reader
     * @type {FArchive}
     * @public
     */
    Ar: FArchive

    /**
     * Game that is used
     * @type {number}
     * @public
     */
    game: number

    /**
     * Info about pak
     * @type {FPakInfo}
     * @public
     */
    pakInfo: FPakInfo

    /**
     * Aes key for pak
     * @type {?Buffer}
     * @public
     */
    aesKey: Buffer = null

    /**
     * Mount point for pak
     * @type {string}
     * @public
     */
    mountPoint: string

    /**
     * Amount of encrypted files
     * @type {number}
     * @public
     */
    encryptedFileCount = 0

    /**
     * Files in this pak
     * @type {Array<GameFile>}
     * @public
     */
    files: GameFile[]

    /**
     * Creates an instance
     * @param {string} path Path to file
     * @param {?number} game Game that is used
     * @param {?Buffer} source Source buffer if it's not an existing file
     * @constructor
     * @public
     */
    constructor(path: string, game?: number, source?: Buffer) {
        this.path = path
        this.Ar = source != null ? new FByteArchive(source) : new FFileArchive(path)
        this.Ar.game = this.game = game || Game.GAME_UE4(Game.LATEST_SUPPORTED_UE4_VERSION)
        this.Ar.ver = Game.GAME_UE4_GET_AR_VER(this.game)
        this.pakInfo = FPakInfo.readPakInfo(this.Ar)
    }

    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString() {
        return this.path
    }

    /**
     * Whether if it is encrypted or not
     * @returns {boolean}
     * @public
     */
    isEncrypted() {
        return this.pakInfo.encryptedIndex
    }

    /**
     * Extracts a file
     * @param {GameFile} gameFile File to extract
     * @returns {Buffer}
     * @public
     */
    extract(gameFile: GameFile): Buffer {
        if (gameFile.pakFileName !== this.path)
            throw new Error(`Wrong pak file reader, required ${gameFile.pakFileName}, this is ${this.path}`)
        // If this reader is used as a concurrent reader create a clone of the main reader to
        // provide thread safety
        const exAr = this.Ar
        exAr.pos = gameFile.pos
        // Pak Entry is written before the file data,
        // but its the same as the one from the index, just without a name
        const tempEntry = new FPakEntry(exAr, this.pakInfo, false)
        for (const it of tempEntry.compressionBlocks) {
            it.compressedStart += gameFile.pos
            it.compressedEnd += gameFile.pos
        }
        if (gameFile.isCompressed()) {
            if (Config.GDebug) console.debug(`${gameFile.getName()} is compressed with ${gameFile.compressionMethod}`)
            const uncompressedBuffer = Buffer.alloc(gameFile.uncompressedSize)
            let uncompressedBufferOff = 0
            for (const block of tempEntry.compressionBlocks) {
                exAr.pos = block.compressedStart
                let srcSize = block.compressedEnd - block.compressedStart
                // Read the compressed block
                let compressedBuffer: Buffer
                if (gameFile.isEncrypted) {
                    // The compressed block is encrypted, align it and then decrypt
                    if (!this.aesKey) {
                        throw new ParserException("Decrypting a encrypted file requires an encryption key to be set")
                    }
                    srcSize = Utils.align(srcSize, Aes.BLOCK_SIZE)
                    const buf = exAr.read(srcSize)
                    compressedBuffer = Aes.decrypt(buf, this.aesKey)
                } else {
                    // Read the block data
                    compressedBuffer = exAr.read(srcSize)
                }
                // Calculate the uncompressed size,
                // its either just the compression block size
                // or if its the last block its the remaining data size
                const uncompressedSize = Math.min(gameFile.compressionBlockSize, gameFile.uncompressedSize - uncompressedBufferOff)
                Compression.uncompress(gameFile.compressionMethod, uncompressedBuffer, uncompressedBufferOff, uncompressedSize, compressedBuffer, 0, srcSize)
                uncompressedBufferOff += gameFile.compressionBlockSize
            }
            return uncompressedBuffer
        } else if (gameFile.isEncrypted) {
            if (Config.GDebug) console.debug(`${gameFile.getName()} is encrypted, decrypting`)
            if (this.aesKey) {
                throw new ParserException("Decrypting a encrypted file requires an encryption key to be set")
            }
            // AES is block encryption, all encrypted blocks need to be 16 bytes long,
            // fix the game file length by growing it to the next multiple of 16 bytes
            const newLength = Utils.align(gameFile.size, Aes.BLOCK_SIZE)
            const buffer = Aes.decrypt(exAr.read(newLength), this.aesKey)
            return buffer.subarray(0, gameFile.size)
        } else {
            return exAr.read(gameFile.size)
        }
    }

    /**
     * Reads index of pak
     * @returns {Array<GameFile>} Files
     * @public
     */
    readIndex(): GameFile[] {
        this.encryptedFileCount = 0
        this.Ar.pos = this.pakInfo.indexOffset

        // this.readAndDecrypt()
        let buf = this.Ar.read(this.pakInfo.indexSize)
        if (this.isEncrypted()) {
            const key = this.aesKey
            if (!key)
                throw new ParserException("Reading this pak requires an encryption key")
            buf = Aes.decrypt(buf, key)
        }
        const indexAr = new FByteArchive(buf)

        let mountPoint: string
        try {
            mountPoint = indexAr.readString()
        } catch (e) {
            throw new InvalidAesKeyException(
                `Given encryption key '0x${this.aesKey.toString("hex")}' is not working with '${this.path}'`)
        }

        this.mountPoint = this.fixMountPoint(mountPoint)
        const files = this.pakInfo.version >= EPakVersion.PakVersion_PathHashIndex ? this.readIndexUpdated(indexAr) : this.readIndexLegacy(indexAr)

        // Print statistics
        let stats = sprintf("Pak \"%s\": %d files", this.path, this.files.length)
        if (this.encryptedFileCount)
            stats += sprintf(" (%d encrypted)", this.encryptedFileCount)
        if (this.mountPoint.includes("/"))
            stats += sprintf(", mount point: \"%s\"", this.mountPoint)
        console.info(stats + ", version %d", this.pakInfo.version)

        return files
    }

    /**
     * Reads index of old pak
     * @returns {Array<GameFile>} Files
     * @public
     */
    private readIndexLegacy(indexAr: FByteArchive): GameFile[] {
        const fileCount = indexAr.readInt32()

        const tempMap = new Map<string, GameFile>()
        for (let i = 0; i < fileCount; i++) {
            const entry = new FPakEntry(indexAr, this.pakInfo, true)
            const gameFile = new GameFile(entry, this.mountPoint, this.path)
            if (gameFile.isEncrypted)
                this.encryptedFileCount++
            tempMap.set(gameFile.path.toLowerCase(), gameFile)
        }

        const files = []
        for (const [_, it] of tempMap) {
            if (it.isUE4Package()) {
                const uexp = tempMap.get(PakFileReader.extension(_, ".uexp"))
                if (uexp != null) it.uexp = uexp;
                const ubulk = tempMap.get(PakFileReader.extension(_, ".ubulk"))
                if (ubulk != null) it.uexp = ubulk;
                files.push(it)
            } else {
                if (!it.path.endsWith(".uexp") && !it.path.endsWith(".ubulk"))
                    files.push(it)
            }
        }

        return this.files = files
    }

    /**
     * Reads index of new pak
     * @returns {Array<GameFile>} Files
     * @public
     */
    private readIndexUpdated(primaryIndexAr: FByteArchive): GameFile[] {
        const fileCount = primaryIndexAr.readInt32()
        primaryIndexAr.pos += 8 // PathHashSeed

        if (!primaryIndexAr.readBoolean())
            throw new ParserException("No path hash index", primaryIndexAr)

        primaryIndexAr.pos += 36 // PathHashIndexOffset (long) + PathHashIndexSize (long) + PathHashIndexHash (20 bytes)

        if (!primaryIndexAr.readBoolean())
            throw new ParserException("No directory index", primaryIndexAr)

        const directoryIndexOffset = Number(primaryIndexAr.readInt64())
        const directoryIndexSize = Number(primaryIndexAr.readInt64())
        primaryIndexAr.pos += 20 // Directory Index hash

        const encodedPakEntriesSize = primaryIndexAr.readInt32()
        const encodedPakEntries = primaryIndexAr.read(encodedPakEntriesSize)
        const encodedPakEntriesAr = new FByteArchive(encodedPakEntries)

        if (primaryIndexAr.readInt32() < 0)
            throw new ParserException("Corrupt pak PrimaryIndex detected!", primaryIndexAr)

        this.Ar.pos = directoryIndexOffset

        // this.readAndDecrypt()
        let buf = this.Ar.read(directoryIndexSize)
        if (this.isEncrypted()) {
            const key = this.aesKey
            if (!key)
                throw new ParserException("Reading this pak requires an encryption key")
            buf = Aes.decrypt(buf, key)
        }
        const directoryIndexAr = new FByteArchive(buf)

        const directoryIndexNum = directoryIndexAr.readInt32()
        const tempMap = new Map<string, GameFile>()
        for (let i = 0; i < directoryIndexNum; i++) {
            const directory = directoryIndexAr.readString()
            const filesNum = directoryIndexAr.readInt32()
            for (let j = 0; j < filesNum; j++) {
                const file = directoryIndexAr.readString()
                const path = directory + file
                encodedPakEntriesAr.pos = directoryIndexAr.readInt32()
                const entry = this.readBitEntry(encodedPakEntriesAr)
                entry.name = path
                if (entry.isEncrypted)
                    this.encryptedFileCount++
                tempMap.set(path.toLowerCase(), new GameFile(entry, this.mountPoint, this.path))
            }
        }

        const files = []
        for (const [_, it] of tempMap) {
            if (it.isUE4Package()) {
                const uexp = tempMap.get(PakFileReader.extension(_, ".uexp"))
                if (uexp != null) it.uexp = uexp;
                const ubulk = tempMap.get(PakFileReader.extension(_, ".ubulk"))
                if (ubulk != null) it.uexp = ubulk;
                files.push(it)
            } else {
                if (!it.path.endsWith(".uexp") && !it.path.endsWith(".ubulk"))
                    files.push(it)
            }
        }

        return this.files = files
    }

    /**
     * Reads bit entry
     * @param {FByteArchive} Ar Reader to use
     * @returns {FPakEntry} Entry
     * @private
     */
    private readBitEntry(Ar: FByteArchive) {
        // Grab the big bitfield value:
        // Bit 31 = Offset 32-bit safe?
        // Bit 30 = Uncompressed size 32-bit safe?
        // Bit 29 = Size 32-bit safe?
        // Bits 28-23 = Compression method
        // Bit 22 = Encrypted
        // Bits 21-6 = Compression blocks count
        // Bits 5-0 = Compression block size

        let compressionMethodIndex: number = null
        let compressionBlockSize: number = null
        let offset: number = null
        let uncompressedSize: number = null
        let size: number = null
        let encrypted: boolean = null
        let compressionBlocks: FPakCompressedBlock[] = null

        const value = Ar.readUInt32()

        // Filter out the CompressionMethod.
        compressionMethodIndex = (value >> 23) & 0x3f

        // Test for 32-bit safe values. Grab it, or memcpy the 64-bit value
        // to avoid alignment exceptions on platforms requiring 64-bit alignment
        // for 64-bit variables.
        //

        // Read the Offset.
        const isOffset32BitSafe = (value & (1 << 31)) !== 0
        offset = isOffset32BitSafe ?
            Ar.readUInt32() :
            Number(Ar.readInt64())

        // Read the UncompressedSize.
        const isUncompressedSize32BitSafe = (value & (1 << 30)) !== 0
        uncompressedSize = isUncompressedSize32BitSafe ?
            Ar.readUInt32() :
            Number(Ar.readInt64())

        // Fill in the Size.
        if (compressionMethodIndex !== 0) {
            // Size is only present if compression is applied.
            const isSize32BitSafe = (value & (1 << 29)) !== 0
            if (isSize32BitSafe) {
                size = Ar.readUInt32()
            } else {
                size = Number(Ar.readInt64())
            }
        } else {
            // The Size is the same thing as the UncompressedSize when
            // CompressionMethod == COMPRESS_None.
            size = uncompressedSize
        }

        // Filter the encrypted flag.
        encrypted = (value & (1 << 22)) !== 0

        // This should clear out any excess CompressionBlocks that may be valid in the user's
        // passed in entry.
        const compressionBlocksCount = (value >> 6) & 0xffff

        compressionBlocks = new Array(compressionBlocksCount)
        for (let i = 0; i < compressionBlocksCount; ++i) {
            compressionBlocks[i] = new FPakCompressedBlock(0, 0)
        }

        // Filter the compression block size or use the UncompressedSize if less that 64k.
        compressionBlockSize = 0
        if (compressionBlocksCount > 0) {
            compressionBlockSize = uncompressedSize < 65536 ? uncompressedSize : ((value & 0x3f) << 11)
        }

        // Set bDeleteRecord to false, because it obviously isn't deleted if we are here.
        //deleted = false Not needed

        // Base offset to the compressed data
        const baseOffset = this.pakInfo.version >= EPakVersion.PakVersion_RelativeChunkOffsets ? 0 : offset

        // Handle building of the CompressionBlocks array.
        if (compressionBlocks.length === 1 && !encrypted) {
            // If the number of CompressionBlocks is 1, we didn't store any extra information.
            // Derive what we can from the entry's file offset and size.
            const compressedBlock = compressionBlocks[0]
            compressedBlock.compressedStart = baseOffset + FPakEntry.getSerializedSize(this.pakInfo.version, compressionMethodIndex, compressionBlocksCount)
            compressedBlock.compressedEnd = compressedBlock.compressedStart + size
        } else if (compressionBlocks.length) {
            // Get the right pointer to start copying the CompressionBlocks information from.

            // Alignment of the compressed blocks
            const compressedBlockAlignment = encrypted ? Aes.BLOCK_SIZE : 1

            // CompressedBlockOffset is the starting offset. Everything else can be derived from there.
            let compressedBlockOffset = baseOffset + FPakEntry.getSerializedSize(this.pakInfo.version, compressionMethodIndex, compressionBlocksCount)
            for (const compressedBlock of compressionBlocks) {
                compressedBlock.compressedStart = compressedBlockOffset
                compressedBlock.compressedEnd = compressedBlockOffset + Ar.readUInt32()
                const align = compressedBlock.compressedEnd - compressedBlock.compressedStart
                compressedBlockOffset += align + compressedBlockAlignment - (align % compressedBlockAlignment)
            }
        }

        //TODO There is some kind of issue here, compression blocks are sometimes going to far by one byte
        for (const it of compressionBlocks) {
            it.compressedStart = it.compressedStart + offset
            it.compressedEnd = it.compressedEnd + offset
        }

        const entry = new FPakEntry()
        entry.pos = offset
        entry.size = size
        entry.uncompressedSize = uncompressedSize
        entry.compressionMethod = this.pakInfo.compressionMethods[compressionMethodIndex]
        entry.compressionBlocks = compressionBlocks
        entry.isEncrypted = encrypted
        entry.compressionBlockSize = compressionBlockSize
        return entry
    }

    /**
     * Replaces a file extension
     * @param {string} k Source
     * @param {string} v Replacement
     * @returns {string}
     * @private
     * @static
     */
    private static extension(k: string, v: string): string {
        return k.endsWith(".uasset")
            ? k.replace(".uasset", v)
            : k.replace(".umap", v);
    }

    /**
     * Reads and decrypts data
     * - DEPRECATED: Inline this method
     * @param {number} num Amount of bytes to read
     * @param {boolean} isEncrypted Whether if those are encrypted
     * @returns {Buffer} Bytes
     * @private
     * @deprecated
     */
    private readAndDecrypt(num: number, isEncrypted: boolean = this.isEncrypted()): Buffer {
        let data = this.Ar.read(num)
        if (isEncrypted) {
            const key = this.aesKey
            if (!key)
                throw new ParserException("Reading this pak requires an encryption key")
            data = Aes.decrypt(data, key)
        }
        return data
    }

    /**
     * Fixes a mount point
     * @param {string} mountPoint Current mount point
     * @returns {string}
     * @private
     */
    private fixMountPoint(mountPoint: string) {
        let badMountPoint = false
        if (!mountPoint.startsWith("../../.."))
            badMountPoint = true
        else
            mountPoint = mountPoint.replace("../../..", "")
        if (mountPoint[0] !== '/' || (mountPoint.length > 1 && mountPoint[1] === '.'))
            badMountPoint = true
        if (badMountPoint) {
            //console.warn(`Pak \"${this.path}\" has strange mount point \"${mountPoint}\", mounting to root`)
            mountPoint = "/"
        }
        if (mountPoint.startsWith('/'))
            mountPoint = mountPoint.substring(1)
        return mountPoint;
    }

    /**
     * Checks index bytes
     * @returns {Buffer} Index bytes
     * @public
     */
    indexCheckBytes(): Buffer {
        this.Ar.pos = this.pakInfo.indexOffset
        return this.Ar.read(128)
    }

    /**
     * Tests if an aes key works
     * @param {string} key Aes key to test
     * @returns {boolean}
     * @public
     */
    testAesKey(key: string)

    /**
     * Tests if an aes key works
     * @param {Buffer} key Aes key to test
     * @returns {boolean}
     * @public
     */
    testAesKey(key: Buffer)

    /**
     * Tests if an aes key works with specified bytes
     * @param {Buffer} bytes Bytes to test
     * @param {Buffer} key Key to test
     * @returns {boolean}
     * @public
     */
    testAesKey(bytes: Buffer, key: Buffer)

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    testAesKey(x?: any, y?: any) {
        if (!y) {
            if (Buffer.isBuffer(x)) {
                if (!this.isEncrypted())
                    return true
                return this.testAesKey(this.indexCheckBytes(), x)
            } else {
                return this.testAesKey(Buffer.from(x.startsWith("0x") ? x.substring(2) : x, "hex"))
            }
        } else {
            x = Aes.decrypt(x, y)
            return this.isValidIndex(x)
        }
    }

    /**
     * Whether if pak has valid index
     * @param {Buffer} bytes Bytes to read from
     * @returns {boolean} Result
     * @public
     */
    isValidIndex(bytes: Buffer): boolean {
        const testAr = new FByteArchive(bytes)
        const stringLength = testAr.readUInt32()
        if (stringLength > 128 || stringLength < -128)
            return false
        // Calculate the pos of the null terminator for this string
        // Then read the null terminator byte and check whether it is actually 0
        if (stringLength === 0) {
            return testAr.readInt8() === 0
        } else if (stringLength < 0) {
            // UTF16
            testAr.pos = 4 - (stringLength - 1) * 2
            return testAr.readInt16() === 0
        } else {
            // UTF8
            testAr.pos = 4 + stringLength - 1
            return testAr.readInt8() === 0
        }
    }
}