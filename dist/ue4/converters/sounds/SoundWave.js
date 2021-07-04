"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundWave = void 0;
const Exceptions_1 = require("../../../exceptions/Exceptions");
const lodash_1 = require("lodash");
class SoundWave {
    constructor(data, format) {
        this.data = data;
        this.format = format;
    }
    equals(other) {
        if (this === other)
            return true;
        if (!(other instanceof SoundWave))
            return false;
        other;
        if (!this.data.equals(other.data))
            return false;
        return this.format === other.format;
    }
    static convert(soundWave) {
        console.debug("Starting to convert USoundWave");
        if (!soundWave.isStreaming) {
            if (soundWave.bCooked) {
                console.debug("Found cooked sound data, exporting...");
                const compressedFormatData = soundWave.compressedFormatData?.formats;
                if (!compressedFormatData)
                    throw new Exceptions_1.ParserException("Cooked sounds need compressed format data");
                if (!compressedFormatData.size)
                    throw new Exceptions_1.ParserException("Compressed format data may not be empty.");
                console.debug("Done.");
                const firstKey = compressedFormatData.firstKey();
                const firstValue = compressedFormatData.first();
                let exportFormat = firstKey.text;
                if (exportFormat.startsWith("OGG1"))
                    exportFormat = "OGG";
                return new SoundWave(firstValue.data, exportFormat);
            }
            else {
                console.debug("Found non-cooked sound data, exporting...");
                const rawData = soundWave.rawData;
                if (!rawData)
                    throw new Exceptions_1.ParserException("Non-cooked sounds need raw data");
                console.debug("Done.");
                return new SoundWave(rawData.data, "ogg");
            }
        }
        else {
            const runningPlatformData = soundWave.runningPlatformData;
            if (!runningPlatformData)
                throw new Exceptions_1.ParserException("Streamed sounds need streamed audio chunks");
            const streamedChunks = runningPlatformData.chunks;
            console.debug("Found streamed sound data, exporting...");
            const data = Buffer.alloc(lodash_1.sum(streamedChunks.map(it => it.audioDataSize)));
            let dataOff = 0;
            let exportFormat = runningPlatformData.audioFormat.text;
            if (exportFormat.startsWith("OGG1"))
                exportFormat = "OGG";
            streamedChunks.forEach((it) => {
                it.data.data.copy(data, dataOff, 0, it.audioDataSize);
                dataOff += it.audioDataSize;
            });
            console.debug("Done.");
            return new SoundWave(data, exportFormat);
        }
    }
}
exports.SoundWave = SoundWave;
