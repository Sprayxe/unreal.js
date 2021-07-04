"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeProperties = exports.deserializeVersionedTaggedProperties = exports.UObject = void 0;
const FPropertyTag_1 = require("../objects/FPropertyTag");
const Guid_1 = require("../../objects/core/misc/Guid");
const Package_1 = require("../Package");
const FName_1 = require("../../objects/uobject/FName");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const UnversionedPropertySerialization_1 = require("../../objects/uobject/serialization/UnversionedPropertySerialization");
const StringBuilder_1 = require("../../../util/StringBuilder");
const lodash_1 = require("lodash");
const EObjectFlags_1 = require("../../objects/uobject/EObjectFlags");
/**
 * UE4 Asset Object
 * @implements {IPropertyHolder}
 */
class UObject {
    /**
     * Creates an instance
     * @param {?Array<FPropertyTag>} properties Properties to assign
     * @constructor
     * @public
     */
    constructor(properties = []) {
        /**
         * Object name
         * @type {string}
         * @public
         */
        this.name = "";
        /**
         * Outer object of object
         * @type {UObject}
         * @public
         */
        this.outer = null;
        /**
         * Object class
         * @type {any}
         * @public
         */
        this.clazz = null;
        /**
         * Template of object
         * @type {Lazy<UObject>}
         * @public
         */
        this.template = null;
        /**
         * Object properties
         * @type {Array<FPropertyTag>}
         * @public
         */
        this.properties = [];
        /**
         * Object GUID
         * @type {FGuid}
         * @public
         */
        this.objectGuid = null;
        /**
         * Object flags
         * @type {number}
         * @public
         */
        this.flags = 0;
        this.properties = properties;
    }
    /**
     * Package that owns this object
     * @type {Package}
     * @public
     */
    get owner() {
        let current = this.outer;
        let next = current?.outer;
        while (next != null) {
            current = next;
            next = current.outer;
        }
        return current;
    }
    /**
     * Type of export
     * @type {string}
     * @public
     */
    get exportType() {
        return this.clazz?.name || UObject.name;
    }
    /**
     * Sets a property
     * @param {string} name Name of property
     * @param {any} value Value of property
     * @returns {void}
     * @public
     */
    set(name, value) {
        if (this.getOrNull(name))
            return this.properties.find(it => it.name.text === name)?.setTagTypeValue(value);
    }
    /**
     * Gets a property (safe)
     * @param {string} name Name of property to find
     * @param {any} dflt Default value to return
     * @returns {any} Result
     * @public
     */
    getOrDefault(name, dflt) {
        const value = this.getOrNull(name);
        return value || dflt;
    }
    /**
     * Gets a property (safe)
     * @param {string} name Name of property to find
     * @returns {?any} Result or null
     * @public
     */
    getOrNull(name) {
        return this.properties.find(it => it.name.text === name)?.getTagTypeValue();
    }
    /**
     * Gets a property
     * @param {string} name Name of property to find
     * @returns {any} Result
     * @throws {Error} If property doesn't exist
     * @public
     */
    get(name) {
        const val = this.getOrNull(name);
        if (!val)
            throw new Error(`${name} must be not-null`);
        return val;
    }
    /**
     * Deserializes properties
     * @param {FAssetArchive} Ar Reader to use
     * @param {number} validPos Valid position of Reader
     * @returns {void}
     * @public
     */
    deserialize(Ar, validPos) {
        this.properties = [];
        if (Object.getPrototypeOf(this)?.constructor?.name !== "UClass") {
            if (Ar.useUnversionedPropertySerialization) {
                if (this.clazz == null)
                    throw new Exceptions_1.ParserException("Found unversioned properties but object does not have a class.", Ar);
                UnversionedPropertySerialization_1.deserializeUnversionedProperties(this.properties, this.clazz, Ar);
            }
            else {
                deserializeVersionedTaggedProperties(this.properties, Ar);
            }
        }
        if ((EObjectFlags_1.EObjectFlags.RF_ClassDefaultObject & this.flags) === 0 && Ar.readBoolean())
            this.objectGuid = new Guid_1.FGuid(Ar);
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        serializeProperties(Ar, this.properties);
        Ar.writeBoolean(!!this.objectGuid);
        this.objectGuid?.serialize(Ar);
    }
    /**
     * Turns this object into json
     * @param {Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres = null) {
        const ob = {};
        this.properties.forEach((pTag) => {
            const tagValue = pTag.prop;
            if (!tagValue)
                return;
            ob[lodash_1.camelCase(pTag.name.text)] = tagValue.toJsonValue(locres);
        });
        return ob;
    }
    /**
     * Clears flags
     * @param {number} newFlags New flags to set
     * @returns {void}
     * @public
     */
    clearFlags(newFlags) {
        this.flags = this.flags & newFlags;
    }
    /**
     * Checks if this has provided flags
     * @param {number} flagsToCheck Flags to check for
     * @returns {boolean} Whether if flags matched or not
     * @public
     */
    hasAnyFlags(flagsToCheck) {
        return (this.flags & flagsToCheck) !== 0;
    }
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    getFullName(x, y, z) {
        if (typeof y === "boolean") {
            const result = new StringBuilder_1.StringBuilder(128);
            this.getFullName(x, result, y);
            return result.toString();
        }
        else {
            if (x) {
                y.append(this.clazz?.getPathName());
            }
            else {
                y.append(this.clazz?.name);
            }
            y.append(" ");
            return this.getPathName(x, y);
        }
    }
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    getPathName(x, y) {
        if (!y) {
            const result = new StringBuilder_1.StringBuilder();
            this.getPathName(x, result);
            return result.toString();
        }
        else {
            if (this !== x) {
                const objOuter = this.outer;
                if (objOuter && objOuter !== x) {
                    objOuter.getPathName(x, y);
                    if (objOuter.outer instanceof Package_1.Package) {
                        y.append(":");
                    }
                    else {
                        y.append(".");
                    }
                }
                y.append(this.name);
            }
            else {
                y.append("None");
            }
        }
    }
    /**
     * Turns this into string
     * @returns {string}
     * @public
     */
    toString() {
        return this.name;
    }
}
exports.UObject = UObject;
/**
 * Deserializes versioned tagged properties
 * @param {Array<FPropertyTag>} properties Array to assign properties to
 * @param {FAssetArchive} Ar Reader to use
 * @returns {void}
 * @export
 */
function deserializeVersionedTaggedProperties(properties, Ar) {
    while (true) {
        const tag = new FPropertyTag_1.FPropertyTag(Ar, true);
        if (tag.name.isNone())
            break;
        properties.push(tag);
    }
}
exports.deserializeVersionedTaggedProperties = deserializeVersionedTaggedProperties;
/**
 * Serializes properties
 * @param {FAssetArchiveWriter} Ar Writer to use
 * @param {Array<FPropertyTag>} properties Array with properties to serialize
 * @returns {void}
 * @export
 */
function serializeProperties(Ar, properties) {
    properties.forEach((it) => it.serialize(Ar, true));
    const nameMap = FName_1.FName.getByNameMap("None", Ar.nameMap);
    if (!nameMap)
        throw new Exceptions_1.ParserException("NameMap must contain \"None\"", Ar);
    Ar.writeFName(nameMap);
}
exports.serializeProperties = serializeProperties;
