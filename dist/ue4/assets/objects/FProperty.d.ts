import { UScriptArray } from "./UScriptArray";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FName } from "../../objects/uobject/FName";
import { FFieldPath } from "../../objects/FFieldPath";
import { UInterfaceProperty } from "../../objects/uobject/UInterfaceProperty";
import { FUniqueObjectGuid } from "../../objects/uobject/FUniqueObjectGuid";
import { FAssetArchive } from "../reader/FAssetArchive";
import { PropertyType } from "./PropertyType";
import { UScriptStruct } from "./UScriptStruct";
import { FText } from "../../objects/core/i18n/Text";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { UScriptMap } from "../../objects/uobject/UScriptMap";
import { FMulticastScriptDelegate, FScriptDelegate } from "../../objects/uobject/ScriptDelegates";
import { FSoftClassPath, FSoftObjectPath } from "../../objects/uobject/SoftObjectPath";
import { Locres } from "../../locres/Locres";
/**
 * Represents a property
 */
export declare class FProperty {
    /**
     * Gets the current instance's value
     * @returns {any} Current value
     * @public
     */
    getTagTypeValue(): any;
    /**
     * Sets a value for this instance
     * @param {any} value Value to set
     * @returns {void}
     * @public
     */
    setTagTypeValue(value?: any): void;
    /**
     * Turns this instance's value for json
     * @param {any} arg Used for locres in TextProperty
     * @returns {any}
     * @public
     */
    toJsonValue(arg?: any): any;
    /**
     * Reads a property's value
     * @param {FAssetArchive} Ar FAssetArchive to use
     * @param {PropertyType} typeData The property's type
     * @param {ReadType} type Read type to use
     * @returns {any} The property's value
     * @public
     * @static
     */
    static readPropertyValue(Ar: FAssetArchive, typeData: PropertyType, type: ReadType): BoolProperty | StructProperty | ObjectProperty | WeakObjectProperty | LazyObjectProperty | ClassProperty | InterfaceProperty | FloatProperty | TextProperty | StrProperty | NameProperty | IntProperty | UInt16Property | UInt32Property | UInt64Property | ArrayProperty | SetProperty | MapProperty | ByteProperty | EnumProperty | SoftObjectProperty | SoftClassProperty | DelegateProperty | MulticastDelegateProperty | DoubleProperty | Int8Property | Int16Property | Int64Property | FieldPathProperty;
    /**
     * Serializes a property's value
     * @param {FAssetArchive} Ar FAssetArchive to use
     * @param {FProperty} tag The property
     * @param {ReadType} type Read type to use
     * @returns {void}
     * @public
     * @static
     */
    static writePropertyValue(Ar: FAssetArchiveWriter, tag: FProperty, type: ReadType): void;
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
    static valueOr<T>(valueIfNonZero: () => T, valueIfZero: () => T, type: ReadType): T;
}
/**
 * Represents an array property
 * @extends {FProperty}
 */
export declare class ArrayProperty extends FProperty {
    /**
     * Content
     * @type {UScriptArray}
     * @public
     */
    array: UScriptArray;
    constructor(array: UScriptArray);
    /**
     * Turns this to a json value
     * @returns {Array<any>}
     * @public
     */
    toJsonValue(): any[];
}
/**
 * Represents a bool property
 * @extends {FProperty}
 */
export declare class BoolProperty extends FProperty {
    /**
     * Content
     * @type {boolean}
     * @public
     */
    bool: boolean;
    constructor(bool: boolean);
    /**
     * Turns this to a json value
     * @returns {boolean}
     * @public
     */
    toJsonValue(): boolean;
}
/**
 * Represents a byte property
 * @extends {FProperty}
 */
export declare class ByteProperty extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    byte: number;
    constructor(byte: number);
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number;
}
/**
 * Represents a class property
 * @extends {FProperty}
 */
export declare class ClassProperty extends FProperty {
    /**
     * Content
     * @type {FPackageIndex}
     * @public
     */
    index: FPackageIndex;
    constructor(index: FPackageIndex);
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): string;
}
/**
 * Represents a delegate property
 * @extends {FProperty}
 */
export declare class DelegateProperty extends FProperty {
    /**
     * Content
     * @type {FScriptDelegate}
     * @public
     */
    delegate: FScriptDelegate;
    constructor(delegate: FScriptDelegate);
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any;
}
/**
 * Represents a double property
 * @extends {FProperty}
 */
export declare class DoubleProperty extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number;
    constructor(number: number);
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number;
}
/**
 * Represents an enum property
 * @extends {FProperty}
 */
export declare class EnumProperty extends FProperty {
    /**
     * Content
     * @type {FName}
     * @public
     */
    name: FName;
    /**
     * Enum constant
     * @type {any}
     * @public
     */
    enumConstant: any;
    constructor(name: FName, enumConstant: any);
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): any;
}
/**
 * Represents a field path property
 * @extends {FProperty}
 */
export declare class FieldPathProperty extends FProperty {
    /**
     * Content
     * @type {FFieldPath}
     * @public
     */
    fieldPath: FFieldPath;
    constructor(fieldPath: FFieldPath);
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any;
}
/**
 * Represents a float property
 * @extends {FProperty}
 */
export declare class FloatProperty extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    float: number;
    constructor(float: number);
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number;
}
/**
 * Represents an int16 property
 * @extends {FProperty}
 */
export declare class Int16Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number;
    constructor(number: number);
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number;
}
/**
 * Represents an int64 property
 * @extends {FProperty}
 */
export declare class Int64Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number;
    constructor(number: number);
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number;
}
/**
 * Represents an int8 property
 * @extends {FProperty}
 */
export declare class Int8Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number;
    constructor(number: number);
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number;
}
/**
 * Represents an int(32) property
 * @extends {FProperty}
 */
export declare class IntProperty extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number;
    constructor(number: number);
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number;
}
/**
 * Represents an interface property
 * @extends {FProperty}
 */
export declare class InterfaceProperty extends FProperty {
    /**
     * Content
     * @type {UInterfaceProperty}
     * @public
     */
    interfaceProperty: UInterfaceProperty;
    constructor(interfaceProperty: UInterfaceProperty);
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number;
}
/**
 * Represents a lazy object property
 * @extends {FProperty}
 */
export declare class LazyObjectProperty extends FProperty {
    /**
     * Content
     * @type {FUniqueObjectGuid}
     * @public
     */
    guid: FUniqueObjectGuid;
    constructor(guid: FUniqueObjectGuid);
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): string;
}
/**
 * Represents a map property
 * @extends {FProperty}
 */
export declare class MapProperty extends FProperty {
    /**
     * Content
     * @type {UScriptMap}
     * @public
     */
    map: UScriptMap;
    constructor(map: UScriptMap);
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any;
}
/**
 * Represents a multicast delegate property
 * @extends {FProperty}
 */
export declare class MulticastDelegateProperty extends FProperty {
    /**
     * Content
     * @type {FMulticastScriptDelegate}
     * @public
     */
    delegate: FMulticastScriptDelegate;
    constructor(delegate: FMulticastScriptDelegate);
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): {
        functionName: string;
        object: any;
    }[];
}
/**
 * Represents a name property
 * @extends {FProperty}
 */
export declare class NameProperty extends FProperty {
    /**
     * Content
     * @type {FName}
     * @public
     */
    name: FName;
    constructor(name: FName);
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): string;
}
/**
 * Represents an object property
 * @extends {FProperty}
 */
export declare class ObjectProperty extends FProperty {
    /**
     * Content
     * @type {FPackageIndex}
     * @public
     */
    index: FPackageIndex;
    constructor(index: FPackageIndex);
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): string;
}
/**
 * Represents a set property
 * @extends {FProperty}
 */
export declare class SetProperty extends FProperty {
    /**
     * Content
     * @type {UScriptArray}
     * @public
     */
    array: UScriptArray;
    constructor(array: UScriptArray);
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any;
}
/**
 * Represents a soft class property
 * @extends {FProperty}
 */
export declare class SoftClassProperty extends FProperty {
    /**
     * Content
     * @type {FSoftClassPath}
     * @public
     */
    object: FSoftClassPath;
    constructor(object: FSoftClassPath);
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any;
}
/**
 * Represents a soft object property
 * @extends {FProperty}
 */
export declare class SoftObjectProperty extends FProperty {
    /**
     * Content
     * @type {FSoftObjectPath}
     * @public
     */
    object: FSoftObjectPath;
    constructor(object: FSoftObjectPath);
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(): any;
}
/**
 * Represents a string property
 * @extends {FProperty}
 */
export declare class StrProperty extends FProperty {
    /**
     * Content
     * @type {string}
     * @public
     */
    str: string;
    constructor(str: string);
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): string;
}
/**
 * Represents a struct property
 * @extends {FProperty}
 */
export declare class StructProperty extends FProperty {
    /**
     * Content
     * @type {UScriptStruct}
     * @public
     */
    struct: UScriptStruct;
    constructor(struct: UScriptStruct);
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): any;
}
/**
 * Represents a text property
 * @extends {FProperty}
 */
export declare class TextProperty extends FProperty {
    /**
     * Content
     * @type {FText}
     * @public
     */
    text: FText;
    constructor(text: FText);
    /**
     * Turns this to a json value
     * @returns {any}
     * @public
     */
    toJsonValue(locres?: Locres): any;
}
/**
 * Represents an uint16 property
 * @extends {FProperty}
 */
export declare class UInt16Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number;
    constructor(number: number);
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number;
}
/**
 * Represents an uint32 property
 * @extends {FProperty}
 */
export declare class UInt32Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number;
    constructor(number: number);
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number;
}
/**
 * Represents an uint64 property
 * @extends {FProperty}
 */
export declare class UInt64Property extends FProperty {
    /**
     * Content
     * @type {number}
     * @public
     */
    number: number;
    constructor(number: number);
    /**
     * Turns this to a json value
     * @returns {number}
     * @public
     */
    toJsonValue(): number;
}
/**
 * Represents a weak object property
 * @extends {FProperty}
 */
export declare class WeakObjectProperty extends FProperty {
    /**
     * Content
     * @type {FPackageIndex}
     * @public
     */
    index: FPackageIndex;
    constructor(index: FPackageIndex);
    /**
     * Turns this to a json value
     * @returns {string}
     * @public
     */
    toJsonValue(): string;
}
export declare enum ReadType {
    NORMAL = "NORMAL",
    MAP = "MAP",
    ARRAY = "ARRAY",
    ZERO = "ZERO"
}
