import { FPakCompressedBlock } from "./FPakCompressedBlock";
import { FPakInfo } from "./FPakInfo";
import { FArchive } from "../../reader/FArchive";
/**
 * FPakEntry
 */
export declare class FPakEntry {
    /**
     * name
     * @type {string}
     * @public
     */
    name: string;
    /**
     * pos
     * @type {number}
     * @public
     */
    pos: number;
    /**
     * size
     * @type {number}
     * @public
     */
    size: number;
    /**
     * uncompressedSize
     * @type {number}
     * @public
     */
    uncompressedSize: number;
    /**
     * compressionMethod
     * @type {string}
     * @public
     */
    compressionMethod: string;
    /**
     * compressionBlocks
     * @type {Array<FPakCompressedBlock>}
     * @public
     */
    compressionBlocks: FPakCompressedBlock[];
    /**
     * isEncrypted
     * @type {boolean}
     * @public
     */
    isEncrypted: boolean;
    /**
     * compressionBlockSize
     * @type {number}
     * @public
     */
    compressionBlockSize: number;
    /**
     * Calculates serialized size from specified values
     * @param {?number} version Version to use
     * @param {?number} compressionMethod Compression method to use
     * @param {?number} compressionBlocksCount Compression block count to use
     * @returns {number} Calculated size
     * @public
     * @static
     */
    static getSerializedSize(version: number, compressionMethod?: number, compressionBlocksCount?: number): number;
    /**
     * Creates an instance using values
     * @param {?FArchive} Ar UE4 Reader to use
     * @param {?FPakInfo} pakInfo Pak info
     * @param {?boolean} inIndex Whether in index
     * @constructor
     * @public
     */
    constructor(Ar?: FArchive, pakInfo?: FPakInfo, inIndex?: boolean);
}
