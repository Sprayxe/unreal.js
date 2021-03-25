import { GAME_UE4, GAME_UE4_GET_AR_VER, LATEST_SUPPORTED_UE4_VERSION } from "../versions/Game";
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

export class PakFileReader {
    path: string
    Ar: FArchive
    game: number
    pakInfo: FPakInfo
    aesKey: Buffer = null
    mountPoint: string
    encryptedFileCount = 0
    files: Map<string, GameFile>

    constructor(path: string, game?: number) {
        this.path = path
        this.Ar = new FFileArchive(path)
        this.Ar.game = this.game = game || GAME_UE4(LATEST_SUPPORTED_UE4_VERSION)
        this.Ar.ver = GAME_UE4_GET_AR_VER(this.game)
        this.pakInfo = FPakInfo.readPakInfo(this.Ar)
    }

    toString() { return this.path }

    isEncrypted() { return this.pakInfo.encryptedIndex }

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
        if (gameFile.isCompressed()) {
            console.debug(`${gameFile.getName()} is compressed with ${gameFile.compressionMethod}`)
            const uncompressedBuffer = Buffer.allocUnsafe(gameFile.uncompressedSize)
            let uncompressedBufferOff = 0
            tempEntry.compressionBlocks.forEach((block) => {
                exAr.pos = block.compressedStart
                let srcSize = block.compressedEnd - block.compressedStart
                if (gameFile.isEncrypted) {
                    srcSize = Utils.align(srcSize, Aes.BLOCK_SIZE)
                }
                // Read the compressed block
                const compressedBuffer = this.readAndDecrypt(srcSize, gameFile.isEncrypted)
                // Calculate the uncompressed size,
                // its either just the compression block size
                // or if its the last block its the remaining data size
                const uncompressedSize = Math.min(gameFile.compressionBlockSize, gameFile.uncompressedSize - uncompressedBufferOff)
                Compression.uncompress(gameFile.compressionMethod, uncompressedBuffer, uncompressedBufferOff, uncompressedSize, compressedBuffer, 0, srcSize)
                uncompressedBufferOff += gameFile.compressionBlockSize
            })
            return uncompressedBuffer
        } else {
            // File might be encrypted or just stored normally
            let srcSize = gameFile.uncompressedSize
            if (gameFile.isEncrypted) {
                srcSize = Utils.align(srcSize, Aes.BLOCK_SIZE)
            }
            return this.readAndDecrypt(srcSize, gameFile.isEncrypted).subarray(0, gameFile.uncompressedSize)
        }
    }

    readIndex(): Map<string, GameFile> {
        this.encryptedFileCount = 0
        this.Ar.pos = this.pakInfo.indexOffset
        const indexAr = new FByteArchive(this.readAndDecrypt(this.pakInfo.indexSize))

        let mountPoint: string
        try {
            mountPoint = indexAr.readString()
        } catch (e) {
            throw InvalidAesKeyException(`Given encryption key '0x${this.aesKey.toString("hex")}' is not working with '${this.path}'`)
        }

        this.mountPoint = this.fixMountPoint(mountPoint)
        const files = this.pakInfo.version >= EPakVersion.PakVersion_PathHashIndex ? this.readIndexUpdated(indexAr) : this.readIndexLegacy(indexAr)

        // Print statistics
        let stats = sprintf("Pak \"%s\": %d files", this.path, this.files.size)
        if (this.encryptedFileCount)
            stats += sprintf(" (%d encrypted)", this.encryptedFileCount)
        if (this.mountPoint.includes("/"))
            stats += sprintf(", mount point: \"%s\"", this.mountPoint)
        console.info(stats + ", version %d", this.pakInfo.version)

        return files
    }

    private readIndexLegacy(indexAr: FByteArchive): Map<string, GameFile> {
        const fileCount = indexAr.readInt32()
        const files = new Map<string, GameFile>()
        for (let i = 0; i < fileCount; i++) {
            const entry = new FPakEntry(indexAr, this.pakInfo, true)
            const gameFile = new GameFile(entry, this.mountPoint, this.path)
            if (gameFile.isEncrypted)
                this.encryptedFileCount++
            files.set(gameFile.path.toLowerCase(), gameFile)
        }

        return this.files = files
    }

    private readIndexUpdated(primaryIndexAr: FByteArchive): Map<string, GameFile> {
        const fileCount = primaryIndexAr.readInt32()
        primaryIndexAr.pos += 8 // PathHashSeed

        if (!primaryIndexAr.readBoolean())
            throw ParserException("No path hash index")

        primaryIndexAr.pos += 36 // PathHashIndexOffset (long) + PathHashIndexSize (long) + PathHashIndexHash (20 bytes)

        if (!primaryIndexAr.readBoolean())
            throw ParserException("No directory index")

        const directoryIndexOffset = Number(primaryIndexAr.readInt64())
        const directoryIndexSize = Number(primaryIndexAr.readInt64())
        primaryIndexAr.pos += 20 // Directory Index hash

        const encodedPakEntriesSize = primaryIndexAr.readInt32()
        const encodedPakEntries = primaryIndexAr.readBuffer(encodedPakEntriesSize)
        const encodedPakEntriesAr = new FByteArchive(encodedPakEntries)

        if (primaryIndexAr.readInt32() < 0)
            throw ParserException("Corrupt pak PrimaryIndex detected!")

        this.Ar.pos = directoryIndexOffset
        const directoryIndexAr = new FByteArchive(this.readAndDecrypt(directoryIndexSize))
        const directoryIndexNum = directoryIndexAr.readInt32()
        const files = new Map<string, GameFile>()
        for (let i = 0; i < directoryIndexNum; i++) {
            const directory = directoryIndexAr.readString()
            const filesNum = directoryIndexAr.readInt32()
            for (let j = 0; j < filesNum; j++) {
                const file = directoryIndexAr.readString()
                const path = this.mountPoint + directory + file
                encodedPakEntriesAr.pos = directoryIndexAr.readInt32()
                const entry = FPakEntry.decodePakEntry(encodedPakEntriesAr, this.pakInfo)
                entry.name = path
                if (entry.isEncrypted)
                    this.encryptedFileCount++
                files.set(path.toLowerCase(), new GameFile(entry, this.mountPoint, this.path))
            }
        }

        return this.files = files
    }

    private readAndDecrypt(num: number, isEncrypted: boolean = this.isEncrypted()): Buffer {
        let data = this.Ar.readBuffer(num)
        if (isEncrypted) {
            const key = this.aesKey
            if (!key)
                throw ParserException("Reading this pak requires an encryption key")
            data = Aes.decrypt(data, key)
        }
        return data
    }

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

    indexCheckBytes(): Buffer {
        this.Ar.pos = this.pakInfo.indexOffset
        return this.Ar.readBuffer(128)
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
                return this.testAesKey(Buffer.from(x.startsWith("0x") ? x.substring(2) : x, "hex"))
            }
        } else {
            x = Aes.decrypt(x, y)
            return this.isValidIndex(x)
        }
    }

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