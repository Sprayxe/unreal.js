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

export class USoundWave extends USoundBase {
    public CompressionQuality = 0
    public StreamingPriority = 0
    public SampleRateQuality: ESoundwaveSampleRateSettings = null
    public SoundGroup: ESoundGroup = null
    public bLooping = false
    public bStreaming = false
    public bSeekableStreaming = false
    public LoadingBehavior: ESoundWaveLoadingBehavior = null
    public bMature = false
    public bManualWordWrap = false
    public bSingleLine = false
    public bIsAmbisonics = false
    public FrequenciesToAnalyze: number[] = null
    public CookedSpectralTimeData: FSoundWaveSpectralTimeData[] = null
    public CookedEnvelopeTimeData: FSoundWaveEnvelopeTimeData[] = null
    public InitialChunkSize = 0
    public SpokenText: string = null
    public SubtitlePriority = 0.0
    public Volume = 0.0
    public Pitch = 0.0
    public NumChannels = 0
    public SampleRate = 0
    public Subtitles: FSubtitleCue[] = null
    public Curves: FPackageIndex /*UCurveTable*/ = null
    public InternalCurves: FPackageIndex /*UCurveTable*/ = null

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
    public Data: FSoundWaveSpectralDataEntry[] = null
    public TimeSec = 0.0
}

class FSoundWaveSpectralDataEntry {
    public Magnitude = 0.0
    public NormalizedMagnitude = 0.0
}

class FSoundWaveEnvelopeTimeData {
    public Amplitude = 0.0
    public TimeSec = 0.0
}

class FSubtitleCue {
    public Text: FText = null
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
                throw ParserException("StreamedAudioChunks must be cooked")
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
            throw ParserException("StreamedAudioChunks must be cooked")
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
