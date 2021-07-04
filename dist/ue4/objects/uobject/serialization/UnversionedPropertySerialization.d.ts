import { PropertyInfo } from "../../../assets/objects/PropertyInfo";
import { ReadType } from "../../../assets/objects/FProperty";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { FPropertyTag } from "../../../assets/objects/FPropertyTag";
import { UStruct } from "../../../assets/exports/UStruct";
import BitSet from "bitset";
import { FArchive } from "../../../reader/FArchive";
import { UnrealMap } from "../../../../util/UnrealMap";
/**
 * FUnversionedPropertySerializer
 */
export declare class FUnversionedPropertySerializer {
    /**
     * info
     * @type {PropertyInfo}
     * @public
     */
    info: PropertyInfo;
    /**
     * arrayIndex
     * @type {number}
     * @public
     */
    arrayIndex: number;
    /**
     * Creates an instance using values
     * @param {PropertyInfo} info Info to use
     * @param {number} type Type to use
     * @constructor
     * @public
     */
    constructor(info: PropertyInfo, type: number);
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {ReadType} type Read type to use
     * @returns {FPropertyTag} Result
     * @public
     */
    deserialize(Ar: FAssetArchive, type: ReadType): FPropertyTag;
    /**
     * Turns this to string
     * @returns {string} Result
     * @public
     */
    toString(): string;
}
/**
 * FUnversionedStructSchema
 */
export declare class FUnversionedStructSchema {
    /**
     * serializers
     * @type {Array<FUnversionedPropertySerializer>}
     * @public
     */
    serializers: FUnversionedPropertySerializer[];
    /**
     * Creates an instance using a value
     * @param {UStruct} struct Struct to use
     * @constructor
     * @public
     */
    constructor(struct: UStruct);
}
/**
 * schemaCache
 * @type {UnrealMap<any, FUnversionedStructSchema>}
 * @export
 */
export declare const schemaCache: UnrealMap<any, FUnversionedStructSchema>;
/**
 * getOrCreateUnversionedSchema
 * @param {UStruct} struct Struct to use
 * @returns {FUnversionedStructSchema} Schema
 * @export
 */
export declare function getOrCreateUnversionedSchema(struct: UStruct): FUnversionedStructSchema;
/**
 * FUnversionedHeader
 */
export declare class FUnversionedHeader {
    /**
     * fragments
     * @type {Array<FFragment>}
     * @public
     */
    fragments: FFragment[];
    /**
     * bHasNonZeroValues
     * @type {boolean}
     * @public
     */
    bHasNonZeroValues: boolean;
    /**
     * zeroMask
     * @type {BitSet}
     * @public
     */
    zeroMask: BitSet;
    /**
     * Loads this
     * @param {FArchive} Ar UE4 Reader to use
     * @returns {void}
     * @public
     */
    load(Ar: FArchive): void;
    /**
     * Whether has values
     * @returns {boolean} Result
     * @public
     */
    hasValues(): number | true;
    /**
     * Loads zero mask data
     * @param {FArchive} Ar UE4 Reader to use
     * @param {number} numBits Num bits to read
     * @protected
     */
    protected loadZeroMaskData(Ar: FArchive, numBits: number): BitSet;
}
/**
 * FFragment
 */
export declare class FFragment {
    /**
     * SKIP_MAX
     * @type {number}
     * @public
     * @static
     */
    static SKIP_MAX: number;
    /**
     * VALUE_MAX
     * @type {number}
     * @public
     * @static
     */
    static VALUE_MAX: number;
    /**
     * SKIP_NUM_MASK
     * @type {number}
     * @public
     * @static
     */
    static SKIP_NUM_MASK: number;
    /**
     * HAS_ZERO_MASK
     * @type {number}
     * @public
     * @static
     */
    static HAS_ZERO_MASK: number;
    /**
     * VALUE_NUM_SHIFT
     * @type {number}
     * @public
     * @static
     */
    static VALUE_NUM_SHIFT: number;
    /**
     * IS_LAST_MASK
     * @type {number}
     * @public
     * @static
     */
    static IS_LAST_MASK: number;
    /**
     * Number of properties to skip before values
     * @type {number}
     * @public
     */
    skipNum: number;
    /**
     * Whether has any zeroes
     * @type {boolean}
     * @public
     */
    bHasAnyZeroes: boolean;
    /**
     * Number of subsequent property values stored
     * @type {number}
     * @public
     */
    valueNum: number;
    /**
     * Whether last fragment of header
     * @type {number}
     * @public
     */
    bIsLast: boolean;
    /**
     * Creates an instance using a value
     * @param {number} int Value to use
     * @constructor
     * @public
     */
    constructor(int: number);
}
/**
 * FIterator
 */
export declare class FIterator {
    /**
     * bDone
     * @type {boolean}
     * @public
     */
    bDone: boolean;
    /**
     * header
     * @type {FUnversionedHeader}
     * @public
     */
    header: FUnversionedHeader;
    /**
     * schemas
     * @type {Array<FUnversionedPropertySerializer>}
     * @public
     */
    private schemas;
    /**
     * schemaIt
     * @type {number}
     * @public
     */
    schemaIt: number;
    /**
     * fragmentIt
     * @type {number}
     * @private
     */
    private fragmentIt;
    /**
     * zeroMaskIndex
     * @type {number}
     * @private
     */
    private zeroMaskIndex;
    /**
     * remainingFragmentValues
     * @type {number}
     * @private
     */
    private remainingFragmentValues;
    /**
     * Zero mask shortcut
     * @type {BitSet}
     * @private
     */
    private get zeroMask();
    /**
     * Fragments shortcut
     * @type {Array<fragments>}
     * @private
     */
    private get fragments();
    /**
     * Creates an instance using values
     * @param {FUnversionedHeader} header Header to use
     * @param {Array<FUnversionedPropertySerializer>} schemas Schemas to use
     * @constructor
     * @public
     */
    constructor(header: FUnversionedHeader, schemas: FUnversionedPropertySerializer[]);
    /**
     * Goes to next entry
     * @returns {void}
     * @public
     */
    next(): void;
    /**
     * Current serializer
     * @type {FUnversionedPropertySerializer}
     * @public
     */
    get serializer(): FUnversionedPropertySerializer;
    /**
     * Whether is non zero
     * @returns {boolean} Result
     * @public
     */
    isNonZero(): boolean;
    /**
     * Skips entry
     * @returns {void}
     * @private
     */
    private skip;
}
/**
 * Deserializes unversioned properties
 * @param {Array<FPropertyTag>} properties Array where properties should be assigned to
 * @param {UStruct} struct Struct to use
 * @param {FAssetArchive} Ar UE4 Asset Reader to use
 * @returns {void}
 * @export
 */
export declare function deserializeUnversionedProperties(properties: FPropertyTag[], struct: UStruct, Ar: FAssetArchive): void;
