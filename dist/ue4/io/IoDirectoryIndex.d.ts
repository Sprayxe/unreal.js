/// <reference types="node" />
/// <reference types="ref-napi" />
import { FArchive } from "../reader/FArchive";
import { FIoDirectoryIndexHandle } from "./IoDispatcher";
/**
 * FIoDirectoryIndexEntry
 */
export declare class FIoDirectoryIndexEntry {
    /**
     * name
     * @type {number}
     * @public
     */
    name: number;
    /**
     * firstChildEntry
     * @type {number}
     * @public
     */
    firstChildEntry: number;
    /**
     * nextSiblingEntry
     * @type {number}
     * @public
     */
    nextSiblingEntry: number;
    /**
     * firstFileEntry
     * @type {number}
     * @public
     */
    firstFileEntry: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FIoFileIndexEntry
 */
export declare class FIoFileIndexEntry {
    /**
     * name
     * @type {number}
     * @public
     */
    name: number;
    /**
     * nextFileEntry
     * @type {number}
     * @public
     */
    nextFileEntry: number;
    /**
     * userData
     * @type {number}
     * @public
     */
    userData: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FIoDirectoryIndexResource
 */
export declare class FIoDirectoryIndexResource {
    /**
     * mountPoint
     * @type {string}
     * @public
     */
    mountPoint: string;
    /**
     * directoryEntries
     * @type {Array<FIoDirectoryIndexEntry>}
     * @public
     */
    directoryEntries: FIoDirectoryIndexEntry[];
    /**
     * fileEntries
     * @type {Array<FIoFileIndexEntry>}
     * @public
     */
    fileEntries: FIoFileIndexEntry[];
    /**
     * stringTable
     * @type {Array<string>}
     * @public
     */
    stringTable: string[];
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FDirectoryIndexVisitorFunction
 */
declare type FDirectoryIndexVisitorFunction = (filename: string, tocEntryIndex: number) => boolean;
/**
 * FIoDirectoryIndexReader
 */
export declare class FIoDirectoryIndexReader {
    /**
     * Buffer to read
     * @type {Buffer}
     * @public
     */
    buffer: Buffer;
    /**
     * Decryption key to use
     * @type {Buffer}
     * @public
     */
    decryptionKey: Buffer;
    /**
     * Creates an instance using buffers
     * @param {Buffer} buffer Buffer to read
     * @param {Buffer} decryptionKey Decryption key to use
     * @constructor
     * @public
     */
    constructor(buffer: Buffer, decryptionKey: Buffer);
    /**
     * directoryIndex
     * @type {FIoDirectoryIndexResource}
     * @public
     */
    get directoryIndex(): FIoDirectoryIndexResource;
    /**
     * mountPoint
     * @type {string}
     * @public
     */
    get mountPoint(): string;
    /**
     * Gets child directory
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} Child directory
     * @public
     */
    getChildDirectory(directory: FIoDirectoryIndexHandle): FIoDirectoryIndexHandle;
    /**
     * Gets next directory
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} Next directory
     * @public
     */
    getNextDirectory(directory: FIoDirectoryIndexHandle): FIoDirectoryIndexHandle;
    /**
     * Gets file
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} File
     * @public
     */
    getFile(directory: FIoDirectoryIndexHandle): FIoDirectoryIndexHandle;
    /**
     * Gets next file
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} File
     * @public
     */
    getNextFile(directory: FIoDirectoryIndexHandle): FIoDirectoryIndexHandle;
    /**
     * Gets directory name
     * @param {FIoDirectoryIndexHandle} directory Directory to get name from
     * @returns {string} Directory name
     * @public
     */
    getDirectoryName(directory: FIoDirectoryIndexHandle): string;
    /**
     * Gets file name
     * @param {FIoDirectoryIndexHandle} directory Directory of file to get name from
     * @returns {string} File name
     * @public
     */
    getFileName(directory: FIoDirectoryIndexHandle): string;
    /**
     * Gets file data
     * @param {FIoDirectoryIndexHandle} file File to get data from
     * @returns {number} Data
     * @public
     */
    getFileData(file: FIoDirectoryIndexHandle): number;
    /**
     * Iterates through directory index
     * @param {FIoDirectoryIndexHandle} directoryIndexHandle Directory to iterate through
     * @param {string} path Path to directory
     * @param {FDirectoryIndexVisitorFunction} visit Method to call
     * @returns {boolean}
     * @public
     */
    iterateDirectoryIndex(directoryIndexHandle: FIoDirectoryIndexHandle, path: string, visit: FDirectoryIndexVisitorFunction): boolean;
    /**
     * Gets directory entry
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexEntry} Entry
     * @private
     */
    private getDirectoryEntry;
    /**
     * Gets file entry
     * @param {FIoDirectoryIndexHandle} file File to look in
     * @returns {FIoFileIndexEntry} Entry
     * @private
     */
    private getFileEntry;
    /**
     * Whether valid index
     * @returns {boolean} Result
     * @private
     */
    private isValidIndex;
}
export {};
