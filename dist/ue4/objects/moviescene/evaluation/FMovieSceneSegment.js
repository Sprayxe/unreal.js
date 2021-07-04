"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMovieSceneSegment = exports.FSectionEvaluationData = void 0;
/** Enumeration specifying how to evaluate a particular section when inside a segment */
const FFrameNumber_1 = require("../../core/misc/FFrameNumber");
const TRange_1 = require("../../core/math/TRange");
const FStructFallback_1 = require("../../../assets/objects/FStructFallback");
const FAssetArchive_1 = require("../../../assets/reader/FAssetArchive");
const FName_1 = require("../../uobject/FName");
/**
 * ESectionEvaluationFlags
 * @enum
 */
var ESectionEvaluationFlags;
(function (ESectionEvaluationFlags) {
    /** No special flags - normal evaluation */
    ESectionEvaluationFlags[ESectionEvaluationFlags["None"] = 0] = "None";
    /** Segment resides inside the 'pre-roll' time for the section */
    ESectionEvaluationFlags[ESectionEvaluationFlags["PreRoll"] = 1] = "PreRoll";
    /** Segment resides inside the 'post-roll' time for the section */
    ESectionEvaluationFlags[ESectionEvaluationFlags["PostRoll"] = 2] = "PostRoll";
})(ESectionEvaluationFlags || (ESectionEvaluationFlags = {}));
/**
 * Evaluation data that specifies information about what to evaluate for a given template
 */
class FSectionEvaluationData {
    /**
     * Creates an instance using values
     * @param {number} implIndex Impl index to use
     * @param {FFrameNumber} forcedTime Forced time to use
     * @param {ESectionEvaluationFlags} flags Flags to use
     * @constructor
     * @public
     */
    constructor(implIndex, forcedTime, flags) {
        this.ImplIndex = implIndex;
        this.ForcedTime = forcedTime;
        this.Flags = flags;
    }
}
exports.FSectionEvaluationData = FSectionEvaluationData;
/**
 * Information about a single segment of an evaluation track
 * @implements {IStructType}
 */
class FMovieSceneSegment {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg = args[0];
        if (arg instanceof FAssetArchive_1.FAssetArchive) {
            this.range = new TRange_1.TRange(arg, () => new FFrameNumber_1.FFrameNumber(arg));
            this.id = arg.readInt32();
            this.allowEmpty = arg.readBoolean();
            this.impls = arg.readArray(() => new FStructFallback_1.FStructFallback(arg, FName_1.FName.dummy("SectionEvaluationData")));
        }
        else {
            this.range = arg;
            this.id = args[1];
            this.allowEmpty = args[2];
            this.impls = args[3];
        }
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.range.serialize(Ar, (it) => it.serialize(Ar));
        Ar.writeInt32(this.id);
        Ar.writeBoolean(this.allowEmpty);
        Ar.writeTArray(this.impls, (it) => it.serialize(Ar));
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            range: this.range.toJson(),
            id: this.id,
            bAllowEmpty: this.allowEmpty,
            impls: this.impls.map(i => i.toJson())
        };
    }
}
exports.FMovieSceneSegment = FMovieSceneSegment;
