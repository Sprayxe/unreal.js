/// <reference types="node" />
/// <reference types="ref-napi" />
import { IJson, Package } from "./Package";
import { FPackageStore } from "../asyncloading2/FPackageStore";
import { FExportBundleEntry, FExportBundleHeader, FExportMapEntry, FPackageObjectIndex, FPackageSummary, FScriptObjectEntry } from "../asyncloading2/AsyncLoading2";
import { FNameMap } from "../asyncloading2/FNameMap";
import { UObject } from "./exports/UObject";
import { FArchive } from "../reader/FArchive";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FName } from "../objects/uobject/FName";
import { FPackageIndex } from "../objects/uobject/ObjectResource";
import { Locres } from "../locres/Locres";
import { Lazy } from "../../util/Lazy";
import { Ue4Version } from "../versions/Game";
/**
 * UE4 I/O Package
 * @extends {Package}
 */
export declare class IoPackage extends Package {
    /**
     * Package ID
     * @type {bigint}
     * @public
     */
    packageId: bigint;
    /**
     * Package Store
     * @type {FPackageStore}
     * @public
     */
    globalPackageStore: FPackageStore;
    /**
     * Package Summary
     * @type {FPackageSummary}
     * @public
     */
    summary: FPackageSummary;
    /**
     * Name Map
     * @type {FNameMap}
     * @public
     */
    nameMap: FNameMap;
    /**
     * Import Map
     * @type {Array<FPackageObjectIndex>}
     * @public
     */
    importMap: FPackageObjectIndex[];
    /**
     * Export Map
     * @type {Array<FExportMapEntry>}
     * @public
     */
    exportMap: FExportMapEntry[];
    /**
     * Export Bundle Headers
     * @type {Array<FExportBundleHeader>}
     * @public
     */
    exportBundleHeaders: FExportBundleHeader[];
    /**
     * Export Bundle Entries
     * @type {Array<FExportBundleEntry>}
     * @public
     */
    exportBundleEntries: FExportBundleEntry[];
    /**
     * Graph Data
     * @type {Array<FImportedPackage>}
     * @public
     */
    graphData: FImportedPackage[];
    /**
     * Imported Packages
     * @type {Lazy<Array<IoPackage>>}
     * @public
     */
    importedPackages: Lazy<IoPackage[]>;
    /**
     * Lazy Exports
     * @type {Array<Lazy<UObject>>}
     * @public
     */
    exportsLazy: Lazy<UObject>[];
    /**
     * Offset start of bulk data
     * @type {number}
     * @public
     */
    bulkDataStartOffset: number;
    /**
     * Creates an instance
     * @param {Buffer} uasset Uasset data of package
     * @param {bigint} packageId ID of package
     * @param {FPackageStore} globalPackageStore Package store
     * @param {FileProvider} provider Instance of file provider
     * @param {Ue4Version} game Version of package
     */
    constructor(uasset: Buffer, packageId: bigint, globalPackageStore: FPackageStore, provider: FileProvider, game?: Ue4Version);
    /**
     * Resolves an object index
     * @param {FPackageObjectIndex} index Object index to resolve
     * @param {boolean} throwIfNotFound (default: true) Whether to throw an error if it wasn't found
     * @returns {ResolvedExportObject | ResolvedScriptObject | null} Object
     * @public
     */
    resolveObjectIndex(index: FPackageObjectIndex, throwIfNotFound?: boolean): ResolvedExportObject | ResolvedScriptObject;
    /**
     * Finds an object by FPackageIndex
     * @param {FPackageIndex} index Index to look for
     * @returns {?any} Object or null
     * @public
     */
    findObject<T>(index?: FPackageIndex): T;
    /**
     * Finds an object by name
     * @param {string} objectName Name of object
     * @param {?string} className Class name of object
     * @returns {?Lazy<UObject>} Object or null
     * @public
     */
    findObjectByName(objectName: string, className?: string): Lazy<UObject>;
    /**
     * Turns this package into json
     * @param {?Locres} locres Locres to use
     * @returns {Array<IJson>} Json data
     * @public
     */
    toJson(locres?: Locres): IJson[];
    /**
     * Finds an object minimal
     * @param {?FPackageIndex} index Index to look for
     * @returns {ResolvedExportObject | ResolvedScriptObject} Object
     * @public
     */
    findObjectMinimal(index?: FPackageIndex): ResolvedExportObject | ResolvedScriptObject;
}
export declare class FImportedPackage {
    importedPackageId: bigint;
    externalArcs: FArc[];
    constructor(Ar: FArchive);
}
export declare class FArc {
    fromExportBundleIndex: number;
    toExportBundleIndex: number;
    constructor(Ar: FArchive);
}
export declare abstract class ResolvedObject {
    pkg: IoPackage;
    constructor(pkg: IoPackage);
    abstract get name(): FName;
    getOuter(): ResolvedObject;
    getSuper(): ResolvedObject;
    getObject(): Lazy<UObject>;
}
export declare class ResolvedExportObject extends ResolvedObject {
    exportIndex: number;
    exportMapEntry: FExportMapEntry;
    exportObject: Lazy<UObject>;
    constructor(exportIndex: number, pkg: IoPackage);
    get name(): FName;
    getOuter(): ResolvedExportObject | ResolvedScriptObject;
    getSuper(): ResolvedExportObject | ResolvedScriptObject;
    getObject(): Lazy<UObject>;
}
export declare class ResolvedScriptObject extends ResolvedObject {
    scriptImport: FScriptObjectEntry;
    constructor(scriptImport: FScriptObjectEntry, pkg: IoPackage);
    get name(): FName;
    getOuter(): ResolvedExportObject | ResolvedScriptObject;
    getObject(): Lazy<UObject>;
}
