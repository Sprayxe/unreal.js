import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

export class FCompressedChunk {
    /**
     * Uncompressed offset
     * @type {number}
     * @public
     */
    uncompressedOffset: number

    /**
     * Uncompressed size
     * @type {number}
     * @public
     */
    uncompressedSize: number

    /**
     * Compressed offset
     * @type {number}
     * @public
     */
    compressedOffset: number

    /**
     * Compressed size
     * @type {number}
     * @public
     */
    compressedSize: number

    /**
     * Creates an instance using FArchive
     * @param {FArchive} Ar FArchive to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using uncompressedOffset, uncompressedSize, compressedOffset & compressedSize
     * @param {number} uncompressedOffset
     * @param {number} uncompressedSize
     * @param {number} compressedOffset
     * @param {number} compressedSize
     * @constructor
     * @public
     */
    constructor(uncompressedOffset: number, uncompressedSize: number, compressedOffset: number, compressedSize: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        if (params[0] instanceof FArchive) {
            const Ar = params[0]
            this.uncompressedOffset = Ar.readInt32()
            this.uncompressedSize = Ar.readInt32()
            this.compressedOffset = Ar.readInt32()
            this.compressedSize = Ar.readInt32()
        } else {
            this.uncompressedOffset = params[0]
            this.uncompressedSize = params[1]
            this.compressedOffset = params[2]
            this.compressedSize = params[3]
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar FArchiveWriter to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.uncompressedOffset)
        Ar.writeInt32(this.uncompressedSize)
        Ar.writeInt32(this.compressedOffset)
        Ar.writeInt32(this.compressedSize)
    }
}