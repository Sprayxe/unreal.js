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
export declare class FTTTrackBase {
    /**
     * TrackName
     * @type {FName}
     * @public
     */
    TrackName: FName;
    /**
     * bIsExternalCurve
     * @type {boolean}
     * @public
     */
    bIsExternalCurve: boolean;
}
/**
 * FTTEventTrack
 * @extends {FTTTrackBase}
 */
export declare class FTTEventTrack extends FTTTrackBase {
    /**
     * FunctionName
     * @type {FName}
     * @public
     */
    FunctionName: FName;
    /**
     * CurveKeys
     * @type {Array<UCurveFloat>}
     * @public
     */
    CurveKeys: UCurveFloat[];
}
/**
 * FTTPropertyTrack
 * @extends {FTTTrackBase}
 */
export declare class FTTPropertyTrack extends FTTTrackBase {
    /**
     * PropertyName
     * @type {FName}
     * @public
     */
    PropertyName: FName;
}
/**
 * FTTFloatTrack
 * @extends {FTTPropertyTrack}
 */
export declare class FTTFloatTrack extends FTTPropertyTrack {
    /**
     * CurveFloat
     * @type {UCurveFloat}
     * @public
     */
    CurveFloat: UCurveFloat;
}
/**
 * FTTVectorTrack
 * @extends {FTTPropertyTrack}
 */
export declare class FTTVectorTrack extends FTTPropertyTrack {
    /**
     * CurveVector
     * @type {FPackageIndex}
     * @public
     */
    CurveVector: FPackageIndex;
}
/**
 * FTTLinearColorTrack
 * @extends {FTTPropertyTrack}
 */
export declare class FTTLinearColorTrack extends FTTPropertyTrack {
    /**
     * CurveLinearColor
     * @type {FPackageIndex}
     * @public
     */
    CurveLinearColor: FPackageIndex;
}
/**
 * UTimelineTemplate
 * @extends {UObject}
 */
export declare class UTimelineTemplate extends UObject {
    /**
     * TimelineLength
     * @type {number}
     * @public
     */
    TimelineLength: number;
    /**
     * LengthMode
     * @type {ETimelineLengthMode}
     * @public
     */
    LengthMode: ETimelineLengthMode;
    /**
     * bAutoPlay
     * @type {boolean}
     * @public
     */
    bAutoPlay: boolean;
    /**
     * bLoop
     * @type {boolean}
     * @public
     */
    bLoop: boolean;
    /**
     * bReplicated
     * @type {boolean}
     * @public
     */
    bReplicated: boolean;
    /**
     * bIgnoreTimeDilation
     * @type {boolean}
     * @public
     */
    bIgnoreTimeDilation: boolean;
    /**
     * EventTracks
     * @type {Array<FTTEventTrack>}
     * @public
     */
    EventTracks: FTTEventTrack[];
    /**
     * FloatTracks
     * @type {Array<FTTFloatTrack>}
     * @public
     */
    FloatTracks: FTTFloatTrack[];
    /**
     * VectorTracks
     * @type {Array<FTTVectorTrack>}
     * @public
     */
    VectorTracks: FTTVectorTrack[];
    /**
     * LinearColorTracks
     * @type {Array<FTTLinearColorTrack>}
     * @public
     */
    LinearColorTracks: FTTLinearColorTrack[];
    /**
     * MetaDataArray
     * @type {Array<FBPVariableMetaDataEntry>}
     * @public
     */
    MetaDataArray: FBPVariableMetaDataEntry[];
    /**
     * TimelineGuid
     * @type {FGuid}
     * @public
     */
    TimelineGuid: FGuid;
    /**
     * TimelineTickGroup
     * @type {ETickingGroup}
     * @public
     */
    TimelineTickGroup: ETickingGroup;
    /**
     * VariableName
     * @type {FName}
     * @public
     */
    VariableName: FName;
    /**
     * DirectionPropertyName
     * @type {FName}
     * @public
     */
    DirectionPropertyName: FName;
    /**
     * UpdateFunctionName
     * @type {FName}
     * @public
     */
    UpdateFunctionName: FName;
    /**
     * FinishedFunctionName
     * @type {FName}
     * @public
     */
    FinishedFunctionName: FName;
}
