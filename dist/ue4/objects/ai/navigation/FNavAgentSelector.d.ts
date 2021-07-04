import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * FNavAgentSelector
 * @implements {IStructType}
 */
export declare class FNavAgentSelector implements IStructType {
    /**
     * packedBits
     * @type {number}
     * @public
     */
    packedBits: number;
    /**
     * Creates an instance using UE4 Reader or number
     * @param {FArchive | number} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg: FArchive | number);
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
