import { FName } from "../../objects/uobject/FName";
import { FPropertyTag } from "./FPropertyTag";
import { FPropertySerialized } from "../exports/UStruct";
import { Lazy } from "../../../util/Lazy";
/**
 * Property type
 */
export declare class PropertyType {
    /**
     * Type of property
     * @type {FName}
     * @public
     */
    type: FName;
    /**
     * Name of struct
     * @type {FName}
     * @public
     */
    structName: FName;
    /**
     * Whether if its a bool
     * @type {boolean}
     * @public
     */
    bool: boolean;
    /**
     * Name of enum
     * @type {FName}
     * @public
     */
    enumName: FName;
    /**
     * Whether it is an enum as byte
     * @type {boolean}
     * @public
     */
    isEnumAsByte: boolean;
    /**
     * Inner type of this property
     * @type {?PropertyType}
     * @public
     */
    innerType: PropertyType;
    /**
     * Value type of this property
     * @type {?PropertyType}
     * @public
     */
    valueType: PropertyType;
    /**
     * Struct class of this property
     * @type {?Lazy<any>}
     * @public
     */
    structClass: Lazy<any>;
    /**
     * Enum class
     * @type {?any}
     * @public
     */
    enumClass: any;
    /**
     * Creates an instance with no info
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance with a defined type
     * @param {FName} type Type of the property
     * @constructor
     * @public
     */
    constructor(type: FName);
    /**
     * Creates an instance using json data
     * @param {any} jsonObject Json data to use
     * @constructor
     * @public
     */
    constructor(jsonObject: any);
    /**
     * Creates an instance using FPropertyTag
     * @param {FPropertyTag} tag Tag to use
     * @constructor
     * @public
     */
    constructor(tag: FPropertyTag);
    /**
     * Creates an instance using FPropertySerialized
     * @param {FPropertySerialized} prop Serialized property to use
     * @constructor
     * @public
     */
    constructor(prop: FPropertySerialized);
    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString(): string;
}
