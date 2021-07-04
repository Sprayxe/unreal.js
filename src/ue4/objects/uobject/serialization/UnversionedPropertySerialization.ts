import { PropertyInfo } from "../../../assets/objects/PropertyInfo";
import { FProperty, ReadType } from "../../../assets/objects/FProperty";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { FPropertyTag } from "../../../assets/objects/FPropertyTag";
import { FExportArchive } from "../../../assets/reader/FExportArchive";
import { FName } from "../FName";
import { FPropertySerialized, UStruct } from "../../../assets/exports/UStruct";
import { UScriptStruct } from "../../../assets/exports/UScriptStruct";
import BitSet from "bitset";
import { FArchive } from "../../../reader/FArchive";
import { INDEX_NONE } from "../../../../util/Const";
import { ParserException, UnknownPropertyException } from "../../../../exceptions/Exceptions";
import { UnrealMap } from "../../../../util/UnrealMap";
import { PropertyType } from "../../../assets/objects/PropertyType";
import { Config } from "../../../../Config";
import { BitSetExtensions } from "../../../../util/BitSetExtensions";

/**
 * FUnversionedPropertySerializer
 */
export class FUnversionedPropertySerializer {
    /**
     * info
     * @type {PropertyInfo}
     * @public
     */
    info: PropertyInfo

    /**
     * arrayIndex
     * @type {number}
     * @public
     */
    arrayIndex: number

    /**
     * Creates an instance using values
     * @param {PropertyInfo} info Info to use
     * @param {number} type Type to use
     * @constructor
     * @public
     */
    constructor(info: PropertyInfo, type: number) {
        this.info = info
        this.arrayIndex = type
    }

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {ReadType} type Read type to use
     * @returns {FPropertyTag} Result
     * @public
     */
    deserialize(Ar: FAssetArchive, type: ReadType): FPropertyTag {
        if (Config.GExportArchiveCheckDummyName && Ar instanceof FExportArchive) {
            Ar.checkDummyName(this.info.name)
            const typeInfo = this.info.type
            const arr = [
                typeInfo.type,
                typeInfo.structName,
                typeInfo.enumName,
                typeInfo.innerType?.type,
                typeInfo.valueType?.type
            ]
            arr.forEach((it) => it ? Ar.checkDummyName(it.text) : null)
        }
        const tag = new FPropertyTag(FName.dummy(this.info.name))
        tag.arrayIndex = this.arrayIndex
        tag.prop = FProperty.readPropertyValue(Ar, this.info.type, type)
        return tag
    }

    /**
     * Turns this to string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.info.type?.toString() + " " + this.info.name
    }
}

/**
 * FUnversionedStructSchema
 */
export class FUnversionedStructSchema {
    /**
     * serializers
     * @type {Array<FUnversionedPropertySerializer>}
     * @public
     */
    serializers: FUnversionedPropertySerializer[] = []

    /**
     * Creates an instance using a value
     * @param {UStruct} struct Struct to use
     * @constructor
     * @public
     */
    constructor(struct: UStruct) {
        let index = 0
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
                    const prop = prop0 as FPropertySerialized // Serialized in packages
                    const propertyInfo = new PropertyInfo(prop.name.text, new PropertyType(prop), prop.arrayDim)
                    for (let i = 0; i < prop.arrayDim; ++i) {
                        if (Config.GDebugProperties) console.log(`${index} = ${prop.name} [SERIALIZED]`)
                        this.serializers[index++] = new FUnversionedPropertySerializer(propertyInfo, i)
                    }
                }
            } else if (struct.childProperties2?.length) {
                const startIndex = index
                for (const prop of struct.childProperties2) {
                    index = startIndex + prop.index
                    for (let i = 0; i < prop.arrayDim; ++i) {
                        if (Config.GDebugProperties) console.log(`${index} = ${prop.name}`)
                        this.serializers[index++] = new FUnversionedPropertySerializer(prop, i)
                    }
                }
                index = startIndex + struct.propertyCount
            }
            struct = struct?.superStruct?.value
        }
    }
}

/**
 * schemaCache
 * @type {UnrealMap<any, FUnversionedStructSchema>}
 * @export
 */
export const schemaCache = new UnrealMap<any, FUnversionedStructSchema>()

/**
 * getOrCreateUnversionedSchema
 * @param {UStruct} struct Struct to use
 * @returns {FUnversionedStructSchema} Schema
 * @export
 */
export function getOrCreateUnversionedSchema(struct: UStruct): FUnversionedStructSchema {
    if (struct instanceof UScriptStruct && struct.useClassProperties && struct.structClass) {
        const entry = schemaCache.get(struct.structClass)
        if (!entry) {
            const schema = new FUnversionedStructSchema(struct)
            schemaCache.set(struct.structClass, schema)
            return schema
        }
        return entry
    } else {
        return new FUnversionedStructSchema(struct)
    }
}

/**
 * FUnversionedHeader
 */
export class FUnversionedHeader {
    /**
     * fragments
     * @type {Array<FFragment>}
     * @public
     */
    fragments: FFragment[] = []

    /**
     * bHasNonZeroValues
     * @type {boolean}
     * @public
     */
    bHasNonZeroValues = false

    /**
     * zeroMask
     * @type {BitSet}
     * @public
     */
    zeroMask: BitSet

    /**
     * Loads this
     * @param {FArchive} Ar UE4 Reader to use
     * @returns {void}
     * @public
     */
    load(Ar: FArchive) {
        let fragment: FFragment
        let zeroMaskNum = 0
        let unmaskedNum = 0
        do {
            const packed = Ar.readUInt16()
            fragment = new FFragment(packed)

            this.fragments.push(fragment)

            if (fragment.bHasAnyZeroes) {
                zeroMaskNum += fragment.valueNum
            } else {
                unmaskedNum += fragment.valueNum
            }
        } while (!fragment.bIsLast)

        if (zeroMaskNum > 0) {
            this.zeroMask = this.loadZeroMaskData(Ar, zeroMaskNum)
            this.bHasNonZeroValues = unmaskedNum > 0 || BitSetExtensions.indexOfFirst(this.zeroMask, false) !== INDEX_NONE
        } else {
            this.zeroMask = new BitSet(0)
            this.bHasNonZeroValues = unmaskedNum > 0
        }
    }

    /**
     * Whether has values
     * @returns {boolean} Result
     * @public
     */
    hasValues() {
        return this.bHasNonZeroValues || (this.zeroMask.toArray().length)
    }

    /**
     * Loads zero mask data
     * @param {FArchive} Ar UE4 Reader to use
     * @param {number} numBits Num bits to read
     * @protected
     */
    protected loadZeroMaskData(Ar: FArchive, numBits: number) {
        return new BitSet(Ar.readBuffer(Math.floor(
            numBits <= 8 ? 1 :
            numBits <= 16 ? 2 :
            Math.floor(numBits / 32) * 4
        )))
    }
}

/**
 * FFragment
 */
export class FFragment {
    /**
     * SKIP_MAX
     * @type {number}
     * @public
     * @static
     */
    static SKIP_MAX = 127

    /**
     * VALUE_MAX
     * @type {number}
     * @public
     * @static
     */
    static VALUE_MAX = 127

    /**
     * SKIP_NUM_MASK
     * @type {number}
     * @public
     * @static
     */
    static SKIP_NUM_MASK: number = 0x007f

    /**
     * HAS_ZERO_MASK
     * @type {number}
     * @public
     * @static
     */
    static HAS_ZERO_MASK: number = 0x0080

    /**
     * VALUE_NUM_SHIFT
     * @type {number}
     * @public
     * @static
     */
    static VALUE_NUM_SHIFT = 9

    /**
     * IS_LAST_MASK
     * @type {number}
     * @public
     * @static
     */
    static IS_LAST_MASK: number = 0x0100

    /**
     * Number of properties to skip before values
     * @type {number}
     * @public
     */
    skipNum: number = 0

    /**
     * Whether has any zeroes
     * @type {boolean}
     * @public
     */
    bHasAnyZeroes = false

    /**
     * Number of subsequent property values stored
     * @type {number}
     * @public
     */
    valueNum: number = 0

    /**
     * Whether last fragment of header
     * @type {number}
     * @public
     */
    bIsLast = false

    /**
     * Creates an instance using a value
     * @param {number} int Value to use
     * @constructor
     * @public
     */
    constructor(int: number) {
        this.skipNum = int & FFragment.SKIP_NUM_MASK
        this.bHasAnyZeroes = (int & FFragment.HAS_ZERO_MASK) !== 0
        this.valueNum = int >> FFragment.VALUE_NUM_SHIFT
        this.bIsLast = (int & FFragment.IS_LAST_MASK) !== 0
    }
}

/**
 * FIterator
 */
export class FIterator {
    /**
     * bDone
     * @type {boolean}
     * @public
     */
    bDone: boolean

    /**
     * header
     * @type {FUnversionedHeader}
     * @public
     */
    header: FUnversionedHeader

    /**
     * schemas
     * @type {Array<FUnversionedPropertySerializer>}
     * @public
     */
    private schemas: FUnversionedPropertySerializer[]

    /**
     * schemaIt
     * @type {number}
     * @public
     */
    public schemaIt = 0

    /**
     * fragmentIt
     * @type {number}
     * @private
     */
    private fragmentIt = 0

    /**
     * zeroMaskIndex
     * @type {number}
     * @private
     */
    private zeroMaskIndex = 0

    /**
     * remainingFragmentValues
     * @type {number}
     * @private
     */
    private remainingFragmentValues = 0

    /**
     * Zero mask shortcut
     * @type {BitSet}
     * @private
     */
    private get zeroMask() {
        return this.header.zeroMask
    }

    /**
     * Fragments shortcut
     * @type {Array<fragments>}
     * @private
     */
    private get fragments() {
        return this.header.fragments
    }

    /**
     * Creates an instance using values
     * @param {FUnversionedHeader} header Header to use
     * @param {Array<FUnversionedPropertySerializer>} schemas Schemas to use
     * @constructor
     * @public
     */
    constructor(header: FUnversionedHeader, schemas: FUnversionedPropertySerializer[]) {
        this.header = header
        this.schemas = schemas
        this.bDone = !this.header.hasValues()
        if (!this.bDone)
            this.skip()
    }

    /**
     * Goes to next entry
     * @returns {void}
     * @public
     */
    next() {
        ++this.schemaIt
        --this.remainingFragmentValues
        if (this.fragments[this.fragmentIt].bHasAnyZeroes) {
            ++this.zeroMaskIndex
        }
        if (this.remainingFragmentValues === 0) {
            if (this.fragments[this.fragmentIt].bIsLast) {
                this.bDone = true
            } else {
                ++this.fragmentIt
                this.skip()
            }
        }
    }

    /**
     * Current serializer
     * @type {FUnversionedPropertySerializer}
     * @public
     */
    get serializer() {
        return this.schemas[this.schemaIt]
    }

    /**
     * Whether is non zero
     * @returns {boolean} Result
     * @public
     */
    isNonZero() {
        return !this.fragments[this.fragmentIt].bHasAnyZeroes || !this.zeroMask.get(Math.floor(this.zeroMaskIndex))
    }

    /**
     * Skips entry
     * @returns {void}
     * @private
     */
    private skip() {
        this.schemaIt += this.fragments[this.fragmentIt].skipNum

        while (this.fragments[this.fragmentIt].valueNum === 0) {
            if (this.fragments[this.fragmentIt].bIsLast)
                throw new Error("Cannot skip last fragment.")
            ++this.fragmentIt
            this.schemaIt += this.fragments[this.fragmentIt].skipNum
        }

        this.remainingFragmentValues = this.fragments[this.fragmentIt].valueNum
    }
}

/**
 * Deserializes unversioned properties
 * @param {Array<FPropertyTag>} properties Array where properties should be assigned to
 * @param {UStruct} struct Struct to use
 * @param {FAssetArchive} Ar UE4 Asset Reader to use
 * @returns {void}
 * @export
 */
export function deserializeUnversionedProperties(properties: FPropertyTag[], struct: UStruct, Ar: FAssetArchive) {
    if (Config.GDebugProperties) console.info(`Load: ${struct.name}`)
    const header = new FUnversionedHeader()
    header.load(Ar)
    if (header.hasValues()) {
        const schemas = getOrCreateUnversionedSchema(struct).serializers
        if (header.bHasNonZeroValues) {
            const it = new FIterator(header, schemas)
            while (!it.bDone) {
                const serializer = it.serializer
                if (serializer) {
                    if (Config.GDebugProperties) console.log(`Val: ${it.schemaIt} (IsNonZero: ${it.isNonZero()})`)
                    if (it.isNonZero()) {
                        const element = serializer.deserialize(Ar, ReadType.NORMAL)
                        properties.push(element)
                        if (Config.GDebugProperties) console.info(element.toString())
                    } else {
                        const start = Ar.pos
                        properties.push(serializer.deserialize(Ar, ReadType.ZERO))
                        if (Ar.pos !== start)
                            throw new ParserException(
                                `Zero property #${it.schemaIt} should not advance the archive's position`, Ar)
                    }
                } else {
                    if (it.isNonZero()) {
                        if (Config.GFatalUnknownProperty) {
                            console.warn(`Unknown property for ${struct.name} with index ${it.schemaIt}, cannot proceed with serialization. Serialized ${properties.length} until now.`)
                            return
                        } else {
                            throw new UnknownPropertyException(
                                `Unknown property for ${struct.name} with index ${it.schemaIt}, cannot proceed with serialization`, Ar)
                        }
                    }
                    console.warn(`Unknown property for ${struct.name} with index ${it.schemaIt}, but it's zero so we're good`)
                }
                it.next()
            }
        } else {
            const it = new FIterator(header, schemas)
            while (!it.bDone) {
                if (it.isNonZero())
                    throw new Error("'FIterator' cannot be non zero")
                if (it.serializer) {
                    properties.push(it.serializer.deserialize(Ar, ReadType.ZERO))
                }
                it.next()
            }
        }
    }
}