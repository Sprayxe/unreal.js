"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compression = void 0;
const collection_1 = __importDefault(require("@discordjs/collection"));
const assert_1 = __importDefault(require("assert"));
const _Zlib = __importStar(require("zlib"));
const OodleLib = __importStar(require("../oodle/Oodle"));
/**
 * Class to handle compression quickly
 */
class Compression {
    /**
     * Initiates the compression class
     * @returns {void}
     * @private
     * @static
     */
    static init() {
        // Compression: NONE
        class None {
            static decompress(dst, dstOff, dstLen, src, srcOff, srcLen) {
                assert_1.default(srcLen === dstLen);
                src.copy(dst, dstOff, srcOff, srcOff + srcLen);
            }
        }
        this.handlers.set("None", None);
        // Compression: Zlib
        class Zlib {
            static decompress(dst, dstOff, dstLen, src, srcOff, srcLen) {
                const content = _Zlib.inflateSync(src);
                content.copy(dst, dstOff, srcOff, srcOff + srcLen);
            }
        }
        this.handlers.set("Zlib", Zlib);
        // Compression: Gzip
        class Gzip {
            static decompress(dst, dstOff, dstLen, src, srcOff, srcLen) {
                const content = _Zlib.gunzipSync(src);
                content.copy(dst, dstOff, srcOff, srcOff + srcLen);
            }
        }
        this.handlers.set("Gzip", Gzip);
        // Compression: Oodle
        class Oodle {
            static decompress(dst, dstOff, dstLen, src, srcOff, srcLen) {
                OodleLib.Oodle.decompress(src, dstLen, dst, dstOff, srcOff, srcLen);
            }
        }
        this.handlers.set("Oodle", Oodle);
    }
    /**
     * Uncompresses a buffer
     * @param {string} formatName Name of compression to use
     * @param {Buffer} compressedBuffer The buffer to decompress
     * @param {Buffer} uncompressedSize The size of the uncompress buffer
     * @returns {void}
     * @public
     */
    static uncompress0(formatName, compressedBuffer, uncompressedSize) {
        const buffer = Buffer.allocUnsafe(uncompressedSize);
        this.uncompress1(formatName, buffer, compressedBuffer);
        return buffer;
    }
    /**
     * Uncompresses a buffer
     * @param {string} formatName Name of compression to use
     * @param {Buffer} compressedBuffer The buffer to decompress
     * @param {Buffer} uncompressedBuffer A buffer allocated for the decompressed data
     * @returns {void}
     * @public
     */
    static uncompress1(formatName, compressedBuffer, uncompressedBuffer) {
        this.uncompress(formatName, uncompressedBuffer, 0, uncompressedBuffer.length, compressedBuffer, 0, compressedBuffer.length);
    }
    /**
     * Uncompresses a buffer
     * @param {string} formatName Name of compression to use
     * @param {Buffer} uncompressedBuffer A buffer allocated for the decompressed data
     * @param {number} uncompressedBufferOff Offset of the allocated buffer for decompression
     * @param {number} uncompressedSize Size of the allocated buffer for decompression
     * @param {Buffer} compressedBuffer Buffer to decompress
     * @param {number} compressedBufferOff Offset of the compressed buffer
     * @param {number} compressedSize Size of the compressed buffer
     * @returns {void}
     * @public
     */
    static uncompress(formatName, uncompressedBuffer, uncompressedBufferOff, uncompressedSize, compressedBuffer, compressedBufferOff, compressedSize) {
        if (!this.handlers.size)
            this.init();
        const handler = this.handlers.get(formatName);
        if (!handler)
            throw new Error(`Unknown compression method ${formatName}`);
        handler.decompress(uncompressedBuffer, uncompressedBufferOff, uncompressedSize, compressedBuffer, compressedBufferOff, compressedSize);
    }
}
exports.Compression = Compression;
/**
 * Stores compression handlers
 * @type {Collection<string, CompressionHandler>}
 * @static
 * @public
 */
Compression.handlers = new collection_1.default();
