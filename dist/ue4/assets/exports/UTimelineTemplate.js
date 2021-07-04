"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTimelineTemplate = exports.FTTLinearColorTrack = exports.FTTVectorTrack = exports.FTTFloatTrack = exports.FTTPropertyTrack = exports.FTTEventTrack = exports.FTTTrackBase = void 0;
const UObject_1 = require("./UObject");
/**
 * FTTTrackBase
 */
class FTTTrackBase {
    constructor() {
        /**
         * TrackName
         * @type {FName}
         * @public
         */
        this.TrackName = null;
        /**
         * bIsExternalCurve
         * @type {boolean}
         * @public
         */
        this.bIsExternalCurve = null;
    }
}
exports.FTTTrackBase = FTTTrackBase;
/**
 * FTTEventTrack
 * @extends {FTTTrackBase}
 */
class FTTEventTrack extends FTTTrackBase {
    constructor() {
        super(...arguments);
        /**
         * FunctionName
         * @type {FName}
         * @public
         */
        this.FunctionName = null;
        /**
         * CurveKeys
         * @type {Array<UCurveFloat>}
         * @public
         */
        this.CurveKeys = null;
    }
}
exports.FTTEventTrack = FTTEventTrack;
/**
 * FTTPropertyTrack
 * @extends {FTTTrackBase}
 */
class FTTPropertyTrack extends FTTTrackBase {
    constructor() {
        super(...arguments);
        /**
         * PropertyName
         * @type {FName}
         * @public
         */
        this.PropertyName = null;
    }
}
exports.FTTPropertyTrack = FTTPropertyTrack;
/**
 * FTTFloatTrack
 * @extends {FTTPropertyTrack}
 */
class FTTFloatTrack extends FTTPropertyTrack {
    constructor() {
        super(...arguments);
        /**
         * CurveFloat
         * @type {UCurveFloat}
         * @public
         */
        this.CurveFloat = null;
    }
}
exports.FTTFloatTrack = FTTFloatTrack;
/**
 * FTTVectorTrack
 * @extends {FTTPropertyTrack}
 */
class FTTVectorTrack extends FTTPropertyTrack {
    constructor() {
        super(...arguments);
        /**
         * CurveVector
         * @type {FPackageIndex}
         * @public
         */
        this.CurveVector = null;
    }
}
exports.FTTVectorTrack = FTTVectorTrack;
/**
 * FTTLinearColorTrack
 * @extends {FTTPropertyTrack}
 */
class FTTLinearColorTrack extends FTTPropertyTrack {
    constructor() {
        super(...arguments);
        /**
         * CurveLinearColor
         * @type {FPackageIndex}
         * @public
         */
        this.CurveLinearColor = null;
    }
}
exports.FTTLinearColorTrack = FTTLinearColorTrack;
/**
 * UTimelineTemplate
 * @extends {UObject}
 */
class UTimelineTemplate extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * TimelineLength
         * @type {number}
         * @public
         */
        this.TimelineLength = null;
        /**
         * LengthMode
         * @type {ETimelineLengthMode}
         * @public
         */
        this.LengthMode = null;
        /**
         * bAutoPlay
         * @type {boolean}
         * @public
         */
        this.bAutoPlay = null;
        /**
         * bLoop
         * @type {boolean}
         * @public
         */
        this.bLoop = null;
        /**
         * bReplicated
         * @type {boolean}
         * @public
         */
        this.bReplicated = null;
        /**
         * bIgnoreTimeDilation
         * @type {boolean}
         * @public
         */
        this.bIgnoreTimeDilation = null;
        /**
         * EventTracks
         * @type {Array<FTTEventTrack>}
         * @public
         */
        this.EventTracks = null;
        /**
         * FloatTracks
         * @type {Array<FTTFloatTrack>}
         * @public
         */
        this.FloatTracks = null;
        /**
         * VectorTracks
         * @type {Array<FTTVectorTrack>}
         * @public
         */
        this.VectorTracks = null;
        /**
         * LinearColorTracks
         * @type {Array<FTTLinearColorTrack>}
         * @public
         */
        this.LinearColorTracks = null;
        /**
         * MetaDataArray
         * @type {Array<FBPVariableMetaDataEntry>}
         * @public
         */
        this.MetaDataArray = null;
        /**
         * TimelineGuid
         * @type {FGuid}
         * @public
         */
        this.TimelineGuid = null;
        /**
         * TimelineTickGroup
         * @type {ETickingGroup}
         * @public
         */
        this.TimelineTickGroup = null;
        /**
         * VariableName
         * @type {FName}
         * @public
         */
        this.VariableName = null;
        /**
         * DirectionPropertyName
         * @type {FName}
         * @public
         */
        this.DirectionPropertyName = null;
        /**
         * UpdateFunctionName
         * @type {FName}
         * @public
         */
        this.UpdateFunctionName = null;
        /**
         * FinishedFunctionName
         * @type {FName}
         * @public
         */
        this.FinishedFunctionName = null;
    }
}
exports.UTimelineTemplate = UTimelineTemplate;
