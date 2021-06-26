import { UScriptArray } from "./UScriptArray";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FName, FNameDummy } from "../../objects/uobject/FName";
import { FFieldPath } from "../../objects/FFieldPath";
import { UInterfaceProperty } from "../../objects/uobject/UInterfaceProperty";
import { FUniqueObjectGuid } from "../../objects/uobject/FUniqueObjectGuid";
import { FAssetArchive } from "../reader/FAssetArchive";
import { PropertyType } from "./PropertyType";
import { UScriptStruct } from "./UScriptStruct";
import { EGuidFormats, FGuid } from "../../objects/core/misc/Guid";
import { FText, FTextHistoryNone } from "../../objects/core/i18n/Text";
import { ETextHistoryType } from "../enums/ETextHistoryType";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { UScriptMap } from "../../objects/uobject/UScriptMap";
import { FMulticastScriptDelegate, FScriptDelegate } from "../../objects/uobject/ScriptDelegates";
import { FSoftClassPath, FSoftObjectPath } from "../../objects/uobject/SoftObjectPath";
import { ParserException } from "../../../exceptions/Exceptions";
import { FExportArchive } from "../reader/FExportArchive";
import { UnrealMap } from "../../../util/UnrealMap";

/**
 * Represents a property
 */
export class FProperty {
    /**
     * Gets the current instance's value
     * @returns {any} Current value
     * @public
     */
    getTagTypeValue(): any {
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
            null
    }

    /**
     * Sets a value for this instance
     * @param {any} value Value to set
     * @returns {void}
     * @public
     */
    setTagTypeValue(value?: any) {
        if (!value)
            return
        if (this instanceof ArrayProperty) {
            this.array = value as UScriptArray
        } else if (this instanceof BoolProperty) {
            this.bool = value as boolean
        } else if (this instanceof ByteProperty) {
            this.byte = value as number
        } else if (this instanceof DelegateProperty) {
            this.delegate = value as FScriptDelegate
        } else if (this instanceof BoolProperty) {
            this.bool = value as boolean
        } else if (this instanceof ByteProperty) {
            this.byte = value as number
        } else if (this instanceof DoubleProperty) {
            this.number = value as number
        } else if (this instanceof EnumProperty) {
            this.name = value as FName
        } else if (this instanceof FieldPathProperty) {
            this.fieldPath = value as FFieldPath
        } else if (this instanceof FloatProperty) {
            this.float = value as number
        } else if (this instanceof Int16Property) {
            this.number = value as number
        } else if (this instanceof Int64Property) {
            this.number = value as number
        } else if (this instanceof Int8Property) {
            this.number = value as number
        } else if (this instanceof IntProperty) {
            this.number = value as number
        } else if (this instanceof InterfaceProperty) {
            this.interfaceProperty = value as UInterfaceProperty
        } else if (this instanceof LazyObjectProperty) {
            this.guid = value as FUniqueObjectGuid
        } else if (this instanceof MapProperty) {
            this.map = value as UScriptMap
        } else if (this instanceof MulticastDelegateProperty) {
            this.delegate = value as FMulticastScriptDelegate
        } else if (this instanceof NameProperty) {
            this.name = value as FName
        } else if (this instanceof ObjectProperty) {
            this.index = value as FPackageIndex
        } else if (this instanceof SetProperty) {
            this.array = value as UScriptArray
        } else if (this instanceof SoftClassProperty) {
            this.object = value as FSoftClassPath
        } else if (this instanceof SoftObjectProperty) {
            this.object = value as FSoftObjectPath
        } else if (this instanceof StrProperty) {
            this.str = value as string
        } else if (this instanceof StructProperty) {
            this.struct.structType = value
        } else if (this instanceof TextProperty) {
            this.text = value as FText
        } else if (this instanceof UInt16Property) {
            this.number = value as number
        } else if (this instanceof UInt32Property) {
            this.number = value as number
        } else if (this instanceof UInt64Property) {
            this.number = value as number
        }
    }

    /**
     * Turns this instance's value for json
     * @returns {any}
     * @public
     */
    toJsonValue() {
        return null
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
    static readPropertyValue(Ar: FAssetArchive, typeData: PropertyType, type: ReadType) {
        const propertyType = typeData.type.text
        if (propertyType === "BoolProperty") {
            if (type === ReadType.NORMAL) {
                return new BoolProperty(Ar.useUnversionedPropertySerialization ? Ar.readFlag() : typeData.bool)
            } else if (type === ReadType.MAP || type === ReadType.ARRAY) {
                return new BoolProperty(Ar.readFlag())
            } else if (type === ReadType.ZERO) {
                return new BoolProperty(typeData.bool)
            }
        } else if (propertyType === "StructProperty") {
            return new StructProperty(new UScriptStruct(Ar, typeData, type))
        } else if (propertyType === "ObjectProperty") {
            return new ObjectProperty(
                this.valueOr(
                    () => new FPackageIndex(Ar),
                    () => new FPackageIndex(0, Ar.owner),
                    type
                )
            )
        } else if (propertyType === "WeakObjectProperty") {
            return new WeakObjectProperty(
                this.valueOr(
                    () => new FPackageIndex(Ar),
                    () => new FPackageIndex(0, Ar.owner),
                    type
                )
            )
        } else if (propertyType === "LazyObjectProperty") {
            return new LazyObjectProperty(
                this.valueOr(
                    () => new FUniqueObjectGuid(Ar),
                    () => new FUniqueObjectGuid(new FGuid()),
                    type
                )
            )
        } else if (propertyType === "ClassProperty") {
            return new ClassProperty(
                this.valueOr(
                    () => new FPackageIndex(Ar),
                    () => new FPackageIndex(0, Ar.owner),
                    type
                )
            )
        } else if (propertyType === "InterfaceProperty") {
            return new InterfaceProperty(
                this.valueOr(
                    () => new UInterfaceProperty(Ar),
                    () => new UInterfaceProperty(0),
                    type
                )
            )
        } else if (propertyType === "FloatProperty") {
            return new FloatProperty(
                this.valueOr(
                    () => Ar.readFloat32(),
                    () => 0,
                    type
                )
            )
        } else if (propertyType === "TextProperty") {
            return new TextProperty(
                this.valueOr(
                    () => new FText(Ar),
                    () => new FText(0, ETextHistoryType.None, new FTextHistoryNone()),
                    type
                )
            )
        } else if (propertyType === "StrProperty") {
            return new StrProperty(
                this.valueOr(
                    () => Ar.readString(),
                    () => "",
                    type
                )
            )
        } else if (propertyType === "NameProperty") {
            return new NameProperty(
                this.valueOr(
                    () => Ar.readFName(),
                    () => FName.NAME_None,
                    type
                )
            )
        } else if (propertyType === "IntProperty") {
            return new IntProperty(
                this.valueOr(
                    () => Ar.readInt32(),
                    () => 0,
                    type
                )
            )
        } else if (propertyType === "UInt16Property") {
            return new UInt16Property(
                this.valueOr(
                    () => Ar.readUInt16(),
                    () => 0,
                    type
                )
            )
        } else if (propertyType === "UInt32Property") {
            return new UInt32Property(
                this.valueOr(
                    () => Ar.readUInt32(),
                    () => 0,
                    type
                )
            )
        } else if (propertyType === "UInt64Property") {
            return new UInt64Property(
                this.valueOr(
                    () => Number(Ar.readUInt64()),
                    () => 0,
                    type
                )
            )
        } else if (propertyType === "ArrayProperty") {
            return new ArrayProperty(
                this.valueOr(
                    () => new UScriptArray(Ar, typeData),
                    () => new UScriptArray(null, []),
                    type
                )
            )
        } else if (propertyType === "SetProperty") {
            return new SetProperty(
                this.valueOr(
                    () => new UScriptArray(Ar, typeData),
                    () => new UScriptArray(null, []),
                    type
                )
            )
        } else if (propertyType === "MapProperty") {
            return new MapProperty(
                this.valueOr(
                    () => new UScriptMap(Ar, typeData),
                    () => new UScriptMap(0, new UnrealMap()),
                    type
                )
            )
        } else if (propertyType === "ByteProperty") {
            if (Ar.useUnversionedPropertySerialization && type === ReadType.NORMAL) {
                return new ByteProperty(Ar.readUInt8())
            } else if (Ar.useUnversionedPropertySerialization && type === ReadType.ZERO) {
                return new ByteProperty(0)
            } else if (type === ReadType.MAP || !typeData.enumName.isNone()) {
                return new EnumProperty(Ar.readFName(), null) // TEnumAsByte
            } else {
                return new ByteProperty(Ar.readUInt8())
            }
        } else if (propertyType === "EnumProperty") {
            if (type === ReadType.NORMAL && typeData.enumName.isNone()) {
                return new EnumProperty(FName.NAME_None, null)
            } else if (type !== ReadType.MAP && type !== ReadType.ARRAY && Ar.useUnversionedPropertySerialization) {
                const ordinal = this.valueOr(
                    () => typeData.isEnumAsByte ? Ar.readUInt8() : Ar.readInt32(),
                    () => 0,
                    type
                )
                const enumClass = typeData.enumClass
                if (enumClass) {
                    const enumValue = enumClass[Object.keys(enumClass)[ordinal]]
                    if (!enumValue) {
                        throw new ParserException(`Failed to get enum index ${ordinal} for enum ${enumClass.simpleName}`, Ar)
                    }
                    const fakeName = (typeData.enumName.text + "::" + enumValue)
                    if (Ar instanceof FExportArchive)
                        Ar.checkDummyName(fakeName)
                    return new EnumProperty(FName.dummy(fakeName, 0), enumValue)
                } else {
                    const enumValue = Ar.provider.mappingsProvider.getEnum(typeData.enumName)[ordinal]
                    if (!enumValue)
                        throw new ParserException(`Failed to get enum index $ordinal for enum ${typeData.enumName}`, Ar)
                    const fakeName = (typeData.enumName.text + "::" + enumValue)
                    if (Ar instanceof FExportArchive)
                        Ar.checkDummyName(fakeName)
                    return new EnumProperty(FName.dummy(fakeName, 0), null)
                }
            } else {
                return new EnumProperty(Ar.readFName(), null)
            }
        } else if (propertyType === "SoftObjectProperty") {
            const value = this.valueOr(
                () => new FSoftObjectPath(Ar),
                () => new FSoftObjectPath(),
                type
            )
            value.owner = Ar.owner
            return new SoftObjectProperty(value)
        } else if (propertyType === "SoftClassProperty") {
            const value = this.valueOr(
                () => new FSoftClassPath(Ar),
                () => new FSoftClassPath(),
                type
            )
            value.owner = Ar.owner
            return new SoftClassProperty(value)
        } else if (propertyType === "DelegateProperty") {
            return new DelegateProperty(
                this.valueOr(
                    () => new FScriptDelegate(Ar),
                    () => new FScriptDelegate(new FPackageIndex(), FName.NAME_None),
                    type
                )
            )
        } else if (propertyType === "MulticastDelegateProperty") {
            return new MulticastDelegateProperty(
                this.valueOr(
                    () => new FMulticastScriptDelegate(Ar),
                    () => new FMulticastScriptDelegate([]),
                    type
                )
            )
        } else if (propertyType === "DoubleProperty") {
            return new DoubleProperty(
                this.valueOr(
                    () => Ar.readDouble(),
                    () => 0.0,
                    type
                )
            )
        } else if (propertyType === "Int8Property") {
            return new Int8Property(
                this.valueOr(
                    () => Ar.readInt8(),
                    () => 0,
                    type
                )
            )
        } else if (propertyType === "Int16Property") {
            return new Int16Property(
                this.valueOr(
                    () => Ar.readInt16(),
                    () => 0,
                    type
                )
            )
        } else if (propertyType === "Int64Property") {
            return new Int64Property(
                this.valueOr(
                    () => Number(Ar.readInt64()),
                    () => 0,
                    type
                )
            )
        } else if (propertyType === "FieldPathProperty") {
            return new FieldPathProperty(
                this.valueOr(
                    () => new FFieldPath(Ar),
                    () => new FFieldPath(),
                    type
                )
            )
        } else {
            console.warn(`Couldn't read property type ${propertyType} at ${Ar.pos}`)
            return null
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
    static writePropertyValue(Ar: FAssetArchiveWriter, tag: FProperty, type: ReadType) {
        if (tag instanceof ArrayProperty) {
            tag.array.serialize(Ar)
        } else if (tag instanceof BoolProperty) {
            if (type === ReadType.MAP || type === ReadType.ARRAY)
                Ar.writeFlag(tag.bool)
        } else if (tag instanceof ByteProperty) {
            switch (type) {
                case ReadType.NORMAL:
                    Ar.writeInt32(tag.byte)
                    Ar.writeInt32(0)
                    break
                case ReadType.MAP:
                    Ar.writeUInt32(tag.byte)
                    break
                case ReadType.ARRAY:
                    Ar.writeUInt8(tag.byte)
                    break
            }
        } else if (tag instanceof DelegateProperty) {
            tag.delegate.serialize(Ar)
        } else if (tag instanceof DoubleProperty) {
            Ar.writeDouble(tag.number)
        } else if (tag instanceof EnumProperty) {
            if (!(tag.name instanceof FNameDummy))
                Ar.writeFName(tag.name)
        } else if (tag instanceof FloatProperty) {
            Ar.writeFloat32(tag.float)
        } else if (tag instanceof Int16Property) {
            Ar.writeInt16(tag.number)
        } else if (tag instanceof Int64Property) {
            Ar.writeInt64(tag.number)
        } else if (tag instanceof Int8Property) {
            Ar.writeInt8(tag.number)
        } else if (tag instanceof IntProperty) {
            Ar.writeInt32(tag.number)
        } else if (tag instanceof InterfaceProperty) {
            tag.interfaceProperty.serialize(Ar)
        } else if (tag instanceof LazyObjectProperty) {
            tag.guid.serialize(Ar)
        } else if (tag instanceof MapProperty) {
            tag.map.serialize(Ar)
        } else if (tag instanceof MulticastDelegateProperty) {
            tag.delegate.serialize(Ar)
        } else if (tag instanceof NameProperty) {
            Ar.writeFName(tag.name)
        } else if (tag instanceof ObjectProperty) {
            tag.index.serialize(Ar)
        } else if (tag instanceof SetProperty) {
            tag.array.serialize(Ar)
        } else if (tag instanceof SoftClassProperty) {
            tag.object.serialize(Ar)
        } else if (tag instanceof SoftObjectProperty) {
            tag.object.serialize(Ar)
        } else if (tag instanceof StrProperty) {
            Ar.writeString(tag.str)
        } else if (tag instanceof StructProperty) {
            throw new Error("Unsupported")
            // TODO tag.struct.serialize(Ar)
        } else if (tag instanceof TextProperty) {
            tag.text.serialize(Ar)
        } else if (tag instanceof UInt16Property) {
            Ar.writeUInt16(tag.number)
        } else if (tag instanceof UInt32Property) {
            Ar.writeUInt32(tag.number)
        } else if (tag instanceof UInt64Property) {
            Ar.writeUInt64(tag.number)
        }
    }

    /**
     * Returns a value referring to read type
     * @param {() => any} valueIfNonZero
     * @param {() =>  any} valueIfZero
     * @param {ReadType} type
     * @returns {any}
     * @public
     * @static
     */
    static valueOr<T>(valueIfNonZero: () => T, valueIfZero: () => T, type: ReadType) {
        return type !== ReadType.ZERO ? valueIfNonZero() : valueIfZero()
    }
}

/**
 * Represents an array property
 * @extends {FProperty}
 */
export class ArrayProperty extends FProperty {
    /**
     * Content
     * @type {UScriptArray}
     * @public
     */
    array: UScriptArray

    constructor(array: UScriptArray) {
        super()
        this.array = array
    }

    /**
     * Turns this to a json value
     * @returns {Array<any>}
     * @public
     */
    toJsonValue(): any[] {
        return this.array.contents
            .map(c => c.toJsonValue())
    }
}

/**
 * Represents a bool property
 * @extends {FProperty}
 */
export class BoolProperty extends FProperty {
    /**
     * Content
     * @type {boolean}
     * @public
     */
    bool: boolean

    constructor(bool: boolean) {
        super()
        this.bool = bool
    }

    /**
     * Turns this to a json value
     * @returns {boolean}
     * @public
     */
    toJsonValue(): boolean {
        return this.bool
    }
}

/**
 * Represents a byte property
 * @extends {FProperty}
 */
export class ByteProperty extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    byte: number

    constructor(byte: number) {
        super()
        this.byte = byte
    }

    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number {
        return this.byte
    }
}

/**
 * Represents a class property
 * @extends {FProperty}
 */
export class ClassProperty extends FProperty {
    /**
     * Content
     * @type {FPackageIndex}
     * @public
     */
    index: FPackageIndex

    constructor(index: FPackageIndex) {
        super()
        this.index = index
    }

    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): string {
        return this.index.name?.text
    }
}

/**
 * Represents a delegate property
 * @extends {FProperty}
 */
export class DelegateProperty extends FProperty {
    /**
     * Content
     * @type {FScriptDelegate}
     * @public
     */
    delegate: FScriptDelegate

    constructor(delegate: FScriptDelegate) {
        super()
        this.delegate = delegate
    }

    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any {
        return {
            functionName: this.delegate.functionName.text,
            packageObject: this.delegate.object.load()?.toJson() || null
        }
    }
}

/**
 * Represents a double property
 * @extends {FProperty}
 */
export class DoubleProperty extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number {
        return this.number
    }
}

/**
 * Represents an enum property
 * @extends {FProperty}
 */
export class EnumProperty extends FProperty {
    /**
     * Content
     * @type {FName}
     * @public
     */
    name: FName

    /**
     * Enum constant
     * @type {any}
     * @public
     */
    enumConstant: any

    constructor(name: FName, enumConstant: any) {
        super()
        this.name = name
        this.enumConstant = enumConstant
    }

    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): any {
        return this.name.text
    }
}

/**
 * Represents a field path property
 * @extends {FProperty}
 */
export class FieldPathProperty extends FProperty {
    /**
     * Content
     * @type {FFieldPath}
     * @public
     */
    fieldPath: FFieldPath

    constructor(fieldPath: FFieldPath) {
        super()
        this.fieldPath = fieldPath
    }

    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any {
        return {
            path: this.fieldPath.path.map(f => f.text),
            resolvedOwner: this.fieldPath.resolvedOwner.load()?.toJson() || null
        }
    }
}

/**
 * Represents a float property
 * @extends {FProperty}
 */
export class FloatProperty extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    float: number

    constructor(float: number) {
        super()
        this.float = float
    }

    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number {
        return this.float
    }
}

/**
 * Represents an int16 property
 * @extends {FProperty}
 */
export class Int16Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number {
        return this.number
    }
}

/**
 * Represents an int64 property
 * @extends {FProperty}
 */
export class Int64Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number {
        return this.number
    }
}

/**
 * Represents an int8 property
 * @extends {FProperty}
 */
export class Int8Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number {
        return this.number
    }
}

/**
 * Represents an int(32) property
 * @extends {FProperty}
 */
export class IntProperty extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number {
        return this.number
    }
}

/**
 * Represents an interface property
 * @extends {FProperty}
 */
export class InterfaceProperty extends FProperty {
    /**
     * Content
     * @type {UInterfaceProperty}
     * @public
     */
    interfaceProperty: UInterfaceProperty

    constructor(interfaceProperty: UInterfaceProperty) {
        super()
        this.interfaceProperty = interfaceProperty
    }

    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number {
        return this.interfaceProperty.interfaceNumber
    }
}

/**
 * Represents a lazy object property
 * @extends {FProperty}
 */
export class LazyObjectProperty extends FProperty {
    /**
     * Content
     * @type {FUniqueObjectGuid}
     * @public
     */
    guid: FUniqueObjectGuid

    constructor(guid: FUniqueObjectGuid) {
        super()
        this.guid = guid
    }

    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): string {
        return this.guid.guid.toString(EGuidFormats.DigitsWithHyphens)
    }
}

/**
 * Represents a map property
 * @extends {FProperty}
 */
export class MapProperty extends FProperty {
    /**
     * Content
     * @type {UScriptMap}
     * @public
     */
    map: UScriptMap

    constructor(map: UScriptMap) {
        super()
        this.map = map
    }

    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any {
        return {
            numKeysToRemove: this.map.numKeysToRemove,
            mapData: this.map.mapData.map((v, k) => {
                return {key: k.toJsonValue(), value: v.toJsonValue()}
            })
        }
    }
}

/**
 * Represents a multicast delegate property
 * @extends {FProperty}
 */
export class MulticastDelegateProperty extends FProperty {
    /**
     * Content
     * @type {FMulticastScriptDelegate}
     * @public
     */
    delegate: FMulticastScriptDelegate

    constructor(delegate: FMulticastScriptDelegate) {
        super()
        this.delegate = delegate
    }

    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): { functionName: string, object: any }[] {
        return this.delegate.invocationList
            .map(d => {
                return {functionName: d.functionName.text, object: d.object.load() || null}
            })
    }
}

/**
 * Represents a name property
 * @extends {FProperty}
 */
export class NameProperty extends FProperty {
    /**
     * Content
     * @type {FName}
     * @public
     */
    name: FName

    constructor(name: FName) {
        super()
        this.name = name
    }

    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): string {
        return this.name.text
    }
}

/**
 * Represents an object property
 * @extends {FProperty}
 */
export class ObjectProperty extends FProperty {
    /**
     * Content
     * @type {FPackageIndex}
     * @public
     */
    index: FPackageIndex

    constructor(index: FPackageIndex) {
        super()
        this.index = index
    }

    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): string {
        return this.index.name?.text
    }
}

/**
 * Represents a set property
 * @extends {FProperty}
 */
export class SetProperty extends FProperty {
    /**
     * Content
     * @type {UScriptArray}
     * @public
     */
    array: UScriptArray

    constructor(array: UScriptArray) {
        super()
        this.array = array
    }

    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any {
        return {
            contents: this.array.contents.map(c => c.toJsonValue()),
            innerTag: this.array.innerTag.toJson()
        }
    }
}

/**
 * Represents a soft class property
 * @extends {FProperty}
 */
export class SoftClassProperty extends FProperty {
    /**
     * Content
     * @type {FSoftClassPath}
     * @public
     */
    object: FSoftClassPath

    constructor(object: FSoftClassPath) {
        super()
        this.object = object
    }

    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any {
        return {
            assetPathName: this.object.assetPathName.text,
            subPathString: this.object.subPathString
        }
    }
}

/**
 * Represents a soft object property
 * @extends {FProperty}
 */
export class SoftObjectProperty extends FProperty {
    /**
     * Content
     * @type {FSoftObjectPath}
     * @public
     */
    object: FSoftObjectPath

    constructor(object: FSoftObjectPath) {
        super()
        this.object = object
    }

    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any {
        return this.object.toJson()
    }
}

/**
 * Represents a string property
 * @extends {FProperty}
 */
export class StrProperty extends FProperty {
    /**
     * Content
     * @type {string}
     * @public
     */
    str: string

    constructor(str: string) {
        super()
        this.str = str
    }

    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): string {
        return this.str
    }
}

/**
 * Represents a struct property
 * @extends {FProperty}
 */
export class StructProperty extends FProperty {
    /**
     * Content
     * @type {UScriptStruct}
     * @public
     */
    struct: UScriptStruct

    constructor(struct: UScriptStruct) {
        super()
        this.struct = struct
    }

    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): any {
        return this.struct.structType.toJson()
    }
}

/**
 * Represents a text property
 * @extends {FProperty}
 */
export class TextProperty extends FProperty {
    /**
     * Content
     * @type {FText}
     * @public
     */
    text: FText

    constructor(text: FText) {
        super()
        this.text = text
    }

    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any {
        return this.text.toJson()
    }
}

/**
 * Represents an uint16 property
 * @extends {FProperty}
 */
export class UInt16Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number {
        return this.number
    }
}

/**
 * Represents an uint32 property
 * @extends {FProperty}
 */
export class UInt32Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number {
        return this.number
    }
}

/**
 * Represents an uint64 property
 * @extends {FProperty}
 */
export class UInt64Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number {
        return this.number
    }
}

/**
 * Represents a weak object property
 * @extends {FProperty}
 */
export class WeakObjectProperty extends FProperty {
    /**
     * Content
     * @type {FPackageIndex}
     * @public
     */
    index: FPackageIndex

    constructor(index: FPackageIndex) {
        super()
        this.index = index
    }

    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue() {
        return this.index.name?.text
    }
}

export enum ReadType {
    NORMAL = "NORMAL",
    MAP = "MAP",
    ARRAY = "ARRAY",
    ZERO = "ZERO"
}