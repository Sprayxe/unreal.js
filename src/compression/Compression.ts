import Collection from "@discordjs/collection";
import assert from "assert";
import * as _Zlib from "zlib"

export class Compression {
    handlers = new Collection<string, CompressionHandler>()

    constructor() {
        // Compression: NONE
        class None implements CompressionHandler {
            static decompress(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number) {
                assert(srcLen === dstLen)
                src.copy(dst, dstOff, srcOff, srcLen)
            }
        }
        this.handlers.set("None", None)
        // Compression: Zlib
        class Zlib implements CompressionHandler {
            static decompress(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number) {
                _Zlib.inflate(src, (err, content) => {
                    if (err) throw err;
                    content.copy(dst, 0, dstOff, dstLen)
                })
            }
        }
        this.handlers.set("Zlib", Zlib)
    }
}

export interface CompressionHandler {
    decompress?(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number)
}