import { UObject } from "./UObject";
import { FGuid } from "../../objects/core/misc/Guid";
import { FName } from "../../objects/uobject/FName";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { ETimelineLengthMode } from "../enums/ETimelineLengthMode";
import { ETickingGroup } from "../enums/ETickingGroup";
import { UCurveFloat } from "../../objects/engine/curves/UCurveFloat";
import { FBPVariableMetaDataEntry } from "../objects/FBPVariableMetaDataEntry";

/**
 * FTTTrackBase
 */
export class FTTTrackBase {
    /**
     * TrackName
     * @type {FName}
     * @public
     */
    public TrackName: FName = null

    /**
     * bIsExternalCurve
     * @type {boolean}
     * @public
     */
    public bIsExternalCurve: boolean = null
}

/**
 * FTTEventTrack
 * @extends {FTTTrackBase}
 */
export class FTTEventTrack extends FTTTrackBase {
    /**
     * FunctionName
     * @type {FName}
     * @public
     */
    public FunctionName: FName = null

    /**
     * CurveKeys
     * @type {Array<UCurveFloat>}
     * @public
     */
    public CurveKeys: UCurveFloat[] = null
}

/**
 * FTTPropertyTrack
 * @extends {FTTTrackBase}
 */
export class FTTPropertyTrack extends FTTTrackBase {
    /**
     * PropertyName
     * @type {FName}
     * @public
     */
    public PropertyName: FName = null
}

/**
 * FTTFloatTrack
 * @extends {FTTPropertyTrack}
 */
export class FTTFloatTrack extends FTTPropertyTrack {
    /**
     * CurveFloat
     * @type {UCurveFloat}
     * @public
     */
    public CurveFloat: UCurveFloat = null
}

/**
 * FTTVectorTrack
 * @extends {FTTPropertyTrack}
 */
export class FTTVectorTrack extends FTTPropertyTrack {
    /**
     * CurveVector
     * @type {FPackageIndex}
     * @public
     */
    public CurveVector: FPackageIndex = null
}

/**
 * FTTLinearColorTrack
 * @extends {FTTPropertyTrack}
 */
export class FTTLinearColorTrack extends FTTPropertyTrack {
    /**
     * CurveLinearColor
     * @type {FPackageIndex}
     * @public
     */
    public CurveLinearColor: FPackageIndex = null
}

/**
 * UTimelineTemplate
 * @extends {UObject}
 */
export class UTimelineTemplate extends UObject {
    /**
     * TimelineLength
     * @type {number}
     * @public
     */
    public TimelineLength: number = null

    /**
     * LengthMode
     * @type {ETimelineLengthMode}
     * @public
     */
    public LengthMode: ETimelineLengthMode = null

    /**
     * bAutoPlay
     * @type {boolean}
     * @public
     */
    public bAutoPlay: boolean = null

    /**
     * bLoop
     * @type {boolean}
     * @public
     */
    public bLoop: boolean = null

    /**
     * bReplicated
     * @type {boolean}
     * @public
     */
    public bReplicated: boolean = null

    /**
     * bIgnoreTimeDilation
     * @type {boolean}
     * @public
     */
    public bIgnoreTimeDilation: boolean = null

    /**
     * EventTracks
     * @type {Array<FTTEventTrack>}
     * @public
     */
    public EventTracks: FTTEventTrack[] = null

    /**
     * FloatTracks
     * @type {Array<FTTFloatTrack>}
     * @public
     */
    public FloatTracks: FTTFloatTrack[] = null

    /**
     * VectorTracks
     * @type {Array<FTTVectorTrack>}
     * @public
     */
    public VectorTracks: FTTVectorTrack[] = null

    /**
     * LinearColorTracks
     * @type {Array<FTTLinearColorTrack>}
     * @public
     */
    public LinearColorTracks: FTTLinearColorTrack[] = null

    /**
     * MetaDataArray
     * @type {Array<FBPVariableMetaDataEntry>}
     * @public
     */
    public MetaDataArray: FBPVariableMetaDataEntry[] = null

    /**
     * TimelineGuid
     * @type {FGuid}
     * @public
     */
    public TimelineGuid: FGuid = null

    /**
     * TimelineTickGroup
     * @type {ETickingGroup}
     * @public
     */
    public TimelineTickGroup: ETickingGroup = null

    /**
     * VariableName
     * @type {FName}
     * @public
     */
    public VariableName: FName = null

    /**
     * DirectionPropertyName
     * @type {FName}
     * @public
     */
    public DirectionPropertyName: FName = null

    /**
     * UpdateFunctionName
     * @type {FName}
     * @public
     */
    public UpdateFunctionName: FName = null

    /**
     * FinishedFunctionName
     * @type {FName}
     * @public
     */
    public FinishedFunctionName: FName = null
}