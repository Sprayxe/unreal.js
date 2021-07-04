"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USoundWave = void 0;
const USoundBase_1 = require("./USoundBase");
const Text_1 = require("../../objects/core/i18n/Text");
const FAssetArchive_1 = require("../reader/FAssetArchive");
const FByteBulkData_1 = require("../objects/FByteBulkData");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const UnrealArray_1 = require("../../../util/UnrealArray");
const ObjectResource_1 = require("../../objects/uobject/ObjectResource");
const ESoundWaveLoadingBehavior_1 = require("../enums/ESoundWaveLoadingBehavior");
const Guid_1 = require("../../objects/core/misc/Guid");
const FFormatContainer_1 = require("../../objects/uobject/serialization/FFormatContainer");
const UProperty_1 = require("../../../util/decorators/UProperty");
/**
 * Represents an UE4 Sound Wave
 * @extends {USoundBase}
 */
class USoundWave extends USoundBase_1.USoundBase {
    constructor() {
        super(...arguments);
        /**
         * Compression quality
         * @type {number}
         * @public
         */
        this.CompressionQuality = 0;
        /**
         * Streaming priority
         * @type {number}
         * @public
         */
        this.StreamingPriority = 0;
        /**
         * Sample rate quality
         * @type {ESoundwaveSampleRateSettings}
         * @public
         */
        this.SampleRateQuality = null;
        /**
         * Sound group
         * @type {ESoundGroup}
         * @public
         */
        this.SoundGroup = null;
        /**
         * Whether looped
         * @type {boolean}
         * @public
         */
        this.bLooping = false;
        /**
         * Whether streamed
         * @type {boolean}
         * @public
         */
        this.bStreaming = false;
        /**
         * Whether seekable stream
         * @type {boolean}
         * @public
         */
        this.bSeekableStreaming = false;
        /**
         * Loading behavior
         * @type {ESoundWaveLoadingBehavior}
         * @public
         */
        this.LoadingBehavior = null;
        /**
         * Whether mature
         * @type {boolean}
         * @public
         */
        this.bMature = false;
        /**
         * Whether manual word wrap
         * @type {boolean}
         * @public
         */
        this.bManualWordWrap = false;
        /**
         * Whether single line
         * @type {boolean}
         * @public
         */
        this.bSingleLine = false;
        /**
         * Whether ambisonics
         * @type {boolean}
         * @public
         */
        this.bIsAmbisonics = false;
        /**
         * Frequencies to analyze
         * @type {Array<number>}
         * @public
         */
        this.FrequenciesToAnalyze = null;
        /**
         * Cooked spectral time data
         * @type {Array<FSoundWaveSpectralTimeData>}
         * @public
         */
        this.CookedSpectralTimeData = null;
        /**
         * Cooked envelope time data
         * @type {Array<FSoundWaveEnvelopeTimeData>}
         * @public
         */
        this.CookedEnvelopeTimeData = null;
        /**
         * Initial chunk size
         * @type {number}
         * @public
         */
        this.InitialChunkSize = 0;
        /**
         * Spoken text
         * @type {string}
         * @public
         */
        this.SpokenText = null;
        /**
         * Subtitle priority
         * @type {number}
         * @public
         */
        this.SubtitlePriority = 0.0;
        /**
         * Volume
         * @type {number}
         * @public
         */
        this.Volume = 0.0;
        /**
         * Pitch
         * @type {number}
         * @public
         */
        this.Pitch = 0.0;
        /**
         * Amount of channels
         * @type {number}
         * @public
         */
        this.NumChannels = 0;
        /**
         * Sample rate
         * @type {number}
         * @public
         */
        this.SampleRate = 0;
        /**
         * Subtitles
         * @type {Array<FSubtitleCue>}
         * @public
         */
        this.Subtitles = null;
        /**
         * Curves
         * @type {FPackageIndex}
         * @public
         */
        this.Curves = null;
        /**
         * Internal curves
         * @type {FPackageIndex}
         * @public
         */
        this.InternalCurves = null;
        /**
         * Whether cooked
         * @type {boolean}
         * @public
         */
        this.bCooked = false;
        /**
         * Uncompressed wav data 16 bit in mono or stereo - stereo not allowed for multichannel data
         * @type {FByteBulkData}
         * @public
         */
        this.rawData = null;
        /**
         * GUID used to uniquely identify this node so it can be found in the DDC
         * @type {FGuid}
         * @public
         */
        this.compressedDataGuid = new Guid_1.FGuid();
        /**
         * Compressed format data
         * @type {FFormatContainer}
         * @public
         */
        this.compressedFormatData = null;
        /**
         * The streaming derived data for this sound on this platform
         * @type {FStreamedAudioPlatformData}
         * @public
         */
        this.runningPlatformData = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar, validPos) {
        super.deserialize(Ar, validPos);
        this.bCooked = Ar.readBoolean();
        const bShouldStreamSound = this.isStreaming;
        if (this.bCooked) {
            if (!bShouldStreamSound)
                this.compressedFormatData = new FFormatContainer_1.FFormatContainer(Ar);
        }
        else {
            this.rawData = new FByteBulkData_1.FByteBulkData(Ar);
        }
        this.compressedDataGuid = new Guid_1.FGuid(Ar);
        if (bShouldStreamSound) {
            if (this.bCooked)
                this.runningPlatformData = new FStreamedAudioPlatformData(Ar);
        }
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        super.serialize(Ar);
        Ar.writeBoolean(this.bCooked);
        const bShouldStreamSound = this.isStreaming;
        if (this.bCooked) {
            if (!bShouldStreamSound)
                this.compressedFormatData?.serialize(Ar);
        }
        else {
            this.rawData?.serialize(Ar);
        }
        this.compressedDataGuid.serialize(Ar);
        if (bShouldStreamSound) {
            if (this.bCooked) {
                this.runningPlatformData?.serialize(Ar);
            }
        }
    }
    /**
     * Whether is streaming
     * @type {boolean}
     * @public
     */
    get isStreaming() {
        return this.bStreaming || this.LoadingBehavior !== ESoundWaveLoadingBehavior_1.ESoundWaveLoadingBehavior.ForceInline;
    }
}
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "CompressionQuality", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "StreamingPriority", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Number)
], USoundWave.prototype, "SampleRateQuality", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Number)
], USoundWave.prototype, "SoundGroup", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "bLooping", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "bStreaming", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "bSeekableStreaming", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Number)
], USoundWave.prototype, "LoadingBehavior", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "bMature", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "bManualWordWrap", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "bSingleLine", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "bIsAmbisonics", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Array)
], USoundWave.prototype, "FrequenciesToAnalyze", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Array)
], USoundWave.prototype, "CookedSpectralTimeData", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Array)
], USoundWave.prototype, "CookedEnvelopeTimeData", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "InitialChunkSize", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", String)
], USoundWave.prototype, "SpokenText", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "SubtitlePriority", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "Volume", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "Pitch", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "NumChannels", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], USoundWave.prototype, "SampleRate", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Array)
], USoundWave.prototype, "Subtitles", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", ObjectResource_1.FPackageIndex /*UCurveTable*/)
], USoundWave.prototype, "Curves", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", ObjectResource_1.FPackageIndex /*UCurveTable*/)
], USoundWave.prototype, "InternalCurves", void 0);
exports.USoundWave = USoundWave;
/**
 * ESoundwaveSampleRateSettings
 * @enum
 */
var ESoundwaveSampleRateSettings;
(function (ESoundwaveSampleRateSettings) {
    ESoundwaveSampleRateSettings[ESoundwaveSampleRateSettings["Max"] = 0] = "Max";
    ESoundwaveSampleRateSettings[ESoundwaveSampleRateSettings["High"] = 1] = "High";
    ESoundwaveSampleRateSettings[ESoundwaveSampleRateSettings["Medium"] = 2] = "Medium";
    ESoundwaveSampleRateSettings[ESoundwaveSampleRateSettings["Low"] = 3] = "Low";
    ESoundwaveSampleRateSettings[ESoundwaveSampleRateSettings["Min"] = 4] = "Min";
    ESoundwaveSampleRateSettings[ESoundwaveSampleRateSettings["MatchDevice"] = 5] = "MatchDevice";
})(ESoundwaveSampleRateSettings || (ESoundwaveSampleRateSettings = {}));
/**
 * ESoundGroup
 * @enum
 */
var ESoundGroup;
(function (ESoundGroup) {
    ESoundGroup[ESoundGroup["SOUNDGROUP_Default"] = 0] = "SOUNDGROUP_Default";
    ESoundGroup[ESoundGroup["SOUNDGROUP_Effects"] = 1] = "SOUNDGROUP_Effects";
    ESoundGroup[ESoundGroup["SOUNDGROUP_UI"] = 2] = "SOUNDGROUP_UI";
    ESoundGroup[ESoundGroup["SOUNDGROUP_Music"] = 3] = "SOUNDGROUP_Music";
    ESoundGroup[ESoundGroup["SOUNDGROUP_Voice"] = 4] = "SOUNDGROUP_Voice";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup1"] = 5] = "SOUNDGROUP_GameSoundGroup1";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup2"] = 6] = "SOUNDGROUP_GameSoundGroup2";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup3"] = 7] = "SOUNDGROUP_GameSoundGroup3";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup4"] = 8] = "SOUNDGROUP_GameSoundGroup4";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup5"] = 9] = "SOUNDGROUP_GameSoundGroup5";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup6"] = 10] = "SOUNDGROUP_GameSoundGroup6";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup7"] = 11] = "SOUNDGROUP_GameSoundGroup7";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup8"] = 12] = "SOUNDGROUP_GameSoundGroup8";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup9"] = 13] = "SOUNDGROUP_GameSoundGroup9";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup10"] = 14] = "SOUNDGROUP_GameSoundGroup10";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup11"] = 15] = "SOUNDGROUP_GameSoundGroup11";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup12"] = 16] = "SOUNDGROUP_GameSoundGroup12";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup13"] = 17] = "SOUNDGROUP_GameSoundGroup13";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup14"] = 18] = "SOUNDGROUP_GameSoundGroup14";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup15"] = 19] = "SOUNDGROUP_GameSoundGroup15";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup16"] = 20] = "SOUNDGROUP_GameSoundGroup16";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup17"] = 21] = "SOUNDGROUP_GameSoundGroup17";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup18"] = 22] = "SOUNDGROUP_GameSoundGroup18";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup19"] = 23] = "SOUNDGROUP_GameSoundGroup19";
    ESoundGroup[ESoundGroup["SOUNDGROUP_GameSoundGroup20"] = 24] = "SOUNDGROUP_GameSoundGroup20";
})(ESoundGroup || (ESoundGroup = {}));
/**
 * FSoundWaveSpectralTimeData
 */
class FSoundWaveSpectralTimeData {
    constructor() {
        /**
         * Data
         * @type {Array<FSoundWaveSpectralDataEntry>}
         * @public
         */
        this.Data = null;
        /**
         * Seconds
         * @type {number}
         * @public
         */
        this.TimeSec = 0.0;
    }
}
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Array)
], FSoundWaveSpectralTimeData.prototype, "Data", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], FSoundWaveSpectralTimeData.prototype, "TimeSec", void 0);
/**
 * FSoundWaveSpectralDataEntry
 */
class FSoundWaveSpectralDataEntry {
    constructor() {
        /**
         * Magnitude
         * @type {number}
         * @public
         */
        this.Magnitude = 0.0;
        /**
         * Normalized magnitude
         * @type {number}
         * @public
         */
        this.NormalizedMagnitude = 0.0;
    }
}
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], FSoundWaveSpectralDataEntry.prototype, "Magnitude", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], FSoundWaveSpectralDataEntry.prototype, "NormalizedMagnitude", void 0);
/**
 * FSoundWaveEnvelopeTimeData
 */
class FSoundWaveEnvelopeTimeData {
    constructor() {
        /**
         * Amplitude
         * @type {number}
         * @public
         */
        this.Amplitude = 0.0;
        /**
         * Seconds
         * @type {number}
         * @public
         */
        this.TimeSec = 0.0;
    }
}
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], FSoundWaveEnvelopeTimeData.prototype, "Amplitude", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], FSoundWaveEnvelopeTimeData.prototype, "TimeSec", void 0);
/**
 * FSubtitleCue
 */
class FSubtitleCue {
    constructor() {
        /**
         * Text
         * @type {FText}
         * @public
         */
        this.Text = null;
        /**
         * Time
         * @type {number}
         * @public
         */
        this.Time = 0.0;
    }
}
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Text_1.FText)
], FSubtitleCue.prototype, "Text", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Object)
], FSubtitleCue.prototype, "Time", void 0);
/**
 * A chunk of streamed audio
 */
class FStreamedAudioChunk {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg = args[0];
        if (arg instanceof FAssetArchive_1.FAssetArchive) {
            this.bCooked = arg.readBoolean();
            if (this.bCooked) {
                this.data = new FByteBulkData_1.FByteBulkData(arg);
                this.dataSize = arg.readInt32();
                this.audioDataSize = arg.readInt32();
            }
            else
                throw new Exceptions_1.ParserException("StreamedAudioChunks must be cooked", arg);
        }
        else {
            this.bCooked = arg;
            this.data = args[1];
            this.dataSize = args[2];
            this.audioDataSize = args[3];
        }
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeBoolean(this.bCooked);
        if (this.bCooked) {
            this.data.serialize(Ar);
            Ar.writeInt32(this.dataSize);
            Ar.writeInt32(this.audioDataSize);
        }
        else
            throw new Exceptions_1.ParserException("StreamedAudioChunks must be cooked", Ar);
    }
}
/**
 * Platform-specific data used streaming audio at runtime
 */
class FStreamedAudioPlatformData {
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.numChunks = Ar.readInt32();
        this.audioFormat = Ar.readFName();
        this.chunks = new UnrealArray_1.UnrealArray(this.numChunks, () => new FStreamedAudioChunk(Ar));
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt32(this.numChunks);
        Ar.writeFName(this.audioFormat);
        this.chunks.forEach(it => it.serialize(Ar));
    }
}
