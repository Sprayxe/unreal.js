/** Enumeration specifying how to evaluate a particular section when inside a segment */
import { FFrameNumber } from "../../core/misc/FFrameNumber";
import { TRange } from "../../core/math/TRange";
import { FStructFallback } from "../../../assets/objects/FStructFallback";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { FName } from "../../uobject/FName";
import { FAssetArchiveWriter } from "../../../assets/writer/FAssetArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

enum ESectionEvaluationFlags {
    /** No special flags - normal evaluation */
    None =         0x00,
    /** Segment resides inside the 'pre-roll' time for the section */
    PreRoll =      0x01,
    /** Segment resides inside the 'post-roll' time for the section */
    PostRoll =     0x02
}

/**
 * Evaluation data that specifies information about what to evaluate for a given template
 */
export class FSectionEvaluationData {
    /** The implementation index we should evaluate (index into FMovieSceneEvaluationTrack::ChildTemplates) */
    public ImplIndex: number

    /** A forced time to evaluate this section at */
    public ForcedTime: FFrameNumber

    /** Additional flags for evaluating this section */
    public Flags: ESectionEvaluationFlags

    constructor(implIndex: number, forcedTime: FFrameNumber, flags: ESectionEvaluationFlags) {
        this.ImplIndex = implIndex
        this.ForcedTime = forcedTime
        this.Flags = flags
    }
}

/**
 * Information about a single segment of an evaluation track
 */
export class FMovieSceneSegment implements IStructType {
    /** The segment's range */
    public range: TRange<FFrameNumber>
    public id: number
    /** Whether this segment has been generated yet or not */
    public allowEmpty: boolean
    /** Array of implementations that reside at the segment's range */
    public impls: FStructFallback[] // FSectionEvaluationData[]

    constructor(Ar: FAssetArchive)
    constructor(range: TRange<FFrameNumber>, id: number, allowEmpty: boolean, impls: FStructFallback[])
    constructor(...args) {
        const arg = args[0]
        if (arg instanceof FAssetArchive) {
            this.range = new TRange(arg, () => new FFrameNumber(arg))
            this.id = arg.readInt32()
            this.allowEmpty = arg.readBoolean()
            this.impls = arg.readArray(() => new FStructFallback(arg, FName.dummy("SectionEvaluationData")))
        } else {
            this.range = arg
            this.id = args[1]
            this.allowEmpty = args[2]
            this.impls = args[3]
        }
    }

    serialize(Ar: FAssetArchiveWriter) {
        this.range.serialize(Ar, (it) => it.serialize(Ar))
        Ar.writeInt32(this.id)
        Ar.writeBoolean(this.allowEmpty)
        Ar.writeTArray(this.impls, (it) => it.serialize(Ar))
    }

    toJson(): any {
        return {
            range: this.range.toJson(),
            id: this.id,
            bAllowEmpty: this.allowEmpty,
            impls: this.impls.map(i => i.toJson())
        }
    }
}
