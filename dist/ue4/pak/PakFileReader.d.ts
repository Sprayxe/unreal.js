/// <reference types="node" />
/// <reference types="ref-napi" />
import { FPakInfo } from "./objects/FPakInfo";
import { GameFile } from "./GameFile";
import { FArchive } from "../reader/FArchive";
import Collection from "@discordjs/collection";
/**
 * UE4 Pak File Reader
 */
export declare class PakFileReader {
    /**
     * Path to file
     * @type {string}
     * @public
     */
    path: string;
    /**
     * UE4 Reader
     * @type {FArchive}
     * @public
     */
    Ar: FArchive;
    /**
     * Game that is used
     * @type {number}
     * @public
     */
    game: number;
    /**
     * Info about pak
     * @type {FPakInfo}
     * @public
     */
    pakInfo: FPakInfo;
    /**
     * Aes key for pak
     * @type {?Buffer}
     * @public
     */
    aesKey: Buffer;
    /**
     * Mount point for pak
     * @type {string}
     * @public
     */
    mountPoint: string;
    /**
     * Amount of encrypted files
     * @type {number}
     * @public
     */
    encryptedFileCount: number;
    /**
     * Files in this pak
     * @type {Collection<string, GameFile>}
     * @public
     */
    files: Collection<string, GameFile>;
    /**
     * Creates an instance
     * @param {string} path Path to file
     * @param {?number} game Game that is used
     * @constructor
     * @public
     */
    constructor(path: string, game?: number);
    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString(): string;
    /**
     * Whether if it is encrypted or not
     * @returns {boolean}
     * @public
     */
    isEncrypted(): boolean;
    /**
     * Extracts a file
     * @param {GameFile} gameFile File to extract
     * @returns {Buffer}
     * @public
     */
    extract(gameFile: GameFile): Buffer;
    /**
     * Reads index of pak
     * @returns {Map<string, GameFile>} Files
     * @public
     */
    readIndex(): Map<string, GameFile>;
    /**
     * Reads index of old pak
     * @returns {Map<string, GameFile>} Files
     * @public
     */
    private readIndexLegacy;
    /**
     * Reads index of new pak
     * @returns {Map<string, GameFile>} Files
     * @public
     */
    private readIndexUpdated;
    /**
     * Reads bit entry
     * @param {FByteArchive} Ar Reader to use
     * @returns {FPakEntry} Entry
     * @private
     */
    private readBitEntry;
    /**
     * Replaces a file extension
     * @param {string} k Source
     * @param {string} v Replacement
     * @returns {string}
     * @private
     * @static
     */
    private static extension;
    /**
     * Reads and decrypts data
     * @param {number} num Amount of bytes to read
     * @param {boolean} isEncrypted Whether if those are encrypted
     * @returns {Buffer} Bytes
     * @private
     */
    private readAndDecrypt;
    /**
     * Fixes a mount point
     * @param {string} mountPoint Current mount point
     * @returns {string}
     * @private
     */
    private fixMountPoint;
    /**
     * Checks index bytes
     * @returns {Buffer} Index bytes
     * @public
     */
    indexCheckBytes(): Buffer;
    /**
     * Tests if an aes key works
     * @param {string} key Aes key to test
     * @returns {boolean}
     * @public
     */
    testAesKey(key: string): any;
    /**
     * Tests if an aes key works
     * @param {Buffer} key Aes key to test
     * @returns {boolean}
     * @public
     */
    testAesKey(key: Buffer): any;
    /**
     * Tests if an aes key works with specified bytes
     * @param {Buffer} bytes Bytes to test
     * @param {Buffer} key Key to test
     * @returns {boolean}
     * @public
     */
    testAesKey(bytes: Buffer, key: Buffer): any;
    /**
     * Whether if pak has valid index
     * @param {Buffer} bytes Bytes to read from
     * @returns {boolean} Result
     * @public
     */
    isValidIndex(bytes: Buffer): boolean;
}
