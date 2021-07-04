import { FPakEntry } from "./objects/FPakEntry";
import { FPakCompressedBlock } from "./objects/FPakCompressedBlock";
export declare class GameFile {
    /**
     * Path to the file
     * @type {string}
     * @public
     */
    path: string;
    /**
     * Reader position of the file
     * @type {number}
     * @public
     */
    pos: number;
    /**
     * Size of the file
     * @type {number}
     * @public
     */
    size: number;
    /**
     * Uncompress size of the file
     * @type {number}
     * @public
     */
    uncompressedSize: number;
    /**
     * Compression method of the file
     * @type {string}
     * @public
     */
    compressionMethod: string;
    /**
     * Compressed block of the file
     * @type {Array<FPakCompressedBlock>}
     * @public
     */
    compressedBlocks: FPakCompressedBlock[];
    /**
     * Compression block size of the file
     * @type {number}
     * @public
     */
    compressionBlockSize: number;
    /**
     * Whether this file is encrypted
     * @type {boolean}
     * @public
     */
    isEncrypted: boolean;
    /**
     * Pak file name of the file
     * @type {string}
     * @public
     */
    pakFileName: string;
    /**
     * I/O Package ID of the file
     * @type {?bigint}
     * @public
     */
    ioPackageId?: bigint;
    /**
     * Creates an instance
     * @param {?FPakEntry} pakEntry Pak entry of file
     * @param {?string} mountPrefix Mount prefix of file
     * @param {?string} pakFileName Pak file name of file
     * @constructor
     * @public
     */
    constructor(pakEntry?: FPakEntry, mountPrefix?: string, pakFileName?: string);
    /**
     * Creates an instance from io store file
     * @param {string} path Path to file
     * @param {string} pakFileName Pak file name of file
     * @param {bigint} ioPackageId I/O Package ID of file
     * @public
     * @static
     */
    static createFromIoStoreFile(path: string, pakFileName: string, ioPackageId: bigint): GameFile;
    /**
     * UEXP File
     * @type {GameFile}
     * @public
     */
    uexp: GameFile;
    /**
     * UBULK File
     * @type {?GameFile}
     * @public
     */
    ubulk?: GameFile;
    /**
     * Gets extension of this file
     * @returns {string}
     * @public
     */
    getExtension(): string;
    /**
     * Whether if this is an UE4 Package
     * @returns {boolean}
     * @public
     */
    isUE4Package(): boolean;
    /**
     * Whether if this is a locres file
     * @returns {boolean}
     * @public
     */
    isLocres(): boolean;
    /**
     * Whether if this is an asset registry
     * @returns {boolean}
     * @public
     */
    isAssetRegistry(): boolean;
    /**
     * Whether if this has uexp data
     * @returns {boolean}
     * @public
     */
    hasUexp(): boolean;
    /**
     * Whether if this has ubulk data
     * @returns {boolean}
     * @public
     */
    hasUbulk(): boolean;
    /**
     * Whether if this is compressed
     * @returns {boolean}
     * @public
     */
    isCompressed(): boolean;
    /**
     * Gets path without extension
     * @returns {string}
     * @public
     */
    getPathWithoutExtension(): string;
    /**
     * Gets name of this
     * @returns {string}
     * @public
     */
    getName(): string;
    /**
     * Gets name without extension
     * @returns {string}
     * @public
     */
    getNameWithoutExtension(): string;
    /**
     * Turns this into string
     * @returns {string}
     * @public
     */
    toString(): string;
    /**
     * Whether this equals another object
     * @param {?any} other Object to check
     * @returns {boolean}
     */
    equals(other?: any): boolean;
}
