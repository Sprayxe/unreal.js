import { UAkMediaAssetData } from "../../assets/exports/UAkMediaAssetData";
import { sum } from "lodash";
import { execFileSync } from "child_process"
import { writeFileSync, unlinkSync, existsSync } from "fs";
import { ParserException } from "../../../exceptions/Exceptions";

export class WwiseAudio {
    public name: string
    public data: Buffer
    public format: string

    constructor(data: Buffer, format: string, name: string) {
        this.data = data
        this.format = format
        this.name = name
    }

    equals(other?: any) {
        if (this === other) return true
        if (!(other instanceof WwiseAudio)) return false
        other as WwiseAudio
        if (!this.data.equals(other.data)) return false
        return this.format === other.format;
    }

    export(outputPath?: string) {
        const cwd = process.cwd()
        if (!existsSync(cwd + "\\vgm\\test.exe"))
            throw ParserException("Converting .wem files requires vgmstream. Please check the ReadMe of the lib for further information!")
        const path = cwd + "\\" + this.name
        const src = path + "." + this.format
        writeFileSync(src, this.data) // write .wem file
        execFileSync(`${cwd}\\vgm\\test.exe "${src}" -o "${outputPath || path + ".wav"}"`, {
            windowsHide: true,
            stdio: "pipe",
            cwd: `${cwd}\\vgm`,
            shell: true
        }) // convert to .wav file
        unlinkSync(src) // delete .wem file
    }

    static convert(mediaData: UAkMediaAssetData): WwiseAudio {
        const data = Buffer.alloc(sum(mediaData.dataChunks.map(it => it.bulkData.data.length)))
        let dataOff = 0
        mediaData.dataChunks.forEach((dataChunk) => {
            dataChunk.bulkData.data.copy(data, dataOff, 0, dataChunk.bulkData.data.length)
            dataOff += dataChunk.bulkData.data.length
        })
        const pathEnd = mediaData.owner.fileName.split("/").pop()
        const fileName = pathEnd.substring(0, pathEnd.lastIndexOf(".") - 1)
        return new WwiseAudio(data, "WEM", fileName)
    }
}