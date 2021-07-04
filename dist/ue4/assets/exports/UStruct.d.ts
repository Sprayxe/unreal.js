import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FName } from "../../objects/uobject/FName";
import { FAssetArchive } from "../reader/FAssetArchive";
import { UObject } from "./UObject";
import { PropertyInfo } from "../objects/PropertyInfo";
import { Lazy } from "../../../util/Lazy";
/**
 * Represent an UE4 Struct
 * @extends {UObject}
 */
export declare class UStruct extends UObject {
    /**
     * Super struct of struct
     * @type {Lazy<UStruct>}
     * @public
     */
    superStruct: Lazy<UStruct>;
    /**
     * Children of struct
     * @type {Array<FPackageIndex>}
     * @publics
     */
    children: FPackageIndex[];
    /**
     * Properties of struct
     * @type {Array<FField>}
     * @publics
     */
    childProperties: FField[];
    /**
     * 2nd properties of struct
     * @type {Array<FField>}
     * @publics
     */
    childProperties2: PropertyInfo[];
    /**
     * Amount of properties
     * @type {number}
     * @public
     */
    propertyCount: number;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
    /**
     * Deserializes properties
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @protected
     */
    protected deserializeProperties(Ar: FAssetArchive): void;
}
/**
 * FField
 */
export declare class FField {
    /**
     * Type of field
     * @type {FName}
     * @public
     */
    name: FName;
    /**
     * Flags of fields
     * @type {number}
     * @public
     */
    flags: number;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
    /**
     * Constructs a property
     * @param {FName} fieldTypeName Type of field
     * @returns {FPropertySerialized} Serialized property
     * @public
     * @static
     */
    static construct(fieldTypeName: FName): FPropertySerialized;
}
/**
 * FPropertySerialized
 * @extends {FField}
 */
export declare class FPropertySerialized extends FField {
    /**
     * arrayDim
     * @type {number}
     * @public
     */
    arrayDim: number;
    /**
     * elementSize
     * @type {number}
     * @public
     */
    elementSize: number;
    /**
     * saveFlags
     * @type {number}
     * @public
     */
    saveFlags: number;
    /**
     * repIndex
     * @type {number}
     * @public
     */
    repIndex: number;
    /**
     * repNotifyFunc
     * @type {FName}
     * @public
     */
    repNotifyFunc: FName;
    /**
     * blueprintReplicationCondition
     * @type {number}
     * @public
     */
    blueprintReplicationCondition: number;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FBoolProperty
 * @extends {FPropertySerialized}
 */
export declare class FBoolProperty extends FPropertySerialized {
    /**
     * fieldSize
     * @type {number}
     * @public
     */
    fieldSize: number;
    /**
     * byteOffset
     * @type {number}
     * @public
     */
    byteOffset: number;
    /**
     * byteMask
     * @type {number}
     * @public
     */
    byteMask: number;
    /**
     * fieldMask
     * @type {number}
     * @public
     */
    fieldMask: number;
    /**
     * boolSize
     * @type {number}
     * @public
     */
    boolSize: number;
    /**
     * nativeBool
     * @type {number}
     * @public
     */
    nativeBool: number;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FNumericProperty
 * @extends {FPropertySerialized}
 */
export declare class FNumericProperty extends FPropertySerialized {
}
/**
 * FObjectProperty
 * @extends {FPropertySerialized}
 */
export declare class FObjectProperty extends FPropertySerialized {
    /**
     * propertyClass
     * @type {any}
     * @public
     */
    propertyClass: any;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FArrayProperty
 * @extends {FPropertySerialized}
 */
export declare class FArrayProperty extends FPropertySerialized {
    /**
     * inner
     * @type {?FPropertySerialized}
     * @public
     */
    inner?: FPropertySerialized;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FByteProperty
 * @extends {FNumericProperty}
 */
export declare class FByteProperty extends FNumericProperty {
    /**
     * enum
     * @type {FPackageIndex}
     * @public
     */
    enum: FPackageIndex;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FClassProperty
 * @extends {FObjectProperty}
 */
export declare class FClassProperty extends FObjectProperty {
    /**
     * metaClass
     * @type {any}
     * @public
     */
    metaClass: any;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FDelegateProperty
 * @extends {FPropertySerialized}
 */
export declare class FDelegateProperty extends FPropertySerialized {
    /**
     * signatureFunction
     * @type {any}
     * @public
     */
    signatureFunction: any;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FEnumProperty
 * @extends {FPropertySerialized}
 */
export declare class FEnumProperty extends FPropertySerialized {
    /**
     * underlyingProp
     * @type {FNumericProperty}
     * @public
     */
    underlyingProp: FNumericProperty;
    /**
     * enum
     * @type {FPackageIndex}
     * @public
     */
    enum: FPackageIndex;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FFloatProperty
 * @extends {FNumericProperty}
 */
export declare class FFloatProperty extends FNumericProperty {
}
/**
 * FInt16Property
 * @extends {FNumericProperty}
 */
export declare class FInt16Property extends FNumericProperty {
}
/**
 * FInt64Property
 * @extends {FNumericProperty}
 */
export declare class FInt64Property extends FNumericProperty {
}
/**
 * FInt8Property
 * @extends {FNumericProperty}
 */
export declare class FInt8Property extends FNumericProperty {
}
/**
 * FIntProperty
 * @extends {FNumericProperty}
 */
export declare class FIntProperty extends FNumericProperty {
}
/**
 * FInterfaceProperty
 * @extends {FPropertySerialized}
 */
export declare class FInterfaceProperty extends FPropertySerialized {
    /**
     * interfaceClass
     * @type {any}
     * @public
     */
    interfaceClass: any;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FMapProperty
 * @extends {FPropertySerialized}
 */
export declare class FMapProperty extends FPropertySerialized {
    /**
     * keyProp
     * @type {FPropertySerialized}
     * @public
     */
    keyProp: FPropertySerialized;
    /**
     * valueProp
     * @type {FPropertySerialized}
     * @public
     */
    valueProp: FPropertySerialized;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FMulticastDelegateProperty
 * @extends {FPropertySerialized}
 */
export declare class FMulticastDelegateProperty extends FPropertySerialized {
    /**
     * signatureFunction
     * @type {any}
     * @public
     */
    signatureFunction: any;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FMulticastInlineDelegateProperty
 * @extends {FPropertySerialized}
 */
export declare class FMulticastInlineDelegateProperty extends FPropertySerialized {
    /**
     * signatureFunction
     * @type {any}
     * @public
     */
    signatureFunction: any;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FNameProperty
 * @extends {FPropertySerialized}
 */
export declare class FNameProperty extends FPropertySerialized {
}
/**
 * FSoftClassProperty
 * @extends {FObjectProperty}
 */
export declare class FSoftClassProperty extends FObjectProperty {
    /**
     * metaClass
     * @type {any}
     * @public
     */
    metaClass: any;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FSoftObjectProperty
 * @extends {FObjectProperty}
 */
export declare class FSoftObjectProperty extends FObjectProperty {
}
/**
 * FSetProperty
 * @extends {FPropertySerialized}
 */
export declare class FSetProperty extends FPropertySerialized {
    /**
     * elementProp
     * @type {FPropertySerialized}
     * @public
     */
    elementProp: FPropertySerialized;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FStrProperty
 * @extends {FPropertySerialized}
 */
export declare class FStrProperty extends FPropertySerialized {
}
/**
 * FStructProperty
 * @extends {FPropertySerialized}
 */
export declare class FStructProperty extends FPropertySerialized {
    /**
     * struct
     * @type {FPropertySerialized}
     * @public
     */
    struct: any;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive): void;
}
/**
 * FStructProperty
 * @extends {FPropertySerialized}
 */
export declare class FTextProperty extends FPropertySerialized {
}
/**
 * FUInt16Property
 * @extends {FNumericProperty}
 */
export declare class FUInt16Property extends FNumericProperty {
}
/**
 * FUInt32Property
 * @extends {FNumericProperty}
 */
export declare class FUInt32Property extends FNumericProperty {
}
/**
 * FUInt64Property
 * @extends {FNumericProperty}
 */
export declare class FUInt64Property extends FNumericProperty {
}
/**
 * Serializes a single field
 * @param {FAssetArchive} Ar UE4 Asset Reader to use
 * @returns {FField}
 * @export
 */
export declare function serializeSingleField(Ar: FAssetArchive): FField;
