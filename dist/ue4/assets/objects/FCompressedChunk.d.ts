import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
export declare class FCompressedChunk {
    /**
     * Uncompressed offset
     * @type {number}
     * @public
     */
    uncompressedOffset: number;
    /**
     * Uncompressed size
     * @type {number}
     * @public
     */
    uncompressedSize: number;
    /**
     * Compressed offset
     * @type {number}
     * @public
     */
    compressedOffset: number;
    /**
     * Compressed size
     * @type {number}
     * @public
     */
    compressedSize: number;
    /**
     * Creates an instance using FArchive
     * @param {FArchive} Ar FArchive to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using uncompressedOffset, uncompressedSize, compressedOffset & compressedSize
     * @param {number} uncompressedOffset
     * @param {number} uncompressedSize
     * @param {number} compressedOffset
     * @param {number} compressedSize
     * @constructor
     * @public
     */
    constructor(uncompressedOffset: number, uncompressedSize: number, compressedOffset: number, compressedSize: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar FArchiveWriter to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
