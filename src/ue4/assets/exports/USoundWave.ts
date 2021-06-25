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

export class USoundWave extends USoundBase {
    @UProperty() public CompressionQuality = 0
    @UProperty() public StreamingPriority = 0
    @UProperty() public SampleRateQuality: ESoundwaveSampleRateSettings = null
    @UProperty() public SoundGroup: ESoundGroup = null
    @UProperty() public bLooping = false
    @UProperty() public bStreaming = false
    @UProperty() public bSeekableStreaming = false
    @UProperty() public LoadingBehavior: ESoundWaveLoadingBehavior = null
    @UProperty() public bMature = false
    @UProperty() public bManualWordWrap = false
    @UProperty() public bSingleLine = false
    @UProperty() public bIsAmbisonics = false
    @UProperty() public FrequenciesToAnalyze: number[] = null
    @UProperty() public CookedSpectralTimeData: FSoundWaveSpectralTimeData[] = null
    @UProperty() public CookedEnvelopeTimeData: FSoundWaveEnvelopeTimeData[] = null
    @UProperty() public InitialChunkSize = 0
    @UProperty() public SpokenText: string = null
    @UProperty() public SubtitlePriority = 0.0
    @UProperty() public Volume = 0.0
    @UProperty() public Pitch = 0.0
    @UProperty() public NumChannels = 0
    @UProperty() public SampleRate = 0
    @UProperty() public Subtitles: FSubtitleCue[] = null
    @UProperty() public Curves: FPackageIndex /*UCurveTable*/ = null
    @UProperty() public InternalCurves: FPackageIndex /*UCurveTable*/ = null

    public bCooked = false
    /** Uncompressed wav data 16 bit in mono or stereo - stereo not allowed for multichannel data */
    public rawData: FByteBulkData = null
    /** GUID used to uniquely identify this node so it can be found in the DDC */
    public compressedDataGuid = new FGuid()
    public compressedFormatData: FFormatContainer = null
    /** The streaming derived data for this sound on this platform. */
    public runningPlatformData: FStreamedAudioPlatformData = null

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

    get isStreaming() {
        return this.bStreaming || this.LoadingBehavior !== ESoundWaveLoadingBehavior.ForceInline
    }
}

enum ESoundwaveSampleRateSettings {
    Max,
    High,
    Medium,
    Low,
    Min,
    MatchDevice
}

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


class FSoundWaveSpectralTimeData {
    @UProperty()
    public Data: FSoundWaveSpectralDataEntry[] = null
    @UProperty()
    public TimeSec = 0.0
}

class FSoundWaveSpectralDataEntry {
    @UProperty()
    public Magnitude = 0.0
    @UProperty()
    public NormalizedMagnitude = 0.0
}

class FSoundWaveEnvelopeTimeData {
    @UProperty()
    public Amplitude = 0.0
    @UProperty()
    public TimeSec = 0.0
}

class FSubtitleCue {
    @UProperty()
    public Text: FText = null
    @UProperty()
    public Time = 0.0
}

/**
 * - A chunk of streamed audio.
 */
class FStreamedAudioChunk {
    public bCooked: boolean
    public data: FByteBulkData
    public dataSize: number
    public audioDataSize: number

    constructor(Ar: FAssetArchive)
    constructor(bCooked: boolean, data: FByteBulkData, dataSize: number, audioDataSize: number)
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
 * - Platform-specific data used streaming audio at runtime.
 */
class FStreamedAudioPlatformData {
    public numChunks: number
    public audioFormat: FName
    public chunks: FStreamedAudioChunk[]

    constructor(Ar: FAssetArchive) {
        this.numChunks = Ar.readInt32()
        this.audioFormat = Ar.readFName()
        this.chunks = new UnrealArray(this.numChunks, () => new FStreamedAudioChunk(Ar))
    }

    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeInt32(this.numChunks)
        Ar.writeFName(this.audioFormat)
        this.chunks.forEach(it => it.serialize(Ar))
    }
}
