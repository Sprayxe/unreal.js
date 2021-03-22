import { GAME_UE4, Ue4Version } from "../ue4/versions/Game";
import { GameFile } from "../ue4/pak/GameFile";
import { Package } from "../ue4/assets/Package";
import { TypeMappingsProvider } from "../ue4/assets/mappings/TypeMappingsProvider";
import { ReflectionTypeMappingsProvider } from "../ue4/assets/mappings/ReflectionTypeMappingsProvider";
import { Locres } from "../ue4/locres/Locres";
import { FnLanguage } from "../ue4/locres/FnLanguage";
import { FPackageId } from "../ue4/objects/uobject/FPackageId";
import { AssetRegistry } from "../ue4/registry/AssetRegistry";
import { EIoChunkType, FIoChunkId, FIoDispatcherMountedContainer, FIoStoreEnvironment } from "../ue4/io/IoDispatcher";
import { IoPackage } from "../ue4/assets/IoPackage";
import { UnrealMap } from "../util/UnrealMap";
import { PakPackage } from "../ue4/assets/PakPackage";
import { FName } from "../ue4/objects/uobject/FName";
import { PakFileReader } from "../ue4/pak/PakFileReader";
import { FIoStoreReader } from "../ue4/io/IoStore";
import { FGuid } from "../ue4/objects/core/misc/Guid";
import { FNameMap } from "../ue4/asyncloading2/FNameMap";
import { FPackageStore } from "../ue4/asyncloading2/FPackageStore";
import fs from "fs";
import { InvalidAesKeyException, ParserException } from "../exceptions/Exceptions";
import { File } from "../util/File";
import { FPakFileArchive } from "../ue4/pak/reader/FPakFileArchive";
import { DataTypeConverter } from "../util/DataTypeConverter";
import { Aes } from "../encryption/aes/Aes";

export class FileProvider {
    folder: string
    protected globalDataLoaded = false
    game: number
    mappingsProvider: TypeMappingsProvider = new ReflectionTypeMappingsProvider()
    protected _files = new UnrealMap<string, GameFile>()
    protected _unloadedPaks: PakFileReader[] = []
    protected _mountedPaks: PakFileReader[] = []
    protected _mountedIoStoreReaders: FIoStoreReader[] = []
    protected _requiredKeys: FGuid[] = []
    protected _keys = new UnrealMap<FGuid, Buffer>()
    protected mountListeners: PakMountListener[] = []
    globalPackageStore: FPackageStore = null
    localFiles = new UnrealMap<string, Buffer>()

    constructor(
        folder: string,
        game: number = Ue4Version.GAME_UE4_LATEST,
        mappingsProvider: TypeMappingsProvider = new ReflectionTypeMappingsProvider()
    ) {
        this.folder = folder
        this.game = game
        this.mappingsProvider = mappingsProvider
        this.scanFiles(folder)
        this.globalPackageStore = _globalPackageStore(this)
    }

    get files() {
        return this._files
    }

    keys(): UnrealMap<FGuid, Buffer> {
        return this._keys
    }

    keysStr(): UnrealMap<FGuid, string> {
        return this.keys().mapValues(it => DataTypeConverter.printAesKey(it))
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

    submitKey(guid: FGuid, key: Buffer | string) {
        return Buffer.isBuffer(key) ?
            this.submitKeys(new UnrealMap<FGuid, Buffer>().set(guid, key)) :
            this.submitKeysStr(new UnrealMap<FGuid, string>().set(guid, key))
    }

    submitKeysStr(keys: UnrealMap<FGuid, string>) {
        return this.submitKeys(keys.mapValues(it => Aes.parseKey(it)))
    }

    async submitKeys(keys: UnrealMap<FGuid, Buffer>) {
        return await this.submitKeysAsync(keys)
    }

    unloadedPaksByGuid(guid: FGuid) {
        return this.unloadedPaks().filter(it => it.pakInfo.encryptionKeyGuid === guid)
    }

    /**
     * - Submits keys asynchronously
     * @param newKeys Keys to submit
     */
    async submitKeysAsync(newKeys: UnrealMap<FGuid, Buffer>) {
        for (const [guid, key] of newKeys) {
            if (!this.requiredKeys().find(k => k === guid))
                continue
            for (const reader of this.unloadedPaksByGuid(guid)) {
                try {
                    reader.aesKey = key
                    this._keys.set(guid, key)
                    this.mount(reader)
                    this._unloadedPaks = this._unloadedPaks.filter(v => v !== reader)
                    this._requiredKeys = this._requiredKeys.filter(v => v !== guid)
                } catch (e) {
                    if (e instanceof InvalidAesKeyException) {
                        this._keys.delete(guid)
                    } else {
                        console.warn(`Uncaught exception while loading pak file ${reader.fileName.substring(reader.fileName.lastIndexOf("/") + 1)}`)
                    }
                }
            }
        }
    }

    /**
     * - the name of the game that is loaded by the provider
     */
    get gameName(): string {
        const first = this.files.keyArray()[0]
        const subStr = first ? first.substring(0, first.indexOf("/")) : ""
        return subStr.endsWith("game") ? subStr.substring(0, first.indexOf("game")) : ""
    }

    /**
     * Searches for a game file by its path
     * @param filePath the path to search for
     * @returns the game file or null if it wasn't found
     */
    findGameFile(filePath: string): GameFile {
        const path = this.fixPath(filePath)
        return this._files.get(path)
    }

    /**
     * Loads a UE4 package
     * @param file the game file to load
     * @returns the parsed package or null if the file was not an ue4 package (.uasset)
     */
    loadGameFile(file: GameFile): Package

    /**
     * Loads a UE4 package from I/O Store by package ID.
     * @param packageId the package ID to load.
     * @returns the parsed package
     */
    loadGameFile(packageId: FPackageId): IoPackage

    /**
     * Searches for the game file and then load its contained package
     * @param filePath the path to search for
     * @returns the parsed package or null if the path was not found or the found game file was not an ue4 package (.uasset)
     */
    loadGameFile(filePath: String): Package
    loadGameFile(x?: any) {
        try {
            if (x instanceof GameFile) {
                if (x.ioPackageId != null)
                    return this.loadGameFile(x.ioPackageId)
                if (!x.isUE4Package() || !x.hasUexp())
                    throw new Error("The provided file is not a package file")
                const uasset = this.saveGameFile(x)
                const uexp = this.saveGameFile(x.uexp)
                const ubulk = x.hasUbulk() ? this.saveGameFile(x.ubulk) : null
                return new PakPackage(uasset, uexp, ubulk, x.path, this, this.game)
            } else if (typeof x === "string") {
                const path = this.fixPath(x)
                const gameFile = this.findGameFile(path)
                if (gameFile)
                    return this.loadGameFile(gameFile)
                // try load from IoStore
                if (this.globalDataLoaded) {
                    const name = this.compactFilePath(x)
                    const packageId = FPackageId.fromName(FName.dummy(name, 0))
                    try {
                        const ioFile = this.loadGameFile(packageId)
                        if (ioFile)
                            return ioFile
                    } catch (e) {
                        console.error(`Failed to load package ${path}`)
                    }
                }
                // try load from file system
                if (!path.endsWith(".uasset") && !path.endsWith(".umap"))
                    return null
                const uasset = this.saveGameFile(path)
                if (!uasset)
                    return null
                const uexp = this.saveGameFile(path.substring(0, path.lastIndexOf(".")) + ".uexp")
                if (!uexp)
                    return null
                const ubulk = this.saveGameFile(path.substring(0, path.lastIndexOf(".")) + ".ubulk")
                return new PakPackage(uasset, uexp, ubulk, path, this, this.game)
            }
        } catch (e) {
            console.error(`Failed to load package ${typeof x === "string" ? x : x.path}`)
            console.error(e)
        }
    }

    loadObject<T>(objectPath: string): T
    loadObject<T>(softObjectPath: any): T
    loadObject(objectPath?: string): any {
        if (objectPath == null || objectPath === "None") return null;
        let packagePath = objectPath
        //let objectName: string
        const dotIndex = packagePath.indexOf(".")
        if (dotIndex === -1) {
          //  objectName = packagePath.substring(packagePath.lastIndexOf("/") + 1)
        } else {
           // objectName = packagePath.substring(dotIndex + 1)
            packagePath = packagePath.substring(0, dotIndex)
        }
        return this.loadGameFile(packagePath)
    }

    /**
     * Searches for the game file and then load its contained locres
     * @param filePath the path to search for
     * @returns the parsed package or null if the path was not found or the found game file was not an ue4 package (.uasset)
     */
    loadLocres(filePath: string): Locres

    /**
     * Loads a UE4 Locres file
     * @param file the game file to load
     * @returns the parsed locres or null if the file was not an ue4 locres (.locres)
     */
    loadLocres(file: GameFile): Locres
    loadLocres(x?: any) {
        try {
            if (x instanceof GameFile) {
                if (!x.isLocres())
                    return null
                const locres = this.saveGameFile(x)
                return new Locres(locres, x.path, this.getLocresLanguageByPath(x.path))
            } else {
                const path = this.fixPath(x)
                const gameFile = this.findGameFile(path)
                if (!gameFile)
                    return this.loadLocres(gameFile)
                if (!path.endsWith(".locres"))
                    return null
                const locres = this.saveGameFile(path)
                if (!locres)
                    return null
                return new Locres(locres, path, this.getLocresLanguageByPath(x))
            }
        } catch (e) {
            console.error(`Failed to load locres ${x instanceof GameFile ? x.path : x}`)
            console.error(e)
        }
    }

    getLocresLanguageByPath(filePath: string) {
        return FnLanguage.valueOfLanguageCode(filePath.split(new RegExp("Localization/(.*?)/"))[1])
    }


    /**
     * Searches for the game file and then loads a UE4 AssetRegistry file
     * @param filePath the path to search for
     * @return the parsed asset registry
     */
    loadAssetRegistry(filePath: string): AssetRegistry

    /**
     * Loads a UE4 AssetRegistry file
     * @param file the game file to load
     * @returns the parsed asset registry
     */
    loadAssetRegistry(file: any): AssetRegistry
    loadAssetRegistry(x: any) {
        try {
            if (x instanceof GameFile) {
                if (!x.isAssetRegistry())
                    return null
                const locres = this.saveGameFile(x)
                return new AssetRegistry(locres, x.path)
            } else {
                const path = this.fixPath(x)
                const gameFile = this.findGameFile(x)
                if (gameFile)
                    return this.loadAssetRegistry(gameFile)
                if (!path.endsWith(".bin"))
                    return null
                const locres = this.saveGameFile(path)
                return locres ? new AssetRegistry(locres, path) : null
            }
        } catch (e) {
            console.error(`Failed to load asset registry ${x instanceof GameFile ? x.path : x}`)
        }
    }

    /**
     * Searches for the game file and then saves all parts of this package
     * @param filePath the path to search for
     * @returns a map with the files name as key and data as value
     */
    savePackage(filePath: string): UnrealMap<string, Buffer>

    /**
     * Saves all parts of this package
     * @param file the game file to save
     * @returns a map with the files name as key and data as value
     */
    savePackage(file: any): UnrealMap<string, Buffer>
    savePackage(x: any) {
        if (x instanceof GameFile) {
            const map = new UnrealMap<string, Buffer>()
            try {
                if (!x.isUE4Package() || !x.hasUexp()) {
                    const data = this.saveGameFile(x)
                    map.set(x.path, data)
                } else {
                    const uasset = this.saveGameFile(x)
                    map.set(x.path, uasset)
                    const uexp = this.saveGameFile(x.uexp)
                    map.set(x.uexp.path, uexp)
                    const ubulk = x.hasUbulk() ? this.saveGameFile(x.ubulk) : null
                    if (ubulk)
                        map.set(x.ubulk.path, ubulk)
                }
            } catch (e) {
                console.error(e)
            }
            return map
        } else {
            const path = this.fixPath(x)
            const gameFile = this.findGameFile(path)
            if (gameFile)
                return this.savePackage(gameFile)
            const map = new UnrealMap<string, Buffer>()
            try {
                if (path.endsWith(".uasset") || path.endsWith(".umap")) {
                    const uasset = this.saveGameFile(path)
                    if (!uasset)
                        return map
                    map.set(path, uasset)
                    const uexpPath = path.substring(0, path.lastIndexOf(".")) + ".uexp"
                    const uexp = this.saveGameFile(uexpPath)
                    if (!uexp)
                        return null
                    map.set(uexpPath, uexp)
                    const ubulkPath = path.substring(0, path.lastIndexOf(".")) + ".ubulk"
                    const ubulk = this.saveGameFile(ubulkPath)
                    map.set(ubulkPath, ubulk)
                } else {
                    const data = this.saveGameFile(path)
                    if (!data)
                        return map
                    map.set(path, data)
                }
            } catch (e) {
                console.error(e)
            }
            return map
        }
    }

    /**
     * Searches for the game file and then saves the it
     * @param filePath the game file to save
     * @returns the files data
     */
    saveGameFile(filePath: string): Buffer

    /**
     * Saves the game file
     * @param file the game file to save
     * @returns the files data
     */
    saveGameFile(file: GameFile): Buffer
    saveGameFile(x: any) {
        if (x instanceof GameFile) {
            if (x.ioPackageId)
                return this.saveChunk(new FIoChunkId(x.ioPackageId.value(), 0, EIoChunkType.ExportBundleData))
            const reader = this._mountedPaks.find(it => it.fileName === x.pakFileName)
            if (!reader)
                throw new Error("Couldn't find any possible pak file readers")
            return reader.extract(x)
        } else {
            const path = this.fixPath(x)
            const gameFile = this.findGameFile(path)
            return gameFile ? this.saveGameFile(gameFile) : null
        }
    }

    /**
     * Saves a I/O Store chunk by its ID
     * @param chunkId the chunk ID
     * @returns the chunk data
     */
    saveChunk(chunkId: FIoChunkId): Buffer {
        for (const readerStack in this._mountedIoStoreReaders) {
            const reader = this._mountedIoStoreReaders[readerStack]
            try {
                return null // TODO reader.read(chunkId)
            } catch (e) {
                /* TODO if (e.status.errorCode != EIoErrorCode.NotFound) {
                    throw e
                    }
                }*/
            }
        }
        throw new Error("Couldn't find any possible I/O store readers")
    }

    protected mount(reader: PakFileReader) {
        reader.readIndex()
        reader.files.forEach((it) => this._files.set(it.path.toLowerCase(), it))
        this._mountedPaks.push(reader)

        if (this.globalDataLoaded && reader.Ar instanceof FPakFileArchive) {
            const ioStoreEnvironment = new FIoStoreEnvironment(reader.Ar.file.path.substring(0, reader.Ar.file.path.lastIndexOf(".")))
            try {
                console.info("Mounting IoStore environment \"%s\"...", ioStoreEnvironment.path)
                const ioStoreReader = new FIoStoreReader()
                ioStoreReader.concurrent = reader.concurrent
                ioStoreReader.initialize(ioStoreEnvironment, this.keys())
                // TODO ioStoreReader.getFiles().forEach((it) => this._files.set(it.path.toLowerCase(), it))
                this._mountedIoStoreReaders.push(ioStoreReader)
                this.globalPackageStore.onContainerMounted(new FIoDispatcherMountedContainer(ioStoreEnvironment, ioStoreReader.containerId))
                console.info("Mounted IoStore environment \"%s\"", ioStoreEnvironment.path)
            } catch (e) {
                console.warn("Failed to mount IoStore environment \"{}\" [{}]", ioStoreEnvironment.path, e.message)
            }
        }

        this.mountListeners.forEach((it) => it.onMount(reader))
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
                        const reader = new PakFileReader(new File(path, file), this.game)
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

    protected loadGlobalData(globalTocFile: File) {
        this.globalDataLoaded = true
        try {
            const ioStoreReader = new FIoStoreReader()
            ioStoreReader.initialize(new FIoStoreEnvironment(globalTocFile.path.substring(0, globalTocFile.path.lastIndexOf("."))), this._keys)
            this._mountedIoStoreReaders.push(ioStoreReader)
            console.info("Initialized I/O store")
        } catch (e) {
            console.error(e)
            console.error("Failed to mount I/O store global environment: '%s'", e.message || e)
        }
    }

    addOnMountListener(listener: PakMountListener) {
        this.mountListeners.push(listener)
    }

    removeOnMountListener(listener: PakMountListener) {
        this.mountListeners = this.mountListeners.filter(it => it !== listener)
    }

    /**
     * @param filePath the file path to be fixed
     * @returns the file path translated into the correct format
     */
    fixPath(filePath: string): string {
        let path = filePath.toLowerCase()
        path = path.replace("\\", "/")
        if (path.startsWith("/"))
            path = path.substring(1)
        const lastPart = path.substring(path.lastIndexOf("/") + 1)
        if (lastPart.includes(".") && lastPart.substring(0, lastPart.indexOf(".")) === lastPart.substring(lastPart.indexOf(".") + 1))
            path = path.substring(0, path.lastIndexOf(".")) + "/" + lastPart.substring(0, lastPart.indexOf("."))
        if (!path.endsWith("/") && !path.substring(path.lastIndexOf("/") + 1).includes("."))
            path += ".uasset"
        if (path.startsWith("game/")) {
            const gameName = this.gameName
            path =
                path.startsWith("game/content/") ? path.replace("game/content/", gameName + "game/content/") :
                path.startsWith("game/config/") ? path.replace("game/config/", gameName + "game/config/") :
                path.startsWith("game/plugins/") ? path.replace("game/plugins/", gameName + "game/plugins/") :
                (path.includes("assetregistry") || path.endsWith(".uproject")) ? path.replace("game/", `${gameName}game/`) :
                path.replace("game/", gameName + "game/content/")
        } else if (path.startsWith("engine/")) {
            path =
                path.startsWith("engine/content/") ? path :
                path.startsWith("engine/config/") ? path :
                path.startsWith("engine/plugins") ? path :
                path.replace("engine/", "engine/content/")
        }
        return path.toLowerCase()
    }

    /**
     * Compacts a file path
     * @param path Path to compact
     * @warning This does convert FortniteGame/Plugins/GameFeatures/GameFeatureName/Content/Package into /GameFeatureName/Package
     */
    compactFilePath(path: string): string {
        if (path[0] === "/") {
            return path
        }
        if (path.startsWith("Engine/Content")) { // -> /Engine
            return "/Engine" + path.substring("Engine/Content".length)
        }
        if (path.startsWith("Engine/Plugins")) { // -> /Plugins
            return path.substring("Engine".length)
        }
        const delim = path.indexOf("/Content/")
        return delim === -1 ? path : "/Game" + path.substring(delim + "/Content".length)
    }
}

function _globalPackageStore(provider: FileProvider) {
    const globalNameMap = new FNameMap()
    const globalPackageStore = new FPackageStore(this, globalNameMap)
    globalNameMap.loadGlobal(provider)
    globalPackageStore.setupInitialLoadData()
    globalPackageStore.setupCulture()
    globalPackageStore.loadContainers(this.mountedIoStoreReaders.map(m => new FIoDispatcherMountedContainer(m.environment, m.containerId)))
    return globalPackageStore
}

export abstract class PakMountListener {
    abstract onMount(reader: PakFileReader)
}