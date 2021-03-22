/*import { GameFile } from "../ue4/pak/GameFile";
import { UnrealMap } from "../util/UnrealMap";
import { PakFileProvider } from "./PakFileProvider";
import { PakFileReader } from "../ue4/pak/PakFileReader";
import { FGuid } from "../ue4/objects/core/misc/Guid";
import { FIoStoreReader } from "../ue4/io/IoStore";
import { GAME_UE4, Ue4Version } from "../ue4/versions/Game";
import { TypeMappingsProvider } from "../ue4/assets/mappings/TypeMappingsProvider";
import { ReflectionTypeMappingsProvider } from "../ue4/assets/mappings/ReflectionTypeMappingsProvider";
import { DataTypeConverter } from "../util/DataTypeConverter";
import * as fs from "fs";
import { File } from "../util/File";
import { ParserException } from "../exceptions/Exceptions";

export class DefaultFileProvider extends PakFileProvider {
    folder: string
    game: number
    localFiles = new UnrealMap<string, Buffer>()
    _files = new UnrealMap<string, GameFile>()
    _unloadedPaks: PakFileReader[] = []
    _requiredKeys: FGuid[] = []
    _keys = new UnrealMap<FGuid, Buffer>()
    _mountedPaks: PakFileReader[] = []
    _mountedIoStoreReaders: FIoStoreReader[] = []

    constructor(folder: string, game: number = Ue4Version.GAME_UE4_LATEST, mappingsProvider: TypeMappingsProvider = new ReflectionTypeMappingsProvider()) {
        super()
        this.folder = folder
        this.game = game
        this.mappingsProvider = mappingsProvider
        this.scanFiles(folder)
    }

    keys(): UnrealMap<FGuid, Buffer> {
        return this._keys
    }

    keysStr(): UnrealMap<FGuid, string> {
        return this.keys().mapValues(it => DataTypeConverter.printAesKey(it))
    }

    get files() {
        return this._files
    }

    requiredKeys(): FGuid[] {
        return this._requiredKeys
    }

    unloadedPaks(): PakFileReader[] {
        return this._unloadedPaks
    }

    mountedPaks(): PakFileReader[] {
        return this._mountedPaks
    }

    mountedIoStoreReaders(): FIoStoreReader[] {
        return this._mountedIoStoreReaders
    }

    private scanFiles(folder: string) {
        folder = folder.endsWith("/") ? folder : folder + "/"
        if (!fs.existsSync(folder))
            throw ParserException(`Path '${folder}' does not exist!`)

        if (this.game >= GAME_UE4(26) && !this.globalDataLoaded && folder.endsWith("Paks/")) {
            const file = folder + "global.utoc"
            if (fs.existsSync(file)) {
                this.loadGlobalData(new File(file, fs.readFileSync(file)))
            }
        }
        const dir = fs.readdirSync(folder)
        for (const dirEntry of dir) {
            const path = folder + dirEntry
            const ent = fs.lstatSync(path)
            if (ent.isDirectory()) {
                return this.scanFiles(path)
            } else if (ent.isFile()) {
                const file = fs.readFileSync(path)
                if (path.toLowerCase().endsWith("pak")) {
                    try  {
                        const reader = new PakFileReader(file, this.game)
                        if (!reader.isEncrypted()) {
                            this.mount(reader)
                        } else {
                            this._unloadedPaks.push(reader)
                            if (!this._requiredKeys.find(r => r.equals(reader.pakInfo.encryptionKeyGuid))) this._requiredKeys.push(reader.pakInfo.encryptionKeyGuid)
                        }
                    } catch (e) {
                        console.error(e)
                    }
                } else {
                    let gamePath = path.substring(folder.length)
                    if (gamePath.startsWith("\\") || gamePath.startsWith("/")) {
                        gamePath = gamePath.substring(1)
                    }
                    gamePath = gamePath.replace("\\", "/")
                    this.localFiles.set(gamePath.toLowerCase(), file)
                }
            }
        }
    }

    saveGameFile(file: GameFile): Buffer
    saveGameFile(filePath: string): Buffer
    saveGameFile(_file?: any): Buffer {
        if (typeof _file === "string") {
            const res = super.saveGameFile(_file)
            if (res)
                return res
            const path = this.fixPath(_file)
            let file = this.localFiles.get(path)
            if (!file) {
                const justName = path.substring(path.lastIndexOf("/") + 1)
                file = this.localFiles.get(justName)
            }
            if (!file && path.toLowerCase().startsWith("game/")) {
                file = this.localFiles.filter((v, k) => {
                    if (k.toLowerCase().includes("game"))
                        return k.substring(k.indexOf("game/") + 1) === path.substring(k.indexOf("game/"))
                    else
                        return false
                })[0]
            }
            return file || null
        } else {
            return super.saveGameFile(_file)
        }
    }
}*/