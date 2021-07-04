"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeSingleField = exports.FUInt64Property = exports.FUInt32Property = exports.FUInt16Property = exports.FTextProperty = exports.FStructProperty = exports.FStrProperty = exports.FSetProperty = exports.FSoftObjectProperty = exports.FSoftClassProperty = exports.FNameProperty = exports.FMulticastInlineDelegateProperty = exports.FMulticastDelegateProperty = exports.FMapProperty = exports.FInterfaceProperty = exports.FIntProperty = exports.FInt8Property = exports.FInt64Property = exports.FInt16Property = exports.FFloatProperty = exports.FEnumProperty = exports.FDelegateProperty = exports.FClassProperty = exports.FByteProperty = exports.FArrayProperty = exports.FObjectProperty = exports.FNumericProperty = exports.FBoolProperty = exports.FPropertySerialized = exports.FField = exports.UStruct = void 0;
const ObjectResource_1 = require("../../objects/uobject/ObjectResource");
const FName_1 = require("../../objects/uobject/FName");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const UObject_1 = require("./UObject");
const Config_1 = require("../../../Config");
/**
 * Represent an UE4 Struct
 * @extends {UObject}
 */
class UStruct extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * Super struct of struct
         * @type {Lazy<UStruct>}
         * @public
         */
        this.superStruct = null;
        /**
         * Children of struct
         * @type {Array<FPackageIndex>}
         * @publics
         */
        this.children = [];
        /**
         * Properties of struct
         * @type {Array<FField>}
         * @publics
         */
        this.childProperties = [];
        /**
         * 2nd properties of struct
         * @type {Array<FField>}
         * @publics
         */
        this.childProperties2 = [];
        /**
         * Amount of properties
         * @type {number}
         * @public
         */
        this.propertyCount = 0;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar, validPos) {
        super.deserialize(Ar, validPos);
        this.superStruct = Ar.readObject();
        this.children = Ar.readArray(() => new ObjectResource_1.FPackageIndex(Ar));
        this.deserializeProperties(Ar);
        // region FStructScriptLoader::FStructScriptLoader
        const bytecodeBufferSize = Ar.readInt32();
        const serializedScriptSize = Ar.readInt32();
        Ar.pos += serializedScriptSize;
        if (serializedScriptSize > 0)
            console.info(`Skipped ${serializedScriptSize} bytes of bytecode data`);
        // endregion
    }
    /**
     * Deserializes properties
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @protected
     */
    deserializeProperties(Ar) {
        this.childProperties = Ar.readArray((it) => {
            const propertyTypeName = Ar.readFName();
            const prop = FField.construct(propertyTypeName);
            if (!prop)
                throw new Exceptions_1.ParserException(`Unsupported serialized property type ${propertyTypeName}`, Ar);
            prop.deserialize(Ar);
            if (Config_1.Config.GDebugProperties)
                console.info(`${it} = ${propertyTypeName} ${prop.name}`);
            return prop;
        });
    }
}
exports.UStruct = UStruct;
/**
 * FField
 */
class FField {
    constructor() {
        /**
         * Type of field
         * @type {FName}
         * @public
         */
        this.name = FName_1.FName.NAME_None;
        /**
         * Flags of fields
         * @type {number}
         * @public
         */
        this.flags = 0;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        this.name = Ar.readFName();
        this.flags = Ar.readUInt32();
    }
    /**
     * Constructs a property
     * @param {FName} fieldTypeName Type of field
     * @returns {FPropertySerialized} Serialized property
     * @public
     * @static
     */
    static construct(fieldTypeName) {
        switch (fieldTypeName.text) {
            case "ArrayProperty": {
                return new FArrayProperty();
            }
            case "BoolProperty": {
                return new FBoolProperty();
            }
            case "ByteProperty": {
                return new FByteProperty();
            }
            case "ClassProperty": {
                return new FClassProperty();
            }
            case "DelegateProperty": {
                return new FDelegateProperty();
            }
            case "EnumProperty": {
                return new FEnumProperty();
            }
            case "FloatProperty": {
                return new FFloatProperty();
            }
            case "Int16Property": {
                return new FInt16Property();
            }
            case "Int64Property": {
                return new FInt64Property();
            }
            case "Int8Property": {
                return new FInt8Property();
            }
            case "IntProperty": {
                return new FIntProperty();
            }
            case "InterfaceProperty": {
                return new FInterfaceProperty();
            }
            case "MapProperty": {
                return new FMapProperty();
            }
            case "MulticastDelegateProperty": {
                return new FMulticastDelegateProperty();
            }
            case "MulticastInlineDelegateProperty": {
                return new FMulticastInlineDelegateProperty();
            }
            case "NameProperty": {
                return new FNameProperty();
            }
            case "ObjectProperty": {
                return new FObjectProperty();
            }
            case "SetProperty": {
                return new FSetProperty();
            }
            case "SoftClassProperty": {
                return new FSoftClassProperty();
            }
            case "SoftObjectProperty": {
                return new FSoftObjectProperty();
            }
            case "StrProperty": {
                return new FStrProperty();
            }
            case "StructProperty": {
                return new FStructProperty();
            }
            case "TextProperty": {
                return new FTextProperty();
            }
            case "UInt16Property": {
                return new FUInt16Property();
            }
            case "UInt32Property": {
                return new FUInt32Property();
            }
            case "UInt64Property": {
                return new FUInt64Property();
            }
            default: {
                return null;
            }
        }
    }
}
exports.FField = FField;
/**
 * FPropertySerialized
 * @extends {FField}
 */
class FPropertySerialized extends FField {
    constructor() {
        super(...arguments);
        /**
         * arrayDim
         * @type {number}
         * @public
         */
        this.arrayDim = 1;
        /**
         * elementSize
         * @type {number}
         * @public
         */
        this.elementSize = 0;
        /**
         * repIndex
         * @type {number}
         * @public
         */
        this.repIndex = 0;
        /**
         * repNotifyFunc
         * @type {FName}
         * @public
         */
        this.repNotifyFunc = FName_1.FName.NAME_None;
        /**
         * blueprintReplicationCondition
         * @type {number}
         * @public
         */
        this.blueprintReplicationCondition = 0;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.arrayDim = Ar.readInt32();
        this.elementSize = Ar.readInt32();
        this.saveFlags = Number(Ar.readUInt64());
        this.repIndex = Ar.readUInt16();
        this.repNotifyFunc = Ar.readFName();
        this.blueprintReplicationCondition = Ar.readUInt8();
    }
}
exports.FPropertySerialized = FPropertySerialized;
/**
 * FBoolProperty
 * @extends {FPropertySerialized}
 */
class FBoolProperty extends FPropertySerialized {
    constructor() {
        super(...arguments);
        /**
         * fieldSize
         * @type {number}
         * @public
         */
        this.fieldSize = 0;
        /**
         * byteOffset
         * @type {number}
         * @public
         */
        this.byteOffset = 0;
        /**
         * byteMask
         * @type {number}
         * @public
         */
        this.byteMask = 0;
        /**
         * fieldMask
         * @type {number}
         * @public
         */
        this.fieldMask = 0;
        /**
         * boolSize
         * @type {number}
         * @public
         */
        this.boolSize = 0;
        /**
         * nativeBool
         * @type {number}
         * @public
         */
        this.nativeBool = 0;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.fieldSize = Ar.readUInt8();
        this.byteOffset = Ar.readUInt8();
        this.byteMask = Ar.readUInt8();
        this.fieldMask = Ar.readUInt8();
        this.boolSize = Ar.readUInt8();
        this.nativeBool = Ar.readUInt8();
    }
}
exports.FBoolProperty = FBoolProperty;
/**
 * FNumericProperty
 * @extends {FPropertySerialized}
 */
class FNumericProperty extends FPropertySerialized {
}
exports.FNumericProperty = FNumericProperty;
/**
 * FObjectProperty
 * @extends {FPropertySerialized}
 */
class FObjectProperty extends FPropertySerialized {
    constructor() {
        super(...arguments);
        /**
         * propertyClass
         * @type {any}
         * @public
         */
        this.propertyClass = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.propertyClass = Ar.readObject();
    }
}
exports.FObjectProperty = FObjectProperty;
/**
 * FArrayProperty
 * @extends {FPropertySerialized}
 */
class FArrayProperty extends FPropertySerialized {
    constructor() {
        super(...arguments);
        /**
         * inner
         * @type {?FPropertySerialized}
         * @public
         */
        this.inner = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.inner = serializeSingleField(Ar);
    }
}
exports.FArrayProperty = FArrayProperty;
/**
 * FByteProperty
 * @extends {FNumericProperty}
 */
class FByteProperty extends FNumericProperty {
    constructor() {
        super(...arguments);
        /**
         * enum
         * @type {FPackageIndex}
         * @public
         */
        this.enum = new ObjectResource_1.FPackageIndex();
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.enum = new ObjectResource_1.FPackageIndex(Ar);
    }
}
exports.FByteProperty = FByteProperty;
/**
 * FClassProperty
 * @extends {FObjectProperty}
 */
class FClassProperty extends FObjectProperty {
    constructor() {
        super(...arguments);
        /**
         * metaClass
         * @type {any}
         * @public
         */
        this.metaClass = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.metaClass = Ar.readObject();
    }
}
exports.FClassProperty = FClassProperty;
/**
 * FDelegateProperty
 * @extends {FPropertySerialized}
 */
class FDelegateProperty extends FPropertySerialized {
    constructor() {
        super(...arguments);
        /**
         * signatureFunction
         * @type {any}
         * @public
         */
        this.signatureFunction = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.signatureFunction = Ar.readObject();
    }
}
exports.FDelegateProperty = FDelegateProperty;
/**
 * FEnumProperty
 * @extends {FPropertySerialized}
 */
class FEnumProperty extends FPropertySerialized {
    constructor() {
        super(...arguments);
        /**
         * underlyingProp
         * @type {FNumericProperty}
         * @public
         */
        this.underlyingProp = null;
        /**
         * enum
         * @type {FPackageIndex}
         * @public
         */
        this.enum = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.enum = new ObjectResource_1.FPackageIndex(Ar);
        this.underlyingProp = serializeSingleField(Ar);
    }
}
exports.FEnumProperty = FEnumProperty;
/**
 * FFloatProperty
 * @extends {FNumericProperty}
 */
class FFloatProperty extends FNumericProperty {
}
exports.FFloatProperty = FFloatProperty;
/**
 * FInt16Property
 * @extends {FNumericProperty}
 */
class FInt16Property extends FNumericProperty {
}
exports.FInt16Property = FInt16Property;
/**
 * FInt64Property
 * @extends {FNumericProperty}
 */
class FInt64Property extends FNumericProperty {
}
exports.FInt64Property = FInt64Property;
/**
 * FInt8Property
 * @extends {FNumericProperty}
 */
class FInt8Property extends FNumericProperty {
}
exports.FInt8Property = FInt8Property;
/**
 * FIntProperty
 * @extends {FNumericProperty}
 */
class FIntProperty extends FNumericProperty {
}
exports.FIntProperty = FIntProperty;
/**
 * FInterfaceProperty
 * @extends {FPropertySerialized}
 */
class FInterfaceProperty extends FPropertySerialized {
    constructor() {
        super(...arguments);
        /**
         * interfaceClass
         * @type {any}
         * @public
         */
        this.interfaceClass = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.interfaceClass = Ar.readObject();
    }
}
exports.FInterfaceProperty = FInterfaceProperty;
/**
 * FMapProperty
 * @extends {FPropertySerialized}
 */
class FMapProperty extends FPropertySerialized {
    constructor() {
        super(...arguments);
        /**
         * keyProp
         * @type {FPropertySerialized}
         * @public
         */
        this.keyProp = null;
        /**
         * valueProp
         * @type {FPropertySerialized}
         * @public
         */
        this.valueProp = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.keyProp = serializeSingleField(Ar);
        this.valueProp = serializeSingleField(Ar);
    }
}
exports.FMapProperty = FMapProperty;
/**
 * FMulticastDelegateProperty
 * @extends {FPropertySerialized}
 */
class FMulticastDelegateProperty extends FPropertySerialized {
    constructor() {
        super(...arguments);
        /**
         * signatureFunction
         * @type {any}
         * @public
         */
        this.signatureFunction = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.signatureFunction = Ar.readObject();
    }
}
exports.FMulticastDelegateProperty = FMulticastDelegateProperty;
/**
 * FMulticastInlineDelegateProperty
 * @extends {FPropertySerialized}
 */
class FMulticastInlineDelegateProperty extends FPropertySerialized {
    constructor() {
        super(...arguments);
        /**
         * signatureFunction
         * @type {any}
         * @public
         */
        this.signatureFunction = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.signatureFunction = Ar.readObject();
    }
}
exports.FMulticastInlineDelegateProperty = FMulticastInlineDelegateProperty;
/**
 * FNameProperty
 * @extends {FPropertySerialized}
 */
class FNameProperty extends FPropertySerialized {
}
exports.FNameProperty = FNameProperty;
/**
 * FSoftClassProperty
 * @extends {FObjectProperty}
 */
class FSoftClassProperty extends FObjectProperty {
    constructor() {
        super(...arguments);
        /**
         * metaClass
         * @type {any}
         * @public
         */
        this.metaClass = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.metaClass = Ar.readObject();
    }
}
exports.FSoftClassProperty = FSoftClassProperty;
/**
 * FSoftObjectProperty
 * @extends {FObjectProperty}
 */
class FSoftObjectProperty extends FObjectProperty {
}
exports.FSoftObjectProperty = FSoftObjectProperty;
/**
 * FSetProperty
 * @extends {FPropertySerialized}
 */
class FSetProperty extends FPropertySerialized {
    constructor() {
        super(...arguments);
        /**
         * elementProp
         * @type {FPropertySerialized}
         * @public
         */
        this.elementProp = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.elementProp = serializeSingleField(Ar);
    }
}
exports.FSetProperty = FSetProperty;
/**
 * FStrProperty
 * @extends {FPropertySerialized}
 */
class FStrProperty extends FPropertySerialized {
}
exports.FStrProperty = FStrProperty;
/**
 * FStructProperty
 * @extends {FPropertySerialized}
 */
class FStructProperty extends FPropertySerialized {
    constructor() {
        super(...arguments);
        /**
         * struct
         * @type {FPropertySerialized}
         * @public
         */
        this.struct = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @returns {void}
     * @public
     */
    deserialize(Ar) {
        super.deserialize(Ar);
        this.struct = Ar.readObject();
    }
}
exports.FStructProperty = FStructProperty;
/**
 * FStructProperty
 * @extends {FPropertySerialized}
 */
class FTextProperty extends FPropertySerialized {
}
exports.FTextProperty = FTextProperty;
/**
 * FUInt16Property
 * @extends {FNumericProperty}
 */
class FUInt16Property extends FNumericProperty {
}
exports.FUInt16Property = FUInt16Property;
/**
 * FUInt32Property
 * @extends {FNumericProperty}
 */
class FUInt32Property extends FNumericProperty {
}
exports.FUInt32Property = FUInt32Property;
/**
 * FUInt64Property
 * @extends {FNumericProperty}
 */
class FUInt64Property extends FNumericProperty {
}
exports.FUInt64Property = FUInt64Property;
/**
 * Serializes a single field
 * @param {FAssetArchive} Ar UE4 Asset Reader to use
 * @returns {FField}
 * @export
 */
function serializeSingleField(Ar) {
    const propertyTypeName = Ar.readFName();
    if (propertyTypeName !== FName_1.FName.NAME_None) {
        const field = FField.construct(propertyTypeName);
        if (!field)
            throw new Exceptions_1.ParserException(`Unsupported serialized property type ${propertyTypeName}`, Ar);
        field.deserialize(Ar);
        return field;
    }
    else {
        return null;
    }
}
exports.serializeSingleField = serializeSingleField;
