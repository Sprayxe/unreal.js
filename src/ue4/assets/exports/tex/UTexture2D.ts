import { UTexture } from "./UTexture";
import { FIntPoint } from "../../../objects/core/math/FIntPoint";
import { UProperty } from "../../../../util/decorators/UProperty";
import { UnrealMap } from "../../../../util/UnrealMap";
import { FName } from "../../../objects/uobject/FName";
import { FStripDataFlags } from "../../../objects/engine/FStripDataFlags";
import { FByteBulkData } from "../../objects/FByteBulkData";
import { FAssetArchive } from "../../reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../writer/FAssetArchiveWriter";
import { UnrealArray } from "../../../../util/UnrealArray";
import { ParserException } from "../../../../exceptions/Exceptions";
import { Game } from "../../../versions/Game";

/**
 * ETextureAddress
 * @enum
 */
export enum ETextureAddress {
    TA_Wrap,
    TA_Clamp,
    TA_Mirror
}

/**
 * FTexturePlatformData
 */
export class FTexturePlatformData {
    /**
     * X Size
     * @type {number}
     * @public
     */
    public sizeX: number

    /**
     * Y Size
     * @type {number}
     * @public
     */
    public sizeY: number

    /**
     * Amount of slices
     * @type {number}
     * @public
     */
    public numSlices: number

    /**
     * Pixel format
     * @type {string}
     * @public
     */
    public pixelFormat: string

    /**
     * Index of first mip
     * @type {number}
     * @see {mips}
     * @see {getFirstMip}
     * @public
     */
    public firstMip: number

    /**
     * Mips
     * @type {Array<FTexture2DMipMap>}
     * @public
     */
    public mips: FTexture2DMipMap[]

    /**
     * Wether virtual
     * @type {boolean}
     * @public
     */
    public isVirtual: boolean = false

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive)

    /**
     * Creates an instance using values
     * @param {number} sizeX X Size
     * @param {number} sizeY Y Size
     * @param {number} numSlices Amount of slices
     * @param {string} pixelFormat Pixel format
     * @param {number} firstMip Index of first mip
     * @param {Array<FTexture2DMipMap>} mips Mips
     * @param {boolean} isVirtual Wether virtual
     * @constructor
     * @public
     */
    constructor(sizeX: number, sizeY: number, numSlices: number, pixelFormat: string, firstMip: number, mips: FTexture2DMipMap[], isVirtual: boolean)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg = args[0]
        if (arg instanceof FAssetArchive) {
            this.sizeX = arg.readInt32()
            this.sizeY = arg.readInt32()
            this.numSlices = arg.readInt32()
            this.pixelFormat = arg.readString()
            this.firstMip = arg.readInt32()
            const mipCount = arg.readInt32()
            this.mips = new UnrealArray(mipCount, () => new FTexture2DMipMap(arg))

            if (arg.game >= Game.GAME_UE4(23)) {
                this.isVirtual = arg.readBoolean()
                if (this.isVirtual) {
                    throw new ParserException("Texture is virtual, not implemented")
                }
            }
        } else {
            this.sizeX = arg
            this.sizeY = args[1]
            this.numSlices = args[2]
            this.pixelFormat = args[3]
            this.firstMip = args[4]
            this.mips = args[5]
            this.isVirtual = args[6]
        }
    }

    /**
     * Gets first mip
     * @returns {FTexture2DMipMap}
     * @public
     */
    getFirstMip() {
        return this.mips[this.firstMip]
    }

    /**
     * Gets first loaded mip
     * @returns {FTexture2DMipMap}
     * @public
     */
    getFirstLoadedMip() {
        return this.mips.find(m => m.data.isBulkDataLoaded)
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeInt32(this.sizeX)
        Ar.writeInt32(this.sizeY)
        Ar.writeInt32(this.numSlices)
        Ar.writeString(this.pixelFormat)
        Ar.writeInt32(this.firstMip)
        Ar.writeTArray(this.mips, (it) => it.serialize(Ar))
        if (Ar.game >= Game.GAME_UE4(23)) {
            Ar.writeBoolean(this.isVirtual)
            if (this.isVirtual)
                throw new ParserException("Texture is virtual, not implemented")
        }
    }
}

/**
 * FTexture2DMipMap
 */
export class FTexture2DMipMap {
    /**
     * Wether cooked
     * @type {boolean}
     * @public
     */
    public cooked: boolean

    /**
     * Data
     * @type {FByteBulkData}
     * @public
     */
    public data: FByteBulkData

    /**
     * X Size
     * @type {number}
     * @public
     */
    public sizeX: number

    /**
     * Y Size
     * @type {number}
     * @public
     */
    public sizeY: number

    /**
     * Z Size
     * @type {number}
     * @public
     */
    public sizeZ: number

    /**
     * U
     * @type {?string}
     * @public
     */
    public u?: string = null

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive)

    /**
     * Creates an instance using values
     * @param {boolean} cooked Wether cooked
     * @param {FByteBulkData} data Data
     * @param {number} sizeX X Size
     * @param {number} sizeY Y Size
     * @param {number} sizeZ Z Size
     * @param {?string} u U
     * @constructor
     * @public
     */
    constructor(cooked: boolean, data: FByteBulkData, sizeX: number, sizeY: number, sizeZ: number, u?: string)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg = args[0]
        if (arg instanceof FAssetArchive) {
            this.cooked = arg.readBoolean()
            this.data = new FByteBulkData(arg)
            this.sizeX = arg.readInt32()
            this.sizeY = arg.readInt32()
            this.sizeZ = arg.readInt32()
            if (!this.cooked)
                this.u = arg.readString()
        } else {
            this.cooked = arg
            this.data = args[1]
            this.sizeX = args[2]
            this.sizeY = args[3]
            this.sizeZ = args[4]
        }
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeBoolean(this.cooked)
        this.data.serialize(Ar)
        Ar.writeInt32(this.sizeX)
        Ar.writeInt32(this.sizeY)
        Ar.writeInt32(this.sizeZ)
    }
}

/**
 * Represents an UE4 2D Texture
 * @extends {UTexture}
 */
export class UTexture2D extends UTexture {
    /**
     * Level index
     * @type {?number}
     * @public
     */
    @UProperty() public LevelIndex?: number = null

    /**
     * First resource mem mip
     * @type {?number}
     * @public
     */
    @UProperty() public FirstResourceMemMip?: number = null

    /**
     * Wether streaming is temporarily disabled
     * @type {?boolean}
     * @public
     */
    @UProperty() public bTemporarilyDisableStreaming?: boolean = null

    /**
     * X Address
     * @type {?ETextureAddress}
     * @public
     */
    @UProperty() public AddressX?: ETextureAddress = null

    /**
     * Y Address
     * @type {?ETextureAddress}
     * @public
     */
    @UProperty() public AddressY?: ETextureAddress = null

    /**
     * Imported size
     * @type {?FIntPoint}
     * @public
     */
    @UProperty() public ImportedSize?: FIntPoint = null

    /**
     * 1st flag
     * @type {FStripDataFlags}
     * @public
     */
    public flag1: FStripDataFlags = null

    /**
     * 2nd flag
     * @type {FStripDataFlags}
     * @public
     */
    public flag2: FStripDataFlags = null

    /**
     * Wether cooked
     * @type {boolean}
     * @public
     */
    public cooked: boolean = true

    /**
     * Textures
     * @type {UnrealMap<FTexturePlatformData, FName>}
     * @public
     */
    public textures: UnrealMap<FTexturePlatformData, FName> = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @param {number} validPos Valid end position
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)
        this.flag1 = new FStripDataFlags(Ar)
        this.flag2 = new FStripDataFlags(Ar)
        this.cooked = Ar.readBoolean()
        this.textures = new UnrealMap<FTexturePlatformData, FName>()
        if (this.cooked) {
            while (true) {
                const pixelFormat = Ar.readFName()
                if (pixelFormat.isNone()) break
                const skipOffset = Number(Ar.readInt64())
                this.textures.set(new FTexturePlatformData(Ar), pixelFormat)
                if (Ar.relativePos() !== skipOffset) {
                    console.warn(`Texture read incorrectly. Current relative pos ${Ar.relativePos()}, skip offset ${skipOffset}`)
                    Ar.seekRelative(skipOffset)
                }
            }
        }
    }

    /**
     * Gets first mip
     * @returns {FTexture2DMipMap} Mip
     * @public
     */
    getFirstMip() {
        return this.getFirstTexture().getFirstMip()
    }

    /**
     * Gets first texture
     * @returns {FTexturePlatformData} Texture
     * @public
     */
    getFirstTexture() {
        const tex = this.textures.firstKey()
        if (!tex) throw new Error("No textures found in this UTexture2D")
        return tex
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        super.serialize(Ar)
        this.flag1.serialize(Ar)
        this.flag2.serialize(Ar)
        Ar.writeBoolean(this.cooked)
        this.textures.forEach((pixelFormat, texture) => {
            Ar.writeFName(pixelFormat)
            const tempAr = Ar.setupByteArrayWriter()
            texture.serialize(tempAr)
            const textureData = tempAr.toByteArray()
            Ar.writeInt64(tempAr.relativePos() + 8) //new skip offset
            Ar.write(textureData)
        })
        const name = FName.getByNameMap("None", Ar.nameMap)
        if (!name)
            throw new ParserException("NameMap must contain \"None\"", Ar)
        Ar.writeFName(name)
    }
}
