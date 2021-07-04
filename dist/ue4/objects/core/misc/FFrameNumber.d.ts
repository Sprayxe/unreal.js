import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
/**
 * FFrameNumber
 * @implements {IStructType}
 */
export declare class FFrameNumber implements IStructType {
    /**
     * Value
     * @type {number}
     * @public
     */
    value: number;
    /**
     * Creates an instance using an UE4 Reader or number
     * @param {FArchive | number} arg UE4 Reader or number to use
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
