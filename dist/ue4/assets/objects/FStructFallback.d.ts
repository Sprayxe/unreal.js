import { IPropertyHolder } from "./IPropertyHolder";
import { FAssetArchive } from "../reader/FAssetArchive";
import { Lazy } from "../../../util/Lazy";
import { UStruct } from "../exports/UStruct";
import { FName } from "../../objects/uobject/FName";
import { FPropertyTag } from "./FPropertyTag";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { IStructType } from "./UScriptStruct";
/**
 * Fallback for UScriptStruct
 * @implements {IStructType}
 * @implements {IPropertyHolder}
 */
export declare class FStructFallback implements IStructType, IPropertyHolder {
    /**
     * Properties
     * @type {Array<FPropertyTag>}
     * @public
     */
    properties: FPropertyTag[];
    /**
     * Creates instance using FAssetArchive, Lazy<UStruct> & FName
     * @param {FAssetArchive} Ar FAssetArchive to use
     * @param {Lazy<UStruct>} struct Struct to use
     * @param {FName} structName Struct name to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive, struct: Lazy<UStruct>, structName: FName);
    /**
     * Creates instance using FAssetArchive & FName
     * @param {FAssetArchive} Ar FAssetArchive to use
     * @param {FName} structName Struct name to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive, structName: FName);
    /**
     * Creates instance using Array<FPropertyTag>
     * @param {Array<FPropertyTag>} properties Properties
     * @constructor
     * @public
     */
    constructor(properties: FPropertyTag[]);
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar FAssetArchiveWriter to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
    /**
     * Sets a property
     * @param {string} name Name of the property
     * @param {any} value Value of the property
     * @returns {void}
     * @public
     */
    set<T>(name: string, value: T): void;
    /**
     * Gets a property
     * @param {string} name Name of the property
     * @returns {?any} Property or null
     * @public
     */
    getOrNull<T>(name: string): T | undefined;
    /**
     * Gets a property
     * @param {string} name Name of the property
     * @returns {any} Property
     * @throws {TypeError} If property doesn't exist
     * @public
     */
    get<T>(name: string): T;
    /**
     * Turns this into json
     * @returns {any}
     * @public
     */
    toJson(): any;
}
