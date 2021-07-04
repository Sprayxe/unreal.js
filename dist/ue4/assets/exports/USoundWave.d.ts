import { USoundBase } from "./USoundBase";
import { FText } from "../../objects/core/i18n/Text";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FByteBulkData } from "../objects/FByteBulkData";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { FName } from "../../objects/uobject/FName";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { ESoundWaveLoadingBehavior } from "../enums/ESoundWaveLoadingBehavior";
import { FGuid } from "../../objects/core/misc/Guid";
import { FFormatContainer } from "../../objects/uobject/serialization/FFormatContainer";
/**
 * Represents an UE4 Sound Wave
 * @extends {USoundBase}
 */
export declare class USoundWave extends USoundBase {
    /**
     * Compression quality
     * @type {number}
     * @public
     */
    CompressionQuality: number;
    /**
     * Streaming priority
     * @type {number}
     * @public
     */
    StreamingPriority: number;
    /**
     * Sample rate quality
     * @type {ESoundwaveSampleRateSettings}
     * @public
     */
    SampleRateQuality: ESoundwaveSampleRateSettings;
    /**
     * Sound group
     * @type {ESoundGroup}
     * @public
     */
    SoundGroup: ESoundGroup;
    /**
     * Whether looped
     * @type {boolean}
     * @public
     */
    bLooping: boolean;
    /**
     * Whether streamed
     * @type {boolean}
     * @public
     */
    bStreaming: boolean;
    /**
     * Whether seekable stream
     * @type {boolean}
     * @public
     */
    bSeekableStreaming: boolean;
    /**
     * Loading behavior
     * @type {ESoundWaveLoadingBehavior}
     * @public
     */
    LoadingBehavior: ESoundWaveLoadingBehavior;
    /**
     * Whether mature
     * @type {boolean}
     * @public
     */
    bMature: boolean;
    /**
     * Whether manual word wrap
     * @type {boolean}
     * @public
     */
    bManualWordWrap: boolean;
    /**
     * Whether single line
     * @type {boolean}
     * @public
     */
    bSingleLine: boolean;
    /**
     * Whether ambisonics
     * @type {boolean}
     * @public
     */
    bIsAmbisonics: boolean;
    /**
     * Frequencies to analyze
     * @type {Array<number>}
     * @public
     */
    FrequenciesToAnalyze: number[];
    /**
     * Cooked spectral time data
     * @type {Array<FSoundWaveSpectralTimeData>}
     * @public
     */
    CookedSpectralTimeData: FSoundWaveSpectralTimeData[];
    /**
     * Cooked envelope time data
     * @type {Array<FSoundWaveEnvelopeTimeData>}
     * @public
     */
    CookedEnvelopeTimeData: FSoundWaveEnvelopeTimeData[];
    /**
     * Initial chunk size
     * @type {number}
     * @public
     */
    InitialChunkSize: number;
    /**
     * Spoken text
     * @type {string}
     * @public
     */
    SpokenText: string;
    /**
     * Subtitle priority
     * @type {number}
     * @public
     */
    SubtitlePriority: number;
    /**
     * Volume
     * @type {number}
     * @public
     */
    Volume: number;
    /**
     * Pitch
     * @type {number}
     * @public
     */
    Pitch: number;
    /**
     * Amount of channels
     * @type {number}
     * @public
     */
    NumChannels: number;
    /**
     * Sample rate
     * @type {number}
     * @public
     */
    SampleRate: number;
    /**
     * Subtitles
     * @type {Array<FSubtitleCue>}
     * @public
     */
    Subtitles: FSubtitleCue[];
    /**
     * Curves
     * @type {FPackageIndex}
     * @public
     */
    Curves: FPackageIndex;
    /**
     * Internal curves
     * @type {FPackageIndex}
     * @public
     */
    InternalCurves: FPackageIndex;
    /**
     * Whether cooked
     * @type {boolean}
     * @public
     */
    bCooked: boolean;
    /**
     * Uncompressed wav data 16 bit in mono or stereo - stereo not allowed for multichannel data
     * @type {FByteBulkData}
     * @public
     */
    rawData: FByteBulkData;
    /**
     * GUID used to uniquely identify this node so it can be found in the DDC
     * @type {FGuid}
     * @public
     */
    compressedDataGuid: FGuid;
    /**
     * Compressed format data
     * @type {FFormatContainer}
     * @public
     */
    compressedFormatData: FFormatContainer;
    /**
     * The streaming derived data for this sound on this platform
     * @type {FStreamedAudioPlatformData}
     * @public
     */
    runningPlatformData: FStreamedAudioPlatformData;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
    /**
     * Whether is streaming
     * @type {boolean}
     * @public
     */
    get isStreaming(): boolean;
}
/**
 * ESoundwaveSampleRateSettings
 * @enum
 */
declare enum ESoundwaveSampleRateSettings {
    Max = 0,
    High = 1,
    Medium = 2,
    Low = 3,
    Min = 4,
    MatchDevice = 5
}
/**
 * ESoundGroup
 * @enum
 */
declare enum ESoundGroup {
    SOUNDGROUP_Default = 0,
    SOUNDGROUP_Effects = 1,
    SOUNDGROUP_UI = 2,
    SOUNDGROUP_Music = 3,
    SOUNDGROUP_Voice = 4,
    SOUNDGROUP_GameSoundGroup1 = 5,
    SOUNDGROUP_GameSoundGroup2 = 6,
    SOUNDGROUP_GameSoundGroup3 = 7,
    SOUNDGROUP_GameSoundGroup4 = 8,
    SOUNDGROUP_GameSoundGroup5 = 9,
    SOUNDGROUP_GameSoundGroup6 = 10,
    SOUNDGROUP_GameSoundGroup7 = 11,
    SOUNDGROUP_GameSoundGroup8 = 12,
    SOUNDGROUP_GameSoundGroup9 = 13,
    SOUNDGROUP_GameSoundGroup10 = 14,
    SOUNDGROUP_GameSoundGroup11 = 15,
    SOUNDGROUP_GameSoundGroup12 = 16,
    SOUNDGROUP_GameSoundGroup13 = 17,
    SOUNDGROUP_GameSoundGroup14 = 18,
    SOUNDGROUP_GameSoundGroup15 = 19,
    SOUNDGROUP_GameSoundGroup16 = 20,
    SOUNDGROUP_GameSoundGroup17 = 21,
    SOUNDGROUP_GameSoundGroup18 = 22,
    SOUNDGROUP_GameSoundGroup19 = 23,
    SOUNDGROUP_GameSoundGroup20 = 24
}
/**
 * FSoundWaveSpectralTimeData
 */
declare class FSoundWaveSpectralTimeData {
    /**
     * Data
     * @type {Array<FSoundWaveSpectralDataEntry>}
     * @public
     */
    Data: FSoundWaveSpectralDataEntry[];
    /**
     * Seconds
     * @type {number}
     * @public
     */
    TimeSec: number;
}
/**
 * FSoundWaveSpectralDataEntry
 */
declare class FSoundWaveSpectralDataEntry {
    /**
     * Magnitude
     * @type {number}
     * @public
     */
    Magnitude: number;
    /**
     * Normalized magnitude
     * @type {number}
     * @public
     */
    NormalizedMagnitude: number;
}
/**
 * FSoundWaveEnvelopeTimeData
 */
declare class FSoundWaveEnvelopeTimeData {
    /**
     * Amplitude
     * @type {number}
     * @public
     */
    Amplitude: number;
    /**
     * Seconds
     * @type {number}
     * @public
     */
    TimeSec: number;
}
/**
 * FSubtitleCue
 */
declare class FSubtitleCue {
    /**
     * Text
     * @type {FText}
     * @public
     */
    Text: FText;
    /**
     * Time
     * @type {number}
     * @public
     */
    Time: number;
}
/**
 * A chunk of streamed audio
 */
declare class FStreamedAudioChunk {
    /**
     * Whether cooked
     * @type {boolean}
     * @public
     */
    bCooked: boolean;
    /**
     * Data
     * @type {FByteBulkData}
     * @public
     */
    data: FByteBulkData;
    /**
     * Data size
     * @type {number}
     * @public
     */
    dataSize: number;
    /**
     * Audio data size
     * @type {number}
     * @public
     */
    audioDataSize: number;
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates an instance using values
     * @param {boolean} bCooked Whether cooked
     * @param {FByteBulkData} data Data
     * @param {number} dataSize Data size
     * @param {number} audioDataSize Audio data size
     * @constructor
     * @public
     */
    constructor(bCooked: boolean, data: FByteBulkData, dataSize: number, audioDataSize: number);
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
}
/**
 * Platform-specific data used streaming audio at runtime
 */
declare class FStreamedAudioPlatformData {
    /**
     * Amount of chunks
     * @type {number}
     * @public
     */
    numChunks: number;
    /**
     * Audio format
     * @type {FName}
     * @public
     */
    audioFormat: FName;
    /**
     * Chunks
     * @type {Array<FStreamedAudioChunk>}
     * @public
     */
    chunks: FStreamedAudioChunk[];
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
}
export {};
