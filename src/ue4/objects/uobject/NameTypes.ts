import { FArchive } from "../../reader/FArchive";
import { FName, FNameDummy } from "./FName";

/**
 * NAME_NO_NUMBER_INTERNAL
 * @type {number}
 * @public
 */
export const NAME_NO_NUMBER_INTERNAL = 0

/**
 * FNameEntryId
 */
export class FNameEntryId {
    /**
     * value
     * @type {number}
     * @public
     */
    value: number = 0

    /**
     * Creates an instance using UE4 Reader or number
     * @param {number | FArchive} value Value to use
     * @constructor
     * @public
     */
    constructor(value: number | FArchive) {
        this.value = value instanceof FArchive
            ? value.readUInt32()
            : value
    }
}

/**
 * FMinimalName
 */
export class FMinimalName {
    /**
     * Index into the Names array (used to find String portion of the string/number pair)
     * @type {FNameEntryId}
     * @public
     */
    index: FNameEntryId

    /**
     * Number portion of the string/number pair (stored internally as 1 more than actual, so zero'd memory will be the default, no-instance case)
     * @type {number}
     * @public
     */
    num: number = NAME_NO_NUMBER_INTERNAL

    /**
     * Name map
     * @type {Array<string>}
     * @private
     */
    private nameMap: string[]

    /**
     * Creates an instance using values
     * @param {FNameEntryId} index Index to use
     * @param {number} num Num to use
     * @param {Array<string>} nameMap Name map to use
     * @constructor
     * @public
     */
    constructor(index: FNameEntryId, num: number, nameMap: string[])

    /**
     * Creates an instance using UE4 Reader and string array
     * @param {FArchive} Ar UE4 Reader to use
     * @param {Array<string>} nameMap Name map to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, nameMap: string[])

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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

    /**
     * Turns this into name
     * @returns {FNameDummy} FName instance
     * @public
     */
    toName(): FNameDummy {
        return FName.dummy(this.nameMap[this.index.value], this.num)
    }
}
