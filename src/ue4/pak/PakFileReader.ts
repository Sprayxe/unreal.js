import { FPakArchive } from "./reader/FPakArchive";
import { GAME_UE4, LATEST_SUPPORTED_UE4_VERSION } from "../versions/Game";
import Collection from "@discordjs/collection";
import * as fs from "fs";
import { FPakInfo } from "./objects/FPakInfo";
import { DataTypeConverter } from "../../util/DataTypeConverter";
import { Aes } from "../../encryption/aes/Aes";
import { GameFile } from "./GameFile";
import { InvalidAesKeyException, ParserException } from "../../exceptions/Exceptions";
import { FByteArchive } from "../reader/FByteArchive";
import { FPakEntry } from "./objects/FPakEntry";
import { sprintf } from "sprintf-js";
import { FPakFileArchive } from "./reader/FPakFileArchive";

type FPathHashIndex = Collection<number, number>
type FPakDirectory = Collection<string, number>
type FDirectoryIndex = Collection<string, FPakDirectory>

export class PakFileReader {
    Ar: FPakArchive
    keepIndexData: boolean
    file: Buffer
    game: number

    constructor(Ar: FPakArchive, keepIndexData: boolean = false, file: string | Buffer, game: number = GAME_UE4(LATEST_SUPPORTED_UE4_VERSION)) {
        this.Ar = Ar
        this.keepIndexData = keepIndexData
        this.file = file instanceof Buffer ? file : fs.readFileSync(file)
        this.game = game
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

    }

    private readIndexUpdated() {
        // Prepare primary index and decrypt if necessary
        this.Ar.seek(this.pakInfo.indexOffset)
        const primaryIndex = this.Ar.read(this.pakInfo.indexSize)
        if (this.isEncrypted()) {
            const key = this.aesKey
            if (!key)
                throw ParserException("Reading an encrypted index requires a valid encryption key")
            Aes.decrypt(primaryIndex, key)
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
        const directoryIndexData = this.Ar.read(directoryIndexSize)
        if (this.isEncrypted()) {
            const key = this.aesKey
            if (!key)
                throw ParserException("Reading an encrypted index requires a valid encryption key")
            Aes.decrypt(directoryIndexData, key)
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

        const tempMap = new Collection<string, GameFile>()
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
        return
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
            Aes.decrypt(x, y)
            return this//.isValidIndex(x)
        }
    }
}