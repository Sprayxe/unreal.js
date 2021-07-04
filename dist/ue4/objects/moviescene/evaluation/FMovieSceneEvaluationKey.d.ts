import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * FMovieSceneEvaluationKey
 * @implements {IStructType}
 */
export declare class FMovieSceneEvaluationKey implements IStructType {
    /**
     * sequenceId
     * @type {number}
     * @public
     */
    sequenceId: number;
    /**
     * trackId
     * @type {number}
     * @public
     */
    trackId: number;
    /**
     * sectionIndex
     * @type {number}
     * @public
     */
    sectionIndex: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} sequenceId Sequence id to use
     * @param {number} trackId Track id to use
     * @param {number} sectionIndex Section index to use
     * @constructor
     * @public
     */
    constructor(sequenceId: number, trackId: number, sectionIndex: number);
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
