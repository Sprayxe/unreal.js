import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
/**
 * FPakCompressedBlock
 */
export declare class FPakCompressedBlock {
    compressedStart: number;
    compressedEnd: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} compressedStart Compressed start to use
     * @param {number} compressedEnd Compressed end to use
     * @constructor
     * @public
     */
    constructor(compressedStart: number, compressedEnd: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
