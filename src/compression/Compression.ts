import Collection from "@discordjs/collection";
import assert from "assert";
import * as _Zlib from "zlib"
import * as OodleLib from "../oodle/Oodle"

/**
 * Class to handle compression quickly
 */
export class Compression {
    /**
     * Stores compression handlers
     * @type {Collection<string, CompressionHandler>}
     * @static
     * @public
     */
    static handlers: Collection<string, CompressionHandler> = new Collection<string, CompressionHandler>()

    /**
     * Initiates the compression class
     * @returns {void}
     * @private
     * @static
     */
    private static init(): void {
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

    /**
     * Uncompresses a buffer
     * @param formatName Name of compression to use
     * @param compressedBuffer The buffer to decompress
     * @param uncompressedSize The size of the uncompress buffer
     * @returns {void}
     * @public
     */
    static uncompress0(formatName: string, compressedBuffer: Buffer, uncompressedSize: number): Buffer {
        const buffer = Buffer.allocUnsafe(uncompressedSize)
        this.uncompress1(formatName, buffer, compressedBuffer)
        return buffer
    }

    /**
     * Uncompresses a buffer
     * @param formatName Name of compression to use
     * @param compressedBuffer The buffer to decompress
     * @param uncompressedBuffer A buffer allocated for the decompressed data
     * @returns {void}
     * @public
     */
    static uncompress1(formatName: string, compressedBuffer: Buffer, uncompressedBuffer: Buffer): void {
        this.uncompress(formatName, uncompressedBuffer, 0, uncompressedBuffer.length,
            compressedBuffer, 0, compressedBuffer.length)
    }

    /**
     * Uncompresses a buffer
     * @param formatName Name of compression to use
     * @param uncompressedBuffer A buffer allocated for the decompressed data
     * @param uncompressedBufferOff Offset of the allocated buffer for decompression
     * @param uncompressedSize Size of the allocated buffer for decompression
     * @param compressedBuffer Buffer to decompress
     * @param compressedBufferOff Offset of the compressed buffer
     * @param compressedSize Size of the compressed buffer
     * @returns {void}
     * @public
     */
    static uncompress(formatName: string,
                      uncompressedBuffer: Buffer, uncompressedBufferOff: number, uncompressedSize: number,
                      compressedBuffer: Buffer, compressedBufferOff: number, compressedSize: number): void {
        if (!this.handlers.size) this.init()
        const handler = this.handlers.get(formatName)
        if (!handler)
            throw new Error(`Unknown compression method ${formatName}`)
        handler.decompress(uncompressedBuffer, uncompressedBufferOff,
            uncompressedSize, compressedBuffer, compressedBufferOff, compressedSize)
    }
}

/**
 * Interface of a compression handler
 */
export interface CompressionHandler {
    /**
     * Decompresses a buffer
     * @param {Buffer} dst Buffer to decompress to
     * @param {number} dstOff Offset of the buffer to decompress to
     * @param {number} dstLen Length of the buffer to decompress to
     * @param {Buffer} src Compressed buffer
     * @param {number} srcOff Offset of the compressed Buffer
     * @param {number} srcLen Length of the compressed Buffer
     * @returns {void}
     * @public
     * @static
     */
    decompress?(dst: Buffer, dstOff: number, dstLen: number, src: Buffer, srcOff: number, srcLen: number): void
}