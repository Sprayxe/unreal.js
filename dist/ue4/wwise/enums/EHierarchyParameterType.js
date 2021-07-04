"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EHierarchyParameterType = void 0;
/**
 * EHierarchyParameterType
 * @enum
 */
var EHierarchyParameterType;
(function (EHierarchyParameterType) {
    EHierarchyParameterType[EHierarchyParameterType["VoiceVolume"] = 0] = "VoiceVolume";
    EHierarchyParameterType[EHierarchyParameterType["VoicePitch"] = 2] = "VoicePitch";
    EHierarchyParameterType[EHierarchyParameterType["VoiceLowPass"] = 3] = "VoiceLowPass";
    EHierarchyParameterType[EHierarchyParameterType["VoiceHighPass"] = 4] = "VoiceHighPass";
    EHierarchyParameterType[EHierarchyParameterType["BusVolume"] = 5] = "BusVolume";
    EHierarchyParameterType[EHierarchyParameterType["MakeUpGain"] = 6] = "MakeUpGain";
    EHierarchyParameterType[EHierarchyParameterType["PlaybackPriority"] = 7] = "PlaybackPriority";
    EHierarchyParameterType[EHierarchyParameterType["PlaybackPriorityOffset"] = 8] = "PlaybackPriorityOffset";
    EHierarchyParameterType[EHierarchyParameterType["MotionToVolumeOffset"] = 9] = "MotionToVolumeOffset";
    EHierarchyParameterType[EHierarchyParameterType["MotionLowPass"] = 1] = "MotionLowPass";
    EHierarchyParameterType[EHierarchyParameterType["PositioningPannerX"] = 12] = "PositioningPannerX";
    EHierarchyParameterType[EHierarchyParameterType["PositioningPannerY"] = 13] = "PositioningPannerY";
    EHierarchyParameterType[EHierarchyParameterType["PositioningCenterPercentage"] = 14] = "PositioningCenterPercentage";
    EHierarchyParameterType[EHierarchyParameterType["ActionDelay"] = 15] = "ActionDelay";
    EHierarchyParameterType[EHierarchyParameterType["ActionFadeInTime"] = 16] = "ActionFadeInTime";
    EHierarchyParameterType[EHierarchyParameterType["Probability"] = 17] = "Probability";
    EHierarchyParameterType[EHierarchyParameterType["OverrideAuxBus0Volume"] = 19] = "OverrideAuxBus0Volume";
    EHierarchyParameterType[EHierarchyParameterType["OverrideAuxBus1Volume"] = 20] = "OverrideAuxBus1Volume";
    EHierarchyParameterType[EHierarchyParameterType["OverrideAuxBus2Volume"] = 21] = "OverrideAuxBus2Volume";
    EHierarchyParameterType[EHierarchyParameterType["OverrideAuxBus3Volume"] = 22] = "OverrideAuxBus3Volume";
    EHierarchyParameterType[EHierarchyParameterType["GameDefinedAuxSendVolume"] = 23] = "GameDefinedAuxSendVolume";
    EHierarchyParameterType[EHierarchyParameterType["OverrideBusVolume"] = 24] = "OverrideBusVolume";
    EHierarchyParameterType[EHierarchyParameterType["OverrideBusHighPassFilter"] = 25] = "OverrideBusHighPassFilter";
    EHierarchyParameterType[EHierarchyParameterType["OverrideBusLowPassFilter"] = 26] = "OverrideBusLowPassFilter";
    EHierarchyParameterType[EHierarchyParameterType["HdrThreshold"] = 27] = "HdrThreshold";
    EHierarchyParameterType[EHierarchyParameterType["HdrRatio"] = 28] = "HdrRatio";
    EHierarchyParameterType[EHierarchyParameterType["HdrReleaseTime"] = 29] = "HdrReleaseTime";
    EHierarchyParameterType[EHierarchyParameterType["HdrOutputGameParam"] = 30] = "HdrOutputGameParam";
    EHierarchyParameterType[EHierarchyParameterType["HdrOutputGameParamMin"] = 31] = "HdrOutputGameParamMin";
    EHierarchyParameterType[EHierarchyParameterType["HdrOutputGameParamMax"] = 32] = "HdrOutputGameParamMax";
    EHierarchyParameterType[EHierarchyParameterType["HdrEnvelopeActiveRange"] = 33] = "HdrEnvelopeActiveRange";
    EHierarchyParameterType[EHierarchyParameterType["MidiNoteTrackingUnknown"] = 46] = "MidiNoteTrackingUnknown";
    EHierarchyParameterType[EHierarchyParameterType["MidiTranspositionInt"] = 47] = "MidiTranspositionInt";
    EHierarchyParameterType[EHierarchyParameterType["MidiVelocityOffsetInt"] = 48] = "MidiVelocityOffsetInt";
    EHierarchyParameterType[EHierarchyParameterType["MidiFiltersKeyRangeMin"] = 49] = "MidiFiltersKeyRangeMin";
    EHierarchyParameterType[EHierarchyParameterType["MidiFiltersKeyRangeMax"] = 50] = "MidiFiltersKeyRangeMax";
    EHierarchyParameterType[EHierarchyParameterType["MidiFiltersVelocityRangeMin"] = 51] = "MidiFiltersVelocityRangeMin";
    EHierarchyParameterType[EHierarchyParameterType["MidiFiltersVelocityRangeMax"] = 52] = "MidiFiltersVelocityRangeMax";
    EHierarchyParameterType[EHierarchyParameterType["PlaybackSpeed"] = 54] = "PlaybackSpeed";
    EHierarchyParameterType[EHierarchyParameterType["MidiClipTempoSourceIsFile"] = 55] = "MidiClipTempoSourceIsFile";
    EHierarchyParameterType[EHierarchyParameterType["LoopTimeUInt"] = 58] = "LoopTimeUInt";
    EHierarchyParameterType[EHierarchyParameterType["InitialDelay"] = 59] = "InitialDelay";
})(EHierarchyParameterType = exports.EHierarchyParameterType || (exports.EHierarchyParameterType = {}));
