"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FStructFallback = void 0;
const FAssetArchive_1 = require("../reader/FAssetArchive");
const Lazy_1 = require("../../../util/Lazy");
const FName_1 = require("../../objects/uobject/FName");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const UScriptStruct_1 = require("../exports/UScriptStruct");
const UnversionedPropertySerialization_1 = require("../../objects/uobject/serialization/UnversionedPropertySerialization");
const UObject_1 = require("../exports/UObject");
/**
 * Fallback for UScriptStruct
 * @implements {IStructType}
 * @implements {IPropertyHolder}
 */
class FStructFallback {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        /**
         * Properties
         * @type {Array<FPropertyTag>}
         * @public
         */
        this.properties = [];
        if (Array.isArray(x)) {
            this.properties = x;
        }
        else if (x instanceof FAssetArchive_1.FAssetArchive && z == null) {
            return new FStructFallback(x, new Lazy_1.Lazy(() => {
                let struct = x.provider?.mappingsProvider?.getStruct(y);
                if (struct == null) {
                    if (x.useUnversionedPropertySerialization) {
                        throw new Exceptions_1.MissingSchemaException(`Unknown struct ${y}`);
                    }
                    struct = new UScriptStruct_1.UScriptStruct(y);
                }
                return struct;
            }), y);
        }
        else {
            const Ar = x;
            this.properties = [];
            if (Ar.useUnversionedPropertySerialization) {
                const structClass = y?.value;
                if (structClass == null)
                    throw new Exceptions_1.MissingSchemaException(`Unknown struct ${z}`);
                UnversionedPropertySerialization_1.deserializeUnversionedProperties(this.properties, structClass, Ar);
            }
            else {
                UObject_1.deserializeVersionedTaggedProperties(this.properties, Ar);
            }
        }
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar FAssetArchiveWriter to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.properties.forEach((it) => it.serialize(Ar, true));
        const entry = FName_1.FName.getByNameMap("None", Ar.nameMap);
        if (entry == null)
            throw new Exceptions_1.ParserException("NameMap must contain \"None\"", Ar);
        Ar.writeFName(entry);
    }
    /**
     * Sets a property
     * @param {string} name Name of the property
     * @param {any} value Value of the property
     * @returns {void}
     * @public
     */
    set(name, value) {
        if (this.getOrNull(name) != null)
            this.properties.find(it => it.name.text === name).setTagTypeValue(value);
    }
    /**
     * Gets a property
     * @param {string} name Name of the property
     * @returns {?any} Property or null
     * @public
     */
    getOrNull(name) {
        return this.properties.find(it => it.name.text === name)?.getTagTypeValue();
    }
    /**
     * Gets a property
     * @param {string} name Name of the property
     * @returns {any} Property
     * @throws {TypeError} If property doesn't exist
     * @public
     */
    get(name) {
        const val = this.getOrNull(name);
        if (val == null)
            throw new TypeError(`${name} must not be null.`);
        return val;
    }
    /**
     * Turns this into json
     * @returns {any}
     * @public
     */
    toJson() {
        const obj = {};
        this.properties.forEach((it) => obj[it.name.text] = it.prop?.toJsonValue());
        return obj;
    }
}
exports.FStructFallback = FStructFallback;
