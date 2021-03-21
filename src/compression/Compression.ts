import Collection from "@discordjs/collection";
import assert from "assert";
import * as _Zlib from "zlib"
import * as OodleLib from "../oodle/Oodle"

export class Compression {
    static handlers = new Collection<string, CompressionHandler>()

    private static init() {
        // Compression: NONE
        class None implements CompressionHandler {
            static decompress(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number) {
                assert(srcLen === dstLen)
                src.copy(dst, dstOff, srcOff, srcOff + srcLen)
            }
        }
        this.handlers.set("None", None)
        // Compression: Zlib
        class Zlib implements CompressionHandler {
            static decompress(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number) {
                const content = _Zlib.inflateSync(src)
                content.copy(dst, dstOff, srcOff, srcOff + srcLen)
            }
        }
        this.handlers.set("Zlib", Zlib)
        // Compression: Gzip
        class Gzip implements CompressionHandler {
            static decompress(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number) {
                const content = _Zlib.gunzipSync(src)
                content.copy(dst, dstOff, srcOff, srcOff + srcLen)
            }
        }
        this.handlers.set("Gzip", Gzip)
        // Compression: Oodle
        class Oodle implements CompressionHandler {
            static decompress(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number) {
                const decomp = OodleLib.Oodle.decompress(src, dstLen, dst, dstOff, srcOff, srcLen)
                decomp.copy(dst, dstOff, srcOff, srcOff + srcLen)
            }
        }
        this.handlers.set("Oodle", Oodle)
    }

    static uncompressMemory(formatName: string, compressedBuffer: Buffer, uncompressedSize: number)
    static uncompressMemory(formatName: string, compressedBuffer: Buffer, uncompressedBuffer: Buffer)
    static uncompressMemory(
        formatName: string,
        uncompressedBuffer: Buffer,
        compressedBuffer: Buffer,
        uncompressedSize: number,
        uncompressedBufferOff: number,
        compressedBufferOff: number,
        compressedSize: number
    )
    static uncompressMemory(...p) {
        if (!this.handlers.size) this.init()
        if (typeof p[2] === "number" && !p[3]) {
            return this.uncompressMemory(p[0], p[1], Buffer.alloc(p[2]))
        } else if (Buffer.isBuffer(p[2]) && !p[3]) {
            return this.uncompressMemory(p[0], p[1], p[2], p[2].length, 0, 0, p[1].length)
        } else {
            const handler = this.handlers.get(p[0])
            if (!handler)
                throw new Error(`Unknown compression method ${p[0]}`)
            handler.decompress(p[2], p[3], p[1], p[4], p[5], p[6])
        }
    }
}

export interface CompressionHandler {
    decompress?(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number)
}