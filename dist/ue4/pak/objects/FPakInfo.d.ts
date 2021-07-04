/// <reference types="node" />
/// <reference types="ref-napi" />
import { FArchive } from "../../reader/FArchive";
import { FGuid } from "../../objects/core/misc/Guid";
import { EPakVersion } from "../enums/PakVersion";
/**
 * OffsetsToTry
 * @enum
 */
declare enum OffsetsToTry {
    size = 61,
    size8_1 = 93,
    size8_2 = 125,
    size8_3 = 157,
    size8 = 189,
    size8a = 221,
    size9 = 222,
    sizeLast = 223,
    sizeMax = 222
}
/**
 * FPakInfo
 */
export declare class FPakInfo {
    /**
     * PAK_MAGIC
     * @type {number}
     * @public
     * @static
     */
    static readonly PAK_MAGIC = 1517228769;
    /**
     * Offsets to try
     * @type {Array<OffsetsToTry>}
     * @private
     */
    private static readonly _offsetsToTry;
    /**
     * Reads pak info
     * @param {FArchive} Ar UE4 Reader to use
     * @returns {FPakInfo} Instance
     * @public
     */
    static readPakInfo(Ar: FArchive): FPakInfo;
    /**
     * magic
     * @type {number}
     * @public
     */
    magic: number;
    /**
     * encryptionKeyGuid
     * @type {FGuid}
     * @public
     */
    encryptionKeyGuid: FGuid;
    /**
     * encryptedIndex
     * @type {boolean}
     * @public
     */
    encryptedIndex: boolean;
    /**
     * version
     * @type {EPakVersion}
     * @public
     */
    version: EPakVersion;
    /**
     * indexOffset
     * @type {number}
     * @public
     */
    indexOffset: number;
    /**
     * indexSize
     * @type {number}
     * @public
     */
    indexSize: number;
    /**
     * indexHash
     * @type {Buffer}
     * @public
     */
    indexHash: Buffer;
    /**
     * compressionMethods
     * @type {Array<string>}
     * @public
     */
    compressionMethods: string[];
    /**
     * indexIsFrozen
     * @type {boolean}
     * @public
     */
    indexIsFrozen: boolean;
    /**
     * Creates an instance using values
     * @param {FArchive} Ar UE4 Reader to use
     * @param {OffsetsToTry} offsetToTry Offset to try
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, offsetToTry: OffsetsToTry);
}
export {};
