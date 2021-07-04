import { UTexture } from "./UTexture";
import { FIntPoint } from "../../../objects/core/math/FIntPoint";
import { UnrealMap } from "../../../../util/UnrealMap";
import { FName } from "../../../objects/uobject/FName";
import { FStripDataFlags } from "../../../objects/engine/FStripDataFlags";
import { FByteBulkData } from "../../objects/FByteBulkData";
import { FAssetArchive } from "../../reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../writer/FAssetArchiveWriter";
/**
 * ETextureAddress
 * @enum
 */
export declare enum ETextureAddress {
    TA_Wrap = 0,
    TA_Clamp = 1,
    TA_Mirror = 2
}
/**
 * FTexturePlatformData
 */
export declare class FTexturePlatformData {
    /**
     * X Size
     * @type {number}
     * @public
     */
    sizeX: number;
    /**
     * Y Size
     * @type {number}
     * @public
     */
    sizeY: number;
    /**
     * Amount of slices
     * @type {number}
     * @public
     */
    numSlices: number;
    /**
     * Pixel format
     * @type {string}
     * @public
     */
    pixelFormat: string;
    /**
     * Index of first mip
     * @type {number}
     * @see {mips}
     * @see {getFirstMip}
     * @public
     */
    firstMip: number;
    /**
     * Mips
     * @type {Array<FTexture2DMipMap>}
     * @public
     */
    mips: FTexture2DMipMap[];
    /**
     * Whether virtual
     * @type {boolean}
     * @public
     */
    isVirtual: boolean;
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates an instance using values
     * @param {number} sizeX X Size
     * @param {number} sizeY Y Size
     * @param {number} numSlices Amount of slices
     * @param {string} pixelFormat Pixel format
     * @param {number} firstMip Index of first mip
     * @param {Array<FTexture2DMipMap>} mips Mips
     * @param {boolean} isVirtual Whether virtual
     * @constructor
     * @public
     */
    constructor(sizeX: number, sizeY: number, numSlices: number, pixelFormat: string, firstMip: number, mips: FTexture2DMipMap[], isVirtual: boolean);
    /**
     * Gets first mip
     * @returns {FTexture2DMipMap}
     * @public
     */
    getFirstMip(): FTexture2DMipMap;
    /**
     * Gets first loaded mip
     * @returns {FTexture2DMipMap}
     * @public
     */
    getFirstLoadedMip(): FTexture2DMipMap;
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
}
/**
 * FTexture2DMipMap
 */
export declare class FTexture2DMipMap {
    /**
     * Whether cooked
     * @type {boolean}
     * @public
     */
    cooked: boolean;
    /**
     * Data
     * @type {FByteBulkData}
     * @public
     */
    data: FByteBulkData;
    /**
     * X Size
     * @type {number}
     * @public
     */
    sizeX: number;
    /**
     * Y Size
     * @type {number}
     * @public
     */
    sizeY: number;
    /**
     * Z Size
     * @type {number}
     * @public
     */
    sizeZ: number;
    /**
     * U
     * @type {?string}
     * @public
     */
    u?: string;
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates an instance using values
     * @param {boolean} cooked Whether cooked
     * @param {FByteBulkData} data Data
     * @param {number} sizeX X Size
     * @param {number} sizeY Y Size
     * @param {number} sizeZ Z Size
     * @param {?string} u U
     * @constructor
     * @public
     */
    constructor(cooked: boolean, data: FByteBulkData, sizeX: number, sizeY: number, sizeZ: number, u?: string);
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
}
/**
 * Represents an UE4 2D Texture
 * @extends {UTexture}
 */
export declare class UTexture2D extends UTexture {
    /**
     * Level index
     * @type {?number}
     * @public
     */
    LevelIndex?: number;
    /**
     * First resource mem mip
     * @type {?number}
     * @public
     */
    FirstResourceMemMip?: number;
    /**
     * Whether streaming is temporarily disabled
     * @type {?boolean}
     * @public
     */
    bTemporarilyDisableStreaming?: boolean;
    /**
     * X Address
     * @type {?ETextureAddress}
     * @public
     */
    AddressX?: ETextureAddress;
    /**
     * Y Address
     * @type {?ETextureAddress}
     * @public
     */
    AddressY?: ETextureAddress;
    /**
     * Imported size
     * @type {?FIntPoint}
     * @public
     */
    ImportedSize?: FIntPoint;
    /**
     * 1st flag
     * @type {FStripDataFlags}
     * @public
     */
    flag1: FStripDataFlags;
    /**
     * 2nd flag
     * @type {FStripDataFlags}
     * @public
     */
    flag2: FStripDataFlags;
    /**
     * Whether cooked
     * @type {boolean}
     * @public
     */
    cooked: boolean;
    /**
     * Textures
     * @type {UnrealMap<FTexturePlatformData, FName>}
     * @public
     */
    textures: UnrealMap<FTexturePlatformData, FName>;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @param {number} validPos Valid end position
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
    /**
     * Gets first mip
     * @returns {FTexture2DMipMap} Mip
     * @public
     */
    getFirstMip(): FTexture2DMipMap;
    /**
     * Gets first texture
     * @returns {FTexturePlatformData} Texture
     * @public
     */
    getFirstTexture(): FTexturePlatformData;
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
}
