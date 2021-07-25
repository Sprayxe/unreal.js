import { USoundWave } from "../../assets/exports/USoundWave";
import { ParserException } from "../../../exceptions/Exceptions";
import { sum } from "lodash"
import { Config } from "../../../Config";

export class SoundWave {
    public data: Buffer
    public format: string

    constructor(data: Buffer, format: string) {
        this.data = data
        this.format = format
    }

    equals(other?: any) {
        if (this === other) return true
        if (!(other instanceof SoundWave)) return false
        other as SoundWave
        if (!this.data.equals(other.data)) return false
        return this.format === other.format;
    }

    static convert(soundWave: USoundWave): SoundWave {
        if (Config.GDebug) console.debug("Starting to convert USoundWave")
        if (!soundWave.isStreaming) {
            if (soundWave.bCooked) {
                if (Config.GDebug) console.debug("Found cooked sound data, exporting...")
                const compressedFormatData = soundWave.compressedFormatData?.formats
                if (!compressedFormatData)
                    throw new ParserException("Cooked sounds need compressed format data")
                if (!compressedFormatData.size)
                    throw new ParserException("Compressed format data may not be empty.")
                if (Config.GDebug) console.debug("Done.")
                const firstKey = compressedFormatData.firstKey()
                const firstValue = compressedFormatData.first()
                let exportFormat = firstKey.text
                if (exportFormat.startsWith("OGG1"))
                    exportFormat = "OGG"
                return new SoundWave(firstValue.data, exportFormat)
            } else {
                if (Config.GDebug) console.debug("Found non-cooked sound data, exporting...")
                const rawData = soundWave.rawData
                if (!rawData)
                    throw new ParserException("Non-cooked sounds need raw data")
                if (Config.GDebug) console.debug("Done.")
                return new SoundWave(rawData.data, "ogg")
            }
        } else {
            const runningPlatformData = soundWave.runningPlatformData
            if (!runningPlatformData)
                throw new ParserException("Streamed sounds need streamed audio chunks")
            const streamedChunks = runningPlatformData.chunks
            if (Config.GDebug) console.debug("Found streamed sound data, exporting...")
            const data = Buffer.alloc(sum(streamedChunks.map(it => it.audioDataSize)))
            let dataOff = 0
            let exportFormat = runningPlatformData.audioFormat.text
            if (exportFormat.startsWith("OGG1"))
                exportFormat = "OGG"
            streamedChunks.forEach((it) => {
                it.data.data.copy(data, dataOff, 0, it.audioDataSize)
                dataOff += it.audioDataSize
            })
            if (Config.GDebug) console.debug("Done.")
            return new SoundWave(data, exportFormat)
        }
    }
}