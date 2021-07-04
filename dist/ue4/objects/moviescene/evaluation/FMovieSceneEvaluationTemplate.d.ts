import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
/**
 * FMovieSceneEvaluationTemplate
 * @implements {IStructType}
 */
export declare class FMovieSceneEvaluationTemplate implements IStructType {
    /**
     * The internal value of the serial number
     * @type {number}
     * @public
     */
    value: number;
    /**
     * Creates an instance using UE4 Reader or number
     * @param {FArchive | number} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg: FArchive | number);
    /**
     * Turns this into a date
     * @returns {Date}
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
