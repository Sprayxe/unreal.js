import { UObject } from "./UObject";
import { FGuid } from "../../objects/core/misc/Guid";
import { FName } from "../../objects/uobject/FName";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { ETimelineLengthMode } from "../enums/ETimelineLengthMode";
import { ETickingGroup } from "../enums/ETickingGroup";
import { UCurveFloat } from "../../objects/engine/curves/UCurveFloat";
import { FBPVariableMetaDataEntry } from "../objects/FBPVariableMetaDataEntry";

export class UTimelineTemplate extends UObject {
    public TimelineLength: number = null
    public LengthMode: ETimelineLengthMode = null
    public bAutoPlay: boolean = null
    public bLoop: boolean = null
    public bReplicated: boolean = null
    public bIgnoreTimeDilation: boolean = null
    public EventTracks: FTTEventTrack[] = null
    public FloatTracks: FTTFloatTrack[] = null
    public VectorTracks: FTTVectorTrack[] = null
    public LinearColorTracks: FTTLinearColorTrack[] = null
    public MetaDataArray: FBPVariableMetaDataEntry[] = null
    public TimelineGuid: FGuid = null
    public TimelineTickGroup: ETickingGroup = null
    public VariableName: FName = null
    public DirectionPropertyName: FName = null
    public UpdateFunctionName: FName = null
    public FinishedFunctionName: FName = null
}

export class FTTTrackBase {
    public TrackName: FName = null
    public bIsExternalCurve: boolean = null
}

export class FTTEventTrack extends FTTTrackBase {
    public FunctionName: FName = null
    public CurveKeys: UCurveFloat[] = null
}

export class FTTPropertyTrack extends FTTTrackBase {
    public PropertyName: FName = null
}

export class FTTFloatTrack extends FTTPropertyTrack {
    public CurveFloat: UCurveFloat = null
}

export class FTTVectorTrack extends FTTPropertyTrack {
    public CurveVector: FPackageIndex = null
}

export class FTTLinearColorTrack extends FTTPropertyTrack {
    public CurveLinearColor: FPackageIndex = null
}