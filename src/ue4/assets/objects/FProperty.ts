import { FArrayProperty } from "../exports/UStruct";
import { UScriptArray } from "./UScriptArray";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FName } from "../../objects/uobject/FName";
import { FScriptDelegate } from "../../objects/uobject/FScriptDelegate";
import { FFieldPath } from "../../objects/FFieldPath";
import { UInterfaceProperty } from "../../objects/uobject/UInterfaceProperty";
import { FUniqueObjectGuid } from "../../objects/uobject/FUniqueObjectGuid";
import { FAssetArchive } from "../reader/FAssetArchive";
import { PropertyType } from "./PropertyType";
import { UScriptStruct } from "./UScriptStruct";
import { FGuid } from "../../objects/core/misc/Guid";

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
            return new FloatProperty(
                this.valueOr(
                    () => Ar.readFloat32(),
                    () => 0,
                    type
                )
            )
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
}

export class BoolProperty extends FProperty {
    bool: boolean

    constructor(bool: boolean) {
        super()
        this.bool = bool
    }
}

export class ByteProperty extends FProperty {
    byte: number

    constructor(byte: number) {
        super()
        this.byte = byte
    }
}

export class ClassProperty extends FProperty {
    index: FPackageIndex

    constructor(index: FPackageIndex) {
        super()
        this.index = index
    }
}

export class DelegateProperty extends FProperty {
    delegate: FScriptDelegate

    constructor(delegate: FScriptDelegate) {
        super()
        this.delegate = delegate
    }
}

export class DoubleProperty extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
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
}

export class FieldPathProperty extends FProperty {
    fieldPath: FFieldPath

    constructor(fieldPath: FFieldPath) {
        super()
        this.fieldPath = fieldPath
    }
}

export class FloatProperty extends FProperty {
    float: number

    constructor(float: number) {
        super()
        this.float = float
    }
}

export class Int16Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }
}

export class Int64Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }
}

export class Int8Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }
}

export class IntProperty extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }
}

export class InterfaceProperty extends FProperty {
    interfaceProperty: UInterfaceProperty

    constructor(interfaceProperty: UInterfaceProperty) {
        super()
        this.interfaceProperty = interfaceProperty
    }
}

export class LazyObjectProperty extends FProperty {
    guid: FUniqueObjectGuid

    constructor(guid: FUniqueObjectGuid) {
        super()
        this.guid = guid
    }
}

export class MapProperty extends FProperty {
    map: any

    constructor(map: any) {
        super()
        this.map = map
    }
}

export class MulticastDelegateProperty extends FProperty {
    delegate: any

    constructor(delegate: any) {
        super()
        this.delegate = delegate
    }
}

export class NameProperty extends FProperty {
    name: FName

    constructor(name: FName) {
        super()
        this.name = name
    }
}

export class ObjectProperty extends FProperty {
    index: FPackageIndex

    constructor(index: FPackageIndex) {
        super()
        this.index = index
    }
}

export class SetProperty extends FProperty {
    array: any

    constructor(array: any) {
        super()
        this.array = array
    }
}

export class SoftClassProperty extends FProperty {
    object: any

    constructor(object: any) {
        super()
        this.object = object
    }
}

export class SoftObjectProperty extends FProperty {
    object: any

    constructor(object: any) {
        super()
        this.object = object
    }
}

export class StrProperty extends FProperty {
    str: string

    constructor(str: string) {
        super()
        this.str = str
    }
}

export class StructProperty extends FProperty {
    struct: any

    constructor(struct: any) {
        super()
        this.struct = struct
    }
}

export class TextProperty extends FProperty {
    text: any

    constructor(text: any) {
        super()
        this.text = text
    }
}

export class UInt16Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }
}

export class UInt32Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }
}

export class UInt64Property extends FProperty {
    number: number

    constructor(number: number) {
        super()
        this.number = number
    }
}

export class WeakObjectProperty extends FProperty {
    index: FPackageIndex

    constructor(index: FPackageIndex) {
        super()
        this.index = index
    }
}

export enum ReadType {
    NORMAL = "NORMAL",
    MAP = "MAP",
    ARRAY = "ARRAY",
    ZERO = "ZERO"
}