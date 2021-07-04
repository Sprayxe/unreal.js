/// <reference types="node" />
/// <reference types="ref-napi" />
export declare const COMPRESSOR_LZH = 0;
export declare const COMPRESSOR_LZHLW = 1;
export declare const COMPRESSOR_LZNIB = 2;
export declare const COMPRESSOR_NONE = 3;
export declare const COMPRESSOR_LZB16 = 4;
export declare const COMPRESSOR_LZBLW = 5;
export declare const COMPRESSOR_LZA = 6;
export declare const COMPRESSOR_LZNA = 7;
export declare const COMPRESSOR_KRAKEN = 8;
export declare const COMPRESSOR_MERMAID = 9;
export declare const COMPRESSOR_BITKNIT = 10;
export declare const COMPRESSOR_SELKIE = 11;
export declare const COMPRESSOR_HYDRA = 12;
export declare const COMPRESSOR_LEVIATHAN = 13;
export declare const COMPRESSION_LEVEL_NONE = 0;
export declare const COMPRESSION_LEVEL_SUPER_FAST = 1;
export declare const COMPRESSION_LEVEL_VERY_FAST = 2;
export declare const COMPRESSION_LEVEL_FAST = 3;
export declare const COMPRESSION_LEVEL_NORMAL = 4;
export declare const COMPRESSION_LEVEL_OPTIMAL1 = 5;
export declare const COMPRESSION_LEVEL_OPTIMAL2 = 6;
export declare const COMPRESSION_LEVEL_OPTIMAL3 = 7;
export declare const COMPRESSION_LEVEL_OPTIMAL4 = 8;
export declare const COMPRESSION_LEVEL_OPTIMAL5 = 9;
/**
 * Oodle class which handles oodle de-/compression
 */
export declare class Oodle {
    /**
     * Stores the loaded .dll library
     * @type {OodleLibrary}
     * @public
     * @static
     */
    static oodleLib: OodleLibrary;
    /**
     * Decompresses an Oodle compressed array
     * @param {Buffer} src The compressed source data
     * @param {number} dstLen The uncompressed length
     * @returns {Buffer} The decompressed data
     * @throws {DecompressException} When the decompression fails
     * @public
     * @static
     */
    static decompress(src: Buffer, dstLen: number): Buffer;
    /**
     * Decompresses an Oodle compressed array
     * @param {Buffer} src The compressed source data
     * @param {Buffer} dst The destination buffer
     * @throws DecompressException When the decompression fails
     * @throws {Error} When the library could not be loaded
     * @public
     * @static
     */
    static decompress(src: Buffer, dst: Buffer): Buffer;
    /**
     * Decompresses an Oodle compressed array
     * @param {Buffer} src The compressed source data
     * @param {number} srcOff The offset into `src`
     * @param {number} srcLen The compressed length
     * @param {Buffer} dst The destination buffer
     * @param {number} dstOff The offset into `dst`
     * @param {number} dstLen The uncompressed length
     * @throws {DecompressException} When the decompression fails
     * @throws {SyntaxError} When the library could not be loaded
     * @public
     * @static
     */
    static decompress(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number): Buffer;
    /**
     * Compresses a byte array
     * @param {Buffer} uncompressed The uncompressed source data
     * @param {number} compressor The compressor to use
     * @param {number} compressionLevel The compression level to use
     * @returns {Buffer} The compressed data
     * @throws {CompressException} When the compression fails
     * @throws {SyntaxError} When the library could not be loaded
     * @public
     * @static
     */
    static compress(uncompressed: Buffer, compressor: number, compressionLevel: number): Buffer;
    /**
     * Gets path to oodle dll
     * @returns {string} Path
     * @private
     * @static
     */
    private static getDLLPath;
    /**
     * Downloads oo2core_8_win64.dll if it doesn't exist
     * @returns {Promise<void>}
     * @public
     * @static
     */
    static downloadDLL(): Promise<void>;
    /**
     * Loads the .dll library
     * @returns {void}
     * @throws {OodleException} Oodle library not found
     * @public
     * @static
     */
    static ensureLib(): void;
}
/**
 * Structure of oodle library
 */
interface OodleLibrary {
    /**
     * Decompresses a byte array
     * @param {Buffer} src_buf
     * @param {number} src_len
     * @param {Buffer} dst
     * @param {number} dst_size
     * @param {number} fuzz
     * @param {number} crc
     * @param {number} verbose
     * @param {?Buffer} dst_base
     * @param {number} e
     * @param {?Buffer} cb
     * @param {?Buffer} cb_ctx
     * @param {?Buffer} scratch
     * @param {number} scratch_size
     * @param {number} threadPhase
     * @returns {number}
     * @public
     */
    OodleLZ_Decompress(src_buf: Buffer, src_len: number, dst: Buffer, dst_size: number, fuzz: number, crc: number, verbose: number, dst_base: Buffer | null, e: number, cb: Buffer | null, cb_ctx: Buffer | null, scratch: Buffer | null, scratch_size: number, threadPhase: number): number;
    /**
     * Compresses a byte array
     * @param {number} codec
     * @param {Buffer} src_buf
     * @param {number} src_len
     * @param {Buffer} dst_buf
     * @param {number} level
     * @param {?Buffer} opts
     * @param {number} offs
     * @param {number} unused
     * @param {?Buffer} scratch
     * @param {number} scratch_size
     * @returns {number}
     * @public
     */
    OodleLZ_Compress(codec: number, src_buf: Buffer, src_len: number, dst_buf: Buffer, level: number, opts: Buffer | null, offs: number, unused: number, scratch: Buffer | null, scratch_size: number): number;
}
export {};
