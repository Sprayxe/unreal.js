import { UScriptArray } from "./UScriptArray";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FName } from "../../objects/uobject/FName";
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

export class FProperty {
    getTagTypeValue() {
        return this instanceof ArrayProperty ? this.array :
            this instanceof BoolProperty ? this.bool :
            this instanceof ByteProperty ? this.byte :
            this instanceof DelegateProperty ? this.delegate :
            this instanceof DoubleProperty ? this.number :
            this instanceof EnumProperty ? this.name :
            this instanceof FieldPathProperty ? this.fieldPath :
            this instanceof FloatProperty ? this.float :
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

    toJsonValue() {
        return null
    }

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
                        throw ParserException(`Failed to get enum index ${ordinal} for enum ${enumClass.simpleName}`)
                    }
                    const fakeName = (typeData.enumName.text + "::" + enumValue)
                    if (Ar instanceof FExportArchive)
                        Ar.checkDummyName(fakeName)
                    return new EnumProperty(FName.dummy(fakeName, 0), enumValue)
                } else {
                    const enumValue = Ar.provider.mappingsProvider.getEnum(typeData.enumName)[ordinal]
                    if (!enumValue)
                        throw ParserException(`Failed to get enum index $ordinal for enum ${typeData.enumName}`)
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
            if (!(tag.name instanceof FName.FNameDummy))
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

    static valueOr<T>(valueIfNonZero: () => T, valueIfZero: () => T, type: ReadType) {
        return type !== ReadType.ZERO ? valueIfNonZero() : valueIfZero()
    }
}

export class ArrayProperty extends FProperty {
    array: UScriptArray

    constructor(array: UScriptArray) {
        super()
        this.array = array
    }

    toJsonValue(): any[] {
        return this.array.contents
            .map(c => c.toJsonValue())
    }
}

export class BoolProperty extends FProperty {
    bool: boolean

    constructor(bool: boolean) {
        super()
        this.bool = bool
    }

    toJsonValue(): boolean {
        return this.bool
    }
}

export class ByteProperty extends FProperty {
    byte: number

    constructor(byte: number) {
        super()
        this.byte = byte
    }

    toJsonValue(): number {
        return this.byte
    }
}

export class ClassProperty extends FProperty {
    index: FPackageIndex

    constructor(index: FPackageIndex) {
        super()
        this.index = index
    }

    toJsonValue(): any {
        return null // TODO load the object
    }
}

export class DelegateProperty extends FProperty {
    delegate: FScriptDelegate

    constructor(delegate: FScriptDelegate) {
        super()
        this.delegate = delegate
    }

    toJsonValue(): any {
        return {
            functionName: this.delegate.functionName.text,
            packageObject: this.delegate.object.load()?.toJson() || null
        }
    }
}

export class DoubleProperty extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    toJsonValue(): number {
        return this.number
    }
}

export class EnumProperty extends FProperty {
    name: FName
    enumConstant: any

    constructor(name: FName, enumConstant: any) {
        super()
        this.name = name
        this.enumConstant = enumConstant
    }

    toJsonValue(): any {
        return {
            name: this.name.text,
            enumConstant: this.enumConstant
        }
    }
}

export class FieldPathProperty extends FProperty {
    fieldPath: FFieldPath

    constructor(fieldPath: FFieldPath) {
        super()
        this.fieldPath = fieldPath
    }

    toJsonValue(): any {
        return {
            path: this.fieldPath.path.map(f => f.text),
            resolvedOwner: this.fieldPath.resolvedOwner.load()?.toJson() || null
        }
    }
}

export class FloatProperty extends FProperty {
    float: number

    constructor(float: number) {
        super()
        this.float = float
    }

    toJsonValue(): number {
        return this.float
    }
}

export class Int16Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    toJsonValue(): number {
        return this.number
    }
}

export class Int64Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    toJsonValue(): number {
        return this.number
    }
}

export class Int8Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    toJsonValue(): number {
        return this.number
    }
}

export class IntProperty extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    toJsonValue(): number {
        return this.number
    }
}

export class InterfaceProperty extends FProperty {
    interfaceProperty: UInterfaceProperty

    constructor(interfaceProperty: UInterfaceProperty) {
        super()
        this.interfaceProperty = interfaceProperty
    }

    toJsonValue(): number {
        return this.interfaceProperty.interfaceNumber
    }
}

export class LazyObjectProperty extends FProperty {
    guid: FUniqueObjectGuid

    constructor(guid: FUniqueObjectGuid) {
        super()
        this.guid = guid
    }

    toJsonValue(): string {
        return this.guid.guid.toString(EGuidFormats.DigitsWithHyphens)
    }
}

export class MapProperty extends FProperty {
    map: UScriptMap

    constructor(map: UScriptMap) {
        super()
        this.map = map
    }

    toJsonValue(): any {
        return {
            numKeysToRemove: this.map.numKeysToRemove,
            mapData: this.map.mapData.map((v, k) => {
                return { key: k.toJsonValue(), value: v.toJsonValue() } })
        }
    }
}

export class MulticastDelegateProperty extends FProperty {
    delegate: FMulticastScriptDelegate

    constructor(delegate: FMulticastScriptDelegate) {
        super()
        this.delegate = delegate
    }

    toJsonValue(): { functionName: string, object: any }[] {
        return this.delegate.invocationList
            .map(d => { return { functionName: d.functionName.text, object: d.object.load() || null } })
    }
}

export class NameProperty extends FProperty {
    name: FName

    constructor(name: FName) {
        super()
        this.name = name
    }

    toJsonValue(): string {
        return this.name.text
    }
}

export class ObjectProperty extends FProperty {
    index: FPackageIndex

    constructor(index: FPackageIndex) {
        super()
        this.index = index
    }

    toJsonValue(): any {
        return null // TODO load the object
    }
}

export class SetProperty extends FProperty {
    array: UScriptArray

    constructor(array: UScriptArray) {
        super()
        this.array = array
    }

    toJsonValue(): any {
        return {
            contents: this.array.contents.map(c => c.toJsonValue()),
            innerTag: this.array.innerTag.toJson()
        }
    }
}

export class SoftClassProperty extends FProperty {
    object: FSoftClassPath

    constructor(object: FSoftClassPath) {
        super()
        this.object = object
    }

    toJsonValue(): any {
        return {
            assetPathName: this.object.assetPathName.text,
            subPathString: this.object.subPathString
        }
    }
}

export class SoftObjectProperty extends FProperty {
    object: FSoftObjectPath

    constructor(object: FSoftObjectPath) {
        super()
        this.object = object
    }

    toJsonValue(): any {
        return {
            assetPathName: this.object.assetPathName.text,
            subPathString: this.object.subPathString
        }
    }
}

export class StrProperty extends FProperty {
    str: string

    constructor(str: string) {
        super()
        this.str = str
    }

    toJsonValue(): string {
        return this.str
    }
}

export class StructProperty extends FProperty {
    struct: UScriptStruct

    constructor(struct: UScriptStruct) {
        super()
        this.struct = struct
    }

    toJsonValue(): string {
        return this.struct.structType.toJson()
    }
}

export class TextProperty extends FProperty {
    text: FText

    constructor(text: FText) {
        super()
        this.text = text
    }

    toJsonValue(): string {
        return this.text.text
    }
}

export class UInt16Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    toJsonValue(): number {
        return this.number
    }
}

export class UInt32Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    toJsonValue(): number {
        return this.number
    }
}

export class UInt64Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }

    toJsonValue(): number {
        return this.number
    }
}

export class WeakObjectProperty extends FProperty {
    index: FPackageIndex

    constructor(index: FPackageIndex) {
        super()
        this.index = index
    }

    toJsonValue() {
        return null
    }
}

export enum ReadType {
    NORMAL = "NORMAL",
    MAP = "MAP",
    ARRAY = "ARRAY",
    ZERO = "ZERO"
}