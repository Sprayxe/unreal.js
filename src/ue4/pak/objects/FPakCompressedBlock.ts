import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

/**
 * FPakCompressedBlock
 */
export class FPakCompressedBlock {
    public compressedStart: number
    public compressedEnd: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {number} compressedStart Compressed start to use
     * @param {number} compressedEnd Compressed end to use
     * @constructor
     * @public
     */
    constructor(compressedStart: number, compressedEnd: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.compressedStart = Number(x.readInt64())
            this.compressedEnd = Number(x.readInt64())
        } else {
            this.compressedStart = x
            this.compressedEnd = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeInt64(this.compressedStart)
        Ar.writeInt64(this.compressedEnd)
    }
}