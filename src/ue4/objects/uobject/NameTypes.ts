import { FArchive } from "../../reader/FArchive";
import { FName } from "./FName";

export const NAME_NO_NUMBER_INTERNAL = 0

export class FNameEntryId {
    value: number = 0

    constructor(value: number)
    constructor(Ar: FArchive)
    constructor(x?: any) {
        this.value = x instanceof FArchive ? x.readUInt32() : x
    }
}

export class FMinimalName {
    /** Index into the Names array (used to find String portion of the string/number pair) */
    index: FNameEntryId
    /** Number portion of the string/number pair (stored internally as 1 more than actual, so zero'd memory will be the default, no-instance case) */
    num: number = NAME_NO_NUMBER_INTERNAL
    private nameMap: string[]

    constructor(index: FNameEntryId, num: number, nameMap: string[])
    constructor(Ar: FArchive, nameMap: string[])
    constructor(x?: any, y?: any, z?: any) {
        if (x instanceof FArchive) {
            this.index = new FNameEntryId(x)
            this.num = x.readInt32()
            this.nameMap = y
        } else {
            this.index = x
            this.num = y
            this.nameMap = z
        }
    }

    toName() {
        return FName.dummy(this.nameMap[this.index.value], this.num)
    }
}
