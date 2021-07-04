"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsmapTypeMappingsProvider = void 0;
const TypeMappingsProvider_1 = require("./TypeMappingsProvider");
const FArchive_1 = require("../../reader/FArchive");
const FName_1 = require("../../objects/uobject/FName");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const Compression_1 = require("../../../compression/Compression");
const PropertyType_1 = require("../objects/PropertyType");
const Lazy_1 = require("../../../util/Lazy");
const UScriptStruct_1 = require("../exports/UScriptStruct");
const PropertyInfo_1 = require("../objects/PropertyInfo");
/**
 * Type mappings provider which uses usmap
 * @extends {TypeMappingsProvider}
 */
class UsmapTypeMappingsProvider extends TypeMappingsProvider_1.TypeMappingsProvider {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x) {
        super();
        this.load = x instanceof Buffer ? () => new FArchive_1.FArchive(x) : x;
    }
    /**
     * Reloads mappings
     * @returns {boolean} Whether if it was successful or not
     * @public
     */
    reload() {
        const data = this.readCompressedUsmap(this.load());
        this.parseData(new FUsmapNameTableArchive(data));
        return true;
    }
    /**
     * Reads compressed usmap
     * @param {FArchive} Ar FArchive to use
     * @returns {Buffer}
     * @protected
     */
    readCompressedUsmap(Ar) {
        const magic = Ar.readInt16();
        if (magic !== UsmapTypeMappingsProvider.FILE_MAGIC) {
            throw new Exceptions_1.ParserException(".usmap file has an invalid magic constant", Ar);
        }
        const version = Ar.readUInt8();
        if (version !== EUsmapVersion.latest()) {
            throw new Exceptions_1.ParserException(`.usmap file has invalid version ${version}`, Ar);
        }
        const methodInt = Ar.readUInt8();
        const compSize = Ar.readInt32();
        const decompSize = Ar.readInt32();
        if (Ar.size - Ar.pos < compSize) {
            throw new Exceptions_1.ParserException("There is not enough data in the .usmap file", Ar);
        }
        const compData = Ar.readBuffer(compSize);
        const data = Buffer.alloc(decompSize);
        const method = methodInt === 0 ? "None" : methodInt === 1 ? "Oodle" : methodInt === 2 ? "Brotli" : null;
        if (!method)
            throw new Error(`Unknown compression method index ${methodInt}`);
        Compression_1.Compression.uncompress(method, data, 0, decompSize, compData, 0, compSize);
        return data;
    }
    /**
     * Deserializes property data
     * @param {FUsmapNameTableArchive} FArchive to use
     * @returns {PropertyType}
     * @private
     */
    deserializePropData(Ar) {
        const propType = EUsmapPropertyType[Ar.readUInt8()];
        const type = new PropertyType_1.PropertyType(FName_1.FName.dummy(propType));
        switch (propType) {
            case "EnumProperty":
                const prop = this.deserializePropData(Ar);
                type.innerType = prop;
                type.isEnumAsByte = prop.type.text === "ByteProperty";
                type.enumName = Ar.readFName();
                break;
            case "StructProperty":
                type.structName = Ar.readFName();
                break;
            case "SetProperty":
            case "ArrayProperty":
                type.innerType = this.deserializePropData(Ar);
                break;
            case "MapProperty":
                type.innerType = this.deserializePropData(Ar);
                type.valueType = this.deserializePropData(Ar);
                break;
        }
        if (!type.structName.isNone()) {
            type.structClass = new Lazy_1.Lazy(() => this.mappings.types[type.structName.text]);
        }
        return type;
    }
    /**
     * Parses data
     * @param {FUsmapNameTableArchive} FArchive to use
     * @returns {void}
     * @private
     */
    parseData(Ar) {
        Ar.nameMap = Ar.readArray(() => Ar.readBuffer(Ar.readUInt8()).toString());
        const max0 = Ar.readInt32();
        for (let y = 0; y < max0; ++y) {
            const enumName = Ar.readFName().text;
            const enumValues = [];
            const limit = Ar.readUInt8();
            for (let i = 0; i < limit; ++i) {
                enumValues.push(Ar.readFName().text);
            }
            this.mappings.enums[enumName] = enumValues;
        }
        const max1 = Ar.readInt32();
        for (let x = 0; x < max1; ++x) {
            const struct = new UScriptStruct_1.UScriptStruct();
            struct.name = Ar.readFName().text;
            const superStructName = Ar.readFName();
            struct.superStruct = !superStructName.isNone() ? new Lazy_1.Lazy(() => this.getStruct(superStructName)) : null;
            struct.propertyCount = Ar.readUInt16();
            const serializablePropCount = Ar.readUInt16();
            const arr = [];
            for (let i = 0; i < serializablePropCount; ++i) {
                const schemaIdx = Ar.readUInt16();
                const arraySize = Ar.readUInt8();
                const propertyName = Ar.readFName();
                const type = this.deserializePropData(Ar);
                const info = new PropertyInfo_1.PropertyInfo(propertyName.text, type, arraySize);
                info.index = schemaIdx;
                arr.push(info);
            }
            struct.childProperties2 = arr;
            this.mappings.types[struct.name] = struct;
        }
    }
}
exports.UsmapTypeMappingsProvider = UsmapTypeMappingsProvider;
/**
 * File magic
 * @type {number}
 * @static
 * @readonly
 * @public
 */
UsmapTypeMappingsProvider.FILE_MAGIC = 0x30C4;
/**
 * FUsmapNameTableArchive
 * @extends {FArchive}
 */
class FUsmapNameTableArchive extends FArchive_1.FArchive {
    /**
     * Creates an instance using a Buffer
     * @param {Buffer} data
     * @constructor
     * @public
     */
    constructor(data) {
        super(data);
    }
    /**
     * Reads FName
     * @returns {FName} Result of reading
     * @public
     */
    readFName() {
        const nameIndex = this.readInt32();
        if (nameIndex === -1) {
            return FName_1.FName.NAME_None;
        }
        const entry = this.nameMap[nameIndex];
        if (!entry) {
            throw new Exceptions_1.ParserException(`FName could not be read, requested index ${nameIndex}, name map size ${this.nameMap.length}`, this);
        }
        return FName_1.FName.dummy(entry);
    }
}
/**
 * Stores usmap version
 */
class EUsmapVersion {
    constructor() {
        /**
         * Initial value
         * @type {number}
         * @public
         */
        this.Initial = 0;
    }
    /**
     * Gets the latest usmap version
     * @returns {number} Latest version
     * @public
     */
    static latest() {
        return Object.values(new EUsmapVersion()).pop();
    }
}
const EUsmapPropertyType = [
    "ByteProperty",
    "BoolProperty",
    "IntProperty",
    "FloatProperty",
    "ObjectProperty",
    "NameProperty",
    "DelegateProperty",
    "DoubleProperty",
    "ArrayProperty",
    "StructProperty",
    "StrProperty",
    "TextProperty",
    "InterfaceProperty",
    "MulticastDelegateProperty",
    "WeakObjectProperty",
    "LazyObjectProperty",
    "AssetObjectProperty",
    "SoftObjectProperty",
    "UInt64Property",
    "UInt32Property",
    "UInt16Property",
    "Int64Property",
    "Int16Property",
    "Int8Property",
    "MapProperty",
    "SetProperty",
    "EnumProperty",
    "FieldPathProperty"
];
