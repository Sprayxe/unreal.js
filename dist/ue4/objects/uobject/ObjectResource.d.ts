import { Package } from "../../assets/Package";
import { FName } from "./FName";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FGuid } from "../core/misc/Guid";
import { UObject } from "../../assets/exports/UObject";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";
import { Lazy } from "../../../util/Lazy";
/**
 * FPackageIndex
 */
export declare class FPackageIndex {
    /**
     * index
     * @type {number}
     * @public
     */
    index: number;
    /**
     * Owner
     * @type {Package}
     * @public
     */
    owner: Package;
    /**
     * Name
     * @type {FName}
     * @public
     */
    get name(): FName;
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates instance using values
     * @param {number} index Index to use
     * @param {?Package} owner Package to use
     * @constructor
     * @public
     */
    constructor(index: number, owner?: Package);
    /**
     * Whether is import
     * @returns {boolean} Result
     * @public
     */
    isImport(): boolean;
    /**
     * Whether is export
     * @returns {boolean} Result
     * @public
     */
    isExport(): boolean;
    /**
     * Whether is null
     * @returns {boolean} Result
     * @public
     */
    isNull(): boolean;
    /**
     * Turns this to import
     * @returns {number} Import value
     * @public
     */
    toImport(): number;
    /**
     * Turns this to export
     * @returns {number} Export value
     * @public
     */
    toExport(): number;
    /**
     * Whether equals other object
     * @param {?any} other Object to check
     * @returns {boolean} Result
     * @public
     */
    equals(other: any): boolean;
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString(): string;
    /**
     * Loads object (WARNING: MIGHT BE RECURSIVE, TRY TO AVOID THIS)
     * @returns {UObject} Object
     * @public
     */
    load<T extends UObject>(): T;
}
/**
 * FObjectResource
 * @abstract
 */
export declare abstract class FObjectResource {
    /**
     * objectName
     * @type {FName}
     * @public
     */
    objectName: FName;
    /**
     * outerIndex
     * @type {FPackageIndex}
     * @public
     */
    outerIndex: FPackageIndex;
}
/**
 * FObjectExport
 * @extends {FObjectResource}
 */
export declare class FObjectExport extends FObjectResource {
    /**
     * classIndex
     * @type {FPackageIndex}
     * @public
     */
    classIndex: FPackageIndex;
    /**
     * superIndex
     * @type {FPackageIndex}
     * @public
     */
    superIndex: FPackageIndex;
    /**
     * templateIndex
     * @type {FPackageIndex}
     * @public
     */
    templateIndex: FPackageIndex;
    /**
     * objectFlags
     * @type {number}
     * @public
     */
    objectFlags: number;
    /**
     * serialSize
     * @type {number}
     * @public
     */
    serialSize: number;
    /**
     * serialOffset
     * @type {number}
     * @public
     */
    serialOffset: number;
    /**
     * forcedExport
     * @type {boolean}
     * @public
     */
    forcedExport: boolean;
    /**
     * notForClient
     * @type {boolean}
     * @public
     */
    notForClient: boolean;
    /**
     * notForServer
     * @type {boolean}
     * @public
     */
    notForServer: boolean;
    /**
     * packageGuid
     * @type {FGuid}
     * @public
     */
    packageGuid: FGuid;
    /**
     * packageFlags
     * @type {number}
     * @public
     */
    packageFlags: number;
    /**
     * notAlwaysLoadedForEditorGame
     * @type {boolean}
     * @public
     */
    notAlwaysLoadedForEditorGame: boolean;
    /**
     * isAsset
     * @type {boolean}
     * @public
     */
    isAsset: boolean;
    /**
     * firstExportDependency
     * @type {number}
     * @public
     */
    firstExportDependency: number;
    /**
     * serializationBeforeSerializationDependencies
     * @type {number}
     * @public
     */
    serializationBeforeSerializationDependencies: number;
    /**
     * createBeforeSerializationDependencies
     * @type {number}
     * @public
     */
    createBeforeSerializationDependencies: number;
    /**
     * serializationBeforeCreateDependencies
     * @type {number}
     * @public
     */
    serializationBeforeCreateDependencies: number;
    /**
     * createBeforeCreateDependencies
     * @type {number}
     * @public
     */
    createBeforeCreateDependencies: number;
    /**
     * exportObject
     * @type {Lazy<UObject>}
     * @public
     */
    exportObject: Lazy<UObject>;
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    constructor(classIndex: FPackageIndex, superIndex: FPackageIndex, templateIndex: FPackageIndex, outerIndex: FPackageIndex, objectName: FName, objectFlags: number, serialSize: number, serialOffset: number, forcedExport: boolean, notForClient: boolean, notForServer: boolean, packageGuid: FGuid, packageFlags: number, notAlwaysLoadedForEditorGame: boolean, isAsset: boolean, firstExportDependency: number, serializationBeforeSerializationDependencies: number, createBeforeSerializationDependencies: number, serializationBeforeCreateDependencies: number, createBeforeCreateDependencies: number);
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString(): string;
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
}
/**
 * FObjectImport
 * @extends {FObjectResource}
 */
export declare class FObjectImport extends FObjectResource {
    /**
     * classPackage
     * @type {FName}
     * @public
     */
    classPackage: FName;
    /**
     * className
     * @type {FName}
     * @public
     */
    className: FName;
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates an instance using values
     * @param {FName} classPackage Class package to use
     * @param {FName} className Class name to use
     * @param {FPackageIndex} outerIndex Outer index to use
     * @param {FName} objectName Object name to use
     * @constructor
     * @public
     */
    constructor(classPackage: FName, className: FName, outerIndex: FPackageIndex, objectName: FName);
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString(): string;
}
