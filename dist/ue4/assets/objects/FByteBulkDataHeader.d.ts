import { FAssetArchive } from "../reader/FAssetArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
export declare class FByteBulkDataHeader {
    /**
     * Bulk data flags
     * @type {number}
     * @public
     */
    bulkDataFlags: number;
    /**
     * Element count
     * @type {number}
     * @public
     */
    elementCount: number;
    /**
     * Size on disk
     * @type {number}
     * @public
     */
    sizeOnDisk: number;
    /**
     * Offset in file
     * @type {number}
     * @public
     */
    offsetInFile: number;
    /**
     * Creates an instance using FAssetArchive
     * @param {FAssetArchive} Ar
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates an instance using bulkDataFlags, elementCount, sizeOnDisk & offsetInFile
     * @param {number} bulkDataFlags
     * @param {number} elementCount
     * @param {number} sizeOnDisk
     * @param {number} offsetInFile
     * @constructor
     * @public
     */
    constructor(bulkDataFlags: number, elementCount: number, sizeOnDisk: number, offsetInFile: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar FArchiveWriter to use
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Converts this to json
     * @returns {object} json
     * @public
     */
    toJson(): {
        bulkDataFlag: string;
        elementCount: number;
        sizeOnDisk: number;
        offsetInFile: number;
    };
}
