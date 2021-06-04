import { UAkMediaAssetData } from "../assets/exports/UAkMediaAssetData";
import { sum } from "lodash";

export class WwiseAudio {
    public data: Buffer
    public format: string

    constructor(data: Buffer, format: string) {
        this.data = data
        this.format = format
    }

    equals(other?: any) {
        if (this === other) return true
        if (!(other instanceof WwiseAudio)) return false
        other as WwiseAudio
        if (!this.data.equals(other.data)) return false
        return this.format === other.format;
    }

    // broken Loll
    static convert(mediaData: UAkMediaAssetData): WwiseAudio {
        const data = Buffer.alloc(sum(mediaData.dataChunks.map(it => it.bulkData.data.length)))
        let dataOff = 0
        for (const dataChunk of mediaData.dataChunks) {
            dataChunk.bulkData.data.copy(data, dataOff, 0, dataChunk.bulkData.data.length)
            dataOff += dataChunk.bulkData.data.length
        }
        return new WwiseAudio(data, "wav")
    }
}