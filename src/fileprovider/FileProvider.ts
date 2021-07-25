import { Game, Ue4Version } from "../ue4/versions/Game";
import { GameFile } from "../ue4/pak/GameFile";
import { Package } from "../ue4/assets/Package";
import { TypeMappingsProvider } from "../ue4/assets/mappings/TypeMappingsProvider";
import { ReflectionTypeMappingsProvider } from "../ue4/assets/mappings/ReflectionTypeMappingsProvider";
import { Locres } from "../ue4/locres/Locres";
import { FnLanguage, valueOfLanguageCode } from "../ue4/locres/FnLanguage";
import { AssetRegistry } from "../ue4/registry/AssetRegistry";
import {
    createIoChunkId,
    EIoChunkType,
    FIoChunkId,
    FIoStoreEnvironment
} from "../ue4/io/IoDispatcher";
import { IoPackage } from "../ue4/assets/IoPackage";
import { UnrealMap } from "../util/UnrealMap";
import { PakPackage } from "../ue4/assets/PakPackage";
import { FName } from "../ue4/objects/uobject/FName";
import { PakFileReader } from "../ue4/pak/PakFileReader";
import { EIoStoreTocReadOptions, FIoStoreReader } from "../ue4/io/IoStore";
import { FGuid } from "../ue4/objects/core/misc/Guid";
import { FNameMap } from "../ue4/asyncloading2/FNameMap";
import { FPackageStore } from "../ue4/asyncloading2/FPackageStore";
import fs from "fs";
import { InvalidAesKeyException, ParserException } from "../exceptions/Exceptions";
import { FFileArchive } from "../ue4/reader/FFileArchive";
import { Aes } from "../encryption/aes/Aes";
import { Lazy } from "../util/Lazy";
import Collection from "@discordjs/collection";
import EventEmitter from "events";
import { ObjectTypeRegistry } from "../ue4/assets/ObjectTypeRegistry";
import { UObject } from "../ue4/assets/exports/UObject";
import { FSoftObjectPath } from "../ue4/objects/uobject/SoftObjectPath";
import { createFPackageId } from "../ue4/objects/uobject/FPackageId";
import { Oodle } from "../oodle/Oodle";
import { Config, IConfig } from "../Config";
import { Utils } from "../util/Utils";

/**
 * The main hub for interacting with ue4 assets
 * @extends {EventEmitter}
 */
export class FileProvider extends EventEmitter {
    /**
     * Path to paks folder
     * @type {string}
     * @public
     */
    folder: string

    /**
     * Whether global data is loaded or not
     * @type {boolean}
     * @protected
     */
    protected globalDataLoaded = false

    /**
     * Game which is being used
     * @type {Ue4Version}
     * @public
     */
    game: Ue4Version

    /**
     * Type mappings to use
     * @type {TypeMappingsProvider}
     * @public
     */
    mappingsProvider: TypeMappingsProvider = new ReflectionTypeMappingsProvider()

    /**
     * Non I/O store files in current instance
     * @type {Collection<string, GameFile>}
     * @public
     */
    files = new Collection<string, GameFile>()

    /**
     * Non mounted paks
     * @type {Array<PakFileReader>}
     * @public
     */
    unloadedPaks = new Array<PakFileReader>()

    /**
     * Mounted paks
     * @type {Array<PakFileReader>}
     * @public
     */
    mountedPaks = new Array<PakFileReader>()

    /**
     * Mounted I/O store readers
     * @type {Array<FIoStoreReader>}
     * @public
     */
    mountedIoStoreReaders = new Array<FIoStoreReader>()

    /**
     * AES keys required for readers
     * @see {unloadedPaks}
     * @type {Array<FGuid>}
     * @public
     */
    requiredKeys = new Array<FGuid>()

    /**
     * Stored AES keys
     * @type {UnrealMap<FGuid, Buffer>}
     * @public
     */
    keys = new UnrealMap<FGuid, Buffer>()

    /**
     * Global package store (used in e.g fortnite, handles I/O file entries)
     * @type {Lazy<FPackageStore>}
     * @public
     */
    globalPackageStore = new Lazy(() => {
        const globalNameMap = new FNameMap()
        const globalPackageStore = new FPackageStore(this, globalNameMap)
        globalNameMap.loadGlobal(this)
        globalPackageStore.setupInitialLoadData()
        //globalPackageStore.setupCulture()
        //globalPackageStore.loadContainers(this.mountedIoStoreReaders.map(m => new FIoDispatcherMountedContainer(m.environment, m.containerId)))
        return globalPackageStore
    })

    /**
     * Local files
     * @type {Set<string>}
     * @public
     */
    localFiles = new Set<string>()

    /**
     * Whether to read io store toc directory index
     * Set to 0 to skip reading directory index
     * @type {EIoStoreTocReadOptions}
     * @public
     */
    ioStoreTocReadOptions = EIoStoreTocReadOptions.ReadAll

    /**
     * Creates a new instance of the file provider
     * @param {string} folder Path to pak folder
     * @param {?Ue4Version} game Used game
     * @param {?TypeMappingsProvider} mappingsProvider Type mappings provider to use
     * @param {?Config} config Configurations for the lib
     * @public
     */
    constructor(folder: string, game?: Ue4Version, mappingsProvider?: TypeMappingsProvider, config?: IConfig) {
        super()
        if (config != null) {
            Config.GDebug = config.GDebug
            Config.GExportArchiveCheckDummyName = config.GExportArchiveCheckDummyName
            Config.GFatalUnknownProperty = config.GFatalUnknownProperty
            Config.GSuppressMissingSchemaErrors = config.GSuppressMissingSchemaErrors
            Config.GUseLocalTypeRegistry = config.GUseLocalTypeRegistry
        }
        this.folder = folder
        this.game = game || Ue4Version.GAME_UE4_LATEST
        this.mappingsProvider = mappingsProvider || new ReflectionTypeMappingsProvider()
        if (this.game.game >= Game.GAME_UE4(26))
            Oodle.ensureLib()
    }

    /**
     * Gets stored AES keys as strings
     * @type {UnrealMap<FGuid, string>}
     * @public
     */
    get keysStr(): UnrealMap<FGuid, string> {
        return this.keys.mapValues(it => "0x" + it.toString("hex"))
    }

    /**
     * Submits an aes key to mount
     * @param {FGuid} guid
     * @param {Buffer} key
     * @returns {Promise<void>}
     * @public
     */
    submitKey(guid: FGuid, key: Buffer | string) {
        return Buffer.isBuffer(key) ?
            this.submitKeys(new UnrealMap<FGuid, Buffer>().set(guid, key)) :
            this.submitKeysStr(new UnrealMap<FGuid, string>().set(guid, key))
    }

    /**
     * Submits aes key strings to mount
     * @param {UnrealMap<FGuid, string>} keys
     * @returns {Promise<void>}
     * @public
     */
    submitKeysStr(keys: UnrealMap<FGuid, string>) {
        return this.submitKeys(keys.mapValues(it => Aes.parseKey(it)))
    }

    /**
     * Submits aes key strings to mount
     * @param {UnrealMap<FGuid, string>} keys
     * @returns {Promise<void>}
     * @public
     */
    async submitKeys(keys: UnrealMap<FGuid, Buffer>) {
        return await this.submitKeysAsync(keys)
    }

    /**
     * Filters unloaded paks that match the provided guid
     * @param {FGuid} guid Guid to look for
     * @returns {Array<PakFileReader>} Readers that matched the guid
     * @public
     */
    unloadedPaksByGuid(guid: FGuid) {
        return this.unloadedPaks.filter(it => it.pakInfo.encryptionKeyGuid.equals(guid))
    }

    /**
     * Submits keys asynchronously
     * @param {UnrealMap<FGuid, Buffer>} newKeys Keys to submit
     * @returns {Promise<void>}
     * @public
     */
    async submitKeysAsync(newKeys: UnrealMap<FGuid, Buffer>) {
        for (const [guid, key] of newKeys) {
            this.keys.set(guid, key)
            for (const reader of this.unloadedPaksByGuid(guid)) {
                try {
                    reader.aesKey = key
                    this.mount(reader)
                    this.unloadedPaks = this.unloadedPaks.filter(v => v !== reader)
                    this.requiredKeys = this.requiredKeys.filter(v => !v.equals(guid))
                } catch (e) {
                    if (e instanceof InvalidAesKeyException) {
                        this.keys.delete(guid)
                    } else {
                        console.warn(`Uncaught error while loading pak file ${reader.path.substring(reader.path.lastIndexOf("/") + 1)}`, e)
                    }
                }
            }
        }
    }

    /**
     * Name of the game that is loaded by the provider
     * @type {string}
     * @public
     */
    get gameName(): string {
        const first = this.files.keyArray()[0]
        const subStr = first ? first.substring(0, first.indexOf("/")) : ""
        return subStr.endsWith("game") ? subStr.substring(0, first.indexOf("game")) : ""
    }

    /**
     * Searches for a game file by its path
     * @param {string} filePath The path to search for
     * @returns {?GameFile} The game file or null if it wasn't found
     * @public
     */
    findGameFile(filePath: string): GameFile {
        return this.files.get(this.fixPath(filePath))
    }

    /**
     * Loads a UE4 package
     * @param {GameFile} file The game file to load
     * @returns {?Package} The parsed package or null if the file was not an ue4 package (.uasset)
     * @public
     */
    loadGameFile(file: GameFile): Package

    /**
     * Loads a UE4 package from I/O Store by package ID
     * @param {bigint} packageId The package ID to load
     * @returns {?IoPackage} The parsed package or null if not found
     * @public
     */
    loadGameFile(packageId: bigint): IoPackage

    /**
     * Searches for the game file and then load its contained package
     * @param {string} filePath The path to search for
     * @returns {?Package} The parsed package or null if the path was not found or the found game file was not an ue4 package (.uasset)
     * @public
     */
    loadGameFile(filePath: string): Package

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
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
                    const packageId = createFPackageId(FName.dummy(name))
                    try {
                        const ioFile = this.loadGameFile(packageId)
                        if (ioFile)
                            return ioFile
                    } catch (e) {
                        console.error(e)
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
            } else {
                let ioBuffer: Buffer
                try {
                    ioBuffer = this.saveChunk(createIoChunkId(x, 0, EIoChunkType.ExportBundleData))
                } catch { }
                if (!ioBuffer) return null
                return new IoPackage(ioBuffer, x, this.globalPackageStore.value, this, this.game)
            }
        } catch (e) {
            console.error(`Failed to load package ${x.toString()}`)
            console.error(e)
        }
    }

    /**
     * Loads an ue4 object
     * @param {string} objectPath Path to the object
     * @param {?string} objectName Name of the object (could be left out)
     * @returns {?UObject} The object that matched your args or null
     * @public
     */
    loadObject<T extends UObject>(objectPath: string | FSoftObjectPath, objectName?: string): T {
        if (objectPath == null || objectPath === "None") return null;
        let packagePath: string = objectPath as any
        if (objectPath instanceof FSoftObjectPath) {
            packagePath = objectPath.assetPathName.text
        }
        if (objectName == null) {
            const dotIndex = packagePath.indexOf(".")
            if (dotIndex === -1) {
                objectName = packagePath.substring(packagePath.lastIndexOf("/") + 1)
            } else {
                objectName = packagePath.substring(dotIndex + 1)
                packagePath = packagePath.substring(0, dotIndex)
            }
        }
        const pkg = this.loadGameFile(packagePath) // TODO allow reading umaps via this route, currently fixPath() only appends .uasset. EDIT(2020-12-15): This works with IoStore assets, but not PAK assets.
        return pkg?.findObjectByName(objectName)?.value as T
    }

    /**
     * Searches for the game file and then load its contained locres
     * @param {string} filePath The path to search for
     * @returns {?Locres} The parsed package or null if the path was not found or the found game file was not an ue4 package (.uasset)
     * @public
     */
    loadLocres(filePath: string): Locres

    /**
     * Loads a UE4 Locres file
     * @param {string} file The game file to load
     * @returns {?Locres} The parsed locres or null if the file was not an ue4 locres (.locres)
     * @public
     */
    loadLocres(file: GameFile): Locres

    /**
     * Loads a UE4 Locres file
     * @param {FnLanguage} ln Language to load
     * @returns {?Locres} The parsed locres or null if not found
     * @public
     */
    loadLocres(ln: FnLanguage)

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    loadLocres(x?: any) {
        try {
            if (x instanceof GameFile) {
                if (!x.isLocres())
                    return null
                const locres = this.saveGameFile(x)
                return new Locres(locres, x.path, this.getLocresLanguageByPath(x.path))
            } else if (typeof x === "string") {
                // basically String.replaceAll() but it doesnt exist in js yet lol
                if (FnLanguage[x.toUpperCase().split("-").join("_")] != null) {
                    const files = this.files
                        .filter(it => {
                            const path = it.path.toLowerCase()
                            return path.startsWith(`${this.gameName}Game/Content/Localization`.toLowerCase())
                                && path.includes(`/${x}/`.toLowerCase())
                                && path.endsWith(".locres")
                        })
                    if (!files.size) return null
                    let first: Locres = null
                    for (const file of files.values()) {
                        try {
                            const f = first
                            if (f == null) {
                                first = this.loadLocres(file)
                            } else {
                                this.loadLocres(file)?.mergeInto(first)
                            }
                        } catch (e) {
                            console.error(`Failed to locres file ${file.getName()}`)
                            console.error(e)
                        }
                    }
                    return first
                } else {
                    const path = this.fixPath(x)
                    const gameFile = this.findGameFile(path)
                    if (gameFile)
                        return this.loadLocres(gameFile)
                    if (!path.endsWith(".locres"))
                        return null
                    const locres = this.saveGameFile(path)
                    if (!locres)
                        return null
                    return new Locres(locres, path, this.getLocresLanguageByPath(x))
                }
            }
        } catch (e) {
            console.error(`Failed to load locres ${x instanceof GameFile ? x.path : x}`)
            console.error(e)
        }
    }

    /**
     * Gets a locres language by path
     * @param {string} filePath Path to the locres file
     * @returns {FnLanguage} The locres language
     * @public
     */
    getLocresLanguageByPath(filePath: string): FnLanguage {
        return valueOfLanguageCode(Utils.takeWhileStr(
            filePath.split(new RegExp("Localization/(.*?)/"))[2],
            (it) => it !== "/")
        )
    }

    /**
     * Searches for the game file and then loads a UE4 AssetRegistry file
     * @param {string} filePath The path to search for
     * @returns {?AssetRegistry} The parsed asset registry or null
     * @public
     */
    loadAssetRegistry(filePath: string): AssetRegistry

    /**
     * Loads a UE4 AssetRegistry file
     * @param {string} file The game file to load
     * @returns {?AssetRegistry} The parsed asset registry or null
     * @public
     */
    loadAssetRegistry(file: GameFile): AssetRegistry

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
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
            console.error(e)
            console.error(`Failed to load asset registry ${x instanceof GameFile ? x.path : x}`)
        }
    }

    /**
     * Searches for the game file and then saves all parts of this package
     * @param {string} filePath The path to search for
     * @returns {?Collection<string, Buffer>} A map with the files name as key and data as value or null
     * @public
     */
    savePackage(filePath: string): Collection<string, Buffer>

    /**
     * Saves all parts of this package
     * @param {GameFile} file The game file to save
     * @returns {?Collection<string, Buffer>} A map with the files name as key and data as value
     */
    savePackage(file: GameFile): Collection<string, Buffer>

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    savePackage(x: any) {
        if (x instanceof GameFile) {
            const map = new Collection<string, Buffer>()
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
            const map = new Collection<string, Buffer>()
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
     * @param {string} filePath Path to the file to save
     * @returns {?Buffer} The files data or null
     */
    saveGameFile(filePath: string): Buffer

    /**
     * Saves the game file
     * @param {GameFile} file The game file to save
     * @returns {?Buffer} The files data or null
     */
    saveGameFile(file: GameFile): Buffer

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    saveGameFile(x: any) {
        if (x instanceof GameFile) {
            if (x.ioPackageId)
                return this.saveChunk(createIoChunkId(x.ioPackageId, 0, EIoChunkType.ExportBundleData))
            const reader = this.mountedPaks.find(it => it.path === x.pakFileName)
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
     * @param {FIoChunkId} chunkId The chunk ID
     * @returns {Buffer} The chunk data
     * @throws {Error}
     */
    saveChunk(chunkId: FIoChunkId): Buffer {
        for (const reader of this.mountedIoStoreReaders) {
            try {
                return reader.read(chunkId)
            } catch (e) {
                if (e.message !== "Unknown chunk ID") {
                    throw e
                }
            }
        }
        throw new Error("Couldn't find any possible I/O store readers")
    }

    /**
     * Mounts a pak file reader
     * @param {PakFileReader} reader Reader to mount
     * @returns {Promise<void>}
     * @protected
     */
    protected mount(reader: PakFileReader) {
        const index = reader.readIndex()
        for (const it of index) {
            this.files.set(it.path.toLowerCase(), it)
        }
        this.mountedPaks.push(reader)

        if (this.globalDataLoaded && reader.Ar instanceof FFileArchive) {
            const absolutePath = reader.path.substring(0, reader.path.lastIndexOf("."))
            const ioStoreEnvironment = new FIoStoreEnvironment(absolutePath)
            try {
                const ioStoreReader = new FIoStoreReader()
                ioStoreReader.initialize(ioStoreEnvironment, this.keys, this.ioStoreTocReadOptions)
                const files = ioStoreReader.getFiles()
                for (const it of files) {
                    this.files.set(it.path.toLowerCase(), it)
                }
                this.mountedIoStoreReaders.push(ioStoreReader)
                /*if (this.globalPackageStore.isInitialized) {
                    this.globalPackageStore.value.onContainerMounted(new FIoDispatcherMountedContainer(ioStoreEnvironment, ioStoreReader.containerId))
                }*/
            } catch (e) {
                console.warn("Failed to mount IoStore environment \"%s\"", absolutePath, e)
            }
        }

        this.emit("mounted:reader", reader)
    }

    /**
     * Initializes the file provider
     * @returns {Promise<void>}
     * @public
     */
    async initialize() {
        await ObjectTypeRegistry.init()
        this.folder = this.folder.endsWith("/") ? this.folder : this.folder + "/"
        if (!fs.existsSync(this.folder))
            throw new ParserException(`Path '${this.folder}' does not exist!`)

        if (this.game.game >= Game.GAME_UE4(26) && !this.globalDataLoaded && this.folder.endsWith("Paks/")) {
            const file = this.folder + "global"
            if (fs.existsSync(file + ".utoc")) {
                this.loadGlobalData(file)
            }
        }

        const dir = await fs.readdirSync(this.folder)
        for (const dirEntry of dir) {
            const path = this.folder + dirEntry
            if (path.endsWith(".pak")) {
                try {
                    const reader = new PakFileReader(path, this.game.game)
                    if (!reader.isEncrypted()) {
                        this.mount(reader)
                    } else {
                        this.unloadedPaks.push(reader)
                        this.requiredKeys.push(reader.pakInfo.encryptionKeyGuid)
                    }
                } catch (e) {
                    console.error(e)
                }
            } else {
                let gamePath = path.substring(this.folder.length)
                if (gamePath.startsWith("\\") || gamePath.startsWith("/")) {
                    gamePath = gamePath.substring(1)
                }
                gamePath = gamePath.replace("\\", "/")
                this.localFiles.add(gamePath.toLowerCase())
            }
        }

        this.emit("ready")
    }

    /**
     * Loads the global data
     * @param {string} path Path to the global data file
     * @returns {void}
     * @protected
     */
    protected loadGlobalData(path: string) {
        this.globalDataLoaded = true
        try {
            const ioStoreReader = new FIoStoreReader()
            ioStoreReader.initialize(new FIoStoreEnvironment(path), this.keys, this.ioStoreTocReadOptions)
            this.mountedIoStoreReaders.push(ioStoreReader)
            console.log("Initialized I/O store")
            this.emit("mounted:iostore", ioStoreReader)
        } catch (e) {
            console.error("Failed to mount I/O store global environment: '%s'", e.message || e)
        }
    }

    /**
     * Fixes a file path
     * @param {string} filePath File path to fix
     * @returns {string} File path translated into the correct format
     * @public
     */
    fixPath(filePath: string): string {
        const gameName = this.gameName
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
     * @param {string} path Path to compact
     * @warning This does convert FortniteGame/Plugins/GameFeatures/GameFeatureName/Content/Package into /GameFeatureName/Package
     * @returns {string}
     * @public
     */
    compactFilePath(path: string): string {
        path = path.toLowerCase()
        if (path[0] === "/") {
            return path
        }
        if (path.startsWith("engine/content")) { // -> /Engine
            return "/engine" + path.substring("engine/content".length)
        }
        if (path.startsWith("engine/plugins")) { // -> /Plugins
            return path.substring("engine".length)
        }
        const delim = path.indexOf("/content/")
        return delim === -1 ? path : "/game" + path.substring(delim + "/content".length)
    }
}
