"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMovieSceneEvaluationKey = void 0;
const FArchive_1 = require("../../../reader/FArchive");
/**
 * FMovieSceneEvaluationKey
 * @implements {IStructType}
 */
class FMovieSceneEvaluationKey {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        if (x instanceof FArchive_1.FArchive) {
            this.sequenceId = x.readUInt32();
            this.trackId = x.readInt32();
            this.sectionIndex = x.readUInt32();
        }
        else {
            this.sequenceId = x;
            this.trackId = y;
            this.sectionIndex = z;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeUInt32(this.sequenceId);
        Ar.writeInt32(this.trackId);
        Ar.writeUInt32(this.sectionIndex);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            sequenceId: this.sequenceId,
            trackId: this.trackId,
            sectionIndex: this.sectionIndex
        };
    }
}
exports.FMovieSceneEvaluationKey = FMovieSceneEvaluationKey;
