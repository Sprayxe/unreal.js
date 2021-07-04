import { FArchive } from "../../reader/FArchive";
import { FNameDummy } from "./FName";
/**
 * NAME_NO_NUMBER_INTERNAL
 * @type {number}
 * @public
 */
export declare const NAME_NO_NUMBER_INTERNAL = 0;
/**
 * FNameEntryId
 */
export declare class FNameEntryId {
    /**
     * value
     * @type {number}
     * @public
     */
    value: number;
    /**
     * Creates an instance using UE4 Reader or number
     * @param {number | FArchive} value Value to use
     * @constructor
     * @public
     */
    constructor(value: number | FArchive);
}
/**
 * FMinimalName
 */
export declare class FMinimalName {
    /**
     * Index into the Names array (used to find String portion of the string/number pair)
     * @type {FNameEntryId}
     * @public
     */
    index: FNameEntryId;
    /**
     * Number portion of the string/number pair (stored internally as 1 more than actual, so zero'd memory will be the default, no-instance case)
     * @type {number}
     * @public
     */
    num: number;
    /**
     * Name map
     * @type {Array<string>}
     * @private
     */
    private nameMap;
    /**
     * Creates an instance using values
     * @param {FNameEntryId} index Index to use
     * @param {number} num Num to use
     * @param {Array<string>} nameMap Name map to use
     * @constructor
     * @public
     */
    constructor(index: FNameEntryId, num: number, nameMap: string[]);
    /**
     * Creates an instance using UE4 Reader and string array
     * @param {FArchive} Ar UE4 Reader to use
     * @param {Array<string>} nameMap Name map to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, nameMap: string[]);
    /**
     * Turns this into name
     * @returns {FNameDummy} FName instance
     * @public
     */
    toName(): FNameDummy;
}
