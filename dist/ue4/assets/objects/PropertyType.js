"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyType = void 0;
const FName_1 = require("../../objects/uobject/FName");
const FPropertyTag_1 = require("./FPropertyTag");
const UStruct_1 = require("../exports/UStruct");
const ObjectTypeRegistry_1 = require("../ObjectTypeRegistry");
/**
 * Property type
 */
class PropertyType {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x) {
        /**
         * Name of struct
         * @type {FName}
         * @public
         */
        this.structName = FName_1.FName.NAME_None;
        /**
         * Whether if its a bool
         * @type {boolean}
         * @public
         */
        this.bool = false;
        /**
         * Name of enum
         * @type {FName}
         * @public
         */
        this.enumName = FName_1.FName.NAME_None;
        /**
         * Whether it is an enum as byte
         * @type {boolean}
         * @public
         */
        this.isEnumAsByte = true;
        /**
         * Inner type of this property
         * @type {?PropertyType}
         * @public
         */
        this.innerType = null;
        /**
         * Value type of this property
         * @type {?PropertyType}
         * @public
         */
        this.valueType = null;
        /**
         * Struct class of this property
         * @type {?Lazy<any>}
         * @public
         */
        this.structClass = null;
        /**
         * Enum class
         * @type {?any}
         * @public
         */
        this.enumClass = null;
        if (!x) {
            this.type = FName_1.FName.NAME_None;
        }
        else if (x instanceof FName_1.FName) {
            this.type = x;
        }
        else if (x instanceof FPropertyTag_1.FPropertyTag) {
            this.type = x.type;
            this.structName = x.structName;
            this.bool = x.boolVal;
            this.enumName = x.enumName;
            this.innerType = new PropertyType(x.innerType);
            this.valueType = new PropertyType(x.valueType);
        }
        else if (x instanceof UStruct_1.FPropertySerialized) {
            const simpleName = Object.getPrototypeOf(x)?.constructor?.name;
            this.type = simpleName ? FName_1.FName.dummy(ObjectTypeRegistry_1.ObjectTypeRegistry.unprefix(simpleName, true)) : FName_1.FName.NAME_None;
            if (x instanceof UStruct_1.FArrayProperty) {
                this.innerType = x.inner ? new PropertyType(x.inner) : null;
            }
            else if (x instanceof UStruct_1.FByteProperty) {
                this.enumName = x.enum.name;
            }
            else if (x instanceof UStruct_1.FMapProperty) {
                this.innerType = x.keyProp ? new PropertyType(x.keyProp) : null;
                this.valueType = x.valueProp ? new PropertyType(x.keyProp) : null;
            }
            else if (x instanceof UStruct_1.FSetProperty) {
                this.innerType = x.elementProp ? new PropertyType(x.elementProp) : null;
            }
            else if (x instanceof UStruct_1.FStructProperty) {
                this.structClass = x.struct;
                const n = this.structClass?.value?.name;
                this.structName = n ? FName_1.FName.dummy(n) : FName_1.FName.NAME_None;
            }
        }
    }
    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString() {
        return this.type.text;
    }
}
exports.PropertyType = PropertyType;
