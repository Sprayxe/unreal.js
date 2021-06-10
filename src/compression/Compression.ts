import Collection from "@discordjs/collection";
import assert from "assert";
import * as _Zlib from "zlib"
import * as OodleLib from "../oodle/Oodle"

export class Compression {
    static handlers = new Collection<string, CompressionHandler>()

    private static init() {
        // Compression: NONE
        class None implements CompressionHandler {
            static decompress(dst: Buffer, dstOff: number, dstLen: number, src: Buffer, srcOff: number, srcLen: number) {
                assert(srcLen === dstLen)
                src.copy(dst, dstOff, srcOff, srcOff + srcLen)
            }
        }
        this.handlers.set("None", None)
        // Compression: Zlib
        class Zlib implements CompressionHandler {
            static decompress(dst: Buffer, dstOff: number, dstLen: number, src: Buffer, srcOff: number, srcLen: number) {
                const content = _Zlib.inflateSync(src)
                content.copy(dst, dstOff, srcOff, srcOff + srcLen)
            }
        }
        this.handlers.set("Zlib", Zlib)
        // Compression: Gzip
        class Gzip implements CompressionHandler {
            static decompress(dst: Buffer, dstOff: number, dstLen: number, src: Buffer, srcOff: number, srcLen: number) {
                const content = _Zlib.gunzipSync(src)
                content.copy(dst, dstOff, srcOff, srcOff + srcLen)
            }
        }
        this.handlers.set("Gzip", Gzip)
        // Compression: Oodle
        class Oodle implements CompressionHandler {
            static decompress(dst: Buffer, dstOff: number, dstLen: number, src: Buffer, srcOff: number, srcLen: number) {
                OodleLib.Oodle.decompress(src, dstLen, dst, dstOff, srcOff, srcLen)
            }
        }
        this.handlers.set("Oodle", Oodle)
    }

    static uncompress0(formatName: string, compressedBuffer: Buffer, uncompressedSize: number): Buffer {
        const buffer = Buffer.allocUnsafe(uncompressedSize)
        this.uncompress1(formatName, buffer, compressedBuffer)
        return buffer
    }

    static uncompress1(formatName: string, compressedBuffer: Buffer, uncompressedBuffer: Buffer) {
        this.uncompress(formatName, uncompressedBuffer, 0, uncompressedBuffer.length, compressedBuffer, 0, compressedBuffer.length)
    }

    static uncompress(formatName: string,
                      uncompressedBuffer: Buffer, uncompressedBufferOff: number, uncompressedSize: number,
                      compressedBuffer: Buffer, compressedBufferOff: number, compressedSize: number) {
        if (!this.handlers.size) this.init()
        const handler = this.handlers.get(formatName)
        if (!handler)
            throw new Error(`Unknown compression method ${formatName}`)
        handler.decompress(uncompressedBuffer, uncompressedBufferOff, uncompressedSize, compressedBuffer, compressedBufferOff, compressedSize)
    }
}

export interface CompressionHandler {
    decompress?(dst: Buffer, dstOff: number, dstLen: number, src: Buffer, srcOff: number, srcLen: number)
}