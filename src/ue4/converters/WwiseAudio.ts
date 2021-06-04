import { UAkMediaAssetData } from "../assets/exports/UAkMediaAssetData";
import { sum } from "lodash";
import { execFileSync } from "child_process"
import { writeFileSync, unlinkSync } from "fs";
import { v4 } from "uuid"

export class WwiseAudio {
    public data: Buffer
    public format: string
    public readonly id = v4().split("-").join("")

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

    export(outputPath?: string) {
        const path = process.cwd() + "\\" + this.id
        const src = path + "." + this.format
        const exec = `D:\\Uasset\\Vgm\\test.exe "${src}" -o "${outputPath || path + ".wav"}"`
        writeFileSync(src, this.data)
        execFileSync(exec, {
            shell: true,
            windowsHide: true,
            stdio: "inherit",
            input: ""
        })
        unlinkSync(src)
    }

    static convert(mediaData: UAkMediaAssetData): WwiseAudio {
        const data = Buffer.alloc(sum(mediaData.dataChunks.map(it => it.bulkData.data.length)))
        let dataOff = 0
        mediaData.dataChunks.forEach((dataChunk) => {
            dataChunk.bulkData.data.copy(data, dataOff, 0, dataChunk.bulkData.data.length)
            dataOff += dataChunk.bulkData.data.length
        })
        return new WwiseAudio(data, "wem")
    }
}