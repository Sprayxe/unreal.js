import { FPakArchive } from "./reader/FPakArchive";
import { GAME_UE4, GAME_UE4_GET_AR_VER, LATEST_SUPPORTED_UE4_VERSION } from "../versions/Game";
import * as fs from "fs";
import { FPakInfo } from "./objects/FPakInfo";
import { DataTypeConverter } from "../../util/DataTypeConverter";
import { Aes, BLOCK_SIZE } from "../../encryption/aes/Aes";
import { GameFile } from "./GameFile";
import { InvalidAesKeyException, ParserException } from "../../exceptions/Exceptions";
import { FByteArchive } from "../reader/FByteArchive";
import { FPakEntry } from "./objects/FPakEntry";
import { sprintf } from "sprintf-js";
import { FPakFileArchive } from "./reader/FPakFileArchive";
import { FPakCompressedBlock } from "./objects/FPakCompressedBlock";
import { Utils } from "../../util/Utils";
import { PakVersion_PathHashIndex, PakVersion_RelativeChunkOffsets } from "./enums/PakVersion";
import { UnrealMap } from "../../util/UnrealMap";
import { Compression } from "../../compression/Compression";
import { File } from "../../util/File";

type FPathHashIndex = UnrealMap<number, number>
type FPakDirectory = UnrealMap<string, number>
type FDirectoryIndex = UnrealMap<string, FPakDirectory>

export class PakFileReader {
    Ar: FPakArchive
    keepIndexData: boolean
    file: Buffer
    game: number

    constructor(file: string | Buffer, game?: number)
    constructor(Ar: FPakArchive, keepIndexData?: boolean)
    constructor(x?: any, y?: any) {
        if (x instanceof FPakArchive) {
            this.Ar = x
            this.keepIndexData = y || false
        } else {
            this.file = x instanceof Buffer ? x : fs.readFileSync(x)
            this.Ar = new FPakFileArchive(this.file, new File("", this.file))
            this.game = y || GAME_UE4(LATEST_SUPPORTED_UE4_VERSION)
            this.Ar.game = this.game
            this.Ar.ver = GAME_UE4_GET_AR_VER(this.game)
        }
    }

    concurrent = false

    fileName: string
    pakInfo: FPakInfo

    aesKey: Buffer = null
    get aesKeyStr() {
        return DataTypeConverter.printHexBinary(this.aesKey)
    }
    set aesKeyStr(value: string) {
        this.aesKey = Aes.parseKey(value)
    }

    mountPrefix: string

    fileCount = 0
    encryptedFileCount = 0
    files: GameFile[]

    pathHashIndex: FPathHashIndex
    directoryIndex: FDirectoryIndex

    toString() {
        return this.fileName
    }

    isEncrypted() {
        return this.pakInfo.encryptedIndex
    }

    extract(gameFile: GameFile) {
        return this.extractBuffer(gameFile)
    }

    extractBuffer(gameFile: GameFile) {
        if (gameFile.pakFileName !== this.fileName)
            throw new Error(`Wrong pak file reader, required ${gameFile.pakFileName}, this is ${this.fileName}`)
        console.debug(`Extracting ${gameFile.getName()} from $fileName at ${gameFile.pos} with size ${gameFile.size}`)
        // If this reader is used as a concurrent reader create a clone of the main reader to
        // provide thread safety
        const exAr = this.concurrent ? this.Ar.clone() : this.Ar
        exAr.seek(gameFile.pos)
        // Pak Entry is written before the file data,
        // but its the same as the one from the index, just without a name
        const tempEntry = new FPakEntry(exAr, false)
        tempEntry.compressionBlocks.forEach((it) => {
            it.compressedStart += gameFile.pos
            it.compressedEnd += gameFile.pos
        })
        if (gameFile.isCompressed()) {
            console.debug(`${gameFile.getName()} is compressed with ${gameFile.compressionMethod}`)
            const uncompressedBuffer = Buffer.alloc(gameFile.uncompressedSize)
            let uncompressedBufferOff = 0
            tempEntry.compressionBlocks.forEach((block) => {
                exAr.seek(block.compressedStart)
                let srcSize = (block.compressedEnd - block.compressedStart)
                // Read the compressed block
                let compressedBuffer: Buffer
                if (gameFile.isEncrypted) {
                    // The compressed block is encrypted, align it and then decrypt
                    const key = this.aesKey
                    if (!key)
                        throw ParserException("Decrypting a encrypted file requires an encryption key to be set")
                    srcSize = Utils.align(srcSize, BLOCK_SIZE)
                    compressedBuffer = Aes.decrypt(exAr.read(srcSize), key)
                } else {
                    // Read the block data
                    compressedBuffer = exAr.read(srcSize)
                }
                // Calculate the uncompressed size,
                // its either just the compression block size
                // or if its the last block its the remaining data size
                const uncompressedSize = Math.min(gameFile.compressionBlockSize, gameFile.uncompressedSize - uncompressedBufferOff)
                Compression.uncompressMemory(gameFile.compressionMethod, uncompressedBuffer, compressedBuffer, uncompressedBufferOff, uncompressedSize, 0, srcSize)
                uncompressedBufferOff += gameFile.compressionBlockSize
            })
            return uncompressedBuffer
        } else if (gameFile.isEncrypted) {
            console.debug(`${gameFile.getName()} is encrypted, decrypting`)
            const key = this.aesKey
            if (!key)
                throw ParserException("Decrypting a encrypted file requires an encryption key to be set")
            // AES is block encryption, all encrypted blocks need to be 16 bytes long,
            // fix the game file length by growing it to the next multiple of 16 bytes
            const newLength = Utils.align(gameFile.size, BLOCK_SIZE)
            let buffer = exAr.read(newLength)
            buffer = Aes.decrypt(buffer, key)
            return buffer.subarray(0, gameFile.size)
        } else {
            return Buffer.alloc(exAr.read(Buffer.alloc(gameFile.size)))
        }
    }

    private readIndexUpdated() {
        // Prepare primary index and decrypt if necessary
        this.Ar.seek(this.pakInfo.indexOffset)
        let primaryIndex = this.Ar.read(this.pakInfo.indexSize)
        if (this.isEncrypted()) {
            const key = this.aesKey
            if (!key)
                throw ParserException("Reading an encrypted index requires a valid encryption key")
            primaryIndex = Aes.decrypt(primaryIndex, key)
        }

        const primaryIndexAr = this.Ar.createReader(primaryIndex, this.pakInfo.indexOffset)
        primaryIndexAr.pakInfo = this.Ar.pakInfo

        try {
            const str = primaryIndexAr.readString()
            const aes = str.substring(str.lastIndexOf("../../../") + 1)
            if (!aes)
                throw "e"
            this.mountPrefix = aes
        } catch (e) {
            throw InvalidAesKeyException(`Given encryption key '${this.aesKeyStr}' is not working with '${this.fileName}'`)
        }

        const fileCount = primaryIndexAr.readInt32()
        primaryIndexAr.skip(8)

        if (!primaryIndexAr.readBoolean())
            throw ParserException("No path hash index")

        primaryIndexAr.skip(36) // PathHashIndexOffset (long) + PathHashIndexSize (long) + PathHashIndexHash (20 bytes)

        if (!primaryIndexAr.readBoolean())
            throw ParserException("No directory index")

        const directoryIndexOffset = primaryIndexAr.readInt64() as unknown as number
        const directoryIndexSize = primaryIndexAr.readInt64() as unknown as number
        primaryIndexAr.skip(20)

        const encodedPakEntriesSize = primaryIndexAr.readInt32()
        const encodedPakEntries = primaryIndexAr.readBuffer(encodedPakEntriesSize)

        if (primaryIndexAr.readInt32() < 0)
            throw ParserException("Corrupt pak PrimaryIndex detected!")

        this.Ar.seek(directoryIndexOffset)
        let directoryIndexData = this.Ar.read(directoryIndexSize)
        if (this.isEncrypted()) {
            const key = this.aesKey
            if (!key)
                throw ParserException("Reading an encrypted index requires a valid encryption key")
            directoryIndexData = Aes.decrypt(directoryIndexData, key)
        }

        const directoryIndexAr = this.Ar.createReader(directoryIndexData, directoryIndexOffset)
        const directoryIndex = directoryIndexAr.readTMap(null, (it) => {
            return {
                key: it.readString(),
                value: it.readTMap(null, (it2) => {
                    return {
                        key: it2.readString(),
                        value: it2.readInt32()
                    }
                })
            }
        })

        const encodedPakEntriesAr = new FByteArchive(encodedPakEntries)
        const begin = encodedPakEntriesAr.pos

        const tempMap = new UnrealMap<string, GameFile>()
        let finalFileCount = 0
        for (const [dirName, dirContent] of directoryIndex) {
            for (const [fileName, offset] of dirContent) {
                const path = dirName + fileName
                encodedPakEntriesAr.pos = begin + offset
                const entry = this.readBitEntry(encodedPakEntriesAr)
                entry.name = path
                if(entry.isEncrypted)
                    this.encryptedFileCount++
                tempMap.set(this.mountPrefix + path, new GameFile(entry, this.mountPrefix, this.fileName))
                if (!path.endsWith(".uexp") && !path.endsWith(".ubulk"))
                    finalFileCount++
            }
        }

        const files = new Array<GameFile>(finalFileCount)
        tempMap.forEach((it) => {
            if (it.isUE4Package()) {
                const uexp = tempMap.get(it.path.substring(0, it.path.lastIndexOf(".")) + ".uexp")
                if (uexp)
                    it.uexp = uexp
                const ubulk = tempMap.get(it.path.substring(0, it.path.lastIndexOf(".")) + ".ubulk")
                if (ubulk)
                    it.ubulk = ubulk
                files.push(it)
            } else {
                if (!it.path.endsWith(".uexp") && !it.path.endsWith(".ubulk"))
                    files.push(it)
            }
        })
        this.files = files

        let stats = sprintf("Pak %s: %d files", this.Ar instanceof FPakFileArchive ? this.Ar.file : this.fileName, fileCount)
        if (this.encryptedFileCount != 0)
            stats += sprintf(" (%d encrypted)", this.encryptedFileCount)
        if (this.mountPrefix.includes('/'))
            stats += sprintf(", mount point: \"%s\"", this.mountPrefix)
        console.info(stats + ", version %d", this.pakInfo.version)

        return this.files
    }

    private readBitEntry(Ar : FByteArchive): FPakEntry {
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
            Ar.readInt64() as unknown as number

        // Read the UncompressedSize.
        const isUncompressedSize32BitSafe = (value & (1 << 30)) !== 0
        uncompressedSize = isUncompressedSize32BitSafe ?
            Ar.readUInt32() :
            Ar.readInt64() as unknown as number

        // Fill in the Size.
        if (compressionMethodIndex !== 0) {
            // Size is only present if compression is applied.
            const isSize32BitSafe = (value & (1 << 29)) !== 0
            if (isSize32BitSafe) {
                size = Ar.readUInt32()
            } else {
                size = Ar.readInt64() as unknown as number
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

        compressionBlocks = Utils.getArray(compressionBlocksCount, () => [0, 0], FPakCompressedBlock)

        // Filter the compression block size or use the UncompressedSize if less that 64k.
        compressionBlockSize = 0
        if (compressionBlocksCount > 0) {
            compressionBlockSize = uncompressedSize < 65536 ? uncompressedSize : ((value & 0x3f) << 11)
        }

        // Set bDeleteRecord to false, because it obviously isn't deleted if we are here.
        //deleted = false Not needed

        // Base offset to the compressed data
        const baseOffset = this.pakInfo.version >= PakVersion_RelativeChunkOffsets ? 0 : offset

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
            const compressedBlockAlignment = encrypted ? BLOCK_SIZE : 1

            // CompressedBlockOffset is the starting offset. Everything else can be derived from there.
            let compressedBlockOffset = baseOffset + FPakEntry.getSerializedSize(this.pakInfo.version, compressionMethodIndex, compressionBlocksCount)
            for (const compressionBlockIndex in compressionBlocks) {
                const compressedBlock = compressionBlocks[compressionBlockIndex]
                compressedBlock.compressedStart = compressedBlockOffset
                compressedBlock.compressedEnd = compressedBlockOffset + Ar.readUInt32()
                const align = compressedBlock.compressedEnd - compressedBlock.compressedStart
                compressedBlockOffset += align + compressedBlockAlignment - (align % compressedBlockAlignment)
            }
        }

        //TODO There is some kind of issue here, compression blocks are sometimes going to far by one byte
        compressionBlocks.forEach((it) => {
            it.compressedStart = it.compressedStart + offset
            it.compressedEnd = it.compressedEnd + offset
        })

        return new FPakEntry(this.pakInfo, "", offset, size, uncompressedSize, compressionMethodIndex, compressionBlocks, encrypted, compressionBlockSize)
    }

    readIndex() {
        return this.pakInfo.version >= PakVersion_PathHashIndex ? this.readIndexUpdated() : this.readIndexLegacy()
    }

    private readIndexLegacy() {
        // Prepare index and decrypt if necessary
        this.Ar.seek(this.pakInfo.indexOffset)

        let index = this.Ar.read(this.pakInfo.indexSize)
        if (this.isEncrypted()) {
            const key = this.aesKey
            if (!key)
                throw ParserException("Reading an encrypted index requires a valid encryption key")
            index = Aes.decrypt(index, key)
        }

        const indexAr = this.Ar.createReader(index, this.pakInfo.indexOffset)
        indexAr.pakInfo = this.Ar.pakInfo

        // Read the index
        let mountPoint = indexAr.readString()
        if (mountPoint)
            throw InvalidAesKeyException(`Given encryption key '${this.aesKeyStr}' is not working with '${this.fileName}'`)

        let badMountPoint = false
        if (!mountPoint.startsWith("../../.."))
            badMountPoint = true
        else
            mountPoint = mountPoint.replace("../../..", "")
        if (mountPoint[0] !== '/' || (mountPoint.length > 1 && mountPoint[1] === '.'))
            badMountPoint = true
        if (badMountPoint) {
            console.warn(`Pak \"${this.fileName}\" has strange mount point \"${mountPoint}\", mounting to root`)
            mountPoint = "/"
        }
        if (mountPoint.startsWith('/'))
            mountPoint = mountPoint.substring(1)
        this.mountPrefix = mountPoint

        this.fileCount = indexAr.readInt32()
        this.encryptedFileCount = 0

        const tempMap = new UnrealMap<string, GameFile>()
        let i = 0
        while (i < this.fileCount) {
            const entry = new FPakEntry(indexAr, true)
            const gameFile = new GameFile(entry, this.mountPrefix, this.fileName)
            if (gameFile.isEncrypted)
                this.encryptedFileCount++
            tempMap.set(gameFile.path, gameFile)
            ++i
        }

        const files: GameFile[] = []
        tempMap.forEach((it) => {
            if (it.isUE4Package()) {
                const uexp = tempMap.get(it.path.substring(0, it.path.lastIndexOf(".")) + ".uexp")
                if (uexp)
                    it.uexp = uexp
                const ubulk = tempMap.get(it.path.substring(0, it.path.lastIndexOf(".")) + ".ubulk")
                if (ubulk)
                    it.ubulk = ubulk
                files.push(it)
            } else {
                if (!it.path.endsWith(".uexp") && !it.path.endsWith(".ubulk"))
                    files.push(it)
            }
        })
        this.files = files

        let stats = sprintf("Pak %s: %d files", this.Ar instanceof FPakFileArchive ? this.Ar.file : this.fileName, this.fileCount)
        if (this.encryptedFileCount !== 0)
            stats += sprintf(" (%d encrypted)", this.encryptedFileCount)
        if (this.mountPrefix.includes("/"))
            stats += sprintf(", mount point: \"%s\"", this.mountPrefix)
        console.info(stats + ", version %d", this.pakInfo.version)
        return this.files
    }

    indexCheckBytes() {
        this.Ar.seek(this.pakInfo.indexOffset)
        return this.Ar.read(128)
    }

    testAesKey(key: string)
    testAesKey(key: Buffer)
    testAesKey(bytes: Buffer, key: Buffer)
    testAesKey(x?: any, y?: any) {
        if (!y) {
            if (Buffer.isBuffer(x)) {
                if (!this.isEncrypted())
                    return true
                return this.testAesKey(this.indexCheckBytes(), x)
            } else {
                return this.testAesKey(DataTypeConverter.parseHexBinary(x.startsWith("0x") ? x.substring(2) : x))
            }
        } else {
            x = Aes.decrypt(x, y)
            return this.isValidIndex(x)
        }
    }

    isValidIndex(bytes: Buffer) {
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