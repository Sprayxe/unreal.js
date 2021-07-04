import { IStructType } from "../../assets/objects/UScriptStruct";
import { TRange } from "../core/math/TRange";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
/**
 * FMovieSceneFrameRange
 * @implements {IStructType}
 */
export declare class FMovieSceneFrameRange implements IStructType {
    /**
     * value
     * @type {TRange<number>}
     * @public
     */
    value: TRange<number>;
    /**
     * Creates an instance using UE4 Reader or TRange<number>
     * @param {FArchive | TRange<number>} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg: FArchive | TRange<number>);
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
