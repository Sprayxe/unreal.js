/** Enumeration specifying how to evaluate a particular section when inside a segment */
import { FFrameNumber } from "../../core/misc/FFrameNumber";
import { TRange } from "../../core/math/TRange";
import { FStructFallback } from "../../../assets/objects/FStructFallback";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { FName } from "../../uobject/FName";
import { FAssetArchiveWriter } from "../../../assets/writer/FAssetArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

/**
 * ESectionEvaluationFlags
 * @enum
 */
enum ESectionEvaluationFlags {
    /** No special flags - normal evaluation */
    None = 0x00,
    /** Segment resides inside the 'pre-roll' time for the section */
    PreRoll = 0x01,
    /** Segment resides inside the 'post-roll' time for the section */
    PostRoll = 0x02
}

/**
 * Evaluation data that specifies information about what to evaluate for a given template
 */
export class FSectionEvaluationData {
    /**
     * The implementation index we should evaluate (index into FMovieSceneEvaluationTrack::ChildTemplates)
     * @type {number}
     * @public
     */
    public ImplIndex: number

    /**
     * A forced time to evaluate this section at
     * @type {FFrameNumber}
     * @public
     */
    public ForcedTime: FFrameNumber

    /**
     * Additional flags for evaluating this section
     * @type {ESectionEvaluationFlags}
     * @public
     */
    public Flags: ESectionEvaluationFlags

    /**
     * Creates an instance using values
     * @param {number} implIndex Impl index to use
     * @param {FFrameNumber} forcedTime Forced time to use
     * @param {ESectionEvaluationFlags} flags Flags to use
     * @constructor
     * @public
     */
    constructor(implIndex: number, forcedTime: FFrameNumber, flags: ESectionEvaluationFlags) {
        this.ImplIndex = implIndex
        this.ForcedTime = forcedTime
        this.Flags = flags
    }
}

/**
 * Information about a single segment of an evaluation track
 * @implements {IStructType}
 */
export class FMovieSceneSegment implements IStructType {
    /**
     * The segment's range
     * @type {TRange<FFrameNumber>}
     * @public
     */
    public range: TRange<FFrameNumber>

    /**
     * id
     * @type {number}
     * @public
     */
    public id: number

    /**
     * Whether this segment has been generated yet or not
     * @type {boolean}
     * @public
     */
    public allowEmpty: boolean

    /**
     * Array of implementations that reside at the segment's range
     * @type {Array<FStructFallback>}
     * @public
     */
    public impls: FStructFallback[] // FSectionEvaluationData[]

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive)

    /**
     * Creates an instance using values
     * @param {TRange<FFrameNumber>} range
     * @param {number} id
     * @param {boolean} allowEmpty
     * @param {Array<FStructFallback>} impls
     * @constructor
     * @public
     */
    constructor(range: TRange<FFrameNumber>, id: number, allowEmpty: boolean, impls: FStructFallback[])

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg = args[0]
        if (arg instanceof FAssetArchive) {
            this.range = new TRange(arg, () => new FFrameNumber(arg))
            this.id = arg.readInt32()
            this.allowEmpty = arg.readBoolean()
            const len = arg.readInt32()
            this.impls = new Array(len)
            for (let i = 0; i < len; ++i) {
                this.impls[i] = new FStructFallback(arg, FName.dummy("SectionEvaluationData"))
            }
        } else {
            this.range = arg
            this.id = args[1]
            this.allowEmpty = args[2]
            this.impls = args[3]
        }
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        this.range.serialize(Ar, (it) => it.serialize(Ar))
        Ar.writeInt32(this.id)
        Ar.writeBoolean(this.allowEmpty)
        Ar.writeTArray(this.impls, (it) => it.serialize(Ar))
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            range: this.range.toJson(),
            id: this.id,
            bAllowEmpty: this.allowEmpty,
            impls: this.impls.map(i => i.toJson())
        }
    }
}
