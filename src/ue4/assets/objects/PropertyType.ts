import { FName } from "../../objects/uobject/FName";
import { FPropertyTag } from "./FPropertyTag";
import {
    FArrayProperty,
    FByteProperty,
    FMapProperty,
    FPropertySerialized,
    FSetProperty,
    FStructProperty
} from "../exports/UStruct";
import { Lazy } from "../../../util/Lazy";
import { ObjectTypeRegistry } from "../ObjectTypeRegistry";

/**
 * Property type
 */
export class PropertyType {
    /**
     * Type of property
     * @type {FName}
     * @public
     */
    type: FName

    /**
     * Name of struct
     * @type {FName}
     * @public
     */
    structName = FName.NAME_None

    /**
     * Whether if its a bool
     * @type {boolean}
     * @public
     */
    bool: boolean = false

    /**
     * Name of enum
     * @type {FName}
     * @public
     */
    enumName = FName.NAME_None

    /**
     * Whether it is an enum as byte
     * @type {boolean}
     * @public
     */
    isEnumAsByte: boolean = true

    /**
     * Inner type of this property
     * @type {?PropertyType}
     * @public
     */
    innerType: PropertyType = null

    /**
     * Value type of this property
     * @type {?PropertyType}
     * @public
     */
    valueType: PropertyType = null

    /**
     * Struct class of this property
     * @type {?Lazy<any>}
     * @public
     */
    structClass: Lazy<any> = null

    /**
     * Enum class
     * @type {?any}
     * @public
     */
    enumClass: any = null

    /**
     * Creates an instance with no info
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance with a defined type
     * @param {FName} type Type of the property
     * @constructor
     * @public
     */
    constructor(type: FName)

    /**
     * Creates an instance using json data
     * @param {any} jsonObject Json data to use
     * @constructor
     * @public
     */
    constructor(jsonObject: any)

    /**
     * Creates an instance using FPropertyTag
     * @param {FPropertyTag} tag Tag to use
     * @constructor
     * @public
     */
    constructor(tag: FPropertyTag)

    /**
     * Creates an instance using FPropertySerialized
     * @param {FPropertySerialized} prop Serialized property to use
     * @constructor
     * @public
     */
    constructor(prop: FPropertySerialized)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any) {
        if (!x) {
            this.type = FName.NAME_None
        } else if (x instanceof FName) {
            this.type = x
        } else if (x instanceof FPropertyTag) {
            this.type = x.type
            this.structName = x.structName
            this.bool = x.boolVal
            this.enumName = x.enumName
            this.innerType = new PropertyType(x.innerType)
            this.valueType = new PropertyType(x.valueType)
        } else if (x instanceof FPropertySerialized) {
            const simpleName = Object.getPrototypeOf(x)?.constructor?.name
            this.type = simpleName ? FName.dummy(ObjectTypeRegistry.unprefix(simpleName, true)) : FName.NAME_None
            if (x instanceof FArrayProperty) {
                this.innerType = x.inner ? new PropertyType(x.inner) : null
            } else if (x instanceof FByteProperty) {
                this.enumName = x.enum.name
            } else if (x instanceof FMapProperty) {
                this.innerType = x.keyProp ? new PropertyType(x.keyProp) : null
                this.valueType = x.valueProp ? new PropertyType(x.keyProp) : null
            } else if (x instanceof FSetProperty) {
                this.innerType = x.elementProp ? new PropertyType(x.elementProp) : null
            } else if (x instanceof FStructProperty) {
                this.structClass = x.struct
                const n = this.structClass?.value?.name
                this.structName = n ? FName.dummy(n) : FName.NAME_None
            }
        }
    }

    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString() {
        return this.type.text
    }
}