import { USoundBase } from "./USoundBase";
import { FText } from "../../objects/core/i18n/Text";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FByteBulkData } from "../objects/FByteBulkData";
import { ParserException } from "../../../exceptions/Exceptions";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { FName } from "../../objects/uobject/FName";
import { UnrealArray } from "../../../util/UnrealArray";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { ESoundWaveLoadingBehavior } from "../enums/ESoundWaveLoadingBehavior";
import { FGuid } from "../../objects/core/misc/Guid";
import { FFormatContainer } from "../../objects/uobject/serialization/FFormatContainer";
import { UProperty } from "../../../util/decorators/UProperty";

/**
 * Represents an UE4 Sound Wave
 * @extends {USoundBase}
 */
export class USoundWave extends USoundBase {
    /**
     * Compression quality
     * @type {number}
     * @public
     */
    @UProperty() public CompressionQuality = 0

    /**
     * Streaming priority
     * @type {number}
     * @public
     */
    @UProperty() public StreamingPriority = 0

    /**
     * Sample rate quality
     * @type {ESoundwaveSampleRateSettings}
     * @public
     */
    @UProperty() public SampleRateQuality: ESoundwaveSampleRateSettings = null

    /**
     * Sound group
     * @type {ESoundGroup}
     * @public
     */
    @UProperty() public SoundGroup: ESoundGroup = null

    /**
     * Whether looped
     * @type {boolean}
     * @public
     */
    @UProperty() public bLooping = false

    /**
     * Whether streamed
     * @type {boolean}
     * @public
     */
    @UProperty() public bStreaming = false

    /**
     * Whether seekable stream
     * @type {boolean}
     * @public
     */
    @UProperty() public bSeekableStreaming = false

    /**
     * Loading behavior
     * @type {ESoundWaveLoadingBehavior}
     * @public
     */
    @UProperty() public LoadingBehavior: ESoundWaveLoadingBehavior = null

    /**
     * Whether mature
     * @type {boolean}
     * @public
     */
    @UProperty() public bMature = false

    /**
     * Whether manual word wrap
     * @type {boolean}
     * @public
     */
    @UProperty() public bManualWordWrap = false

    /**
     * Whether single line
     * @type {boolean}
     * @public
     */
    @UProperty() public bSingleLine = false

    /**
     * Whether ambisonics
     * @type {boolean}
     * @public
     */
    @UProperty() public bIsAmbisonics = false

    /**
     * Frequencies to analyze
     * @type {Array<number>}
     * @public
     */
    @UProperty() public FrequenciesToAnalyze: number[] = null

    /**
     * Cooked spectral time data
     * @type {Array<FSoundWaveSpectralTimeData>}
     * @public
     */
    @UProperty() public CookedSpectralTimeData: FSoundWaveSpectralTimeData[] = null

    /**
     * Cooked envelope time data
     * @type {Array<FSoundWaveEnvelopeTimeData>}
     * @public
     */
    @UProperty() public CookedEnvelopeTimeData: FSoundWaveEnvelopeTimeData[] = null

    /**
     * Initial chunk size
     * @type {number}
     * @public
     */
    @UProperty() public InitialChunkSize = 0

    /**
     * Spoken text
     * @type {string}
     * @public
     */
    @UProperty() public SpokenText: string = null

    /**
     * Subtitle priority
     * @type {number}
     * @public
     */
    @UProperty() public SubtitlePriority = 0.0

    /**
     * Volume
     * @type {number}
     * @public
     */
    @UProperty() public Volume = 0.0

    /**
     * Pitch
     * @type {number}
     * @public
     */
    @UProperty() public Pitch = 0.0

    /**
     * Amount of channels
     * @type {number}
     * @public
     */
    @UProperty() public NumChannels = 0

    /**
     * Sample rate
     * @type {number}
     * @public
     */
    @UProperty() public SampleRate = 0

    /**
     * Subtitles
     * @type {Array<FSubtitleCue>}
     * @public
     */
    @UProperty() public Subtitles: FSubtitleCue[] = null

    /**
     * Curves
     * @type {FPackageIndex}
     * @public
     */
    @UProperty() public Curves: FPackageIndex /*UCurveTable*/ = null

    /**
     * Internal curves
     * @type {FPackageIndex}
     * @public
     */
    @UProperty() public InternalCurves: FPackageIndex /*UCurveTable*/ = null

    /**
     * Whether cooked
     * @type {boolean}
     * @public
     */
    public bCooked = false

    /**
     * Uncompressed wav data 16 bit in mono or stereo - stereo not allowed for multichannel data
     * @type {FByteBulkData}
     * @public
     */
    public rawData: FByteBulkData = null

    /**
     * GUID used to uniquely identify this node so it can be found in the DDC
     * @type {FGuid}
     * @public
     */
    public compressedDataGuid = new FGuid()

    /**
     * Compressed format data
     * @type {FFormatContainer}
     * @public
     */
    public compressedFormatData: FFormatContainer = null

    /**
     * The streaming derived data for this sound on this platform
     * @type {FStreamedAudioPlatformData}
     * @public
     */
    public runningPlatformData: FStreamedAudioPlatformData = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)
        this.bCooked = Ar.readBoolean()
        const bShouldStreamSound = this.isStreaming
        if (this.bCooked) {
            if (!bShouldStreamSound)
                this.compressedFormatData = new FFormatContainer(Ar)
        } else {
            this.rawData = new FByteBulkData(Ar)
        }
        this.compressedDataGuid = new FGuid(Ar)
        if (bShouldStreamSound) {
            if (this.bCooked)
                this.runningPlatformData = new FStreamedAudioPlatformData(Ar)
        }
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        super.serialize(Ar)
        Ar.writeBoolean(this.bCooked)
        const bShouldStreamSound = this.isStreaming
        if (this.bCooked) {
            if (!bShouldStreamSound)
                this.compressedFormatData?.serialize(Ar)
        } else {
            this.rawData?.serialize(Ar)
        }
        this.compressedDataGuid.serialize(Ar)
        if (bShouldStreamSound) {
            if (this.bCooked) {
                this.runningPlatformData?.serialize(Ar)
            }
        }
    }

    /**
     * Whether is streaming
     * @type {boolean}
     * @public
     */
    get isStreaming() {
        return this.bStreaming || this.LoadingBehavior !== ESoundWaveLoadingBehavior.ForceInline
    }
}

/**
 * ESoundwaveSampleRateSettings
 * @enum
 */
enum ESoundwaveSampleRateSettings {
    Max,
    High,
    Medium,
    Low,
    Min,
    MatchDevice
}

/**
 * ESoundGroup
 * @enum
 */
enum ESoundGroup {
    SOUNDGROUP_Default,
    SOUNDGROUP_Effects,
    SOUNDGROUP_UI,
    SOUNDGROUP_Music,
    SOUNDGROUP_Voice,
    SOUNDGROUP_GameSoundGroup1,
    SOUNDGROUP_GameSoundGroup2,
    SOUNDGROUP_GameSoundGroup3,
    SOUNDGROUP_GameSoundGroup4,
    SOUNDGROUP_GameSoundGroup5,
    SOUNDGROUP_GameSoundGroup6,
    SOUNDGROUP_GameSoundGroup7,
    SOUNDGROUP_GameSoundGroup8,
    SOUNDGROUP_GameSoundGroup9,
    SOUNDGROUP_GameSoundGroup10,
    SOUNDGROUP_GameSoundGroup11,
    SOUNDGROUP_GameSoundGroup12,
    SOUNDGROUP_GameSoundGroup13,
    SOUNDGROUP_GameSoundGroup14,
    SOUNDGROUP_GameSoundGroup15,
    SOUNDGROUP_GameSoundGroup16,
    SOUNDGROUP_GameSoundGroup17,
    SOUNDGROUP_GameSoundGroup18,
    SOUNDGROUP_GameSoundGroup19,
    SOUNDGROUP_GameSoundGroup20
}

/**
 * FSoundWaveSpectralTimeData
 */
class FSoundWaveSpectralTimeData {
    /**
     * Data
     * @type {Array<FSoundWaveSpectralDataEntry>}
     * @public
     */
    @UProperty()
    public Data: FSoundWaveSpectralDataEntry[] = null

    /**
     * Seconds
     * @type {number}
     * @public
     */
    @UProperty()
    public TimeSec = 0.0
}

/**
 * FSoundWaveSpectralDataEntry
 */
class FSoundWaveSpectralDataEntry {
    /**
     * Magnitude
     * @type {number}
     * @public
     */
    @UProperty()
    public Magnitude = 0.0

    /**
     * Normalized magnitude
     * @type {number}
     * @public
     */
    @UProperty()
    public NormalizedMagnitude = 0.0
}

/**
 * FSoundWaveEnvelopeTimeData
 */
class FSoundWaveEnvelopeTimeData {
    /**
     * Amplitude
     * @type {number}
     * @public
     */
    @UProperty()
    public Amplitude = 0.0

    /**
     * Seconds
     * @type {number}
     * @public
     */
    @UProperty()
    public TimeSec = 0.0
}

/**
 * FSubtitleCue
 */
class FSubtitleCue {
    /**
     * Text
     * @type {FText}
     * @public
     */
    @UProperty()
    public Text: FText = null

    /**
     * Time
     * @type {number}
     * @public
     */
    @UProperty()
    public Time = 0.0
}

/**
 * A chunk of streamed audio
 */
class FStreamedAudioChunk {
    /**
     * Whether cooked
     * @type {boolean}
     * @public
     */
    public bCooked: boolean

    /**
     * Data
     * @type {FByteBulkData}
     * @public
     */
    public data: FByteBulkData

    /**
     * Data size
     * @type {number}
     * @public
     */
    public dataSize: number

    /**
     * Audio data size
     * @type {number}
     * @public
     */
    public audioDataSize: number

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive)

    /**
     * Creates an instance using values
     * @param {boolean} bCooked Whether cooked
     * @param {FByteBulkData} data Data
     * @param {number} dataSize Data size
     * @param {number} audioDataSize Audio data size
     * @constructor
     * @public
     */
    constructor(bCooked: boolean, data: FByteBulkData, dataSize: number, audioDataSize: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg = args[0]
        if (arg instanceof FAssetArchive) {
            this.bCooked = arg.readBoolean()
            if (this.bCooked) {
                this.data = new FByteBulkData(arg)
                this.dataSize = arg.readInt32()
                this.audioDataSize = arg.readInt32()
            } else
                throw new ParserException("StreamedAudioChunks must be cooked", arg)
        } else {
            this.bCooked = arg
            this.data = args[1]
            this.dataSize = args[2]
            this.audioDataSize = args[3]
        }
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeBoolean(this.bCooked)
        if (this.bCooked) {
            this.data.serialize(Ar)
            Ar.writeInt32(this.dataSize)
            Ar.writeInt32(this.audioDataSize)
        } else
            throw new ParserException("StreamedAudioChunks must be cooked", Ar)
    }
}

/**
 * Platform-specific data used streaming audio at runtime
 */
class FStreamedAudioPlatformData {
    /**
     * Amount of chunks
     * @type {number}
     * @public
     */
    public numChunks: number

    /**
     * Audio format
     * @type {FName}
     * @public
     */
    public audioFormat: FName

    /**
     * Chunks
     * @type {Array<FStreamedAudioChunk>}
     * @public
     */
    public chunks: FStreamedAudioChunk[]

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive) {
        this.numChunks = Ar.readInt32()
        this.audioFormat = Ar.readFName()
        this.chunks = new UnrealArray(this.numChunks, () => new FStreamedAudioChunk(Ar))
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeInt32(this.numChunks)
        Ar.writeFName(this.audioFormat)
        this.chunks.forEach(it => it.serialize(Ar))
    }
}
