import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FName } from "../../objects/uobject/FName";
import { FAssetArchive } from "../reader/FAssetArchive";
import { ParserException } from "../../../exceptions/Exceptions";
import { UObject } from "./UObject";
import { PropertyInfo } from "../objects/PropertyInfo";

export class UStruct extends UObject {
    superStruct: UStruct = null
    children: FPackageIndex[] = []
    childProperties: FField[] = []
    childProperties2: PropertyInfo[] = []
    propertyCount = 0

    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)
        this.superStruct = Ar.readObject()
        this.children = Ar.readArray(() => new FPackageIndex(Ar))
        this.serializeProperties(Ar)
        // region FStructScriptLoader::FStructScriptLoader
        const bytecodeBufferSize = Ar.readInt32()
        const serializedScriptSize = Ar.readInt32()
        Ar.pos += serializedScriptSize
        if (serializedScriptSize > 0)
            console.info(`Skipped ${serializedScriptSize} bytes of bytecode data`)
        // endregion
    }

    protected serializeProperties(Ar: FAssetArchive) {
        this.childProperties = Ar.readArray((it: number) => {
            const propertyTypeName = Ar.readFName()
            const prop = FField.construct(propertyTypeName)
            if (!prop)
                throw ParserException(`Unsupported serialized property type ${propertyTypeName}`)
            prop.deserialize(Ar)
            if (GDebugProperties)
                console.info(`${it} = ${propertyTypeName} ${prop.name}`)
            return prop
        })
    }
}

export class FField {
    name: FName = FName.NAME_None
    flags: number = 0

    deserialize(Ar: FAssetArchive) {
        this.name = Ar.readFName()
        this.flags = Ar.readUInt32()
    }

    static construct(fieldTypeName: FName): FPropertySerialized {
        switch (fieldTypeName.text) {
            case "ArrayProperty": {
                return new FArrayProperty()
            }
            case "BoolProperty": {
                return new FBoolProperty()
            }
            case "ByteProperty": {
                return new FByteProperty()
            }
            case "ClassProperty": {
                return new FClassProperty()
            }
            case "DelegateProperty": {
                return new FDelegateProperty()
            }
            case "EnumProperty": {
                return new FEnumProperty()
            }
            case "FloatProperty": {
                return new FFloatProperty()
            }
            case "Int16Property": {
                return new FInt16Property()
            }
            case "Int64Property": {
                return new FInt64Property()
            }
            case "Int8Property": {
                return new FInt8Property()
            }
            case "IntProperty": {
                return new FIntProperty()
            }
            case "InterfaceProperty": {
                return new FInterfaceProperty()
            }
            case "MapProperty": {
                return new FMapProperty()
            }
            case "MulticastDelegateProperty": {
                return new FMulticastDelegateProperty()
            }
            case "MulticastInlineDelegateProperty": {
                return new FMulticastInlineDelegateProperty()
            }
            case "NameProperty": {
                return new FNameProperty()
            }
            case "ObjectProperty": {
                return new FObjectProperty()
            }
            case "SetProperty": {
                return new FSetProperty()
            }
            case "SoftClassProperty": {
                return new FSoftClassProperty()
            }
            case "SoftObjectProperty": {
                return new FSoftObjectProperty()
            }
            case "StrProperty": {
                return new FStrProperty()
            }
            case "StructProperty": {
                return new FStructProperty()
            }
            case "TextProperty": {
                return new FTextProperty()
            }
            case "UInt16Property": {
                return new FUInt16Property()
            }
            case "UInt32Property": {
                return new FUInt32Property()
            }
            case "UInt64Property": {
                return new FUInt64Property()
            }
            default: {
                return null
            }
        }
    }
}

export class FPropertySerialized extends FField {
    arrayDim: number = 1
    elementSize: number = 0
    saveFlags: number
    repIndex: number = 0
    repNotifyFunc: FName = FName.NAME_None
    blueprintReplicationCondition: number = 0

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.arrayDim = Ar.readInt32()
        this.elementSize = Ar.readInt32()
        this.saveFlags = Ar.readUInt64() as unknown as number
        this.repIndex = Ar.readUInt16()
        this.repNotifyFunc = Ar.readFName()
        this.blueprintReplicationCondition = Ar.readUInt8()
    }
}

export class FBoolProperty extends FPropertySerialized {
    fieldSize: number = 0
    byteOffset: number = 0
    byteMask: number = 0
    fieldMask: number = 0
    boolSize: number = 0
    nativeBool: number = 0

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.fieldSize = Ar.readUInt8()
        this.byteOffset = Ar.readUInt8()
        this.byteMask = Ar.readUInt8()
        this.fieldMask = Ar.readUInt8()
        this.boolSize = Ar.readUInt8()
        this.nativeBool = Ar.readUInt8()
    }
}

export class FNumericProperty extends FPropertySerialized {
}

export class FObjectProperty extends FPropertySerialized {
    propertyClass: any = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.propertyClass = Ar.readObject()
    }
}

export class FArrayProperty extends FPropertySerialized {
    inner?: FPropertySerialized = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.inner = serializeSingleField(Ar) as FPropertySerialized
    }
}

export class FByteProperty extends FNumericProperty {
    enum: FPackageIndex = new FPackageIndex()

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.enum = new FPackageIndex(Ar)
    }
}

export class FClassProperty extends FObjectProperty {
    metaClass: any = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.metaClass = Ar.readObject()
    }
}

export class FDelegateProperty extends FPropertySerialized {
    signatureFunction: any = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.signatureFunction = Ar.readObject()
    }
}

export class FEnumProperty extends FPropertySerialized {
    underlyingProp: FNumericProperty = null
    enum: FPackageIndex = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.enum = new FPackageIndex(Ar)
        this.underlyingProp = serializeSingleField(Ar) as FNumericProperty
    }
}

export class FFloatProperty extends FNumericProperty {
}

export class FInt16Property extends FNumericProperty {
}

export class FInt64Property extends FNumericProperty {
}

export class FInt8Property extends FNumericProperty {
}

export class FIntProperty extends FNumericProperty {
}

export class FInterfaceProperty extends FPropertySerialized {
    interfaceClass: any = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.interfaceClass = Ar.readObject()
    }
}

export class FMapProperty extends FPropertySerialized {
    keyProp: FPropertySerialized = null
    valueProp: FPropertySerialized = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.keyProp = serializeSingleField(Ar) as FPropertySerialized
        this.valueProp = serializeSingleField(Ar) as FPropertySerialized
    }
}

export class FMulticastDelegateProperty extends FPropertySerialized {
    signatureFunction: any = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.signatureFunction = Ar.readObject()
    }
}

export class FMulticastInlineDelegateProperty extends FPropertySerialized {
    signatureFunction: any = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.signatureFunction = Ar.readObject()
    }
}

export class FNameProperty extends FPropertySerialized {
}

export class FSoftClassProperty extends FObjectProperty {
    metaClass: any = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.metaClass = Ar.readObject()
    }
}

export class FSoftObjectProperty extends FObjectProperty {
}

export class FSetProperty extends FPropertySerialized {
    elementProp: FPropertySerialized = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.elementProp = serializeSingleField(Ar) as FPropertySerialized
    }
}

export class FStrProperty extends FPropertySerialized {
}

export class FStructProperty extends FPropertySerialized {
    struct: any = null

    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.struct = Ar.readObject()
    }
}

export class FTextProperty extends FPropertySerialized {
}

export class FUInt16Property extends FNumericProperty {
}

export class FUInt32Property extends FNumericProperty {
}

export class FUInt64Property extends FNumericProperty {
}

export function serializeSingleField(Ar: FAssetArchive): FField {
    const propertyTypeName = Ar.readFName()
    if (propertyTypeName !== FName.NAME_None) {
        const field = FField.construct(propertyTypeName)
        if (!field)
            throw ParserException(`Unsupported serialized property type ${propertyTypeName}`)
        field.deserialize(Ar)
        return field
    } else {
        return null
    }
}