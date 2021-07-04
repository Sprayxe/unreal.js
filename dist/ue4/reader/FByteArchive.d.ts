/// <reference types="node" />
/// <reference types="ref-napi" />
import { FArchive } from "./FArchive";
/**
 * Byte Reader for UE4
 * @extends {FArchive}
 */
export declare class FByteArchive extends FArchive {
    /**
     * Creates an instance
     * @param {Buffer} data Buffer to reader
     * @constructor
     * @public
     */
    constructor(data: Buffer);
    /**
     * Clones this instance
     * @returns {FByteArchive}
     * @public
     */
    clone(): FByteArchive;
    /**
     * Returns FArchive info for error
     * @returns {string}
     * @public
     */
    printError(): string;
}
