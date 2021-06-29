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
import { Utils } from "../../../../util/Utils";
import { Config } from "../../../../Config";

export class FUnversionedPropertySerializer {
    info: PropertyInfo
    arrayIndex: number

    constructor(info: PropertyInfo, type: number) {
        this.info = info
        this.arrayIndex = type
    }

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

    toString() {
        return this.info.type?.toString() + " " + this.info.name
    }
}

export class FUnversionedStructSchema {
    serializers: FUnversionedPropertySerializer[] = []

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

export const schemaCache = new UnrealMap<any, FUnversionedStructSchema>()
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

export class FUnversionedHeader {
    fragments: FFragment[] = []
    bHasNonZeroValues = false
    zeroMask: BitSet

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
            this.bHasNonZeroValues = unmaskedNum > 0 || Utils.bitSetIndex(this.zeroMask, false) !== INDEX_NONE
        } else {
            this.zeroMask = new BitSet(0)
            this.bHasNonZeroValues = unmaskedNum > 0
        }
    }

    hasValues() {
        return this.bHasNonZeroValues || (this.zeroMask.toArray().length)
    }

    protected loadZeroMaskData(Ar: FArchive, numBits: number) {
        return new BitSet(Ar.readBuffer(Math.floor(
            numBits <= 8 ? 1 :
            numBits <= 16 ? 2 :
            Math.floor(numBits / 32) * 4
        )))
    }
}

export class FFragment {
    SKIP_MAX = 127
    VALUE_MAX = 127

    SKIP_NUM_MASK: number = 0x007f
    HAS_ZERO_MASK: number = 0x0080
    VALUE_NUM_SHIFT = 9
    IS_LAST_MASK: number = 0x0100

    /** Number of properties to skip before values */
    skipNum: number = 0
    bHasAnyZeroes = false
    /** Number of subsequent property values stored */
    valueNum: number = 0
    /** Is this the last fragment of the header? */
    bIsLast = false

    constructor(int: number) {
        this.skipNum = int & this.SKIP_NUM_MASK
        this.bHasAnyZeroes = (int & this.HAS_ZERO_MASK) !== 0
        this.valueNum = int >> this.VALUE_NUM_SHIFT
        this.bIsLast = (int & this.IS_LAST_MASK) !== 0
    }
}

export class FIterator {
    bDone: boolean
    header: FUnversionedHeader
    private schemas: FUnversionedPropertySerializer[]
    /*private*/ schemaIt = 0
    private fragmentIt = 0
    private zeroMaskIndex = 0
    private remainingFragmentValues = 0

    private get zeroMask() {
        return this.header.zeroMask
    }
    private get fragments() {
        return this.header.fragments
    }

    constructor(header: FUnversionedHeader, schemas: FUnversionedPropertySerializer[]) {
        this.header = header
        this.schemas = schemas
        this.bDone = !this.header.hasValues()
        if (!this.bDone)
            this.skip()
    }

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

    get serializer() {
        return this.schemas[this.schemaIt]
    }

    isNonZero() {
        return !this.fragments[this.fragmentIt].bHasAnyZeroes || !this.zeroMask.get(Math.floor(this.zeroMaskIndex))
    }

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