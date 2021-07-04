/// <reference types="node" />
/// <reference types="ref-napi" />
import { FByteBulkDataHeader } from "./FByteBulkDataHeader";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
/**
 * FByteBulkData
 */
export declare class FByteBulkData {
    /**
     * Header of this FByteBulkData
     * @type {FByteBulkDataHeader}
     * @public
     */
    header: FByteBulkDataHeader;
    /**
     * Data of this FByteBulkData
     * @type {Buffer}
     * @public
     */
    data: Buffer;
    /**
     * Whether bulk data is loaded
     * @type {boolean}
     * @public
     */
    get isBulkDataLoaded(): boolean;
    /**
     * Creates an instance using FAssetArchive
     * @param {FAssetArchive} Ar FAssetArchive to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates an instance using FByteBulkDataHeader and Buffer
     * @param {FByteBulkDataHeader} header
     * @param {Buffer} data
     * @constructor
     * @public
     */
    constructor(header: FByteBulkDataHeader, data: Buffer);
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar FAssetArchiveWriter to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
}
