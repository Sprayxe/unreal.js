import * as ffi from "ffi-napi"
import { OodleException } from "./Exceptions";
import Memory = WebAssembly.Memory;

export class Oodle {
    static oodleLib: OodleLibrary = null

    /**
     * Decompresses an Oodle compressed array
     * @param src the compressed source data
     * @param dstLen the uncompressed length
     * @return the decompressed data
     * @throws {DecompressException} when the decompression fails
     */
    static decompress(src: Buffer, dstLen: number)

    /**
     * Decompresses an Oodle compressed array
     * @param src the compressed source data
     * @param srcOff the offset into `src`
     * @param srcLen the compressed length
     * @param dstOff the offset into `dst`
     * @param dstLen the uncompressed length
     * @throws {DecompressException} when the decompression fails
     * @throws {SyntaxError} when the library could not be loaded
     */
    static decompress(src: Buffer, srcOff: number, srcLen: number, dstOff: number, dstLen: number)
    static decompress(...params) {
        this.ensureLib()
        if (!params[2]) {
            const src = params[0]
            return this.decompress(src, 0, src.length, 0, params[1])
        } else {
            const start = Date.now()
            // TODO const sourcePointer
        }
    }

    /**
     * Compresses a byte array
     * @param uncompressed the uncompressed source data
     * @param compressor the compressor to use
     * @param compressionLevel the compression level to use
     * @return the compressed data
     * @throws CompressException when the compression fails
     * @throws IllegalStateException when the library could not be loaded
     */
    static compress(uncompressed: Buffer, compressor: number, compressionLevel: number) {
        this.ensureLib()
    }

    static ensureLib() {
        try {
            if (!this.oodleLib) {
                this.oodleLib = ffi.Library("oo2core_8_win64.dll", {
                    OodleLZ_Decompress: ["uint8*", ["int", "uint8*", "size_t", "int", "int", "int", "uint8*", "size_t", "void*", "void*", "void*", "size_t", "int"]]
                })
            }
        } catch (e) {
            throw OodleException(e)
        }
    }
}

interface OodleLibrary {
    OodleLZ_Decompress(...params)
    OodleLZ_Compress(...params)
}