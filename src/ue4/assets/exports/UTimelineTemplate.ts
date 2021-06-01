import { UObject } from "./UObject";
import { FGuid } from "../../objects/core/misc/Guid";
import { FName } from "../../objects/uobject/FName";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { ETimelineLengthMode } from "../enums/ETimelineLengthMode";
import { ETickingGroup } from "../enums/ETickingGroup";
import { UCurveFloat } from "../../objects/engine/curves/UCurveFloat";
import { FBPVariableMetaDataEntry } from "../objects/FBPVariableMetaDataEntry";

export class UTimelineTemplate extends UObject {
    public TimelineLength: number;
    public LengthMode: ETimelineLengthMode
    public bAutoPlay: boolean
    public bLoop: boolean
    public bReplicated: boolean
    public bIgnoreTimeDilation: boolean
    public EventTracks: FTTEventTrack[]
    public FloatTracks: FTTFloatTrack[]
    public VectorTracks: FTTVectorTrack[]
    public LinearColorTracks: FTTLinearColorTrack[]
    public MetaDataArray: FBPVariableMetaDataEntry[]
    public TimelineGuid: FGuid
    public TimelineTickGroup: ETickingGroup
    public VariableName: FName
    public DirectionPropertyName: FName
    public UpdateFunctionName: FName
    public FinishedFunctionName: FName
}

export class FTTTrackBase {
    public TrackName: FName
    public bIsExternalCurve: boolean
}

export class FTTEventTrack extends FTTTrackBase {
    public FunctionName: FName
    public CurveKeys: UCurveFloat[]
}

export class FTTPropertyTrack extends FTTTrackBase {
    public PropertyName: FName
}

export class FTTFloatTrack extends FTTPropertyTrack {
    public CurveFloat: UCurveFloat
}

export class FTTVectorTrack extends FTTPropertyTrack {
    public CurveVector: FPackageIndex
}

export class FTTLinearColorTrack extends FTTPropertyTrack {
    public CurveLinearColor: FPackageIndex
}