import { PropertyInfo } from "../../assets/objects/PropertyInfo";
import { FProperty, ReadType } from "../../assets/objects/FProperty";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FPropertyTag } from "../../assets/objects/FPropertyTag";
import { FExportArchive } from "../../assets/reader/FExportArchive";
import { FName } from "./FName";
import { UStruct } from "../../assets/exports/UStruct";
import { UScriptStruct } from "../../assets/exports/UScriptStruct";
import BitSet from "bitset";
import { FArchive } from "../../reader/FArchive";
import { INDEX_NONE } from "../../../util/Const";
import { ParserException, UnknownPropertyException } from "../../../exceptions/Exceptions";
import { UnrealMap } from "../../../util/UnrealMap";
import { GDebugProperties, GExportArchiveCheckDummyName, GFatalUnknownProperty } from "../../../Globals";

export class FUnversionedPropertySerializer {
    info: PropertyInfo
    arrayIndex: number

    constructor(info: PropertyInfo, type: number) {
        this.info = info
        this.arrayIndex = type
    }

    deserialize(Ar: FAssetArchive, type: ReadType): FPropertyTag {
        if (GExportArchiveCheckDummyName && Ar instanceof FExportArchive) {
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
        const tag = new FPropertyTag(FName.dummy(this.info.name, 0))
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

    constructor(struct1: UStruct) {
        let index = 0
        let struct: UStruct = struct1
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
            this.bHasNonZeroValues = unmaskedNum > 0 || this.zeroMask.toArray().indexOf(Number(false)) !== INDEX_NONE
        } else {
            this.zeroMask = new BitSet(0)
            this.bHasNonZeroValues = unmaskedNum > 0
        }
    }

    hasValues() {
        return this.bHasNonZeroValues || (this.zeroMask.toArray().length)
    }

    protected loadZeroMaskData(Ar: FArchive, numBits: number) {
        return new BitSet(Ar.readBuffer(
            numBits <= 8 ? 1 :
            numBits <= 16 ? 2 :
            numBits / 32 * 4
        ))
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
    header: FUnversionedHeader
    private schemas: FUnversionedPropertySerializer[]
    /*private*/ schemaIt = 0
    private bDoneVar: boolean
    private fragmentItNum = 0
    private zeroMaskIndexNum = 0
    private remainingFragmentValuesNum = 0

    private get zeroMask() {
        return this.header.zeroMask
    }
    private get fragments() {
        return this.header.fragments
    }
    private get fragmentIt() {
        return this.fragmentItNum
    }
    get bDone() {
        return this.bDoneVar
    }
    private get zeroMaskIndex() {
        return this.zeroMaskIndexNum
    }
    private get remainingFragmentValues() {
        return this.remainingFragmentValuesNum
    }

    constructor(header: FUnversionedHeader, schemas: FUnversionedPropertySerializer[]) {
        this.header = header
        this.schemas = schemas
        this.bDoneVar = !this.header.hasValues()
        if (!this.bDone)
            this.skip()
    }

    next() {
        ++this.schemaIt
        --this.remainingFragmentValuesNum
        if (this.fragments[this.fragmentIt].bHasAnyZeroes) {
            ++this.zeroMaskIndexNum
        }

        if (this.remainingFragmentValues === 0) {
            if (this.fragments[this.fragmentIt].bIsLast) {
                this.bDoneVar = true
            } else {
                ++this.fragmentItNum
                this.skip()
            }
        }
    }

    get serializer() {
        return this.schemas[this.schemaIt]
    }

    isNonZero() {
        return (!this.fragments[this.fragmentIt].bHasAnyZeroes || !this.zeroMask[this.zeroMaskIndex])
    }

    private skip() {
        this.schemaIt += this.fragments[this.fragmentIt].skipNum

        while (this.fragments[this.fragmentIt].valueNum === 0) {
            if (this.fragments[this.fragmentIt].bIsLast)
                throw new Error("Cannot skip last fragment.")
            ++this.fragmentItNum
            this.schemaIt += this.fragments[this.fragmentIt].skipNum
        }

        this.remainingFragmentValuesNum = this.fragments[this.fragmentIt].valueNum
    }
}

export function deserializeUnversionedProperties(properties: FPropertyTag[], struct: UStruct, Ar: FAssetArchive) {
    if (GDebugProperties) console.info(`Load: ${struct.name}`)
    const header = new FUnversionedHeader()
    header.load(Ar)

    if (header.hasValues()) {
        const schemas = getOrCreateUnversionedSchema(struct).serializers
        if (header.bHasNonZeroValues) {
            const it = new FIterator(header, schemas)
            while (!it.bDone) {
                const serializer = it.serializer
                if (serializer) {
                    if (GDebugProperties) console.info(`Val: ${it.schemaIt} (IsNonZero: ${it.isNonZero()})`)
                    if (it.isNonZero()) {
                        const element = serializer.deserialize(Ar, ReadType.NORMAL)
                        properties.push(element)
                        if (GDebugProperties) console.info(element.toString())
                    } else {
                        const start = Ar.pos
                        properties.push(serializer.deserialize(Ar, ReadType.ZERO))
                        if (Ar.pos !== start)
                            throw ParserException(`Zero property #${it.schemaIt} should not advance the archive's position`)
                    }
                } else {
                    if (it.isNonZero()) {
                        if (GFatalUnknownProperty) {
                            console.warn(`Unknown property for ${struct.name} with index ${it.schemaIt}, cannot proceed with serialization. Serialized ${properties.length} until now.`)
                            return
                        } else {
                            throw UnknownPropertyException(`Unknown property for ${struct.name} with index ${it.schemaIt}, cannot proceed with serialization`)
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