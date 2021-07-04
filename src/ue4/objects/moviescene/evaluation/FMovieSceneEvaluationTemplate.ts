import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

/**
 * FMovieSceneEvaluationTemplate
 * @implements {IStructType}
 */
export class FMovieSceneEvaluationTemplate implements IStructType {
    /**
     * The internal value of the serial number
     * @type {number}
     * @public
     */
    public value: number

    /**
     * Creates an instance using UE4 Reader or number
     * @param {FArchive | number} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg: FArchive | number) {
        this.value = arg instanceof FArchive ? arg.readUInt32() : arg
    }

    /**
     * Turns this into a date
     * @returns {Date}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.value)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return this.value
    }
}