"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProvider = void 0;
const Game_1 = require("../ue4/versions/Game");
const GameFile_1 = require("../ue4/pak/GameFile");
const ReflectionTypeMappingsProvider_1 = require("../ue4/assets/mappings/ReflectionTypeMappingsProvider");
const Locres_1 = require("../ue4/locres/Locres");
const FnLanguage_1 = require("../ue4/locres/FnLanguage");
const AssetRegistry_1 = require("../ue4/registry/AssetRegistry");
const IoDispatcher_1 = require("../ue4/io/IoDispatcher");
const IoPackage_1 = require("../ue4/assets/IoPackage");
const UnrealMap_1 = require("../util/UnrealMap");
const PakPackage_1 = require("../ue4/assets/PakPackage");
const FName_1 = require("../ue4/objects/uobject/FName");
const PakFileReader_1 = require("../ue4/pak/PakFileReader");
const IoStore_1 = require("../ue4/io/IoStore");
const FNameMap_1 = require("../ue4/asyncloading2/FNameMap");
const FPackageStore_1 = require("../ue4/asyncloading2/FPackageStore");
const fs_1 = __importDefault(require("fs"));
const Exceptions_1 = require("../exceptions/Exceptions");
const FFileArchive_1 = require("../ue4/reader/FFileArchive");
const Aes_1 = require("../encryption/aes/Aes");
const Lazy_1 = require("../util/Lazy");
const collection_1 = __importDefault(require("@discordjs/collection"));
const events_1 = __importDefault(require("events"));
const ObjectTypeRegistry_1 = require("../ue4/assets/ObjectTypeRegistry");
const SoftObjectPath_1 = require("../ue4/objects/uobject/SoftObjectPath");
const FPackageId_1 = require("../ue4/objects/uobject/FPackageId");
const Oodle_1 = require("../oodle/Oodle");
const Config_1 = require("../Config");
const Utils_1 = require("../util/Utils");
/**
 * The main hub for interacting with ue4 assets
 * @extends {EventEmitter}
 */
class FileProvider extends events_1.default {
    /**
     * Creates a new instance of the file provider
     * @param {string} folder Path to pak folder
     * @param {?Ue4Version} game Used game
     * @param {?TypeMappingsProvider} mappingsProvider Type mappings provider to use
     * @param {?Config} config Configurations for the lib
     * @public
     */
    constructor(folder, game, mappingsProvider, config) {
        super();
        /**
         * Whether global data is loaded or not
         * @type {boolean}
         * @protected
         */
        this.globalDataLoaded = false;
        /**
         * Type mappings to use
         * @type {TypeMappingsProvider}
         * @public
         */
        this.mappingsProvider = new ReflectionTypeMappingsProvider_1.ReflectionTypeMappingsProvider();
        /**
         * Non I/O store files in current instance
         * @type {Collection<string, GameFile>}
         * @public
         */
        this.files = new collection_1.default();
        /**
         * Non mounted paks
         * @type {Array<PakFileReader>}
         * @public
         */
        this.unloadedPaks = new Array();
        /**
         * Mounted paks
         * @type {Array<PakFileReader>}
         * @public
         */
        this.mountedPaks = new Array();
        /**
         * Mounted I/O store readers
         * @type {Array<FIoStoreReader>}
         * @public
         */
        this.mountedIoStoreReaders = new Array();
        /**
         * AES keys required for readers
         * @see {unloadedPaks}
         * @type {Array<FGuid>}
         * @public
         */
        this.requiredKeys = new Array();
        /**
         * Stored AES keys
         * @type {UnrealMap<FGuid, Buffer>}
         * @public
         */
        this.keys = new UnrealMap_1.UnrealMap();
        /**
         * Global package store (used in e.g fortnite, handles I/O file entries)
         * @type {Lazy<FPackageStore>}
         * @public
         */
        this.globalPackageStore = new Lazy_1.Lazy(() => {
            const globalNameMap = new FNameMap_1.FNameMap();
            const globalPackageStore = new FPackageStore_1.FPackageStore(this, globalNameMap);
            globalNameMap.loadGlobal(this);
            globalPackageStore.setupInitialLoadData();
            //globalPackageStore.setupCulture()
            //globalPackageStore.loadContainers(this.mountedIoStoreReaders.map(m => new FIoDispatcherMountedContainer(m.environment, m.containerId)))
            return globalPackageStore;
        });
        /**
         * Local files
         * @type {Set<string>}
         * @public
         */
        this.localFiles = new Set();
        /**
         * Whether to populate I/O store files
         * @type {boolean}
         * @see {globalPackageStore}
         * @public
         */
        this.populateIoStoreFiles = false;
        this.folder = folder;
        this.game = game || Game_1.Ue4Version.GAME_UE4_LATEST;
        this.mappingsProvider = mappingsProvider || new ReflectionTypeMappingsProvider_1.ReflectionTypeMappingsProvider();
        if (this.game.game >= Game_1.Game.GAME_UE4(26))
            Oodle_1.Oodle.ensureLib();
        if (config) {
            Config_1.Config.GDebugProperties = config.GDebugProperties;
            Config_1.Config.GExportArchiveCheckDummyName = config.GExportArchiveCheckDummyName;
            Config_1.Config.GFatalUnknownProperty = config.GFatalUnknownProperty;
            Config_1.Config.GSuppressMissingSchemaErrors = config.GSuppressMissingSchemaErrors;
        }
    }
    /**
     * Gets stored AES keys as strings
     * @type {UnrealMap<FGuid, string>}
     * @public
     */
    get keysStr() {
        return this.keys.mapValues(it => "0x" + it.toString("hex"));
    }
    /**
     * Submits an aes key to mount
     * @param {FGuid} guid
     * @param {Buffer} key
     * @returns {Promise<void>}
     * @public
     */
    submitKey(guid, key) {
        return Buffer.isBuffer(key) ?
            this.submitKeys(new UnrealMap_1.UnrealMap().set(guid, key)) :
            this.submitKeysStr(new UnrealMap_1.UnrealMap().set(guid, key));
    }
    /**
     * Submits aes key strings to mount
     * @param {UnrealMap<FGuid, string>} keys
     * @returns {Promise<void>}
     * @public
     */
    submitKeysStr(keys) {
        return this.submitKeys(keys.mapValues(it => Aes_1.Aes.parseKey(it)));
    }
    /**
     * Submits aes key strings to mount
     * @param {UnrealMap<FGuid, string>} keys
     * @returns {Promise<void>}
     * @public
     */
    async submitKeys(keys) {
        return await this.submitKeysAsync(keys);
    }
    /**
     * Filters unloaded paks that match the provided guid
     * @param {FGuid} guid Guid to look for
     * @returns {Array<PakFileReader>} Readers that matched the guid
     * @public
     */
    unloadedPaksByGuid(guid) {
        return this.unloadedPaks.filter(it => it.pakInfo.encryptionKeyGuid.equals(guid));
    }
    /**
     * Submits keys asynchronously
     * @param {UnrealMap<FGuid, Buffer>} newKeys Keys to submit
     * @returns {Promise<void>}
     * @public
     */
    async submitKeysAsync(newKeys) {
        for (const [guid, key] of newKeys) {
            this.keys.set(guid, key);
            for (const reader of this.unloadedPaksByGuid(guid)) {
                try {
                    reader.aesKey = key;
                    this.mount(reader);
                    this.unloadedPaks = this.unloadedPaks.filter(v => v !== reader);
                    this.requiredKeys = this.requiredKeys.filter(v => !v.equals(guid));
                }
                catch (e) {
                    if (e instanceof Exceptions_1.InvalidAesKeyException) {
                        this.keys.delete(guid);
                    }
                    else {
                        console.warn(`Uncaught error while loading pak file ${reader.path.substring(reader.path.lastIndexOf("/") + 1)}`, e);
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
    get gameName() {
        const first = this.files.keyArray()[0];
        const subStr = first ? first.substring(0, first.indexOf("/")) : "";
        return subStr.endsWith("game") ? subStr.substring(0, first.indexOf("game")) : "";
    }
    /**
     * Searches for a game file by its path
     * @param {string} filePath The path to search for
     * @returns {?GameFile} The game file or null if it wasn't found
     * @public
     */
    findGameFile(filePath) {
        return this.files.get(this.fixPath(filePath));
    }
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    loadGameFile(x) {
        try {
            if (x instanceof GameFile_1.GameFile) {
                if (x.ioPackageId != null)
                    return this.loadGameFile(x.ioPackageId);
                if (!x.isUE4Package() || !x.hasUexp())
                    throw new Error("The provided file is not a package file");
                const uasset = this.saveGameFile(x);
                const uexp = this.saveGameFile(x.uexp);
                const ubulk = x.hasUbulk() ? this.saveGameFile(x.ubulk) : null;
                return new PakPackage_1.PakPackage(uasset, uexp, ubulk, x.path, this, this.game);
            }
            else if (typeof x === "string") {
                const path = this.fixPath(x);
                const gameFile = this.findGameFile(path);
                if (gameFile)
                    return this.loadGameFile(gameFile);
                // try load from IoStore
                if (this.globalDataLoaded) {
                    const name = this.compactFilePath(x);
                    const packageId = FPackageId_1.createFPackageId(FName_1.FName.dummy(name));
                    try {
                        const ioFile = this.loadGameFile(packageId);
                        if (ioFile)
                            return ioFile;
                    }
                    catch (e) {
                        console.error(e);
                        console.error(`Failed to load package ${path}`);
                    }
                }
                // try load from file system
                if (!path.endsWith(".uasset") && !path.endsWith(".umap"))
                    return null;
                const uasset = this.saveGameFile(path);
                if (!uasset)
                    return null;
                const uexp = this.saveGameFile(path.substring(0, path.lastIndexOf(".")) + ".uexp");
                if (!uexp)
                    return null;
                const ubulk = this.saveGameFile(path.substring(0, path.lastIndexOf(".")) + ".ubulk");
                return new PakPackage_1.PakPackage(uasset, uexp, ubulk, path, this, this.game);
            }
            else {
                let ioBuffer;
                try {
                    ioBuffer = this.saveChunk(IoDispatcher_1.createIoChunkId(x, 0, IoDispatcher_1.EIoChunkType.ExportBundleData));
                }
                catch { }
                if (!ioBuffer)
                    return null;
                return new IoPackage_1.IoPackage(ioBuffer, x, this.globalPackageStore.value, this, this.game);
            }
        }
        catch (e) {
            console.error(`Failed to load package ${x.toString()}`);
            console.error(e);
        }
    }
    /**
     * Loads an ue4 object
     * @param {string} objectPath Path to the object
     * @param {?string} objectName Name of the object (could be left out)
     * @returns {?UObject} The object that matched your args or null
     * @public
     */
    loadObject(objectPath, objectName) {
        if (objectPath == null || objectPath === "None")
            return null;
        let packagePath = objectPath;
        if (objectPath instanceof SoftObjectPath_1.FSoftObjectPath) {
            packagePath = objectPath.assetPathName.text;
        }
        if (objectName == null) {
            const dotIndex = packagePath.indexOf(".");
            if (dotIndex === -1) {
                objectName = packagePath.substring(packagePath.lastIndexOf("/") + 1);
            }
            else {
                objectName = packagePath.substring(dotIndex + 1);
                packagePath = packagePath.substring(0, dotIndex);
            }
        }
        const pkg = this.loadGameFile(packagePath); // TODO allow reading umaps via this route, currently fixPath() only appends .uasset. EDIT(2020-12-15): This works with IoStore assets, but not PAK assets.
        return pkg?.findObjectByName(objectName)?.value;
    }
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    loadLocres(x) {
        try {
            if (x instanceof GameFile_1.GameFile) {
                if (!x.isLocres())
                    return null;
                const locres = this.saveGameFile(x);
                return new Locres_1.Locres(locres, x.path, this.getLocresLanguageByPath(x.path));
            }
            else if (typeof x === "string") {
                // basically String.replaceAll() but it doesnt exist in js yet lol
                if (FnLanguage_1.FnLanguage[x.toUpperCase().split("-").join("_")] != null) {
                    const files = this.files
                        .filter(it => {
                        const path = it.path.toLowerCase();
                        return path.startsWith(`${this.gameName}Game/Content/Localization`.toLowerCase())
                            && path.includes(`/${x}/`.toLowerCase())
                            && path.endsWith(".locres");
                    });
                    if (!files.size)
                        return null;
                    let first = null;
                    for (const file of files.values()) {
                        try {
                            const f = first;
                            if (f == null) {
                                first = this.loadLocres(file);
                            }
                            else {
                                this.loadLocres(file)?.mergeInto(first);
                            }
                        }
                        catch (e) {
                            console.error(`Failed to locres file ${file.getName()}`);
                            console.error(e);
                        }
                    }
                    return first;
                }
                else {
                    const path = this.fixPath(x);
                    const gameFile = this.findGameFile(path);
                    if (gameFile)
                        return this.loadLocres(gameFile);
                    if (!path.endsWith(".locres"))
                        return null;
                    const locres = this.saveGameFile(path);
                    if (!locres)
                        return null;
                    return new Locres_1.Locres(locres, path, this.getLocresLanguageByPath(x));
                }
            }
        }
        catch (e) {
            console.error(`Failed to load locres ${x instanceof GameFile_1.GameFile ? x.path : x}`);
            console.error(e);
        }
    }
    /**
     * Gets a locres language by path
     * @param {string} filePath Path to the locres file
     * @returns {FnLanguage} The locres language
     * @public
     */
    getLocresLanguageByPath(filePath) {
        return FnLanguage_1.valueOfLanguageCode(Utils_1.Utils.takeWhileStr(filePath.split(new RegExp("Localization/(.*?)/"))[2], (it) => it !== "/"));
    }
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    loadAssetRegistry(x) {
        try {
            if (x instanceof GameFile_1.GameFile) {
                if (!x.isAssetRegistry())
                    return null;
                const locres = this.saveGameFile(x);
                return new AssetRegistry_1.AssetRegistry(locres, x.path);
            }
            else {
                const path = this.fixPath(x);
                const gameFile = this.findGameFile(x);
                if (gameFile)
                    return this.loadAssetRegistry(gameFile);
                if (!path.endsWith(".bin"))
                    return null;
                const locres = this.saveGameFile(path);
                return locres ? new AssetRegistry_1.AssetRegistry(locres, path) : null;
            }
        }
        catch (e) {
            console.error(e);
            console.error(`Failed to load asset registry ${x instanceof GameFile_1.GameFile ? x.path : x}`);
        }
    }
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    savePackage(x) {
        if (x instanceof GameFile_1.GameFile) {
            const map = new collection_1.default();
            try {
                if (!x.isUE4Package() || !x.hasUexp()) {
                    const data = this.saveGameFile(x);
                    map.set(x.path, data);
                }
                else {
                    const uasset = this.saveGameFile(x);
                    map.set(x.path, uasset);
                    const uexp = this.saveGameFile(x.uexp);
                    map.set(x.uexp.path, uexp);
                    const ubulk = x.hasUbulk() ? this.saveGameFile(x.ubulk) : null;
                    if (ubulk)
                        map.set(x.ubulk.path, ubulk);
                }
            }
            catch (e) {
                console.error(e);
            }
            return map;
        }
        else {
            const path = this.fixPath(x);
            const gameFile = this.findGameFile(path);
            if (gameFile)
                return this.savePackage(gameFile);
            const map = new collection_1.default();
            try {
                if (path.endsWith(".uasset") || path.endsWith(".umap")) {
                    const uasset = this.saveGameFile(path);
                    if (!uasset)
                        return map;
                    map.set(path, uasset);
                    const uexpPath = path.substring(0, path.lastIndexOf(".")) + ".uexp";
                    const uexp = this.saveGameFile(uexpPath);
                    if (!uexp)
                        return null;
                    map.set(uexpPath, uexp);
                    const ubulkPath = path.substring(0, path.lastIndexOf(".")) + ".ubulk";
                    const ubulk = this.saveGameFile(ubulkPath);
                    map.set(ubulkPath, ubulk);
                }
                else {
                    const data = this.saveGameFile(path);
                    if (!data)
                        return map;
                    map.set(path, data);
                }
            }
            catch (e) {
                console.error(e);
            }
            return map;
        }
    }
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    saveGameFile(x) {
        if (x instanceof GameFile_1.GameFile) {
            if (x.ioPackageId)
                return this.saveChunk(IoDispatcher_1.createIoChunkId(x.ioPackageId, 0, IoDispatcher_1.EIoChunkType.ExportBundleData));
            const reader = this.mountedPaks.find(it => it.path === x.pakFileName);
            if (!reader)
                throw new Error("Couldn't find any possible pak file readers");
            return reader.extract(x);
        }
        else {
            const path = this.fixPath(x);
            const gameFile = this.findGameFile(path);
            return gameFile ? this.saveGameFile(gameFile) : null;
        }
    }
    /**
     * Saves a I/O Store chunk by its ID
     * @param {FIoChunkId} chunkId The chunk ID
     * @returns {Buffer} The chunk data
     * @throws {Error}
     */
    saveChunk(chunkId) {
        for (const reader of this.mountedIoStoreReaders) {
            try {
                return reader.read(chunkId);
            }
            catch (e) {
                if (e.message !== "Unknown chunk ID") {
                    throw e;
                }
            }
        }
        throw new Error("Couldn't find any possible I/O store readers");
    }
    /**
     * Mounts a pak file reader
     * @param {PakFileReader} reader Reader to mount
     * @returns {Promise<void>}
     * @protected
     */
    mount(reader) {
        reader.readIndex();
        reader.files.forEach((it) => this.files.set(it.path.toLowerCase(), it));
        this.mountedPaks.push(reader);
        if (this.globalDataLoaded && reader.Ar instanceof FFileArchive_1.FFileArchive) {
            const absolutePath = reader.path.substring(0, reader.path.lastIndexOf("."));
            const ioStoreEnvironment = new IoDispatcher_1.FIoStoreEnvironment(absolutePath);
            try {
                const ioStoreReader = new IoStore_1.FIoStoreReader();
                ioStoreReader.initialize(ioStoreEnvironment, this.keys);
                if (this.populateIoStoreFiles) {
                    ioStoreReader.getFiles().forEach((it) => this.files.set(it.path.toLowerCase(), it));
                }
                this.mountedIoStoreReaders.push(ioStoreReader);
                /*if (this.globalPackageStore.isInitialized) {
                    this.globalPackageStore.value.onContainerMounted(new FIoDispatcherMountedContainer(ioStoreEnvironment, ioStoreReader.containerId))
                }*/
            }
            catch (e) {
                console.warn("Failed to mount IoStore environment \"%s\"", absolutePath, e);
            }
        }
        this.emit("mounted:reader", reader);
    }
    /**
     * Initializes the file provider
     * @returns {Promise<void>}
     * @public
     */
    async initialize() {
        await ObjectTypeRegistry_1.ObjectTypeRegistry.init();
        this.folder = this.folder.endsWith("/") ? this.folder : this.folder + "/";
        if (!fs_1.default.existsSync(this.folder))
            throw new Exceptions_1.ParserException(`Path '${this.folder}' does not exist!`);
        if (this.game.game >= Game_1.Game.GAME_UE4(26) && !this.globalDataLoaded && this.folder.endsWith("Paks/")) {
            const file = this.folder + "global";
            if (fs_1.default.existsSync(file + ".utoc")) {
                this.loadGlobalData(file);
            }
        }
        const dir = await fs_1.default.readdirSync(this.folder);
        for (const dirEntry of dir) {
            const path = this.folder + dirEntry;
            if (path.endsWith(".pak")) {
                try {
                    const reader = new PakFileReader_1.PakFileReader(path, this.game.game);
                    if (!reader.isEncrypted()) {
                        this.mount(reader);
                    }
                    else {
                        this.unloadedPaks.push(reader);
                        this.requiredKeys.push(reader.pakInfo.encryptionKeyGuid);
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
            else {
                let gamePath = path.substring(this.folder.length);
                if (gamePath.startsWith("\\") || gamePath.startsWith("/")) {
                    gamePath = gamePath.substring(1);
                }
                gamePath = gamePath.replace("\\", "/");
                this.localFiles.add(gamePath.toLowerCase());
            }
        }
        this.emit("ready");
    }
    /**
     * Loads the global data
     * @param {string} path Path to the global data file
     * @returns {void}
     * @protected
     */
    loadGlobalData(path) {
        this.globalDataLoaded = true;
        try {
            const ioStoreReader = new IoStore_1.FIoStoreReader();
            ioStoreReader.initialize(new IoDispatcher_1.FIoStoreEnvironment(path), this.keys);
            this.mountedIoStoreReaders.push(ioStoreReader);
            console.log("Initialized I/O store");
            this.emit("mounted:iostore", ioStoreReader);
        }
        catch (e) {
            console.error("Failed to mount I/O store global environment: '%s'", e.message || e);
        }
    }
    /**
     * Fixes a file path
     * @param {string} filePath File path to fix
     * @returns {string} File path translated into the correct format
     * @public
     */
    fixPath(filePath) {
        const gameName = this.gameName;
        let path = filePath.toLowerCase();
        path = path.replace("\\", "/");
        if (path.startsWith("/"))
            path = path.substring(1);
        const lastPart = path.substring(path.lastIndexOf("/") + 1);
        if (lastPart.includes(".") && lastPart.substring(0, lastPart.indexOf(".")) === lastPart.substring(lastPart.indexOf(".") + 1))
            path = path.substring(0, path.lastIndexOf(".")) + "/" + lastPart.substring(0, lastPart.indexOf("."));
        if (!path.endsWith("/") && !path.substring(path.lastIndexOf("/") + 1).includes("."))
            path += ".uasset";
        if (path.startsWith("game/")) {
            path =
                path.startsWith("game/content/") ? path.replace("game/content/", gameName + "game/content/") :
                    path.startsWith("game/config/") ? path.replace("game/config/", gameName + "game/config/") :
                        path.startsWith("game/plugins/") ? path.replace("game/plugins/", gameName + "game/plugins/") :
                            (path.includes("assetregistry") || path.endsWith(".uproject")) ? path.replace("game/", `${gameName}game/`) :
                                path.replace("game/", gameName + "game/content/");
        }
        else if (path.startsWith("engine/")) {
            path =
                path.startsWith("engine/content/") ? path :
                    path.startsWith("engine/config/") ? path :
                        path.startsWith("engine/plugins") ? path :
                            path.replace("engine/", "engine/content/");
        }
        return path.toLowerCase();
    }
    /**
     * Compacts a file path
     * @param {string} path Path to compact
     * @warning This does convert FortniteGame/Plugins/GameFeatures/GameFeatureName/Content/Package into /GameFeatureName/Package
     * @returns {string}
     * @public
     */
    compactFilePath(path) {
        path = path.toLowerCase();
        if (path[0] === "/") {
            return path;
        }
        if (path.startsWith("engine/content")) { // -> /Engine
            return "/engine" + path.substring("engine/content".length);
        }
        if (path.startsWith("engine/plugins")) { // -> /Plugins
            return path.substring("engine".length);
        }
        const delim = path.indexOf("/content/");
        return delim === -1 ? path : "/game" + path.substring(delim + "/content".length);
    }
}
exports.FileProvider = FileProvider;
