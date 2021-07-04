"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadType = exports.WeakObjectProperty = exports.UInt64Property = exports.UInt32Property = exports.UInt16Property = exports.TextProperty = exports.StructProperty = exports.StrProperty = exports.SoftObjectProperty = exports.SoftClassProperty = exports.SetProperty = exports.ObjectProperty = exports.NameProperty = exports.MulticastDelegateProperty = exports.MapProperty = exports.LazyObjectProperty = exports.InterfaceProperty = exports.IntProperty = exports.Int8Property = exports.Int64Property = exports.Int16Property = exports.FloatProperty = exports.FieldPathProperty = exports.EnumProperty = exports.DoubleProperty = exports.DelegateProperty = exports.ClassProperty = exports.ByteProperty = exports.BoolProperty = exports.ArrayProperty = exports.FProperty = void 0;
const UScriptArray_1 = require("./UScriptArray");
const ObjectResource_1 = require("../../objects/uobject/ObjectResource");
const FName_1 = require("../../objects/uobject/FName");
const FFieldPath_1 = require("../../objects/FFieldPath");
const UInterfaceProperty_1 = require("../../objects/uobject/UInterfaceProperty");
const FUniqueObjectGuid_1 = require("../../objects/uobject/FUniqueObjectGuid");
const UScriptStruct_1 = require("./UScriptStruct");
const Guid_1 = require("../../objects/core/misc/Guid");
const Text_1 = require("../../objects/core/i18n/Text");
const ETextHistoryType_1 = require("../enums/ETextHistoryType");
const UScriptMap_1 = require("../../objects/uobject/UScriptMap");
const ScriptDelegates_1 = require("../../objects/uobject/ScriptDelegates");
const SoftObjectPath_1 = require("../../objects/uobject/SoftObjectPath");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const FExportArchive_1 = require("../reader/FExportArchive");
const UnrealMap_1 = require("../../../util/UnrealMap");
/**
 * Represents a property
 */
class FProperty {
    /**
     * Gets the current instance's value
     * @returns {any} Current value
     * @public
     */
    getTagTypeValue() {
        return this instanceof ArrayProperty ? this.array :
            this instanceof BoolProperty ? this.bool :
                this instanceof ByteProperty ? this.byte :
                    this instanceof DelegateProperty ? this.delegate :
                        this instanceof DoubleProperty ? this.number :
                            this instanceof EnumProperty ? this.name :
                                this instanceof FieldPathProperty ? this.fieldPath :
                                    this instanceof FloatProperty ? this.float :
                                        this instanceof IntProperty ? this.number :
                                            this instanceof Int16Property ? this.number :
                                                this instanceof Int64Property ? this.number :
                                                    this instanceof Int8Property ? this.number :
                                                        this instanceof InterfaceProperty ? this.interfaceProperty :
                                                            this instanceof LazyObjectProperty ? this.guid :
                                                                this instanceof MapProperty ? this.map :
                                                                    this instanceof MulticastDelegateProperty ? this.delegate :
                                                                        this instanceof NameProperty ? this.name :
                                                                            this instanceof ObjectProperty ? this.index :
                                                                                this instanceof SetProperty ? this.array :
                                                                                    this instanceof SoftClassProperty ? this.object :
                                                                                        this instanceof SoftObjectProperty ? this.object :
                                                                                            this instanceof StrProperty ? this.str :
                                                                                                this instanceof StructProperty ? this.struct.structType :
                                                                                                    this instanceof TextProperty ? this.text :
                                                                                                        this instanceof UInt16Property ? this.number :
                                                                                                            this instanceof UInt32Property ? this.number :
                                                                                                                this instanceof UInt64Property ? this.number :
                                                                                                                    null;
    }
    /**
     * Sets a value for this instance
     * @param {any} value Value to set
     * @returns {void}
     * @public
     */
    setTagTypeValue(value) {
        if (!value)
            return;
        if (this instanceof ArrayProperty) {
            this.array = value;
        }
        else if (this instanceof BoolProperty) {
            this.bool = value;
        }
        else if (this instanceof ByteProperty) {
            this.byte = value;
        }
        else if (this instanceof DelegateProperty) {
            this.delegate = value;
        }
        else if (this instanceof BoolProperty) {
            this.bool = value;
        }
        else if (this instanceof ByteProperty) {
            this.byte = value;
        }
        else if (this instanceof DoubleProperty) {
            this.number = value;
        }
        else if (this instanceof EnumProperty) {
            this.name = value;
        }
        else if (this instanceof FieldPathProperty) {
            this.fieldPath = value;
        }
        else if (this instanceof FloatProperty) {
            this.float = value;
        }
        else if (this instanceof Int16Property) {
            this.number = value;
        }
        else if (this instanceof Int64Property) {
            this.number = value;
        }
        else if (this instanceof Int8Property) {
            this.number = value;
        }
        else if (this instanceof IntProperty) {
            this.number = value;
        }
        else if (this instanceof InterfaceProperty) {
            this.interfaceProperty = value;
        }
        else if (this instanceof LazyObjectProperty) {
            this.guid = value;
        }
        else if (this instanceof MapProperty) {
            this.map = value;
        }
        else if (this instanceof MulticastDelegateProperty) {
            this.delegate = value;
        }
        else if (this instanceof NameProperty) {
            this.name = value;
        }
        else if (this instanceof ObjectProperty) {
            this.index = value;
        }
        else if (this instanceof SetProperty) {
            this.array = value;
        }
        else if (this instanceof SoftClassProperty) {
            this.object = value;
        }
        else if (this instanceof SoftObjectProperty) {
            this.object = value;
        }
        else if (this instanceof StrProperty) {
            this.str = value;
        }
        else if (this instanceof StructProperty) {
            this.struct.structType = value;
        }
        else if (this instanceof TextProperty) {
            this.text = value;
        }
        else if (this instanceof UInt16Property) {
            this.number = value;
        }
        else if (this instanceof UInt32Property) {
            this.number = value;
        }
        else if (this instanceof UInt64Property) {
            this.number = value;
        }
    }
    /**
     * Turns this instance's value for json
     * @param {any} arg Used for locres in TextProperty
     * @returns {any}
     * @public
     */
    toJsonValue(arg) {
        return null;
    }
    /**
     * Reads a property's value
     * @param {FAssetArchive} Ar FAssetArchive to use
     * @param {PropertyType} typeData The property's type
     * @param {ReadType} type Read type to use
     * @returns {any} The property's value
     * @public
     * @static
     */
    static readPropertyValue(Ar, typeData, type) {
        const propertyType = typeData.type.text;
        if (propertyType === "BoolProperty") {
            if (type === ReadType.NORMAL) {
                return new BoolProperty(Ar.useUnversionedPropertySerialization ? Ar.readFlag() : typeData.bool);
            }
            else if (type === ReadType.MAP || type === ReadType.ARRAY) {
                return new BoolProperty(Ar.readFlag());
            }
            else if (type === ReadType.ZERO) {
                return new BoolProperty(typeData.bool);
            }
        }
        else if (propertyType === "StructProperty") {
            return new StructProperty(new UScriptStruct_1.UScriptStruct(Ar, typeData, type));
        }
        else if (propertyType === "ObjectProperty") {
            return new ObjectProperty(this.valueOr(() => new ObjectResource_1.FPackageIndex(Ar), () => new ObjectResource_1.FPackageIndex(0, Ar.owner), type));
        }
        else if (propertyType === "WeakObjectProperty") {
            return new WeakObjectProperty(this.valueOr(() => new ObjectResource_1.FPackageIndex(Ar), () => new ObjectResource_1.FPackageIndex(0, Ar.owner), type));
        }
        else if (propertyType === "LazyObjectProperty") {
            return new LazyObjectProperty(this.valueOr(() => new FUniqueObjectGuid_1.FUniqueObjectGuid(Ar), () => new FUniqueObjectGuid_1.FUniqueObjectGuid(new Guid_1.FGuid()), type));
        }
        else if (propertyType === "ClassProperty") {
            return new ClassProperty(this.valueOr(() => new ObjectResource_1.FPackageIndex(Ar), () => new ObjectResource_1.FPackageIndex(0, Ar.owner), type));
        }
        else if (propertyType === "InterfaceProperty") {
            return new InterfaceProperty(this.valueOr(() => new UInterfaceProperty_1.UInterfaceProperty(Ar), () => new UInterfaceProperty_1.UInterfaceProperty(0), type));
        }
        else if (propertyType === "FloatProperty") {
            return new FloatProperty(this.valueOr(() => Ar.readFloat32(), () => 0, type));
        }
        else if (propertyType === "TextProperty") {
            return new TextProperty(this.valueOr(() => new Text_1.FText(Ar), () => new Text_1.FText(0, ETextHistoryType_1.ETextHistoryType.None, new Text_1.FTextHistoryNone()), type));
        }
        else if (propertyType === "StrProperty") {
            return new StrProperty(this.valueOr(() => Ar.readString(), () => "", type));
        }
        else if (propertyType === "NameProperty") {
            return new NameProperty(this.valueOr(() => Ar.readFName(), () => FName_1.FName.NAME_None, type));
        }
        else if (propertyType === "IntProperty") {
            return new IntProperty(this.valueOr(() => Ar.readInt32(), () => 0, type));
        }
        else if (propertyType === "UInt16Property") {
            return new UInt16Property(this.valueOr(() => Ar.readUInt16(), () => 0, type));
        }
        else if (propertyType === "UInt32Property") {
            return new UInt32Property(this.valueOr(() => Ar.readUInt32(), () => 0, type));
        }
        else if (propertyType === "UInt64Property") {
            return new UInt64Property(this.valueOr(() => Number(Ar.readUInt64()), () => 0, type));
        }
        else if (propertyType === "ArrayProperty") {
            return new ArrayProperty(this.valueOr(() => new UScriptArray_1.UScriptArray(Ar, typeData), () => new UScriptArray_1.UScriptArray(null, []), type));
        }
        else if (propertyType === "SetProperty") {
            return new SetProperty(this.valueOr(() => new UScriptArray_1.UScriptArray(Ar, typeData), () => new UScriptArray_1.UScriptArray(null, []), type));
        }
        else if (propertyType === "MapProperty") {
            return new MapProperty(this.valueOr(() => new UScriptMap_1.UScriptMap(Ar, typeData), () => new UScriptMap_1.UScriptMap(0, new UnrealMap_1.UnrealMap()), type));
        }
        else if (propertyType === "ByteProperty") {
            if (Ar.useUnversionedPropertySerialization && type === ReadType.NORMAL) {
                return new ByteProperty(Ar.readUInt8());
            }
            else if (Ar.useUnversionedPropertySerialization && type === ReadType.ZERO) {
                return new ByteProperty(0);
            }
            else if (type === ReadType.MAP || !typeData.enumName.isNone()) {
                return new EnumProperty(Ar.readFName(), null); // TEnumAsByte
            }
            else {
                return new ByteProperty(Ar.readUInt8());
            }
        }
        else if (propertyType === "EnumProperty") {
            if (type === ReadType.NORMAL && typeData.enumName.isNone()) {
                return new EnumProperty(FName_1.FName.NAME_None, null);
            }
            else if (type !== ReadType.MAP && type !== ReadType.ARRAY && Ar.useUnversionedPropertySerialization) {
                const ordinal = this.valueOr(() => typeData.isEnumAsByte ? Ar.readUInt8() : Ar.readInt32(), () => 0, type);
                const enumClass = typeData.enumClass;
                if (enumClass) {
                    const enumValue = enumClass[Object.keys(enumClass)[ordinal]];
                    if (!enumValue) {
                        throw new Exceptions_1.ParserException(`Failed to get enum index ${ordinal} for enum ${enumClass.simpleName}`, Ar);
                    }
                    const fakeName = (typeData.enumName.text + "::" + enumValue);
                    if (Ar instanceof FExportArchive_1.FExportArchive)
                        Ar.checkDummyName(fakeName);
                    return new EnumProperty(FName_1.FName.dummy(fakeName, 0), enumValue);
                }
                else {
                    const enumValue = Ar.provider.mappingsProvider.getEnum(typeData.enumName)[ordinal];
                    if (!enumValue)
                        throw new Exceptions_1.ParserException(`Failed to get enum index $ordinal for enum ${typeData.enumName}`, Ar);
                    const fakeName = (typeData.enumName.text + "::" + enumValue);
                    if (Ar instanceof FExportArchive_1.FExportArchive)
                        Ar.checkDummyName(fakeName);
                    return new EnumProperty(FName_1.FName.dummy(fakeName, 0), null);
                }
            }
            else {
                return new EnumProperty(Ar.readFName(), null);
            }
        }
        else if (propertyType === "SoftObjectProperty") {
            const value = this.valueOr(() => new SoftObjectPath_1.FSoftObjectPath(Ar), () => new SoftObjectPath_1.FSoftObjectPath(), type);
            value.owner = Ar.owner;
            return new SoftObjectProperty(value);
        }
        else if (propertyType === "SoftClassProperty") {
            const value = this.valueOr(() => new SoftObjectPath_1.FSoftClassPath(Ar), () => new SoftObjectPath_1.FSoftClassPath(), type);
            value.owner = Ar.owner;
            return new SoftClassProperty(value);
        }
        else if (propertyType === "DelegateProperty") {
            return new DelegateProperty(this.valueOr(() => new ScriptDelegates_1.FScriptDelegate(Ar), () => new ScriptDelegates_1.FScriptDelegate(new ObjectResource_1.FPackageIndex(), FName_1.FName.NAME_None), type));
        }
        else if (propertyType === "MulticastDelegateProperty") {
            return new MulticastDelegateProperty(this.valueOr(() => new ScriptDelegates_1.FMulticastScriptDelegate(Ar), () => new ScriptDelegates_1.FMulticastScriptDelegate([]), type));
        }
        else if (propertyType === "DoubleProperty") {
            return new DoubleProperty(this.valueOr(() => Ar.readDouble(), () => 0.0, type));
        }
        else if (propertyType === "Int8Property") {
            return new Int8Property(this.valueOr(() => Ar.readInt8(), () => 0, type));
        }
        else if (propertyType === "Int16Property") {
            return new Int16Property(this.valueOr(() => Ar.readInt16(), () => 0, type));
        }
        else if (propertyType === "Int64Property") {
            return new Int64Property(this.valueOr(() => Number(Ar.readInt64()), () => 0, type));
        }
        else if (propertyType === "FieldPathProperty") {
            return new FieldPathProperty(this.valueOr(() => new FFieldPath_1.FFieldPath(Ar), () => new FFieldPath_1.FFieldPath(), type));
        }
        else {
            console.warn(`Couldn't read property type ${propertyType} at ${Ar.pos}`);
            return null;
        }
    }
    /**
     * Serializes a property's value
     * @param {FAssetArchive} Ar FAssetArchive to use
     * @param {FProperty} tag The property
     * @param {ReadType} type Read type to use
     * @returns {void}
     * @public
     * @static
     */
    static writePropertyValue(Ar, tag, type) {
        if (tag instanceof ArrayProperty) {
            tag.array.serialize(Ar);
        }
        else if (tag instanceof BoolProperty) {
            if (type === ReadType.MAP || type === ReadType.ARRAY)
                Ar.writeFlag(tag.bool);
        }
        else if (tag instanceof ByteProperty) {
            switch (type) {
                case ReadType.NORMAL:
                    Ar.writeInt32(tag.byte);
                    Ar.writeInt32(0);
                    break;
                case ReadType.MAP:
                    Ar.writeUInt32(tag.byte);
                    break;
                case ReadType.ARRAY:
                    Ar.writeUInt8(tag.byte);
                    break;
            }
        }
        else if (tag instanceof DelegateProperty) {
            tag.delegate.serialize(Ar);
        }
        else if (tag instanceof DoubleProperty) {
            Ar.writeDouble(tag.number);
        }
        else if (tag instanceof EnumProperty) {
            if (!(tag.name instanceof FName_1.FNameDummy))
                Ar.writeFName(tag.name);
        }
        else if (tag instanceof FloatProperty) {
            Ar.writeFloat32(tag.float);
        }
        else if (tag instanceof Int16Property) {
            Ar.writeInt16(tag.number);
        }
        else if (tag instanceof Int64Property) {
            Ar.writeInt64(tag.number);
        }
        else if (tag instanceof Int8Property) {
            Ar.writeInt8(tag.number);
        }
        else if (tag instanceof IntProperty) {
            Ar.writeInt32(tag.number);
        }
        else if (tag instanceof InterfaceProperty) {
            tag.interfaceProperty.serialize(Ar);
        }
        else if (tag instanceof LazyObjectProperty) {
            tag.guid.serialize(Ar);
        }
        else if (tag instanceof MapProperty) {
            tag.map.serialize(Ar);
        }
        else if (tag instanceof MulticastDelegateProperty) {
            tag.delegate.serialize(Ar);
        }
        else if (tag instanceof NameProperty) {
            Ar.writeFName(tag.name);
        }
        else if (tag instanceof ObjectProperty) {
            tag.index.serialize(Ar);
        }
        else if (tag instanceof SetProperty) {
            tag.array.serialize(Ar);
        }
        else if (tag instanceof SoftClassProperty) {
            tag.object.serialize(Ar);
        }
        else if (tag instanceof SoftObjectProperty) {
            tag.object.serialize(Ar);
        }
        else if (tag instanceof StrProperty) {
            Ar.writeString(tag.str);
        }
        else if (tag instanceof StructProperty) {
            throw new Error("Unsupported");
            // TODO tag.struct.serialize(Ar)
        }
        else if (tag instanceof TextProperty) {
            tag.text.serialize(Ar);
        }
        else if (tag instanceof UInt16Property) {
            Ar.writeUInt16(tag.number);
        }
        else if (tag instanceof UInt32Property) {
            Ar.writeUInt32(tag.number);
        }
        else if (tag instanceof UInt64Property) {
            Ar.writeUInt64(tag.number);
        }
    }
    /**
     * Returns a value referring to read type
     * @param {any} valueIfNonZero
     * @param {any} valueIfZero
     * @param {ReadType} type
     * @returns {any}
     * @example valueOr(() => new Class(Ar), () => new EmptyClass(), type)
     * @public
     * @static
     */
    static valueOr(valueIfNonZero, valueIfZero, type) {
        return type !== ReadType.ZERO ? valueIfNonZero() : valueIfZero();
    }
}
exports.FProperty = FProperty;
/**
 * Represents an array property
 * @extends {FProperty}
 */
class ArrayProperty extends FProperty {
    constructor(array) {
        super();
        this.array = array;
    }
    /**
     * Turns this to a json value
     * @returns {Array<any>}
     * @public
     */
    toJsonValue() {
        return this.array.contents
            .map(c => c.toJsonValue());
    }
}
exports.ArrayProperty = ArrayProperty;
/**
 * Represents a bool property
 * @extends {FProperty}
 */
class BoolProperty extends FProperty {
    constructor(bool) {
        super();
        this.bool = bool;
    }
    /**
     * Turns this to a json value
     * @returns {boolean}
     * @public
     */
    toJsonValue() {
        return this.bool;
    }
}
exports.BoolProperty = BoolProperty;
/**
 * Represents a byte property
 * @extends {FProperty}
 */
class ByteProperty extends FProperty {
    constructor(byte) {
        super();
        this.byte = byte;
    }
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue() {
        return this.byte;
    }
}
exports.ByteProperty = ByteProperty;
/**
 * Represents a class property
 * @extends {FProperty}
 */
class ClassProperty extends FProperty {
    constructor(index) {
        super();
        this.index = index;
    }
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue() {
        return this.index.name?.text;
    }
}
exports.ClassProperty = ClassProperty;
/**
 * Represents a delegate property
 * @extends {FProperty}
 */
class DelegateProperty extends FProperty {
    constructor(delegate) {
        super();
        this.delegate = delegate;
    }
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue() {
        return {
            functionName: this.delegate.functionName.text,
            packageObject: this.delegate.object.load()?.toJson() || null
        };
    }
}
exports.DelegateProperty = DelegateProperty;
/**
 * Represents a double property
 * @extends {FProperty}
 */
class DoubleProperty extends FProperty {
    constructor(number) {
        super();
        this.number = number;
    }
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue() {
        return this.number;
    }
}
exports.DoubleProperty = DoubleProperty;
/**
 * Represents an enum property
 * @extends {FProperty}
 */
class EnumProperty extends FProperty {
    constructor(name, enumConstant) {
        super();
        this.name = name;
        this.enumConstant = enumConstant;
    }
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue() {
        return this.name.text;
    }
}
exports.EnumProperty = EnumProperty;
/**
 * Represents a field path property
 * @extends {FProperty}
 */
class FieldPathProperty extends FProperty {
    constructor(fieldPath) {
        super();
        this.fieldPath = fieldPath;
    }
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue() {
        return {
            path: this.fieldPath.path.map(f => f.text),
            resolvedOwner: this.fieldPath.resolvedOwner.load()?.toJson() || null
        };
    }
}
exports.FieldPathProperty = FieldPathProperty;
/**
 * Represents a float property
 * @extends {FProperty}
 */
class FloatProperty extends FProperty {
    constructor(float) {
        super();
        this.float = float;
    }
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue() {
        return this.float;
    }
}
exports.FloatProperty = FloatProperty;
/**
 * Represents an int16 property
 * @extends {FProperty}
 */
class Int16Property extends FProperty {
    constructor(number) {
        super();
        this.number = number;
    }
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue() {
        return this.number;
    }
}
exports.Int16Property = Int16Property;
/**
 * Represents an int64 property
 * @extends {FProperty}
 */
class Int64Property extends FProperty {
    constructor(number) {
        super();
        this.number = number;
    }
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue() {
        return this.number;
    }
}
exports.Int64Property = Int64Property;
/**
 * Represents an int8 property
 * @extends {FProperty}
 */
class Int8Property extends FProperty {
    constructor(number) {
        super();
        this.number = number;
    }
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue() {
        return this.number;
    }
}
exports.Int8Property = Int8Property;
/**
 * Represents an int(32) property
 * @extends {FProperty}
 */
class IntProperty extends FProperty {
    constructor(number) {
        super();
        this.number = number;
    }
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue() {
        return this.number;
    }
}
exports.IntProperty = IntProperty;
/**
 * Represents an interface property
 * @extends {FProperty}
 */
class InterfaceProperty extends FProperty {
    constructor(interfaceProperty) {
        super();
        this.interfaceProperty = interfaceProperty;
    }
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue() {
        return this.interfaceProperty.interfaceNumber;
    }
}
exports.InterfaceProperty = InterfaceProperty;
/**
 * Represents a lazy object property
 * @extends {FProperty}
 */
class LazyObjectProperty extends FProperty {
    constructor(guid) {
        super();
        this.guid = guid;
    }
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue() {
        return this.guid.guid.toString(Guid_1.EGuidFormats.DigitsWithHyphens);
    }
}
exports.LazyObjectProperty = LazyObjectProperty;
/**
 * Represents a map property
 * @extends {FProperty}
 */
class MapProperty extends FProperty {
    constructor(map) {
        super();
        this.map = map;
    }
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue() {
        return {
            numKeysToRemove: this.map.numKeysToRemove,
            mapData: this.map.mapData.map((v, k) => {
                return { key: k.toJsonValue(), value: v.toJsonValue() };
            })
        };
    }
}
exports.MapProperty = MapProperty;
/**
 * Represents a multicast delegate property
 * @extends {FProperty}
 */
class MulticastDelegateProperty extends FProperty {
    constructor(delegate) {
        super();
        this.delegate = delegate;
    }
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue() {
        return this.delegate.invocationList
            .map(d => {
            return { functionName: d.functionName.text, object: d.object.load() || null };
        });
    }
}
exports.MulticastDelegateProperty = MulticastDelegateProperty;
/**
 * Represents a name property
 * @extends {FProperty}
 */
class NameProperty extends FProperty {
    constructor(name) {
        super();
        this.name = name;
    }
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue() {
        return this.name.text;
    }
}
exports.NameProperty = NameProperty;
/**
 * Represents an object property
 * @extends {FProperty}
 */
class ObjectProperty extends FProperty {
    constructor(index) {
        super();
        this.index = index;
    }
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue() {
        return this.index.name?.text;
    }
}
exports.ObjectProperty = ObjectProperty;
/**
 * Represents a set property
 * @extends {FProperty}
 */
class SetProperty extends FProperty {
    constructor(array) {
        super();
        this.array = array;
    }
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue() {
        return {
            contents: this.array.contents.map(c => c.toJsonValue()),
            innerTag: this.array.innerTag.toJson()
        };
    }
}
exports.SetProperty = SetProperty;
/**
 * Represents a soft class property
 * @extends {FProperty}
 */
class SoftClassProperty extends FProperty {
    constructor(object) {
        super();
        this.object = object;
    }
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue() {
        return {
            assetPathName: this.object.assetPathName.text,
            subPathString: this.object.subPathString
        };
    }
}
exports.SoftClassProperty = SoftClassProperty;
/**
 * Represents a soft object property
 * @extends {FProperty}
 */
class SoftObjectProperty extends FProperty {
    constructor(object) {
        super();
        this.object = object;
    }
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue() {
        return this.object.toJson();
    }
}
exports.SoftObjectProperty = SoftObjectProperty;
/**
 * Represents a string property
 * @extends {FProperty}
 */
class StrProperty extends FProperty {
    constructor(str) {
        super();
        this.str = str;
    }
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue() {
        return this.str;
    }
}
exports.StrProperty = StrProperty;
/**
 * Represents a struct property
 * @extends {FProperty}
 */
class StructProperty extends FProperty {
    constructor(struct) {
        super();
        this.struct = struct;
    }
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue() {
        return this.struct.structType.toJson();
    }
}
exports.StructProperty = StructProperty;
/**
 * Represents a text property
 * @extends {FProperty}
 */
class TextProperty extends FProperty {
    constructor(text) {
        super();
        this.text = text;
    }
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(locres) {
        return this.text.toJson();
    }
}
exports.TextProperty = TextProperty;
/**
 * Represents an uint16 property
 * @extends {FProperty}
 */
class UInt16Property extends FProperty {
    constructor(number) {
        super();
        this.number = number;
    }
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue() {
        return this.number;
    }
}
exports.UInt16Property = UInt16Property;
/**
 * Represents an uint32 property
 * @extends {FProperty}
 */
class UInt32Property extends FProperty {
    constructor(number) {
        super();
        this.number = number;
    }
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue() {
        return this.number;
    }
}
exports.UInt32Property = UInt32Property;
/**
 * Represents an uint64 property
 * @extends {FProperty}
 */
class UInt64Property extends FProperty {
    constructor(number) {
        super();
        this.number = number;
    }
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue() {
        return this.number;
    }
}
exports.UInt64Property = UInt64Property;
/**
 * Represents a weak object property
 * @extends {FProperty}
 */
class WeakObjectProperty extends FProperty {
    constructor(index) {
        super();
        this.index = index;
    }
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue() {
        return this.index.name?.text;
    }
}
exports.WeakObjectProperty = WeakObjectProperty;
var ReadType;
(function (ReadType) {
    ReadType["NORMAL"] = "NORMAL";
    ReadType["MAP"] = "MAP";
    ReadType["ARRAY"] = "ARRAY";
    ReadType["ZERO"] = "ZERO";
})(ReadType = exports.ReadType || (exports.ReadType = {}));
