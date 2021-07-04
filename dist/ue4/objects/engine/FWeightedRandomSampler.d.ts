import { IStructType } from "../../assets/objects/UScriptStruct";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
/**
 * FWeightedRandomSampler
 * @implements {IStructType}
 */
export declare class FWeightedRandomSampler implements IStructType {
    /**
     * prob
     * @type {Array<number>}
     * @public
     */
    prob: number[];
    /**
     * alias
     * @type {Array<number>}
     * @public
     */
    alias: number[];
    /**
     * totalWeight
     * @type {number}
     * @public
     */
    totalWeight: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {Array<number>} prob Prob to use
     * @param {Array<number>} alias Alias to use
     * @param {number} totalWeight Total weight to use
     * @constructor
     * @public
     */
    constructor(prob: number[], alias: number[], totalWeight: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
