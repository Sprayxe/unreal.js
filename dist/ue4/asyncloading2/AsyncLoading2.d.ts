/// <reference types="node" />
/// <reference types="ref-napi" />
import { FArchive } from "../reader/FArchive";
import { FMinimalName } from "../objects/uobject/NameTypes";
import { Pair } from "../../util/Pair";
import Long from "long";
import Collection from "@discordjs/collection";
export declare type FSourceToLocalizedPackageIdMap = Pair<bigint, bigint>[];
export declare type FCulturePackageMap = Collection<string, FSourceToLocalizedPackageIdMap>;
export declare const INVALID_INDEX: number;
export declare const INDEX_BITS = 30;
export declare const INDEX_MASK: number;
export declare const TYPE_MASK: number;
export declare const TYPE_SHIFT = 30;
/**
 * FMappedName
 */
export declare class FMappedName {
    /**
     * Creates an instance
     * @param {number} index Index to use
     * @param {number} num Number to use
     * @param {FMappedName_EType} type Type of FMappedName
     * @returns {FMappedName} Instance
     * @public
     * @static
     */
    static create(index: number, num: number, type: FMappedName_EType): FMappedName;
    /**
     * Creates an instance from FMinimalName
     * @param {FMinimalName} minimalName Minimal name to use
     * @returns {FMappedName}
     * @public
     */
    static fromMinimalName(minimalName: FMinimalName): FMappedName;
    /**
     * Whether is resolved to minimal name
     * @param {FMinimalName} minimalName Minimal name to check
     * @returns {boolean}
     * @public
     */
    static isResolvedToMinimalName(minimalName: FMinimalName): boolean;
    /**
     * Index
     * @type {number}
     * @public
     */
    index: number;
    /**
     * Num
     * @type {number}
     * @public
     */
    num: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar?: FArchive);
    /**
     * Whether is valid
     * @returns {boolean} Result
     * @public
     */
    isValid(): boolean;
    /**
     * Gets type
     * @returns {number} Type
     * @public
     */
    getType(): number;
    /**
     * Whether is global
     * @returns {boolean} Result
     * @public
     */
    isGlobal(): boolean;
    /**
     * Gets index
     * @returns {number} Index
     * @public
     */
    getIndex(): number;
    /**
     * Whether equals another object
     * @param {?any} other Object to check
     * @returns {boolean}
     * @public
     */
    equals(other?: any): boolean;
}
/**
 * FMappedName_EType
 * @enum
 */
export declare enum FMappedName_EType {
    Package = 0,
    Container = 1,
    Global = 2
}
/**
 * FPackageStoreEntry
 */
export declare class FPackageStoreEntry {
    /**
     * exportBundlesSize
     * @type {number}
     * @public
     */
    exportBundlesSize: number;
    /**
     * exportCount
     * @type {number}
     * @public
     */
    exportCount: number;
    /**
     * exportBundleCount
     * @type {number}
     * @public
     */
    exportBundleCount: number;
    /**
     * loadOrder
     * @type {number}
     * @public
     */
    loadOrder: number;
    /**
     * pad
     * @type {number}
     * @public
     */
    pad: number;
    /**
     * importedPackages
     * @type {Array<string>}
     * @public
     */
    importedPackages: string[];
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Reads array view
     * @param {FArchive} Ar UE4 Reader to use
     * @param {any} init Method for initializing array entries
     * @returns {Array<any>}
     * @example <FPackageStoreEntry>.readCArrayView(Ar, (_Ar) => _Ar.readUInt64().toString())
     * @private
     */
    private readCArrayView;
}
export declare const _INDEX_BITS = 62;
export declare const _INDEX_MASK: number;
export declare const _TYPE_SHIFT = 62;
export declare const INVALID: Long.Long;
/**
 * FPackageObjectIndex
 */
export declare class FPackageObjectIndex {
    /**
     * typeAndId
     * @type {number}
     * @private
     */
    private readonly typeAndId;
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance using values
     * @param {FPackageObjectIndex_EType} type Type of object index
     * @param {Long} id Id of object index
     * @constructor
     * @public
     */
    constructor(type: FPackageObjectIndex_EType, id: Long.Long);
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Generates import hash from object path
     * @param {string} objectPath Object path to hash
     * @returns {Long} Hash
     * @public
     * @static
     */
    static generateImportHashFromObjectPath(objectPath: string): Long.Long;
    /**
     * Creates instance from export index
     * @param {number} index Export index
     * @returns {FPackageObjectIndex} Instance
     * @public
     */
    static fromExportIndex(index: number): FPackageObjectIndex;
    /**
     * Creates instance from script path
     * @param {string} scriptObjectPath Script object path
     * @returns {FPackageObjectIndex} Instance
     * @public
     */
    static fromScriptPath(scriptObjectPath: string): FPackageObjectIndex;
    /**
     * Creates instance from package path
     * @param {string} packageObjectPath Package objectPath path
     * @returns {FPackageObjectIndex} Instance
     * @public
     */
    static fromPackagePath(packageObjectPath: string): FPackageObjectIndex;
    /**
     * Whether is null
     * @returns {boolean} Result
     * @public
     */
    isNull(): boolean;
    /**
     * Whether is export
     * @returns {boolean} Result
     * @public
     */
    isExport(): boolean;
    /**
     * Whether is import
     * @returns {boolean} Result
     * @public
     */
    isImport(): boolean;
    /**
     * Whether is script import
     * @returns {boolean} Result
     * @public
     */
    isScriptImport(): boolean;
    /**
     * Whether is package import
     * @returns {boolean} Result
     * @public
     */
    isPackageImport(): boolean;
    /**
     * Returns export value
     * @returns {number} Export
     * @public
     */
    toExport(): Long.Long;
    /**
     * Returns type
     * @returns {number} type
     * @public
     */
    type(): number;
    /**
     * Returns value
     * @returns {number} value
     * @public
     */
    value(): Long.Long;
    /**
     * Whether equals other object
     * @param {?any} other Object to check
     * @returns {boolean} Result
     * @public
     */
    equals(other?: any): boolean;
}
/**
 * FPackageObjectIndex_EType
 * @enum
 */
export declare enum FPackageObjectIndex_EType {
    Export = 0,
    ScriptImport = 1,
    PackageImport = 2,
    Null = 3
}
/**
 * FScriptObjectEntry
 */
export declare class FScriptObjectEntry {
    /**
     * objectName
     * @type {FMinimalName}
     * @public
     */
    objectName: FMinimalName;
    /**
     * globalIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    globalIndex: FPackageObjectIndex;
    /**
     * outerIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    outerIndex: FPackageObjectIndex;
    /**
     * cdoClassIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    cdoClassIndex: FPackageObjectIndex;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {Array<string>} nameMap Name map
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, nameMap: string[]);
}
/**
 * FContainerHeader
 */
export declare class FContainerHeader {
    /**
     * ID
     * @type {bigint}
     * @public
     */
    containerId: bigint;
    /**
     * packageCount
     * @type {number}
     * @public
     */
    packageCount: number;
    /**
     * names
     * @type {Buffer}
     * @public
     */
    names: Buffer;
    /**
     * nameHashes
     * @type {Buffer}
     * @public
     */
    nameHashes: Buffer;
    /**
     * packageIds
     * @type {Array<bigint>}
     * @public
     */
    packageIds: bigint[];
    /**
     * storeEntries
     * @type {Array<FPackageStoreEntry>}
     * @public
     */
    storeEntries: FPackageStoreEntry[];
    /**
     * culturePackageMap
     * @type {FCulturePackageMap}
     * @public
     */
    culturePackageMap: FCulturePackageMap;
    /**
     * packageRedirects
     * @type {Array<Pair<bigint, bigint>>}
     * @public
     */
    packageRedirects: Pair<bigint, bigint>[];
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FPackageSummary
 */
export declare class FPackageSummary {
    /**
     * Name
     * @type {FMappedName}
     * @public
     */
    name: FMappedName;
    /**
     * sourceName
     * @type {FMappedName}
     * @public
     */
    sourceName: FMappedName;
    /**
     * packageFlags
     * @type {number}
     * @public
     */
    packageFlags: number;
    /**
     * cookedHeaderSize
     * @type {number}
     * @public
     */
    cookedHeaderSize: number;
    /**
     * nameMapNamesOffset
     * @type {number}
     * @public
     */
    nameMapNamesOffset: number;
    /**
     * nameMapNamesSize
     * @type {number}
     * @public
     */
    nameMapNamesSize: number;
    /**
     * nameMapHashesOffset
     * @type {number}
     * @public
     */
    nameMapHashesOffset: number;
    /**
     * nameMapHashesSize
     * @type {number}
     * @public
     */
    nameMapHashesSize: number;
    /**
     * importMapOffset
     * @type {number}
     * @public
     */
    importMapOffset: number;
    /**
     * exportMapOffset
     * @type {number}
     * @public
     */
    exportMapOffset: number;
    /**
     * exportBundlesOffset
     * @type {number}
     * @public
     */
    exportBundlesOffset: number;
    /**
     * graphDataOffset
     * @type {number}
     * @public
     */
    graphDataOffset: number;
    /**
     * graphDataSize
     * @type {number}
     * @public
     */
    graphDataSize: number;
    /**
     * pad
     * @type {number}
     * @public
     */
    pad: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FExportMapEntry
 */
export declare class FExportMapEntry {
    /**
     * cookedSerialOffset
     * @type {number}
     * @public
     */
    cookedSerialOffset: number;
    /**
     * cookedSerialSize
     * @type {number}
     * @public
     */
    cookedSerialSize: number;
    /**
     * objectName
     * @type {FMappedName}
     * @public
     */
    objectName: FMappedName;
    /**
     * outerIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    outerIndex: FPackageObjectIndex;
    /**
     * classIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    classIndex: FPackageObjectIndex;
    /**
     * superIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    superIndex: FPackageObjectIndex;
    /**
     * templateIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    templateIndex: FPackageObjectIndex;
    /**
     * globalImportIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    globalImportIndex: FPackageObjectIndex;
    /**
     * objectFlags
     * @type {number}
     * @public
     */
    objectFlags: number;
    /**
     * filterFlags
     * @type {number}
     * @public
     */
    filterFlags: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FExportBundleHeader
 */
export declare class FExportBundleHeader {
    /**
     * firstEntryIndex
     * @type {number}
     * @public
     */
    firstEntryIndex: number;
    /**
     * entryCount
     * @type {number}
     * @public
     */
    entryCount: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FExportBundleEntry
 */
export declare class FExportBundleEntry {
    /**
     * localExportIndex
     * @type {number}
     * @public
     */
    localExportIndex: number;
    /**
     * commandType
     * @type {EExportCommandType}
     * @public
     */
    commandType: EExportCommandType;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * EExportCommandType
 * @enum
 */
export declare enum EExportCommandType {
    ExportCommandType_Create = 0,
    ExportCommandType_Serialize = 1,
    ExportCommandType_Count = 2
}
