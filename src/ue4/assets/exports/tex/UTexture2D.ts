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

export class UTexture2D extends UTexture {
    @UProperty() public LevelIndex?: number = null
    @UProperty() public FirstResourceMemMip?: number = null
    @UProperty() public bTemporarilyDisableStreaming?: boolean = null
    @UProperty() public AddressX?: ETextureAddress = null
    @UProperty() public AddressY?: ETextureAddress = null
    @UProperty() public ImportedSize?: FIntPoint = null
    public flag1: FStripDataFlags = null
    public flag2: FStripDataFlags = null
    public cooked: boolean = true
    public textures: UnrealMap<FTexturePlatformData, FName> = null

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
            throw ParserException("NameMap must contain \"None\"")
        Ar.writeFName(name)
    }
}

export enum ETextureAddress {
    TA_Wrap,
    TA_Clamp,
    TA_Mirror
}

export class FTexturePlatformData {
    public sizeX: number
    public sizeY: number
    public numSlices: number
    public pixelFormat: string
    public firstMip: number
    public mips: FTexture2DMipMap[]
    public isVirtual: boolean = false

    constructor(Ar: FAssetArchive)
    constructor(sizeX: number, sizeY: number, numSlices: number, pixelFormat: string, firstMip: number, mips: FTexture2DMipMap[], isVirtual: boolean)
    constructor(...args) {
        const arg = args[0]
        if (arg instanceof FAssetArchive) {
            this.sizeX = arg.readInt32()
            this.sizeY = arg.readInt32()
            this.numSlices = arg.readInt32()
            this.pixelFormat = arg.readString()
            this.firstMip = arg.readInt32()
            const mipCount = arg.readInt32()
            this.mips = new UnrealArray(mipCount, () => new FTexture2DMipMap(arg) )

            if (arg.game >= Game.GAME_UE4(23)) {
                this.isVirtual = arg.readBoolean()
                if (this.isVirtual) {
                    throw ParserException("Texture is virtual, not implemented")
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

    getFirstMip() {
        return this.mips[this.firstMip]
    }

    getFirstLoadedMip() {
        return this.mips.find(m => m.data.isBulkDataLoaded)
    }

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
                throw ParserException("Texture is virtual, not implemented")
        }
    }
}

export class FTexture2DMipMap {
    public cooked: boolean
    public data: FByteBulkData
    public sizeX: number
    public sizeY: number
    public sizeZ: number
    public u?: string = null

    constructor(Ar: FAssetArchive)
    constructor(cooked: boolean, data: FByteBulkData, sizeX: number, sizeY: number, sizeZ: number, u?: string)
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

    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeBoolean(this.cooked)
        this.data.serialize(Ar)
        Ar.writeInt32(this.sizeX)
        Ar.writeInt32(this.sizeY)
        Ar.writeInt32(this.sizeZ)
    }
}
