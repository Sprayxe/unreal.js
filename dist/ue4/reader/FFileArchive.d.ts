/// <reference types="node" />
/// <reference types="ref-napi" />
import { Stats } from "fs";
import { FArchive } from "./FArchive";
/**
 * File Reader
 * @extends {FArchive}
 */
export declare class FFileArchive extends FArchive {
    /**
     * Path to the file
     * @type {string}
     * @public
     */
    path: string;
    /**
     * FS handle id
     * @type {number}
     * @public
     */
    handle: number;
    /**
     * FS Stats
     * @type {Stats}
     * @public
     */
    stats: Stats;
    /**
     * Creates an instance
     * @param {string} path Path to the file
     * @constructor
     * @public
     */
    constructor(path: string);
    /**
     * Size of the reader
     * @type {number}
     * @public
     */
    get size(): number;
    /**
     * Reads a range of bytes
     * @param {number} begin Where to begin
     * @param {number} end Where to stop
     * @param {boolean} copy Whether to remove bytes from buffer
     */
    readRange(begin: number, end: number, copy?: boolean): Buffer;
    /**
     * Reads an 8-bit integer
     * @returns {number} Result
     * @public
     */
    readInt8(): number;
    /**
     * Reads an unsigned 8-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt8(): number;
    /**
     * Reads a 16-bit integer
     * @returns {number} Result
     * @public
     */
    readInt16(): number;
    /**
     * Reads an unsigned 16-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt16(): number;
    /**
     * Reads a 32-bit integer
     * @returns {number} Result
     * @public
     */
    readInt32(): number;
    /**
     * Reads an unsigned 32-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt32(): number;
    /**
     * Reads a 64-bit integer
     * @returns {number} Result
     * @public
     */
    readInt64(): bigint;
    /**
     * Reads an unsigned 64-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt64(): bigint;
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
     * Returns FArchive info for error
     * @returns {string}
     * @public
     */
    printError(): string;
}
