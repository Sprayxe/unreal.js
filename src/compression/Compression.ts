import Collection from "@discordjs/collection";
import assert from "assert";
import * as _Zlib from "zlib"
import * as OodleLib from "../oodle/Oodle"

export class Compression {
    handlers = new Collection<string, CompressionHandler>()

    private init() {
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


}

export interface CompressionHandler {
    decompress?(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number)
}