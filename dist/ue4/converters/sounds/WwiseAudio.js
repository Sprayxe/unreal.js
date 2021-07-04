"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WwiseAudio = void 0;
const lodash_1 = require("lodash");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const Exceptions_1 = require("../../../exceptions/Exceptions");
class WwiseAudio {
    constructor(data, format, name) {
        this.data = data;
        this.format = format;
        this.name = name;
    }
    equals(other) {
        if (this === other)
            return true;
        if (!(other instanceof WwiseAudio))
            return false;
        other;
        if (!this.data.equals(other.data))
            return false;
        return this.format === other.format;
    }
    export(outputPath) {
        const cwd = process.cwd();
        if (!fs_1.existsSync(cwd + "\\vgm\\test.exe"))
            throw new Exceptions_1.ParserException("Converting .wem files requires vgmstream. Please check the ReadMe of the lib for further information!");
        const path = cwd + "\\" + this.name;
        const src = path + "." + this.format;
        fs_1.writeFileSync(src, this.data); // write .wem file
        child_process_1.execFileSync(`${cwd}\\vgm\\test.exe "${src}" -o "${outputPath || path + ".wav"}"`, {
            windowsHide: true,
            stdio: "pipe",
            cwd: `${cwd}\\vgm`,
            shell: true
        }); // convert to .wav file
        fs_1.unlinkSync(src); // delete .wem file
    }
    static convert(mediaData) {
        const data = Buffer.alloc(lodash_1.sum(mediaData.dataChunks.map(it => it.bulkData.data.length)));
        let dataOff = 0;
        mediaData.dataChunks.forEach((dataChunk) => {
            dataChunk.bulkData.data.copy(data, dataOff, 0, dataChunk.bulkData.data.length);
            dataOff += dataChunk.bulkData.data.length;
        });
        const pathEnd = mediaData.owner.fileName.split("/").pop();
        const fileName = pathEnd.substring(0, pathEnd.lastIndexOf(".") - 1);
        return new WwiseAudio(data, "WEM", fileName);
    }
}
exports.WwiseAudio = WwiseAudio;
