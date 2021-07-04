/// <reference types="node" />
/// <reference types="ref-napi" />
import { FileProvider } from "../../fileprovider/FileProvider";
import { Ue4Version } from "../versions/Game";
import { FNameEntry } from "../objects/uobject/FName";
import { IJson, Package } from "./Package";
import { FPackageFileSummary } from "../objects/uobject/PackageFileSummary";
import { FObjectExport, FObjectImport, FPackageIndex } from "../objects/uobject/ObjectResource";
import { UObject } from "./exports/UObject";
import { Locres } from "../locres/Locres";
import { FAssetArchiveWriter } from "./writer/FAssetArchiveWriter";
import { WritableStreamBuffer } from "stream-buffers";
import { Lazy } from "../../util/Lazy";
/**
 * UE4 Pak Package
 * @extends {Package}
 */
export declare class PakPackage extends Package {
    /**
     * Pak magic
     * @type {number}
     * @protected
     */
    protected packageMagic: number;
    /**
     * UASSET data
     * @type {Buffer}
     * @public
     */
    uasset: Buffer;
    /**
     * UEXP data
     * @type {?Buffer}
     * @public
     */
    uexp?: Buffer;
    /**
     * UBULK data
     * @type {?Buffer}
     * @public
     */
    ubulk?: Buffer;
    /**
     * Name of package file
     * @type {string}
     * @public
     */
    fileName: string;
    /**
     * File provider
     * @type {?FileProvider}
     * @public
     */
    provider?: FileProvider;
    /**
     * Game that is used
     * @type {Ue4Version}
     * @public
     */
    game: Ue4Version;
    /**
     * Version that is used
     * @type {number}
     * @public
     */
    version: number;
    /**
     * Information about package
     * @type {FPackageFileSummary}
     * @public
     */
    info: FPackageFileSummary;
    /**
     * Name map
     * @type {Array<FNameEntry>}
     * @public
     */
    nameMap: FNameEntry[];
    /**
     * Import map
     * @type {Array<FObjectImport>}
     * @public
     */
    importMap: FObjectImport[];
    /**
     * Export map
     * @type {Array<FObjectExport>}
     * @public
     */
    exportMap: FObjectExport[];
    /**
     * Stores lazy exports
     * @type {Array<Lazy<UObject>>}
     * @public
     */
    get exportsLazy(): Lazy<UObject>[];
    /**
     * Creates an instance
     * @param {Buffer} uasset Uasset data
     * @param {?Buffer} uexp Uexp data
     * @param {?Buffer} ubulk Ubulk data
     * @param {string} name Name of package file
     * @param {?FileProvider} provider File provider
     * @param {?Ue4Version} game Game that is used
     * @constructor
     * @public
     */
    constructor(uasset: Buffer, uexp: Buffer, ubulk: Buffer, name: string, provider?: FileProvider, game?: Ue4Version);
    /**
     * Finds an object by index
     * @param {?FPackageIndex} index Index to find
     * @returns {?Lazy<any>} Object or null
     * @public
     */
    findObject<T>(index?: FPackageIndex): Lazy<T>;
    /**
     * Loads an import
     * @param {?FObjectImport} imp Import to load
     * @returns {?UObject} Object or null
     * @public
     */
    loadImport(imp?: FObjectImport): UObject;
    /**
     * Finds an import
     * @param {?FObjectImport} imp Import to load
     * @returns {?Lazy<UObject>} Object or null
     * @public
     */
    findImport(imp?: FObjectImport): Lazy<UObject>;
    /**
     * Finds an object by name
     * @param {string} objectName Name of object
     * @param {?string} className Class name of object
     * @returns {?Lazy<UObject>} Object or null
     * @public
     */
    findObjectByName(objectName: string, className?: string): Lazy<UObject>;
    /**
     * Gets an import object
     * @param {FPackageIndex} imp Import to find
     * @returns {?FObjectImport} Import or null
     * @public
     */
    getImportObject(imp: FPackageIndex): FObjectImport;
    /**
     * Gets an export object
     * @param {FPackageIndex} imp Export to find
     * @returns {?FObjectExport} Export or null
     * @public
     */
    getExportObject(imp: FPackageIndex): FObjectExport;
    /**
     * Gets either export or import object
     * @param {FPackageIndex} imp Index to find
     * @returns {FObjectImport | FObjectExport | null} Object or null
     * @public
     */
    getResource(imp: FPackageIndex): FObjectImport | FObjectExport;
    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {Array<IJson>} Json
     * @public
     */
    toJson(locres?: Locres): IJson[];
    /**
     * Gets a package from index
     * @param {FPackageIndex} imp Package to get
     * @returns {?Package} Package or null
     * @private
     */
    private getPackage;
    updateHeader(): void;
    write(uassetOutputStream: WritableStreamBuffer, uexpOutputStream: WritableStreamBuffer, ubulkOutputStream?: WritableStreamBuffer): void;
    writer(outputStream: WritableStreamBuffer): FAssetArchiveWriter;
}
