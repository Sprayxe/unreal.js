import { FName } from "../../objects/uobject/FName";
import { FGuid } from "../../objects/core/misc/Guid";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FProperty } from "./FProperty";
import { PropertyType } from "./PropertyType";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
/**
 * Represents a property tag
 */
export declare class FPropertyTag {
    /**
     * Property
     * @type {FProperty}
     * @public
     */
    prop: FProperty;
    /**
     * Type of property
     * @type {FName}
     * @public
     */
    type: FName;
    /**
     * A boolean property's value (never need to serialize data for bool properties except here)
     * @type {boolean}
     * @public
     */
    boolVal: boolean;
    /**
     * Name of property.
     * @type {FName}
     * @public
     */
    name: FName;
    /**
     * Struct name if FStructProperty
     * @type {FName}
     * @public
     */
    structName: FName;
    /**
     * Enum name if FByteProperty or FEnumProperty
     * @type {FName}
     * @public
     */
    enumName: FName;
    /**
     * Inner type if FArrayProperty, FSetProperty, or FMapProperty
     * @type {FName}
     * @public
     */
    innerType: FName;
    /**
     * Value type if UMapProperty
     * @type {FName}
     * @public
     */
    valueType: FName;
    /**
     * Property size
     * @type {number}
     * @public
     */
    size: number;
    /**
     * Index if an array; else 0
     * @type {number}
     * @public
     */
    arrayIndex: number;
    /**
     * Location in stream of tag size member
     * @type {number}
     * @public
     */
    sizeOffset: number;
    /**
     * Struct guid
     * @type {?FGuid}
     * @public
     */
    structGuid?: FGuid;
    /**
     * Whether if the property has a guid or not
     * @type {boolean}
     * @public
     * @see {propertyGuid}
     */
    hasPropertyGuid: boolean;
    /**
     * Property guid
     * @type {?FGuid}
     * @public
     * @see {hasPropertyGuid}
     */
    propertyGuid?: FGuid;
    /**
     * Type data
     * @type {PropertyType}
     * @public
     */
    typeData: PropertyType;
    /**
     * Creates an instance using FName
     * @param {FName} name FName to use
     * @constructor
     * @public
     */
    constructor(name: FName);
    /**
     * Creates an instance using FAssetArchive and readData
     * @param {FAssetArchive} Ar FAssetArchive to use
     * @param {boolean} readData Whether to read data or no
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive, readData: boolean);
    /**
     * Gets current tag type value
     * @returns {any} Value
     * @throws {Error}
     * @public
     */
    getTagTypeValue(): any;
    /**
     * Sets current tag type value
     * @param {any} value
     * @returns {void}
     * @public
     */
    setTagTypeValue(value: any): void;
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar FAssetArchiveWriter to use
     * @param {boolean} writeData Whether to write data or not
     * @public
     */
    serialize(Ar: FAssetArchiveWriter, writeData: boolean): void;
    /**
     * Turns this into a string
     * @returns {string} string
     * @public
     */
    toString(): string;
    /**
     * Turns this into json
     * @returns {any} json
     * @public
     */
    toJson(): {
        prop: any;
        type: string;
        boolVal: boolean;
        name: string;
        structName: string;
        enumName: string;
        innerType: string;
        valueType: string;
        size: number;
        arrayIndex: number;
        sizeOffset: number;
        structGuid: string;
        hasPropertyGuid: boolean;
        propertyGuid: string;
        typeData: string;
    };
}
