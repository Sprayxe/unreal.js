import { IPropertyHolder } from "../objects/IPropertyHolder";
import { FPropertyTag } from "../objects/FPropertyTag";
import { FGuid } from "../../objects/core/misc/Guid";
import { FObjectExport } from "../../objects/uobject/ObjectResource";
import { Package } from "../Package";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { FAssetArchive } from "../reader/FAssetArchive";
import { Locres } from "../../locres/Locres";
import { StringBuilder } from "../../../util/StringBuilder";
import { Lazy } from "../../../util/Lazy";
/**
 * UE4 Asset Object
 * @implements {IPropertyHolder}
 */
export declare class UObject implements IPropertyHolder {
    /**
     * Object name
     * @type {string}
     * @public
     */
    name: string;
    /**
     * Outer object of object
     * @type {UObject}
     * @public
     */
    outer: UObject;
    /**
     * Object class
     * @type {any}
     * @public
     */
    clazz: any;
    /**
     * Template of object
     * @type {Lazy<UObject>}
     * @public
     */
    template: Lazy<UObject>;
    /**
     * Object properties
     * @type {Array<FPropertyTag>}
     * @public
     */
    properties: FPropertyTag[];
    /**
     * Object GUID
     * @type {FGuid}
     * @public
     */
    objectGuid: FGuid;
    /**
     * Object flags
     * @type {number}
     * @public
     */
    flags: number;
    /**
     * Object export
     * @type {FObjectExport}
     * @public
     */
    export: FObjectExport;
    /**
     * Package that owns this object
     * @type {Package}
     * @public
     */
    get owner(): Package;
    /**
     * Type of export
     * @type {string}
     * @public
     */
    get exportType(): string;
    /**
     * Creates an instance
     * @param {?Array<FPropertyTag>} properties Properties to assign
     * @constructor
     * @public
     */
    constructor(properties?: FPropertyTag[]);
    /**
     * Sets a property
     * @param {string} name Name of property
     * @param {any} value Value of property
     * @returns {void}
     * @public
     */
    set<T>(name: string, value: T): void;
    /**
     * Gets a property (safe)
     * @param {string} name Name of property to find
     * @param {any} dflt Default value to return
     * @returns {any} Result
     * @public
     */
    getOrDefault<T>(name: string, dflt: T): T;
    /**
     * Gets a property (safe)
     * @param {string} name Name of property to find
     * @returns {?any} Result or null
     * @public
     */
    getOrNull<T>(name: string): T;
    /**
     * Gets a property
     * @param {string} name Name of property to find
     * @returns {any} Result
     * @throws {Error} If property doesn't exist
     * @public
     */
    get<T>(name: string): T;
    /**
     * Deserializes properties
     * @param {FAssetArchive} Ar Reader to use
     * @param {number} validPos Valid position of Reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
    /**
     * Turns this object into json
     * @param {Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres?: Locres): any;
    /**
     * Clears flags
     * @param {number} newFlags New flags to set
     * @returns {void}
     * @public
     */
    clearFlags(newFlags: number): void;
    /**
     * Checks if this has provided flags
     * @param {number} flagsToCheck Flags to check for
     * @returns {boolean} Whether if flags matched or not
     * @public
     */
    hasAnyFlags(flagsToCheck: number): boolean;
    /**
     * Gets full name
     * @param {UObject} stopOuter Outer object
     * @param {boolean} includeClassPackage Whether to include class
     * @returns {string} Full name
     * @public
     */
    getFullName(stopOuter: UObject, includeClassPackage: boolean): any;
    /**
     * Gets full name with an existing string builder
     * @param {UObject} stopOuter Outer object
     * @param {StringBuilder} resultString String builder to use
     * @param {boolean} includeClassPackage Whether to include class
     * @returns {string} Full name
     * @public
     */
    getFullName(stopOuter: UObject, resultString: StringBuilder, includeClassPackage: boolean): any;
    /**
     * Gets path name
     * @param {UObject} stopouter Outer object
     * @returns {string} Path name
     * @public
     */
    getPathName(stopouter?: UObject): any;
    /**
     * Gets path name with existing string builder instance
     * @param {UObject} stopouter Outer object
     * @param {StringBuilder} resultString String builder to use
     * @returns {string} Path name
     * @public
     */
    getPathName(stopouter: UObject, resultString: StringBuilder): any;
    /**
     * Turns this into string
     * @returns {string}
     * @public
     */
    toString(): string;
}
/**
 * Deserializes versioned tagged properties
 * @param {Array<FPropertyTag>} properties Array to assign properties to
 * @param {FAssetArchive} Ar Reader to use
 * @returns {void}
 * @export
 */
export declare function deserializeVersionedTaggedProperties(properties: FPropertyTag[], Ar: FAssetArchive): void;
/**
 * Serializes properties
 * @param {FAssetArchiveWriter} Ar Writer to use
 * @param {Array<FPropertyTag>} properties Array with properties to serialize
 * @returns {void}
 * @export
 */
export declare function serializeProperties(Ar: FAssetArchiveWriter, properties: FPropertyTag[]): void;
