import { GAME_UE4, GAME_UE4_GET_AR_VER, LATEST_SUPPORTED_UE4_VERSION } from "../versions/Game";
import { FPakInfo } from "./objects/FPakInfo";
import { DataTypeConverter } from "../../util/DataTypeConverter";
import { Aes } from "../../encryption/aes/Aes";
import { GameFile } from "./GameFile";
import { InvalidAesKeyException, ParserException } from "../../exceptions/Exceptions";
import { FByteArchive } from "../reader/FByteArchive";
import { FPakEntry } from "./objects/FPakEntry";
import { sprintf } from "sprintf-js";
import { FFileArchive } from "../reader/FFileArchive";
import { Utils } from "../../util/Utils";
import { UnrealMap } from "../../util/UnrealMap";
import { Compression } from "../../compression/Compression";
import { FArchive } from "../reader/FArchive";
import { EPakVersion } from "./enums/PakVersion";

export class PakFileReader {
    path: string
    Ar: FArchive
    game: number
    pakInfo: FPakInfo
    aesKey: Buffer = null
    mountPrefix: string
    fileCount = 0
    encryptedFileCount = 0
    files: GameFile[]

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
            const uncompressedBuffer = Buffer.alloc(gameFile.uncompressedSize)
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

    readIndex(): GameFile[] {
        const files = this.pakInfo.version >= EPakVersion.PakVersion_PathHashIndex ? this.readIndexUpdated() : this.readIndexLegacy()

        // Print statistics
        let stats = sprintf("Pak \"%s\": %d files", this.path, this.fileCount)
        if (this.encryptedFileCount !== 0)
            stats += sprintf(" (%d encrypted)", this.encryptedFileCount)
        if (this.mountPrefix.includes("/"))
            stats += sprintf(", mount point: \"%s\"", this.mountPrefix)
        console.info(stats + ", version %d", this.pakInfo.version)

        return files
    }

    private readIndexLegacy() {
        // Prepare index and decrypt if necessary
        this.Ar.pos = this.pakInfo.indexOffset
        const indexAr = new FByteArchive(this.readAndDecrypt(this.pakInfo.indexSize))

        // Read the index
        let mountPoint = indexAr.readString()
        if (mountPoint)
            throw InvalidAesKeyException(`Given encryption key '0x${this.aesKey.toString("hex")}' is not working with '${this.path}'`)

        let badMountPoint = false
        if (!mountPoint.startsWith("../../.."))
            badMountPoint = true
        else
            mountPoint = mountPoint.replace("../../..", "")
        if (mountPoint[0] !== '/' || (mountPoint.length > 1 && mountPoint[1] === '.'))
            badMountPoint = true
        if (badMountPoint) {
            console.warn(`Pak \"${this.path}\" has strange mount point \"${mountPoint}\", mounting to root`)
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
            const entry = new FPakEntry(indexAr, this.pakInfo, true)
            const gameFile = new GameFile(entry, this.mountPrefix, this.path)
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
        return this.files
    }

    private readIndexUpdated(): GameFile[] {
        // Prepare primary index and decrypt if necessary
        this.Ar.pos = this.pakInfo.indexOffset
        const primaryIndexAr = new FByteArchive(this.readAndDecrypt(this.pakInfo.indexSize))

        try {
            const str = primaryIndexAr.readString()
            const aes = str.substring(str.lastIndexOf("../../../") + 1)
            if (!aes)
                throw "e"
            this.mountPrefix = aes
        } catch (e) {
            console.log(e)
            throw InvalidAesKeyException(`Given encryption key '0x${this.aesKey.toString("hex")}' is not working with '${this.path}'`)
        }

        const fileCount = primaryIndexAr.readInt32()
        primaryIndexAr.pos += 8

        if (!primaryIndexAr.readBoolean())
            throw ParserException("No path hash index")

        primaryIndexAr.pos += 36 // PathHashIndexOffset (long) + PathHashIndexSize (long) + PathHashIndexHash (20 bytes)

        if (!primaryIndexAr.readBoolean())
            throw ParserException("No directory index")

        const directoryIndexOffset = Number(primaryIndexAr.readInt64())
        const directoryIndexSize = Number(primaryIndexAr.readInt64())
        primaryIndexAr.pos += 20

        const encodedPakEntriesSize = primaryIndexAr.readInt32()
        const encodedPakEntries = primaryIndexAr.readBuffer(encodedPakEntriesSize)

        if (primaryIndexAr.readInt32() < 0)
            throw ParserException("Corrupt pak PrimaryIndex detected!")

        this.Ar.pos = directoryIndexOffset
        const directoryIndexAr = new FByteArchive(this.readAndDecrypt(directoryIndexSize))
        const directoryIndex = directoryIndexAr.readTMap(undefined, (it) => {
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
                const entry = FPakEntry.decodePakEntry(encodedPakEntriesAr, this.pakInfo)
                entry.name = path
                if (entry.isEncrypted)
                    this.encryptedFileCount++
                tempMap.set(this.mountPrefix + path, new GameFile(entry, this.mountPrefix, this.path))
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
        return this.files
    }

    readAndDecrypt(num: number, isEncrypted: boolean = this.isEncrypted()): Buffer {
        let data = this.Ar.readBuffer(num)
        if (isEncrypted) {
            const key = this.aesKey
            if (!key)
                throw ParserException("Reading this pak requires an encryption key")
            data = Aes.decrypt(data, key)
        }
        return data
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
                return this.testAesKey(DataTypeConverter.parseHexBinary(x.startsWith("0x") ? x.substring(2) : x))
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