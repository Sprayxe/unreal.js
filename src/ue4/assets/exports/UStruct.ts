import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FName } from "../../objects/uobject/FName";
import { FAssetArchive } from "../reader/FAssetArchive";
import { ParserException } from "../../../exceptions/Exceptions";
import { UObject } from "./UObject";
import { PropertyInfo } from "../objects/PropertyInfo";
import { Lazy } from "../../../util/Lazy";
import { Config } from "../../../Config";

/**
 * Represent an UE4 Struct
 * @extends {UObject}
 */
export class UStruct extends UObject {
    /**
     * Super struct of struct
     * @type {Lazy<UStruct>}
     * @public
     */
    superStruct: Lazy<UStruct> = null

    /**
     * Children of struct
     * @type {Array<FPackageIndex>}
     * @publics
     */
    children: FPackageIndex[] = []

    /**
     * Properties of struct
     * @type {Array<FField>}
     * @publics
     */
    childProperties: FField[] = []

    /**
     * 2nd properties of struct
     * @type {Array<FField>}
     * @publics
     */
    childProperties2: PropertyInfo[] = []

    /**
     * Amount of properties
     * @type {number}
     * @public
     */
    propertyCount = 0

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)
        this.superStruct = Ar.readObject()
        const childrenLen = Ar.readInt32()
        this.children = new Array(childrenLen)
        for (let i = 0; i < childrenLen; ++i) {
            this.children[i] = new FPackageIndex(Ar)
        }
        this.deserializeProperties(Ar)
        // region FStructScriptLoader::FStructScriptLoader
        const bytecodeBufferSize = Ar.readInt32()
        const serializedScriptSize = Ar.readInt32()
        Ar.pos += serializedScriptSize
        if (serializedScriptSize > 0)
            console.info(`Skipped ${serializedScriptSize} bytes of bytecode data`)
        // endregion
    }

    /**
     * Deserializes properties
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @protected
     */
    protected deserializeProperties(Ar: FAssetArchive) {
        const childPropLen = Ar.readInt32()
        this.childProperties = new Array(childPropLen)
        for (let i = 0; i < childPropLen; ++i) {
            const propertyTypeName = Ar.readFName()
            const prop = FField.construct(propertyTypeName)
            if (!prop)
                throw new ParserException(`Unsupported serialized property type ${propertyTypeName}`, Ar)
            prop.deserialize(Ar)
            if (Config.GDebug)
                console.info(`${i} = ${propertyTypeName} ${prop.name}`)
            this.childProperties[i] = prop
        }
    }
}

/**
 * FField
 */
export class FField {
    /**
     * Type of field
     * @type {FName}
     * @public
     */
    name: FName = FName.NAME_None

    /**
     * Flags of fields
     * @type {number}
     * @public
     */
    flags: number = 0

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        this.name = Ar.readFName()
        this.flags = Ar.readUInt32()
    }

    /**
     * Constructs a property
     * @param {FName} fieldTypeName Type of field
     * @returns {FPropertySerialized} Serialized property
     * @public
     * @static
     */
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

/**
 * FPropertySerialized
 * @extends {FField}
 */
export class FPropertySerialized extends FField {
    /**
     * arrayDim
     * @type {number}
     * @public
     */
    arrayDim: number = 1

    /**
     * elementSize
     * @type {number}
     * @public
     */
    elementSize: number = 0

    /**
     * saveFlags
     * @type {number}
     * @public
     */
    saveFlags: number

    /**
     * repIndex
     * @type {number}
     * @public
     */
    repIndex: number = 0

    /**
     * repNotifyFunc
     * @type {FName}
     * @public
     */
    repNotifyFunc: FName = FName.NAME_None

    /**
     * blueprintReplicationCondition
     * @type {number}
     * @public
     */
    blueprintReplicationCondition: number = 0

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.arrayDim = Ar.readInt32()
        this.elementSize = Ar.readInt32()
        this.saveFlags = Number(Ar.readUInt64())
        this.repIndex = Ar.readUInt16()
        this.repNotifyFunc = Ar.readFName()
        this.blueprintReplicationCondition = Ar.readUInt8()
    }
}

/**
 * FBoolProperty
 * @extends {FPropertySerialized}
 */
export class FBoolProperty extends FPropertySerialized {
    /**
     * fieldSize
     * @type {number}
     * @public
     */
    fieldSize: number = 0

    /**
     * byteOffset
     * @type {number}
     * @public
     */
    byteOffset: number = 0

    /**
     * byteMask
     * @type {number}
     * @public
     */
    byteMask: number = 0

    /**
     * fieldMask
     * @type {number}
     * @public
     */
    fieldMask: number = 0

    /**
     * boolSize
     * @type {number}
     * @public
     */
    boolSize: number = 0

    /**
     * nativeBool
     * @type {number}
     * @public
     */
    nativeBool: number = 0

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
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

/**
 * FNumericProperty
 * @extends {FPropertySerialized}
 */
export class FNumericProperty extends FPropertySerialized {
}

/**
 * FObjectProperty
 * @extends {FPropertySerialized}
 */
export class FObjectProperty extends FPropertySerialized {
    /**
     * propertyClass
     * @type {any}
     * @public
     */
    propertyClass: any = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.propertyClass = Ar.readObject()
    }
}

/**
 * FArrayProperty
 * @extends {FPropertySerialized}
 */
export class FArrayProperty extends FPropertySerialized {
    /**
     * inner
     * @type {?FPropertySerialized}
     * @public
     */
    inner?: FPropertySerialized = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.inner = serializeSingleField(Ar) as FPropertySerialized
    }
}

/**
 * FByteProperty
 * @extends {FNumericProperty}
 */
export class FByteProperty extends FNumericProperty {
    /**
     * enum
     * @type {FPackageIndex}
     * @public
     */
    enum: FPackageIndex = new FPackageIndex()

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.enum = new FPackageIndex(Ar)
    }
}

/**
 * FClassProperty
 * @extends {FObjectProperty}
 */
export class FClassProperty extends FObjectProperty {
    /**
     * metaClass
     * @type {any}
     * @public
     */
    metaClass: any = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.metaClass = Ar.readObject()
    }
}

/**
 * FDelegateProperty
 * @extends {FPropertySerialized}
 */
export class FDelegateProperty extends FPropertySerialized {
    /**
     * signatureFunction
     * @type {any}
     * @public
     */
    signatureFunction: any = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.signatureFunction = Ar.readObject()
    }
}

/**
 * FEnumProperty
 * @extends {FPropertySerialized}
 */
export class FEnumProperty extends FPropertySerialized {
    /**
     * underlyingProp
     * @type {FNumericProperty}
     * @public
     */
    underlyingProp: FNumericProperty = null

    /**
     * enum
     * @type {FPackageIndex}
     * @public
     */
    enum: FPackageIndex = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.enum = new FPackageIndex(Ar)
        this.underlyingProp = serializeSingleField(Ar) as FNumericProperty
    }
}

/**
 * FFloatProperty
 * @extends {FNumericProperty}
 */
export class FFloatProperty extends FNumericProperty {
}

/**
 * FInt16Property
 * @extends {FNumericProperty}
 */
export class FInt16Property extends FNumericProperty {
}

/**
 * FInt64Property
 * @extends {FNumericProperty}
 */
export class FInt64Property extends FNumericProperty {
}

/**
 * FInt8Property
 * @extends {FNumericProperty}
 */
export class FInt8Property extends FNumericProperty {
}

/**
 * FIntProperty
 * @extends {FNumericProperty}
 */
export class FIntProperty extends FNumericProperty {
}

/**
 * FInterfaceProperty
 * @extends {FPropertySerialized}
 */
export class FInterfaceProperty extends FPropertySerialized {
    /**
     * interfaceClass
     * @type {any}
     * @public
     */
    interfaceClass: any = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.interfaceClass = Ar.readObject()
    }
}

/**
 * FMapProperty
 * @extends {FPropertySerialized}
 */
export class FMapProperty extends FPropertySerialized {
    /**
     * keyProp
     * @type {FPropertySerialized}
     * @public
     */
    keyProp: FPropertySerialized = null

    /**
     * valueProp
     * @type {FPropertySerialized}
     * @public
     */
    valueProp: FPropertySerialized = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.keyProp = serializeSingleField(Ar) as FPropertySerialized
        this.valueProp = serializeSingleField(Ar) as FPropertySerialized
    }
}

/**
 * FMulticastDelegateProperty
 * @extends {FPropertySerialized}
 */
export class FMulticastDelegateProperty extends FPropertySerialized {
    /**
     * signatureFunction
     * @type {any}
     * @public
     */
    signatureFunction: any = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.signatureFunction = Ar.readObject()
    }
}

/**
 * FMulticastInlineDelegateProperty
 * @extends {FPropertySerialized}
 */
export class FMulticastInlineDelegateProperty extends FPropertySerialized {
    /**
     * signatureFunction
     * @type {any}
     * @public
     */
    signatureFunction: any = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.signatureFunction = Ar.readObject()
    }
}

/**
 * FNameProperty
 * @extends {FPropertySerialized}
 */
export class FNameProperty extends FPropertySerialized {
}

/**
 * FSoftClassProperty
 * @extends {FObjectProperty}
 */
export class FSoftClassProperty extends FObjectProperty {
    /**
     * metaClass
     * @type {any}
     * @public
     */
    metaClass: any = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.metaClass = Ar.readObject()
    }
}

/**
 * FSoftObjectProperty
 * @extends {FObjectProperty}
 */
export class FSoftObjectProperty extends FObjectProperty {
}

/**
 * FSetProperty
 * @extends {FPropertySerialized}
 */
export class FSetProperty extends FPropertySerialized {
    /**
     * elementProp
     * @type {FPropertySerialized}
     * @public
     */
    elementProp: FPropertySerialized = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.elementProp = serializeSingleField(Ar) as FPropertySerialized
    }
}

/**
 * FStrProperty
 * @extends {FPropertySerialized}
 */
export class FStrProperty extends FPropertySerialized {
}

/**
 * FStructProperty
 * @extends {FPropertySerialized}
 */
export class FStructProperty extends FPropertySerialized {
    /**
     * struct
     * @type {FPropertySerialized}
     * @public
     */
    struct: any = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive) {
        super.deserialize(Ar)
        this.struct = Ar.readObject()
    }
}

/**
 * FStructProperty
 * @extends {FPropertySerialized}
 */
export class FTextProperty extends FPropertySerialized {
}

/**
 * FUInt16Property
 * @extends {FNumericProperty}
 */
export class FUInt16Property extends FNumericProperty {
}

/**
 * FUInt32Property
 * @extends {FNumericProperty}
 */
export class FUInt32Property extends FNumericProperty {
}

/**
 * FUInt64Property
 * @extends {FNumericProperty}
 */
export class FUInt64Property extends FNumericProperty {
}

/**
 * Serializes a single field
 * @param {FAssetArchive} Ar UE4 Asset Reader to use
 * @returns {FField}
 * @export
 */
export function serializeSingleField(Ar: FAssetArchive): FField {
    const propertyTypeName = Ar.readFName()
    if (propertyTypeName !== FName.NAME_None) {
        const field = FField.construct(propertyTypeName)
        if (!field)
            throw new ParserException(`Unsupported serialized property type ${propertyTypeName}`, Ar)
        field.deserialize(Ar)
        return field
    } else {
        return null
    }
}