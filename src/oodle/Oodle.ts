import * as ffi from "ffi-napi"
import { CompressException, DecompressException, OodleException } from "./Exceptions";
import ref from "ref-napi";
import { INTEGER_MAX_VALUE } from "../util/Const";
import { existsSync } from "fs";
import { OodleDownloader } from './OodleDownloader';

export const COMPRESSOR_LZH = 0
export const COMPRESSOR_LZHLW = 1
export const COMPRESSOR_LZNIB = 2
export const COMPRESSOR_NONE = 3
export const COMPRESSOR_LZB16 = 4
export const COMPRESSOR_LZBLW = 5
export const COMPRESSOR_LZA = 6
export const COMPRESSOR_LZNA = 7
export const COMPRESSOR_KRAKEN = 8
export const COMPRESSOR_MERMAID = 9
export const COMPRESSOR_BITKNIT = 10
export const COMPRESSOR_SELKIE = 11
export const COMPRESSOR_HYDRA = 12
export const COMPRESSOR_LEVIATHAN = 13

export const COMPRESSION_LEVEL_NONE = 0
export const COMPRESSION_LEVEL_SUPER_FAST = 1
export const COMPRESSION_LEVEL_VERY_FAST = 2
export const COMPRESSION_LEVEL_FAST = 3
export const COMPRESSION_LEVEL_NORMAL = 4
export const COMPRESSION_LEVEL_OPTIMAL1 = 5
export const COMPRESSION_LEVEL_OPTIMAL2 = 6
export const COMPRESSION_LEVEL_OPTIMAL3 = 7
export const COMPRESSION_LEVEL_OPTIMAL4 = 8
export const COMPRESSION_LEVEL_OPTIMAL5 = 9

/**
 * Oodle class which handles oodle de-/compression
 */
export class Oodle {
    /**
     * Stores the loaded .dll library
     * @type {OodleLibrary}
     * @public
     * @static
     */
    static oodleLib: OodleLibrary = null

    /**
     * Decompresses an Oodle compressed array
     * @param {Buffer} src The compressed source data
     * @param {number} dstLen The uncompressed length
     * @returns {Buffer} The decompressed data
     * @throws {DecompressException} When the decompression fails
     * @public
     * @static
     */
    static decompress(src: Buffer, dstLen: number): Buffer

    /**
     * Decompresses an Oodle compressed array
     * @param {Buffer} src The compressed source data
     * @param {Buffer} dst The destination buffer
     * @throws DecompressException When the decompression fails
     * @throws {Error} When the library could not be loaded
     * @public
     * @static
     */
    static decompress(src: Buffer, dst: Buffer): Buffer

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
    static decompress(src: Buffer, dstLen?: number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number): Buffer

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    static decompress(src: Buffer, dstLen?: Buffer | number, dst?: Buffer, dstOff?: number, srcOff?: number, srcLen?: number): Buffer {
        this.ensureLib()
        if (typeof dstLen === "number" && !dst) {
            return this.decompress(src, Buffer.allocUnsafe(dstLen))
        } else if (Buffer.isBuffer(dstLen)) {
            return this.decompress(src, dstLen.length, dstLen, 0, 0, src.length)
        } else {
            //const start = Date.now()
            const sourcePointer = src.subarray(srcOff, srcOff + srcLen)
            const dstPointer = dst.subarray(dstOff, dstOff + dstLen)
            const resultCode = this.oodleLib.OodleLZ_Decompress(
                sourcePointer, srcLen,
                dstPointer, dstLen,
                0, 0, INTEGER_MAX_VALUE,
                ref.NULL, 0,
                ref.NULL, ref.NULL, ref.NULL,
                0, 0
            )
            if (resultCode <= 0)
                throw new DecompressException(`Oodle decompression failed with code ${resultCode}`)
            //const stop = Date.now()
            //const seconds = (stop - start) / 1000
            //console.debug(`Oodle decompress: ${srcLen} => ${dstLen} (${seconds} seconds)`)
            return dstPointer
        }
    }

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
    static compress(uncompressed: Buffer, compressor: number, compressionLevel: number) {
        this.ensureLib()
        //const start = Date.now()
        const srcLength = uncompressed.length
        const dstLength = srcLength + 65536
        const sourcePointer = uncompressed.subarray(0, srcLength)
        const dstPointer = Buffer.allocUnsafe(dstLength)
        const resultCode = this.oodleLib.OodleLZ_Compress(
            compressor,
            sourcePointer, srcLength,
            dstPointer, compressionLevel,
            ref.NULL, 0, 0, ref.NULL, 0
        )
        if (resultCode <= 0)
            throw new CompressException(`Oodle compression failed with code ${resultCode}`)
        const dst = dstPointer.subarray(0, resultCode)
        //const stop = Date.now()
        //const seconds = (stop - start) / 1000
        //console.debug(`Oodle compress: ${srcLength} => ${dstLength} (${seconds} seconds)`)
        return dst
    }

    /**
     * Gets path to oodle dll
     * @returns {string} Path
     * @private
     * @static
     */
    private static getDLLPath(): string {
        return `${process.cwd()}/${OodleDownloader.OODLE_FILE_NAME}`
    }

    /**
     * Downloads oo2core_8_win64.dll if it doesn't exist
     * @returns {Promise<void>}
     * @public
     * @static
     */
    static async downloadDLL() {
        const path = Oodle.getDLLPath()
        if (!existsSync(path)) {
            console.log(`${OodleDownloader.OODLE_FILE_NAME} is missing, downloading it...`)
            await OodleDownloader.download(path)
        }
    }

    /**
     * Loads the .dll library
     * @returns {void}
     * @throws {OodleException} Oodle library not found
     * @public
     * @static
     */
    static ensureLib() {
        try {
            if (!this.oodleLib) {
                const path = Oodle.getDLLPath()
                if (!existsSync(path))
                    throw new OodleException("Missing oodle library 'oo2core_8_win64.dll'!")
                this.oodleLib = ffi.Library(path, {
                    OodleLZ_Decompress: ["int", ["uint8*", "int", "uint8*", "size_t", "int", "int", "int", "uint8*", "size_t", "void*", "void*", "void*", "size_t", "int"]],
                    OodleLZ_Compress: ["int", ["int", "uint8*", "size_t", "uint8*", "int", "void*", "size_t", "size_t", "void*", "size_t"]]
                })
            }
        } catch (e) {
            throw new OodleException(e)
        }
    }
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
    OodleLZ_Decompress(
        src_buf: Buffer,
        src_len: number,
        dst: Buffer,
        dst_size: number,
        fuzz: number,
        crc: number,
        verbose: number,
        dst_base: Buffer | null,
        e: number,
        cb: Buffer | null,
        cb_ctx: Buffer | null,
        scratch: Buffer | null,
        scratch_size: number,
        threadPhase: number
    ): number

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
    OodleLZ_Compress(
        codec: number,
        src_buf: Buffer,
        src_len: number,
        dst_buf: Buffer,
        level: number,
        opts: Buffer | null,
        offs: number,
        unused: number,
        scratch: Buffer | null,
        scratch_size: number
    ): number
}
