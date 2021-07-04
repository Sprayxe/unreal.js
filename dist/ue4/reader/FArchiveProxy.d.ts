import { FArchive } from "./FArchive";
/**
 * Proxy for UE4 Reader
 * @extends {FArchive}
 */
export declare class FArchiveProxy extends FArchive {
    /**
     * The FArchive
     * @type {FArchive}
     * @public
     */
    wrappedAr: FArchive;
    /**
     * Whether to use little endian
     * @type {boolean}
     * @public
     */
    littleEndian: boolean;
    /**
     * Creates an instance
     * @param {FArchive} wrappedAr FArchive instance
     * @constructor
     * @public
     */
    constructor(wrappedAr: FArchive);
    /**
     * Clones this instance
     * @returns {FArchiveProxy}
     * @public
     */
    clone(): FArchiveProxy;
    /**
     * Current position
     * @type {number}
     * @public
     */
    get pos(): number;
    set pos(pos: number);
    /**
     * Size of this reader
     * @type {number}
     * @public
     */
    get size(): number;
    /**
     * Reads an 8-bit integer
     * @returns {number} Result
     * @public
     */
    readInt8(): number;
    /**
     * Reads a 16-bit integer
     * @returns {number} Result
     * @public
     */
    readInt16(): number;
    /**
     * Reads a 32-bit integer
     * @returns {number} Result
     * @public
     */
    readInt32(): number;
    /**
     * Reads a 64-bit integer
     * @returns {number} Result
     * @public
     */
    readInt64(): bigint;
    /**
     * Reads a float
     * @returns {number} Result
     * @public
     */
    readFloat32(): number;
    /**
     * Reads a double
     * @returns {number} Result
     * @public
     */
    readDouble(): number;
    /**
     * Creates a string with FArchive info for error
     * @returns {string} Result
     * @public
     */
    printError(): string;
}
