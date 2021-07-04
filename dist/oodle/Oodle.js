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
exports.Oodle = exports.COMPRESSION_LEVEL_OPTIMAL5 = exports.COMPRESSION_LEVEL_OPTIMAL4 = exports.COMPRESSION_LEVEL_OPTIMAL3 = exports.COMPRESSION_LEVEL_OPTIMAL2 = exports.COMPRESSION_LEVEL_OPTIMAL1 = exports.COMPRESSION_LEVEL_NORMAL = exports.COMPRESSION_LEVEL_FAST = exports.COMPRESSION_LEVEL_VERY_FAST = exports.COMPRESSION_LEVEL_SUPER_FAST = exports.COMPRESSION_LEVEL_NONE = exports.COMPRESSOR_LEVIATHAN = exports.COMPRESSOR_HYDRA = exports.COMPRESSOR_SELKIE = exports.COMPRESSOR_BITKNIT = exports.COMPRESSOR_MERMAID = exports.COMPRESSOR_KRAKEN = exports.COMPRESSOR_LZNA = exports.COMPRESSOR_LZA = exports.COMPRESSOR_LZBLW = exports.COMPRESSOR_LZB16 = exports.COMPRESSOR_NONE = exports.COMPRESSOR_LZNIB = exports.COMPRESSOR_LZHLW = exports.COMPRESSOR_LZH = void 0;
const ffi = __importStar(require("ffi-napi"));
const Exceptions_1 = require("./Exceptions");
const ref_napi_1 = __importDefault(require("ref-napi"));
const Const_1 = require("../util/Const");
const fs_1 = require("fs");
const OodleDownloader_1 = require("./OodleDownloader");
exports.COMPRESSOR_LZH = 0;
exports.COMPRESSOR_LZHLW = 1;
exports.COMPRESSOR_LZNIB = 2;
exports.COMPRESSOR_NONE = 3;
exports.COMPRESSOR_LZB16 = 4;
exports.COMPRESSOR_LZBLW = 5;
exports.COMPRESSOR_LZA = 6;
exports.COMPRESSOR_LZNA = 7;
exports.COMPRESSOR_KRAKEN = 8;
exports.COMPRESSOR_MERMAID = 9;
exports.COMPRESSOR_BITKNIT = 10;
exports.COMPRESSOR_SELKIE = 11;
exports.COMPRESSOR_HYDRA = 12;
exports.COMPRESSOR_LEVIATHAN = 13;
exports.COMPRESSION_LEVEL_NONE = 0;
exports.COMPRESSION_LEVEL_SUPER_FAST = 1;
exports.COMPRESSION_LEVEL_VERY_FAST = 2;
exports.COMPRESSION_LEVEL_FAST = 3;
exports.COMPRESSION_LEVEL_NORMAL = 4;
exports.COMPRESSION_LEVEL_OPTIMAL1 = 5;
exports.COMPRESSION_LEVEL_OPTIMAL2 = 6;
exports.COMPRESSION_LEVEL_OPTIMAL3 = 7;
exports.COMPRESSION_LEVEL_OPTIMAL4 = 8;
exports.COMPRESSION_LEVEL_OPTIMAL5 = 9;
/**
 * Oodle class which handles oodle de-/compression
 */
class Oodle {
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    static decompress(src, dstLen, dst, dstOff, srcOff, srcLen) {
        this.ensureLib();
        if (typeof dstLen === "number" && !dst) {
            return this.decompress(src, Buffer.allocUnsafe(dstLen));
        }
        else if (Buffer.isBuffer(dstLen)) {
            return this.decompress(src, dstLen.length, dstLen, 0, 0, src.length);
        }
        else {
            //const start = Date.now()
            const sourcePointer = src.subarray(srcOff, srcOff + srcLen);
            const dstPointer = dst.subarray(dstOff, dstOff + dstLen);
            const resultCode = this.oodleLib.OodleLZ_Decompress(sourcePointer, srcLen, dstPointer, dstLen, 0, 0, Const_1.INTEGER_MAX_VALUE, ref_napi_1.default.NULL, 0, ref_napi_1.default.NULL, ref_napi_1.default.NULL, ref_napi_1.default.NULL, 0, 0);
            if (resultCode <= 0)
                throw new Exceptions_1.DecompressException(`Oodle decompression failed with code ${resultCode}`);
            //const stop = Date.now()
            //const seconds = (stop - start) / 1000
            //console.debug(`Oodle decompress: ${srcLen} => ${dstLen} (${seconds} seconds)`)
            return dstPointer;
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
    static compress(uncompressed, compressor, compressionLevel) {
        this.ensureLib();
        //const start = Date.now()
        const srcLength = uncompressed.length;
        const dstLength = srcLength + 65536;
        const sourcePointer = uncompressed.subarray(0, srcLength);
        const dstPointer = Buffer.allocUnsafe(dstLength);
        const resultCode = this.oodleLib.OodleLZ_Compress(compressor, sourcePointer, srcLength, dstPointer, compressionLevel, ref_napi_1.default.NULL, 0, 0, ref_napi_1.default.NULL, 0);
        if (resultCode <= 0)
            throw new Exceptions_1.CompressException(`Oodle compression failed with code ${resultCode}`);
        const dst = dstPointer.subarray(0, resultCode);
        //const stop = Date.now()
        //const seconds = (stop - start) / 1000
        //console.debug(`Oodle compress: ${srcLength} => ${dstLength} (${seconds} seconds)`)
        return dst;
    }
    /**
     * Gets path to oodle dll
     * @returns {string} Path
     * @private
     * @static
     */
    static getDLLPath() {
        return `${process.cwd()}/${OodleDownloader_1.OodleDownloader.OODLE_FILE_NAME}`;
    }
    /**
     * Downloads oo2core_8_win64.dll if it doesn't exist
     * @returns {Promise<void>}
     * @public
     * @static
     */
    static async downloadDLL() {
        const path = Oodle.getDLLPath();
        if (!fs_1.existsSync(path)) {
            console.log(`${OodleDownloader_1.OodleDownloader.OODLE_FILE_NAME} is missing, downloading it...`);
            await OodleDownloader_1.OodleDownloader.download(path);
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
                const path = Oodle.getDLLPath();
                if (!fs_1.existsSync(path))
                    throw new Exceptions_1.OodleException("Missing oodle library 'oo2core_8_win64.dll'!");
                this.oodleLib = ffi.Library(path, {
                    OodleLZ_Decompress: ["int", ["uint8*", "int", "uint8*", "size_t", "int", "int", "int", "uint8*", "size_t", "void*", "void*", "void*", "size_t", "int"]],
                    OodleLZ_Compress: ["int", ["int", "uint8*", "size_t", "uint8*", "int", "void*", "size_t", "size_t", "void*", "size_t"]]
                });
            }
        }
        catch (e) {
            throw new Exceptions_1.OodleException(e);
        }
    }
}
exports.Oodle = Oodle;
/**
 * Stores the loaded .dll library
 * @type {OodleLibrary}
 * @public
 * @static
 */
Oodle.oodleLib = null;
