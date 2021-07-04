"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTexture2D = exports.FTexture2DMipMap = exports.FTexturePlatformData = exports.ETextureAddress = void 0;
const UTexture_1 = require("./UTexture");
const FIntPoint_1 = require("../../../objects/core/math/FIntPoint");
const UProperty_1 = require("../../../../util/decorators/UProperty");
const UnrealMap_1 = require("../../../../util/UnrealMap");
const FName_1 = require("../../../objects/uobject/FName");
const FStripDataFlags_1 = require("../../../objects/engine/FStripDataFlags");
const FByteBulkData_1 = require("../../objects/FByteBulkData");
const FAssetArchive_1 = require("../../reader/FAssetArchive");
const UnrealArray_1 = require("../../../../util/UnrealArray");
const Exceptions_1 = require("../../../../exceptions/Exceptions");
const Game_1 = require("../../../versions/Game");
/**
 * ETextureAddress
 * @enum
 */
var ETextureAddress;
(function (ETextureAddress) {
    ETextureAddress[ETextureAddress["TA_Wrap"] = 0] = "TA_Wrap";
    ETextureAddress[ETextureAddress["TA_Clamp"] = 1] = "TA_Clamp";
    ETextureAddress[ETextureAddress["TA_Mirror"] = 2] = "TA_Mirror";
})(ETextureAddress = exports.ETextureAddress || (exports.ETextureAddress = {}));
/**
 * FTexturePlatformData
 */
class FTexturePlatformData {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        /**
         * Whether virtual
         * @type {boolean}
         * @public
         */
        this.isVirtual = false;
        const arg = args[0];
        if (arg instanceof FAssetArchive_1.FAssetArchive) {
            this.sizeX = arg.readInt32();
            this.sizeY = arg.readInt32();
            this.numSlices = arg.readInt32();
            this.pixelFormat = arg.readString();
            this.firstMip = arg.readInt32();
            const mipCount = arg.readInt32();
            this.mips = new UnrealArray_1.UnrealArray(mipCount, () => new FTexture2DMipMap(arg));
            if (arg.game >= Game_1.Game.GAME_UE4(23)) {
                this.isVirtual = arg.readBoolean();
                if (this.isVirtual) {
                    throw new Exceptions_1.ParserException("Texture is virtual, not implemented");
                }
            }
        }
        else {
            this.sizeX = arg;
            this.sizeY = args[1];
            this.numSlices = args[2];
            this.pixelFormat = args[3];
            this.firstMip = args[4];
            this.mips = args[5];
            this.isVirtual = args[6];
        }
    }
    /**
     * Gets first mip
     * @returns {FTexture2DMipMap}
     * @public
     */
    getFirstMip() {
        return this.mips[this.firstMip];
    }
    /**
     * Gets first loaded mip
     * @returns {FTexture2DMipMap}
     * @public
     */
    getFirstLoadedMip() {
        return this.mips.find(m => m.data.isBulkDataLoaded);
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt32(this.sizeX);
        Ar.writeInt32(this.sizeY);
        Ar.writeInt32(this.numSlices);
        Ar.writeString(this.pixelFormat);
        Ar.writeInt32(this.firstMip);
        Ar.writeTArray(this.mips, (it) => it.serialize(Ar));
        if (Ar.game >= Game_1.Game.GAME_UE4(23)) {
            Ar.writeBoolean(this.isVirtual);
            if (this.isVirtual)
                throw new Exceptions_1.ParserException("Texture is virtual, not implemented");
        }
    }
}
exports.FTexturePlatformData = FTexturePlatformData;
/**
 * FTexture2DMipMap
 */
class FTexture2DMipMap {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        /**
         * U
         * @type {?string}
         * @public
         */
        this.u = null;
        const arg = args[0];
        if (arg instanceof FAssetArchive_1.FAssetArchive) {
            this.cooked = arg.readBoolean();
            this.data = new FByteBulkData_1.FByteBulkData(arg);
            this.sizeX = arg.readInt32();
            this.sizeY = arg.readInt32();
            this.sizeZ = arg.readInt32();
            if (!this.cooked)
                this.u = arg.readString();
        }
        else {
            this.cooked = arg;
            this.data = args[1];
            this.sizeX = args[2];
            this.sizeY = args[3];
            this.sizeZ = args[4];
        }
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeBoolean(this.cooked);
        this.data.serialize(Ar);
        Ar.writeInt32(this.sizeX);
        Ar.writeInt32(this.sizeY);
        Ar.writeInt32(this.sizeZ);
    }
}
exports.FTexture2DMipMap = FTexture2DMipMap;
/**
 * Represents an UE4 2D Texture
 * @extends {UTexture}
 */
class UTexture2D extends UTexture_1.UTexture {
    constructor() {
        super(...arguments);
        /**
         * Level index
         * @type {?number}
         * @public
         */
        this.LevelIndex = null;
        /**
         * First resource mem mip
         * @type {?number}
         * @public
         */
        this.FirstResourceMemMip = null;
        /**
         * Whether streaming is temporarily disabled
         * @type {?boolean}
         * @public
         */
        this.bTemporarilyDisableStreaming = null;
        /**
         * X Address
         * @type {?ETextureAddress}
         * @public
         */
        this.AddressX = null;
        /**
         * Y Address
         * @type {?ETextureAddress}
         * @public
         */
        this.AddressY = null;
        /**
         * Imported size
         * @type {?FIntPoint}
         * @public
         */
        this.ImportedSize = null;
        /**
         * 1st flag
         * @type {FStripDataFlags}
         * @public
         */
        this.flag1 = null;
        /**
         * 2nd flag
         * @type {FStripDataFlags}
         * @public
         */
        this.flag2 = null;
        /**
         * Whether cooked
         * @type {boolean}
         * @public
         */
        this.cooked = true;
        /**
         * Textures
         * @type {UnrealMap<FTexturePlatformData, FName>}
         * @public
         */
        this.textures = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @param {number} validPos Valid end position
     * @returns {void}
     * @public
     */
    deserialize(Ar, validPos) {
        super.deserialize(Ar, validPos);
        this.flag1 = new FStripDataFlags_1.FStripDataFlags(Ar);
        this.flag2 = new FStripDataFlags_1.FStripDataFlags(Ar);
        this.cooked = Ar.readBoolean();
        this.textures = new UnrealMap_1.UnrealMap();
        if (this.cooked) {
            while (true) {
                const pixelFormat = Ar.readFName();
                if (pixelFormat.isNone())
                    break;
                const skipOffset = Number(Ar.readInt64());
                this.textures.set(new FTexturePlatformData(Ar), pixelFormat);
                if (Ar.relativePos() !== skipOffset) {
                    console.warn(`Texture read incorrectly. Current relative pos ${Ar.relativePos()}, skip offset ${skipOffset}`);
                    Ar.seekRelative(skipOffset);
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
        return this.getFirstTexture().getFirstMip();
    }
    /**
     * Gets first texture
     * @returns {FTexturePlatformData} Texture
     * @public
     */
    getFirstTexture() {
        const tex = this.textures.firstKey();
        if (!tex)
            throw new Error("No textures found in this UTexture2D");
        return tex;
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        super.serialize(Ar);
        this.flag1.serialize(Ar);
        this.flag2.serialize(Ar);
        Ar.writeBoolean(this.cooked);
        this.textures.forEach((pixelFormat, texture) => {
            Ar.writeFName(pixelFormat);
            const tempAr = Ar.setupByteArrayWriter();
            texture.serialize(tempAr);
            const textureData = tempAr.toByteArray();
            Ar.writeInt64(tempAr.relativePos() + 8); //new skip offset
            Ar.write(textureData);
        });
        const name = FName_1.FName.getByNameMap("None", Ar.nameMap);
        if (!name)
            throw new Exceptions_1.ParserException("NameMap must contain \"None\"", Ar);
        Ar.writeFName(name);
    }
}
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Number)
], UTexture2D.prototype, "LevelIndex", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Number)
], UTexture2D.prototype, "FirstResourceMemMip", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Boolean)
], UTexture2D.prototype, "bTemporarilyDisableStreaming", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Number)
], UTexture2D.prototype, "AddressX", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Number)
], UTexture2D.prototype, "AddressY", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", FIntPoint_1.FIntPoint)
], UTexture2D.prototype, "ImportedSize", void 0);
exports.UTexture2D = UTexture2D;
