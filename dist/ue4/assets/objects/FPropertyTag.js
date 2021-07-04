"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPropertyTag = void 0;
const FName_1 = require("../../objects/uobject/FName");
const Const_1 = require("../../../util/Const");
const Guid_1 = require("../../objects/core/misc/Guid");
const Versions_1 = require("../../versions/Versions");
const FAssetArchive_1 = require("../reader/FAssetArchive");
const FProperty_1 = require("./FProperty");
const PropertyType_1 = require("./PropertyType");
const Exceptions_1 = require("../../../exceptions/Exceptions");
/**
 * Represents a property tag
 */
class FPropertyTag {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        /**
         * Property
         * @type {FProperty}
         * @public
         */
        this.prop = null;
        /**
         * A boolean property's value (never need to serialize data for bool properties except here)
         * @type {boolean}
         * @public
         */
        this.boolVal = false;
        /**
         * Struct name if FStructProperty
         * @type {FName}
         * @public
         */
        this.structName = FName_1.FName.NAME_None;
        /**
         * Enum name if FByteProperty or FEnumProperty
         * @type {FName}
         * @public
         */
        this.enumName = FName_1.FName.NAME_None;
        /**
         * Inner type if FArrayProperty, FSetProperty, or FMapProperty
         * @type {FName}
         * @public
         */
        this.innerType = FName_1.FName.NAME_None;
        /**
         * Value type if UMapProperty
         * @type {FName}
         * @public
         */
        this.valueType = FName_1.FName.NAME_None;
        /**
         * Property size
         * @type {number}
         * @public
         */
        this.size = 0;
        /**
         * Index if an array; else 0
         * @type {number}
         * @public
         */
        this.arrayIndex = Const_1.INDEX_NONE;
        /**
         * Location in stream of tag size member
         * @type {number}
         * @public
         */
        this.sizeOffset = -1;
        /**
         * Struct guid
         * @type {?FGuid}
         * @public
         */
        this.structGuid = null;
        /**
         * Whether if the property has a guid or not
         * @type {boolean}
         * @public
         * @see {propertyGuid}
         */
        this.hasPropertyGuid = false;
        /**
         * Property guid
         * @type {?FGuid}
         * @public
         * @see {hasPropertyGuid}
         */
        this.propertyGuid = null;
        /**
         * Type data
         * @type {PropertyType}
         * @public
         */
        this.typeData = null;
        if (!(x instanceof FAssetArchive_1.FAssetArchive)) {
            this.name = x;
        }
        else {
            this.name = x.readFName();
            if (!this.name.isNone()) {
                this.type = x.readFName();
                this.size = x.readInt32();
                this.arrayIndex = x.readInt32();
                const tagType = this.type.text;
                if (tagType === "StructProperty") {
                    this.structName = x.readFName();
                    if (x.ver >= Versions_1.VER_UE4_STRUCT_GUID_IN_PROPERTY_TAG)
                        this.structGuid = new Guid_1.FGuid(x);
                }
                else if (tagType === "BoolProperty") { // only need to serialize this for bools
                    this.boolVal = x.readFlag();
                }
                else if (tagType === "ByteProperty") { // only need to serialize this for bytes/enums
                    this.enumName = x.readFName();
                }
                else if (tagType === "EnumProperty") {
                    this.enumName = x.readFName();
                }
                else if (tagType === "ArrayProperty") { // only need to serialize this for arrays
                    if (x.ver >= Versions_1.VER_UE4_ARRAY_PROPERTY_INNER_TAGS)
                        this.innerType = x.readFName();
                }
                else if (x.ver >= Versions_1.VER_UE4_PROPERTY_TAG_SET_MAP_SUPPORT) {
                    if (tagType === "SetProperty") {
                        this.innerType = x.readFName();
                    }
                    else if (tagType === "MapProperty") {
                        this.innerType = x.readFName(); // MapProperty doesn't seem to store the inner types as their types when they're UStructs.
                        this.valueType = x.readFName();
                    }
                }
                // Property tags to handle renamed blueprint properties effectively.
                if (x.ver >= Versions_1.VER_UE4_PROPERTY_GUID_IN_PROPERTY_TAG) {
                    this.hasPropertyGuid = x.readFlag();
                    if (this.hasPropertyGuid)
                        this.propertyGuid = new Guid_1.FGuid(x);
                }
                this.typeData = new PropertyType_1.PropertyType(this);
                if (y) {
                    const pos = x.pos;
                    const finalPos = pos + this.size;
                    try {
                        this.prop =
                            FProperty_1.FProperty.readPropertyValue(x, this.typeData, FProperty_1.ReadType.NORMAL);
                        if (finalPos !== x.pos) {
                            console.warn(`FPropertyTagType ${this.name} (${this.type}) was not read properly, pos ${x.pos}, calculated pos ${finalPos}`);
                        }
                        // Even if the property wasn't read properly
                        // we don't need to crash here because we know the expected size
                        x.pos = finalPos;
                    }
                    catch (e) {
                        if (finalPos !== x.pos) {
                            console.warn(`Failed to read FPropertyTagType ${this.name} (${this.type}), skipping it, please report`);
                        }
                        // Also no need to crash here, just seek to the desired offset
                        x.pos = finalPos;
                    }
                }
            }
        }
    }
    /**
     * Gets current tag type value
     * @returns {any} Value
     * @throws {Error}
     * @public
     */
    getTagTypeValue() {
        const tag = this.prop?.getTagTypeValue();
        if (tag == null)
            throw new Error("This tag was read without data");
        return tag;
    }
    /**
     * Sets current tag type value
     * @param {any} value
     * @returns {void}
     * @public
     */
    setTagTypeValue(value) {
        return this.prop?.setTagTypeValue(value);
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar FAssetArchiveWriter to use
     * @param {boolean} writeData Whether to write data or not
     * @public
     */
    serialize(Ar, writeData) {
        Ar.writeFName(this.name);
        if (this.name.text !== "None") {
            Ar.writeFName(this.type);
            let tagTypeData = null;
            if (writeData) {
                const tempAr = Ar.setupByteArrayWriter();
                try {
                    if (!this.prop)
                        throw new Exceptions_1.ParserException("FPropertyTagType is needed when trying to write it", Ar);
                    FProperty_1.FProperty.writePropertyValue(tempAr, this.prop, FProperty_1.ReadType.NORMAL);
                    Ar.writeInt32(tempAr.pos() - Ar.pos());
                    tagTypeData = tempAr.toByteArray();
                }
                catch (e) {
                    console.error(e);
                    throw new Exceptions_1.ParserException(`^^^\nError occurred while writing the FPropertyTagType ${this.name} (${this.type})`, Ar);
                }
            }
            else {
                Ar.writeInt32(this.size);
            }
            Ar.writeInt32(this.arrayIndex);
            // TODO tagData?.serialize(Ar)
            Ar.writeFlag(this.hasPropertyGuid);
            if (this.hasPropertyGuid)
                this.propertyGuid.serialize(Ar);
            if (writeData) {
                if (tagTypeData) {
                    Ar.write(tagTypeData);
                }
            }
        }
    }
    /**
     * Turns this into a string
     * @returns {string} string
     * @public
     */
    toString() {
        const result = this.prop ? this.getTagTypeValue() : "Failed to parse";
        return `${this.name.text}   -->   ${result.toString()}`;
    }
    /**
     * Turns this into json
     * @returns {any} json
     * @public
     */
    toJson() {
        return {
            prop: this.prop.toJsonValue(),
            type: this.type.text,
            boolVal: this.boolVal,
            name: this.name.text,
            structName: this.structName.text,
            enumName: this.enumName.text,
            innerType: this.innerType.text,
            valueType: this.valueType.text,
            size: this.size,
            arrayIndex: this.arrayIndex,
            sizeOffset: this.sizeOffset,
            structGuid: this.structGuid?.toString(Guid_1.EGuidFormats.DigitsWithHyphens) || null,
            hasPropertyGuid: this.hasPropertyGuid,
            propertyGuid: this.propertyGuid?.toString(Guid_1.EGuidFormats.DigitsWithHyphens) || null,
            typeData: this.typeData.toString()
        };
    }
}
exports.FPropertyTag = FPropertyTag;
