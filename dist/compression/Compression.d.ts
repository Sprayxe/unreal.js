/// <reference types="node" />
/// <reference types="ref-napi" />
import Collection from "@discordjs/collection";
/**
 * Class to handle compression quickly
 */
export declare class Compression {
    /**
     * Stores compression handlers
     * @type {Collection<string, CompressionHandler>}
     * @static
     * @public
     */
    static handlers: Collection<string, CompressionHandler>;
    /**
     * Initiates the compression class
     * @returns {void}
     * @private
     * @static
     */
    private static init;
    /**
     * Uncompresses a buffer
     * @param {string} formatName Name of compression to use
     * @param {Buffer} compressedBuffer The buffer to decompress
     * @param {Buffer} uncompressedSize The size of the uncompress buffer
     * @returns {void}
     * @public
     */
    static uncompress0(formatName: string, compressedBuffer: Buffer, uncompressedSize: number): Buffer;
    /**
     * Uncompresses a buffer
     * @param {string} formatName Name of compression to use
     * @param {Buffer} compressedBuffer The buffer to decompress
     * @param {Buffer} uncompressedBuffer A buffer allocated for the decompressed data
     * @returns {void}
     * @public
     */
    static uncompress1(formatName: string, compressedBuffer: Buffer, uncompressedBuffer: Buffer): void;
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
    static uncompress(formatName: string, uncompressedBuffer: Buffer, uncompressedBufferOff: number, uncompressedSize: number, compressedBuffer: Buffer, compressedBufferOff: number, compressedSize: number): void;
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
    decompress?(dst: Buffer, dstOff: number, dstLen: number, src: Buffer, srcOff: number, srcLen: number): void;
}
