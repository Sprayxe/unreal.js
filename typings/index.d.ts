declare module 'Config' {
	export class Config implements IConfig {
	    static GExportArchiveCheckDummyName: boolean;
	    static GDebugProperties: boolean;
	    static GFatalUnknownProperty: boolean;
	    static GSuppressMissingSchemaErrors: boolean;
	}
	export interface IConfig {
	    /**
	     * Wether to check dummy names in export archive
	     * @type {boolean}
	     * @default false
	     */
	    GExportArchiveCheckDummyName?: boolean;
	    /**
	     * Wether to debug properties
	     * @type {boolean}
	     * @default false
	     */
	    GDebugProperties?: boolean;
	    /**
	     * Wether it is fatal if a property couldn't be deserialized
	     * @type {boolean}
	     * @default false
	     */
	    GFatalUnknownProperty?: boolean;
	    /**
	     * Wether to supress missing schema errors
	     * @type {boolean}
	     * @default false
	     */
	    GSuppressMissingSchemaErrors?: boolean;
	}

}
declare module 'Types' {
	export type int32 = number;
	export type uint8 = number;
	export type uint16 = number;
	export type uint32 = number;
	export type uint64 = bigint;

}
declare module 'ue4/versions/Versions' {
	export const VER_UE4_ASSET_REGISTRY_TAGS = 112;
	export const VER_UE4_TEXTURE_DERIVED_DATA2 = 124;
	export const VER_UE4_ADD_COOKED_TO_TEXTURE2D = 125;
	export const VER_UE4_REMOVED_STRIP_DATA = 130;
	export const VER_UE4_REMOVE_EXTRA_SKELMESH_VERTEX_INFLUENCES = 134;
	export const VER_UE4_TEXTURE_SOURCE_ART_REFACTOR = 143;
	export const VER_UE4_ADD_SKELMESH_MESHTOIMPORTVERTEXMAP = 152;
	export const VER_UE4_REMOVE_ARCHETYPE_INDEX_FROM_LINKER_TABLES = 163;
	export const VER_UE4_REMOVE_NET_INDEX = 196;
	export const VER_UE4_BULKDATA_AT_LARGE_OFFSETS = 198;
	export const VER_UE4_SUMMARY_HAS_BULKDATA_OFFSET = 212;
	export const VER_UE4_STATIC_MESH_STORE_NAV_COLLISION = 216;
	export const VER_UE4_DEPRECATED_STATIC_MESH_THUMBNAIL_PROPERTIES_REMOVED = 242;
	export const VER_UE4_APEX_CLOTH = 254;
	export const VER_UE4_STATIC_SKELETAL_MESH_SERIALIZATION_FIX = 269;
	export const VER_UE4_SUPPORT_32BIT_STATIC_MESH_INDICES = 277;
	export const VER_UE4_APEX_CLOTH_LOD = 280;
	export const VER_UE4_ARRAY_PROPERTY_INNER_TAGS = 282;
	export const VER_UE4_KEEP_SKEL_MESH_INDEX_DATA = 283;
	export const VER_UE4_MOVE_SKELETALMESH_SHADOWCASTING = 302;
	export const VER_UE4_REFERENCE_SKELETON_REFACTOR = 310;
	export const VER_UE4_FIXUP_ROOTBONE_PARENT = 312;
	export const VER_UE4_FIX_ANIMATIONBASEPOSE_SERIALIZATION = 331;
	export const VER_UE4_SUPPORT_8_BONE_INFLUENCES_SKELETAL_MESHES = 332;
	export const VER_UE4_SUPPORT_GPUSKINNING_8_BONE_INFLUENCES = 334;
	export const VER_UE4_ANIM_SUPPORT_NONUNIFORM_SCALE_ANIMATION = 335;
	export const VER_UE4_ENGINE_VERSION_OBJECT = 336;
	export const VER_UE4_SKELETON_GUID_SERIALIZATION = 338;
	export const VER_UE4_0 = 342;
	export const VER_UE4_MORPHTARGET_CPU_TANGENTZDELTA_FORMATCHANGE = 348;
	export const VER_UE4_1 = 352;
	export const VER_UE4_2 = 363;
	export const VER_UE4_LOAD_FOR_EDITOR_GAME = 365;
	export const VER_UE4_FTEXT_HISTORY = 368;
	export const VER_UE4_STORE_BONE_EXPORT_NAMES = 370;
	export const VER_UE4_3 = 382;
	export const VER_UE4_ADD_STRING_ASSET_REFERENCES_MAP = 384;
	export const VER_UE4_4 = 385;
	export const VER_UE4_SKELETON_ADD_SMARTNAMES = 388;
	export const VER_UE4_SOUND_COMPRESSION_TYPE_ADDED = 392;
	export const VER_UE4_RENAME_CROUCHMOVESCHARACTERDOWN = 394;
	export const VER_UE4_DEPRECATE_UMG_STYLE_ASSETS = 397;
	export const VER_UE4_5 = 401;
	export const VER_UE4_6 = 413;
	export const VER_UE4_RENAME_WIDGET_VISIBILITY = 416;
	export const VER_UE4_ANIMATION_ADD_TRACKCURVES = 417;
	export const VER_UE4_7 = 434;
	export const VER_UE4_STRUCT_GUID_IN_PROPERTY_TAG = 441;
	export const VER_UE4_PACKAGE_SUMMARY_HAS_COMPATIBLE_ENGINE_VERSION = 444;
	export const VER_UE4_8 = 451;
	export const VER_UE4_SERIALIZE_TEXT_IN_PACKAGES = 459;
	export const VER_UE4_NEW_LIGHTMASS_PRIMITIVE_SETTING = 461;
	export const VER_UE4_9 = 482;
	export const VER_UE4_10 = 482;
	export const VER_UE4_COOKED_ASSETS_IN_EDITOR_SUPPORT = 485;
	export const VER_UE4_SOUND_CONCURRENCY_PACKAGE = 489;
	export const VER_UE4_11 = 498;
	export const VER_UE4_INNER_ARRAY_TAG_INFO = 500;
	export const VER_UE4_PROPERTY_GUID_IN_PROPERTY_TAG = 503;
	export const VER_UE4_NAME_HASHES_SERIALIZED = 504;
	export const VER_UE4_12 = 504;
	export const VER_UE4_13 = 505;
	export const VER_UE4_PRELOAD_DEPENDENCIES_IN_COOKED_EXPORTS = 507;
	export const VER_UE4_TemplateIndex_IN_COOKED_EXPORTS = 508;
	export const VER_UE4_14 = 508;
	export const VER_UE4_PROPERTY_TAG_SET_MAP_SUPPORT = 509;
	export const VER_UE4_ADDED_SEARCHABLE_NAMES = 510;
	export const VER_UE4_15 = 510;
	export const VER_UE4_64BIT_EXPORTMAP_SERIALSIZES = 511;
	export const VER_UE4_16 = 513;
	export const VER_UE4_17 = 513;
	export const VER_UE4_ADDED_SOFT_OBJECT_PATH = 514;
	export const VER_UE4_18 = 514;
	export const VER_UE4_ADDED_PACKAGE_SUMMARY_LOCALIZATION_ID = 516;
	export const VER_UE4_19 = 516;
	export const VER_UE4_20 = 516;
	export const VER_UE4_21 = 517;
	export const VER_UE4_22 = 517;
	export const VER_UE4_23 = 517;
	export const VER_UE4_ADDED_PACKAGE_OWNER = 518;
	export const VER_UE4_24 = 518;
	export const VER_UE4_25 = 518;
	export const VER_UE4_SKINWEIGHT_PROFILE_DATA_LAYOUT_CHANGES = 519;
	export const VER_UE4_26 = 519;
	export const VER_UE4_NON_OUTER_PACKAGE_IMPORT = 520;
	export const VER_UE4_ASSETREGISTRY_DEPENDENCYFLAGS = 521;
	export const VER_UE4_CORRECT_LICENSEE_FLAG = 522;
	export const VER_UE4_27 = 523;

}
declare module 'ue4/versions/Game' {
	export class Game {
	    static ue4Versions: number[];
	    static GAME_UE4_BASE: number;
	    static LATEST_SUPPORTED_UE4_VERSION: number;
	    static GAME_VALORANT: number;
	    static GAME_UE4(x: number): number;
	    static GAME_UE4_GET_MINOR(x: number): number;
	    static GAME_UE4_GET_AR_VER(game: number): number;
	}
	export class Ue4Version {
	    version: number;
	    game: number;
	    constructor(game: number);
	    static GAME_UE4_0: Ue4Version;
	    static GAME_UE4_1: Ue4Version;
	    static GAME_UE4_2: Ue4Version;
	    static GAME_UE4_3: Ue4Version;
	    static GAME_UE4_4: Ue4Version;
	    static GAME_UE4_5: Ue4Version;
	    static GAME_UE4_6: Ue4Version;
	    static GAME_UE4_7: Ue4Version;
	    static GAME_UE4_8: Ue4Version;
	    static GAME_UE4_9: Ue4Version;
	    static GAME_UE4_10: Ue4Version;
	    static GAME_UE4_11: Ue4Version;
	    static GAME_UE4_12: Ue4Version;
	    static GAME_UE4_13: Ue4Version;
	    static GAME_UE4_14: Ue4Version;
	    static GAME_UE4_15: Ue4Version;
	    static GAME_UE4_16: Ue4Version;
	    static GAME_UE4_17: Ue4Version;
	    static GAME_UE4_18: Ue4Version;
	    static GAME_UE4_19: Ue4Version;
	    static GAME_UE4_20: Ue4Version;
	    static GAME_UE4_21: Ue4Version;
	    static GAME_UE4_22: Ue4Version;
	    static GAME_UE4_23: Ue4Version;
	    static GAME_UE4_24: Ue4Version;
	    static GAME_UE4_25: Ue4Version;
	    static GAME_UE4_26: Ue4Version;
	    static GAME_UE4_27: Ue4Version;
	    static GAME_VALORANT: Ue4Version;
	    static GAME_UE4_LATEST: Ue4Version;
	}

}
declare module 'ue4/objects/uobject/FName' {
	import { FArchive } from 'ue4/reader/FArchive';
	export class FNameEntry {
	    name: string;
	    nonCasePreservingHash: number;
	    casePreservingHash: number;
	    constructor(Ar: FArchive);
	    constructor(name: string, nonCasePreservingHash: number, casePreservingHash: number);
	    serialize(Ar: any): void;
	    toString(): string;
	}
	export class FName {
	    nameMap: FNameEntry[];
	    index: number;
	    num: number;
	    constructor(nameMap?: any[], index?: number, num?: number);
	    toString(): string;
	    get text(): string;
	    set text(v: string);
	    equals(other: any): boolean;
	    isNone(): boolean;
	    static NAME_None: FName;
	    static dummy(text: string, num?: number): FNameDummy;
	    static getByNameMap(text: string, nameMap: FNameEntry[]): FName;
	    static createFromDisplayId(text: string, num: number): FNameDummy;
	}
	export class FNameDummy extends FName {
	    name: string;
	    num: number;
	    constructor(name: string, num: number);
	    get text(): string;
	    set text(v: string);
	}

}
declare module 'util/UnrealMap' {
	import Collection from '@discordjs/collection';
	export class UnrealMap<K, V> extends Collection<K, V> {
	    get(key: K): V | undefined;
	    delete(key: K): boolean;
	}

}
declare module 'ue4/writer/FArchiveWriter' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FName } from 'ue4/objects/uobject/FName';
	import { UnrealMap } from 'util/UnrealMap';
	export abstract class FArchiveWriter {
	    game: number;
	    ver: number;
	    abstract littleEndian: boolean;
	    abstract pos(): number;
	    abstract write(buffer: Buffer): any;
	    abstract write(b: number): any;
	    abstract printError(): string;
	    writeInt8(i: number): void;
	    writeUInt8(i: number): void;
	    writeInt16(i: number): void;
	    writeUInt16(i: number): void;
	    writeInt32(i: number): void;
	    writeUInt32(i: number): void;
	    writeInt64(i: number): void;
	    writeUInt64(i: number): void;
	    writeFloat32(i: number): void;
	    writeDouble(i: number): void;
	    writeBoolean(i: boolean): void;
	    writeFlag(i: boolean): void;
	    writeString(i: string): void;
	    writeFName(name: FName): void;
	    writeTMapWithoutSize<K, V>(map: UnrealMap<K, V>, write: (key: K, value: V) => void): void;
	    writeTMap<K, V>(map: UnrealMap<K, V>, write: (key: K, value: V) => void): void;
	    writeTArrayWithoutSize<T>(array: T[], write: (it: T) => void): void;
	    writeTArray<T>(array: T[], write: (it: T) => void): void;
	}

}
declare module 'exceptions/Exceptions' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	/**
	 * Creates a parser exception
	 */
	export class ParserException extends Error {
	    /**
	     * Creates an instance
	     * @param {string} message Message to use
	     * @param {FArchive | FArchiveWriter | null} Ar Archive for additional info
	     * @constructor
	     * @public
	     */
	    constructor(message: string, Ar?: FArchive | FArchiveWriter);
	}
	/**
	 * Creates an invalid aes key exception
	 */
	export class InvalidAesKeyException extends ParserException {
	    /**
	     * Creates an instance
	     * @param {string} message Message to use
	     * @constructor
	     * @public
	     */
	    constructor(message: string);
	}
	/**
	 * Creates a missing schema exception
	 */
	export class MissingSchemaException extends ParserException {
	    /**
	     * Creates an instance
	     * @param {string} message Message to use
	     * @constructor
	     * @public
	     */
	    constructor(message: string);
	}
	/**
	 * Creates an unknown property exception
	 */
	export class UnknownPropertyException extends ParserException {
	    /**
	     * Creates an instance
	     * @param {string} message Message to use
	     * @param {FArchive} Ar FArchive for additional info
	     * @constructor
	     * @public
	     */
	    constructor(message: string, Ar: FArchive);
	}

}
declare module 'ue4/reader/FArchive' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FName } from 'ue4/objects/uobject/FName';
	import { UnrealMap } from 'util/UnrealMap';
	/**
	 * UE4 Reader
	 */
	export class FArchive {
	    /**
	     * Stores the buffer data
	     * @type {Buffer}
	     * @public
	     */
	    data: Buffer;
	    /**
	     * Creates an instance
	     * @param {Buffer} data Buffer to read
	     * @constructor
	     * @public
	     */
	    constructor(data?: Buffer);
	    /**
	     * Game that is used with this reader
	     * @type {number}
	     * @public
	     */
	    game: number;
	    /**
	     * Version that is used with this reader
	     * @type {number}
	     * @public
	     */
	    ver: number;
	    /**
	     * Position of the reader
	     * @type {number}
	     * @protected
	     */
	    protected position: number;
	    /**
	     * Wether to use unversioned property serialization (DO NOT OVERRIDE THIS)
	     * @type {boolean}
	     * @public
	     */
	    useUnversionedPropertySerialization: boolean;
	    /**
	     * Wether if this is a filter editor
	     * @type {boolean}
	     * @public
	     */
	    isFilterEditorOnly: boolean;
	    /**
	     * Wether to use little endian
	     * @type {boolean}
	     * @public
	     */
	    littleEndian: boolean;
	    /**
	     * Returns current position
	     * @type {number}
	     * @public
	     */
	    get pos(): number;
	    /**
	     * Sets the current position
	     * @param {number} v Position to set to
	     * @public
	     */
	    set pos(v: number);
	    /**
	     * Returns this reader's size
	     * @type {number}
	     * @public
	     */
	    get size(): number;
	    /**
	     * Wether if this reader is the the end
	     * @type {boolean} Result
	     * @public
	     */
	    get isAtStopper(): boolean;
	    /**
	     * Copies to a buffer
	     * @param {Buffer} b Destination
	     * @param {number} off Offset
	     * @param {number} len Length
	     * @returns {void}
	     * @public
	     */
	    readToBuffer(b: Buffer, off?: number, len?: number): void;
	    /**
	     * Reads an amount of bytes and returns them
	     * @param {number} num Amount to read
	     * @param {boolean} copy Wether to remove these bytes from the reader's buffer (default: false)
	     * @returns {Buffer} Read bytes
	     * @public
	     */
	    readBuffer(num: number, copy?: boolean): Buffer;
	    /**
	     * Reads a range of bytes and returns them
	     * @param {number} begin Where to begin
	     * @param {number} end Where to end
	     * @param {boolean} copy Wether to remove these bytes from the reader's buffer (default: false)
	     * @returns {Buffer} Read bytes
	     * @public
	     */
	    readRange(begin: number, end: number, copy?: boolean): Buffer;
	    /**
	     * Reads an 8-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readInt8(): number;
	    /**
	     * Reads an unsigned 8-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readUInt8(): number;
	    /**
	     * Reads a 16-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readInt16(): number;
	    /**
	     * Reads an unsigned 16-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readUInt16(): number;
	    /**
	     * Reads a 32-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readInt32(): number;
	    /**
	     * Reads an unsigned 32-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readUInt32(): number;
	    /**
	     * Reads a 64-bit integer
	     * @returns {bigint} Result
	     * @public
	     */
	    readInt64(): bigint;
	    /**
	     * Reads an unsigned 64-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readUInt64(): bigint;
	    /**
	     * Reads a float
	     * @returns {number} Result
	     * @public
	     */
	    readFloat32(): number;
	    /**
	     * Reads a double
	     * @returns {number} Result
	     * @public
	     */
	    readDouble(): number;
	    /**
	     * Reads a boolean
	     * @returns {boolean} Result
	     * @public
	     */
	    readBoolean(): boolean;
	    /**
	     * Reads a flag
	     * @returns {boolean} Result
	     * @public
	     */
	    readFlag(): boolean;
	    /**
	     * Reads a FString
	     * @returns {string} Result
	     * @public
	     */
	    readString(): string;
	    /**
	     * Reads an array
	     * @param {(index) => any} init Callable method for array entries
	     * @param {number} length Length to read
	     * @returns {Array<any>} Result
	     * @public
	     */
	    readArray<T>(init: (index: number) => T, length?: number): T[];
	    /**
	     * Reads a map
	     * @param {number} length Length to read
	     * @param {(index) => Pair<any, any>} init Callable method for map entries
	     * @returns {Array<any>} Result
	     * @public
	     */
	    readTMap<K, V>(length: number, init: (it: FArchive) => Pair<K, V>): UnrealMap<K, V>;
	    /**
	     * Reads FName
	     * @returns {FName}
	     * @public
	     */
	    readFName(): FName;
	    /**
	     * Returns FArchive info for error
	     * @returns {string}
	     * @public
	     */
	    printError(): string;
	}
	export interface Pair<K, V> {
	    key: K;
	    value: V;
	}

}
declare module 'ue4/pak/objects/FPakCompressedBlock' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FPakCompressedBlock {
	    compressedStart: number;
	    compressedEnd: number;
	    constructor(Ar: FArchive);
	    constructor(compressedStart: number, compressedEnd: number);
	    serialize(Ar: FArchiveWriter): void;
	}

}
declare module 'ue4/reader/FByteArchive' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FArchive } from 'ue4/reader/FArchive';
	/**
	 * Byte Reader for UE4
	 * @extends {FArchive}
	 */
	export class FByteArchive extends FArchive {
	    /**
	     * Creates an instance
	     * @param {Buffer} data Buffer to reader
	     * @constructor
	     * @public
	     */
	    constructor(data: Buffer);
	    /**
	     * Clones this instance
	     * @returns {FByteArchive}
	     * @public
	     */
	    clone(): FByteArchive;
	    /**
	     * Returns FArchive info for error
	     * @returns {string}
	     * @public
	     */
	    printError(): string;
	}

}
declare module 'util/StringBuilder' {
	export class StringBuilder {
	    value: any[];
	    constructor(value?: any);
	    append(value: string, offset?: number, length?: number): this;
	    toString(): string;
	    get length(): number;
	}

}
declare module 'util/Const' {
	export const INDEX_NONE = -1;
	export const KINDA_SMALL_NUMBER = 0.0001;
	export const FLOAT_MAX_VALUE = 3.402823466e+38;
	export const FLOAT_MIN_VALUE = 1.175494351e-38;
	export const INTEGER_MAX_VALUE = 2147483647;

}
declare module 'util/Utils' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import BitSet from 'bitset';
	export class Utils {
	    static clamp(self: number, min: number, max: number): number;
	    static pathAppend(str1: string, str2: string, strLength?: number): string;
	    static isAligned(value: number, alignment: number): boolean;
	    static alignBigInt(value: bigint, alignment: bigint): number;
	    static align(value: number, alignment: number): number;
	    static repeat(times: number, action: (n: number) => void): void;
	    static toRadians(angdeg: number): number;
	    static bitSetIndex(bitSet: BitSet, value: boolean): number;
	    static takeWhile(buf: Buffer, filter: (byte: number) => boolean): Buffer;
	}

}
declare module 'ue4/assets/util/PayloadType' {
	export enum PayloadType {
	    UBULK = 0,
	    M_UBULK = 1,
	    UPTNL = 2
	}

}
declare module 'ue4/assets/objects/PropertyInfo' {
	import { PropertyType } from 'ue4/assets/objects/PropertyType';
	/**
	 * Property info
	 */
	export class PropertyInfo {
	    /**
	     * Index
	     * @type {number}
	     * @public
	     */
	    index: number;
	    /**
	     * Name
	     * @type {string}
	     * @public
	     */
	    name: string;
	    /**
	     * Type of this property
	     * @type {PropertyType}
	     * @public
	     */
	    type: PropertyType;
	    /**
	     * Array dim
	     * @type {number}
	     * @public
	     */
	    arrayDim: number;
	    /**
	     * Creates an instance from json
	     * @param {any} json Json data to use
	     * @constructor
	     * @public
	     */
	    constructor(json: any);
	    /**
	     * Creates an instance from name, type & arrayDim
	     * @param {string} name Name to use
	     * @param {PropertyType} type Type to use
	     * @param {number} arrayDim Array dim to use
	     * @constructor
	     * @public
	     */
	    constructor(name: string, type: PropertyType, arrayDim: number);
	    /**
	     * Turns this into a string
	     * @returns {string}
	     * @public
	     */
	    toString(): string;
	}

}
declare module 'util/Lazy' {
	export class Lazy<T> {
	    private initializer;
	    private _value;
	    constructor(initializer: () => T);
	    get value(): T;
	    get isInitialized(): boolean;
	}

}
declare module 'ue4/assets/exports/UStruct' {
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { PropertyInfo } from 'ue4/assets/objects/PropertyInfo';
	import { Lazy } from 'util/Lazy';
	export class UStruct extends UObject {
	    superStruct: Lazy<UStruct>;
	    children: FPackageIndex[];
	    childProperties: FField[];
	    childProperties2: PropertyInfo[];
	    propertyCount: number;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	    protected deserializeProperties(Ar: FAssetArchive): void;
	}
	export class FField {
	    name: FName;
	    flags: number;
	    deserialize(Ar: FAssetArchive): void;
	    static construct(fieldTypeName: FName): FPropertySerialized;
	}
	export class FPropertySerialized extends FField {
	    arrayDim: number;
	    elementSize: number;
	    saveFlags: number;
	    repIndex: number;
	    repNotifyFunc: FName;
	    blueprintReplicationCondition: number;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FBoolProperty extends FPropertySerialized {
	    fieldSize: number;
	    byteOffset: number;
	    byteMask: number;
	    fieldMask: number;
	    boolSize: number;
	    nativeBool: number;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FNumericProperty extends FPropertySerialized {
	}
	export class FObjectProperty extends FPropertySerialized {
	    propertyClass: any;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FArrayProperty extends FPropertySerialized {
	    inner?: FPropertySerialized;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FByteProperty extends FNumericProperty {
	    enum: FPackageIndex;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FClassProperty extends FObjectProperty {
	    metaClass: any;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FDelegateProperty extends FPropertySerialized {
	    signatureFunction: any;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FEnumProperty extends FPropertySerialized {
	    underlyingProp: FNumericProperty;
	    enum: FPackageIndex;
	    deserialize(Ar: FAssetArchive): void;
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
	    interfaceClass: any;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FMapProperty extends FPropertySerialized {
	    keyProp: FPropertySerialized;
	    valueProp: FPropertySerialized;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FMulticastDelegateProperty extends FPropertySerialized {
	    signatureFunction: any;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FMulticastInlineDelegateProperty extends FPropertySerialized {
	    signatureFunction: any;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FNameProperty extends FPropertySerialized {
	}
	export class FSoftClassProperty extends FObjectProperty {
	    metaClass: any;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FSoftObjectProperty extends FObjectProperty {
	}
	export class FSetProperty extends FPropertySerialized {
	    elementProp: FPropertySerialized;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FStrProperty extends FPropertySerialized {
	}
	export class FStructProperty extends FPropertySerialized {
	    struct: any;
	    deserialize(Ar: FAssetArchive): void;
	}
	export class FTextProperty extends FPropertySerialized {
	}
	export class FUInt16Property extends FNumericProperty {
	}
	export class FUInt32Property extends FNumericProperty {
	}
	export class FUInt64Property extends FNumericProperty {
	}
	export function serializeSingleField(Ar: FAssetArchive): FField;

}
declare module 'ue4/assets/objects/PropertyType' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FPropertyTag } from 'ue4/assets/objects/FPropertyTag';
	import { FPropertySerialized } from 'ue4/assets/exports/UStruct';
	import { Lazy } from 'util/Lazy';
	/**
	 * Property type
	 */
	export class PropertyType {
	    /**
	     * Type of property
	     * @type {FName}
	     * @public
	     */
	    type: FName;
	    /**
	     * Name of struct
	     * @type {FName}
	     * @public
	     */
	    structName: FName;
	    /**
	     * Wether if its a bool
	     * @type {boolean}
	     * @public
	     */
	    bool: boolean;
	    /**
	     * Name of enum
	     * @type {FName}
	     * @public
	     */
	    enumName: FName;
	    /**
	     * Wether it is an enum as byte
	     * @type {boolean}
	     * @public
	     */
	    isEnumAsByte: boolean;
	    /**
	     * Inner type of this property
	     * @type {?PropertyType}
	     * @public
	     */
	    innerType: PropertyType;
	    /**
	     * Value type of this property
	     * @type {?PropertyType}
	     * @public
	     */
	    valueType: PropertyType;
	    /**
	     * Struct class of this property
	     * @type {?Lazy<any>}
	     * @public
	     */
	    structClass: Lazy<any>;
	    /**
	     * Enum class
	     * @type {?any}
	     * @public
	     */
	    enumClass: any;
	    /**
	     * Creates an instance with no info
	     * @constructor
	     * @public
	     */
	    constructor();
	    /**
	     * Creates an instance with a defined type
	     * @param {FName} type Type of the property
	     * @constructor
	     * @public
	     */
	    constructor(type: FName);
	    /**
	     * Creates an instance using json data
	     * @param {any} jsonObject Json data to use
	     * @constructor
	     * @public
	     */
	    constructor(jsonObject: any);
	    /**
	     * Creates an instance using FPropertyTag
	     * @param {FPropertyTag} tag Tag to use
	     * @constructor
	     * @public
	     */
	    constructor(tag: FPropertyTag);
	    /**
	     * Creates an instance using FPropertySerialized
	     * @param {FPropertySerialized} prop Serialized property to use
	     * @constructor
	     * @public
	     */
	    constructor(prop: FPropertySerialized);
	    /**
	     * Turns this into a string
	     * @returns {string}
	     * @public
	     */
	    toString(): string;
	}

}
declare module 'ue4/assets/writer/FAssetArchiveWriter' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { FObjectExport, FObjectImport } from 'ue4/objects/uobject/ObjectResource';
	import { PayloadType } from 'ue4/assets/util/PayloadType';
	import { FName, FNameEntry } from 'ue4/objects/uobject/FName';
	import { WritableStreamBuffer } from 'stream-buffers';
	export class FAssetArchiveWriter extends FArchiveWriter {
	    littleEndian: boolean;
	    outputStream: WritableStreamBuffer;
	    private _pos;
	    constructor(outputStream: WritableStreamBuffer);
	    pos(): number;
	    nameMap: FNameEntry[];
	    importMap: FObjectImport[];
	    exportMap: FObjectExport[];
	    private payloads;
	    getPayload(type: PayloadType): FAssetArchiveWriter;
	    addPayload(type: PayloadType, payload: FAssetArchiveWriter): void;
	    uassetSize: number;
	    uexpSize: number;
	    relativePos(): number;
	    toNormalPos(relativePos: number): number;
	    toRelativePos(normalPos: number): number;
	    writeFName(name: FName): void;
	    write(b: number): any;
	    write(buffer: Buffer): any;
	    printError(): string;
	    setupByteArrayWriter(): FByteArchiveWriter;
	}
	export class FByteArchiveWriter extends FAssetArchiveWriter {
	    bos: WritableStreamBuffer;
	    constructor();
	    toByteArray(): Buffer;
	    printError(): string;
	}

}
declare module 'ue4/assets/objects/UScriptArray' {
	import { FPropertyTag } from 'ue4/assets/objects/FPropertyTag';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { PropertyType } from 'ue4/assets/objects/PropertyType';
	import { FProperty } from 'ue4/assets/objects/FProperty';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	/**
	 * Script Array
	 */
	export class UScriptArray {
	    /**
	     * Inner tag of this array
	     * @type {?FPropertyTag}
	     * @public
	     */
	    innerTag: FPropertyTag;
	    /**
	     * Content of this array
	     * @type {FProperty}
	     * @public
	     */
	    contents: FProperty[];
	    /**
	     * Creates an instance using an UE4 reader
	     * @param {FAssetArchive} Ar Reader to use
	     * @param {PropertyType} typeData Data to use
	     * @constructor
	     * @public
	     */
	    constructor(Ar: FAssetArchive, typeData: PropertyType);
	    /**
	     * Creates an instance using FPropertyTag and array content
	     * @param {FPropertyTag} innerTag Inner tag of the array
	     * @param {Array<FProperty>} contents Content of the array
	     */
	    constructor(innerTag: FPropertyTag, contents: FProperty[]);
	    /**
	     * Serializes this
	     * @param {FAssetArchiveWriter} Ar Writer to use
	     * @returns {void}
	     * @public
	     */
	    serialize(Ar: FAssetArchiveWriter): void;
	    /**
	     * Turns this into a string
	     * @returns {string}
	     * @public
	     */
	    toString(): string;
	}

}
declare module 'ue4/objects/FFieldPath' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	export class FFieldPath {
	    path: FName[];
	    resolvedOwner: FPackageIndex;
	    constructor();
	    constructor(Ar: FAssetArchive);
	    constructor(path: FName[], resolvedOwner: FPackageIndex);
	}

}
declare module 'ue4/objects/uobject/UInterfaceProperty' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class UInterfaceProperty {
	    interfaceNumber: number;
	    constructor(Ar: FArchive);
	    constructor(interfaceNumber: number);
	    serialize(Ar: FArchiveWriter): void;
	}

}
declare module 'ue4/objects/uobject/FUniqueObjectGuid' {
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FUniqueObjectGuid {
	    guid: FGuid;
	    constructor(Ar: FArchive);
	    constructor(guid: FGuid);
	    serialize(Ar: FArchiveWriter): void;
	}

}
declare module 'ue4/assets/enums/ETextHistoryType' {
	export enum ETextHistoryType {
	    None = -1,
	    Base = 0,
	    NamedFormat = 1,
	    OrderedFormat = 2,
	    ArgumentFormat = 3,
	    AsNumber = 4,
	    AsPercent = 5,
	    AsCurrency = 6,
	    AsDate = 7,
	    AsTime = 8,
	    AsDateTime = 9,
	    Transform = 10,
	    StringTableEntry = 11,
	    TextGenerator = 12
	}

}
declare module 'ue4/objects/core/misc/DateTime' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FDateTime implements IStructType {
	    date: number;
	    constructor();
	    constructor(Ar: FArchive);
	    constructor(date: number);
	    serialize(Ar: FArchiveWriter): void;
	    toDate(): Date;
	    toJson(): any;
	}

}
declare module 'ue4/assets/enums/EDateTimeStyle' {
	export enum EDateTimeStyle {
	    Default = 0,
	    Short = 1,
	    Medium = 2,
	    Long = 3,
	    Full = 4
	}

}
declare module 'ue4/locres/FnLanguage' {
	export function valueOfLanguageCode(lang: string): FnLanguage;
	export enum FnLanguage {
	    AR = "ar",
	    DE = "de",
	    EN = "en",
	    ES = "es",
	    ES_419 = "es-419",
	    FR = "fr",
	    IT = "it",
	    JA = "ja",
	    KO = "ko",
	    PL = "pl",
	    PT_BR = "pt-BR",
	    RU = "ru",
	    TR = "tr",
	    ZH_CN = "zh-CN",
	    ZH_HANT = "zh-Hant",
	    UNKNOWN = "unknown"
	}

}
declare module 'ue4/objects/core/i18n/FTextLocalizationResource' {
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { UnrealMap } from 'util/UnrealMap';
	export class FTextLocalizationResource {
	    locResMagic: FGuid;
	    indexNone: number;
	    version: number;
	    strArrayOffset: number;
	    stringData: UnrealMap<string, UnrealMap<string, string>>;
	    constructor(Ar: FArchive);
	}
	export class FTextLocalizationResourceString {
	    data: string;
	    refCount: number;
	    constructor(Ar: FArchive);
	    constructor(data: string, refCount: number);
	    serialize(Ar: FArchiveWriter): void;
	}
	export class FTextKey {
	    stringHash: number;
	    text: string;
	    constructor(Ar: FArchive);
	    constructor(stringHash: number, text: string);
	    serialize(Ar: FArchiveWriter): void;
	}

}
declare module 'ue4/locres/Locres' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FnLanguage } from 'ue4/locres/FnLanguage';
	import { FTextLocalizationResource } from 'ue4/objects/core/i18n/FTextLocalizationResource';
	/**
	 * UE4 Text Localization (.locres)
	 */
	export class Locres {
	    /**
	     * Raw data of the locres
	     * @type {Buffer}
	     * @public
	     */
	    locres: Buffer;
	    /**
	     * Name of the locres file
	     * @type {string}
	     * @public
	     */
	    fileName: string;
	    /**
	     * Language of locres file
	     * @type {FnLanguage}
	     * @public
	     */
	    language: FnLanguage;
	    /**
	     * String data of the locres file
	     * @type {FTextLocalizationResource}
	     * @public
	     */
	    texts: FTextLocalizationResource;
	    /**
	     * Creates an instance
	     * @param {Buffer} file Raw buffer of locres file
	     * @param {string} fileName Name of locres file
	     * @param {FnLanguage} language Language of locres file
	     * @constructor
	     * @public
	     */
	    constructor(file: Buffer, fileName?: string, language?: FnLanguage);
	    /**
	     * Merges locres data of this file into another
	     * @param {Locres} target Locres file to merge into
	     * @returns {void}
	     * @public
	     */
	    mergeInto(target: Locres): void;
	    /**
	     * Turns this into json
	     * @returns {any} json
	     * @public
	     */
	    toJson(): {};
	}

}
declare module 'ue4/assets/exports/UStringTable' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	import { UnrealMap } from 'util/UnrealMap';
	import { Locres } from 'ue4/locres/Locres';
	export class UStringTable extends UObject {
	    tableNamespace: string;
	    entries: UnrealMap<string, string>;
	    keysToMetadata: UnrealMap<string, UnrealMap<FName, string>>;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	    serialize(Ar: FAssetArchiveWriter): void;
	    toJson(locres?: Locres): IUStringTable;
	}
	export interface IUStringTable {
	    tableNamespace: string;
	    entries: any;
	    keysToMetadata: any;
	    any: any;
	}

}
declare module 'ue4/objects/core/i18n/Text' {
	import { ETextHistoryType } from 'ue4/assets/enums/ETextHistoryType';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FDateTime } from 'ue4/objects/core/misc/DateTime';
	import { EDateTimeStyle } from 'ue4/assets/enums/EDateTimeStyle';
	import { FName } from 'ue4/objects/uobject/FName';
	import { Locres } from 'ue4/locres/Locres';
	export enum EFormatArgumentType {
	    Int = 0,
	    UInt = 1,
	    Float = 2,
	    Double = 3,
	    Text = 4,
	    Gender = 5
	}
	export class FText {
	    flags: number;
	    historyType: ETextHistoryType;
	    textHistory: FTextHistory;
	    text: string;
	    constructor(Ar: FArchive);
	    constructor(sourceString: string);
	    constructor(namespace: string, key: string, sourceString: string);
	    constructor(namespace: string, key: string, sourceString: string, flags: number, historyType: ETextHistoryType);
	    constructor(flags: number, historyType: number, textHistory: FTextHistory);
	    copy(): FText;
	    textForLocres(locres?: Locres): string;
	    serialize(Ar: FArchiveWriter): void;
	    toString(): string;
	    toJson(): {
	        historyType: string;
	        finalText: string;
	        value: any;
	    };
	}
	export abstract class FTextHistory {
	    abstract serialize(Ar: FArchiveWriter): any;
	    abstract text: string;
	    abstract toJson(): any;
	    OrderedFormat: {
	        new (): {
	            sourceFmt: FText;
	            arguments: any;
	        };
	    };
	}
	export class FTextHistoryNone extends FTextHistory {
	    cultureInvariantString: string;
	    get text(): string;
	    constructor();
	    constructor(Ar: FArchive);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): {
	        cultureInvariantString: string;
	    };
	}
	export class FTextHistoryBase extends FTextHistory {
	    namespace: string;
	    key: string;
	    sourceString: string;
	    get text(): string;
	    constructor(Ar: FArchive);
	    constructor(namespace: string, key: string, sourceString: string);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FTextHistoryDateTime extends FTextHistory {
	    sourceDateTime: FDateTime;
	    dateStyle: EDateTimeStyle;
	    timeStyle: EDateTimeStyle;
	    timeZone: string;
	    targetCulture: string;
	    get text(): string;
	    constructor(Ar: FArchive);
	    constructor(sourceDateTime: FDateTime, dateStyle: EDateTimeStyle, timeStyle: EDateTimeStyle, timeZone: string, targetCulture: string);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FTextHistoryOrderedFormat extends FTextHistory {
	    sourceFmt: FText;
	    args: FFormatArgumentValue[];
	    get text(): string;
	    constructor(Ar: FArchive);
	    constructor(sourceFmt: FText, args: FFormatArgumentValue[]);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FTextHistoryFormatNumber extends FTextHistory {
	    /** The source value to format from */
	    sourceValue: FFormatArgumentValue;
	    /** The culture to format using */
	    timeZone: string;
	    targetCulture: string;
	    get text(): string;
	    constructor(Ar: FArchive);
	    constructor(sourceValue: FFormatArgumentValue, timeZone: string, targetCulture: string);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FTextHistoryStringTableEntry extends FTextHistory {
	    tableId: FName;
	    key: string;
	    text: string;
	    constructor(Ar: FArchive);
	    constructor(tableId: FName, key: string, text: string);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FFormatArgumentValue {
	    type: EFormatArgumentType;
	    value: any;
	    constructor(Ar: FArchive);
	    constructor(type: EFormatArgumentType, value: any);
	    serialize(Ar: FArchiveWriter): void;
	    toString(): string;
	    toJson(): any;
	}

}
declare module 'ue4/objects/uobject/UScriptMap' {
	import { FProperty } from 'ue4/assets/objects/FProperty';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { PropertyType } from 'ue4/assets/objects/PropertyType';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	import { UnrealMap } from 'util/UnrealMap';
	export class UScriptMap {
	    numKeysToRemove: number;
	    mapData: UnrealMap<FProperty, FProperty>;
	    constructor(Ar: FAssetArchive, typeData: PropertyType);
	    constructor(numKeyToRemove: number, mapData: UnrealMap<FProperty, FProperty>);
	    serialize(Ar: FAssetArchiveWriter): void;
	}

}
declare module 'ue4/objects/uobject/ScriptDelegates' {
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	export class FScriptDelegate {
	    object: FPackageIndex;
	    functionName: FName;
	    constructor(Ar: FAssetArchive);
	    constructor(object: FPackageIndex, functionName: FName);
	    serialize(Ar: FAssetArchiveWriter): void;
	}
	export class FMulticastScriptDelegate {
	    invocationList: FScriptDelegate[];
	    constructor(Ar: FAssetArchive);
	    constructor(invocationList: FScriptDelegate[]);
	    serialize(Ar: FAssetArchiveWriter): void;
	}

}
declare module 'ue4/objects/uobject/SoftObjectPath' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { Package } from 'ue4/assets/Package';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	/**
	 * A struct that contains a string reference to an object, either a top level asset or a subobject.
	 * This can be used to make soft references to assets that are loaded on demand.
	 * This is stored internally as an FName pointing to the top level asset (/package/path.assetname) and an option a string subobject path.
	 * If the MetaClass metadata is applied to a FProperty with this the UI will restrict to that type of asset.
	 */
	export class FSoftObjectPath implements IStructType {
	    /** Asset path, patch to a top level object in a package. This is /package/path.assetname */
	    assetPathName: FName;
	    /** Optional FString for subobject within an asset. This is the sub path after the : */
	    subPathString: string;
	    owner: Package;
	    constructor();
	    constructor(Ar: FArchive);
	    constructor(assetPathName: FName, subPathString: string);
	    serialize(Ar: FArchiveWriter): void;
	    toString(): string;
	    load<T extends UObject>(): T;
	    toJson(): any;
	}
	export class FSoftClassPath extends FSoftObjectPath {
	    constructor();
	    constructor(Ar: FArchive);
	    constructor(assetPathName: FName, subPathString: string);
	}

}
declare module 'ue4/io/IoDispatcher' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FArchive } from 'ue4/reader/FArchive';
	import { int32, uint16 } from 'Types';
	/**
	 * Helper used to manage creation of I/O store file handles etc
	 */
	export class FIoStoreEnvironment {
	    path: string;
	    order: int32;
	    constructor(path: string, order?: int32);
	}
	/**
	 * Chunk hash
	 */
	export class FIoChunkHash {
	    hash: Buffer;
	    constructor(Ar: FArchive);
	}
	/**
	 * Identifier to a chunk of data.
	 */
	export class FIoChunkId {
	    id: Buffer;
	    constructor(Ar?: FArchive);
	    equals(other: FIoChunkId): boolean;
	}
	/**
	 * Addressable chunk types.
	 */
	export enum EIoChunkType {
	    Invalid = 0,
	    InstallManifest = 1,
	    ExportBundleData = 2,
	    BulkData = 3,
	    OptionalBulkData = 4,
	    MemoryMappedBulkData = 5,
	    LoaderGlobalMeta = 6,
	    LoaderInitialLoadMeta = 7,
	    LoaderGlobalNames = 8,
	    LoaderGlobalNameHashes = 9,
	    ContainerHeader = 10
	}
	/**
	 * Creates a chunk identifier
	 */
	export function createIoChunkId(chunkId: bigint, chunkIndex: uint16, ioChunkType: EIoChunkType): FIoChunkId;
	export enum EIoContainerFlags {
	    None = 0,
	    Compressed = 1,
	    Encrypted = 2,
	    Signed = 4,
	    Indexed = 8
	}
	export class FIoDispatcherMountedContainer {
	    environment: FIoStoreEnvironment;
	    containerId: bigint;
	    constructor(environment: FIoStoreEnvironment, containerId: bigint);
	}
	export abstract class FOnContainerMountedListener {
	    abstract onContainerMounted(container: FIoDispatcherMountedContainer): any;
	}
	export class FIoDirectoryIndexHandle {
	    handle: number;
	    private constructor();
	    static INVALID_HANDLE: number;
	    static ROOT_HANDLE: number;
	    static fromIndex(index: number): FIoDirectoryIndexHandle;
	    static rootDirectory(): FIoDirectoryIndexHandle;
	    static invalid(): FIoDirectoryIndexHandle;
	    isValid(): boolean;
	    equals(other: any): boolean;
	    toIndex(): number;
	}

}
declare module 'ue4/objects/uobject/NameTypes' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FNameDummy } from 'ue4/objects/uobject/FName';
	export const NAME_NO_NUMBER_INTERNAL = 0;
	export class FNameEntryId {
	    value: number;
	    constructor(value: number);
	    constructor(Ar: FArchive);
	}
	export class FMinimalName {
	    /** Index into the Names array (used to find String portion of the string/number pair) */
	    index: FNameEntryId;
	    /** Number portion of the string/number pair (stored internally as 1 more than actual, so zero'd memory will be the default, no-instance case) */
	    num: number;
	    private nameMap;
	    constructor(index: FNameEntryId, num: number, nameMap: string[]);
	    constructor(Ar: FArchive, nameMap: string[]);
	    toName(): FNameDummy;
	}

}
declare module 'ue4/io/IoContainerId' {
	import { FArchive } from 'ue4/reader/FArchive';
	export function createFIoContainerId(source?: bigint | FArchive): bigint;
	/**
	 * - Container ID:
	 * @deprecated Use 'createFIoContainerId(source?: string | FArchive)' and 'isFIoContainerIdValid(id: string)'
	 */
	export class FIoContainerId {
	    static InvalidId: string;
	    id: string;
	    constructor();
	    constructor(id: string);
	    constructor(Ar: FArchive);
	    value(): string;
	    isValid(): boolean;
	    equals(other?: any): boolean;
	}

}
declare module 'util/Pair' {
	export class Pair<K, V> {
	    key: K;
	    value: V;
	    constructor(key: K, value: V);
	}

}
declare module 'util/CityHash' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import * as Long from 'long';
	export type long = Long.Long;
	/**
	 * @author tamtam180 - kirscheless at gmail.com
	 * @author modified by amrsatrio
	 * @author ported by Sprayxe
	 * @see <a href="https://opensource.googleblog.com/2011/04/introducing-cityhash.html">https://opensource.googleblog.com/2011/04/introducing-cityhash.html</a>
	 * @see <a href="https://github.com/google/cityhash">https://github.com/google/cityhash</a>
	 */
	export class CityHash {
	    private static readonly k0;
	    private static readonly k1;
	    private static readonly k2;
	    private static toLongLE;
	    private static toIntLE;
	    private static bswap64;
	    private static fetch64;
	    private static fetch32;
	    /**
	     * Bitwise right rotate.  Normally this will compile to a single
	     * instruction, especially if the shift is a manifest constant.
	     */
	    private static rotate;
	    private static shiftMix;
	    private static hashLen16;
	    private static hashLen16Mul;
	    private static hashLen0to16;
	    /**
	     * This probably works well for 16-byte strings as well, but it may be overkill
	     * in that case.
	     */
	    private static hashLen17to32;
	    /**
	     * Return a 16-byte hash for 48 bytes.  Quick and dirty.
	     * Callers do best to use "random-looking" values for a and b.
	     */
	    private static weakHashLen32WithSeeds0;
	    /**
	     * Return a 16-byte hash for s[0] ... s[31], a, and b.  Quick and dirty.
	     */
	    private static weakHashLen32WithSeeds1;
	    /**
	     * Return an 8-byte hash for 33 to 64 bytes.
	     */
	    private static hashLen33to64;
	    /**
	     * Hash function for a byte array.
	     */
	    static cityHash64(s: Buffer, pos: number, len: number): long;
	    /**
	     * Hash function for a byte array.  For convenience, a 64-bit seed is also
	     * hashed into the result.
	     */
	    static cityHash64WithSeed(s: Buffer, pos: number, len: number, seed: long): long;
	    static cityHash64WithSeeds(s: Buffer, pos: number, len: number, seed0: long, seed1: long): long;
	    /**
	     * Hash function for a byte array.  Most useful in 32-bit binaries.
	     */
	    static cityHash32(s: Buffer, pos: number, len: number): long;
	    /**
	     * Hash 128 input bits down to 64 bits of output.
	     * This is intended to be a reasonably good hash function.
	     */
	    static cityHash128to64(u: long, v: long): long;
	}

}
declare module 'util/UnrealArray' {
	export class UnrealArray<T> extends Array<T> {
	    constructor(length: number, init: (index: number) => T);
	}

}
declare module 'ue4/asyncloading2/AsyncLoading2' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FArchive } from 'ue4/reader/FArchive';
	import { FMinimalName } from 'ue4/objects/uobject/NameTypes';
	import { Pair } from 'util/Pair';
	import Long from 'long';
	import Collection from '@discordjs/collection';
	export type FSourceToLocalizedPackageIdMap = Pair<bigint, bigint>[];
	export type FCulturePackageMap = Collection<string, FSourceToLocalizedPackageIdMap>;
	export const INVALID_INDEX: number;
	export const INDEX_BITS = 30;
	export const INDEX_MASK: number;
	export const TYPE_MASK: number;
	export const TYPE_SHIFT = 30;
	export class FMappedName {
	    static create(index: number, num: number, type: FMappedName_EType): FMappedName;
	    static fromMinimalName(minimalName: FMinimalName): FMappedName;
	    static isResolvedToMinimalName(minimalName: FMinimalName): boolean;
	    index: number;
	    num: number;
	    constructor(Ar?: FArchive);
	    isValid(): boolean;
	    getType(): number;
	    isGlobal(): boolean;
	    getIndex(): number;
	    equals(other?: any): boolean;
	}
	export enum FMappedName_EType {
	    Package = 0,
	    Container = 1,
	    Global = 2
	}
	export class FPackageStoreEntry {
	    exportBundlesSize: number;
	    exportCount: number;
	    exportBundleCount: number;
	    loadOrder: number;
	    pad: number;
	    importedPackages: string[];
	    constructor(Ar: FArchive);
	    private readCArrayView;
	}
	export const _INDEX_BITS = 62;
	export const _INDEX_MASK: number;
	export const _TYPE_SHIFT = 62;
	export const INVALID: Long.Long;
	export class FPackageObjectIndex {
	    private readonly typeAndId;
	    constructor();
	    constructor(type: FPackageObjectIndex_EType, id: Long.Long);
	    constructor(Ar: FArchive);
	    static generateImportHashFromObjectPath(objectPath: string): Long.Long;
	    static fromExportIndex(index: number): FPackageObjectIndex;
	    static fromScriptPath(scriptObjectPath: string): FPackageObjectIndex;
	    static fromPackagePath(packageObjectPath: string): FPackageObjectIndex;
	    isNull(): boolean;
	    isExport(): boolean;
	    isImport(): boolean;
	    isScriptImport(): boolean;
	    isPackageImport(): boolean;
	    toExport(): Long.Long;
	    type(): number;
	    value(): Long.Long;
	    equals(other?: any): boolean;
	}
	export enum FPackageObjectIndex_EType {
	    Export = 0,
	    ScriptImport = 1,
	    PackageImport = 2,
	    Null = 3
	}
	export class FScriptObjectEntry {
	    objectName: FMinimalName;
	    globalIndex: FPackageObjectIndex;
	    outerIndex: FPackageObjectIndex;
	    cdoClassIndex: FPackageObjectIndex;
	    constructor(Ar: FArchive, nameMap: string[]);
	}
	export class FContainerHeader {
	    containerId: bigint;
	    packageCount: number;
	    names: Buffer;
	    nameHashes: Buffer;
	    packageIds: bigint[];
	    storeEntries: FPackageStoreEntry[];
	    culturePackageMap: FCulturePackageMap;
	    packageRedirects: Pair<bigint, bigint>[];
	    constructor(Ar: FArchive);
	}
	export class FPackageSummary {
	    name: FMappedName;
	    sourceName: FMappedName;
	    packageFlags: number;
	    cookedHeaderSize: number;
	    nameMapNamesOffset: number;
	    nameMapNamesSize: number;
	    nameMapHashesOffset: number;
	    nameMapHashesSize: number;
	    importMapOffset: number;
	    exportMapOffset: number;
	    exportBundlesOffset: number;
	    graphDataOffset: number;
	    graphDataSize: number;
	    pad: number;
	    constructor(Ar: FArchive);
	}
	export class FExportMapEntry {
	    cookedSerialOffset: number;
	    cookedSerialSize: number;
	    objectName: FMappedName;
	    outerIndex: FPackageObjectIndex;
	    classIndex: FPackageObjectIndex;
	    superIndex: FPackageObjectIndex;
	    templateIndex: FPackageObjectIndex;
	    globalImportIndex: FPackageObjectIndex;
	    objectFlags: number;
	    filterFlags: number;
	    constructor(Ar: FArchive);
	}
	export class FExportBundleHeader {
	    firstEntryIndex: number;
	    entryCount: number;
	    constructor(Ar: FArchive);
	}
	export class FExportBundleEntry {
	    localExportIndex: number;
	    commandType: EExportCommandType;
	    constructor(Ar: FArchive);
	}
	export enum EExportCommandType {
	    ExportCommandType_Create = 0,
	    ExportCommandType_Serialize = 1,
	    ExportCommandType_Count = 2
	}

}
declare module 'ue4/objects/uobject/UnrealNames' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FArchive } from 'ue4/reader/FArchive';
	export class FSerializedNameHeader {
	    data: Buffer;
	    constructor(Ar?: FArchive);
	    isUtf16(): boolean;
	    len(): number;
	}
	export function loadNameHeader(inOutAr: FArchive): string;

}
declare module 'ue4/objects/uobject/NameBatchSerialization' {
	import { FArchive } from 'ue4/reader/FArchive';
	export function loadNameBatch(nameDataAr: FArchive, hashDataAr?: FArchive): any[];

}
declare module 'ue4/asyncloading2/FNameMap' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FMappedName_EType, FMappedName } from 'ue4/asyncloading2/AsyncLoading2';
	import { FileProvider } from 'fileprovider/FileProvider';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FMinimalName } from 'ue4/objects/uobject/NameTypes';
	export class FNameMap {
	    nameEntries: string[];
	    nameMapType: FMappedName_EType;
	    loadGlobal(provider: FileProvider): void;
	    get length(): number;
	    load(nameBuffer: Buffer, hashBuffer: Buffer, nameMapType: FMappedName_EType): any;
	    load(nameBuffer: FArchive, hashBuffer: FArchive, nameMapType: FMappedName_EType): any;
	    getName(mappedName: FMappedName): FName;
	    getNameOrNull(mappedName: FMappedName): FName;
	    getMinimalName(mappedName: FMappedName): FMinimalName;
	}

}
declare module 'ue4/asyncloading2/FPackageStore' {
	import { FIoDispatcherMountedContainer, FOnContainerMountedListener } from 'ue4/io/IoDispatcher';
	import { FileProvider } from 'fileprovider/FileProvider';
	import { FNameMap } from 'ue4/asyncloading2/FNameMap';
	import { FPackageObjectIndex, FPackageStoreEntry, FScriptObjectEntry } from 'ue4/asyncloading2/AsyncLoading2';
	import { UnrealMap } from 'util/UnrealMap';
	export class FPackageStore extends FOnContainerMountedListener {
	    provider: FileProvider;
	    globalNameMap: FNameMap;
	    constructor(provider: FileProvider, globalNameMap: FNameMap);
	    loadedContainers: UnrealMap<bigint, FLoadedContainer>;
	    currentCultureNames: string[];
	    storeEntries: UnrealMap<bigint, FPackageStoreEntry>;
	    redirectedPackages: UnrealMap<bigint, bigint>;
	    scriptObjectEntries: FScriptObjectEntry[];
	    scriptObjectEntriesMap: UnrealMap<FPackageObjectIndex, FScriptObjectEntry>;
	    setupCulture(): void;
	    setupInitialLoadData(): void;
	    loadContainers(containers: FIoDispatcherMountedContainer[]): void;
	    onContainerMounted(container: FIoDispatcherMountedContainer): void;
	    applyRedirects(redirects: UnrealMap<bigint, bigint>): void;
	    findStoreEntry(packageId: bigint): FPackageStoreEntry;
	    getRedirectedPackageId(packageId: bigint): bigint;
	}
	export class FLoadedContainer {
	    containerNameMap: FNameMap;
	    storeEntries: FPackageStoreEntry[];
	    packageCount: number;
	    order: number;
	    bValid: boolean;
	}

}
declare module 'ue4/objects/uobject/EPackageFlags' {
	export enum EPackageFlags {
	    PKG_None = 0,
	    PKG_NewlyCreated = 1,
	    PKG_ClientOptional = 2,
	    PKG_ServerSideOnly = 4,
	    PKG_CompiledIn = 16,
	    PKG_ForDiffing = 32,
	    PKG_EditorOnly = 64,
	    PKG_Developer = 128,
	    PKG_UncookedOnly = 256,
	    PKG_UnversionedProperties = 8192,
	    PKG_ContainsMapData = 16384,
	    PKG_Compiling = 65536,
	    PKG_ContainsMap = 131072,
	    PKG_RequiresLocalizationGather = 262144,
	    PKG_PlayInEditor = 1048576,
	    PKG_ContainsScript = 2097152,
	    PKG_DisallowExport = 4194304,
	    PKG_DynamicImports = 268435456,
	    PKG_RuntimeGenerated = 536870912,
	    PKG_ReloadingForCooker = 1073741824,
	    PKG_FilterEditorOnly = 2147483648
	}

}
declare module 'ue4/assets/exports/UScriptStruct' {
	import { UStruct } from 'ue4/assets/exports/UStruct';
	import { FName } from 'ue4/objects/uobject/FName';
	export class UScriptStruct extends UStruct {
	    useClassProperties: boolean;
	    private field0;
	    private field1;
	    set structClass(value: any);
	    get rawStructClass(): any;
	    get structClass(): any;
	    constructor();
	    constructor(name: FName);
	    constructor(clazz: any, name?: FName);
	}

}
declare module 'ue4/assets/exports/UEnum' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { Pair } from 'util/Pair';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	export class UEnum extends UObject {
	    /** List of pairs of all enum names and values. */
	    names: Pair<FName, number>[];
	    /** How the enum was originally defined. */
	    cppForm: ECppForm;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	}
	/** How this enum is declared in C++, affects the internal naming of enum values */
	export enum ECppForm {
	    Regular = "Regular",
	    Namespaced = "Namespaced",
	    EnumClass = "EnumClass"
	}

}
declare module 'ue4/assets/IoPackage' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { IJson, Package } from 'ue4/assets/Package';
	import { FPackageStore } from 'ue4/asyncloading2/FPackageStore';
	import { FExportBundleEntry, FExportBundleHeader, FExportMapEntry, FPackageObjectIndex, FPackageStoreEntry, FPackageSummary, FScriptObjectEntry } from 'ue4/asyncloading2/AsyncLoading2';
	import { FNameMap } from 'ue4/asyncloading2/FNameMap';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FileProvider } from 'fileprovider/FileProvider';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { Locres } from 'ue4/locres/Locres';
	import { Lazy } from 'util/Lazy';
	import { Ue4Version } from 'ue4/versions/Game';
	/**
	 * UE4 I/O Package
	 * @extends {Package}
	 */
	export class IoPackage extends Package {
	    /**
	     * Package ID
	     * @type {bigint}
	     * @public
	     */
	    packageId: bigint;
	    /**
	     * Package Store
	     * @type {FPackageStore}
	     * @public
	     */
	    globalPackageStore: FPackageStore;
	    /**
	     * Package Summary
	     * @type {FPackageSummary}
	     * @public
	     */
	    summary: FPackageSummary;
	    /**
	     * Name Map
	     * @type {FNameMap}
	     * @public
	     */
	    nameMap: FNameMap;
	    /**
	     * Import Map
	     * @type {Array<FPackageObjectIndex>}
	     * @public
	     */
	    importMap: FPackageObjectIndex[];
	    /**
	     * Export Map
	     * @type {Array<FExportMapEntry>}
	     * @public
	     */
	    exportMap: FExportMapEntry[];
	    /**
	     * Export Bundle Headers
	     * @type {Array<FExportBundleHeader>}
	     * @public
	     */
	    exportBundleHeaders: FExportBundleHeader[];
	    /**
	     * Export Bundle Entries
	     * @type {Array<FExportBundleEntry>}
	     * @public
	     */
	    exportBundleEntries: FExportBundleEntry[];
	    /**
	     * Graph Data
	     * @type {Array<FImportedPackage>}
	     * @public
	     */
	    graphData: FImportedPackage[];
	    /**
	     * Imported Packages
	     * @type {Lazy<Array<IoPackage>>}
	     * @public
	     */
	    importedPackages: Lazy<IoPackage[]>;
	    /**
	     * Lazy Exports
	     * @type {Array<Lazy<UObject>>}
	     * @public
	     */
	    exportsLazy: Lazy<UObject>[];
	    /**
	     * Offset start of bulk data
	     * @type {number}
	     * @public
	     */
	    bulkDataStartOffset: number;
	    /**
	     * Creates an instance
	     * @param {Buffer} uasset Uasset data of package
	     * @param {bigint} packageId ID of package
	     * @param {FPackageStoreEntry} storeEntry Store entry of package
	     * @param {FPackageStore} globalPackageStore Package store
	     * @param {FileProvider} provider Instance of file provider
	     * @param {Ue4Version} game Version of package
	     */
	    constructor(uasset: Buffer, packageId: bigint, storeEntry: FPackageStoreEntry, globalPackageStore: FPackageStore, provider: FileProvider, game?: Ue4Version);
	    /**
	     * Resolves an object index
	     * @param {FPackageObjectIndex} index Object index to resolve
	     * @param {boolean} throwIfNotFound (default: true) Wether to throw an error if it wasn't found
	     * @returns {ResolvedExportObject | ResolvedScriptObject | null} Object
	     * @public
	     */
	    resolveObjectIndex(index: FPackageObjectIndex, throwIfNotFound?: boolean): ResolvedExportObject | ResolvedScriptObject;
	    /**
	     * Finds an object by FPackageIndex
	     * @param {FPackageIndex} index Index to look for
	     * @returns {?any} Object or null
	     * @public
	     */
	    findObject<T>(index?: FPackageIndex): T;
	    /**
	     * Finds an object by name
	     * @param {string} objectName Name of object
	     * @param {?string} className Class name of object
	     * @returns {?UObject} Object or null
	     * @public
	     */
	    findObjectByName(objectName: string, className?: string): UObject;
	    /**
	     * Turns this package into json
	     * @param {?Locres} locres Locres to use
	     * @returns {Array<IJson>} Json data
	     * @public
	     */
	    toJson(locres?: Locres): IJson[];
	    /**
	     * Finds an object minimal
	     * @param {?FPackageIndex} index Index to look for
	     * @returns {ResolvedExportObject | ResolvedScriptObject} Object
	     * @public
	     */
	    findObjectMinimal(index?: FPackageIndex): ResolvedExportObject | ResolvedScriptObject;
	}
	export class FImportedPackage {
	    importedPackageId: bigint;
	    externalArcs: FArc[];
	    constructor(Ar: FArchive);
	}
	export class FArc {
	    fromExportBundleIndex: number;
	    toExportBundleIndex: number;
	    constructor(Ar: FArchive);
	}
	export abstract class ResolvedObject {
	    pkg: IoPackage;
	    constructor(pkg: IoPackage);
	    abstract get name(): FName;
	    getOuter(): ResolvedObject;
	    getSuper(): ResolvedObject;
	    getObject(): Lazy<UObject>;
	}
	export class ResolvedExportObject extends ResolvedObject {
	    exportIndex: number;
	    exportMapEntry: FExportMapEntry;
	    exportObject: Lazy<UObject>;
	    constructor(exportIndex: number, pkg: IoPackage);
	    get name(): FName;
	    getOuter(): ResolvedExportObject | ResolvedScriptObject;
	    getSuper(): ResolvedExportObject | ResolvedScriptObject;
	    getObject(): Lazy<UObject>;
	}
	export class ResolvedScriptObject extends ResolvedObject {
	    scriptImport: FScriptObjectEntry;
	    constructor(scriptImport: FScriptObjectEntry, pkg: IoPackage);
	    get name(): FName;
	    getOuter(): ResolvedExportObject | ResolvedScriptObject;
	    getObject(): Lazy<UObject>;
	}

}
declare module 'ue4/assets/reader/FExportArchive' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { IoPackage } from 'ue4/assets/IoPackage';
	import { PayloadType } from 'ue4/assets/util/PayloadType';
	/**
	 * UE4 Export Reader
	 * @extends {FAssetArchive}
	 */
	export class FExportArchive extends FAssetArchive {
	    /**
	     * Buffer to read
	     * @type {Buffer}
	     * @public
	     */
	    data: Buffer;
	    /**
	     * UObject of this reader
	     * @type {UObject}
	     * @public
	     */
	    obj: UObject;
	    /**
	     * I/O Package of this reader
	     * @type {IoPackage}
	     * @public
	     */
	    pkg: IoPackage;
	    /**
	     * Creates an instance
	     * @param {Buffer} data Buffer to read
	     * @param {UObject} obj UObject of this reader
	     * @param {IoPackage}pkg I/O Package of this reader
	     * @constructor
	     * @public
	     */
	    constructor(data: Buffer, obj: UObject, pkg: IoPackage);
	    /**
	     * Gets payload
	     * @param {PayloadType} type Type of payload to get
	     * @returns {FAssetArchive} Reader
	     * @public
	     */
	    getPayload(type: PayloadType): FAssetArchive;
	    /**
	     * Checks a dummy name
	     * @param {string} dummyName Name to check
	     * @returns {void}
	     * @public
	     */
	    checkDummyName(dummyName: string): void;
	    /**
	     * Returns FExportArchive info for error
	     * @returns {string}
	     * @public
	     */
	    printError(): string;
	}

}
declare module 'ue4/assets/objects/FProperty' {
	import { UScriptArray } from 'ue4/assets/objects/UScriptArray';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FFieldPath } from 'ue4/objects/FFieldPath';
	import { UInterfaceProperty } from 'ue4/objects/uobject/UInterfaceProperty';
	import { FUniqueObjectGuid } from 'ue4/objects/uobject/FUniqueObjectGuid';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { PropertyType } from 'ue4/assets/objects/PropertyType';
	import { UScriptStruct } from 'ue4/assets/objects/UScriptStruct';
	import { FText } from 'ue4/objects/core/i18n/Text';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	import { UScriptMap } from 'ue4/objects/uobject/UScriptMap';
	import { FMulticastScriptDelegate, FScriptDelegate } from 'ue4/objects/uobject/ScriptDelegates';
	import { FSoftClassPath, FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	/**
	 * Represents a property
	 */
	export class FProperty {
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
	     * @returns {any}
	     * @public
	     */
	    toJsonValue(): any;
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
	     * @param {() => any} valueIfNonZero
	     * @param {() =>  any} valueIfZero
	     * @param {ReadType} type
	     * @returns {any}
	     * @public
	     * @static
	     */
	    static valueOr<T>(valueIfNonZero: () => T, valueIfZero: () => T, type: ReadType): T;
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
	export class BoolProperty extends FProperty {
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
	export class ByteProperty extends FProperty {
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
	export class ClassProperty extends FProperty {
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
	export class DelegateProperty extends FProperty {
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
	export class DoubleProperty extends FProperty {
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
	export class EnumProperty extends FProperty {
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
	export class FieldPathProperty extends FProperty {
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
	export class FloatProperty extends FProperty {
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
	export class Int16Property extends FProperty {
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
	export class Int64Property extends FProperty {
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
	export class Int8Property extends FProperty {
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
	export class IntProperty extends FProperty {
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
	export class InterfaceProperty extends FProperty {
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
	export class LazyObjectProperty extends FProperty {
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
	export class MapProperty extends FProperty {
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
	export class MulticastDelegateProperty extends FProperty {
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
	export class NameProperty extends FProperty {
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
	export class ObjectProperty extends FProperty {
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
	export class SetProperty extends FProperty {
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
	export class SoftClassProperty extends FProperty {
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
	export class SoftObjectProperty extends FProperty {
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
	export class StrProperty extends FProperty {
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
	export class StructProperty extends FProperty {
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
	export class TextProperty extends FProperty {
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
	    toJsonValue(): any;
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
	export class UInt32Property extends FProperty {
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
	export class UInt64Property extends FProperty {
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
	export class WeakObjectProperty extends FProperty {
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
	export enum ReadType {
	    NORMAL = "NORMAL",
	    MAP = "MAP",
	    ARRAY = "ARRAY",
	    ZERO = "ZERO"
	}

}
declare module 'ue4/assets/objects/FPropertyTag' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FProperty } from 'ue4/assets/objects/FProperty';
	import { PropertyType } from 'ue4/assets/objects/PropertyType';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	/**
	 * Represents a property tag
	 */
	export class FPropertyTag {
	    /**
	     * Property
	     * @type {FProperty}
	     * @public
	     */
	    prop: FProperty;
	    /**
	     * Type of property
	     * @type {FName}
	     * @public
	     */
	    type: FName;
	    /**
	     * A boolean property's value (never need to serialize data for bool properties except here)
	     * @type {boolean}
	     * @public
	     */
	    boolVal: boolean;
	    /**
	     * Name of property.
	     * @type {FName}
	     * @public
	     */
	    name: FName;
	    /**
	     * Struct name if FStructProperty
	     * @type {FName}
	     * @public
	     */
	    structName: FName;
	    /**
	     * Enum name if FByteProperty or FEnumProperty
	     * @type {FName}
	     * @public
	     */
	    enumName: FName;
	    /**
	     * Inner type if FArrayProperty, FSetProperty, or FMapProperty
	     * @type {FName}
	     * @public
	     */
	    innerType: FName;
	    /**
	     * Value type if UMapProperty
	     * @type {FName}
	     * @public
	     */
	    valueType: FName;
	    /**
	     * Property size
	     * @type {number}
	     * @public
	     */
	    size: number;
	    /**
	     * Index if an array; else 0
	     * @type {number}
	     * @public
	     */
	    arrayIndex: number;
	    /**
	     * Location in stream of tag size member
	     * @type {number}
	     * @public
	     */
	    sizeOffset: number;
	    /**
	     * Struct guid
	     * @type {?FGuid}
	     * @public
	     */
	    structGuid?: FGuid;
	    /**
	     * Wether if the property has a guid or not
	     * @type {boolean}
	     * @public
	     * @see {propertyGuid}
	     */
	    hasPropertyGuid: boolean;
	    /**
	     * Property guid
	     * @type {?FGuid}
	     * @public
	     * @see {hasPropertyGuid}
	     */
	    propertyGuid?: FGuid;
	    /**
	     * Type data
	     * @type {PropertyType}
	     * @public
	     */
	    typeData: PropertyType;
	    /**
	     * Creates an instance using FName
	     * @param {FName} name FName to use
	     * @constructor
	     * @public
	     */
	    constructor(name: FName);
	    /**
	     * Creates an instance using FAssetArchive and readData
	     * @param {FAssetArchive} Ar FAssetArchive to use
	     * @param {boolean} readData Wether to read data or no
	     * @constructor
	     * @public
	     */
	    constructor(Ar: FAssetArchive, readData: boolean);
	    /**
	     * Gets current tag type value
	     * @returns {any} Value
	     * @throws {Error}
	     * @public
	     */
	    getTagTypeValue(): any;
	    /**
	     * Sets current tag type value
	     * @param {any} value
	     * @returns {void}
	     * @public
	     */
	    setTagTypeValue(value: any): void;
	    /**
	     * Serializes this
	     * @param {FAssetArchiveWriter} Ar FAssetArchiveWriter to use
	     * @param {boolean} writeData Wether to write data or not
	     * @public
	     */
	    serialize(Ar: FAssetArchiveWriter, writeData: boolean): void;
	    /**
	     * Turns this into a string
	     * @returns {string} string
	     * @public
	     */
	    toString(): string;
	    /**
	     * Turns this into json
	     * @returns {any} json
	     * @public
	     */
	    toJson(): {
	        prop: any;
	        type: string;
	        boolVal: boolean;
	        name: string;
	        structName: string;
	        enumName: string;
	        innerType: string;
	        valueType: string;
	        size: number;
	        arrayIndex: number;
	        sizeOffset: number;
	        structGuid: string;
	        hasPropertyGuid: boolean;
	        propertyGuid: string;
	        typeData: string;
	    };
	}

}
declare module 'ue4/assets/objects/IPropertyHolder' {
	import { FPropertyTag } from 'ue4/assets/objects/FPropertyTag';
	/**
	 * Holds properties in an array
	 */
	export interface IPropertyHolder {
	    /**
	     * Properties
	     * @type {Array<FPropertyTag>}
	     * @public
	     */
	    properties: FPropertyTag[];
	}

}
declare module 'ue4/objects/uobject/serialization/UnversionedPropertySerialization' {
	import { PropertyInfo } from 'ue4/assets/objects/PropertyInfo';
	import { ReadType } from 'ue4/assets/objects/FProperty';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FPropertyTag } from 'ue4/assets/objects/FPropertyTag';
	import { UStruct } from 'ue4/assets/exports/UStruct';
	import BitSet from 'bitset';
	import { FArchive } from 'ue4/reader/FArchive';
	import { UnrealMap } from 'util/UnrealMap';
	export class FUnversionedPropertySerializer {
	    info: PropertyInfo;
	    arrayIndex: number;
	    constructor(info: PropertyInfo, type: number);
	    deserialize(Ar: FAssetArchive, type: ReadType): FPropertyTag;
	    toString(): string;
	}
	export class FUnversionedStructSchema {
	    serializers: FUnversionedPropertySerializer[];
	    constructor(struct: UStruct);
	}
	export const schemaCache: UnrealMap<any, FUnversionedStructSchema>;
	export function getOrCreateUnversionedSchema(struct: UStruct): FUnversionedStructSchema;
	export class FUnversionedHeader {
	    fragments: FFragment[];
	    bHasNonZeroValues: boolean;
	    zeroMask: BitSet;
	    load(Ar: FArchive): void;
	    hasValues(): number | true;
	    protected loadZeroMaskData(Ar: FArchive, numBits: number): BitSet;
	}
	export class FFragment {
	    SKIP_MAX: number;
	    VALUE_MAX: number;
	    SKIP_NUM_MASK: number;
	    HAS_ZERO_MASK: number;
	    VALUE_NUM_SHIFT: number;
	    IS_LAST_MASK: number;
	    /** Number of properties to skip before values */
	    skipNum: number;
	    bHasAnyZeroes: boolean;
	    /** Number of subsequent property values stored */
	    valueNum: number;
	    /** Is this the last fragment of the header? */
	    bIsLast: boolean;
	    constructor(int: number);
	}
	export class FIterator {
	    bDone: boolean;
	    header: FUnversionedHeader;
	    private schemas;
	    schemaIt: number;
	    private fragmentIt;
	    private zeroMaskIndex;
	    private remainingFragmentValues;
	    private get zeroMask();
	    private get fragments();
	    constructor(header: FUnversionedHeader, schemas: FUnversionedPropertySerializer[]);
	    next(): void;
	    get serializer(): FUnversionedPropertySerializer;
	    isNonZero(): boolean;
	    private skip;
	}
	export function deserializeUnversionedProperties(properties: FPropertyTag[], struct: UStruct, Ar: FAssetArchive): void;

}
declare module 'ue4/assets/exports/UObject' {
	import { IPropertyHolder } from 'ue4/assets/objects/IPropertyHolder';
	import { FPropertyTag } from 'ue4/assets/objects/FPropertyTag';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FObjectExport } from 'ue4/objects/uobject/ObjectResource';
	import { Package } from 'ue4/assets/Package';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { Locres } from 'ue4/locres/Locres';
	import { StringBuilder } from 'util/StringBuilder';
	import { Lazy } from 'util/Lazy';
	export class UObject implements IPropertyHolder {
	    name: string;
	    outer: UObject;
	    clazz: any;
	    template: Lazy<UObject>;
	    properties: FPropertyTag[];
	    objectGuid: FGuid;
	    flags: number;
	    export: FObjectExport;
	    get owner(): Package;
	    get exportType(): string;
	    constructor(properties?: FPropertyTag[]);
	    set<T>(name: string, value: T): void;
	    getOrDefault<T>(name: string, dflt: T): T;
	    getOrNull<T>(name: string): T;
	    get<T>(name: string): T;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	    serialize(Ar: FAssetArchiveWriter): void;
	    toJson(locres?: Locres): any;
	    clearFlags(newFlags: number): void;
	    hasAnyFlags(flagsToCheck: number): boolean;
	    getFullName(stopOuter: UObject, includeClassPackage: boolean): any;
	    getFullName(stopOuter: UObject, resultString: StringBuilder, includeClassPackage: boolean): any;
	    getPathName(stopouter?: UObject): any;
	    getPathName(stopouter: UObject, resultString: StringBuilder): any;
	    toString(): string;
	}
	export function deserializeVersionedTaggedProperties(properties: FPropertyTag[], Ar: FAssetArchive): void;
	export function serializeProperties(Ar: FAssetArchiveWriter, properties: FPropertyTag[]): void;

}
declare module 'ue4/objects/uobject/ObjectResource' {
	import { Package } from 'ue4/assets/Package';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	import { Lazy } from 'util/Lazy';
	export class FPackageIndex {
	    index: number;
	    owner: Package;
	    get name(): FName;
	    constructor();
	    constructor(Ar: FAssetArchive);
	    constructor(index: number, owner?: Package);
	    isImport(): boolean;
	    isExport(): boolean;
	    isNull(): boolean;
	    toImport(): number;
	    toExport(): number;
	    equals(other: any): boolean;
	    serialize(Ar: FArchiveWriter): void;
	    toString(): string;
	    load<T extends UObject>(): T;
	}
	export abstract class FObjectResource {
	    objectName: FName;
	    outerIndex: FPackageIndex;
	}
	export class FObjectExport extends FObjectResource {
	    classIndex: FPackageIndex;
	    superIndex: FPackageIndex;
	    templateIndex: FPackageIndex;
	    objectFlags: number;
	    serialSize: number;
	    serialOffset: number;
	    forcedExport: boolean;
	    notForClient: boolean;
	    notForServer: boolean;
	    packageGuid: FGuid;
	    packageFlags: number;
	    notAlwaysLoadedForEditorGame: boolean;
	    isAsset: boolean;
	    firstExportDependency: number;
	    serializationBeforeSerializationDependencies: number;
	    createBeforeSerializationDependencies: number;
	    serializationBeforeCreateDependencies: number;
	    createBeforeCreateDependencies: number;
	    exportObject: Lazy<UObject>;
	    constructor(Ar: FAssetArchive);
	    constructor(classIndex: FPackageIndex, superIndex: FPackageIndex, templateIndex: FPackageIndex, outerIndex: FPackageIndex, objectName: FName, objectFlags: number, serialSize: number, serialOffset: number, forcedExport: boolean, notForClient: boolean, notForServer: boolean, packageGuid: FGuid, packageFlags: number, notAlwaysLoadedForEditorGame: boolean, isAsset: boolean, firstExportDependency: number, serializationBeforeSerializationDependencies: number, createBeforeSerializationDependencies: number, serializationBeforeCreateDependencies: number, createBeforeCreateDependencies: number);
	    toString(): string;
	    serialize(Ar: FAssetArchiveWriter): void;
	}
	export class FObjectImport extends FObjectResource {
	    classPackage: FName;
	    className: FName;
	    constructor(Ar: FAssetArchive);
	    constructor(classPackage: FName, className: FName, outerIndex: FPackageIndex, objectName: FName);
	    serialize(Ar: any): void;
	    toString(): string;
	}

}
declare module 'ue4/assets/Package' {
	import { FileProvider } from 'fileprovider/FileProvider';
	import { Ue4Version } from 'ue4/versions/Game';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { UStruct } from 'ue4/assets/exports/UStruct';
	import { Locres } from 'ue4/locres/Locres';
	import { Lazy } from 'util/Lazy';
	/**
	 * UE4 Package
	 * @abstract
	 * @extends {UObject}
	 */
	export abstract class Package extends UObject {
	    /**
	     * Name of package file
	     * @type {string}
	     * @public
	     */
	    fileName: string;
	    /**
	     * File provider
	     * @type {FileProvider}
	     * @public
	     */
	    provider?: FileProvider;
	    /**
	     * Game which is used
	     * @type {Ue4Version}
	     * @public
	     */
	    game: Ue4Version;
	    /**
	     * Creates an instnace
	     * @param {string} fileName Name of file
	     * @param {FileProvider} provider File provider
	     * @param {Ue4Version} game Game which is used
	     * @constructor
	     * @protected
	     */
	    protected constructor(fileName: string, provider: FileProvider, game: Ue4Version);
	    /**
	     * Stores lazy exports
	     * @type {Array<Lazy<UObject>>}
	     * @public
	     */
	    abstract exportsLazy: Lazy<UObject>[];
	    /**
	     * Returns exports
	     * @type {Array<UObject>}
	     * @public
	     */
	    get exports(): UObject[];
	    /**
	     * Package flags
	     * @type {number}
	     * @public
	     */
	    packageFlags: number;
	    /**
	     * Constructs an export from UStruct
	     * @param {UStruct} struct Struct to use
	     * @returns {UObject} Constructed export
	     * @protected
	     */
	    protected static constructExport(struct: UStruct): UObject;
	    /**
	     * Gets an export of specific type
	     * @param {Function} type The class object which is either UObject or extends it
	     * @returns {any} the first export of the given type
	     * @throws {TypeError} if there is no export of the given type
	     * @example getExportOfType(CharacterAbilityUIData)
	     * @public
	     */
	    getExportOfType(type: Function): UObject;
	    /**
	     * Gets an export of specific type
	     * @param {Function} type The class object which is either UObject or extends it
	     * @returns {?any} the first export of the given type or null
	     * @example getExportOfTypeOrNull(CharacterAbilityUIData)
	     * @public
	     */
	    getExportOfTypeOrNull(type: Function): UObject;
	    /**
	     * Gets an exports of specific type
	     * @param {Function} type The class object which is either UObject or extends it
	     * @returns {any[]} the first export of the given type or null
	     * @example getExportsOfType(CharacterAbilityUIData)
	     * @public
	     */
	    getExportsOfType(type: Function): UObject[];
	    /**
	     * Finds an object by index
	     * @param {FPackageIndex} index Index to find
	     * @returns {?any} Object or null
	     * @abstract
	     * @public
	     */
	    abstract findObject<T>(index: FPackageIndex): T;
	    /**
	     * Loads an object by index
	     * @param {FPackageIndex} index Index to find
	     * @returns {?any} Object or null
	     * @public
	     */
	    loadObject<T>(index: FPackageIndex): T;
	    /**
	     * Finds an object by name
	     * @param {string} objectName Name of object
	     * @param {?string} className Class name of object
	     * @returns {?UObject} Object or null
	     * @abstract
	     * @public
	     */
	    abstract findObjectByName(objectName: string, className?: string): UObject;
	    /**
	     * Turns this package to json
	     * @param {?Locres} locres Locres to use
	     * @returns {Array<IJson>}
	     * @public
	     * @abstract
	     */
	    abstract toJson(locres?: Locres): IJson[];
	}
	/**
	 * Represents a json result of a package
	 */
	export interface IJson {
	    type: string;
	    name: string;
	    properties: any;
	}

}
declare module 'ue4/objects/core/misc/EngineVersionBase' {
	export enum EVersionComponent {
	    /** Major version increments introduce breaking API changes. */
	    Major = "Major",
	    /** Minor version increments add additional functionality without breaking existing APIs. */
	    Minor = "Minor",
	    /** Patch version increments fix existing functionality without changing the API. */
	    Patch = "Patch",
	    /** The pre-release field adds additional versioning through a series of comparable dotted strings or numbers. */
	    ChangeList = "ChangeList",
	    Branch = "Branch"
	}
	export enum EVersionComparison {
	    Neither = "Neither",
	    First = "First",
	    Second = "Second"
	}
	export class FEngineVersionBase {
	    /** Major version number. */
	    major: number;
	    /** Minor version number. */
	    minor: number;
	    /** Patch version number. */
	    patch: number;
	    _changelist: number;
	    get changelist(): number;
	    constructor(major?: number, minor?: number, patch?: number, _changelist?: number);
	    isLicenseeVersion(): boolean;
	    isEmpty(): boolean;
	    hasChangelist(): boolean;
	    encodeLicenseeChangelist(changelist: number): number;
	}

}
declare module 'ue4/objects/core/misc/EngineVersion' {
	import { EVersionComponent, FEngineVersionBase } from 'ue4/objects/core/misc/EngineVersionBase';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FEngineVersion extends FEngineVersionBase {
	    branch: string;
	    constructor(Ar: FArchive);
	    constructor(major: number, minor: number, patch: number, changelist: number, branch: string);
	    serialize(Ar: FArchiveWriter): void;
	    toString(): any;
	    toString(lastComponent: EVersionComponent): any;
	}

}
declare module 'ue4/assets/objects/FCompressedChunk' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FCompressedChunk {
	    /**
	     * Uncompressed offset
	     * @type {number}
	     * @public
	     */
	    uncompressedOffset: number;
	    /**
	     * Uncompressed size
	     * @type {number}
	     * @public
	     */
	    uncompressedSize: number;
	    /**
	     * Compressed offset
	     * @type {number}
	     * @public
	     */
	    compressedOffset: number;
	    /**
	     * Compressed size
	     * @type {number}
	     * @public
	     */
	    compressedSize: number;
	    /**
	     * Creates an instance using FArchive
	     * @param {FArchive} Ar FArchive to use
	     * @constructor
	     * @public
	     */
	    constructor(Ar: FArchive);
	    /**
	     * Creates an instance using uncompressedOffset, uncompressedSize, compressedOffset & compressedSize
	     * @param {number} uncompressedOffset
	     * @param {number} uncompressedSize
	     * @param {number} compressedOffset
	     * @param {number} compressedSize
	     * @constructor
	     * @public
	     */
	    constructor(uncompressedOffset: number, uncompressedSize: number, compressedOffset: number, compressedSize: number);
	    /**
	     * Serializes this
	     * @param {FArchiveWriter} Ar FArchiveWriter to use
	     * @returns {void}
	     * @public
	     */
	    serialize(Ar: FArchiveWriter): void;
	}

}
declare module 'ue4/objects/core/serialization/CustomVersion' {
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FCustomVersion {
	    key: FGuid;
	    version: number;
	    constructor(Ar: FArchive);
	    constructor(key: FGuid, version: number);
	    serialize(Ar: FArchiveWriter): void;
	}

}
declare module 'ue4/objects/uobject/PackageFileSummary' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FEngineVersion } from 'ue4/objects/core/misc/EngineVersion';
	import { FCompressedChunk } from 'ue4/assets/objects/FCompressedChunk';
	import { FCustomVersion } from 'ue4/objects/core/serialization/CustomVersion';
	export class FGenerationInfo {
	    /**
	     * Number of exports in the linker's ExportMap for this generation.
	     */
	    exportCount: number;
	    /**
	     * Number of names in the linker's NameMap for this generation.
	     */
	    nameCount: number;
	    constructor(Ar: FArchive);
	    constructor(exportCount: number, nameCount: number);
	    serialize(Ar: FArchiveWriter): void;
	}
	/**
	 * A "table of contents" for an Unreal package file.  Stored at the top of the file.
	 */
	export class FPackageFileSummary {
	    tag: number;
	    legacyFileVersion: number;
	    legacyUE3Version: number;
	    fileVersionUE4: number;
	    fileVersionLicenseUE4: number;
	    customVersionContainer: FCustomVersion[];
	    totalHeaderSize: number;
	    folderName: string;
	    packageFlags: number;
	    nameCount: number;
	    nameOffset: number;
	    gatherableTextDataCount: number;
	    gatherableTextDataOffset: number;
	    exportCount: number;
	    exportOffset: number;
	    importCount: number;
	    importOffset: number;
	    dependsOffset: number;
	    softPackageReferencesCount: number;
	    softPackageReferencesOffset: number;
	    searchableNamesOffset: number;
	    thumbnailTableOffset: number;
	    guid: FGuid;
	    generations: Array<FGenerationInfo>;
	    savedByEngineVersion: FEngineVersion;
	    compatibleWithEngineVersion: FEngineVersion;
	    compressionFlags: number;
	    compressedChunks: FCompressedChunk[];
	    packageSource: number;
	    additionalPackagesToCook: string[];
	    assetRegistryDataOffset: number;
	    bulkDataStartOffset: number;
	    worldTileInfoDataOffset: number;
	    chunkIds: number[];
	    preloadDependencyCount: number;
	    preloadDependencyOffset: number;
	    constructor(Ar: FArchive);
	    constructor(tag: number, legacyFileVersion: number, legacyUE3Version: number, fileVersionUE4: number, fileVersionLicenseUE4: number, customVersionContainer: FCustomVersion[], totalHeaderSize: number, folderName: string, packageFlags: number, nameCount: number, nameOffset: number, gatherableTextDataCount: number, gatherableTextDataOffset: number, exportCount: number, exportOffset: number, importCount: number, importOffset: number, dependsOffset: number, softPackageReferencesCount: number, softPackageReferencesOffset: number, searchableNamesOffset: number, thumbnailTableOffset: number, guid: FGuid, generations: FGenerationInfo[], savedByEngineVersion: FEngineVersion, compatibleWithEngineVersion: FEngineVersion, compressionFlags: number, compressedChunks: FCompressedChunk[], packageSource: number, additionalPackagesToCook: string[], assetRegistryDataOffset: number, bulkDataStartOffset: number, worldTileInfoDataOffset: number, chunkIds: number[], preloadDependencyCount: number, preloadDependencyOffset: number);
	    serialize(Ar: FArchiveWriter): void;
	}

}
declare module 'ue4/assets/ObjectTypeRegistry' {
	export class ObjectTypeRegistry {
	    static registry: {};
	    static init(): Promise<void>;
	    private static registerEngine;
	    private static registerFortnite;
	    private static registerValorant;
	    static registerClass(clazz: any): any;
	    static registerClass(serializedName: string, clazz: any): any;
	    static get(name: string): any;
	}

}
declare module 'ue4/assets/PakPackage' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FileProvider } from 'fileprovider/FileProvider';
	import { Ue4Version } from 'ue4/versions/Game';
	import { FNameEntry } from 'ue4/objects/uobject/FName';
	import { IJson, Package } from 'ue4/assets/Package';
	import { FPackageFileSummary } from 'ue4/objects/uobject/PackageFileSummary';
	import { FObjectExport, FObjectImport, FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { Locres } from 'ue4/locres/Locres';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	import { WritableStreamBuffer } from 'stream-buffers';
	import { Lazy } from 'util/Lazy';
	/**
	 * UE4 Pak Package
	 * @extends {Package}
	 */
	export class PakPackage extends Package {
	    /**
	     * Pak magic
	     * @type {number}
	     * @protected
	     */
	    protected packageMagic: number;
	    /**
	     * UASSET data
	     * @type {Buffer}
	     * @public
	     */
	    uasset: Buffer;
	    /**
	     * UEXP data
	     * @type {?Buffer}
	     * @public
	     */
	    uexp?: Buffer;
	    /**
	     * UBULK data
	     * @type {?Buffer}
	     * @public
	     */
	    ubulk?: Buffer;
	    /**
	     * Name of package file
	     * @type {string}
	     * @public
	     */
	    fileName: string;
	    /**
	     * File provider
	     * @type {?FileProvider}
	     * @public
	     */
	    provider?: FileProvider;
	    /**
	     * Game that is used
	     * @type {Ue4Version}
	     * @public
	     */
	    game: Ue4Version;
	    /**
	     * Version that is used
	     * @type {number}
	     * @public
	     */
	    version: number;
	    /**
	     * Information about package
	     * @type {FPackageFileSummary}
	     * @public
	     */
	    info: FPackageFileSummary;
	    /**
	     * Name map
	     * @type {Array<FNameEntry>}
	     * @public
	     */
	    nameMap: FNameEntry[];
	    /**
	     * Import map
	     * @type {Array<FObjectImport>}
	     * @public
	     */
	    importMap: FObjectImport[];
	    /**
	     * Export map
	     * @type {Array<FObjectExport>}
	     * @public
	     */
	    exportMap: FObjectExport[];
	    /**
	     * Stores lazy exports
	     * @type {Array<Lazy<UObject>>}
	     * @public
	     */
	    get exportsLazy(): Lazy<UObject>[];
	    /**
	     * Creates an instance
	     * @param {Buffer} uasset Uasset data
	     * @param {?Buffer} uexp Uexp data
	     * @param {?Buffer} ubulk Ubulk data
	     * @param {string} name Name of package file
	     * @param {?FileProvider} provider File provider
	     * @param {?Ue4Version} game Game that is used
	     * @constructor
	     * @public
	     */
	    constructor(uasset: Buffer, uexp: Buffer, ubulk: Buffer, name: string, provider?: FileProvider, game?: Ue4Version);
	    /**
	     * Finds an object by index
	     * @param {?FPackageIndex} index Index to find
	     * @returns {?any} Object or null
	     * @public
	     */
	    findObject<T>(index?: FPackageIndex): T;
	    /**
	     * Loads an import
	     * @param {?FObjectImport} imp Import to load
	     * @returns {?UObject} Object or null
	     * @public
	     */
	    loadImport(imp?: FObjectImport): UObject;
	    /**
	     * Finds an import
	     * @param {?FObjectImport} imp Import to load
	     * @returns {?UObject} Object or null
	     * @public
	     */
	    findImport(imp?: FObjectImport): UObject;
	    /**
	     * Finds an object by name
	     * @param {string} objectName Name of object
	     * @param {?string} className Class name of object
	     * @returns {?UObject} Object or null
	     * @public
	     */
	    findObjectByName(objectName: string, className?: string): UObject;
	    /**
	     * Gets an import object
	     * @param {FPackageIndex} imp Import to find
	     * @returns {?FObjectImport} Import or null
	     * @public
	     */
	    getImportObject(imp: FPackageIndex): FObjectImport;
	    /**
	     * Gets an export object
	     * @param {FPackageIndex} imp Export to find
	     * @returns {?FObjectExport} Export or null
	     * @public
	     */
	    getExportObject(imp: FPackageIndex): FObjectExport;
	    /**
	     * Gets either export or import object
	     * @param {FPackageIndex} imp Index to find
	     * @returns {FObjectImport | FObjectExport | null} Object or null
	     * @public
	     */
	    getResource(imp: FPackageIndex): FObjectImport | FObjectExport;
	    /**
	     * Turns this into json
	     * @param {?Locres} locres Locres to use
	     * @returns {Array<IJson>} Json
	     * @public
	     */
	    toJson(locres?: Locres): IJson[];
	    /**
	     * Gets a package from index
	     * @param {FPackageIndex} imp Package to get
	     * @returns {?Package} Package or null
	     * @private
	     */
	    private getPackage;
	    updateHeader(): void;
	    write(uassetOutputStream: WritableStreamBuffer, uexpOutputStream: WritableStreamBuffer, ubulkOutputStream?: WritableStreamBuffer): void;
	    writer(outputStream: WritableStreamBuffer): FAssetArchiveWriter;
	}

}
declare module 'ue4/assets/reader/FAssetArchive' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FByteArchive } from 'ue4/reader/FByteArchive';
	import { FileProvider } from 'fileprovider/FileProvider';
	import { PayloadType } from 'ue4/assets/util/PayloadType';
	import { FName } from 'ue4/objects/uobject/FName';
	import { Package } from 'ue4/assets/Package';
	import { FArchive } from 'ue4/reader/FArchive';
	/**
	 * UE4 Asset Reader
	 * @extends {FByteArchive}
	 */
	export class FAssetArchive extends FByteArchive {
	    /**
	     * Buffer to read
	     * @type {Buffer}
	     * @public
	     */
	    data: Buffer;
	    /**
	     * File provider
	     * @type {FileProvider}
	     * @public
	     */
	    provider?: FileProvider;
	    /**
	     * Name of package
	     * @type {string}
	     * @public
	     */
	    pkgName: string;
	    /**
	     * Creates an instace
	     * @param {Buffer} data Data to read
	     * @param {?FileProvider} provider File provider
	     * @param {string} pkgName Name of package
	     * @constructor
	     * @public
	     */
	    constructor(data: Buffer, provider: FileProvider, pkgName: string);
	    /**
	     * Package which uses this reader
	     * @type {Package}
	     * @public
	     */
	    owner: Package;
	    /**
	     * Payloads
	     * @type {Map<PayloadType, FAssetArchive>}
	     * @protected
	     */
	    protected payloads: Map<PayloadType, FAssetArchive>;
	    /**
	     * Size of uasset data
	     * @type {number}
	     * @public
	     */
	    uassetSize: number;
	    /**
	     * Size of uexp data
	     * @type {number}
	     * @public
	     */
	    uexpSize: number;
	    /**
	     * Start offset of bulk data
	     * @type {number}
	     * @public
	     */
	    bulkDataStartOffset: number;
	    /**
	     * Gets payload
	     * @param {PayloadType} type Type of payload to get
	     * @returns {FArchive} UE4 Reader
	     * @public
	     */
	    getPayload(type: PayloadType): FArchive;
	    /**
	     * Add a payload
	     * @param {PayloadType} type Type of payload to add
	     * @param {FAssetArchive} payload Reader to add
	     * @returns {Map<PayloadType, FAssetArchive>} Updated map
	     * @public
	     */
	    addPayload(type: PayloadType, payload: FAssetArchive): Map<PayloadType, FAssetArchive>;
	    /**
	     * Clones this reader
	     * @returns {FAssetArchive} Cloned reader
	     * @public
	     */
	    clone(): FAssetArchive;
	    /**
	     * Seeks to relative
	     * @param {number} pos Position to seek to
	     * @returns {void}
	     * @public
	     */
	    seekRelative(pos: number): void;
	    /**
	     * Gets relative position
	     * @returns {number} Position
	     * @public
	     */
	    relativePos(): number;
	    /**
	     * Turns a normal pos to relative
	     * @param {number} normalPos Normal position
	     * @returns {number} Relative position
	     * @public
	     */
	    toRelativePos(normalPos: number): number;
	    /**
	     * Turns a relative pos to normal
	     * @param {number} relativePos Relative position
	     * @returns {number} Normal position
	     * @public
	     */
	    toNormalPos(relativePos: number): number;
	    /**
	     * Handles bad FName index
	     * @param {number} nameIndex Bad index
	     * @throws {ParserException}
	     * @public
	     */
	    handleBadNameIndex(nameIndex: number): void;
	    /**
	     * Reads FName
	     * @returns {FName} Read data
	     * @public
	     */
	    readFName(): FName;
	    /**
	     * Returns FAssetArchive info for error
	     * @returns {string} Info
	     * @public
	     */
	    printError(): string;
	    /**
	     * Reads an object
	     * @returns {?any} Read object or null
	     * @public
	     */
	    readObject<T>(): T;
	}

}
declare module 'ue4/objects/core/math/FColor' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FLinearColor implements IStructType {
	    r: number;
	    g: number;
	    b: number;
	    a: number;
	    constructor();
	    constructor(Ar: FArchive);
	    constructor(r: number, g: number, b: number, a: number);
	    /** Quantizes the linear color and returns the result as a FColor.  This bypasses the SRGB conversion. */
	    quantize(): FColor;
	    /** Quantizes the linear color with rounding and returns the result as a FColor.  This bypasses the SRGB conversion. */
	    quantizeRound(): FColor;
	    /** Quantizes the linear color and returns the result as a FColor with optional sRGB conversion and quality as goal. */
	    toFColor(srgb: boolean): FColor;
	    toString(): string;
	    toJson(): any;
	}
	/**
	 * Stores a color with 8 bits of precision per channel.
	 *
	 * Note: Linear color values should always be converted to gamma space before stored in an FColor, as 8 bits of precision is not enough to store linear space colors!
	 * This can be done with FLinearColor.toFColor(true)
	 */
	export class FColor implements IStructType {
	    r: number;
	    g: number;
	    b: number;
	    a: number;
	    constructor();
	    constructor(Ar: FArchive);
	    constructor(r: number, g: number, b: number, a: number);
	    serialize(Ar: FArchiveWriter): void;
	    /**
	     * Converts this color value to a hexadecimal string.
	     *
	     * The format of the string is RRGGBBAA.
	     *
	     * @return Hexadecimal string.
	     */
	    toHex(): string;
	    /**
	     * Converts this color value to a string.
	     *
	     * @return The string representation.
	     */
	    toString(): string;
	    /**
	     * Gets the color in a packed int32 format packed in the order ARGB.
	     */
	    toPackedARGB(): number;
	    /**
	     * Gets the color in a packed int32 format packed in the order ABGR.
	     */
	    toPackedABGR(): number;
	    /**
	     * Gets the color in a packed int32 format packed in the order RGBA.
	     */
	    toPackedRGBA(): number;
	    /**
	     * Gets the color in a packed int32 format packed in the order BGRA.
	     */
	    toPackedBGRA(): number;
	    toJson(): {
	        r: number;
	        g: number;
	        b: number;
	        a: number;
	    };
	}

}
declare module 'ue4/objects/core/math/FIntPoint' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FIntPoint implements IStructType {
	    x: number;
	    y: number;
	    constructor(Ar: FArchive);
	    constructor(x: number, y: number);
	    serialize(Ar: FArchiveWriter): void;
	    toString(): string;
	    toJson(): any;
	}

}
declare module 'ue4/objects/core/math/FIntVector' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FIntVector implements IStructType {
	    x: number;
	    y: number;
	    z: number;
	    constructor(Ar: FArchive);
	    constructor(x: number, y: number, z: number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/core/math/FVector2D' {
	/**
	 * A vector in 2-D space composed of components (X, Y) with floating point precision.
	 */
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FVector2D implements IStructType {
	    /** Vector's X component. */
	    x: number;
	    /** Vector's Y component. */
	    y: number;
	    /**
	     * - Constructor which initializes all components to zero.
	     */
	    constructor();
	    /**
	     * - Constructor which initializes all components using FArchive
	     */
	    constructor(Ar: FArchive);
	    /**
	     * - Constructor using initial values for each component.
	     *
	     * @param x X coordinate.
	     * @param y Y coordinate.
	     */
	    constructor(x: number, y: number);
	    serialize(Ar: FArchiveWriter): void;
	    toString(): string;
	    toJson(): any;
	}

}
declare module 'ue4/objects/core/math/FVector4' {
	import { FVector } from 'ue4/objects/core/math/FVector';
	import { FVector2D } from 'ue4/objects/core/math/FVector2D';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FLinearColor } from 'ue4/objects/core/math/FColor';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FVector4 implements IStructType {
	    /** The vector's X-component. */
	    x: number;
	    /** The vector's Y-component. */
	    y: number;
	    /** The vector's Z-component. */
	    z: number;
	    /** The vector's W-component. */
	    w: number;
	    /**
	     * - Constructor which initializes all components to 0.0
	     */
	    constructor();
	    /**
	     * - Constructor which initializes all components using FArchive
	     */
	    constructor(Ar: FArchive);
	    /**
	     * - Constructor.
	     *
	     * @param vector 3D Vector to set first three components.
	     * @param w W Coordinate.
	     */
	    constructor(vector: FVector, w: number);
	    /**
	     * - Creates and initializes a new vector from a color value.
	     *
	     * @param color Color used to set vector.
	     */
	    constructor(color: FLinearColor);
	    /**
	     * - Creates and initializes a new vector from the specified components.
	     *
	     * @param x X Coordinate.
	     * @param y Y Coordinate.
	     * @param z Z Coordinate.
	     * @param w W Coordinate.
	     */
	    constructor(x: number, y: number, z: number, w: number);
	    /**
	     * - Creates and initializes a new vector from the specified 2D vectors.
	     *
	     * @param xy A 2D vector holding the X- and Y-components.
	     * @param zw A 2D vector holding the Z- and W-components.
	     */
	    constructor(xy: FVector2D, zw: FVector2D);
	    toJson(): any;
	}

}
declare module 'ue4/objects/core/math/UnrealMathUtility' {
	export const SMALL_NUMBER = 1e-8;
	export const KINDA_SMALL_NUMBER = 0.0001;
	/** Multiples value by itself */
	export function square(a: number): number;
	/**
	 * Checks if a floating point number is nearly zero.
	 * @param value Number to compare
	 * @param errorTolerance Maximum allowed difference for considering Value as 'nearly zero'
	 * @return true if Value is nearly zero
	 */
	export function isNearlyZero(value: number, errorTolerance?: number): boolean;
	/** Performs a linear interpolation between two values, alpha ranges from 0-1 */
	export function lerp(a: number, b: number, alpha: number): number;

}
declare module 'ue4/objects/core/math/FVector' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FVector2D } from 'ue4/objects/core/math/FVector2D';
	import { FVector4 } from 'ue4/objects/core/math/FVector4';
	import { FLinearColor } from 'ue4/objects/core/math/FColor';
	import { FIntVector } from 'ue4/objects/core/math/FIntVector';
	import { FIntPoint } from 'ue4/objects/core/math/FIntPoint';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FVector implements IStructType {
	    /** Vector's X component. */
	    x: number;
	    /** Vector's Y component. */
	    y: number;
	    /** Vector's Z component. */
	    z: number;
	    /** Default constructor (no initialization). */
	    constructor();
	    /**
	     * - Constructor initializing all components to a single float value.
	     *
	     * @param f Value to set all components to.
	     */
	    constructor(f: number);
	    /**
	     * - Constructor initializing all components using FArchive
	     *
	     * @param Ar FArchive to use.
	     */
	    constructor(Ar: FArchive);
	    /**
	     * - Constructor using the XYZ components from a 4D vector.
	     *
	     * @param v 4D Vector to copy from.
	     */
	    constructor(v: FVector4);
	    /**
	     * - Constructs a vector from an FLinearColor.
	     *
	     * @param color Color to copy from.
	     */
	    constructor(color: FLinearColor);
	    /**
	     * - Constructs a vector from an FIntVector.
	     *
	     * @param vector FIntVector to copy from.
	     */
	    constructor(vector: FIntVector);
	    /**
	     * - Constructs a vector from an FIntPoint.
	     *
	     * @param a Int Point used to set X and Y coordinates, Z is set to zero.
	     */
	    constructor(a: FIntPoint);
	    /**
	     * - Constructs a vector from an FVector2D and Z value.
	     *
	     * @param v Vector to copy from.
	     * @param z Z Coordinate.
	     */
	    constructor(v: FVector2D, z: number);
	    /**
	     * - Constructor using initial values for each component.
	     *
	     * @param x X Coordinate.
	     * @param y Y Coordinate.
	     * @param z Z Coordinate.
	     */
	    constructor(x: number, y: number, z: number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	    /**
	     * Copy another FVector into this one
	     *
	     * @param other The other vector.
	     * @return Reference to vector after copy.
	     */
	    set(other: FVector): FVector;
	    /**
	     * Calculate cross product between this and another vector.
	     *
	     * @param v The other vector.
	     * @return The cross product.
	     */
	    xor(v: FVector): FVector;
	    /**
	     * Calculate the dot product between this and another vector.
	     *
	     * @param v The other vector.
	     * @return The dot product.
	     */
	    or(v: FVector): number;
	    /**
	     * Gets the result of component-wise addition of this and another vector.
	     *
	     * @param v The vector to add to this.
	     * @return The result of vector addition.
	     */
	    plus0(v: FVector): FVector;
	    /**
	     * Gets the result of adding to each component of the vector.
	     *
	     * @param bias How much to add to each component.
	     * @return The result of addition.
	     */
	    plus1(bias: number): FVector;
	    /**
	     * Gets the result of component-wise subtraction of this by another vector.
	     *
	     * @param v The vector to subtract from this.
	     * @return The result of vector subtraction.
	     */
	    minus0(v: FVector): FVector;
	    /**
	     * Gets the result of subtracting from each component of the vector.
	     *
	     * @param bias How much to subtract from each component.
	     * @return The result of subtraction.
	     */
	    minus1(bias: number): FVector;
	    /**
	     * Gets the result of component-wise multiplication of this vector by another.
	     *
	     * @param v The vector to multiply with.
	     * @return The result of multiplication.
	     */
	    times0(v: FVector): FVector;
	    /**
	     * Gets the result of scaling the vector (multiplying each component by a value).
	     *
	     * @param scale What to multiply each component by.
	     * @return The result of multiplication.
	     */
	    times1(scale: number): FVector;
	    /**
	     * Gets the result of component-wise division of this vector by another.
	     *
	     * @param v The vector to divide by.
	     * @return The result of division.
	     */
	    div0(v: FVector): FVector;
	    /**
	     * Gets the result of dividing each component of the vector by a value.
	     *
	     * @param scale What to divide each component by.
	     * @return The result of division.
	     */
	    div1(scale: number): FVector;
	    equals(other: any): any;
	    equals(v: FVector, tolerance: number): any;
	    allComponentsEqual(tolerance?: number): boolean;
	    /**
	     * Get a negated copy of the vector.
	     *
	     * @return A negated copy of the vector.
	     */
	    unaryMinus(): FVector;
	    /**
	     * Adds another vector to this.
	     * Uses component-wise addition.
	     *
	     * @param v Vector to add to this.
	     */
	    plusAssign(v: FVector): void;
	    /**
	     * Subtracts another vector from this.
	     * Uses component-wise subtraction.
	     *
	     * @param v Vector to subtract from this.
	     */
	    minusAssign(v: FVector): void;
	    /**
	     * Scales the vector.
	     *
	     * @param scale Amount to scale this vector by.
	     */
	    timesAssign0(scale: number): void;
	    /**
	     * Multiplies the vector with another vector, using component-wise multiplication.
	     *
	     * @param v What to multiply this vector with.
	     */
	    timesAssign1(v: FVector): void;
	    /**
	     * Divides the vector by a number.
	     *
	     * @param v What to divide this vector by.
	     */
	    divAssign(v: FVector): void;
	    /**
	     * Gets specific component of the vector.
	     *
	     * @param index the index of vector component
	     * @return Copy of the component.
	     */
	    get(index: number): number;
	    /**
	     * Sets specific component of the vector.
	     *
	     * @param index the index of vector component
	     * @param value the new value of vector component
	     */
	    set0(index: number, value: number): void;
	    /**
	     * Set the values of the vector directly.
	     *
	     * @param x New X coordinate.
	     * @param y New Y coordinate.
	     * @param z New Z coordinate.
	     */
	    set1(x: number, y: number, z: number): void;
	    /**
	     * Get the maximum value of the vector's components.
	     *
	     * @return The maximum value of the vector's components.
	     */
	    getMax(): number;
	    /**
	     * Get the maximum absolute value of the vector's components.
	     *
	     * @return The maximum absolute value of the vector's components.
	     */
	    getAbsMax(): number;
	    /**
	     * Get the minimum value of the vector's components.
	     *
	     * @return The minimum value of the vector's components.
	     */
	    getMin(): number;
	    /**
	     * Get the minimum absolute value of the vector's components.
	     *
	     * @return The minimum absolute value of the vector's components.
	     */
	    getAbsMin(): number;
	    /** Gets the component-wise min of two vectors. */
	    componentMin(other: FVector): FVector;
	    /** Gets the component-wise max of two vectors. */
	    componentMax(other: FVector): FVector;
	    /**
	     * Get a copy of this vector with absolute value of each component.
	     *
	     * @return A copy of this vector with absolute value of each component.
	     */
	    getAbs(): FVector;
	    /**
	     * Get the length (magnitude) of this vector.
	     *
	     * @return The length of this vector.
	     */
	    size(): number;
	    /**
	     * Get the squared length of this vector.
	     *
	     * @return The squared length of this vector.
	     */
	    sizeSquared(): number;
	    /**
	     * Get the length of the 2D components of this vector.
	     *
	     * @return The 2D length of this vector.
	     */
	    size2D(): number;
	    /**
	     * Get the squared length of the 2D components of this vector.
	     *
	     * @return The squared 2D length of this vector.
	     */
	    sizeSquared2D(): number;
	    /**
	     * Checks whether vector is near to zero within a specified tolerance.
	     *
	     * @param tolerance Error tolerance.
	     * @return true if the vector is near to zero, false otherwise.
	     */
	    isNearlyZero(tolerance?: number): boolean;
	    /**
	     * Checks whether all components of the vector are exactly zero.
	     *
	     * @return true if the vector is exactly zero, false otherwise.
	     */
	    isZero(): boolean;
	    /**
	     * Check if the vector is of unit length, with specified tolerance.
	     *
	     * @param lengthSquaredTolerance Tolerance against squared length.
	     * @return true if the vector is a unit vector within the specified tolerance.
	     */
	    isUnit(lengthSquaredTolerance?: number): boolean;
	    /**
	     * Checks whether vector is normalized.
	     *
	     * @return true if normalized, false otherwise.
	     */
	    isNormalized(): boolean;
	    /**
	     * Get a textual representation of this vector.
	     *
	     * @return A string describing the vector.
	     */
	    toString(): string;
	    /**
	     * Squared distance between two points.
	     *
	     * @param other The other point.
	     * @return The squared distance between two points.
	     */
	    distSquared(other: FVector): number;
	    /**
	     * Calculate the cross product of two vectors.
	     *
	     * @param a The first vector.
	     * @param b The second vector.
	     * @return The cross product.
	     */
	    static crossProduct(a: FVector, b: FVector): FVector;
	    /**
	     * Calculate the dot product of two vectors.
	     *
	     * @param a The first vector.
	     * @param b The second vector.
	     * @return The dot product.
	     */
	    static dotProduct(a: FVector, b: FVector): number;
	    /**
	     * Util to calculate distance from a point to a bounding box
	     *
	     * @param mins 3D Point defining the lower values of the axis of the bound box
	     * @param maxs 3D Point defining the lower values of the axis of the bound box
	     * @param point 3D position of interest
	     * @return the distance from the Point to the bounding box.
	     */
	    static computeSquaredDistanceFromBoxToPoint(mins: FVector, maxs: FVector, point: FVector): number;
	}

}
declare module 'ue4/assets/objects/FStructFallback' {
	import { IPropertyHolder } from 'ue4/assets/objects/IPropertyHolder';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { Lazy } from 'util/Lazy';
	import { UStruct } from 'ue4/assets/exports/UStruct';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FPropertyTag } from 'ue4/assets/objects/FPropertyTag';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	/**
	 * Fallback for UScriptStruct
	 * @implements {IStructType}
	 * @implements {IPropertyHolder}
	 */
	export class FStructFallback implements IStructType, IPropertyHolder {
	    /**
	     * Properties
	     * @type {Array<FPropertyTag>}
	     * @public
	     */
	    properties: FPropertyTag[];
	    /**
	     * Creates instance using FAssetArchive, Lazy<UStruct> & FName
	     * @param {FAssetArchive} Ar FAssetArchive to use
	     * @param {Lazy<UStruct>} struct Struct to use
	     * @param {FName} structName Struct name to use
	     * @constructor
	     * @public
	     */
	    constructor(Ar: FAssetArchive, struct: Lazy<UStruct>, structName: FName);
	    /**
	     * Creates instance using FAssetArchive & FName
	     * @param {FAssetArchive} Ar FAssetArchive to use
	     * @param {FName} structName Struct name to use
	     * @constructor
	     * @public
	     */
	    constructor(Ar: FAssetArchive, structName: FName);
	    /**
	     * Creates instance using Array<FPropertyTag>
	     * @param {Array<FPropertyTag>} properties Properties
	     * @constructor
	     * @public
	     */
	    constructor(properties: FPropertyTag[]);
	    /**
	     * Serializes this
	     * @param {FAssetArchiveWriter} Ar FAssetArchiveWriter to use
	     * @returns {void}
	     * @public
	     */
	    serialize(Ar: FAssetArchiveWriter): void;
	    /**
	     * Sets a property
	     * @param {string} name Name of the property
	     * @param {any} value Value of the property
	     * @returns {void}
	     * @public
	     */
	    set<T>(name: string, value: T): void;
	    /**
	     * Gets a property
	     * @param {string} name Name of the property
	     * @returns {?any} Property or null
	     * @public
	     */
	    getOrNull<T>(name: string): T | undefined;
	    /**
	     * Gets a property
	     * @param {string} name Name of the property
	     * @returns {any} Property
	     * @throws {TypeError} If property doesn't exist
	     * @public
	     */
	    get<T>(name: string): T;
	    /**
	     * Turns this into json
	     * @returns {any}
	     * @public
	     */
	    toJson(): any;
	}

}
declare module 'ue4/objects/core/math/FBox' {
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	import { FVector } from 'ue4/objects/core/math/FVector';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	/**
	 * Implements an axis-aligned box.
	 *
	 * Boxes describe an axis-aligned extent in three dimensions. They are used for many different things in the
	 * Engine and in games, such as bounding volumes, collision detection and visibility calculation.
	 */
	export class FBox implements IStructType {
	    /** Holds the box's minimum point. */
	    min: FVector;
	    /** Holds the box's maximum point. */
	    max: FVector;
	    /** Holds a flag indicating whether this box is valid. */
	    isValid: boolean;
	    constructor();
	    constructor(box: FBox);
	    constructor(Ar: FArchive);
	    constructor(points: FVector[]);
	    constructor(min: FVector, max: FVector);
	    serialize(Ar: FArchiveWriter): void;
	    /**
	     * - Compares two boxes for equality.
	     *
	     * @return true if the boxes are equal, false otherwise.
	     */
	    equals(other: any): boolean;
	    /**
	     * - Adds to this bounding box to include a new bounding volume.
	     *
	     * @param other the bounding volume to increase the bounding volume to.
	     * @return Reference to this bounding volume after resizing to include the other bounding volume.
	     */
	    plusAssign0(other: FBox): void;
	    /**
	     * - Adds to this bounding box to include a given point.
	     *
	     * @param other the point to increase the bounding volume to.
	     * @return Reference to this bounding box after resizing to include the other point.
	     */
	    plusAssign1(other: FVector): void;
	    /**
	     * - Gets the result of addition to this bounding volume.
	     *
	     * @param other The other volume to add to this.
	     * @return A new bounding volume.
	     */
	    plus0(other: FBox): FBox;
	    /**
	     * - Gets the result of addition to this bounding volume.
	     *
	     * @param other The other point to add to this.
	     * @return A new bounding volume.
	     */
	    plus1(other: FVector): FBox;
	    /**
	     * - Gets the min or max of this bounding volume.
	     *
	     * @param index the index into points of the bounding volume.
	     * @return a point of the bounding volume.
	     */
	    get(index: number): FVector;
	    /**
	     * - Calculates the distance of a point to this box.
	     *
	     * @param point The point.
	     * @return The distance.
	     */
	    computeSquaredDistanceToPoint(point: FVector): number;
	    /**
	     * - Increases the box size.
	     *
	     * @param v The size to increase the volume by.
	     * @return A new bounding box.
	     */
	    expandBy0(v: FVector): FBox;
	    /**
	     * - Increases the box size.
	     *
	     * @param w The size to increase the volume by.
	     * @return A new bounding box.
	     */
	    expandBy1(w: number): FBox;
	    /**
	     * - Increases the box size.
	     *
	     * @param neg The size to increase the volume by in the negative direction (positive values move the bounds outwards)
	     * @param pos The size to increase the volume by in the positive direction (positive values move the bounds outwards)
	     * @return A new bounding box.
	     */
	    expandBy2(neg: FVector, pos: FVector): FBox;
	    /**
	     * - Shifts the bounding box position.
	     *
	     * @param offset The vector to shift the box by.
	     * @return A new bounding box.
	     */
	    shiftBy(offset: FVector): FBox;
	    /**
	     * - Moves the center of bounding box to new destination.
	     *
	     * @param destination The destination point to move center of box to.
	     * @return A new bounding box.
	     */
	    moveTo(destination: FVector): FBox;
	    /**
	     * Gets the center point of this box.
	     *
	     * @return The center point.
	     * @see getCenterAndExtents
	     * @see getExtent
	     * @see getSize
	     * @see getVolume
	     */
	    getCenter(): FVector;
	    /**
	     * - Gets the center and extents of this box.
	     *
	     * @param center(out) Will contain the box center point.
	     * @param extents(out) Will contain the extent around the center.
	     * @see getCenter
	     * @see getExtent
	     * @see getSize
	     * @see getVolume
	     */
	    getCenterAndExtents(center: FVector, extents: FVector): void;
	    /**
	     * - Calculates the closest point on or inside the box to a given point in space.
	     *
	     * @param point The point in space.
	     * @return The closest point on or inside the box.
	     */
	    getClosestPointTo(point: FVector): FVector;
	    /**
	     * - Gets the extents of this box.
	     *
	     * @return The box extents.
	     * @see getCenter
	     * @see getCenterAndExtents
	     * @see getSize
	     * @see getVolume
	     */
	    getExtent(): FVector;
	    /**
	     * Gets the size of this box.
	     *
	     * @return The box size.
	     * @see getCenter
	     * @see getCenterAndExtents
	     * @see getExtent
	     * @see getVolume
	     */
	    getSize(): FVector;
	    /**
	     * - Gets the volume of this box.
	     *
	     * @return The box volume.
	     * @see getCenter
	     * @see getCenterAndExtents
	     * @see getExtent
	     * @see getSize
	     */
	    getVolume(): number;
	    /**
	     * - Checks whether the given bounding box intersects this bounding box.
	     *
	     * @param other The bounding box to intersect with.
	     * @return true if the boxes intersect, false otherwise.
	     */
	    intersect(other: FBox): boolean;
	    /**
	     * - Checks whether the given bounding box intersects this bounding box in the XY plane.
	     *
	     * @param other The bounding box to test intersection.
	     * @return true if the boxes intersect in the XY Plane, false otherwise.
	     */
	    intersectXY(other: FBox): boolean;
	    /**
	     * - Returns the overlap FBox of two box
	     *
	     * @param other The bounding box to test overlap
	     * @return the overlap box. It can be 0 if they don't overlap
	     */
	    overlap(other: FBox): FBox;
	    /**
	     * - Checks whether a given box is fully encapsulated by this box.
	     *
	     * @param other The box to test for encapsulation within the bounding volume.
	     * @return true if box is inside this volume.
	     */
	    isInside0(other: FBox): boolean;
	    /**
	     * - Checks whether the given location is inside this box.
	     *
	     * @param _in The location to test for inside the bounding volume.
	     * @return true if location is inside this volume.
	     * @see isInsideXY
	     */
	    isInside1(_in: FVector): boolean;
	    /**
	     * - Checks whether the given location is inside or on this box.
	     *
	     * @param _in The location to test for inside the bounding volume.
	     * @return true if location is inside this volume.
	     * @see isInsideXY
	     */
	    isInsideOrOn(_in: FVector): boolean;
	    /**
	     * - Checks whether the given box is fully encapsulated by this box in the XY plane.
	     *
	     * @param other The box to test for encapsulation within the bounding box.
	     * @return true if box is inside this box in the XY plane.
	     */
	    isInsideXY0(other: FBox): boolean;
	    /**
	     * - Checks whether the given location is inside this box in the XY plane.
	     *
	     * @param _in The location to test for inside the bounding box.
	     * @return true if location is inside this box in the XY plane.
	     * @see isInside
	     */
	    isInsideXY1(_in: FVector): boolean;
	    toString(): string;
	    toJson(): {
	        bIsValid: boolean;
	        max: any;
	        min: any;
	    };
	    /**
	     * - Utility function to build an AABB from Origin and Extent
	     *
	     * @param origin The location of the bounding box.
	     * @param extent Half size of the bounding box.
	     * @return A new axis-aligned bounding box.
	     */
	    static buildAABB(origin: FVector, extent: FVector): FBox;
	}

}
declare module 'ue4/objects/core/math/FBox2D' {
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	import { FVector2D } from 'ue4/objects/core/math/FVector2D';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	/**
	 * Implements a rectangular 2D Box.
	 */
	export class FBox2D implements IStructType {
	    /** Holds the box's minimum point. */
	    min: FVector2D;
	    /** Holds the box's maximum point. */
	    max: FVector2D;
	    /** Holds a flag indicating whether this box is valid. */
	    isValid: boolean;
	    /**
	     * - Creates and initializes a new box.
	     *
	     * The box extents are initialized to zero and the box is marked as invalid.
	     */
	    constructor();
	    /**
	     * - Creates and initializes a new box.
	     *
	     * The box extents are initialized using the provided FArchive
	     */
	    constructor(Ar: FArchive);
	    /**
	     * - Creates and initializes a new box from the specified parameters.
	     *
	     * @param min The box's minimum point.
	     * @param max The box's maximum point.
	     */
	    constructor(min: FVector2D, max: FVector2D);
	    serialize(Ar: FArchiveWriter): void;
	    /**
	     * - Get a textual representation of this box.
	     *
	     * @return A string describing the box.
	     */
	    toString(): string;
	    toJson(): any;
	}

}
declare module 'ue4/objects/engine/MaterialExpressionIO' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FColor } from 'ue4/objects/core/math/FColor';
	import { FVector } from 'ue4/objects/core/math/FVector';
	import { FVector2D } from 'ue4/objects/core/math/FVector2D';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FExpressionInput implements IStructType {
	    /** Index into Expression's outputs array that this input is connected to. */
	    outputIndex: number;
	    inputName: FName;
	    mask: number;
	    maskR: number;
	    maskG: number;
	    maskB: number;
	    maskA: number;
	    /** Material expression name that this input is connected to, or None if not connected. Used only in cooked builds */
	    expressionName: FName;
	    constructor(Ar: FArchive);
	    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName);
	    serialize(...args: any[]): void;
	    toJson(): any;
	}
	export class FMaterialInput<T> extends FExpressionInput implements IStructType {
	    useConstant: boolean;
	    constant: T;
	    constructor(Ar: FArchive, init: () => T);
	    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName, useConstant: boolean, constant: T);
	    serialize(Ar: FArchiveWriter, write: (type: T) => void): void;
	    toJson(): any;
	}
	export class FColorMaterialInput extends FMaterialInput<FColor> {
	    constructor(Ar: FArchive);
	    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName, useConstant: boolean, constant: FColor);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FScalarMaterialInput extends FMaterialInput<number> {
	    constructor(Ar: FArchive);
	    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName, useConstant: boolean, constant: FColor);
	    serialize(Ar: FArchiveWriter): void;
	}
	export class FVectorMaterialInput extends FMaterialInput<FVector> {
	    constructor(Ar: FArchive);
	    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName, useConstant: boolean, constant: FColor);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FVector2MaterialInput extends FMaterialInput<FVector2D> {
	    constructor(Ar: FArchive);
	    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName, useConstant: boolean, constant: FColor);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FMaterialAttributesInput extends FExpressionInput {
	    constructor(Ar: FArchive);
	    constructor(outputIndex: number, inputName: FName, mask: number, maskR: number, maskG: number, maskB: number, maskA: number, expressionName: FName);
	}

}
declare module 'ue4/objects/core/misc/FFrameNumber' {
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FFrameNumber implements IStructType {
	    value: number;
	    constructor(arg: FArchive | number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/gameplaytags/FGameplayTagContainer' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FGameplayTagContainer implements Iterable<FName>, IStructType {
	    gameplayTags: FName[];
	    constructor();
	    constructor(Ar: FArchive);
	    constructor(gameplayTags: FName[]);
	    getValue(parent: string): FName;
	    serialize(Ar: FArchiveWriter): void;
	    [Symbol.iterator](): IterableIterator<FName>;
	    toJson(): any;
	}

}
declare module 'ue4/objects/levelsequence/FLevelSequenceLegacyObjectReference' {
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FLevelSequenceLegacyObjectReference implements IStructType {
	    keyGuid: FGuid;
	    objectId: FGuid;
	    objectPath: string;
	    constructor(Ar: FArchive);
	    constructor(keyGuid: FGuid, objectId: FGuid, objectPath: string);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FLevelSequenceObjectReferenceMap implements IStructType {
	    mapData: FLevelSequenceLegacyObjectReference[];
	    constructor(arg: FArchive | FLevelSequenceLegacyObjectReference[]);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/moviescene/evaluation/FMovieSceneEvaluationKey' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FMovieSceneEvaluationKey implements IStructType {
	    sequenceId: number;
	    trackId: number;
	    sectionIndex: number;
	    constructor(Ar: FArchive);
	    constructor(sequenceId: number, trackId: number, sectionIndex: number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/moviescene/evaluation/FMovieSceneEvaluationTemplate' {
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FMovieSceneEvaluationTemplate implements IStructType {
	    /** The internal value of the serial number */
	    value: number;
	    constructor(arg: FArchive | number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/core/math/TRangeBound' {
	/**
	 * Template for range bounds.
	 */
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class TRangeBound<T> implements IStructType {
	    /** Holds the type of the bound. */
	    type: ERangeBoundTypes;
	    /** Holds the bound's value. */
	    value: T;
	    constructor(Ar: FArchive, init: () => T);
	    constructor(boundType: ERangeBoundTypes, value: T);
	    serialize(Ar: FArchiveWriter, write: (it: T) => void): void;
	    toJson(): any;
	} enum ERangeBoundTypes {
	    /** The range excludes the bound. */
	    Exclusive = 0,
	    /** The range includes the bound. */
	    Inclusive = 1,
	    /** The bound is open. */
	    Open = 2
	}
	export {};

}
declare module 'ue4/objects/core/math/TRange' {
	import { TRangeBound } from 'ue4/objects/core/math/TRangeBound';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class TRange<T> implements IStructType {
	    /** Holds the range's lower bound. */
	    lowerBound: TRangeBound<T>;
	    /** Holds the range's upper bound. */
	    upperBound: TRangeBound<T>;
	    constructor(Ar: FArchive, init: () => T);
	    constructor(lowerBound: TRangeBound<T>, upperBound: TRangeBound<T>);
	    serialize(Ar: FArchiveWriter, write: (it: T) => void): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/moviescene/FMovieSceneFrameRange' {
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	import { TRange } from 'ue4/objects/core/math/TRange';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FMovieSceneFrameRange implements IStructType {
	    value: TRange<number>;
	    constructor(arg: FArchive | TRange<number>);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/moviescene/evaluation/FMovieSceneSegment' {
	/** Enumeration specifying how to evaluate a particular section when inside a segment */
	import { FFrameNumber } from 'ue4/objects/core/misc/FFrameNumber';
	import { TRange } from 'ue4/objects/core/math/TRange';
	import { FStructFallback } from 'ue4/assets/objects/FStructFallback';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct'; enum ESectionEvaluationFlags {
	    /** No special flags - normal evaluation */
	    None = 0,
	    /** Segment resides inside the 'pre-roll' time for the section */
	    PreRoll = 1,
	    /** Segment resides inside the 'post-roll' time for the section */
	    PostRoll = 2
	}
	/**
	 * Evaluation data that specifies information about what to evaluate for a given template
	 */
	export class FSectionEvaluationData {
	    /** The implementation index we should evaluate (index into FMovieSceneEvaluationTrack::ChildTemplates) */
	    ImplIndex: number;
	    /** A forced time to evaluate this section at */
	    ForcedTime: FFrameNumber;
	    /** Additional flags for evaluating this section */
	    Flags: ESectionEvaluationFlags;
	    constructor(implIndex: number, forcedTime: FFrameNumber, flags: ESectionEvaluationFlags);
	}
	/**
	 * Information about a single segment of an evaluation track
	 */
	export class FMovieSceneSegment implements IStructType {
	    /** The segment's range */
	    range: TRange<FFrameNumber>;
	    id: number;
	    /** Whether this segment has been generated yet or not */
	    allowEmpty: boolean;
	    /** Array of implementations that reside at the segment's range */
	    impls: FStructFallback[];
	    constructor(Ar: FAssetArchive);
	    constructor(range: TRange<FFrameNumber>, id: number, allowEmpty: boolean, impls: FStructFallback[]);
	    serialize(Ar: FAssetArchiveWriter): void;
	    toJson(): any;
	}
	export {};

}
declare module 'ue4/objects/ai/navigation/FNavAgentSelector' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FNavAgentSelector implements IStructType {
	    packedBits: number;
	    constructor(arg: FArchive | number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/niagara/FNiagaraVariableBase' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FStructFallback } from 'ue4/assets/objects/FStructFallback';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FNiagaraVariableBase implements IStructType {
	    name: FName;
	    typeDef: FStructFallback;
	    constructor(Ar: FAssetArchive);
	    constructor(name: FName, typeDef: FStructFallback);
	    serialize(Ar: FAssetArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/niagara/FNiagaraVariable' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FNiagaraVariableBase } from 'ue4/objects/niagara/FNiagaraVariableBase';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FStructFallback } from 'ue4/assets/objects/FStructFallback';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	export class FNiagaraVariable extends FNiagaraVariableBase {
	    varData: Buffer;
	    constructor(Ar: FAssetArchive);
	    constructor(name: FName, typeDef: FStructFallback, varData: Buffer);
	    serialize(Ar: FAssetArchiveWriter): void;
	}

}
declare module 'ue4/objects/niagara/FNiagaraVariableWithOffset' {
	import { FNiagaraVariableBase } from 'ue4/objects/niagara/FNiagaraVariableBase';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FStructFallback } from 'ue4/assets/objects/FStructFallback';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	export class FNiagaraVariableWithOffset extends FNiagaraVariableBase {
	    offset: number;
	    constructor(Ar: FAssetArchive);
	    constructor(name: FName, typeDef: FStructFallback, offset: number);
	    serialize(Ar: FAssetArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/engine/PerPlatformProperties' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FPerPlatformInt implements IStructType {
	    cooked: boolean;
	    value: number;
	    constructor(Ar: FArchive);
	    constructor(cooked: boolean, value: number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FPerPlatformFloat implements IStructType {
	    cooked: boolean;
	    value: number;
	    constructor(Ar: FArchive);
	    constructor(cooked: boolean, value: number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FPerPlatformBool implements IStructType {
	    cooked: boolean;
	    value: boolean;
	    constructor(Ar: FArchive);
	    constructor(cooked: boolean, value: boolean);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/core/math/FQuat' {
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FQuat implements IStructType {
	    x: number;
	    y: number;
	    z: number;
	    w: number;
	    constructor(Ar: FArchive);
	    constructor(x: number, y: number, z: number, w: number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/core/math/FMatrix' {
	import { FVector4 } from 'ue4/objects/core/math/FVector4';
	import { FVector } from 'ue4/objects/core/math/FVector';
	export class FMatrix {
	    m: number[][];
	    /** Homogeneous transform. */
	    transformFVector4(p: FVector4): FVector4;
	    /**
	     * Transform a direction vector - will not take into account translation part of the FMatrix.
	     * If you want to transform a surface normal (or plane) and correctly account for non-uniform scaling you should use transformByUsingAdjointT.
	     */
	    transformVector(v: FVector): FVector4;
	    /** Transpose. */
	    getTransposed(): FMatrix;
	    /** Apply Scale to this matrix **/
	    /** @return the origin of the co-ordinate system */
	    getOrigin(): FVector;
	    /**
	     * Get a textual representation of the vector.
	     *
	     * @return Text describing the vector.
	     */
	    toString(): string;
	}

}
declare module 'ue4/objects/core/math/FRotationTranslationMatrix' {
	import { FMatrix } from 'ue4/objects/core/math/FMatrix';
	import { FRotator } from 'ue4/objects/core/math/FRotator';
	import { FVector } from 'ue4/objects/core/math/FVector';
	export class FRotationTranslationMatrix extends FMatrix {
	    /**
	     * Constructor.
	     *
	     * @param rot rotation
	     * @param origin translation to apply
	     */
	    constructor(rot: FRotator, origin: FVector);
	}

}
declare module 'ue4/objects/core/math/FRotationMatrix' {
	import { FRotationTranslationMatrix } from 'ue4/objects/core/math/FRotationTranslationMatrix';
	import { FRotator } from 'ue4/objects/core/math/FRotator';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FRotationMatrix extends FRotationTranslationMatrix implements IStructType {
	    /**
	     * Constructor.
	     *
	     * @param rot rotation
	     */
	    constructor(rot: FRotator);
	    toJson(): any;
	}

}
declare module 'ue4/objects/core/math/FRotator' {
	/**
	 * Implements a container for rotation information.
	 *
	 * All rotation values are stored in degrees.
	 */
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { FVector } from 'ue4/objects/core/math/FVector';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FRotator implements IStructType {
	    /** Rotation around the right axis (around Y axis), Looking up and down (0=Straight Ahead, +Up, -Down) */
	    pitch: number;
	    /** Rotation around the up axis (around Z axis), Running in circles 0=East, +North, -South. */
	    yaw: number;
	    /** Rotation around the forward axis (around X axis), Tilting your head, 0=Straight, +Clockwise, -CCW. */
	    roll: number;
	    /**
	     * - Default constructor (no initialization).
	     */
	    constructor();
	    /**
	     * - Constructor
	     *
	     * @param f Value to set all components to.
	     */
	    constructor(f: number);
	    /**
	     * - Constructor which initialized using FArchive
	     *
	     * @param Ar The FArchive instance to use
	     */
	    constructor(Ar: FArchive);
	    /**
	     * - Constructor.
	     *
	     * @param pitch Pitch in degrees.
	     * @param yaw Yaw in degrees.
	     * @param roll Roll in degrees.
	     */
	    constructor(pitch: number, yaw: number, roll: number);
	    serialize(Ar: FArchiveWriter): void;
	    /**
	     * Get the result of adding a rotator to this.
	     *
	     * @param r The other rotator.
	     * @return The result of adding a rotator to this.
	     */
	    plus(r: FRotator): FRotator;
	    /**
	     * Get the result of subtracting a rotator from this.
	     *
	     * @param r The other rotator.
	     * @return The result of subtracting a rotator from this.
	     */
	    minus(r: FRotator): FRotator;
	    /**
	     * Get the result of scaling this rotator.
	     *
	     * @param scale The scaling factor.
	     * @return The result of scaling.
	     */
	    times(scale: number): FRotator;
	    /**
	     * Multiply this rotator by a scaling factor.
	     *
	     * @param scale The scaling factor.
	     */
	    timesAssign(scale: number): void;
	    equals(other: any): boolean;
	    /**
	     * Rotate a vector rotated by this rotator.
	     *
	     * @param v The vector to rotate.
	     * @return The rotated vector.
	     */
	    rotateVector(v: FVector): FVector;
	    /**
	     * Returns the vector rotated by the inverse of this rotator.
	     *
	     * @param v The vector to rotate.
	     * @return The rotated vector.
	     */
	    unrotateVector(v: FVector): FVector;
	    /**
	     * Get a textual representation of the vector.
	     *
	     * @return Text describing the vector.
	     */
	    toString(): string;
	    toJson(): any;
	}

}
declare module 'ue4/objects/engine/animation/FSmartName' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FSmartName implements IStructType {
	    displayName: FName;
	    constructor(arg: FArchive | FName);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/engine/FWeightedRandomSampler' {
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FWeightedRandomSampler implements IStructType {
	    prob: number[];
	    alias: number[];
	    totalWeight: number;
	    constructor(Ar: FArchive);
	    constructor(prob: number[], alias: number[], totalWeight: number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'ue4/objects/moviescene/evaluation/FMovieSceneEvaluationTree' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { TRange } from 'ue4/objects/core/math/TRange';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FEvaluationTreeEntryHandle {
	    entryIndex: number;
	    constructor(arg: FArchive | number);
	    serialize(Ar: FArchiveWriter): void;
	} class FEntry implements IStructType {
	    /** The index into Items of the first item */
	    startIndex: number;
	    /** The number of currently valid items */
	    size: number;
	    /** The total capacity of allowed items before reallocating */
	    capacity: number;
	    constructor(Ar: FArchive);
	    constructor(startIndex: number, size: number, capacity: number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class TEvaluationTreeEntryContainer<T> {
	    entries: FEntry[];
	    items: T[];
	    constructor(Ar: FArchive, init: () => T[]);
	    constructor(entries: FEntry[], items: T[]);
	    serialize(Ar: FArchiveWriter, write: (it: T[]) => void): void;
	}
	export class FMovieSceneEvaluationTreeNodeHandle {
	    childrenHandle: FEvaluationTreeEntryHandle;
	    index: number;
	    constructor(Ar: FArchive);
	    constructor(childrenHandle: FEvaluationTreeEntryHandle, index: number);
	    serialize(Ar: FArchiveWriter): void;
	}
	export class FMovieSceneEvaluationTreeNode implements IStructType {
	    range: TRange<number>;
	    parent: FMovieSceneEvaluationTreeNodeHandle;
	    childrenId: FEvaluationTreeEntryHandle;
	    dataId: FEvaluationTreeEntryHandle;
	    constructor(Ar: FArchive);
	    constructor(range: TRange<number>, parent: FMovieSceneEvaluationTreeNodeHandle, childrenId: FEvaluationTreeEntryHandle, dataId: FEvaluationTreeEntryHandle);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	export class FMovieSceneEvaluationTree {
	    rootNode: FMovieSceneEvaluationTreeNode;
	    childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>;
	    constructor(Ar: FArchive);
	    constructor(rootNode: FMovieSceneEvaluationTreeNode, childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>);
	    serialize(...args: any[]): void;
	}
	export class TMovieSceneEvaluationTree<T> extends FMovieSceneEvaluationTree {
	    data: TEvaluationTreeEntryContainer<T>;
	    constructor(Ar: FArchive, init: () => T[]);
	    constructor(rootNode: FMovieSceneEvaluationTreeNode, childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>, data: TEvaluationTreeEntryContainer<T>);
	    serialize(Ar: FArchiveWriter, write?: (it: T[]) => void): void;
	}
	export {};

}
declare module 'ue4/objects/moviescene/evaluation/FSectionEvaluationDataTree' {
	import { TMovieSceneEvaluationTree } from 'ue4/objects/moviescene/evaluation/FMovieSceneEvaluationTree';
	import { FStructFallback } from 'ue4/assets/objects/FStructFallback';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	export class FSectionEvaluationDataTree implements IStructType {
	    tree: TMovieSceneEvaluationTree<FStructFallback>;
	    constructor(arg: FAssetArchive | TMovieSceneEvaluationTree<FStructFallback>);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}

}
declare module 'util/ObjectRef' {
	export class ObjectRef<T> {
	    element: T;
	    constructor(element?: T);
	    static ref<T>(element: T): ObjectRef<T>;
	}
	export type FloatRef = ObjectRef<number>;
	export type IntRef = ObjectRef<number>;

}
declare module 'util/decorators/UProperty' {
	import 'reflect-metadata';
	export function UProperty(data?: IUProperty): {
	    (target: Function): void;
	    (target: Object, propertyKey: string | symbol): void;
	};
	export function getUProperty(target: any, propertyKey: string): any;
	export interface IUProperty {
	    name?: string;
	    skipPrevious?: number;
	    skipNext?: number;
	    arrayDim?: number;
	    isEnumAsByte?: boolean;
	    innerType?: any;
	    valueType?: any;
	}

}
declare module 'ue4/objects/engine/curves/FRealCurve' {
	/** Method of interpolation between this key and the next. */
	import { FloatRef, IntRef } from 'util/ObjectRef';
	export enum ERichCurveInterpMode {
	    /** Use linear interpolation between values. */
	    RCIM_Linear = 0,
	    /** Use a constant value. Represents stepped values. */
	    RCIM_Constant = 1,
	    /** Cubic interpolation. See TangentMode for different cubic interpolation options. */
	    RCIM_Cubic = 2,
	    /** No interpolation. */
	    RCIM_None = 3
	}
	/** Enumerates extrapolation options. */
	export enum ERichCurveExtrapolation {
	    /** Repeat the curve without an offset. */
	    RCCE_Cycle = 0,
	    /** Repeat the curve with an offset relative to the first or last key's value. */
	    RCCE_CycleWithOffset = 1,
	    /** Sinusoidally extrapolate. */
	    RCCE_Oscillate = 2,
	    /** Use a linearly increasing value for extrapolation. */
	    RCCE_Linear = 3,
	    /** Use a constant value for extrapolation */
	    RCCE_Constant = 4,
	    /** No Extrapolation */
	    RCCE_None = 5
	}
	/** A rich, editable float curve */
	export class FRealCurve {
	    /** Default value */
	    defaultValue: number;
	    /** Pre-infinity extrapolation state */
	    preInfinityExtrap: ERichCurveExtrapolation;
	    /** Post-infinity extrapolation state */
	    postInfinityExtrap: ERichCurveExtrapolation;
	    /** Get range of input time values. Outside this region curve continues constantly the start/end values. */
	    getTimeRange(minTime: FloatRef, maxTime: FloatRef): void;
	    /** Get range of output values. */
	    getValueRange(minValue: FloatRef, maxValue: FloatRef): void;
	    /** Clear all keys. */
	    reset(): void;
	    /** Remap inTime based on pre and post infinity extrapolation values */
	    remapTimeValue(inTime: FloatRef, cycleValueOffset: FloatRef): void;
	    /** Evaluate this curve at the specified time */
	    eval(inTime: number, inDefaultValue?: number): number;
	    protected static cycleTime(minTime: number, maxTime: number, inTime: FloatRef, cycleCount: IntRef): void;
	    toJson(): {
	        defaultValue: number;
	        preInfinityExtrap: string;
	        postInfinityExtrap: string;
	    };
	}

}
declare module 'ue4/objects/engine/curves/FRichCurve' {
	import { ERichCurveInterpMode, FRealCurve } from 'ue4/objects/engine/curves/FRealCurve';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { FloatRef } from 'util/ObjectRef';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	/** If using RCIM_Cubic, this enum describes how the tangents should be controlled in editor. */
	export enum ERichCurveTangentMode {
	    /** Automatically calculates tangents to create smooth curves between values. */
	    RCTM_Auto = 0,
	    /** User specifies the tangent as a unified tangent where the two tangents are locked to each other, presenting a consistent curve before and after. */
	    RCTM_User = 1,
	    /** User specifies the tangent as two separate broken tangents on each side of the key which can allow a sharp change in evaluation before or after. */
	    RCTM_Break = 2,
	    /** No tangents. */
	    RCTM_None = 3
	}
	/** Enumerates tangent weight modes. */
	export enum ERichCurveTangentWeightMode {
	    /** Don't take tangent weights into account. */
	    RCTWM_WeightedNone = 0,
	    /** Only take the arrival tangent weight into account for evaluation. */
	    RCTWM_WeightedArrive = 1,
	    /** Only take the leaving tangent weight into account for evaluation. */
	    RCTWM_WeightedLeave = 2,
	    /** Take both the arrival and leaving tangent weights into account for evaluation. */
	    RCTWM_WeightedBoth = 3
	}
	/** One key in a rich, editable float curve */
	export class FRichCurveKey implements IStructType {
	    /** Interpolation mode between this key and the next */
	    interpMode: ERichCurveInterpMode;
	    /** Mode for tangents at this key */
	    tangentMode: ERichCurveTangentMode;
	    /** If either tangent at this key is 'weighted' */
	    tangentWeightMode: ERichCurveTangentWeightMode;
	    /** Time at this key */
	    time: number;
	    /** Value at this key */
	    value: number;
	    /** If RCIM_Cubic, the arriving tangent at this key */
	    arriveTangent: number;
	    /** If RCTWM_WeightedArrive or RCTWM_WeightedBoth, the weight of the left tangent */
	    arriveTangentWeight: number;
	    /** If RCIM_Cubic, the leaving tangent at this key */
	    leaveTangent: number;
	    /** If RCTWM_WeightedLeave or RCTWM_WeightedBoth, the weight of the right tangent */
	    leaveTangentWeight: number;
	    constructor(Ar: FArchive);
	    constructor(interpMode: ERichCurveInterpMode, tangentMode: ERichCurveTangentMode, tangentWeightMode: ERichCurveTangentWeightMode, time: number, value: number, arriveTangent: number, arriveTangentWeight: number, leaveTangent: number, leaveTangentWeight: number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	/** A rich, editable float curve */
	export class FRichCurve extends FRealCurve {
	    /** Sorted array of keys */
	    keys: FRichCurveKey[];
	    /** Remap inTime based on pre and post infinity extrapolation values */
	    remapTimeValue(inTime: FloatRef, cycleValueOffset: FloatRef): void;
	    /** Evaluate this rich curve at the specified time */
	    eval(inTime: number, inDefaultValue?: number): number;
	    toJson(): any;
	    private static evalForTwoKeys;
	}
	export function bezierInterp(p0: number, p1: number, p2: number, p3: number, alpha: number): number;
	export function bezierToPower(a1: number, b1: number, c1: number, d1: number, out: number[]): void;
	export function weightedEvalForTwoKeys(key1Value: number, key1Time: number, key1LeaveTangent: number, key1LeaveTangentWeight: number, key1TangentWeightMode: ERichCurveTangentWeightMode, key2Value: number, key2Time: number, key2ArriveTangent: number, key2ArriveTangentWeight: number, key2TangentWeightMode: ERichCurveTangentWeightMode, inTime: number): number;

}
declare module 'ue4/objects/engine/curves/FSimpleCurve' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	import { ERichCurveInterpMode, FRealCurve } from 'ue4/objects/engine/curves/FRealCurve';
	import { FloatRef } from 'util/ObjectRef';
	/** One key in a rich, editable float curve */
	export class FSimpleCurveKey implements IStructType {
	    /** Time at this key */
	    time: number;
	    /** Value at this key */
	    value: number;
	    constructor(Ar: FArchive);
	    constructor(time: number, value: number);
	    serialize(Ar: FArchiveWriter): void;
	    toJson(): any;
	}
	/** A rich, editable float curve */
	export class FSimpleCurve extends FRealCurve {
	    /** Interpolation mode between this key and the next */
	    interpMode: ERichCurveInterpMode;
	    /** Sorted array of keys */
	    keys: FSimpleCurveKey[];
	    /** Get range of input time values. Outside this region curve continues constantly the start/end values. */
	    getTimeRange(minTime: FloatRef, maxTime: FloatRef): void;
	    /** Get range of output values. */
	    getValueRange(minValue: FloatRef, maxValue: FloatRef): void;
	    /** Clear all keys. */
	    reset(): void;
	    /** Remap inTime based on pre and post infinity extrapolation values */
	    remapTimeValue(inTime: FloatRef, cycleValueOffset: FloatRef): void;
	    /** Evaluate this curve at the specified time */
	    eval(inTime: number, inDefaultValue: number): number;
	    toJson(): any;
	    private evalForTwoKeys;
	}

}
declare module 'ue4/assets/objects/UScriptStruct' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { PropertyType } from 'ue4/assets/objects/PropertyType';
	import { ReadType } from 'ue4/assets/objects/FProperty';
	export class UScriptStruct {
	    structName: FName;
	    structType: IStructType;
	    constructor(Ar: FAssetArchive, typeData: PropertyType, type: ReadType);
	    constructor(structName: FName, structType: any);
	}
	/**
	 * Represents a struct type
	 */
	export interface IStructType {
	    /**
	     * Turns this into json
	     * @returns {any}
	     * @public
	     */
	    toJson(): any;
	}

}
declare module 'ue4/objects/core/misc/Guid' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { IStructType } from 'ue4/assets/objects/UScriptStruct';
	/**
	 * Enumerates known GUID formats.
	 */
	export enum EGuidFormats {
	    /**
	     * 32 digits.
	     *
	     * For example: "00000000000000000000000000000000"
	     */
	    Digits = "Digits",
	    /**
	     * 32 digits separated by hyphens.
	     *
	     * For example: 00000000-0000-0000-0000-000000000000
	     */
	    DigitsWithHyphens = "DigitsWithHyphens",
	    /**
	     * 32 digits separated by hyphens and enclosed in braces.
	     *
	     * For example: {00000000-0000-0000-0000-000000000000}
	     */
	    DigitsWithHyphensInBraces = "DigitsWithHyphensInBraces",
	    /**
	     * 32 digits separated by hyphens and enclosed in parentheses.
	     *
	     * For example: (00000000-0000-0000-0000-000000000000)
	     */
	    DigitsWithHyphensInParentheses = "DigitsWithHyphensInParentheses",
	    /**
	     * Comma-separated hexadecimal values enclosed in braces.
	     *
	     * For example: {0x00000000,0x0000,0x0000,{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00}}
	     */
	    HexValuesInBraces = "HexValuesInBraces",
	    /**
	     * This format is currently used by the FUniqueObjectGuid class.
	     *
	     * For example: 00000000-00000000-00000000-00000000
	     */
	    UniqueObjectGuid = "UniqueObjectGuid",
	    /**
	     * Base64 characters with dashes and underscores instead of pluses and slashes (respectively)
	     *
	     * For example: AQsMCQ0PAAUKCgQEBAgADQ
	     */
	    Short = "Short",
	    /**
	     * Base-36 encoded, compatible with case-insensitive OS file systems (such as Windows).
	     *
	     * For example: 1DPF6ARFCM4XH5RMWPU8TGR0J
	     */
	    Base36Encoded = "Base36Encoded"
	}
	export class FGuid implements IStructType {
	    static mainGuid: FGuid;
	    /** Holds the first component. */
	    a: number;
	    /** Holds the second component. */
	    b: number;
	    /** Holds the third component. */
	    c: number;
	    /** Holds the fourth component. */
	    d: number;
	    constructor();
	    constructor(Ar: FArchive);
	    constructor(a: number, b: number, c: number, d: number);
	    constructor(hexString: string);
	    equals(other: any): boolean;
	    /**
	     * Provides read-only access to the GUIDs components.
	     *
	     * @param index The index of the component to return (0...3).
	     * @returns The component.
	     */
	    get(index: number): number;
	    /**
	     * Serializes a GUID from or into an archive.
	     *
	     * @param Ar The archive to serialize into.
	     */
	    serialize(Ar: any): void;
	    /**
	     * Invalidates the GUID.
	     *
	     * @see isValid
	     */
	    invalidate(): void;
	    /**
	     * Checks whether this GUID is valid or not.
	     *
	     * A GUID that has all its components set to zero is considered invalid.
	     *
	     * @returns true if valid, false otherwise.
	     * @see invalidate
	     */
	    isValid(): boolean;
	    /**
	     * Converts this GUID to its string representation using the specified format.
	     *
	     * @param format The string format to use.
	     * @return The string representation.
	     */
	    toString(format?: EGuidFormats): string;
	    toJson(): any;
	}

}
declare module 'ue4/reader/FFileArchive' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { Stats } from 'fs';
	import { FArchive } from 'ue4/reader/FArchive';
	/**
	 * File Reader
	 * @extends {FArchive}
	 */
	export class FFileArchive extends FArchive {
	    /**
	     * Path to the file
	     * @type {string}
	     * @public
	     */
	    path: string;
	    /**
	     * FS handle id
	     * @type {number}
	     * @public
	     */
	    handle: number;
	    /**
	     * FS Stats
	     * @type {Stats}
	     * @public
	     */
	    stats: Stats;
	    /**
	     * Creates an instance
	     * @param {string} path Path to the file
	     * @constructor
	     * @public
	     */
	    constructor(path: string);
	    /**
	     * Size of the reader
	     * @type {number}
	     * @public
	     */
	    get size(): number;
	    /**
	     * Reads a range of bytes
	     * @param {number} begin Where to begin
	     * @param {number} end Where to stop
	     * @param {boolean} copy Wether to remove bytes from buffer
	     */
	    readRange(begin: number, end: number, copy?: boolean): Buffer;
	    /**
	     * Reads an 8-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readInt8(): number;
	    /**
	     * Reads an unsigned 8-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readUInt8(): number;
	    /**
	     * Reads a 16-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readInt16(): number;
	    /**
	     * Reads an unsigned 16-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readUInt16(): number;
	    /**
	     * Reads a 32-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readInt32(): number;
	    /**
	     * Reads an unsigned 32-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readUInt32(): number;
	    /**
	     * Reads a 64-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readInt64(): bigint;
	    /**
	     * Reads an unsigned 64-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readUInt64(): bigint;
	    /**
	     * Reads a float
	     * @returns {number} Result
	     * @public
	     */
	    readFloat32(): number;
	    /**
	     * Reads a double
	     * @returns {number} Result
	     * @public
	     */
	    readDouble(): number;
	    /**
	     * Returns FArchive info for error
	     * @returns {string}
	     * @public
	     */
	    printError(): string;
	}

}
declare module 'ue4/pak/enums/PakVersion' {
	export enum EPakVersion {
	    PakVersion_Initial = 1,
	    PakVersion_NoTimestamps = 2,
	    PakVersion_CompressionEncryption = 3,
	    PakVersion_IndexEncryption = 4,
	    PakVersion_RelativeChunkOffsets = 5,
	    PakVersion_DeleteRecords = 6,
	    PakVersion_EncryptionKeyGuid = 7,
	    PakVersion_FNameBasedCompressionMethod = 8,
	    PakVersion_FrozenIndex = 9,
	    PakVersion_PathHashIndex = 10,
	    PakVersion_Fnv64BugFix = 11,
	    PakVersion_Last = 12,
	    PakVersion_Latest = 11
	}

}
declare module 'ue4/pak/objects/FPakInfo' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FArchive } from 'ue4/reader/FArchive';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { EPakVersion } from 'ue4/pak/enums/PakVersion'; enum OffsetsToTry {
	    size = 61,
	    size8_1 = 93,
	    size8_2 = 125,
	    size8_3 = 157,
	    size8 = 189,
	    size8a = 221,
	    size9 = 222,
	    sizeLast = 223,
	    sizeMax = 222
	}
	export class FPakInfo {
	    static readonly PAK_MAGIC = 1517228769;
	    private static readonly _offsetsToTry;
	    static readPakInfo(Ar: FArchive): FPakInfo;
	    magic: number;
	    encryptionKeyGuid: FGuid;
	    encryptedIndex: boolean;
	    version: EPakVersion;
	    indexOffset: number;
	    indexSize: number;
	    indexHash: Buffer;
	    compressionMethods: string[];
	    indexIsFrozen: boolean;
	    constructor(Ar: FArchive, offsetToTry: OffsetsToTry);
	}
	export {};

}
declare module 'ue4/pak/objects/FPakEntry' {
	import { FPakCompressedBlock } from 'ue4/pak/objects/FPakCompressedBlock';
	import { FPakInfo } from 'ue4/pak/objects/FPakInfo';
	import { FArchive } from 'ue4/reader/FArchive';
	export class FPakEntry {
	    name: string;
	    pos: number;
	    size: number;
	    uncompressedSize: number;
	    compressionMethod: string;
	    compressionBlocks: FPakCompressedBlock[];
	    isEncrypted: boolean;
	    compressionBlockSize: number;
	    static getSerializedSize(version: number, compressionMethod?: number, compressionBlocksCount?: number): number;
	    constructor(Ar?: FArchive, pakInfo?: FPakInfo, inIndex?: boolean);
	}

}
declare module 'ue4/pak/GameFile' {
	import { FPakEntry } from 'ue4/pak/objects/FPakEntry';
	import { FPakCompressedBlock } from 'ue4/pak/objects/FPakCompressedBlock';
	export class GameFile {
	    /**
	     * Path to the file
	     * @type {string}
	     * @public
	     */
	    path: string;
	    /**
	     * Reader position of the file
	     * @type {number}
	     * @public
	     */
	    pos: number;
	    /**
	     * Size of the file
	     * @type {number}
	     * @public
	     */
	    size: number;
	    /**
	     * Uncompress size of the file
	     * @type {number}
	     * @public
	     */
	    uncompressedSize: number;
	    /**
	     * Compression method of the file
	     * @type {string}
	     * @public
	     */
	    compressionMethod: string;
	    /**
	     * Compressed block of the file
	     * @type {Array<FPakCompressedBlock>}
	     * @public
	     */
	    compressedBlocks: FPakCompressedBlock[];
	    /**
	     * Compression block size of the file
	     * @type {number}
	     * @public
	     */
	    compressionBlockSize: number;
	    /**
	     * Wether this file is encrypted
	     * @type {boolean}
	     * @public
	     */
	    isEncrypted: boolean;
	    /**
	     * Pak file name of the file
	     * @type {string}
	     * @public
	     */
	    pakFileName: string;
	    /**
	     * I/O Package ID of the file
	     * @type {?bigint}
	     * @public
	     */
	    ioPackageId?: bigint;
	    /**
	     * Creates an instance
	     * @param {?FPakEntry} pakEntry Pak entry of file
	     * @param {?string} mountPrefix Mount prefix of file
	     * @param {?string} pakFileName Pak file name of file
	     * @constructor
	     * @public
	     */
	    constructor(pakEntry?: FPakEntry, mountPrefix?: string, pakFileName?: string);
	    /**
	     * Creates an instance from io store file
	     * @param {string} path Path to file
	     * @param {string} pakFileName Pak file name of file
	     * @param {bigint} ioPackageId I/O Package ID of file
	     * @public
	     * @static
	     */
	    static createFromIoStoreFile(path: string, pakFileName: string, ioPackageId: bigint): GameFile;
	    /**
	     * UEXP File
	     * @type {GameFile}
	     * @public
	     */
	    uexp: GameFile;
	    /**
	     * UBULK File
	     * @type {?GameFile}
	     * @public
	     */
	    ubulk?: GameFile;
	    /**
	     * Gets extension of this file
	     * @returns {string}
	     * @public
	     */
	    getExtension(): string;
	    /**
	     * Wether if this is an UE4 Package
	     * @returns {boolean}
	     * @public
	     */
	    isUE4Package(): boolean;
	    /**
	     * Wether if this is a locres file
	     * @returns {boolean}
	     * @public
	     */
	    isLocres(): boolean;
	    /**
	     * Wether if this is an asset registry
	     * @returns {boolean}
	     * @public
	     */
	    isAssetRegistry(): boolean;
	    /**
	     * Wether if this has uexp data
	     * @returns {boolean}
	     * @public
	     */
	    hasUexp(): boolean;
	    /**
	     * Wether if this has ubulk data
	     * @returns {boolean}
	     * @public
	     */
	    hasUbulk(): boolean;
	    /**
	     * Wether if this is compressed
	     * @returns {boolean}
	     * @public
	     */
	    isCompressed(): boolean;
	    /**
	     * Gets path without extension
	     * @returns {string}
	     * @public
	     */
	    getPathWithoutExtension(): string;
	    /**
	     * Gets name of this
	     * @returns {string}
	     * @public
	     */
	    getName(): string;
	    /**
	     * Gets name without extension
	     * @returns {string}
	     * @public
	     */
	    getNameWithoutExtension(): string;
	    /**
	     * Turns this into string
	     * @returns {string}
	     * @public
	     */
	    toString(): string;
	    /**
	     * Wether this equals another object
	     * @param {?any} other Object to check
	     * @returns {boolean}
	     */
	    equals(other?: any): boolean;
	}

}
declare module 'ue4/assets/mappings/TypeMappings' {
	import { UnrealMap } from 'util/UnrealMap';
	import { UScriptStruct } from 'ue4/assets/exports/UScriptStruct';
	/**
	 * Type mappings base
	 */
	export class TypeMappings {
	    /**
	     * Stores types
	     * @type {object}
	     * @public
	     */
	    types: {};
	    /**
	     * Stores enums
	     * @type {object}
	     * @public
	     */
	    enums: {};
	    /**
	     * Creates a new instance using args
	     * @param {UnrealMap<string, UScriptStruct>} types Types
	     * @param {UnrealMap<string, string[]>} enums Enums
	     */
	    constructor(types?: UnrealMap<string, UScriptStruct>, enums?: UnrealMap<string, string[]>);
	}

}
declare module 'ue4/assets/mappings/TypeMappingsProvider' {
	import { TypeMappings } from 'ue4/assets/mappings/TypeMappings';
	import { FName } from 'ue4/objects/uobject/FName';
	import { UStruct } from 'ue4/assets/exports/UStruct';
	/**
	 * Base for all type mappings providers
	 * @abstract
	 */
	export abstract class TypeMappingsProvider {
	    /**
	     * Holds mappings
	     * @type {TypeMappings}
	     */
	    mappings: TypeMappings;
	    /**
	     * Reloads mappings
	     * @abstract
	     * @public
	     */
	    abstract reload(): boolean;
	    /**
	     * Gets a struct
	     * @param {FName} structName FName of the struct
	     * @returns {UScriptStruct} Struct
	     * @public
	     */
	    getStruct(structName: FName): UStruct;
	    /**
	     * Gets an enum
	     * @param {FName} enumName FName of the struct
	     * @returns {string[]} Enum
	     * @public
	     */
	    getEnum(enumName: FName): any;
	}

}
declare module 'ue4/assets/mappings/ReflectionTypeMappingsProvider' {
	import { TypeMappingsProvider } from 'ue4/assets/mappings/TypeMappingsProvider';
	import { FName } from 'ue4/objects/uobject/FName';
	import { UScriptStruct } from 'ue4/assets/exports/UScriptStruct';
	/**
	 * Type mappings provider which uses reflection
	 * @extends {TypeMappingsProvider}
	 */
	export class ReflectionTypeMappingsProvider extends TypeMappingsProvider {
	    /**
	     * Gets a struct
	     * @param {FName} structName FName of the struct
	     * @returns {UScriptStruct} Struct
	     * @public
	     */
	    getStruct(structName: FName): UScriptStruct;
	    /**
	     * Gets an enum
	     * @param {FName} enumName FName of the enum
	     * @returns {Array<string>} Enum
	     * @public
	     */
	    getEnum(enumName: FName): string[];
	    /**
	     * Reloads mappings
	     * @returns {boolean} Result
	     * @public
	     */
	    reload(): boolean;
	}

}
declare module 'ue4/registry/objects/FAssetRegistryVersion' {
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FArchive } from 'ue4/reader/FArchive';
	export const versionGuid: FGuid;
	export enum Type {
	    /** From before file versioning was implemented */
	    PreVersioning = "PreVersioning",
	    /** The first version of the runtime asset registry to include file versioning. */
	    HardSoftDependencies = "HardSoftDependencies",
	    /** Added FAssetRegistryState and support for piecemeal serialization */
	    AddAssetRegistryState = "AddAssetRegistryState",
	    /** AssetData serialization format changed, versions before this are not readable */
	    ChangedAssetData = "ChangedAssetData",
	    /** Removed MD5 hash from package data */
	    RemovedMD5Hash = "RemovedMD5Hash",
	    /** Added hard/soft manage references */
	    AddedHardManage = "AddedHardManage",
	    /** Added MD5 hash of cooked package to package data */
	    AddedCookedMD5Hash = "AddedCookedMD5Hash",
	    /** Added UE::AssetRegistry::EDependencyProperty to each dependency */
	    AddedDependencyFlags = "AddedDependencyFlags",
	    /**
	     * Major tag format change that replaces USE_COMPACT_ASSET_REGISTRY:
	     * * Target tag INI settings cooked into tag data
	     * * Instead of FString values are stored directly as one of:
	     *      - Narrow / wide string
	     *      - [Numberless] FName
	     *      - [Numberless] export path
	     *      - Localized string
	     * * All value types are deduplicated
	     * * All key-value maps are cooked into a single contiguous range
	     * * Switched from FName table to seek-free and more optimized FName batch loading
	     * * Removed global tag storage, a tag map reference-counts one store per asset registry
	     * * All configs can mix fixed and loose tag maps
	     */
	    FixedTags = "FixedTags"
	}
	export class FAssetRegistryVersion {
	    Ar: FArchive;
	    constructor(Ar: FArchive);
	    guid: FGuid;
	    get version(): Type;
	    private fallback;
	}

}
declare module 'ue4/reader/FArchiveProxy' {
	import { FArchive } from 'ue4/reader/FArchive';
	/**
	 * Proxy for UE4 Reader
	 * @extends {FArchive}
	 */
	export class FArchiveProxy extends FArchive {
	    /**
	     * The FArchive
	     * @type {FArchive}
	     * @public
	     */
	    wrappedAr: FArchive;
	    /**
	     * Wether to use little endian
	     * @type {boolean}
	     * @public
	     */
	    littleEndian: boolean;
	    /**
	     * Creates an instance
	     * @param {FArchive} wrappedAr FArchive instance
	     * @constructor
	     * @public
	     */
	    constructor(wrappedAr: FArchive);
	    /**
	     * Clones this instance
	     * @returns {FArchiveProxy}
	     * @public
	     */
	    clone(): FArchiveProxy;
	    /**
	     * Returns this current position
	     * @returns {number}
	     * @public
	     */
	    get pos(): number;
	    /**
	     * Sets this current position
	     * @param {number} pos Position to set to
	     * @public
	     */
	    set pos(pos: number);
	    /**
	     * Size of this reader
	     * @returns {number}
	     * @public
	     */
	    get size(): number;
	    /**
	     * Reads an 8-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readInt8(): number;
	    /**
	     * Reads a 16-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readInt16(): number;
	    /**
	     * Reads a 32-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readInt32(): number;
	    /**
	     * Reads a 64-bit integer
	     * @returns {number} Result
	     * @public
	     */
	    readInt64(): bigint;
	    /**
	     * Reads a float
	     * @returns {number} Result
	     * @public
	     */
	    readFloat32(): number;
	    /**
	     * Reads a double
	     * @returns {number} Result
	     * @public
	     */
	    readDouble(): number;
	    /**
	     * Creates a string with FArchive info for error
	     * @returns {string} Result
	     * @public
	     */
	    printError(): string;
	}

}
declare module 'ue4/registry/objects/AssetBundleData' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { FArchive } from 'ue4/reader/FArchive';
	/** A struct representing a single AssetBundle */
	export class FAssetBundleEntry {
	    /** Specific name of this bundle, should be unique for a given scope */
	    bundleName: FName;
	    /** List of string assets contained in this bundle */
	    bundleAssets: FSoftObjectPath[];
	    constructor(Ar: FArchive);
	    constructor(bundleName: FName, bundleAssets: FSoftObjectPath[]);
	}
	/** A struct with a list of asset bundle entries. If one of these is inside a UObject it will get automatically exported as the asset registry tag AssetBundleData */
	export class FAssetBundleData {
	    /** List of bundles defined */
	    bundles: FAssetBundleEntry[];
	    constructor(Ar: FArchive);
	    constructor(bundles: FAssetBundleEntry[]);
	}

}
declare module 'ue4/registry/objects/FAssetData' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FAssetBundleData } from 'ue4/registry/objects/AssetBundleData';
	import { FAssetRegistryArchive } from 'ue4/registry/reader/AssetRegistryArchive';
	import { UnrealMap } from 'util/UnrealMap';
	export class FAssetData {
	    objectPath: FName;
	    packagePath: FName;
	    assetClass: FName;
	    packageName: FName;
	    assetName: FName;
	    tagsAndValues: UnrealMap<FName, string>;
	    taggedAssetBundles: FAssetBundleData;
	    chunkIds: number[];
	    packageFlags: number;
	    constructor(Ar: FAssetRegistryArchive);
	}

}
declare module 'ue4/registry/objects/AssetDataTagMap' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FNameEntryId } from 'ue4/objects/uobject/NameTypes';
	import { StringBuilder } from 'util/StringBuilder';
	import { FPartialMapHandle, FStore } from 'ue4/registry/objects/AssetDataTagMapSerializationDetails';
	export class FAssetRegistryExportPath {
	    _class: FName;
	    _object: FName;
	    _package: FName;
	    constructor(_class: FName, _object: FName, _package: FName);
	    constructor(Ar: FArchive);
	    toString(): string;
	    toString(out: StringBuilder): any;
	    toName(): FName;
	    isEmpty(): boolean;
	}
	export class FValueId {
	    type: EValueType;
	    index: number;
	    constructor(type: EValueType, index: number);
	    constructor(Ar: FArchive);
	    constructor(int: number);
	}
	export class FNumberedPair {
	    key: FName;
	    value: FValueId;
	    constructor(key: FName, value: FValueId);
	    constructor(Ar: FArchive);
	}
	export class FNumberlessPair {
	    key: FNameEntryId;
	    value: FValueId;
	    constructor(key: FNameEntryId, value: FValueId);
	    constructor(Ar: FArchive);
	}
	export class FNumberlessExportPath {
	    _class: FNameEntryId;
	    _object: FNameEntryId;
	    _package: FNameEntryId;
	    _names: string[];
	    constructor(_class: FNameEntryId, _object: FNameEntryId, _package: FNameEntryId, _names: string[]);
	    constructor(Ar: FArchive, names: string[]);
	    makeNumberedPath(): FAssetRegistryExportPath;
	    toString(): any;
	    toString(out: StringBuilder): any;
	    toName(): FName;
	}
	export class FMapHandle {
	    partialHandle: FPartialMapHandle;
	    store: FStore;
	    bHasNumberlessKeys: boolean;
	    num: number;
	    pairBegin: number;
	    constructor(partialHandle: FPartialMapHandle, store: FStore);
	    getNumberedView(): FNumberedPair[];
	    getNumberlessView(): FNumberlessPair[];
	    forEachPair(fn: (FNumberedPair: any) => void): void;
	}
	export enum EValueType {
	    AnsiString = "AnsiString",
	    WideString = "WideString",
	    NumberlessName = "NumberlessName",
	    Name = "Name",
	    NumberlessExportPath = "NumberlessExportPath",
	    ExportPath = "ExportPath",
	    LocalizedText = "LocalizedText"
	}

}
declare module 'ue4/registry/objects/AssetDataTagMapSerializationDetails' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FAssetRegistryExportPath, FMapHandle, FNumberedPair, FNumberlessExportPath, FNumberlessPair, FValueId } from 'ue4/registry/objects/AssetDataTagMap';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FNameEntryId } from 'ue4/objects/uobject/NameTypes';
	import { FAssetRegistryReader } from 'ue4/registry/reader/AssetRegistryArchive';
	export const OLD_BEGIN_MAGIC = 305419896;
	export const BEGIN_MAGIC = 305419897;
	export const END_MAGIC = 2271560481;
	/** Stores a fixed set of values and all the key-values maps used for lookup */
	export class FStore {
	    Ar: FAssetRegistryReader;
	    constructor(Ar: FAssetRegistryReader);
	    pairs: FNumberedPair[];
	    numberlessPairs: FNumberlessPair[];
	    ansiStringOffsets: number[];
	    ansiStrings: Buffer;
	    wideStringOffsets: number[];
	    wideStrings: Buffer;
	    numberlessNames: FNameEntryId[];
	    names: FName[];
	    numberlessExportPaths: FNumberlessExportPath[];
	    exportPaths: FAssetRegistryExportPath[];
	    texts: string[];
	    nameMap: string[];
	    getLoadOrder(initialMagic: number): ELoadOrder;
	    getAnsiString(idx: number): string;
	    getWideString(idx: number): string;
	}
	export enum ELoadOrder {
	    Member = "Member",
	    TextFirst = "TextFirst"
	}
	export class FPartialMapHandle {
	    int: number;
	    bHasNumberlessKeys: boolean;
	    num: number;
	    pairBegin: number;
	    constructor(int: number);
	    makeFullHandle(store: FStore): FMapHandle;
	    toInt(): number;
	}
	export class FValueHandle {
	    store: FStore;
	    id: FValueId;
	    constructor(store: FStore, id: FValueId);
	    asString(): string;
	}

}
declare module 'ue4/registry/reader/AssetRegistryArchive' {
	import { FArchiveProxy } from 'ue4/reader/FArchiveProxy';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FAssetData } from 'ue4/registry/objects/FAssetData';
	import { FStore } from 'ue4/registry/objects/AssetDataTagMapSerializationDetails';
	import { FName } from 'ue4/objects/uobject/FName';
	export abstract class FAssetRegistryArchive extends FArchiveProxy {
	    constructor(wrappedAr: FArchive);
	    abstract serializeTagsAndBundles(out: FAssetData): any;
	}
	export const ASSET_REGISTRY_NUMBERED_NAME_BIT = 2147483648;
	export class FAssetRegistryReader extends FAssetRegistryArchive {
	    names: string[];
	    tags: FStore;
	    constructor(inner: FArchive);
	    clone(): FAssetRegistryReader;
	    readFName(): FName;
	    serializeTagsAndBundles(out: FAssetData): void;
	    private loadTags;
	}

}
declare module 'ue4/registry/reader/NameTableArchive' {
	import { FAssetRegistryArchive } from 'ue4/registry/reader/AssetRegistryArchive';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FName, FNameEntry } from 'ue4/objects/uobject/FName';
	import { FAssetData } from 'ue4/registry/objects/FAssetData';
	export class FNameTableArchiveReader extends FAssetRegistryArchive {
	    nameMap: FNameEntry[];
	    constructor(wrappedArchive: FArchive);
	    clone(): FNameTableArchiveReader;
	    private serializeNameMap;
	    readFName(): FName;
	    serializeTagsAndBundles(out: FAssetData): void;
	}

}
declare module 'ue4/registry/objects/FAssetIdentifier' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FArchive } from 'ue4/reader/FArchive';
	export class FAssetIdentifier {
	    packageName: FName;
	    primaryAssetType: FName;
	    objectName: FName;
	    valueName: FName;
	    constructor(Ar: FArchive);
	}

}
declare module 'ue4/registry/objects/FDependsNode' {
	import { FAssetIdentifier } from 'ue4/registry/objects/FAssetIdentifier';
	import BitSet from 'bitset';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FAssetRegistryVersion } from 'ue4/registry/objects/FAssetRegistryVersion';
	export const packageFlagWidth = 3;
	export const packageFlagSetWidth: number;
	export const manageFlagWidth = 1;
	export const manageFlagSetWidth: number;
	export class FDependsNode {
	    /** The name of the package/object this node represents */
	    identifier: FAssetIdentifier;
	    packageDependencies: FDependsNode[];
	    nameDependencies: FDependsNode[];
	    manageDependencies: FDependsNode[];
	    referencers: FDependsNode[];
	    packageFlags: BitSet;
	    manageFlags: BitSet;
	    serializeLoad(Ar: FArchive, getNodeFromSerializeIndex: (n: number) => FDependsNode): void;
	    serializeLoadBeforeFlags(Ar: FArchive, version: FAssetRegistryVersion, preallocatedDependsNodeDataBuffer: FDependsNode[], numDependsNodes: number): void;
	}

}
declare module 'ue4/registry/objects/FMD5Hash' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FArchive } from 'ue4/reader/FArchive';
	export class FMD5Hash {
	    hash?: Buffer;
	    constructor(Ar: FArchive);
	}

}
declare module 'ue4/registry/objects/FAssetPackageData' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FMD5Hash } from 'ue4/registry/objects/FMD5Hash';
	export class FAssetPackageData {
	    packageName: FName;
	    diskSize: number;
	    packageGuid: FGuid;
	    cookedHash?: FMD5Hash;
	    constructor(Ar: FArchive, serializeHash: boolean);
	}

}
declare module 'ue4/registry/AssetRegistry' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FArchive } from 'ue4/reader/FArchive';
	import { FAssetData } from 'ue4/registry/objects/FAssetData';
	import { FDependsNode } from 'ue4/registry/objects/FDependsNode';
	import { FAssetPackageData } from 'ue4/registry/objects/FAssetPackageData';
	export class AssetRegistry {
	    preallocatedAssetDataBuffer: FAssetData[];
	    preallocatedDependsNodeDataBuffer: FDependsNode[];
	    preallocatedPackageDataBuffer: FAssetPackageData[];
	    originalAr: FArchive;
	    fileName: string;
	    constructor(originalAr: FArchive, fileName: string);
	    constructor(bytes: Buffer, fileName: string);
	    private loadDependencies;
	    private loadDependenciesBeforeFlags;
	}

}
declare module 'encryption/aes/Aes' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	/**
	 * Class to handle aes encryption
	 */
	export class Aes {
	    /**
	     * Block size
	     * @type {number}
	     * @public
	     * @static
	     */
	    static BLOCK_SIZE: number;
	    /**
	     * Parses an aes key string
	     * @param {string} key Key to parse
	     * @returns {Buffer} Key as hex buffer
	     * @public
	     * @static
	     */
	    static parseKey(key: string): Buffer;
	    /**
	     * Decrypts a buffer
	     * @param {Buffer} data Data to decrypt
	     * @param {string} key Key to use for decryption
	     * @returns {Buffer} Decrypted buffer
	     * @public
	     * @static
	     */
	    static decrypt(data: Buffer, key: Buffer): Buffer;
	    /**
	     * Encrypts a buffer
	     * @param {Buffer} data Data to encrypt
	     * @param {string} key Key to use for encryption
	     * @returns {Buffer} Encrypted buffer
	     * @public
	     * @static
	     */
	    static encrypt(data: Buffer, key: Buffer): Buffer;
	}

}
declare module 'oodle/Exceptions' {
	/**
	 * Creates a normal oodle exception
	 * @param {string} message Message to use
	 * @returns {Error} Exception
	 */
	export function OodleException(message: string): Error;
	/**
	 * Creates a decompress oodle exception
	 * @param {string} message Message to use
	 * @returns {Error} Exception
	 */
	export function DecompressException(message: string): Error;
	/**
	 * Creates a compress oodle exception
	 * @param {string} message Message to use
	 * @returns {Error} Exception
	 */
	export function CompressException(message: string): Error;

}
declare module 'oodle/Oodle' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	export const COMPRESSOR_LZH = 0;
	export const COMPRESSOR_LZHLW = 1;
	export const COMPRESSOR_LZNIB = 2;
	export const COMPRESSOR_NONE = 3;
	export const COMPRESSOR_LZB16 = 4;
	export const COMPRESSOR_LZBLW = 5;
	export const COMPRESSOR_LZA = 6;
	export const COMPRESSOR_LZNA = 7;
	export const COMPRESSOR_KRAKEN = 8;
	export const COMPRESSOR_MERMAID = 9;
	export const COMPRESSOR_BITKNIT = 10;
	export const COMPRESSOR_SELKIE = 11;
	export const COMPRESSOR_HYDRA = 12;
	export const COMPRESSOR_LEVIATHAN = 13;
	export const COMPRESSION_LEVEL_NONE = 0;
	export const COMPRESSION_LEVEL_SUPER_FAST = 1;
	export const COMPRESSION_LEVEL_VERY_FAST = 2;
	export const COMPRESSION_LEVEL_FAST = 3;
	export const COMPRESSION_LEVEL_NORMAL = 4;
	export const COMPRESSION_LEVEL_OPTIMAL1 = 5;
	export const COMPRESSION_LEVEL_OPTIMAL2 = 6;
	export const COMPRESSION_LEVEL_OPTIMAL3 = 7;
	export const COMPRESSION_LEVEL_OPTIMAL4 = 8;
	export const COMPRESSION_LEVEL_OPTIMAL5 = 9;
	/**
	 * Oodle class which handles oodle de-/compression
	 */
	export class Oodle {
	    /**
	     * Stores the loaded .dll library
	     * @type {OodleLibrary}
	     * @public
	     * @static
	     */
	    static oodleLib: OodleLibrary;
	    /**
	     * Decompresses an Oodle compressed array
	     * @param {Buffer} src The compressed source data
	     * @param {number} dstLen The uncompressed length
	     * @returns {Buffer} The decompressed data
	     * @throws {DecompressException} When the decompression fails
	     * @public
	     * @static
	     */
	    static decompress(src: Buffer, dstLen: number): Buffer;
	    /**
	     * Decompresses an Oodle compressed array
	     * @param {Buffer} src The compressed source data
	     * @param {Buffer} dst The destination buffer
	     * @throws DecompressException When the decompression fails
	     * @throws {Error} When the library could not be loaded
	     * @public
	     * @static
	     */
	    static decompress(src: Buffer, dst: Buffer): Buffer;
	    /**
	     * Decompresses an Oodle compressed array
	     * @param {Buffer} src The compressed source data
	     * @param {number} srcOff The offset into `src`
	     * @param {number} srcLen The compressed length
	     * @param {Buffer} dst The destination buffer
	     * @param {number} dstOff The offset into `dst`
	     * @param {number} dstLen The uncompressed length
	     * @throws {DecompressException} When the decompression fails
	     * @throws {SyntaxError} When the library could not be loaded
	     * @public
	     * @static
	     */
	    static decompress(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number): Buffer;
	    /**
	     * Compresses a byte array
	     * @param {Buffer} uncompressed The uncompressed source data
	     * @param {number} compressor The compressor to use
	     * @param {number} compressionLevel The compression level to use
	     * @returns {Buffer} The compressed data
	     * @throws {CompressException} When the compression fails
	     * @throws {SyntaxError} When the library could not be loaded
	     * @public
	     * @static
	     */
	    static compress(uncompressed: Buffer, compressor: number, compressionLevel: number): Buffer;
	    /**
	     * Loads the .dll library
	     * @public
	     * @static
	     */
	    static ensureLib(): void;
	}
	/**
	 * Structure of oodle library
	 */
	interface OodleLibrary {
	    /**
	     * Decompresses a byte array
	     * @param {Buffer} src_buf
	     * @param {number} src_len
	     * @param {Buffer} dst
	     * @param {number} dst_size
	     * @param {number} fuzz
	     * @param {number} crc
	     * @param {number} verbose
	     * @param {?Buffer} dst_base
	     * @param {number} e
	     * @param {?Buffer} cb
	     * @param {?Buffer} cb_ctx
	     * @param {?Buffer} scratch
	     * @param {number} scratch_size
	     * @param {number} threadPhase
	     * @returns {number}
	     * @public
	     */
	    OodleLZ_Decompress(src_buf: Buffer, src_len: number, dst: Buffer, dst_size: number, fuzz: number, crc: number, verbose: number, dst_base: Buffer | null, e: number, cb: Buffer | null, cb_ctx: Buffer | null, scratch: Buffer | null, scratch_size: number, threadPhase: number): number;
	    /**
	     * Compresses a byte array
	     * @param {number} codec
	     * @param {Buffer} src_buf
	     * @param {number} src_len
	     * @param {Buffer} dst_buf
	     * @param {number} level
	     * @param {?Buffer} opts
	     * @param {number} offs
	     * @param {number} unused
	     * @param {?Buffer} scratch
	     * @param {number} scratch_size
	     * @returns {number}
	     * @public
	     */
	    OodleLZ_Compress(codec: number, src_buf: Buffer, src_len: number, dst_buf: Buffer, level: number, opts: Buffer | null, offs: number, unused: number, scratch: Buffer | null, scratch_size: number): number;
	}
	export {};

}
declare module 'compression/Compression' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import Collection from '@discordjs/collection';
	/**
	 * Class to handle compression quickly
	 */
	export class Compression {
	    /**
	     * Stores compression handlers
	     * @type {Collection<string, CompressionHandler>}
	     * @static
	     * @public
	     */
	    static handlers: Collection<string, CompressionHandler>;
	    /**
	     * Initiates the compression class
	     * @returns {void}
	     * @private
	     * @static
	     */
	    private static init;
	    /**
	     * Uncompresses a buffer
	     * @param formatName Name of compression to use
	     * @param compressedBuffer The buffer to decompress
	     * @param uncompressedSize The size of the uncompress buffer
	     * @returns {void}
	     * @public
	     */
	    static uncompress0(formatName: string, compressedBuffer: Buffer, uncompressedSize: number): Buffer;
	    /**
	     * Uncompresses a buffer
	     * @param formatName Name of compression to use
	     * @param compressedBuffer The buffer to decompress
	     * @param uncompressedBuffer A buffer allocated for the decompressed data
	     * @returns {void}
	     * @public
	     */
	    static uncompress1(formatName: string, compressedBuffer: Buffer, uncompressedBuffer: Buffer): void;
	    /**
	     * Uncompresses a buffer
	     * @param formatName Name of compression to use
	     * @param uncompressedBuffer A buffer allocated for the decompressed data
	     * @param uncompressedBufferOff Offset of the allocated buffer for decompression
	     * @param uncompressedSize Size of the allocated buffer for decompression
	     * @param compressedBuffer Buffer to decompress
	     * @param compressedBufferOff Offset of the compressed buffer
	     * @param compressedSize Size of the compressed buffer
	     * @returns {void}
	     * @public
	     */
	    static uncompress(formatName: string, uncompressedBuffer: Buffer, uncompressedBufferOff: number, uncompressedSize: number, compressedBuffer: Buffer, compressedBufferOff: number, compressedSize: number): void;
	}
	/**
	 * Interface of a compression handler
	 */
	export interface CompressionHandler {
	    /**
	     * Decompresses a buffer
	     * @param {Buffer} dst Buffer to decompress to
	     * @param {number} dstOff Offset of the buffer to decompress to
	     * @param {number} dstLen Length of the buffer to decompress to
	     * @param {Buffer} src Compressed buffer
	     * @param {number} srcOff Offset of the compressed Buffer
	     * @param {number} srcLen Length of the compressed Buffer
	     * @returns {void}
	     * @public
	     * @static
	     */
	    decompress?(dst: Buffer, dstOff: number, dstLen: number, src: Buffer, srcOff: number, srcLen: number): void;
	}

}
declare module 'ue4/pak/PakFileReader' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FPakInfo } from 'ue4/pak/objects/FPakInfo';
	import { GameFile } from 'ue4/pak/GameFile';
	import { FArchive } from 'ue4/reader/FArchive';
	import Collection from '@discordjs/collection';
	/**
	 * UE4 Pak File Reader
	 */
	export class PakFileReader {
	    /**
	     * Path to file
	     * @type {string}
	     * @public
	     */
	    path: string;
	    /**
	     * UE4 Reader
	     * @type {FArchive}
	     * @public
	     */
	    Ar: FArchive;
	    /**
	     * Game that is used
	     * @type {number}
	     * @public
	     */
	    game: number;
	    /**
	     * Info about pak
	     * @type {FPakInfo}
	     * @public
	     */
	    pakInfo: FPakInfo;
	    /**
	     * Aes key for pak
	     * @type {?Buffer}
	     * @public
	     */
	    aesKey: Buffer;
	    /**
	     * Mount point for pak
	     * @type {string}
	     * @public
	     */
	    mountPoint: string;
	    /**
	     * Amount of encrypted files
	     * @type {number}
	     * @public
	     */
	    encryptedFileCount: number;
	    /**
	     * Files in this pak
	     * @type {Collection<string, GameFile>}
	     * @public
	     */
	    files: Collection<string, GameFile>;
	    /**
	     * Creates an instance
	     * @param {string} path Path to file
	     * @param {?number} game Game that is used
	     * @constructor
	     * @public
	     */
	    constructor(path: string, game?: number);
	    /**
	     * Turns this into a string
	     * @returns {string}
	     * @public
	     */
	    toString(): string;
	    /**
	     * Wether if it is encrypted or not
	     * @returns {boolean}
	     * @public
	     */
	    isEncrypted(): boolean;
	    /**
	     * Extracts a file
	     * @param {GameFile} gameFile File to extract
	     * @returns {Buffer}
	     * @public
	     */
	    extract(gameFile: GameFile): Buffer;
	    /**
	     * Reads index of pak
	     * @returns {Map<string, GameFile>} Files
	     * @public
	     */
	    readIndex(): Map<string, GameFile>;
	    /**
	     * Reads index of old pak
	     * @returns {Map<string, GameFile>} Files
	     * @public
	     */
	    private readIndexLegacy;
	    /**
	     * Reads index of new pak
	     * @returns {Map<string, GameFile>} Files
	     * @public
	     */
	    private readIndexUpdated;
	    /**
	     * Reads bit entry
	     * @param {FByteArchive} Ar Reader to use
	     * @returns {FPakEntry} Entry
	     * @private
	     */
	    private readBitEntry;
	    /**
	     * Replaces a file extension
	     * @param {string} k Source
	     * @param {string} v Replacement
	     * @returns {string}
	     * @private
	     * @static
	     */
	    private static extension;
	    /**
	     * Reads and decrypts data
	     * @param {number} num Amount of bytes to read
	     * @param {boolean} isEncrypted Wether if those are encrypted
	     * @returns {Buffer} Bytes
	     * @private
	     */
	    private readAndDecrypt;
	    /**
	     * Fixes a mount point
	     * @param {string} mountPoint Current mount point
	     * @returns {string}
	     * @private
	     */
	    private fixMountPoint;
	    /**
	     * Checks index bytes
	     * @returns {Buffer} Index bytes
	     * @public
	     */
	    indexCheckBytes(): Buffer;
	    /**
	     * Tests if an aes key works
	     * @param {string} key Aes key to test
	     * @returns {boolean}
	     * @public
	     */
	    testAesKey(key: string): any;
	    /**
	     * Tests if an aes key works
	     * @param {Buffer} key Aes key to test
	     * @returns {boolean}
	     * @public
	     */
	    testAesKey(key: Buffer): any;
	    /**
	     * Tests if an aes key works with specified bytes
	     * @param {Buffer} bytes Bytes to test
	     * @param {Buffer} key Key to test
	     * @returns {boolean}
	     * @public
	     */
	    testAesKey(bytes: Buffer, key: Buffer): any;
	    /**
	     * Wether if pak has valid index
	     * @param {Buffer} bytes Bytes to read from
	     * @returns {boolean}
	     * @param
	     */
	    isValidIndex(bytes: Buffer): boolean;
	}

}
declare module 'ue4/io/IoDirectoryIndex' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FArchive } from 'ue4/reader/FArchive';
	import { FIoDirectoryIndexHandle } from 'ue4/io/IoDispatcher';
	export class FIoDirectoryIndexEntry {
	    name: number;
	    firstChildEntry: number;
	    nextSiblingEntry: number;
	    firstFileEntry: number;
	    constructor(Ar: FArchive);
	}
	export class FIoFileIndexEntry {
	    name: number;
	    nextFileEntry: number;
	    userData: number;
	    constructor(Ar: FArchive);
	}
	export class FIoDirectoryIndexResource {
	    mountPoint: string;
	    directoryEntries: FIoDirectoryIndexEntry[];
	    fileEntries: FIoFileIndexEntry[];
	    stringTable: string[];
	    constructor(Ar: FArchive);
	} type FDirectoryIndexVisitorFunction = (filename: string, tocEntryIndex: number) => boolean;
	export class FIoDirectoryIndexReader {
	    buffer: Buffer;
	    decryptionKey: Buffer;
	    constructor(buffer: Buffer, decryptionKey: Buffer);
	    get directoryIndex(): FIoDirectoryIndexResource;
	    getMountPoint(): string;
	    getChildDirectory(directory: FIoDirectoryIndexHandle): FIoDirectoryIndexHandle;
	    getNextDirectory(directory: FIoDirectoryIndexHandle): FIoDirectoryIndexHandle;
	    getFile(directory: FIoDirectoryIndexHandle): FIoDirectoryIndexHandle;
	    getNextFile(directory: FIoDirectoryIndexHandle): FIoDirectoryIndexHandle;
	    getDirectoryName(directory: FIoDirectoryIndexHandle): string;
	    getFileName(directory: FIoDirectoryIndexHandle): string;
	    getFileData(file: FIoDirectoryIndexHandle): number;
	    iterateDirectoryIndex(directoryIndexHandle: FIoDirectoryIndexHandle, path: string, visit: FDirectoryIndexVisitorFunction): boolean;
	    private getDirectoryEntry;
	    private getFileEntry;
	    private isValidIndex;
	}
	export {};

}
declare module 'ue4/io/IoStore' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FArchive } from 'ue4/reader/FArchive';
	import { EIoContainerFlags, FIoChunkHash, FIoChunkId, FIoStoreEnvironment } from 'ue4/io/IoDispatcher';
	import { uint16, uint32, uint64, uint8 } from 'Types';
	import { UnrealMap } from 'util/UnrealMap';
	import { GameFile } from 'ue4/pak/GameFile';
	import { FIoDirectoryIndexReader } from 'ue4/io/IoDirectoryIndex';
	import { Lazy } from 'util/Lazy';
	import Collection from '@discordjs/collection';
	/**
	 * I/O store container format version
	 */
	export enum EIoStoreTocVersion {
	    Invalid = 0,
	    Initial = 1,
	    DirectoryIndex = 2,
	    PartitionSize = 3,
	    LatestPlusOne = 4,
	    Latest = 3
	}
	/**
	 * I/O Store TOC header
	 */
	export class FIoStoreTocHeader {
	    static TocMagicImg: string;
	    tocMagic: Buffer;
	    version: EIoStoreTocVersion;
	    reserved0: uint8;
	    reserved1: uint16;
	    tocHeaderSize: uint32;
	    tocEntryCount: uint32;
	    tocCompressedBlockEntryCount: uint32;
	    tocCompressedBlockEntrySize: uint32;
	    compressionMethodNameCount: uint32;
	    compressionMethodNameLength: uint32;
	    compressionBlockSize: uint32;
	    directoryIndexSize: uint32;
	    partitionCount: uint32;
	    containerId: bigint;
	    encryptionKeyGuid: FGuid;
	    containerFlags: EIoContainerFlags;
	    reserved3: uint8;
	    reserved4: uint16;
	    reserved5: uint32;
	    partitionSize: uint64;
	    reserved6: bigint[];
	    constructor(Ar: FArchive);
	    makeMagic(): void;
	    checkMagic(): boolean;
	}
	/**
	 * Combined offset and length
	 */
	export class FIoOffsetAndLength {
	    offsetAndLength: Buffer;
	    constructor(Ar?: FArchive);
	    get offset(): uint64;
	    get length(): uint64;
	}
	export enum FIoStoreTocEntryMetaFlags {
	    None = 0,
	    Compressed = 1,
	    MemoryMapped = 2
	}
	/**
	 * TOC entry meta data
	 */
	export class FIoStoreTocEntryMeta {
	    chunkHash: FIoChunkHash;
	    flags: FIoStoreTocEntryMetaFlags;
	    constructor(Ar: FArchive);
	}
	/**
	 * Compression block entry
	 */
	export class FIoStoreTocCompressedBlockEntry {
	    static OffsetBits: number;
	    static OffsetMask: bigint;
	    static SizeBits: number;
	    static SizeMask: number;
	    static SizeShift: number;
	    data: Buffer;
	    constructor(Ar: FArchive);
	    get offset(): uint64;
	    get compressedSize(): uint32;
	    get uncompressedSize(): uint32;
	    get compressionMethodIndex(): uint8;
	}
	/**
	 * TOC resource read options.
	 */
	export enum EIoStoreTocReadOptions {
	    Default = 0,
	    ReadDirectoryIndex = 1,
	    ReadTocMeta = 2,
	    ReadAll = 3
	}
	/**
	 * Container TOC data.
	 */
	export class FIoStoreTocResource {
	    static CompressionMethodNameLen: number;
	    header: FIoStoreTocHeader;
	    chunkIds: FIoChunkId[];
	    chunkOffsetLengths: FIoOffsetAndLength[];
	    compressionBlocks: FIoStoreTocCompressedBlockEntry[];
	    compressionMethods: string[];
	    chunkBlockSignatures: Buffer[];
	    chunkMetas: FIoStoreTocEntryMeta[];
	    directoryIndexBuffer: Buffer;
	    chunkIdToIndex: Collection<string, number>;
	    read(tocBuffer: FArchive, readOptions: EIoStoreTocReadOptions): void;
	    getTocEntryIndex(chunkId: FIoChunkId): number;
	    getOffsetAndLength(chunkId: FIoChunkId): FIoOffsetAndLength;
	}
	export class FIoStoreReader {
	    private toc;
	    private decryptionKey?;
	    private containerFileHandles;
	    directoryIndexReader: Lazy<FIoDirectoryIndexReader>;
	    environment: FIoStoreEnvironment;
	    initialize(environment: FIoStoreEnvironment, decryptionKeys: UnrealMap<FGuid, Buffer>): void;
	    get containerId(): bigint;
	    get containerFlags(): EIoContainerFlags;
	    get encryptionKeyGuid(): FGuid;
	    read(chunkId: FIoChunkId): Buffer;
	    getFiles(): GameFile[];
	}

}
declare module 'ue4/objects/uobject/FPackageId' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FArchive } from 'ue4/reader/FArchive';
	export const INVALID_ID: string;
	export function createFPackageId(name: FName): bigint;
	/**
	 * @deprecated Use '<FArchive>.readUInt64().toString()' or 'createFPackageId(<FName>)'
	 */
	export class FPackageId {
	    static fromName(name: FName): FPackageId;
	    id: string;
	    constructor();
	    constructor(id: string);
	    constructor(Ar: FArchive);
	    isValid(): boolean;
	    value(): string;
	    equals(other: any): boolean;
	    hashCode(): string;
	    toString(): string;
	}

}
declare module 'fileprovider/FileProvider' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { Ue4Version } from 'ue4/versions/Game';
	import { GameFile } from 'ue4/pak/GameFile';
	import { Package } from 'ue4/assets/Package';
	import { TypeMappingsProvider } from 'ue4/assets/mappings/TypeMappingsProvider';
	import { Locres } from 'ue4/locres/Locres';
	import { FnLanguage } from 'ue4/locres/FnLanguage';
	import { AssetRegistry } from 'ue4/registry/AssetRegistry';
	import { FIoChunkId } from 'ue4/io/IoDispatcher';
	import { IoPackage } from 'ue4/assets/IoPackage';
	import { UnrealMap } from 'util/UnrealMap';
	import { PakFileReader } from 'ue4/pak/PakFileReader';
	import { FIoStoreReader } from 'ue4/io/IoStore';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FPackageStore } from 'ue4/asyncloading2/FPackageStore';
	import { Lazy } from 'util/Lazy';
	import Collection from '@discordjs/collection';
	import EventEmitter from 'events';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { IConfig } from 'Config';
	/**
	 * The main hub for interacting with ue4 assets
	 * @extends {EventEmitter}
	 */
	export class FileProvider extends EventEmitter {
	    /**
	     * Path to paks folder
	     * @type {string}
	     * @public
	     */
	    folder: string;
	    /**
	     * Wether global data is loaded or not
	     * @type {boolean}
	     * @protected
	     */
	    protected globalDataLoaded: boolean;
	    /**
	     * Game which is being used
	     * @type {Ue4Version}
	     * @public
	     */
	    game: Ue4Version;
	    /**
	     * Type mappings to use
	     * @type {TypeMappingsProvider}
	     * @public
	     */
	    mappingsProvider: TypeMappingsProvider;
	    /**
	     * Non I/O store files in current instance
	     * @type {Collection<string, GameFile>}
	     * @public
	     */
	    files: Collection<string, GameFile>;
	    /**
	     * Non mounted paks
	     * @type {Array<PakFileReader>}
	     * @public
	     */
	    unloadedPaks: PakFileReader[];
	    /**
	     * Mounted paks
	     * @type {Array<PakFileReader>}
	     * @public
	     */
	    mountedPaks: PakFileReader[];
	    /**
	     * Mounted I/O store readers
	     * @type {Array<FIoStoreReader>}
	     * @public
	     */
	    mountedIoStoreReaders: FIoStoreReader[];
	    /**
	     * AES keys required for readers
	     * @see {unloadedPaks}
	     * @type {Array<FGuid>}
	     * @public
	     */
	    requiredKeys: FGuid[];
	    /**
	     * Stored AES keys
	     * @type {UnrealMap<FGuid, Buffer>}
	     * @public
	     */
	    keys: UnrealMap<FGuid, Buffer>;
	    /**
	     * Global package store (used in e.g fortnite, handles I/O file entries)
	     * @type {Lazy<FPackageStore>}
	     * @public
	     */
	    globalPackageStore: Lazy<FPackageStore>;
	    /**
	     * Local files
	     * @type {Set<string>}
	     * @public
	     */
	    localFiles: Set<string>;
	    /**
	     * Wether to populate I/O store files
	     * @type {boolean}
	     * @see {globalPackageStore}
	     * @public
	     */
	    populateIoStoreFiles: boolean;
	    /**
	     * Creates a new instance of the file provider
	     * @param {string} folder Path to pak folder
	     * @param {?Ue4Version} game Used game
	     * @param {?TypeMappingsProvider} mappingsProvider Type mappings provider to use
	     * @param {?Config} config Configurations for the lib
	     * @public
	     */
	    constructor(folder: string, game?: Ue4Version, mappingsProvider?: TypeMappingsProvider, config?: IConfig);
	    /**
	     * Gets stored AES keys as strings
	     * @type {UnrealMap<FGuid, string>}
	     * @public
	     */
	    get keysStr(): UnrealMap<FGuid, string>;
	    /**
	     * Submits an aes key to mount
	     * @param {FGuid} guid
	     * @param {Buffer} key
	     * @returns {Promise<void>}
	     * @public
	     */
	    submitKey(guid: FGuid, key: Buffer | string): Promise<void>;
	    /**
	     * Submits aes key strings to mount
	     * @param {UnrealMap<FGuid, string>} keys
	     * @returns {Promise<void>}
	     * @public
	     */
	    submitKeysStr(keys: UnrealMap<FGuid, string>): Promise<void>;
	    /**
	     * Submits aes key strings to mount
	     * @param {UnrealMap<FGuid, string>} keys
	     * @returns {Promise<void>}
	     * @public
	     */
	    submitKeys(keys: UnrealMap<FGuid, Buffer>): Promise<void>;
	    /**
	     * Filters unloaded paks that match the provided guid
	     * @param {FGuid} guid Guid to look for
	     * @returns {Array<PakFileReader>} Readers that matched the guid
	     * @public
	     */
	    unloadedPaksByGuid(guid: FGuid): PakFileReader[];
	    /**
	     * Submits keys asynchronously
	     * @param {UnrealMap<FGuid, Buffer>} newKeys Keys to submit
	     * @returns {Promise<void>}
	     * @public
	     */
	    submitKeysAsync(newKeys: UnrealMap<FGuid, Buffer>): Promise<void>;
	    /**
	     * Name of the game that is loaded by the provider
	     * @type {string}
	     * @public
	     */
	    get gameName(): string;
	    /**
	     * Searches for a game file by its path
	     * @param {string} filePath The path to search for
	     * @returns {?GameFile} The game file or null if it wasn't found
	     * @public
	     */
	    findGameFile(filePath: string): GameFile;
	    /**
	     * Loads a UE4 package
	     * @param {GameFile} file The game file to load
	     * @returns {?Package} The parsed package or null if the file was not an ue4 package (.uasset)
	     * @public
	     */
	    loadGameFile(file: GameFile): Package;
	    /**
	     * Loads a UE4 package from I/O Store by package ID
	     * @param {bigint} packageId The package ID to load
	     * @returns {?IoPackage} The parsed package or null if not found
	     * @public
	     */
	    loadGameFile(packageId: bigint): IoPackage;
	    /**
	     * Searches for the game file and then load its contained package
	     * @param {string} filePath The path to search for
	     * @returns {?Package} The parsed package or null if the path was not found or the found game file was not an ue4 package (.uasset)
	     * @public
	     */
	    loadGameFile(filePath: string): Package;
	    /**
	     * Loads an ue4 object
	     * @param {string} objectPath Path to the object
	     * @param {?string} objectName Name of the object (could be left out)
	     * @returns {?UObject} The object that matched your args or null
	     * @public
	     */
	    loadObject<T extends UObject>(objectPath: string | FSoftObjectPath, objectName?: string): T;
	    /**
	     * Searches for the game file and then load its contained locres
	     * @param {string} filePath The path to search for
	     * @returns {?Locres} The parsed package or null if the path was not found or the found game file was not an ue4 package (.uasset)
	     * @public
	     */
	    loadLocres(filePath: string): Locres;
	    /**
	     * Loads a UE4 Locres file
	     * @param {string} file The game file to load
	     * @returns {?Locres} The parsed locres or null if the file was not an ue4 locres (.locres)
	     * @public
	     */
	    loadLocres(file: GameFile): Locres;
	    /**
	     * Gets a locres language by path
	     * @param {string} filePath Path to the locres file
	     * @returns {FnLanguage} The locres language
	     * @public
	     */
	    getLocresLanguageByPath(filePath: string): FnLanguage;
	    /**
	     * Searches for the game file and then loads a UE4 AssetRegistry file
	     * @param {string} filePath The path to search for
	     * @returns {?AssetRegistry} The parsed asset registry or null
	     * @public
	     */
	    loadAssetRegistry(filePath: string): AssetRegistry;
	    /**
	     * Loads a UE4 AssetRegistry file
	     * @param {string} file The game file to load
	     * @returns {?AssetRegistry} The parsed asset registry or null
	     * @public
	     */
	    loadAssetRegistry(file: GameFile): AssetRegistry;
	    /**
	     * Searches for the game file and then saves all parts of this package
	     * @param {string} filePath The path to search for
	     * @returns {?Collection<string, Buffer>} A map with the files name as key and data as value or null
	     * @public
	     */
	    savePackage(filePath: string): Collection<string, Buffer>;
	    /**
	     * Saves all parts of this package
	     * @param {GameFile} file The game file to save
	     * @returns {?Collection<string, Buffer>} A map with the files name as key and data as value
	     */
	    savePackage(file: GameFile): Collection<string, Buffer>;
	    /**
	     * Searches for the game file and then saves the it
	     * @param {string} filePath Path to the file to save
	     * @returns {?Buffer} The files data or null
	     */
	    saveGameFile(filePath: string): Buffer;
	    /**
	     * Saves the game file
	     * @param {GameFile} file The game file to save
	     * @returns {?Buffer} The files data or null
	     */
	    saveGameFile(file: GameFile): Buffer;
	    /**
	     * Saves a I/O Store chunk by its ID
	     * @param {FIoChunkId} chunkId The chunk ID
	     * @returns {Buffer} The chunk data
	     * @throws {Error}
	     */
	    saveChunk(chunkId: FIoChunkId): Buffer;
	    /**
	     * Mounts a pak file reader
	     * @param {PakFileReader} reader Reader to mount
	     * @returns {Promise<void>}
	     * @protected
	     */
	    protected mount(reader: PakFileReader): void;
	    /**
	     * Initializes the file provider
	     * @returns {Promise<void>}
	     * @public
	     */
	    initialize(): Promise<void>;
	    /**
	     * Loads the global data
	     * @param {string} path Path to the global data file
	     * @returns {void}
	     * @protected
	     */
	    protected loadGlobalData(path: string): void;
	    /**
	     * Fixes a file path
	     * @param {string} filePath File path to fix
	     * @returns {string} File path translated into the correct format
	     * @public
	     */
	    fixPath(filePath: string): string;
	    /**
	     * Compacts a file path
	     * @param {string} path Path to compact
	     * @warning This does convert FortniteGame/Plugins/GameFeatures/GameFeatureName/Content/Package into /GameFeatureName/Package
	     * @returns {string}
	     * @public
	     */
	    compactFilePath(path: string): string;
	}

}
declare module 'ue4/assets/mappings/UsmapTypeMappingsProvider' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { TypeMappingsProvider } from 'ue4/assets/mappings/TypeMappingsProvider';
	import { FArchive } from 'ue4/reader/FArchive';
	/**
	 * Type mappings provider which uses usmap
	 * @extends {TypeMappingsProvider}
	 */
	export class UsmapTypeMappingsProvider extends TypeMappingsProvider {
	    /**
	     * File magic
	     * @type {number}
	     * @static
	     * @readonly
	     * @public
	     */
	    static readonly FILE_MAGIC = 12484;
	    /**
	     * Loads a farchive instance
	     * @private
	     * @readonly
	     */
	    private readonly load;
	    /**
	     * Creates an instance using a buffer
	     * @param {Buffer} file
	     * @constructor
	     * @public
	     */
	    constructor(file: Buffer);
	    /**
	     * Creates an instnace using an farchive method
	     * @param {() => FArchive} load
	     * @constructor
	     * @public
	     */
	    constructor(load: () => FArchive);
	    /**
	     * Reloads mappings
	     * @returns {boolean} Wether if it was successful or not
	     * @public
	     */
	    reload(): boolean;
	    /**
	     * Reads compressed usmap
	     * @param {FArchive} Ar FArchive to use
	     * @returns {Buffer}
	     * @protected
	     */
	    protected readCompressedUsmap(Ar: FArchive): Buffer;
	    /**
	     * Deserializes property data
	     * @param {FUsmapNameTableArchive} FArchive to use
	     * @returns {PropertyType}
	     * @private
	     */
	    private deserializePropData;
	    /**
	     * Parses data
	     * @param {FUsmapNameTableArchive} FArchive to use
	     * @returns {void}
	     * @private
	     */
	    private parseData;
	}

}
declare module 'ue4/assets/exports/UStreamableRenderAsset' {
	import { UObject } from 'ue4/assets/exports/UObject';
	export class UStreamableRenderAsset extends UObject {
	    ForceMipLevelsToBeResidentTimestamp: number;
	    NumCinematicMipLevels: number;
	    StreamingIndex: number;
	    CachedCombinedLODBias: number;
	    CachedNumResidentLODs: boolean;
	    bCachedReadyForStreaming: boolean;
	    NeverStream: boolean;
	    bGlobalForceMipLevelsToBeResident: boolean;
	    bIsStreamable: boolean;
	    bHasStreamingUpdatePending: boolean;
	    bForceMiplevelsToBeResident: boolean;
	    bIgnoreStreamingMipBias: boolean;
	    bUseCinematicMipLevels: boolean;
	}

}
declare module 'ue4/assets/enums/ETextureChannel' {
	export enum ETextureChannel {
	    TC_NONE = 0,
	    TC_R = 1,
	    TC_G = 2,
	    TC_B = 3,
	    TC_A = 4,
	    TC_MA = 5
	}

}
declare module 'ue4/assets/enums/EMobileSpecularMask' {
	export enum EMobileSpecularMask {
	    MSM_Constant = 0,
	    MSM_Luminance = 1,
	    MSM_DiffuseRed = 2,
	    MSM_DiffuseGreen = 3,
	    MSM_DiffuseBlue = 4,
	    MSM_DiffuseAlpha = 5,
	    MSM_MaskTextureRGB = 6,
	    MSM_MaskTextureRed = 7,
	    MSM_MaskTextureGreen = 8,
	    MSM_MaskTextureBlue = 9,
	    MSM_MaskTextureAlpha = 10
	}

}
declare module 'ue4/assets/exports/mats/UMaterialInterface' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { UUnrealMaterial } from 'ue4/assets/exports/mats/interfaces/UUnrealMaterial';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FName } from 'ue4/objects/uobject/FName';
	import { UTexture } from 'ue4/assets/exports/tex/UTexture';
	import { EMobileSpecularMask } from 'ue4/assets/enums/EMobileSpecularMask';
	import { CMaterialParams } from 'ue4/converters/materials/Material';
	export class FLightmassMaterialInterfaceSettings {
	    EmissiveBoost?: number;
	    DiffuseBoost?: number;
	    ExportResolutionScale?: number;
	    bCastShadowAsMasked?: boolean;
	    bOverrideCastShadowAsMasked?: boolean;
	    bOverrideEmissiveBoost?: boolean;
	    bOverrideDiffuseBoost?: boolean;
	    bOverrideExportResolutionScale?: boolean;
	}
	export class FMaterialTextureInfo {
	    SamplingScale?: number;
	    UVChannelIndex?: number;
	    TextureName: FName;
	}
	export class UMaterialInterface extends UObject implements UUnrealMaterial {
	    SubsurfaceProfile?: FPackageIndex;
	    LightmassSettings?: FLightmassMaterialInterfaceSettings;
	    TextureStreamingData?: FMaterialTextureInfo[];
	    AssetUserData?: FPackageIndex[];
	    FlattenedTexture?: UTexture;
	    MobileBaseTexture?: UTexture;
	    MobileNormalTexture?: UTexture;
	    bUseMobileSpecular: boolean;
	    MobileSpecularPower: number;
	    MobileSpecularMask: EMobileSpecularMask;
	    MobileMaskTexture?: UTexture;
	    getParams(params: CMaterialParams): void;
	    getName(): string;
	    isTextureCube(): boolean;
	    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean): void;
	}

}
declare module 'ue4/assets/enums/EBlendMode' {
	export enum EBlendMode {
	    BLEND_Opaque = 0,
	    BLEND_Masked = 1,
	    BLEND_Translucent = 2,
	    BLEND_Additive = 3,
	    BLEND_Modulate = 4,
	    BLEND_ModulateAndAdd = 5,
	    BLEND_SoftMasked = 6,
	    BLEND_AlphaComposite = 7,
	    BLEND_DitheredTranslucent = 8
	}

}
declare module 'ue4/assets/enums/EMaterialShadingModel' {
	export enum EMaterialShadingModel {
	    MSM_Unlit = 0,
	    MSM_DefaultLit = 1,
	    MSM_Subsurface = 2,
	    MSM_PreintegratedSkin = 3,
	    MSM_ClearCoat = 4,
	    MSM_SubsurfaceProfile = 5,
	    MSM_TwoSidedFoliage = 6,
	    MSM_Hair = 7,
	    MSM_Cloth = 8,
	    MSM_Eye = 9,
	    MSM_SingleLayerWater = 10,
	    MSM_ThinTranslucent = 11,
	    MSM_NUM = 12,
	    MSM_FromMaterialExpression = 13
	}

}
declare module 'ue4/assets/objects/mats/FMaterialCachedParameters' {
	import { FMaterialParameterInfo } from 'ue4/assets/exports/mats/UMaterialInstance';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FLinearColor } from 'ue4/objects/core/math/FColor';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	export class FMaterialCachedParameters {
	    Entries: FMaterialCachedParameterEntry[];
	    ScalarValues: number[];
	    VectorValues: FLinearColor[];
	    TextureValues: FPackageIndex[];
	    FontValues: FPackageIndex;
	    FontPageValues: number[];
	    RuntimeVirtualTextureValues: FPackageIndex[];
	}
	export class FMaterialCachedParameterEntry {
	    NameHashes: number[];
	    ParameterInfos: FMaterialParameterInfo[];
	    ExpressionGuids: FGuid[];
	    Overrides: boolean[];
	}

}
declare module 'ue4/assets/exports/mats/UMaterialInstance' {
	import { UMaterialInterface } from 'ue4/assets/exports/mats/UMaterialInterface';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FLinearColor } from 'ue4/objects/core/math/FColor';
	import { Lazy } from 'util/Lazy';
	import { UTexture } from 'ue4/assets/exports/tex/UTexture';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { EBlendMode } from 'ue4/assets/enums/EBlendMode';
	import { EMaterialShadingModel } from 'ue4/assets/enums/EMaterialShadingModel';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FMaterialCachedParameters } from 'ue4/assets/objects/mats/FMaterialCachedParameters';
	export class UMaterialInstance extends UMaterialInterface {
	    PhysMaterial: FPackageIndex;
	    PhysicalMaterialMap: FPackageIndex[];
	    Parent: Lazy<UMaterialInterface>;
	    bHasStaticPermutationResource: boolean;
	    bOverrideSubsurfaceProfile: boolean;
	    ScalarParameterValues: FScalarParameterValue[];
	    VectorParameterValues: FVectorParameterValue[];
	    TextureParameterValues: FTextureParameterValue[];
	    RuntimeVirtualTextureParameterValues: FRuntimeVirtualTextureParameterValue[];
	    FontParameterValues: FFontParameterValue[];
	    BasePropertyOverrides: FMaterialInstanceBasePropertyOverrides;
	    StaticParameters: FStaticParameterSet;
	    CachedLayerParameters: FMaterialCachedParameters;
	    CachedReferencedTextures: Lazy<UObject>[];
	}
	export class FMaterialParameterInfo {
	    Name: FName;
	    Association: EMaterialParameterAssociation;
	    Index: number;
	}
	export enum EMaterialParameterAssociation {
	    LayerParameter = 0,
	    BlendParameter = 1,
	    GlobalParameter = 2
	}
	export class FScalarParameterValue {
	    ParameterInfo: FMaterialParameterInfo;
	    ParameterValue: number;
	    ExpressionGUID: FGuid;
	}
	export class FVectorParameterValue {
	    ParameterInfo: FMaterialParameterInfo;
	    ParameterValue: FLinearColor;
	    ExpressionGUID: FGuid;
	}
	export class FTextureParameterValue {
	    ParameterInfo: FMaterialParameterInfo;
	    ParameterValue: Lazy<UTexture>;
	    ExpressionGUID: FGuid;
	}
	export class FRuntimeVirtualTextureParameterValue {
	    ParameterInfo: FMaterialParameterInfo;
	    ParameterValue: FPackageIndex;
	    ExpressionGUID: FGuid;
	}
	export class FFontParameterValue {
	    ParameterInfo: FMaterialParameterInfo;
	    FontValue: FPackageIndex;
	    FontPage: number;
	    ExpressionGUID: FGuid;
	}
	export class FMaterialInstanceBasePropertyOverrides {
	    bOverride_OpacityMaskClipValue: boolean;
	    bOverride_BlendMode: boolean;
	    bOverride_ShadingModel: boolean;
	    bOverride_DitheredLODTransition: boolean;
	    bOverride_CastDynamicShadowAsMasked: boolean;
	    bOverride_TwoSided: boolean;
	    TwoSided: boolean;
	    DitheredLODTransition: boolean;
	    bCastDynamicShadowAsMasked: boolean;
	    BlendMode: EBlendMode;
	    ShadingModel: EMaterialShadingModel;
	    OpacityMaskClipValue: number;
	}
	export class FStaticParameterSet {
	    StaticSwitchParameters: FStaticSwitchParameter[];
	    StaticComponentMaskParameters: FStaticComponentMaskParameter[];
	    TerrainLayerWeightParameters: FStaticTerrainLayerWeightParameter;
	    MaterialLayersParameters: FStaticMaterialLayersParameter;
	}
	export class FStaticParameterBase {
	    ParameterInfo: FMaterialParameterInfo;
	    bOverride: boolean;
	    ExpressionGUID: FGuid;
	}
	export class FStaticSwitchParameter extends FStaticParameterBase {
	    Value: boolean;
	}
	export class FStaticComponentMaskParameter extends FStaticParameterBase {
	    R: boolean;
	    G: boolean;
	    B: boolean;
	    A: boolean;
	}
	export class FStaticTerrainLayerWeightParameter extends FStaticParameterBase {
	    WeightmapIndex: number;
	    bWeightBasedBlend: boolean;
	}
	export class FStaticMaterialLayersParameter extends FStaticParameterBase {
	    Value: FMaterialLayersFunctions;
	}
	export class FMaterialLayersFunctions {
	    Layers: FPackageIndex[];
	    Blends: FPackageIndex[];
	    LayerStates: boolean[];
	    KeyString: string;
	}

}
declare module 'ue4/assets/exports/mats/UMaterialInstanceConstant' {
	import { UMaterialInstance } from 'ue4/assets/exports/mats/UMaterialInstance';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { CMaterialParams } from 'ue4/converters/materials/Material';
	import { UUnrealMaterial } from 'ue4/assets/exports/mats/interfaces/UUnrealMaterial';
	export class UMaterialInstanceConstant extends UMaterialInstance {
	    PhysMaterialMask?: FPackageIndex;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	    getParams(params: CMaterialParams): void;
	    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean): void;
	}

}
declare module 'ue4/converters/materials/Material' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { UUnrealMaterial } from 'ue4/assets/exports/mats/interfaces/UUnrealMaterial';
	import { FLinearColor } from 'ue4/objects/core/math/FColor';
	import { ETextureChannel } from 'ue4/assets/enums/ETextureChannel';
	import { EMobileSpecularMask } from 'ue4/assets/enums/EMobileSpecularMask';
	import AdmZip from 'adm-zip';
	import Collection from '@discordjs/collection';
	export class CMaterialParams {
	    diffuse?: UUnrealMaterial;
	    normal?: UUnrealMaterial;
	    specular?: UUnrealMaterial;
	    specPower?: UUnrealMaterial;
	    opacity?: UUnrealMaterial;
	    emissive?: UUnrealMaterial;
	    cube?: UUnrealMaterial;
	    mask?: UUnrealMaterial;
	    emissiveChannel: ETextureChannel;
	    specularMaskChannel: ETextureChannel;
	    specularPowerChannel: ETextureChannel;
	    cubemapMaskChannel: ETextureChannel;
	    emissiveColor: FLinearColor;
	    useMobileSpecular: boolean;
	    mobileSpecularPower: number;
	    mobileSpecularMask: EMobileSpecularMask;
	    specularFromAlpha: boolean;
	    opacityFromAlpha: boolean;
	    constructor(diffuse?: UUnrealMaterial, normal?: UUnrealMaterial, specular?: UUnrealMaterial, specPower?: UUnrealMaterial, opacity?: UUnrealMaterial, emissive?: UUnrealMaterial, cube?: UUnrealMaterial, mask?: UUnrealMaterial, // multiple mask textures baked into a single one
	    emissiveChannel?: ETextureChannel, specularMaskChannel?: ETextureChannel, specularPowerChannel?: ETextureChannel, cubemapMaskChannel?: ETextureChannel, emissiveColor?: FLinearColor, // light-blue color
	    useMobileSpecular?: boolean, mobileSpecularPower?: number, mobileSpecularMask?: EMobileSpecularMask, // EMobileSpecularMask
	    specularFromAlpha?: boolean, opacityFromAlpha?: boolean);
	    appendAllTextures(outTextures: UUnrealMaterial[]): void;
	    get isNull(): boolean;
	}
	export class Material {
	    matFileName: string;
	    matFile: string;
	    textures: Collection<string, Buffer>;
	    parentExport?: Material;
	    constructor(matFileName: string, matFile: string, textures: Collection<string, Buffer>, parentExport?: Material);
	    writeToDir(dir: string): void;
	    appendToZip(zos: AdmZip): void;
	    toZip(): Buffer;
	    static convert(material: UUnrealMaterial): any;
	}

}
declare module 'ue4/assets/exports/mats/interfaces/UUnrealMaterial' {
	import { CMaterialParams } from 'ue4/converters/materials/Material';
	export interface UUnrealMaterial {
	    getParams(params: CMaterialParams): void;
	    isTextureCube(): boolean;
	    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean): void;
	    getName(): string;
	}

}
declare module 'ue4/assets/exports/tex/UTexture' {
	import { UStreamableRenderAsset } from 'ue4/assets/exports/UStreamableRenderAsset';
	import { UUnrealMaterial } from 'ue4/assets/exports/mats/interfaces/UUnrealMaterial';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FPerPlatformFloat } from 'ue4/objects/engine/PerPlatformProperties';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { CMaterialParams } from 'ue4/converters/materials/Material';
	export class UTexture extends UStreamableRenderAsset implements UUnrealMaterial {
	    LightingGuid: FGuid;
	    LodBias: number;
	    CompressionSettings: ETextureCompressionSettings;
	    Filter: ETextureFilter;
	    MipLoadOptions: ETextureMipLoadOptions;
	    LODGroup: ETextureGroup;
	    Downscale: FPerPlatformFloat;
	    DownscaleOptions: ETextureDownscaleOptions;
	    SRGB: boolean;
	    bNoTiling: boolean;
	    VirtualTextureStreaming: boolean;
	    CompressionYCoCg: boolean;
	    bNotOfflineProcessed: boolean;
	    bAsyncResourceReleaseHasBeenStarted: boolean;
	    AssetUserData: FPackageIndex[];
	    getParams(params: CMaterialParams): void;
	    getName(): string;
	    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean): void;
	    isTextureCube(): boolean;
	}
	export enum ETextureCompressionSettings {
	    TC_Default = 0,
	    TC_Normalmap = 1,
	    TC_Masks = 2,
	    TC_Grayscale = 3,
	    TC_Displacementmap = 4,
	    TC_VectorDisplacementmap = 5,
	    TC_HDR = 6,
	    TC_EditorIcon = 7,
	    TC_Alpha = 8,
	    TC_DistanceFieldFont = 9,
	    TC_HDR_Compressed = 10,
	    TC_BC7 = 11,
	    TC_HalfFloat = 12
	}
	export enum ETextureFilter {
	    TF_Nearest = 0,
	    TF_Bilinear = 1,
	    TF_Trilinear = 2,
	    TF_Default = 3
	}
	export enum ETextureMipLoadOptions {
	    Default = 0,
	    AllMips = 1,
	    OnlyFirstMip = 2
	}
	export enum ETextureGroup {
	    TEXTUREGROUP_World = 0,
	    TEXTUREGROUP_WorldNormalMap = 1,
	    TEXTUREGROUP_WorldSpecular = 2,
	    TEXTUREGROUP_Character = 3,
	    TEXTUREGROUP_CharacterNormalMap = 4,
	    TEXTUREGROUP_CharacterSpecular = 5,
	    TEXTUREGROUP_Weapon = 6,
	    TEXTUREGROUP_WeaponNormalMap = 7,
	    TEXTUREGROUP_WeaponSpecular = 8,
	    TEXTUREGROUP_Vehicle = 9,
	    TEXTUREGROUP_VehicleNormalMap = 10,
	    TEXTUREGROUP_VehicleSpecular = 11,
	    TEXTUREGROUP_Cinematic = 12,
	    TEXTUREGROUP_Effects = 13,
	    TEXTUREGROUP_EffectsNotFiltered = 14,
	    TEXTUREGROUP_Skybox = 15,
	    TEXTUREGROUP_UI = 16,
	    TEXTUREGROUP_Lightmap = 17,
	    TEXTUREGROUP_RenderTarget = 18,
	    TEXTUREGROUP_MobileFlattened = 19,
	    TEXTUREGROUP_ProcBuilding_Face = 20,
	    TEXTUREGROUP_ProcBuilding_LightMap = 21,
	    TEXTUREGROUP_Shadowmap = 22,
	    TEXTUREGROUP_ColorLookupTable = 23,
	    TEXTUREGROUP_Terrain_Heightmap = 24,
	    TEXTUREGROUP_Terrain_Weightmap = 25,
	    TEXTUREGROUP_Bokeh = 26,
	    TEXTUREGROUP_IESLightProfile = 27,
	    TEXTUREGROUP_Pixels2D = 28,
	    TEXTUREGROUP_HierarchicalLOD = 29,
	    TEXTUREGROUP_Impostor = 30,
	    TEXTUREGROUP_ImpostorNormalDepth = 31,
	    TEXTUREGROUP_8BitData = 32,
	    TEXTUREGROUP_16BitData = 33,
	    TEXTUREGROUP_Project01 = 34,
	    TEXTUREGROUP_Project02 = 35,
	    TEXTUREGROUP_Project03 = 36,
	    TEXTUREGROUP_Project04 = 37,
	    TEXTUREGROUP_Project05 = 38,
	    TEXTUREGROUP_Project06 = 39,
	    TEXTUREGROUP_Project07 = 40,
	    TEXTUREGROUP_Project08 = 41,
	    TEXTUREGROUP_Project09 = 42,
	    TEXTUREGROUP_Project10 = 43,
	    TEXTUREGROUP_Project11 = 44,
	    TEXTUREGROUP_Project12 = 45,
	    TEXTUREGROUP_Project13 = 46,
	    TEXTUREGROUP_Project14 = 47,
	    TEXTUREGROUP_Project15 = 48
	}
	export enum ETextureDownscaleOptions {
	    Default = 0,
	    Unfiltered = 1,
	    SimpleAverage = 2,
	    Sharpen0 = 3,
	    Sharpen1 = 4,
	    Sharpen2 = 5,
	    Sharpen3 = 6,
	    Sharpen4 = 7,
	    Sharpen5 = 8,
	    Sharpen6 = 9,
	    Sharpen7 = 10,
	    Sharpen8 = 11,
	    Sharpen9 = 12,
	    Sharpen10 = 13
	}

}
declare module 'ue4/objects/engine/FStripDataFlags' {
	import { FArchive } from 'ue4/reader/FArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FStripDataFlags {
	    globalStripFlags: number;
	    classStripFlags: number;
	    constructor(globalStripFlags: number, classStripFlags: number);
	    constructor(Ar: FArchive, minVersion?: number);
	    serialize(Ar: FArchiveWriter): void;
	    get isEditorDataStripped(): boolean;
	    get isDataStrippedForServer(): boolean;
	    isClassDataStripped(flag: number): boolean;
	}

}
declare module 'ue4/assets/enums/EBulkDataFlags' {
	export enum EBulkDataFlags {
	    /** Empty flag set. */
	    BULKDATA_None = 0,
	    /** If set, payload is stored at the end of the file and not inline. */
	    BULKDATA_PayloadAtEndOfFile = 1,
	    /** If set, payload should be [un]compressed using ZLIB during serialization. */
	    BULKDATA_SerializeCompressedZLIB = 2,
	    /** Force usage of SerializeElement over bulk serialization. */
	    BULKDATA_ForceSingleElementSerialization = 4,
	    /** Bulk data is only used once at runtime in the game. */
	    BULKDATA_SingleUse = 8,
	    /** Bulk data won't be used and doesn't need to be loaded. */
	    BULKDATA_Unused = 32,
	    /** Forces the payload to be saved inline, regardless of its size. */
	    BULKDATA_ForceInlinePayload = 64,
	    /** Flag to check if either compression mode is specified. */
	    BULKDATA_SerializeCompressed = 2,
	    /** Forces the payload to be always streamed, regardless of its size. */
	    BULKDATA_ForceStreamPayload = 128,
	    /** If set, payload is stored in a .upack file alongside the uasset. */
	    BULKDATA_PayloadInSeperateFile = 256,
	    /** DEPRECATED: If set, payload is compressed using platform specific bit window. */
	    BULKDATA_SerializeCompressedBitWindow = 512,
	    /** There is a new default to inline unless you opt out. */
	    BULKDATA_Force_NOT_InlinePayload = 1024,
	    /** This payload is optional and may not be on device. */
	    BULKDATA_OptionalPayload = 2048,
	    /** This payload will be memory mapped, this requires alignment, no compression etc. */
	    BULKDATA_MemoryMappedPayload = 4096,
	    /** Bulk data size is 64 bits long. */
	    BULKDATA_Size64Bit = 8192,
	    /** Duplicate non-optional payload in optional bulk data. */
	    BULKDATA_DuplicateNonOptionalPayload = 16384,
	    /** Indicates that an old ID is present in the data, at some point when the DDCs are flushed we can remove this. */
	    BULKDATA_BadDataVersion = 32768,
	    /** BulkData did not have it's offset changed during the cook and does not need the fix up at load time */
	    BULKDATA_NoOffsetFixUp = 65536
	}
	export function EBulkDataFlags_Check(bulkDataFlags1: number | EBulkDataFlags, bulkDataFlags2: number | EBulkDataFlags): boolean;

}
declare module 'ue4/assets/objects/FByteBulkDataHeader' {
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FArchiveWriter } from 'ue4/writer/FArchiveWriter';
	export class FByteBulkDataHeader {
	    /**
	     * Bulk data flags
	     * @type {number}
	     * @public
	     */
	    bulkDataFlags: number;
	    /**
	     * Element count
	     * @type {number}
	     * @public
	     */
	    elementCount: number;
	    /**
	     * Size on disk
	     * @type {number}
	     * @public
	     */
	    sizeOnDisk: number;
	    /**
	     * Offset in file
	     * @type {number}
	     * @public
	     */
	    offsetInFile: number;
	    /**
	     * Creates an instance using FAssetArchive
	     * @param {FAssetArchive} Ar
	     * @constructor
	     * @public
	     */
	    constructor(Ar: FAssetArchive);
	    /**
	     * Creates an instance using bulkDataFlags, elementCount, sizeOnDisk & offsetInFile
	     * @param {number} bulkDataFlags
	     * @param {number} elementCount
	     * @param {number} sizeOnDisk
	     * @param {number} offsetInFile
	     * @constructor
	     * @public
	     */
	    constructor(bulkDataFlags: number, elementCount: number, sizeOnDisk: number, offsetInFile: number);
	    /**
	     * Serializes this
	     * @param {FArchiveWriter} Ar FArchiveWriter to use
	     * @public
	     */
	    serialize(Ar: FArchiveWriter): void;
	    /**
	     * Converts this to json
	     * @returns {object} json
	     * @public
	     */
	    toJson(): {
	        bulkDataFlag: string;
	        elementCount: number;
	        sizeOnDisk: number;
	        offsetInFile: number;
	    };
	}

}
declare module 'ue4/assets/objects/FByteBulkData' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FByteBulkDataHeader } from 'ue4/assets/objects/FByteBulkDataHeader';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	/**
	 * FByteBulkData
	 */
	export class FByteBulkData {
	    /**
	     * Header of this FByteBulkData
	     * @type {FByteBulkDataHeader}
	     * @public
	     */
	    header: FByteBulkDataHeader;
	    /**
	     * Data of this FByteBulkData
	     * @type {Buffer}
	     * @public
	     */
	    data: Buffer;
	    /**
	     * Wether bulk data is loaded
	     * @type {boolean}
	     * @public
	     */
	    get isBulkDataLoaded(): boolean;
	    /**
	     * Creates an instance using FAssetArchive
	     * @param {FAssetArchive} Ar FAssetArchive to use
	     * @constructor
	     * @public
	     */
	    constructor(Ar: FAssetArchive);
	    /**
	     * Creates an instance using FByteBulkDataHeader and Buffer
	     * @param {FByteBulkDataHeader} header
	     * @param {Buffer} data
	     * @constructor
	     * @public
	     */
	    constructor(header: FByteBulkDataHeader, data: Buffer);
	    /**
	     * Serializes this
	     * @param {FAssetArchiveWriter} Ar FAssetArchiveWriter to use
	     * @returns {void}
	     * @public
	     */
	    serialize(Ar: FAssetArchiveWriter): void;
	}

}
declare module 'ue4/assets/exports/tex/UTexture2D' {
	import { UTexture } from 'ue4/assets/exports/tex/UTexture';
	import { FIntPoint } from 'ue4/objects/core/math/FIntPoint';
	import { UnrealMap } from 'util/UnrealMap';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FStripDataFlags } from 'ue4/objects/engine/FStripDataFlags';
	import { FByteBulkData } from 'ue4/assets/objects/FByteBulkData';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	export class UTexture2D extends UTexture {
	    LevelIndex?: number;
	    FirstResourceMemMip?: number;
	    bTemporarilyDisableStreaming?: boolean;
	    AddressX?: ETextureAddress;
	    AddressY?: ETextureAddress;
	    ImportedSize?: FIntPoint;
	    flag1: FStripDataFlags;
	    flag2: FStripDataFlags;
	    cooked: boolean;
	    textures: UnrealMap<FTexturePlatformData, FName>;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	    getFirstMip(): FTexture2DMipMap;
	    getFirstTexture(): FTexturePlatformData;
	    serialize(Ar: FAssetArchiveWriter): void;
	}
	export enum ETextureAddress {
	    TA_Wrap = 0,
	    TA_Clamp = 1,
	    TA_Mirror = 2
	}
	export class FTexturePlatformData {
	    sizeX: number;
	    sizeY: number;
	    numSlices: number;
	    pixelFormat: string;
	    firstMip: number;
	    mips: FTexture2DMipMap[];
	    isVirtual: boolean;
	    constructor(Ar: FAssetArchive);
	    constructor(sizeX: number, sizeY: number, numSlices: number, pixelFormat: string, firstMip: number, mips: FTexture2DMipMap[], isVirtual: boolean);
	    getFirstMip(): FTexture2DMipMap;
	    getFirstLoadedMip(): FTexture2DMipMap;
	    serialize(Ar: FAssetArchiveWriter): void;
	}
	export class FTexture2DMipMap {
	    cooked: boolean;
	    data: FByteBulkData;
	    sizeX: number;
	    sizeY: number;
	    sizeZ: number;
	    u?: string;
	    constructor(Ar: FAssetArchive);
	    constructor(cooked: boolean, data: FByteBulkData, sizeX: number, sizeY: number, sizeZ: number, u?: string);
	    serialize(Ar: FAssetArchiveWriter): void;
	}

}
declare module 'ue4/converters/textures/util/BufferStream' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	export class BufferStream {
	    protected buf: Buffer;
	    protected pos: number;
	    protected count: number;
	    protected mark: number;
	    constructor(buf: Buffer, offset?: number, length?: number);
	    read(): number;
	    read(amount: number): number;
	    read(b: Buffer, off?: number, len?: number): number;
	    readAllBytes(): Buffer;
	    readNBytes(b: Buffer, off: number, len: number): number;
	    skip(n: number): number;
	    get available(): number;
	    private getBit;
	}

}
declare module 'ue4/converters/textures/BC5' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	export function readBC5(data: Buffer, width: number, height: number): Buffer;

}
declare module 'ue4/converters/textures/Image' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FTexture2DMipMap, FTexturePlatformData, UTexture2D } from 'ue4/assets/exports/tex/UTexture2D';
	export class Image {
	    static convert(tex: UTexture2D, texture?: FTexturePlatformData, mip?: FTexture2DMipMap, config?: ImageConfig): Buffer;
	} type PixelFormat = "PF_G8" | "PF_RGB8" | "PF_RGBA8" | "PF_R8G8B8A8" | "PF_BGRA8" | "PF_B8G8R8A8" | "PF_DXT1" | "PF_DXT3" | "PF_DXT5" | "PF_DXT5N" | "PF_V8U8" | "PF_V8U8_2" | "PF_BC5" | "PF_RGBA4";
	export class PixelFormatInfo {
	    blockSizeX: number;
	    blockSizeY: number;
	    bytesPerBlock: number;
	    x360AlignX: number;
	    x360AlignY: number;
	    float: boolean;
	    pixelFormat: PixelFormat;
	    constructor(blockSizeX: number, blockSizeY: number, bytesPerBlock: number, x360AlignX: number, x360AlignY: number, float: boolean, pixelFormat: PixelFormat);
	    static PF_G8: PixelFormatInfo;
	    static PF_RGB8: PixelFormatInfo;
	    static PF_RGBA8: PixelFormatInfo;
	    static PF_R8G8B8A8: PixelFormatInfo;
	    static PF_BGRA8: PixelFormatInfo;
	    static PF_B8G8R8A8: PixelFormatInfo;
	    static PF_DXT1: PixelFormatInfo;
	    static PF_DXT3: PixelFormatInfo;
	    static PF_DXT5: PixelFormatInfo;
	    static PF_DXT5N: PixelFormatInfo;
	    static PF_V8U8: PixelFormatInfo;
	    static PF_V8U8_2: PixelFormatInfo;
	    static PF_BC5: PixelFormatInfo;
	    static PF_RGBA4: PixelFormatInfo;
	}
	export interface ImageConfig {
	    /**
	     * - Wether to use image smoothing for canvas image or not
	     * @default false
	     */
	    imageSmoothingEnabled?: boolean;
	    /**
	     * - Quality of image smoothing
	     * - Only takes effect when 'imageSmoothingEnabled' was set to true
	     * @default medium
	     */
	    imageSmoothingQuality?: ImageSmoothingQuality;
	    /**
	     * - Overall quality of the image
	     * @default good
	     */
	    quality?: "fast" | "good" | "best" | "nearest" | "bilinear";
	}
	export {};

}
declare module 'ue4/assets/exports/USoundBase' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	export class USoundBase extends UObject {
	    SoundClassObject: FPackageIndex;
	    bDebug: boolean;
	    bOverrideConcurrency: boolean;
	    bOutputToBusOnly: boolean;
	    bHasDelayNode: boolean;
	    bHasConcatenatorNode: boolean;
	    bBypassVolumeScaleForPriority: boolean;
	    VirtualizationMode: EVirtualizationMode;
	    ConcurrencyOverrides: FSoundConcurrencySettings;
	    Duration: number;
	    MaxDistance: number;
	    TotalSamples: number;
	    Priority: number;
	    AttenuationSettings: FPackageIndex;
	    VolumeModulationDestination: FSoundModulationDestinationSettings;
	    PitchModulationDestination: FSoundModulationDestinationSettings;
	    HighpassModulationDestination: FSoundModulationDestinationSettings;
	    LowpassModulationDestination: FSoundModulationDestinationSettings;
	    SoundSubmixObject: FPackageIndex;
	    SourceEffectChain: FPackageIndex;
	}
	export enum EVirtualizationMode {
	    Disabled = 0,
	    PlayWhenSilent = 1,
	    Restart = 2
	}
	export class FSoundConcurrencySettings {
	    MaxCount: number;
	    bLimitToOwner: boolean;
	    ResolutionRule: EMaxConcurrentResolutionRule;
	    RetriggerTime: number;
	    VolumeScale: number;
	    VolumeScaleMode: EConcurrencyVolumeScaleMode;
	    VolumeScaleAttackTime: number;
	    bVolumeScaleCanRelease: boolean;
	    VolumeScaleReleaseTime: number;
	    VoiceStealReleaseTime: number;
	}
	export enum EMaxConcurrentResolutionRule {
	    PreventNew = 0,
	    StopOldest = 1,
	    StopFarthestThenPreventNew = 2,
	    StopFarthestThenOldest = 3,
	    StopLowestPriority = 4,
	    StopQuietest = 5,
	    StopLowestPriorityThenPreventNew = 6,
	    Count = 7
	}
	export enum EConcurrencyVolumeScaleMode {
	    Default = 0,
	    Distance = 1,
	    Priority = 2
	}
	export class FSoundModulationDestinationSettings {
	    Value: number;
	    Modulator: FPackageIndex;
	}

}
declare module 'ue4/assets/enums/ESoundWaveLoadingBehavior' {
	export enum ESoundWaveLoadingBehavior {
	    Inherited = 0,
	    RetainOnLoad = 1,
	    PrimeOnLoad = 2,
	    LoadOnDemand = 3,
	    ForceInline = 4,
	    Uninitialized = 5
	}

}
declare module 'ue4/objects/uobject/serialization/FFormatContainer' {
	import { UnrealMap } from 'util/UnrealMap';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FByteBulkData } from 'ue4/assets/objects/FByteBulkData';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	export class FFormatContainer {
	    formats: UnrealMap<FName, FByteBulkData>;
	    constructor(Ar: FAssetArchive);
	    serialize(Ar: FAssetArchiveWriter): void;
	}

}
declare module 'ue4/assets/exports/USoundWave' {
	import { USoundBase } from 'ue4/assets/exports/USoundBase';
	import { FText } from 'ue4/objects/core/i18n/Text';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FByteBulkData } from 'ue4/assets/objects/FByteBulkData';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { ESoundWaveLoadingBehavior } from 'ue4/assets/enums/ESoundWaveLoadingBehavior';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FFormatContainer } from 'ue4/objects/uobject/serialization/FFormatContainer';
	export class USoundWave extends USoundBase {
	    CompressionQuality: number;
	    StreamingPriority: number;
	    SampleRateQuality: ESoundwaveSampleRateSettings;
	    SoundGroup: ESoundGroup;
	    bLooping: boolean;
	    bStreaming: boolean;
	    bSeekableStreaming: boolean;
	    LoadingBehavior: ESoundWaveLoadingBehavior;
	    bMature: boolean;
	    bManualWordWrap: boolean;
	    bSingleLine: boolean;
	    bIsAmbisonics: boolean;
	    FrequenciesToAnalyze: number[];
	    CookedSpectralTimeData: FSoundWaveSpectralTimeData[];
	    CookedEnvelopeTimeData: FSoundWaveEnvelopeTimeData[];
	    InitialChunkSize: number;
	    SpokenText: string;
	    SubtitlePriority: number;
	    Volume: number;
	    Pitch: number;
	    NumChannels: number;
	    SampleRate: number;
	    Subtitles: FSubtitleCue[];
	    Curves: FPackageIndex;
	    InternalCurves: FPackageIndex;
	    bCooked: boolean;
	    /** Uncompressed wav data 16 bit in mono or stereo - stereo not allowed for multichannel data */
	    rawData: FByteBulkData;
	    /** GUID used to uniquely identify this node so it can be found in the DDC */
	    compressedDataGuid: FGuid;
	    compressedFormatData: FFormatContainer;
	    /** The streaming derived data for this sound on this platform. */
	    runningPlatformData: FStreamedAudioPlatformData;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	    serialize(Ar: FAssetArchiveWriter): void;
	    get isStreaming(): boolean;
	} enum ESoundwaveSampleRateSettings {
	    Max = 0,
	    High = 1,
	    Medium = 2,
	    Low = 3,
	    Min = 4,
	    MatchDevice = 5
	} enum ESoundGroup {
	    SOUNDGROUP_Default = 0,
	    SOUNDGROUP_Effects = 1,
	    SOUNDGROUP_UI = 2,
	    SOUNDGROUP_Music = 3,
	    SOUNDGROUP_Voice = 4,
	    SOUNDGROUP_GameSoundGroup1 = 5,
	    SOUNDGROUP_GameSoundGroup2 = 6,
	    SOUNDGROUP_GameSoundGroup3 = 7,
	    SOUNDGROUP_GameSoundGroup4 = 8,
	    SOUNDGROUP_GameSoundGroup5 = 9,
	    SOUNDGROUP_GameSoundGroup6 = 10,
	    SOUNDGROUP_GameSoundGroup7 = 11,
	    SOUNDGROUP_GameSoundGroup8 = 12,
	    SOUNDGROUP_GameSoundGroup9 = 13,
	    SOUNDGROUP_GameSoundGroup10 = 14,
	    SOUNDGROUP_GameSoundGroup11 = 15,
	    SOUNDGROUP_GameSoundGroup12 = 16,
	    SOUNDGROUP_GameSoundGroup13 = 17,
	    SOUNDGROUP_GameSoundGroup14 = 18,
	    SOUNDGROUP_GameSoundGroup15 = 19,
	    SOUNDGROUP_GameSoundGroup16 = 20,
	    SOUNDGROUP_GameSoundGroup17 = 21,
	    SOUNDGROUP_GameSoundGroup18 = 22,
	    SOUNDGROUP_GameSoundGroup19 = 23,
	    SOUNDGROUP_GameSoundGroup20 = 24
	} class FSoundWaveSpectralTimeData {
	    Data: FSoundWaveSpectralDataEntry[];
	    TimeSec: number;
	} class FSoundWaveSpectralDataEntry {
	    Magnitude: number;
	    NormalizedMagnitude: number;
	} class FSoundWaveEnvelopeTimeData {
	    Amplitude: number;
	    TimeSec: number;
	} class FSubtitleCue {
	    Text: FText;
	    Time: number;
	} class FStreamedAudioChunk {
	    bCooked: boolean;
	    data: FByteBulkData;
	    dataSize: number;
	    audioDataSize: number;
	    constructor(Ar: FAssetArchive);
	    constructor(bCooked: boolean, data: FByteBulkData, dataSize: number, audioDataSize: number);
	    serialize(Ar: FAssetArchiveWriter): void;
	} class FStreamedAudioPlatformData {
	    numChunks: number;
	    audioFormat: FName;
	    chunks: FStreamedAudioChunk[];
	    constructor(Ar: FAssetArchive);
	    serialize(Ar: FAssetArchiveWriter): void;
	}
	export {};

}
declare module 'ue4/converters/sounds/SoundWave' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { USoundWave } from 'ue4/assets/exports/USoundWave';
	export class SoundWave {
	    data: Buffer;
	    format: string;
	    constructor(data: Buffer, format: string);
	    equals(other?: any): boolean;
	    static convert(soundWave: USoundWave): SoundWave;
	}

}
declare module 'ue4/assets/exports/UAkMediaAssetData' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FByteBulkData } from 'ue4/assets/objects/FByteBulkData';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { Locres } from 'ue4/locres/Locres';
	export class UAkMediaAssetData extends UObject {
	    isStreamed: boolean;
	    useDeviceMemory: boolean;
	    dataChunks: FAkMediaDataChunk[];
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	    toJson(locres?: Locres): any;
	}
	export class FAkMediaDataChunk {
	    readonly bulkData: FByteBulkData;
	    readonly isPrefetch: boolean;
	    constructor(Ar: FAssetArchive);
	    toJson(): {
	        isPrefetch: boolean;
	        bulkData: {
	            bulkDataFlag: string;
	            elementCount: number;
	            sizeOnDisk: number;
	            offsetInFile: number;
	        };
	    };
	}

}
declare module 'ue4/converters/sounds/WwiseAudio' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { UAkMediaAssetData } from 'ue4/assets/exports/UAkMediaAssetData';
	export class WwiseAudio {
	    name: string;
	    data: Buffer;
	    format: string;
	    constructor(data: Buffer, format: string, name: string);
	    equals(other?: any): boolean;
	    export(outputPath?: string): void;
	    static convert(mediaData: UAkMediaAssetData): WwiseAudio;
	}

}
declare module 'index' {
	import { FileProvider } from 'fileprovider/FileProvider';
	import { ReflectionTypeMappingsProvider } from 'ue4/assets/mappings/ReflectionTypeMappingsProvider';
	import { UsmapTypeMappingsProvider } from 'ue4/assets/mappings/UsmapTypeMappingsProvider';
	import { Game, Ue4Version } from 'ue4/versions/Game';
	import { IoPackage } from 'ue4/assets/IoPackage';
	import { PakPackage } from 'ue4/assets/PakPackage';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { Image } from 'ue4/converters/textures/Image';
	import { SoundWave } from 'ue4/converters/sounds/SoundWave';
	import { WwiseAudio } from 'ue4/converters/sounds/WwiseAudio';
	import { Locres } from 'ue4/locres/Locres';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FnLanguage } from 'ue4/locres/FnLanguage';
	import { FArchive } from 'ue4/reader/FArchive';
	import { PakFileReader } from 'ue4/pak/PakFileReader';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	export { FileProvider, FGuid, ReflectionTypeMappingsProvider, UsmapTypeMappingsProvider, Ue4Version, Game, IoPackage, PakPackage, Image, SoundWave, WwiseAudio, Locres, FnLanguage, UObject, FArchive, FAssetArchive, PakFileReader };

}
declare module 'test' {
	export {};

}
declare module 'fort/enums/EAttachmentRule' {
	export enum EAttachmentRule {
	    KeepRelative = 0,
	    KeepWorld = 1,
	    SnapToTarget = 2
	}

}
declare module 'fort/enums/EFXType' {
	export enum EFXType {
	    GenericAnimNotify = 0,
	    TrailAnimNotify = 1,
	    WeaponImpactEffect = 2,
	    WeaponMeleeImpactEffect = 3,
	    Contrail = 4,
	    Emote = 5,
	    Trap = 6,
	    Skin = 7,
	    Glider = 8,
	    Vehicle = 9,
	    BackpackBling = 10,
	    Water = 11,
	    LootChest = 12,
	    EnvironmentalAmbient = 13,
	    WeaponRangedBeam = 14,
	    WeaponBulletShells = 15,
	    WeaponMuzzleFlashes = 16,
	    PickAxe = 17,
	    Curie = 18,
	    Projectile = 19,
	    EFXType_MAX = 20
	}

}
declare module 'fort/enums/EFortCustomGender' {
	export enum EFortCustomGender {
	    Invalid = 0,
	    Male = 1,
	    Female = 2,
	    Both = 3
	}

}
declare module 'fort/enums/EFortCustomPartType' {
	export enum EFortCustomPartType {
	    Head = 0,
	    Body = 1,
	    Hat = 2,
	    Backpack = 3,
	    MiscOrTail = 4,
	    Face = 5,
	    Gameplay = 6,
	    NumTypes = 7
	}

}
declare module 'fort/enums/EFortInventoryFilter' {
	export enum EFortInventoryFilter {
	    WeaponMelee = 0,
	    WeaponRanged = 1,
	    Ammo = 2,
	    Traps = 3,
	    Consumables = 4,
	    Ingredients = 5,
	    Gadget = 6,
	    Decorations = 7,
	    Badges = 8,
	    Heroes = 9,
	    LeadSurvivors = 10,
	    Survivors = 11,
	    Defenders = 12,
	    Resources = 13,
	    ConversionControl = 14,
	    AthenaCosmetics = 15,
	    Playset = 16,
	    CreativePlot = 17,
	    TeamPerk = 18,
	    Workers = 19,
	    Invisible = 20,
	    Max_None = 21
	}

}
declare module 'fort/enums/EFortItemTier' {
	export enum EFortItemTier {
	    No_Tier = 0,
	    I = 1,
	    II = 2,
	    III = 3,
	    IV = 4,
	    V = 5,
	    VI = 6,
	    VII = 7,
	    VIII = 8,
	    IX = 9,
	    X = 10
	}

}
declare module 'fort/enums/EFortItemType' {
	export enum EFortItemType {
	    WorldItem = 0,
	    Ammo = 1,
	    Badge = 2,
	    BackpackPickup = 3,
	    BuildingPiece = 4,
	    CharacterPart = 5,
	    Consumable = 6,
	    Deco = 7,
	    EditTool = 8,
	    Ingredient = 9,
	    ItemCache = 10,
	    Food = 11,
	    Gadget = 12,
	    AthenaGadget = 13,
	    HomebaseGadget = 14,
	    BattleLabDevice = 15,
	    SpyTechPerk = 16,
	    HeroAbility = 17,
	    MissionItem = 18,
	    Trap = 19,
	    Weapon = 20,
	    WeaponMelee = 21,
	    WeaponRanged = 22,
	    WeaponHarvest = 23,
	    WeaponCreativePhone = 24,
	    WeaponMod = 25,
	    WorldResource = 26,
	    CreativeUserPrefab = 27,
	    CreativePlayset = 28,
	    Vehicle = 29,
	    Npc = 30,
	    AccountItem = 31,
	    AccountResource = 32,
	    CollectedResource = 33,
	    Alteration = 34,
	    CardPack = 35,
	    Currency = 36,
	    Hero = 37,
	    Schematic = 38,
	    Worker = 39,
	    TeamPerk = 40,
	    PlayerTech = 41,
	    Token = 42,
	    DailyRewardScheduleToken = 43,
	    CodeToken = 44,
	    Stat = 45,
	    Buff = 46,
	    BuffCredit = 47,
	    Quest = 48,
	    Accolades = 49,
	    MedalsPunchCard = 50,
	    RepeatableDailiesCard = 51,
	    ChallengeBundle = 52,
	    ChallengeBundleSchedule = 53,
	    ChallengeBundleCompletionToken = 54,
	    GameplayModifier = 55,
	    Outpost = 56,
	    HomebaseNode = 57,
	    Defender = 58,
	    ConversionControl = 59,
	    DeployableBaseCloudSave = 60,
	    ConsumableAccountItem = 61,
	    Quota = 62,
	    Expedition = 63,
	    HomebaseBannerIcon = 64,
	    HomebaseBannerColor = 65,
	    AthenaSkyDiveContrail = 66,
	    PersonalVehicle = 67,
	    AthenaGlider = 68,
	    AthenaPickaxe = 69,
	    AthenaHat = 70,
	    AthenaBackpack = 71,
	    AthenaCharacter = 72,
	    AthenaDance = 73,
	    AthenaConsumableEmote = 74,
	    AthenaLoadingScreen = 75,
	    AthenaBattleBus = 76,
	    AthenaVehicleCosmetic = 77,
	    AthenaItemWrap = 78,
	    AthenaCallingCard = 79,
	    AthenaMapMarker = 80,
	    AthenaMusicPack = 81,
	    AthenaPetCosmetic = 82,
	    AthenaCharmCosmetic = 83,
	    AthenaVictoryPose = 84,
	    AthenaSeasonTreasure = 85,
	    AthenaSeason = 86,
	    AthenaRewardGraph = 87,
	    AthenaExtResource = 88,
	    EventDescription = 89,
	    BattleLabDeviceAccount = 90,
	    MatchAward = 91,
	    AthenaEventToken = 92,
	    EventPurchaseTracker = 93,
	    CosmeticVariantToken = 94,
	    CampaignHeroLoadout = 95,
	    Playset = 96,
	    PrerollData = 97,
	    CreativePlot = 98,
	    PlayerSurveyToken = 99,
	    CosmeticLocker = 100,
	    BannerToken = 101,
	    RestedXpBoosterToken = 102,
	    RewardEventGraphPurchaseToken = 103,
	    HardcoreModifier = 104,
	    EventDependentItem = 105,
	    ItemAccessToken = 106,
	    SpecialItem = 107,
	    Emote = 108,
	    Stack = 109,
	    CollectionBookPage = 110,
	    BGAConsumableWrapper = 111,
	    GiftBox = 112,
	    GiftBoxUnlock = 113,
	    PlaysetProp = 114,
	    RegCosmeticDef = 115,
	    Profile = 116,
	    Max_None = 117
	}

}
declare module 'fort/enums/EFortRarity' {
	import { FText } from 'ue4/objects/core/i18n/Text';
	export class EFortRarity extends FText {
	    static Common: EFortRarity;
	    static Uncommon: EFortRarity;
	    static Rare: EFortRarity;
	    static Epic: EFortRarity;
	    static Legendary: EFortRarity;
	    static Mythic: EFortRarity;
	    static Transcendent: EFortRarity;
	    static Unattainable: EFortRarity;
	    eq(other?: any): boolean;
	}

}
declare module 'fort/enums/EFortTemplateAccess' {
	export enum EFortTemplateAccess {
	    Normal = 0,
	    Trusted = 1,
	    Private = 2
	}

}
declare module 'ue4/assets/exports/UDataAsset' {
	import { UObject } from 'ue4/assets/exports/UObject';
	export class UDataAsset extends UObject {
	}

}
declare module 'ue4/assets/exports/UPrimaryDataAsset' {
	import { UDataAsset } from 'ue4/assets/exports/UDataAsset';
	export class UPrimaryDataAsset extends UDataAsset {
	}

}
declare module 'fort/exports/McpItemDefinitionBase' {
	import { UPrimaryDataAsset } from 'ue4/assets/exports/UPrimaryDataAsset';
	export class McpItemDefinitionBase extends UPrimaryDataAsset {
	}

}
declare module 'ue4/assets/util/StructFallbackReflectionUtil' {
	import { FPropertyTag } from 'ue4/assets/objects/FPropertyTag';
	export function mapToClass<T>(properties: FPropertyTag[], clazz: Function, obj: T): T;

}
declare module 'ue4/assets/exports/UCurveTable' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FRealCurve } from 'ue4/objects/engine/curves/FRealCurve';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { UnrealMap } from 'util/UnrealMap';
	import { Locres } from 'ue4/locres/Locres';
	/**
	 * - Whether the curve table contains simple, rich, or no curves
	 */
	export enum ECurveTableMode {
	    Empty = 0,
	    SimpleCurves = 1,
	    RichCurves = 2
	}
	export class UCurveTable extends UObject {
	    /**
	     * Map of name of row to row data structure.
	     * If curveTableMode is SimpleCurves the value type will be FSimpleCurve
	     * If curveTableMode is RichCurves the value type will be FRichCurve
	     */
	    rowMap: UnrealMap<FName, FRealCurve>;
	    curveTableMode: ECurveTableMode;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	    /** Function to find the row of a table given its name. */
	    findCurve(rowName: FName, warnIfNotFound?: boolean): FRealCurve;
	    toJson(locres?: Locres): any;
	}
	/**
	 * - Handle to a particular row in a table.
	 */
	export class FCurveTableRowHandle {
	    /** Pointer to table we want a row from */
	    curveTable: UCurveTable;
	    /** Name of row in the table that we want */
	    rowName: FName;
	    /** Get the curve straight from the row handle */
	    getCurve(warnIfNotFound?: boolean): FRealCurve;
	    /** Evaluate the curve if it is valid
	     * @param xValue The input X value to the curve
	     * @return The value of the curve if valid, 0 if not
	     */
	    eval(xValue: number): number;
	}

}
declare module 'ue4/objects/FScalableFloat' {
	import { FCurveTableRowHandle } from 'ue4/assets/exports/UCurveTable';
	export class FScalableFloat {
	    /** Raw value, is multiplied by curve */
	    value: number;
	    /** Curve that is evaluated at a specific level. If found, it is multipled by Value */
	    curve?: FCurveTableRowHandle;
	    /** Cached direct pointer to the RealCurve we should evaluate */
	    private finalCurve?;
	    /** Returns the scaled value at a given level */
	    getValueAtLevel(level: number): number;
	    /** Returns the scaled value at level 0 */
	    getValue0(): number;
	}

}
declare module 'fort/objects/FortColorPalette' {
	import { FLinearColor } from 'ue4/objects/core/math/FColor';
	export class FortColorPalette {
	    Color1: FLinearColor;
	    Color2: FLinearColor;
	    Color3: FLinearColor;
	    Color4: FLinearColor;
	    Color5: FLinearColor;
	}

}
declare module 'fort/exports/FortItemSeriesDefinition' {
	import { UPrimaryDataAsset } from 'ue4/assets/exports/UPrimaryDataAsset';
	import { FText } from 'ue4/objects/core/i18n/Text';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { FortColorPalette } from 'fort/objects/FortColorPalette';
	export class FortItemSeriesDefinition extends UPrimaryDataAsset {
	    DisplayName: FText;
	    Colors: FortColorPalette;
	    BackgroundTexture: FSoftObjectPath;
	    ItemCardMaterial: FSoftObjectPath;
	    BackgroundMaterial: FSoftObjectPath;
	}

}
declare module 'fort/exports/FortItemDefinition' {
	import { McpItemDefinitionBase } from 'fort/exports/McpItemDefinitionBase';
	import { EFortRarity } from 'fort/enums/EFortRarity';
	import { EFortItemType } from 'fort/enums/EFortItemType';
	import { FText } from 'ue4/objects/core/i18n/Text';
	import { FGameplayTagContainer } from 'ue4/objects/gameplaytags/FGameplayTagContainer';
	import { EFortInventoryFilter } from 'fort/enums/EFortInventoryFilter';
	import { EFortItemTier } from 'fort/enums/EFortItemTier';
	import { EFortTemplateAccess } from 'fort/enums/EFortTemplateAccess';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { FVector } from 'ue4/objects/core/math/FVector';
	import { FRotator } from 'ue4/objects/core/math/FRotator';
	import { FCurveTableRowHandle } from 'ue4/assets/exports/UCurveTable';
	import { FScalableFloat } from 'ue4/objects/FScalableFloat';
	import { FortItemSeriesDefinition } from 'fort/exports/FortItemSeriesDefinition';
	export class FortItemDefinition extends McpItemDefinitionBase {
	    Rarity: EFortRarity;
	    ItemType: EFortItemType;
	    PrimaryAssetIdItemTypeOverride: EFortItemType;
	    FilterOverride: EFortInventoryFilter;
	    Tier: EFortItemTier;
	    MaxTier: EFortItemTier;
	    Access: EFortTemplateAccess;
	    bIsAccountItem: boolean;
	    bNeverPersisted: boolean;
	    bAllowMultipleStacks: boolean;
	    bAutoBalanceStacks: boolean;
	    bForceAutoPickup: boolean;
	    bInventorySizeLimited: boolean;
	    ItemTypeNameOverride: FText;
	    DisplayName: FText;
	    ShortDescription: FText;
	    Description: FText;
	    DisplayNamePrefix: FText;
	    SearchTags: FText;
	    GameplayTags: FGameplayTagContainer;
	    AutomationTags: FGameplayTagContainer;
	    SecondaryCategoryOverrideTags: FGameplayTagContainer;
	    TertiaryCategoryOverrideTags: FGameplayTagContainer;
	    MaxStackSize: FScalableFloat;
	    PurchaseItemLimit: FScalableFloat;
	    FrontendPreviewScale: number;
	    TooltipClass: FSoftObjectPath;
	    StatList: FSoftObjectPath;
	    RatingLookup: FCurveTableRowHandle;
	    WidePreviewImage: FSoftObjectPath;
	    SmallPreviewImage: FSoftObjectPath;
	    LargePreviewImage: FSoftObjectPath;
	    DisplayAssetPath: FSoftObjectPath;
	    Series: FortItemSeriesDefinition;
	    FrontendPreviewPivotOffset: FVector;
	    FrontendPreviewInitialRotation: FRotator;
	    FrontendPreviewMeshOverride: FSoftObjectPath;
	    FrontendPreviewSkeletalMeshOverride: FSoftObjectPath;
	}

}
declare module 'fort/exports/FortPersistableItemDefinition' {
	import { FortItemDefinition } from 'fort/exports/FortItemDefinition';
	export class FortPersistableItemDefinition extends FortItemDefinition {
	}

}
declare module 'ue4/objects/FTableRowBase' {
	export class FTableRowBase {
	}

}
declare module 'ue4/assets/exports/UDataTable' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { UnrealMap } from 'util/UnrealMap';
	import { FName } from 'ue4/objects/uobject/FName';
	import { UScriptStruct } from 'ue4/assets/exports/UScriptStruct';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	import { FAssetArchiveWriter } from 'ue4/assets/writer/FAssetArchiveWriter';
	import { FTableRowBase } from 'ue4/objects/FTableRowBase';
	import { Locres } from 'ue4/locres/Locres';
	export class UDataTable extends UObject {
	    RowStruct: UScriptStruct;
	    bStripFromClientBuilds?: boolean;
	    bIgnoreExtraFields?: boolean;
	    bIgnoreMissingFields?: boolean;
	    ImportKeyField?: string;
	    rows: UnrealMap<FName, UObject>;
	    constructor(rows?: UnrealMap<FName, UObject>);
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	    serialize(Ar: FAssetArchiveWriter): void;
	    findRow(rowName: string | FName): UObject;
	    findRowMapped<T extends FTableRowBase>(rowName: FName): T;
	    toJson(locres?: Locres): any;
	}

}
declare module 'ue4/objects/FDataTableRowHandle' {
	import { UDataTable } from 'ue4/assets/exports/UDataTable';
	import { FName } from 'ue4/objects/uobject/FName';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FTableRowBase } from 'ue4/objects/FTableRowBase';
	export class FDataTableRowHandle {
	    DataTable: UDataTable;
	    RowName: FName;
	    getRow(): UObject;
	    getRowMapped<T extends FTableRowBase>(): T;
	}

}
declare module 'fort/exports/FortAccountItemDefinition' {
	import { FortPersistableItemDefinition } from 'fort/exports/FortPersistableItemDefinition';
	import { FCurveTableRowHandle } from 'ue4/assets/exports/UCurveTable';
	import { FDataTableRowHandle } from 'ue4/objects/FDataTableRowHandle';
	export class FortAccountItemDefinition extends FortPersistableItemDefinition {
	    LevelToXpHandle: FCurveTableRowHandle;
	    LevelToSacrificeXpHandle: FCurveTableRowHandle;
	    SacrificeRecipe: FDataTableRowHandle;
	    TransmogSacrificeRow: FDataTableRowHandle;
	    ConversionRecipes: FDataTableRowHandle[];
	    UpgradeRarityRecipeHandle: FDataTableRowHandle;
	    MinLevel: number;
	    MaxLevel: number;
	    GrantToProfileType: string;
	}

}
declare module 'ue4/objects/gameplaytags/FGameplayTag' {
	import { FName } from 'ue4/objects/uobject/FName';
	export class FGameplayTag {
	    TagName: FName;
	    constructor(TagName?: FName);
	    toString(): string;
	}

}
declare module 'fort/objects/CosmeticVariantInfo' {
	import { FGameplayTag } from 'ue4/objects/gameplaytags/FGameplayTag';
	export class CosmeticVariantInfo {
	    VariantChannelTag: FGameplayTag;
	    ActiveVariantTag: FGameplayTag;
	}

}
declare module 'fort/exports/variants/FortCosmeticVariant' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FGameplayTag } from 'ue4/objects/gameplaytags/FGameplayTag';
	import { FText } from 'ue4/objects/core/i18n/Text';
	export class FortCosmeticVariant extends UObject {
	    VariantChannelTag: FGameplayTag;
	    VariantChannelName: FText;
	    ActiveChannelTag: FGameplayTag;
	}

}
declare module 'fort/exports/AthenaCosmeticItemDefinition' {
	import { FortAccountItemDefinition } from 'fort/exports/FortAccountItemDefinition';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FText } from 'ue4/objects/core/i18n/Text';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FGameplayTagContainer } from 'ue4/objects/gameplaytags/FGameplayTagContainer';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { FGameplayTag } from 'ue4/objects/gameplaytags/FGameplayTag';
	import { CosmeticVariantInfo } from 'fort/objects/CosmeticVariantInfo';
	import { FRotator } from 'ue4/objects/core/math/FRotator';
	import { UnrealMap } from 'util/UnrealMap';
	import { FortCosmeticVariant } from 'fort/exports/variants/FortCosmeticVariant';
	export class AthenaCosmeticItemDefinition extends FortAccountItemDefinition {
	    bIsShuffleTile: boolean;
	    bIsOwnedByCampaignHero: boolean;
	    bHasMoreThanOneCharacterPartVariant: boolean;
	    bHideIfNotOwned: boolean;
	    bInitializedConfiguredDynamicInstallBundles: boolean;
	    bDynamicInstallBundlesError: boolean;
	    bDynamicInstallBundlesCancelled: boolean;
	    bDynamicInstallBundlesComplete: boolean;
	    DynamicInstallBundlesUpdateStartTime: number;
	    DynamicInstallBundleRequestRefCount: number;
	    DynamicInstallBundleRequestRetryCount: number;
	    VariantUnlockType: EVariantUnlockType;
	    PreviewPawnRotationOffset: FRotator;
	    FoleyLibraries: FPackageIndex[];
	    DisallowedCosmeticTags: FGameplayTagContainer;
	    MetaTags: FGameplayTagContainer;
	    VariantChannelsToNeverSendToMCP: FGameplayTag[];
	    ReactivePreviewDrivers: UnrealMap<CosmeticVariantInfo, FSoftObjectPath>;
	    MaterialOverrides: AthenaCosmeticMaterialOverride[];
	    ObservedPlayerStats: FGameplayTagContainer;
	    BuiltInEmotes: FPackageIndex[];
	    ItemVariants: FortCosmeticVariant[];
	    VariantChannelToUseForThumbnails: FGameplayTag;
	    ItemVariantPreviews: FortCosmeticVariantPreview[];
	    DirectAquisitionStyleDisclaimerOverride: FText;
	    UnlockRequirements: FText;
	    UnlockingItemDef: FSoftObjectPath;
	    ItemPreviewActorClass: FSoftObjectPath;
	    ItemPreviewParticleSystem: FSoftObjectPath;
	    ItemPreviewMontage_Male: FSoftObjectPath;
	    ItemPreviewMontage_Female: FSoftObjectPath;
	    ItemPreviewHero: FSoftObjectPath;
	    ConfiguredDynamicInstallBundles: FName[];
	    PendingDynamicInstallBundles: FName[];
	    ExclusiveRequiresOutfitTags: FGameplayTagContainer;
	    CustomExclusiveCallout: FText;
	    ExclusiveDesciption: FText;
	    ExclusiveIcon: FSoftObjectPath;
	}
	export enum EVariantUnlockType {
	    UnlockAll = 0,
	    ExclusiveChoice = 1
	}
	export class WeirdVariantStruct {
	    Unknown0: FGameplayTag;
	    Unknown1: FGameplayTag;
	}
	export class AthenaCosmeticMaterialOverride {
	    ComponentName: FName;
	    MaterialOverrideIndex: number;
	    OverrideMaterial: FSoftObjectPath;
	}
	export class FortCosmeticVariantPreview {
	    UnlockCondition: FText;
	    PreviewTime: number;
	    VariantOptions: McpVariantChannelInfo[];
	    AdditionalItems: FortCosmeticVariantPreviewElement[];
	}
	export class McpVariantChannelInfo extends CosmeticVariantInfo {
	    OwnedVariantTags: FGameplayTagContainer;
	    ItemVariantIsUsedFor: FPackageIndex;
	    CustomData: string;
	}
	export class FortCosmeticVariantPreviewElement {
	    VariantOptions: McpVariantChannelInfo[];
	    Item: FPackageIndex;
	}

}
declare module 'fort/exports/AthenaCharacterPartItemDefinition' {
	import { AthenaCosmeticItemDefinition } from 'fort/exports/AthenaCosmeticItemDefinition';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	export class AthenaCharacterPartItemDefinition extends AthenaCosmeticItemDefinition {
	    CharacterParts: FPackageIndex[];
	}

}
declare module 'fort/exports/AthenaBackpackItemDefinition' {
	import { AthenaCharacterPartItemDefinition } from 'fort/exports/AthenaCharacterPartItemDefinition';
	export class AthenaBackpackItemDefinition extends AthenaCharacterPartItemDefinition {
	}

}
declare module 'fort/exports/FortCharacterType' {
	import { FortAccountItemDefinition } from 'fort/exports/FortAccountItemDefinition';
	export class FortCharacterType extends FortAccountItemDefinition {
	}

}
declare module 'fort/exports/FortWorkerType' {
	import { FortCharacterType } from 'fort/exports/FortCharacterType';
	import { EFortCustomGender } from 'fort/enums/EFortCustomGender';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { FGameplayTagContainer } from 'ue4/objects/gameplaytags/FGameplayTagContainer';
	export class FortWorkerType extends FortCharacterType {
	    Gender: EFortCustomGender;
	    FixedPortrait: FSoftObjectPath;
	    bIsManager: boolean;
	    ManagerSynergyTag: FGameplayTagContainer;
	    FixedPersonalityTag: FGameplayTagContainer;
	    FixedSetBonusTag: FGameplayTagContainer;
	    MatchingPersonalityBonus: number;
	    MismatchingPersonalityPenalty: number;
	}

}
declare module 'fort/objects/FortAttributeInitializationKey' {
	import { FName } from 'ue4/objects/uobject/FName';
	export class FortAttributeInitializationKey {
	    AttributeInitCategory: FName;
	    AttributeInitSubCategory: FName;
	}

}
declare module 'fort/objects/GameplayEffectApplicationInfo' {
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	export class GameplayEffectApplicationInfo {
	    GameplayEffect: FSoftObjectPath;
	    Level: number;
	}

}
declare module 'fort/exports/FortHeroType' {
	import { FortWorkerType } from 'fort/exports/FortWorkerType';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FText } from 'ue4/objects/core/i18n/Text';
	import { FDataTableRowHandle } from 'ue4/objects/FDataTableRowHandle';
	import { FGameplayTagContainer } from 'ue4/objects/gameplaytags/FGameplayTagContainer';
	import { FortAttributeInitializationKey } from 'fort/objects/FortAttributeInitializationKey';
	import { GameplayEffectApplicationInfo } from 'fort/objects/GameplayEffectApplicationInfo';
	export class FortHeroType extends FortWorkerType {
	    bForceShowHeadAccessory: boolean;
	    bForceShowBackpack: boolean;
	    Specializations: FSoftObjectPath[];
	    DefaultMontageLookupTable: FSoftObjectPath;
	    OverrideMontageLookupTable: FSoftObjectPath;
	    CombinedStatGEs: GameplayEffectApplicationInfo[];
	    RequiredGPTags: FGameplayTagContainer;
	    MaleOverrideFeedback: FSoftObjectPath;
	    FemaleOverrideFeedback: FSoftObjectPath;
	    OverridePawnClass: FSoftObjectPath;
	    HeroGameplayDefinition: FPackageIndex;
	    HeroCosmeticOutfitDefinition: FPackageIndex;
	    HeroCosmeticBackblingDefinition: FPackageIndex;
	    FrontEndAnimClass: FSoftObjectPath;
	    ItemPreviewAnimClass: FSoftObjectPath;
	    FrontendAnimMontageIdleOverride: FSoftObjectPath;
	    FrontEndBackPreviewRotationOffset: number;
	    Subtype: FText;
	    AttributeInitKey: FortAttributeInitializationKey;
	    LegacyStatHandle: FDataTableRowHandle;
	    ItemPreviewMontage_Male: FSoftObjectPath;
	    ItemPreviewMontage_Female: FSoftObjectPath;
	}

}
declare module 'ue4/objects/core/math/FTransform' {
	import { FVector } from 'ue4/objects/core/math/FVector';
	import { FQuat } from 'ue4/objects/core/math/FQuat';
	import { FArchive } from 'ue4/reader/FArchive';
	export class FTransform {
	    rotation: FQuat;
	    translation: FVector;
	    scale3D: FVector;
	    constructor();
	    constructor(Ar: FArchive);
	    constructor(rotation: FQuat, translation: FVector, scale3D: FVector);
	}

}
declare module 'fort/objects/MarshalledVFXAuthoredData' {
	import { FName } from 'ue4/objects/uobject/FName';
	import { FGameplayTagContainer } from 'ue4/objects/gameplaytags/FGameplayTagContainer';
	import { FGameplayTag } from 'ue4/objects/gameplaytags/FGameplayTag';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { EFXType } from 'fort/enums/EFXType';
	import { UnrealMap } from 'util/UnrealMap';
	import { FTransform } from 'ue4/objects/core/math/FTransform';
	export class MarshalledVFXAuthoredData {
	    NiagaraVFX: MarshalledVFXData[];
	    CascadeVFX: MarshalledVFXData[];
	    NameReplacements: UnrealMap<FName, ParameterNameMapping>;
	}
	export class MarshalledVFXData {
	    ParameterGroups: FGameplayTagContainer;
	    Type: EFXType;
	    Asset: FSoftObjectPath;
	    AttachAtBone: FName;
	    RelativeOffset: FTransform;
	    EffectIdTag: FGameplayTag;
	    bAutoActivate: boolean;
	}
	export class ParameterNameMapping {
	    CascadeName: FName;
	    NiagaraName: FName;
	}

}
declare module 'fort/exports/MarshalledVFX_AuthoredDataConfig' {
	import { MarshalledVFXAuthoredData } from 'fort/objects/MarshalledVFXAuthoredData';
	import { UObject } from 'ue4/assets/exports/UObject';
	export class MarshalledVFX_AuthoredDataConfig extends UObject {
	    Data: MarshalledVFXAuthoredData;
	}

}
declare module 'fort/exports/AthenaCharacterItemDefinition' {
	import { AthenaCosmeticItemDefinition } from 'fort/exports/AthenaCosmeticItemDefinition';
	import { UnrealMap } from 'util/UnrealMap';
	import { FName } from 'ue4/objects/uobject/FName';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { EFortCustomPartType } from 'fort/enums/EFortCustomPartType';
	import { EFortCustomGender } from 'fort/enums/EFortCustomGender';
	import { AthenaBackpackItemDefinition } from 'fort/exports/AthenaBackpackItemDefinition';
	import { FortHeroType } from 'fort/exports/FortHeroType';
	import { MarshalledVFX_AuthoredDataConfig } from 'fort/exports/MarshalledVFX_AuthoredDataConfig';
	export class AthenaCharacterItemDefinition extends AthenaCosmeticItemDefinition {
	    RequestedDataStores: UnrealMap<FName, UObject>;
	    AuthoredVFXData_ByPart: UnrealMap<EFortCustomPartType, MarshalledVFX_AuthoredDataConfig>;
	    HeroDefinition: FortHeroType;
	    DefaultBackpack: AthenaBackpackItemDefinition;
	    RequiredCosmeticItems: AthenaCosmeticItemDefinition[];
	    Gender: EFortCustomGender;
	    FeedbackBank: FSoftObjectPath;
	}

}
declare module 'fort/objects/variants/MaterialParamName' {
	import { FName } from 'ue4/objects/uobject/FName';
	export class MaterialParamName {
	    ParamName: FName;
	}

}
declare module 'fort/objects/variants/MaterialVectorVariant' {
	import { FLinearColor } from 'ue4/objects/core/math/FColor';
	import { MaterialParamName } from 'fort/objects/variants/MaterialParamName';
	export class MaterialVectorVariant extends MaterialParamName {
	    Value: FLinearColor;
	}

}
declare module 'fort/objects/variants/MaterialTextureVariant' {
	import { MaterialParamName } from 'fort/objects/variants/MaterialParamName';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	export class MaterialTextureVariant extends MaterialParamName {
	    Value: FSoftObjectPath;
	}

}
declare module 'fort/objects/variants/MaterialFloatVariant' {
	import { MaterialParamName } from 'fort/objects/variants/MaterialParamName';
	export class MaterialFloatVariant extends MaterialParamName {
	    Value: number;
	}

}
declare module 'fort/objects/variants/VectorParamVariant' {
	import { FVector } from 'ue4/objects/core/math/FVector';
	import { MaterialParamName } from 'fort/objects/variants/MaterialParamName';
	export class VectorParamVariant extends MaterialParamName {
	    Value: FVector;
	}

}
declare module 'fort/objects/variants/BaseVariantDef' {
	import { FGameplayTag } from 'ue4/objects/gameplaytags/FGameplayTag';
	import { FText } from 'ue4/objects/core/i18n/Text';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { FName } from 'ue4/objects/uobject/FName';
	import { EFXType } from 'fort/enums/EFXType';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FGameplayTagContainer } from 'ue4/objects/gameplaytags/FGameplayTagContainer';
	import { MaterialVectorVariant } from 'fort/objects/variants/MaterialVectorVariant';
	import { MaterialTextureVariant } from 'fort/objects/variants/MaterialTextureVariant';
	import { MaterialFloatVariant } from 'fort/objects/variants/MaterialFloatVariant';
	import { EAttachmentRule } from 'fort/enums/EAttachmentRule';
	import { VectorParamVariant } from 'fort/objects/variants/VectorParamVariant';
	export class BaseVariantDef {
	    bStartUnlocked: boolean;
	    bIsDefault: boolean;
	    bHideIfNotOwned: boolean;
	    CustomizationVariantTag: FGameplayTag;
	    VariantName: FText;
	    PreviewImage: FSoftObjectPath;
	    UnlockRequirements: FText;
	    UnlockingItemDef: FSoftObjectPath;
	    get backendVariantName(): string | null;
	}
	export class MeshVariant {
	    MeshToSwap: FSoftObjectPath;
	    ComponentToOverride: FName;
	    OverrideMesh: FSoftObjectPath;
	}
	export class MaterialVariants {
	    MaterialToSwap: FSoftObjectPath;
	    ComponentToOverride: FName;
	    CascadeMaterialName: FName;
	    MaterialOverrideIndex: number;
	    OverrideMaterial: FSoftObjectPath;
	}
	export class MaterialParamterDef {
	    MaterialToAlter: FSoftObjectPath;
	    CascadeMaterialName: FName;
	    ColorParams: MaterialVectorVariant[];
	    TextureParams: MaterialTextureVariant[];
	    FloatParams: MaterialFloatVariant[];
	}
	export class VariantParticleSystemInitializerData {
	    ParticleComponentName: FName;
	    ParticleSystem: FSoftObjectPath;
	    MeshToBindTO: FSoftObjectPath;
	    AttachSocketName: FName;
	    LocationRule: EAttachmentRule;
	    RotationRule: EAttachmentRule;
	    ScaleRule: EAttachmentRule;
	    bWeldSimulatedBodies: boolean;
	}
	export class ParticleVariant {
	    ParticleSystemToAlter: FSoftObjectPath;
	    ComponentToOverride: FName;
	    OverrideParticleSystem: FSoftObjectPath;
	}
	export class ParticleParamterVariant {
	    ParticleSystemToAlter: FSoftObjectPath;
	    ColorParams: MaterialVectorVariant[];
	    VectorParams: VectorParamVariant[];
	    FloatParams: MaterialFloatVariant[];
	}
	export class ManagedParticleSwapVariant {
	    ParamGroupTag: FGameplayTag;
	    ParticleToOverride: FFortPortableSoftParticles;
	}
	export class FFortPortableSoftParticles {
	    FXType: EFXType;
	    NiagaraVersion: FSoftObjectPath;
	    CascadeVersion: FSoftObjectPath;
	}
	export class ManagedParticleParamVariant {
	    ParamGroupTag: FGameplayTag;
	    ColorParams: MaterialVectorVariant[];
	    VectorParams: VectorParamVariant;
	    FloatParams: MaterialFloatVariant;
	}
	export class SoundVariant {
	    SoundToSwap: FSoftObjectPath;
	    ComponentToOverride: FName;
	    OverrideSound: FSoftObjectPath;
	}
	export class FoleySoundVariant {
	    LibrariesToAdd: FPackageIndex[];
	    LibrariesToRemove: FPackageIndex[];
	}
	export class SocketTransformVariant {
	    SourceSocketName: FName;
	    OverridSocketName: FName;
	    SourceObjectToModify: FSoftObjectPath;
	}
	export class ScriptedActionVariant {
	    ActionTag: FGameplayTag;
	}
	export class CosmeticMetaTagContainer {
	    MetaTagsToApply: FGameplayTagContainer;
	    MetaTagsToRemove: FGameplayTagContainer;
	}

}
declare module 'fort/exports/variants/FortCosmeticVariantBackedByArray' {
	import { FortCosmeticVariant } from 'fort/exports/variants/FortCosmeticVariant';
	import { BaseVariantDef } from 'fort/objects/variants/BaseVariantDef';
	export class FortCosmeticVariantBackedByArray extends FortCosmeticVariant {
	    get variants(): BaseVariantDef[] | null;
	}

}
declare module 'fort/objects/variants/MaterialVariantDef' {
	import { BaseVariantDef, CosmeticMetaTagContainer, FoleySoundVariant, MaterialParamterDef, MaterialVariants, SoundVariant } from 'fort/objects/variants/BaseVariantDef';
	export class MaterialVariantDef extends BaseVariantDef {
	    VariantMaterials: MaterialVariants[];
	    VariantMaterialParams: MaterialParamterDef[];
	    VariantSounds: SoundVariant[];
	    VariantFoley: FoleySoundVariant[];
	    MetaTags: CosmeticMetaTagContainer;
	}

}
declare module 'fort/exports/variants/FortCosmeticMaterialVariant' {
	import { FortCosmeticVariantBackedByArray } from 'fort/exports/variants/FortCosmeticVariantBackedByArray';
	import { MaterialVariantDef } from 'fort/objects/variants/MaterialVariantDef';
	import { BaseVariantDef } from 'fort/objects/variants/BaseVariantDef';
	export class FortCosmeticMaterialVariant extends FortCosmeticVariantBackedByArray {
	    MaterialOptions: MaterialVariantDef[];
	    get variants(): BaseVariantDef[] | null;
	}

}
declare module 'fort/exports/variants/VariantTypeBase' {
	import { UObject } from 'ue4/assets/exports/UObject';
	export class VariantTypeBase extends UObject {
	}

}
declare module 'fort/objects/variants/MeshVariantDef' {
	import { BaseVariantDef, CosmeticMetaTagContainer, FoleySoundVariant, MaterialParamterDef, MaterialVariants, MeshVariant, ParticleParamterVariant, ParticleVariant, ScriptedActionVariant, SocketTransformVariant, SoundVariant, VariantParticleSystemInitializerData } from 'fort/objects/variants/BaseVariantDef';
	export class MeshVariantDef extends BaseVariantDef {
	    VariantMeshes: MeshVariant[];
	    VariantMaterials: MaterialVariants[];
	    VariantMaterialParams: MaterialParamterDef[];
	    InitialParticleSystemData: VariantParticleSystemInitializerData[];
	    VariantParticles: ParticleVariant[];
	    VariantParticleParams: ParticleParamterVariant[];
	    SocketTransforms: SocketTransformVariant[];
	    VariantSounds: SoundVariant[];
	    VariantFoley: FoleySoundVariant[];
	    VariantActions: ScriptedActionVariant[];
	    MetaTags: CosmeticMetaTagContainer;
	}

}
declare module 'ue4/assets/enums/EFunctionFlag' {
	export enum EFunctionFlags {
	    FUNC_None = 0,
	    FUNC_Final = 1,
	    FUNC_RequiredAPI = 2,
	    FUNC_BlueprintAuthorityOnly = 4,
	    FUNC_BlueprintCosmetic = 8,
	    FUNC_Net = 64,
	    FUNC_NetReliable = 128,
	    FUNC_NetRequest = 256,
	    FUNC_Exec = 512,
	    FUNC_Native = 1024,
	    FUNC_Event = 2048,
	    FUNC_NetResponse = 4096,
	    FUNC_Static = 8192,
	    FUNC_NetMulticast = 16384,
	    FUNC_UbergraphFunction = 32768,
	    FUNC_MulticastDelegate = 65536,
	    FUNC_Public = 131072,
	    FUNC_Private = 262144,
	    FUNC_Protected = 524288,
	    FUNC_Delegate = 1048576,
	    FUNC_NetServer = 2097152,
	    FUNC_HasOutParms = 4194304,
	    FUNC_HasDefaults = 8388608,
	    FUNC_NetClient = 16777216,
	    FUNC_DLLImport = 33554432,
	    FUNC_BlueprintCallable = 67108864,
	    FUNC_BlueprintEvent = 134217728,
	    FUNC_BlueprintPure = 268435456,
	    FUNC_EditorOnly = 536870912,
	    FUNC_Const = 1073741824,
	    FUNC_NetValidate = 2147483648,
	    FUNC_AllFlags = 4294967295
	}

}
declare module 'ue4/assets/enums/ETickingGroup' {
	export enum ETickingGroup {
	    TG_PrePhysics = 0,
	    TG_StartPhysics = 1,
	    TG_DuringPhysics = 2,
	    TG_EndPhysics = 3,
	    TG_PostPhysics = 4,
	    TG_PostUpdateWork = 5,
	    TG_LastDemotable = 6,
	    TG_NewlySpawned = 7
	}

}
declare module 'ue4/assets/enums/ETimelineLengthMode' {
	export enum ETimelineLengthMode {
	    TL_TimelineLength = 0,
	    TL_LastKeyFrame = 1
	}

}
declare module 'ue4/assets/exports/components/UActorComponent' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FMulticastScriptDelegate } from 'ue4/objects/uobject/ScriptDelegates';
	export class UActorComponent extends UObject {
	    ComponentTags: FName[];
	    AssetUserData: FPackageIndex[];
	    UCSSerializationIndex: number;
	    bNetAddressable: boolean;
	    bReplicates: boolean;
	    bAutoActivate: boolean;
	    bIsActive: boolean;
	    bEditableWhenInherited: boolean;
	    bCanEverAffectNavigation: boolean;
	    bIsEditorOnly: boolean;
	    CreationMethod: EComponentCreationMethod;
	    OnComponentActivated: FMulticastScriptDelegate;
	    OnComponentDeactivated: FMulticastScriptDelegate;
	    UCSModifiedProperties: FSimpleMemberReference[];
	}
	export enum EComponentCreationMethod {
	    Native = 0,
	    SimpleConstructionScript = 1,
	    UserConstructionScript = 2,
	    Instance = 3
	}
	export class FSimpleMemberReference {
	    MemberParent: UObject;
	    MemberName: FName;
	    MemberGuid: FGuid;
	}

}
declare module 'ue4/objects/engine/curves/UCurveFloat' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FRichCurve } from 'ue4/objects/engine/curves/FRichCurve';
	import { Lazy } from 'util/Lazy';
	export class FRuntimeFloatCurve {
	    EditorCurveData: FRichCurve;
	    ExternalCurve: Lazy<UCurveFloat>;
	}
	export class UCurveFloat extends UObject {
	    /** Keyframe data */
	    FloatCurve: FRichCurve;
	    /** Flag to represent event curve */
	    bIsEventCurve: boolean;
	}

}
declare module 'ue4/assets/objects/FBPVariableMetaDataEntry' {
	import { FName } from 'ue4/objects/uobject/FName';
	export class FBPVariableMetaDataEntry {
	    DataKey: FName;
	    DataValue: string;
	}

}
declare module 'ue4/assets/exports/UTimelineTemplate' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { ETimelineLengthMode } from 'ue4/assets/enums/ETimelineLengthMode';
	import { ETickingGroup } from 'ue4/assets/enums/ETickingGroup';
	import { UCurveFloat } from 'ue4/objects/engine/curves/UCurveFloat';
	import { FBPVariableMetaDataEntry } from 'ue4/assets/objects/FBPVariableMetaDataEntry';
	export class UTimelineTemplate extends UObject {
	    TimelineLength: number;
	    LengthMode: ETimelineLengthMode;
	    bAutoPlay: boolean;
	    bLoop: boolean;
	    bReplicated: boolean;
	    bIgnoreTimeDilation: boolean;
	    EventTracks: FTTEventTrack[];
	    FloatTracks: FTTFloatTrack[];
	    VectorTracks: FTTVectorTrack[];
	    LinearColorTracks: FTTLinearColorTrack[];
	    MetaDataArray: FBPVariableMetaDataEntry[];
	    TimelineGuid: FGuid;
	    TimelineTickGroup: ETickingGroup;
	    VariableName: FName;
	    DirectionPropertyName: FName;
	    UpdateFunctionName: FName;
	    FinishedFunctionName: FName;
	}
	export class FTTTrackBase {
	    TrackName: FName;
	    bIsExternalCurve: boolean;
	}
	export class FTTEventTrack extends FTTTrackBase {
	    FunctionName: FName;
	    CurveKeys: UCurveFloat[];
	}
	export class FTTPropertyTrack extends FTTTrackBase {
	    PropertyName: FName;
	}
	export class FTTFloatTrack extends FTTPropertyTrack {
	    CurveFloat: UCurveFloat;
	}
	export class FTTVectorTrack extends FTTPropertyTrack {
	    CurveVector: FPackageIndex;
	}
	export class FTTLinearColorTrack extends FTTPropertyTrack {
	    CurveLinearColor: FPackageIndex;
	}

}
declare module 'ue4/assets/exports/UFunction' {
	import { UStruct } from 'ue4/assets/exports/UStruct';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	export class UFunction extends UStruct {
	    functionFlags: number;
	    eventGraphFunction: UFunction;
	    eventGraphCallOffset: number;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	}

}
declare module 'ue4/assets/exports/UBlueprintGeneratedClass_Properties' {
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { UActorComponent } from 'ue4/assets/exports/components/UActorComponent';
	import { UTimelineTemplate } from 'ue4/assets/exports/UTimelineTemplate';
	import { UFunction } from 'ue4/assets/exports/UFunction';
	import { UObject } from 'ue4/assets/exports/UObject';
	export class UBlueprintGeneratedClass_Properties extends UObject {
	    NumReplicatedProperties: number;
	    bHasNativizedParent: boolean;
	    bHasCookedComponentInstancingData: boolean;
	    DynamicBindingObjects: FPackageIndex[];
	    ComponentTemplates: UActorComponent[];
	    Timelines: UTimelineTemplate[];
	    SimpleConstructionScript: FPackageIndex;
	    InheritableComponentHandler: FPackageIndex;
	    UberGraphFramePointerProperty: FPackageIndex;
	    UberGraphFunction: UFunction;
	}

}
declare module 'ue4/assets/exports/UBlueprintGeneratedClass' {
	import { UBlueprintGeneratedClass_Properties } from 'ue4/assets/exports/UBlueprintGeneratedClass_Properties';
	export class FPointerToUberGraphFrame {
	}
	export class UBlueprintGeneratedClass extends UBlueprintGeneratedClass_Properties {
	}

}
declare module 'ue4/assets/exports/UClass' {
	import { UStruct } from 'ue4/assets/exports/UStruct';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	export class UClass extends UStruct {
	    constructor();
	    /** Used to check if the class was cooked or not */
	    bCooked: boolean;
	    /** Class flags; See EClassFlags for more information */
	    classFlags: number;
	    /** The required type for the outer of instances of this class */
	    classWithin: FPackageIndex;
	    /** This is the blueprint that caused the generation of this class, or null if it is a native compiled-in class */
	    classGeneratedBy: FPackageIndex;
	    /** Which Name.ini file to load Config variables out of */
	    classConfigName: FName;
	    /** The class default object; used for delta serialization and object initialization */
	    classDefaultObject: FPackageIndex;
	    /** Map of all functions by name contained in this class */
	    private funcMap;
	    /**
	     * The list of interfaces which this class implements, along with the pointer property that is located at the offset of the interface's vtable.
	     * If the interface class isn't native, the property will be null.
	     */
	    interfaces: FImplementedInterface[];
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	}
	export class FImplementedInterface {
	    /** the interface class */
	    clazz: FPackageIndex;
	    /** the pointer offset of the interface's vtable */
	    pointerOffset: number;
	    /** whether or not this interface has been implemented via K2 */
	    bImplementedByK2: boolean;
	    constructor(Ar: FAssetArchive);
	}

}
declare module 'ue4/assets/exports/ULevel_Properties' {
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { FVector } from 'ue4/objects/core/math/FVector';
	import { FIntVector } from 'ue4/objects/core/math/FIntVector';
	import { UObject } from 'ue4/assets/exports/UObject';
	export class ULevel_Properties extends UObject {
	    OwningWorld: FPackageIndex;
	    Model: FPackageIndex;
	    ModelComponents: FPackageIndex[];
	    ActorCluster: FPackageIndex;
	    NumTextureStreamingUnbuiltComponents: number;
	    NumTextureStreamingDirtyResources: number;
	    LevelScriptActor: FPackageIndex;
	    NavListStart: FPackageIndex;
	    NavListEnd: FPackageIndex;
	    NavDataChunks: FPackageIndex[];
	    LightmapTotalSize: number;
	    ShadowmapTotalSize: number;
	    StaticNavigableGeometry: FVector[];
	    StreamingTextureGuids: FGuid;
	    LevelBuildDataId: FGuid;
	    MapBuildData: FPackageIndex;
	    LightBuildLevelOffset: FIntVector;
	    bIsLightingScenario: boolean;
	    bTextureStreamingRotationChanged: boolean;
	    bStaticComponentsRegisteredInStreamingManager: boolean;
	    bIsVisible: boolean;
	    WorldSettings: FPackageIndex;
	    AssetUserData: FPackageIndex[];
	}

}
declare module 'ue4/objects/engine/FUrl' {
	/** URL structure. */
	import { FArchive } from 'ue4/reader/FArchive';
	export class FUrl {
	    /** Protocol, i.e. "unreal" or "http". */
	    protocol: string;
	    /** Optional hostname, i.e. "204.157.115.40" or "unreal.epicgames.com", blank if local. */
	    host: string;
	    /** Optional host port. */
	    port: number;
	    valid: number;
	    /** Map name, i.e. "SkyCity", default is "Entry". */
	    map: string;
	    /** Options. */
	    op: string[];
	    /** Portal to enter through, default is "". */
	    portal: string;
	    constructor(Ar: FArchive);
	    constructor(protocol: string, host: string, map: string, portal: string, op: string[], port: number, valid: number);
	}

}
declare module 'ue4/assets/exports/ULevel' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FVector } from 'ue4/objects/core/math/FVector';
	import { FArchive } from 'ue4/reader/FArchive';
	import { FColor } from 'ue4/objects/core/math/FColor';
	import { ULevel_Properties } from 'ue4/assets/exports/ULevel_Properties';
	import { FUrl } from 'ue4/objects/engine/FUrl';
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FVector2D } from 'ue4/objects/core/math/FVector2D';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	export class FPrecomputedVisibilityCell {
	    min: FVector;
	    chunkIndex: number;
	    dataOffset: number;
	    constructor(Ar: FArchive);
	}
	export class FCompressedVisibilityChunk {
	    bCompressed: boolean;
	    uncompressedSize: number;
	    data: Buffer;
	    constructor(Ar: FArchive);
	}
	export class FPrecomputedVisibilityBucket {
	    cellDataSize: number;
	    cells: FPrecomputedVisibilityCell[];
	    cellDataChunks: FCompressedVisibilityChunk[];
	    constructor(Ar: FArchive);
	}
	export class FPrecomputedVisibilityHandler {
	    precomputedVisibilityCellBucketOriginXY: FVector2D;
	    precomputedVisibilityCellSizeXY: number;
	    precomputedVisibilityCellSizeZ: number;
	    precomputedVisibilityCellBucketSizeXY: number;
	    precomputedVisibilityNumCellBuckets: number;
	    precomputedVisibilityCellBuckets: FPrecomputedVisibilityBucket[];
	    constructor(Ar: FArchive);
	}
	export class FPrecomputedVolumeDistanceField {
	    volumeMaxDistance: number;
	    volumeBox: any;
	    volumeSizeX: number;
	    volumeSizeY: number;
	    volumeSizeZ: number;
	    data: FColor[];
	    constructor(Ar: FArchive);
	}
	export class ULevel extends ULevel_Properties {
	    url: FUrl;
	    actors: UObject[];
	    model: UObject;
	    modelComponents: UObject[];
	    levelScriptActor: UObject;
	    navListStart: UObject;
	    navListEnd: UObject;
	    precomputedVisibilityHandler: FPrecomputedVisibilityHandler;
	    precomputedVolumeDistanceField: FPrecomputedVolumeDistanceField;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	}

}
declare module 'ue4/assets/exports/USCS_Node' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FName } from 'ue4/objects/uobject/FName';
	import { UStruct } from 'ue4/assets/exports/UStruct';
	import { UClass } from 'ue4/assets/exports/UClass';
	import { UActorComponent } from 'ue4/assets/exports/components/UActorComponent';
	import { FBPVariableMetaDataEntry } from 'ue4/assets/objects/FBPVariableMetaDataEntry';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	export class USCS_Node extends UObject {
	    ComponentClass: UClass;
	    ComponentTemplate: UActorComponent;
	    CookedComponentInstancingData: FBlueprintCookedComponentInstancingData;
	    AttachToName: FName;
	    ParentComponentOrVariableName: FName;
	    ParentComponentOwnerClassName: FName;
	    bIsParentComponentNative: boolean;
	    ChildNodes: USCS_Node[];
	    MetaDataArray: FBPVariableMetaDataEntry[];
	    VariableGuid: FGuid;
	    InternalVariableName: FName;
	}
	export class FBlueprintCookedComponentInstancingData {
	    ChangedPropertyList: FBlueprintComponentChangedPropertyInfo[];
	    bHasValidCookedData: boolean;
	}
	export class FBlueprintComponentChangedPropertyInfo {
	    PropertyName: FName;
	    ArrayIndex: number;
	    PropertyScope: UStruct;
	}

}
declare module 'ue4/assets/exports/USimpleConstructionScript' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { USCS_Node } from 'ue4/assets/exports/USCS_Node';
	export class USimpleConstructionScript extends UObject {
	    RootNodes: USCS_Node[];
	    AllNodes: USCS_Node[];
	    DefaultSceneRootNode: USCS_Node;
	}

}
declare module 'ue4/objects/uobject/EObjectFlags' {
	export enum EObjectFlags {
	    RF_NoFlags = 0,
	    RF_Public = 1,
	    RF_Standalone = 2,
	    RF_MarkAsNative = 4,
	    RF_Transactional = 8,
	    RF_ClassDefaultObject = 16,
	    RF_ArchetypeObject = 32,
	    RF_Transient = 64,
	    RF_MarkAsRootSet = 128,
	    RF_TagGarbageTemp = 256,
	    RF_NeedInitialization = 512,
	    RF_NeedLoad = 1024,
	    RF_KeepForCooker = 2048,
	    RF_NeedPostLoad = 4096,
	    RF_NeedPostLoadSubobjects = 8192,
	    RF_NewerVersionExists = 16384,
	    RF_BeginDestroyed = 32768,
	    RF_FinishDestroyed = 65536,
	    RF_BeingRegenerated = 131072,
	    RF_DefaultSubObject = 262144,
	    RF_WasLoaded = 524288,
	    RF_TextExportTransient = 1048576,
	    RF_LoadCompleted = 2097152,
	    RF_InheritableComponentTemplate = 4194304,
	    RF_DuplicateTransient = 8388608,
	    RF_StrongRefOnFrame = 16777216,
	    RF_NonPIEDuplicateTransient = 33554432,
	    RF_Dynamic = 67108864,
	    RF_WillBeLoaded = 134217728,
	    RF_HasExternalPackage = 268435456
	}

}
declare module 'ue4/assets/exports/UUserDefinedStruct' {
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	import { UScriptStruct } from 'ue4/assets/exports/UScriptStruct';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	export enum EUserDefinedStructureStatus {
	    /** Struct is in an unknown state. */
	    UDSS_UpToDate = 0,
	    /** Struct has been modified but not recompiled. */
	    UDSS_Dirty = 1,
	    /** Struct tried but failed to be compiled. */
	    UDSS_Error = 2,
	    /** Struct is a duplicate, the original one was changed. */
	    UDSS_Duplicate = 3
	}
	export class UUserDefinedStruct extends UScriptStruct {
	    Status: EUserDefinedStructureStatus;
	    Guid: FGuid;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	}

}
declare module 'ue4/assets/exports/UWorld' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { ULevel } from 'ue4/assets/exports/ULevel';
	import { FAssetArchive } from 'ue4/assets/reader/FAssetArchive';
	export class UWorld extends UObject {
	    persistentLevel: ULevel;
	    extraReferencedObjects: UObject;
	    streamingLevels: UObject;
	    deserialize(Ar: FAssetArchive, validPos: number): void;
	}

}
declare module 'ue4/assets/mappings/JsonTypeMappingsProvider' {
	import { TypeMappingsProvider } from 'ue4/assets/mappings/TypeMappingsProvider';
	/**
	 * Type mappings provider which uses json data
	 * @abstract
	 * @extends {TypeMappingsProvider}
	 */
	export abstract class JsonTypeMappingsProvider extends TypeMappingsProvider {
	    /**
	     * Adds a struct
	     * @param {object} json JSON data
	     * @returns {boolean} Wether if it was successful or not
	     * @protected
	     */
	    protected addStructs(json: any): boolean;
	    /**
	     * Adds an enum
	     * @param {object} json JSON data
	     * @returns {boolean} Wether if it was successful or not
	     * @protected
	     */
	    protected addEnums(json: any): boolean;
	}

}
declare module 'ue4/wwise/objects/BankHeader' {
	import { FArchive } from 'ue4/reader/FArchive';
	export class BankHeader {
	    readonly version: number;
	    readonly id: number;
	    constructor(Ar: FArchive);
	}

}
declare module 'ue4/wwise/objects/AkEntry' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { FArchive } from 'ue4/reader/FArchive';
	export class AkEntry {
	    readonly nameHash: number;
	    readonly offsetMultiplier: number;
	    readonly size: number;
	    readonly offset: number;
	    readonly folderId: number;
	    path: string;
	    isSoundBank: boolean;
	    data: Buffer;
	    constructor(Ar: FArchive);
	    toJson(): {
	        nameHash: number;
	        offsetMultiplier: number;
	        size: number;
	        offset: number;
	        folderId: number;
	        path: string;
	        isSoundBank: boolean;
	    };
	}

}
declare module 'ue4/wwise/objects/AkFolder' {
	import { AkEntry } from 'ue4/wwise/objects/AkEntry';
	import { FArchive } from 'ue4/reader/FArchive';
	export class AkFolder {
	    readonly offset: number;
	    readonly id: number;
	    name: string;
	    entries: AkEntry[];
	    constructor(Ar: FArchive);
	    populateName(Ar: FArchive): void;
	    toJson(): {
	        offset: number;
	        id: number;
	        name: string;
	        entries: {
	            nameHash: number;
	            offsetMultiplier: number;
	            size: number;
	            offset: number;
	            folderId: number;
	            path: string;
	            isSoundBank: boolean;
	        }[];
	    };
	}

}
declare module 'ue4/wwise/objects/DataIndex' {
	import { FArchive } from 'ue4/reader/FArchive';
	export class DataIndex {
	    readonly id: number;
	    readonly offset: number;
	    readonly length: number;
	    constructor(Ar: FArchive);
	}

}
declare module 'ue4/wwise/enums/EHierarchyObjectType' {
	export enum EHierarchyObjectType {
	    Settings = 0,
	    SoundSfxVoice = 1,
	    EventAction = 2,
	    Event = 3,
	    RandomSequenceContainer = 4,
	    SwitchContainer = 5,
	    ActorMixer = 6,
	    AudioBus = 7,
	    BlendContainer = 8,
	    MusicSegment = 9,
	    MusicTrack = 10,
	    MusicSwitchContainer = 11,
	    MusicPlaylistContainer = 12,
	    Attenuation = 13,
	    DialogueEvent = 14,
	    MotionBus = 15,
	    MotionFx = 16,
	    Effect = 17,
	    AuxiliaryBus = 18
	}

}
declare module 'ue4/wwise/objects/AbstractHierarchy' {
	import { FArchive } from 'ue4/reader/FArchive';
	export abstract class AbstractHierarchy {
	    id: number;
	    constructor(Ar: FArchive);
	    abstract toJson(): any;
	}

}
declare module 'ue4/wwise/objects/Hierarchy' {
	import { EHierarchyObjectType } from 'ue4/wwise/enums/EHierarchyObjectType';
	import { AbstractHierarchy } from 'ue4/wwise/objects/AbstractHierarchy';
	import { FArchive } from 'ue4/reader/FArchive';
	export class Hierarchy {
	    readonly type: EHierarchyObjectType;
	    readonly length: number;
	    readonly data: AbstractHierarchy;
	    constructor(Ar: FArchive);
	    toJson(): {
	        type: string;
	        length: number;
	        data: any;
	    };
	}

}
declare module 'ue4/wwise/enums/ESectionIdentifier' {
	export enum ESectionIdentifier {
	    AKPK = 1263553345,
	    BKHD = 1145588546,
	    INIT = 1414090313,
	    DIDX = 1480870212,
	    DATA = 1096040772,
	    HIRC = 1129466184,
	    RIFF = 1179011410,
	    STID = 1145656403,
	    STMG = 1196250195,
	    ENVS = 1398165061,
	    FXPR = 1380997190,
	    PLAT = 1413565520
	}

}
declare module 'ue4/wwise/WwiseReader' {
	/// <reference types="node" />
	/// <reference types="ref-napi" />
	import { BankHeader } from 'ue4/wwise/objects/BankHeader';
	import { AkFolder } from 'ue4/wwise/objects/AkFolder';
	import { DataIndex } from 'ue4/wwise/objects/DataIndex';
	import { Hierarchy } from 'ue4/wwise/objects/Hierarchy';
	import Collection from '@discordjs/collection';
	import { FArchive } from 'ue4/reader/FArchive';
	export class WwiseReader {
	    header: BankHeader;
	    folders: AkFolder[];
	    initialization: string[];
	    wemIndexes: DataIndex[];
	    wemSounds: Buffer[];
	    hierarchy: Hierarchy[];
	    idToString: Collection<number, string>;
	    platform: string;
	    wwiseEncodedMedias: Collection<string, Buffer>;
	    constructor(Ar: FArchive);
	    toJson(): {
	        header: {
	            id: number;
	            version: number;
	        };
	        folders: {
	            offset: number;
	            id: number;
	            name: string;
	            entries: {
	                nameHash: number;
	                offsetMultiplier: number;
	                size: number;
	                offset: number;
	                folderId: number;
	                path: string;
	                isSoundBank: boolean;
	            }[];
	        }[];
	        initialization: string[];
	        wemIndexes: {
	            length: number;
	            offset: number;
	            id: number;
	        }[];
	        hierarchy: {
	            type: string;
	            length: number;
	            data: any;
	        }[];
	        idToString: {
	            key: number;
	            value: string;
	        }[];
	        platform: string;
	    };
	}

}
declare module 'ue4/wwise/enums/EHierarchyParameterType' {
	export enum EHierarchyParameterType {
	    VoiceVolume = 0,
	    VoicePitch = 2,
	    VoiceLowPass = 3,
	    VoiceHighPass = 4,
	    BusVolume = 5,
	    MakeUpGain = 6,
	    PlaybackPriority = 7,
	    PlaybackPriorityOffset = 8,
	    MotionToVolumeOffset = 9,
	    MotionLowPass = 1,
	    PositioningPannerX = 12,
	    PositioningPannerY = 13,
	    PositioningCenterPercentage = 14,
	    ActionDelay = 15,
	    ActionFadeInTime = 16,
	    Probability = 17,
	    OverrideAuxBus0Volume = 19,
	    OverrideAuxBus1Volume = 20,
	    OverrideAuxBus2Volume = 21,
	    OverrideAuxBus3Volume = 22,
	    GameDefinedAuxSendVolume = 23,
	    OverrideBusVolume = 24,
	    OverrideBusHighPassFilter = 25,
	    OverrideBusLowPassFilter = 26,
	    HdrThreshold = 27,
	    HdrRatio = 28,
	    HdrReleaseTime = 29,
	    HdrOutputGameParam = 30,
	    HdrOutputGameParamMin = 31,
	    HdrOutputGameParamMax = 32,
	    HdrEnvelopeActiveRange = 33,
	    MidiNoteTrackingUnknown = 46,
	    MidiTranspositionInt = 47,
	    MidiVelocityOffsetInt = 48,
	    MidiFiltersKeyRangeMin = 49,
	    MidiFiltersKeyRangeMax = 50,
	    MidiFiltersVelocityRangeMin = 51,
	    MidiFiltersVelocityRangeMax = 52,
	    PlaybackSpeed = 54,
	    MidiClipTempoSourceIsFile = 55,
	    LoopTimeUInt = 58,
	    InitialDelay = 59
	}

}
declare module 'ue4/wwise/enums/ESoundConversion' {
	export enum ESoundConversion {
	    PCM = 1,
	    ADPCM = 2,
	    Vorbis = 4
	}

}
declare module 'ue4/wwise/enums/ESoundSource' {
	export enum ESoundSource {
	    Embedded = 0,
	    Streamed = 1,
	    StreamedZeroLatency = 2
	}

}
declare module 'ue4/wwise/enums/ESoundType' {
	export enum ESoundType {
	    SoundSfx = 0,
	    SoundVoice = 1,
	    StreamedSoundSfx = 8
	}

}
declare module 'util/decorators/ObjectRegistryIgnore' {
	export function ObjectRegistryIgnore<T extends {
	    new (...args: any[]): {};
	}>(constructor: T): {
	    new (...args: any[]): {};
	    ObjectRegistryIgnore: boolean;
	} & T;

}
declare module 'util/decorators/ObjectRegistryOverrideIgnore' {
	export function ObjectRegistryOverrideIgnore<T extends {
	    new (...args: any[]): {};
	}>(constructor: T): {
	    new (...args: any[]): {};
	    ObjectRegistryIgnore: boolean;
	} & T;

}
declare module 'valorant/exports/CharacterAbilityUIData' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FText } from 'ue4/objects/core/i18n/Text';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	export class CharacterAbilityUIData extends UObject {
	    DisplayName: FText;
	    Description: FText;
	    DisplayIcon: FPackageIndex;
	}

}
declare module 'valorant/exports/CharacterDataAsset' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	export class CharacterDataAsset extends UObject {
	    CharacterID: FName;
	    Character: FSoftObjectPath;
	    UIData: FSoftObjectPath;
	    Role: FSoftObjectPath;
	    CharacterSelectFXC: FSoftObjectPath;
	    DeveloperName: FName;
	    bIsPlayableCharacter: boolean;
	    bAvailableForTest: boolean;
	    Uuid: FGuid;
	    bBaseContent: boolean;
	}

}
declare module 'valorant/exports/CharacterRoleDataAsset' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { FGuid } from 'ue4/objects/core/misc/Guid';
	export class CharacterRoleDataAsset extends UObject {
	    UIData: FSoftObjectPath;
	    Uuid: FGuid;
	}

}
declare module 'valorant/exports/CharacterRoleUIData' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FText } from 'ue4/objects/core/i18n/Text';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	export class CharacterRoleUIData extends UObject {
	    DisplayName: FText;
	    Description: FText;
	    DisplayIcon: FPackageIndex;
	}

}
declare module 'valorant/exports/CharacterUIData' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FText } from 'ue4/objects/core/i18n/Text';
	import { FName } from 'ue4/objects/uobject/FName';
	import { FPackageIndex } from 'ue4/objects/uobject/ObjectResource';
	import { UScriptMap } from 'ue4/objects/uobject/UScriptMap';
	export class CharacterUIData extends UObject {
	    FullPortrait: FPackageIndex;
	    BustPortrait: FPackageIndex;
	    DisplayIconSmall: FPackageIndex;
	    DisplayIcon: FPackageIndex;
	    Abilities: UScriptMap;
	    WwiseStateName: FName;
	    DisplayName: FText;
	    Description: FText;
	}

}
declare module 'valorant/exports/ContractDataAssetV2ContentCharacter' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	import { ArrayProperty } from 'ue4/assets/objects/FProperty';
	export class ContractDataAssetV2ContentCharacter extends UObject {
	    RelatedCharacter: FSoftObjectPath;
	    Chapters: ArrayProperty;
	}

}
declare module 'valorant/exports/EditableRewardCharacter' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	export class EditableRewardCharacter extends UObject {
	    Character: FSoftObjectPath;
	}

}
declare module 'valorant/exports/EditableRewardCurrency' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	export class EditableRewardCurrency extends UObject {
	    Currency: FSoftObjectPath;
	}

}
declare module 'valorant/exports/EditableRewardEquippableCharmLevel' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	export class EditableRewardEquippableCharmLevel extends UObject {
	    EquippableCharmLevel: FSoftObjectPath;
	}

}
declare module 'valorant/exports/EditableRewardEquippableSkinLevel' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	export class EditableRewardEquippableSkinLevel extends UObject {
	    EquippableSkinLevel: FSoftObjectPath;
	    bHighlighted: boolean;
	}

}
declare module 'valorant/exports/EditableRewardPlayerCard' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	export class EditableRewardPlayerCard extends UObject {
	    PlayerCard: FSoftObjectPath;
	}

}
declare module 'valorant/exports/EditableRewardPlayerTitle' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	export class EditableRewardPlayerTitle extends UObject {
	    Title: FSoftObjectPath;
	}

}
declare module 'valorant/exports/EditableRewardSpray' {
	import { UObject } from 'ue4/assets/exports/UObject';
	import { FSoftObjectPath } from 'ue4/objects/uobject/SoftObjectPath';
	export class EditableRewardSpray extends UObject {
	    Spray: FSoftObjectPath;
	}

}
