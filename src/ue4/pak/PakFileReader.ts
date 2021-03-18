import { FPakArchive } from "./reader/FPakArchive";
import { GAME_UE4, LATEST_SUPPORTED_UE4_VERSION } from "../versions/Game";
import Collection from "@discordjs/collection";
import * as fs from "fs";
import { FPakInfo } from "./objects/FPakInfo";
import { DataTypeConverter } from "../../util/DataTypeConverter";
import { Aes } from "../../encryption/aes/Aes";
import { GameFile } from "./GameFile";

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

    indexCheckBytes() {
        this.Ar.pos = this.pakInfo.indexOffset
        return this.Ar.read(128)
    }

    testAesKey(key: string)
    testAesKey(key: Buffer)
    testAesKey(bytes: Buffer, key: string)
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
            Aes.decrypt(x, Buffer.isBuffer(y) ? y.toString("hex") : y)
            return this//.isValidIndex(x)
        }
    }
}