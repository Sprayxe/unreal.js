import { IStructType } from "../../assets/objects/UScriptStruct";
import { TRange } from "../core/math/TRange";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

/**
 * FMovieSceneFrameRange
 * @implements {IStructType}
 */
export class FMovieSceneFrameRange implements IStructType {
    /**
     * value
     * @type {TRange<number>}
     * @public
     */
    public value: TRange<number>

    /**
     * Creates an instance using UE4 Reader or TRange<number>
     * @param {FArchive | TRange<number>} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg: FArchive | TRange<number>) {
        this.value = arg instanceof FArchive
            ? new TRange(arg, () => arg.readInt32())
            : arg
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.value.serialize(Ar, (it) => Ar.writeInt32(it))
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return this.value.toJson()
    }
}