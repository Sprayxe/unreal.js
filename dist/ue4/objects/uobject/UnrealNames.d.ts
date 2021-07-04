/// <reference types="node" />
/// <reference types="ref-napi" />
import { FArchive } from "../../reader/FArchive";
/**
 * FSerializedNameHeader
 */
export declare class FSerializedNameHeader {
    /**
     * Data
     * @type {Buffer}
     * @public
     */
    data: Buffer;
    /**
     * Creates an instance using an UE4 Reader or an empty instance
     * @param {?FArchive} Ar UE4 Reader to use or null
     * @constructor
     * @public
     */
    constructor(Ar?: FArchive);
    /**
     * Whether is utf16 encoded
     * @returns {boolean} Result
     * @public
     */
    isUtf16(): boolean;
    /**
     * Gets length
     * @returns {number} Length
     * @public
     */
    len(): number;
}
/**
 * Loads name header
 * @param {FArchive} inOutAr UE4 Reader to use
 * @returns {string} Header
 * @public
 */
export declare function loadNameHeader(inOutAr: FArchive): string;
