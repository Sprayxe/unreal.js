import { FArchive } from "../../reader/FArchive";

export const NAME_NO_NUMBER_INTERNAL = 0

export class FNameEntryId {
    value: number = 0

    constructor(value: number)
    constructor(Ar: FArchive)
    constructor(x?: any) {
        if (x instanceof FArchive) {
            this.value = x.readUInt8()
        } else {
            this.value = x
        }
    }
}