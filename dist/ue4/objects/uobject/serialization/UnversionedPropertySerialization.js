"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeUnversionedProperties = exports.FIterator = exports.FFragment = exports.FUnversionedHeader = exports.getOrCreateUnversionedSchema = exports.schemaCache = exports.FUnversionedStructSchema = exports.FUnversionedPropertySerializer = void 0;
const PropertyInfo_1 = require("../../../assets/objects/PropertyInfo");
const FProperty_1 = require("../../../assets/objects/FProperty");
const FPropertyTag_1 = require("../../../assets/objects/FPropertyTag");
const FExportArchive_1 = require("../../../assets/reader/FExportArchive");
const FName_1 = require("../FName");
const UScriptStruct_1 = require("../../../assets/exports/UScriptStruct");
const bitset_1 = __importDefault(require("bitset"));
const Const_1 = require("../../../../util/Const");
const Exceptions_1 = require("../../../../exceptions/Exceptions");
const UnrealMap_1 = require("../../../../util/UnrealMap");
const PropertyType_1 = require("../../../assets/objects/PropertyType");
const Config_1 = require("../../../../Config");
const BitSetExtensions_1 = require("../../../../util/BitSetExtensions");
/**
 * FUnversionedPropertySerializer
 */
class FUnversionedPropertySerializer {
    /**
     * Creates an instance using values
     * @param {PropertyInfo} info Info to use
     * @param {number} type Type to use
     * @constructor
     * @public
     */
    constructor(info, type) {
        this.info = info;
        this.arrayIndex = type;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {ReadType} type Read type to use
     * @returns {FPropertyTag} Result
     * @public
     */
    deserialize(Ar, type) {
        if (Config_1.Config.GExportArchiveCheckDummyName && Ar instanceof FExportArchive_1.FExportArchive) {
            Ar.checkDummyName(this.info.name);
            const typeInfo = this.info.type;
            const arr = [
                typeInfo.type,
                typeInfo.structName,
                typeInfo.enumName,
                typeInfo.innerType?.type,
                typeInfo.valueType?.type
            ];
            arr.forEach((it) => it ? Ar.checkDummyName(it.text) : null);
        }
        const tag = new FPropertyTag_1.FPropertyTag(FName_1.FName.dummy(this.info.name));
        tag.arrayIndex = this.arrayIndex;
        tag.prop = FProperty_1.FProperty.readPropertyValue(Ar, this.info.type, type);
        return tag;
    }
    /**
     * Turns this to string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.info.type?.toString() + " " + this.info.name;
    }
}
exports.FUnversionedPropertySerializer = FUnversionedPropertySerializer;
/**
 * FUnversionedStructSchema
 */
class FUnversionedStructSchema {
    /**
     * Creates an instance using a value
     * @param {UStruct} struct Struct to use
     * @constructor
     * @public
     */
    constructor(struct) {
        /**
         * serializers
         * @type {Array<FUnversionedPropertySerializer>}
         * @public
         */
        this.serializers = [];
        let index = 0;
        while (struct != null) {
            /*if (struct instanceof UScriptStruct && struct.useClassProperties) {
                const clazz = struct.structClass
                if (!clazz)
                    throw new Error(`Missing schema for ${struct}`)
                const fields = Object.keys(clazz)
                for (const fieldKey of fields) { // Reflection
                    const ann = getUProperty(clazz, fieldKey) as IUProperty
                    if (bOnlyAnnotated && ann == null) {
                        continue
                    }
                    index += ann?.skipPrevious || 0
                    const propertyInfo = new PropertyInfo(
                        ann?.name || fieldKey,
                        new PropertyType(),
                        ann?.arrayDim || 1
                    )
                    for (let i = 0; i < propertyInfo.arrayDim; ++i) {
                        if (GDebugProperties) console.log(`${index} = ${propertyInfo.name}`)
                        this.serializers[index++] = new FUnversionedPropertySerializer(propertyInfo, i)
                    }
                    index += ann?.skipNext || 0
                }
            } else*/ if (struct.childProperties?.length) {
                for (const prop0 of struct.childProperties) {
                    const prop = prop0; // Serialized in packages
                    const propertyInfo = new PropertyInfo_1.PropertyInfo(prop.name.text, new PropertyType_1.PropertyType(prop), prop.arrayDim);
                    for (let i = 0; i < prop.arrayDim; ++i) {
                        if (Config_1.Config.GDebugProperties)
                            console.log(`${index} = ${prop.name} [SERIALIZED]`);
                        this.serializers[index++] = new FUnversionedPropertySerializer(propertyInfo, i);
                    }
                }
            }
            else if (struct.childProperties2?.length) {
                const startIndex = index;
                for (const prop of struct.childProperties2) {
                    index = startIndex + prop.index;
                    for (let i = 0; i < prop.arrayDim; ++i) {
                        if (Config_1.Config.GDebugProperties)
                            console.log(`${index} = ${prop.name}`);
                        this.serializers[index++] = new FUnversionedPropertySerializer(prop, i);
                    }
                }
                index = startIndex + struct.propertyCount;
            }
            struct = struct?.superStruct?.value;
        }
    }
}
exports.FUnversionedStructSchema = FUnversionedStructSchema;
/**
 * schemaCache
 * @type {UnrealMap<any, FUnversionedStructSchema>}
 * @export
 */
exports.schemaCache = new UnrealMap_1.UnrealMap();
/**
 * getOrCreateUnversionedSchema
 * @param {UStruct} struct Struct to use
 * @returns {FUnversionedStructSchema} Schema
 * @export
 */
function getOrCreateUnversionedSchema(struct) {
    if (struct instanceof UScriptStruct_1.UScriptStruct && struct.useClassProperties && struct.structClass) {
        const entry = exports.schemaCache.get(struct.structClass);
        if (!entry) {
            const schema = new FUnversionedStructSchema(struct);
            exports.schemaCache.set(struct.structClass, schema);
            return schema;
        }
        return entry;
    }
    else {
        return new FUnversionedStructSchema(struct);
    }
}
exports.getOrCreateUnversionedSchema = getOrCreateUnversionedSchema;
/**
 * FUnversionedHeader
 */
class FUnversionedHeader {
    constructor() {
        /**
         * fragments
         * @type {Array<FFragment>}
         * @public
         */
        this.fragments = [];
        /**
         * bHasNonZeroValues
         * @type {boolean}
         * @public
         */
        this.bHasNonZeroValues = false;
    }
    /**
     * Loads this
     * @param {FArchive} Ar UE4 Reader to use
     * @returns {void}
     * @public
     */
    load(Ar) {
        let fragment;
        let zeroMaskNum = 0;
        let unmaskedNum = 0;
        do {
            const packed = Ar.readUInt16();
            fragment = new FFragment(packed);
            this.fragments.push(fragment);
            if (fragment.bHasAnyZeroes) {
                zeroMaskNum += fragment.valueNum;
            }
            else {
                unmaskedNum += fragment.valueNum;
            }
        } while (!fragment.bIsLast);
        if (zeroMaskNum > 0) {
            this.zeroMask = this.loadZeroMaskData(Ar, zeroMaskNum);
            this.bHasNonZeroValues = unmaskedNum > 0 || BitSetExtensions_1.BitSetExtensions.indexOfFirst(this.zeroMask, false) !== Const_1.INDEX_NONE;
        }
        else {
            this.zeroMask = new bitset_1.default(0);
            this.bHasNonZeroValues = unmaskedNum > 0;
        }
    }
    /**
     * Whether has values
     * @returns {boolean} Result
     * @public
     */
    hasValues() {
        return this.bHasNonZeroValues || (this.zeroMask.toArray().length);
    }
    /**
     * Loads zero mask data
     * @param {FArchive} Ar UE4 Reader to use
     * @param {number} numBits Num bits to read
     * @protected
     */
    loadZeroMaskData(Ar, numBits) {
        return new bitset_1.default(Ar.readBuffer(Math.floor(numBits <= 8 ? 1 :
            numBits <= 16 ? 2 :
                Math.floor(numBits / 32) * 4)));
    }
}
exports.FUnversionedHeader = FUnversionedHeader;
/**
 * FFragment
 */
class FFragment {
    /**
     * Creates an instance using a value
     * @param {number} int Value to use
     * @constructor
     * @public
     */
    constructor(int) {
        /**
         * Number of properties to skip before values
         * @type {number}
         * @public
         */
        this.skipNum = 0;
        /**
         * Whether has any zeroes
         * @type {boolean}
         * @public
         */
        this.bHasAnyZeroes = false;
        /**
         * Number of subsequent property values stored
         * @type {number}
         * @public
         */
        this.valueNum = 0;
        /**
         * Whether last fragment of header
         * @type {number}
         * @public
         */
        this.bIsLast = false;
        this.skipNum = int & FFragment.SKIP_NUM_MASK;
        this.bHasAnyZeroes = (int & FFragment.HAS_ZERO_MASK) !== 0;
        this.valueNum = int >> FFragment.VALUE_NUM_SHIFT;
        this.bIsLast = (int & FFragment.IS_LAST_MASK) !== 0;
    }
}
exports.FFragment = FFragment;
/**
 * SKIP_MAX
 * @type {number}
 * @public
 * @static
 */
FFragment.SKIP_MAX = 127;
/**
 * VALUE_MAX
 * @type {number}
 * @public
 * @static
 */
FFragment.VALUE_MAX = 127;
/**
 * SKIP_NUM_MASK
 * @type {number}
 * @public
 * @static
 */
FFragment.SKIP_NUM_MASK = 0x007f;
/**
 * HAS_ZERO_MASK
 * @type {number}
 * @public
 * @static
 */
FFragment.HAS_ZERO_MASK = 0x0080;
/**
 * VALUE_NUM_SHIFT
 * @type {number}
 * @public
 * @static
 */
FFragment.VALUE_NUM_SHIFT = 9;
/**
 * IS_LAST_MASK
 * @type {number}
 * @public
 * @static
 */
FFragment.IS_LAST_MASK = 0x0100;
/**
 * FIterator
 */
class FIterator {
    /**
     * Creates an instance using values
     * @param {FUnversionedHeader} header Header to use
     * @param {Array<FUnversionedPropertySerializer>} schemas Schemas to use
     * @constructor
     * @public
     */
    constructor(header, schemas) {
        /**
         * schemaIt
         * @type {number}
         * @public
         */
        this.schemaIt = 0;
        /**
         * fragmentIt
         * @type {number}
         * @private
         */
        this.fragmentIt = 0;
        /**
         * zeroMaskIndex
         * @type {number}
         * @private
         */
        this.zeroMaskIndex = 0;
        /**
         * remainingFragmentValues
         * @type {number}
         * @private
         */
        this.remainingFragmentValues = 0;
        this.header = header;
        this.schemas = schemas;
        this.bDone = !this.header.hasValues();
        if (!this.bDone)
            this.skip();
    }
    /**
     * Zero mask shortcut
     * @type {BitSet}
     * @private
     */
    get zeroMask() {
        return this.header.zeroMask;
    }
    /**
     * Fragments shortcut
     * @type {Array<fragments>}
     * @private
     */
    get fragments() {
        return this.header.fragments;
    }
    /**
     * Goes to next entry
     * @returns {void}
     * @public
     */
    next() {
        ++this.schemaIt;
        --this.remainingFragmentValues;
        if (this.fragments[this.fragmentIt].bHasAnyZeroes) {
            ++this.zeroMaskIndex;
        }
        if (this.remainingFragmentValues === 0) {
            if (this.fragments[this.fragmentIt].bIsLast) {
                this.bDone = true;
            }
            else {
                ++this.fragmentIt;
                this.skip();
            }
        }
    }
    /**
     * Current serializer
     * @type {FUnversionedPropertySerializer}
     * @public
     */
    get serializer() {
        return this.schemas[this.schemaIt];
    }
    /**
     * Whether is non zero
     * @returns {boolean} Result
     * @public
     */
    isNonZero() {
        return !this.fragments[this.fragmentIt].bHasAnyZeroes || !this.zeroMask.get(Math.floor(this.zeroMaskIndex));
    }
    /**
     * Skips entry
     * @returns {void}
     * @private
     */
    skip() {
        this.schemaIt += this.fragments[this.fragmentIt].skipNum;
        while (this.fragments[this.fragmentIt].valueNum === 0) {
            if (this.fragments[this.fragmentIt].bIsLast)
                throw new Error("Cannot skip last fragment.");
            ++this.fragmentIt;
            this.schemaIt += this.fragments[this.fragmentIt].skipNum;
        }
        this.remainingFragmentValues = this.fragments[this.fragmentIt].valueNum;
    }
}
exports.FIterator = FIterator;
/**
 * Deserializes unversioned properties
 * @param {Array<FPropertyTag>} properties Array where properties should be assigned to
 * @param {UStruct} struct Struct to use
 * @param {FAssetArchive} Ar UE4 Asset Reader to use
 * @returns {void}
 * @export
 */
function deserializeUnversionedProperties(properties, struct, Ar) {
    if (Config_1.Config.GDebugProperties)
        console.info(`Load: ${struct.name}`);
    const header = new FUnversionedHeader();
    header.load(Ar);
    if (header.hasValues()) {
        const schemas = getOrCreateUnversionedSchema(struct).serializers;
        if (header.bHasNonZeroValues) {
            const it = new FIterator(header, schemas);
            while (!it.bDone) {
                const serializer = it.serializer;
                if (serializer) {
                    if (Config_1.Config.GDebugProperties)
                        console.log(`Val: ${it.schemaIt} (IsNonZero: ${it.isNonZero()})`);
                    if (it.isNonZero()) {
                        const element = serializer.deserialize(Ar, FProperty_1.ReadType.NORMAL);
                        properties.push(element);
                        if (Config_1.Config.GDebugProperties)
                            console.info(element.toString());
                    }
                    else {
                        const start = Ar.pos;
                        properties.push(serializer.deserialize(Ar, FProperty_1.ReadType.ZERO));
                        if (Ar.pos !== start)
                            throw new Exceptions_1.ParserException(`Zero property #${it.schemaIt} should not advance the archive's position`, Ar);
                    }
                }
                else {
                    if (it.isNonZero()) {
                        if (Config_1.Config.GFatalUnknownProperty) {
                            console.warn(`Unknown property for ${struct.name} with index ${it.schemaIt}, cannot proceed with serialization. Serialized ${properties.length} until now.`);
                            return;
                        }
                        else {
                            throw new Exceptions_1.UnknownPropertyException(`Unknown property for ${struct.name} with index ${it.schemaIt}, cannot proceed with serialization`, Ar);
                        }
                    }
                    console.warn(`Unknown property for ${struct.name} with index ${it.schemaIt}, but it's zero so we're good`);
                }
                it.next();
            }
        }
        else {
            const it = new FIterator(header, schemas);
            while (!it.bDone) {
                if (it.isNonZero())
                    throw new Error("'FIterator' cannot be non zero");
                if (it.serializer) {
                    properties.push(it.serializer.deserialize(Ar, FProperty_1.ReadType.ZERO));
                }
                it.next();
            }
        }
    }
}
exports.deserializeUnversionedProperties = deserializeUnversionedProperties;
