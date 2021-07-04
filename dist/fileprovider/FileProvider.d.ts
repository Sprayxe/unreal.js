/// <reference types="node" />
/// <reference types="ref-napi" />
import { Ue4Version } from "../ue4/versions/Game";
import { GameFile } from "../ue4/pak/GameFile";
import { Package } from "../ue4/assets/Package";
import { TypeMappingsProvider } from "../ue4/assets/mappings/TypeMappingsProvider";
import { Locres } from "../ue4/locres/Locres";
import { FnLanguage } from "../ue4/locres/FnLanguage";
import { AssetRegistry } from "../ue4/registry/AssetRegistry";
import { FIoChunkId } from "../ue4/io/IoDispatcher";
import { IoPackage } from "../ue4/assets/IoPackage";
import { UnrealMap } from "../util/UnrealMap";
import { PakFileReader } from "../ue4/pak/PakFileReader";
import { FIoStoreReader } from "../ue4/io/IoStore";
import { FGuid } from "../ue4/objects/core/misc/Guid";
import { FPackageStore } from "../ue4/asyncloading2/FPackageStore";
import { Lazy } from "../util/Lazy";
import Collection from "@discordjs/collection";
import EventEmitter from "events";
import { UObject } from "../ue4/assets/exports/UObject";
import { FSoftObjectPath } from "../ue4/objects/uobject/SoftObjectPath";
import { IConfig } from "../Config";
/**
 * The main hub for interacting with ue4 assets
 * @extends {EventEmitter}
 */
export declare class FileProvider extends EventEmitter {
    /**
     * Path to paks folder
     * @type {string}
     * @public
     */
    folder: string;
    /**
     * Whether global data is loaded or not
     * @type {boolean}
     * @protected
     */
    protected globalDataLoaded: boolean;
    /**
     * Game which is being used
     * @type {Ue4Version}
     * @public
     */
    game: Ue4Version;
    /**
     * Type mappings to use
     * @type {TypeMappingsProvider}
     * @public
     */
    mappingsProvider: TypeMappingsProvider;
    /**
     * Non I/O store files in current instance
     * @type {Collection<string, GameFile>}
     * @public
     */
    files: Collection<string, GameFile>;
    /**
     * Non mounted paks
     * @type {Array<PakFileReader>}
     * @public
     */
    unloadedPaks: PakFileReader[];
    /**
     * Mounted paks
     * @type {Array<PakFileReader>}
     * @public
     */
    mountedPaks: PakFileReader[];
    /**
     * Mounted I/O store readers
     * @type {Array<FIoStoreReader>}
     * @public
     */
    mountedIoStoreReaders: FIoStoreReader[];
    /**
     * AES keys required for readers
     * @see {unloadedPaks}
     * @type {Array<FGuid>}
     * @public
     */
    requiredKeys: FGuid[];
    /**
     * Stored AES keys
     * @type {UnrealMap<FGuid, Buffer>}
     * @public
     */
    keys: UnrealMap<FGuid, Buffer>;
    /**
     * Global package store (used in e.g fortnite, handles I/O file entries)
     * @type {Lazy<FPackageStore>}
     * @public
     */
    globalPackageStore: Lazy<FPackageStore>;
    /**
     * Local files
     * @type {Set<string>}
     * @public
     */
    localFiles: Set<string>;
    /**
     * Whether to populate I/O store files
     * @type {boolean}
     * @see {globalPackageStore}
     * @public
     */
    populateIoStoreFiles: boolean;
    /**
     * Creates a new instance of the file provider
     * @param {string} folder Path to pak folder
     * @param {?Ue4Version} game Used game
     * @param {?TypeMappingsProvider} mappingsProvider Type mappings provider to use
     * @param {?Config} config Configurations for the lib
     * @public
     */
    constructor(folder: string, game?: Ue4Version, mappingsProvider?: TypeMappingsProvider, config?: IConfig);
    /**
     * Gets stored AES keys as strings
     * @type {UnrealMap<FGuid, string>}
     * @public
     */
    get keysStr(): UnrealMap<FGuid, string>;
    /**
     * Submits an aes key to mount
     * @param {FGuid} guid
     * @param {Buffer} key
     * @returns {Promise<void>}
     * @public
     */
    submitKey(guid: FGuid, key: Buffer | string): Promise<void>;
    /**
     * Submits aes key strings to mount
     * @param {UnrealMap<FGuid, string>} keys
     * @returns {Promise<void>}
     * @public
     */
    submitKeysStr(keys: UnrealMap<FGuid, string>): Promise<void>;
    /**
     * Submits aes key strings to mount
     * @param {UnrealMap<FGuid, string>} keys
     * @returns {Promise<void>}
     * @public
     */
    submitKeys(keys: UnrealMap<FGuid, Buffer>): Promise<void>;
    /**
     * Filters unloaded paks that match the provided guid
     * @param {FGuid} guid Guid to look for
     * @returns {Array<PakFileReader>} Readers that matched the guid
     * @public
     */
    unloadedPaksByGuid(guid: FGuid): PakFileReader[];
    /**
     * Submits keys asynchronously
     * @param {UnrealMap<FGuid, Buffer>} newKeys Keys to submit
     * @returns {Promise<void>}
     * @public
     */
    submitKeysAsync(newKeys: UnrealMap<FGuid, Buffer>): Promise<void>;
    /**
     * Name of the game that is loaded by the provider
     * @type {string}
     * @public
     */
    get gameName(): string;
    /**
     * Searches for a game file by its path
     * @param {string} filePath The path to search for
     * @returns {?GameFile} The game file or null if it wasn't found
     * @public
     */
    findGameFile(filePath: string): GameFile;
    /**
     * Loads a UE4 package
     * @param {GameFile} file The game file to load
     * @returns {?Package} The parsed package or null if the file was not an ue4 package (.uasset)
     * @public
     */
    loadGameFile(file: GameFile): Package;
    /**
     * Loads a UE4 package from I/O Store by package ID
     * @param {bigint} packageId The package ID to load
     * @returns {?IoPackage} The parsed package or null if not found
     * @public
     */
    loadGameFile(packageId: bigint): IoPackage;
    /**
     * Searches for the game file and then load its contained package
     * @param {string} filePath The path to search for
     * @returns {?Package} The parsed package or null if the path was not found or the found game file was not an ue4 package (.uasset)
     * @public
     */
    loadGameFile(filePath: string): Package;
    /**
     * Loads an ue4 object
     * @param {string} objectPath Path to the object
     * @param {?string} objectName Name of the object (could be left out)
     * @returns {?UObject} The object that matched your args or null
     * @public
     */
    loadObject<T extends UObject>(objectPath: string | FSoftObjectPath, objectName?: string): T;
    /**
     * Searches for the game file and then load its contained locres
     * @param {string} filePath The path to search for
     * @returns {?Locres} The parsed package or null if the path was not found or the found game file was not an ue4 package (.uasset)
     * @public
     */
    loadLocres(filePath: string): Locres;
    /**
     * Loads a UE4 Locres file
     * @param {string} file The game file to load
     * @returns {?Locres} The parsed locres or null if the file was not an ue4 locres (.locres)
     * @public
     */
    loadLocres(file: GameFile): Locres;
    /**
     * Loads a UE4 Locres file
     * @param {FnLanguage} ln Language to load
     * @returns {?Locres} The parsed locres or null if not found
     * @public
     */
    loadLocres(ln: FnLanguage): any;
    /**
     * Gets a locres language by path
     * @param {string} filePath Path to the locres file
     * @returns {FnLanguage} The locres language
     * @public
     */
    getLocresLanguageByPath(filePath: string): FnLanguage;
    /**
     * Searches for the game file and then loads a UE4 AssetRegistry file
     * @param {string} filePath The path to search for
     * @returns {?AssetRegistry} The parsed asset registry or null
     * @public
     */
    loadAssetRegistry(filePath: string): AssetRegistry;
    /**
     * Loads a UE4 AssetRegistry file
     * @param {string} file The game file to load
     * @returns {?AssetRegistry} The parsed asset registry or null
     * @public
     */
    loadAssetRegistry(file: GameFile): AssetRegistry;
    /**
     * Searches for the game file and then saves all parts of this package
     * @param {string} filePath The path to search for
     * @returns {?Collection<string, Buffer>} A map with the files name as key and data as value or null
     * @public
     */
    savePackage(filePath: string): Collection<string, Buffer>;
    /**
     * Saves all parts of this package
     * @param {GameFile} file The game file to save
     * @returns {?Collection<string, Buffer>} A map with the files name as key and data as value
     */
    savePackage(file: GameFile): Collection<string, Buffer>;
    /**
     * Searches for the game file and then saves the it
     * @param {string} filePath Path to the file to save
     * @returns {?Buffer} The files data or null
     */
    saveGameFile(filePath: string): Buffer;
    /**
     * Saves the game file
     * @param {GameFile} file The game file to save
     * @returns {?Buffer} The files data or null
     */
    saveGameFile(file: GameFile): Buffer;
    /**
     * Saves a I/O Store chunk by its ID
     * @param {FIoChunkId} chunkId The chunk ID
     * @returns {Buffer} The chunk data
     * @throws {Error}
     */
    saveChunk(chunkId: FIoChunkId): Buffer;
    /**
     * Mounts a pak file reader
     * @param {PakFileReader} reader Reader to mount
     * @returns {Promise<void>}
     * @protected
     */
    protected mount(reader: PakFileReader): void;
    /**
     * Initializes the file provider
     * @returns {Promise<void>}
     * @public
     */
    initialize(): Promise<void>;
    /**
     * Loads the global data
     * @param {string} path Path to the global data file
     * @returns {void}
     * @protected
     */
    protected loadGlobalData(path: string): void;
    /**
     * Fixes a file path
     * @param {string} filePath File path to fix
     * @returns {string} File path translated into the correct format
     * @public
     */
    fixPath(filePath: string): string;
    /**
     * Compacts a file path
     * @param {string} path Path to compact
     * @warning This does convert FortniteGame/Plugins/GameFeatures/GameFeatureName/Content/Package into /GameFeatureName/Package
     * @returns {string}
     * @public
     */
    compactFilePath(path: string): string;
}
