"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMovieSceneFrameRange = void 0;
const TRange_1 = require("../core/math/TRange");
const FArchive_1 = require("../../reader/FArchive");
/**
 * FMovieSceneFrameRange
 * @implements {IStructType}
 */
class FMovieSceneFrameRange {
    /**
     * Creates an instance using UE4 Reader or TRange<number>
     * @param {FArchive | TRange<number>} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg) {
        this.value = arg instanceof FArchive_1.FArchive
            ? new TRange_1.TRange(arg, () => arg.readInt32())
            : arg;
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.value.serialize(Ar, (it) => Ar.writeInt32(it));
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return this.value.toJson();
    }
}
exports.FMovieSceneFrameRange = FMovieSceneFrameRange;
