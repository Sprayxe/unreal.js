/** Enumeration specifying how to evaluate a particular section when inside a segment */
import { FFrameNumber } from "../../core/misc/FFrameNumber";
import { TRange } from "../../core/math/TRange";
import { FStructFallback } from "../../../assets/objects/FStructFallback";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../../assets/writer/FAssetArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * ESectionEvaluationFlags
 * @enum
 */
declare enum ESectionEvaluationFlags {
    /** No special flags - normal evaluation */
    None = 0,
    /** Segment resides inside the 'pre-roll' time for the section */
    PreRoll = 1,
    /** Segment resides inside the 'post-roll' time for the section */
    PostRoll = 2
}
/**
 * Evaluation data that specifies information about what to evaluate for a given template
 */
export declare class FSectionEvaluationData {
    /**
     * The implementation index we should evaluate (index into FMovieSceneEvaluationTrack::ChildTemplates)
     * @type {number}
     * @public
     */
    ImplIndex: number;
    /**
     * A forced time to evaluate this section at
     * @type {FFrameNumber}
     * @public
     */
    ForcedTime: FFrameNumber;
    /**
     * Additional flags for evaluating this section
     * @type {ESectionEvaluationFlags}
     * @public
     */
    Flags: ESectionEvaluationFlags;
    /**
     * Creates an instance using values
     * @param {number} implIndex Impl index to use
     * @param {FFrameNumber} forcedTime Forced time to use
     * @param {ESectionEvaluationFlags} flags Flags to use
     * @constructor
     * @public
     */
    constructor(implIndex: number, forcedTime: FFrameNumber, flags: ESectionEvaluationFlags);
}
/**
 * Information about a single segment of an evaluation track
 * @implements {IStructType}
 */
export declare class FMovieSceneSegment implements IStructType {
    /**
     * The segment's range
     * @type {TRange<FFrameNumber>}
     * @public
     */
    range: TRange<FFrameNumber>;
    /**
     * id
     * @type {number}
     * @public
     */
    id: number;
    /**
     * Whether this segment has been generated yet or not
     * @type {boolean}
     * @public
     */
    allowEmpty: boolean;
    /**
     * Array of implementations that reside at the segment's range
     * @type {Array<FStructFallback>}
     * @public
     */
    impls: FStructFallback[];
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates an instance using values
     * @param {TRange<FFrameNumber>} range
     * @param {number} id
     * @param {boolean} allowEmpty
     * @param {Array<FStructFallback>} impls
     * @constructor
     * @public
     */
    constructor(range: TRange<FFrameNumber>, id: number, allowEmpty: boolean, impls: FStructFallback[]);
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
export {};
