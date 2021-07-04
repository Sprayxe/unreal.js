import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

/**
 * FMovieSceneEvaluationKey
 * @implements {IStructType}
 */
export class FMovieSceneEvaluationKey implements IStructType {
    /**
     * sequenceId
     * @type {number}
     * @public
     */
    public sequenceId: number

    /**
     * trackId
     * @type {number}
     * @public
     */
    public trackId: number

    /**
     * sectionIndex
     * @type {number}
     * @public
     */
    public sectionIndex: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {number} sequenceId Sequence id to use
     * @param {number} trackId Track id to use
     * @param {number} sectionIndex Section index to use
     * @constructor
     * @public
     */
    constructor(sequenceId: number, trackId: number, sectionIndex: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any, z?: any) {
        if (x instanceof FArchive) {
            this.sequenceId = x.readUInt32()
            this.trackId = x.readInt32()
            this.sectionIndex = x.readUInt32()
        } else {
            this.sequenceId = x
            this.trackId = y
            this.sectionIndex = z
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.sequenceId)
        Ar.writeInt32(this.trackId)
        Ar.writeUInt32(this.sectionIndex)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            sequenceId: this.sequenceId,
            trackId: this.trackId,
            sectionIndex: this.sectionIndex
        }
    }
}