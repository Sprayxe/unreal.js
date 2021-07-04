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
exports.UMaterialInterface = exports.FMaterialTextureInfo = exports.FLightmassMaterialInterfaceSettings = void 0;
const UObject_1 = require("../UObject");
const UProperty_1 = require("../../../../util/decorators/UProperty");
const ObjectResource_1 = require("../../../objects/uobject/ObjectResource");
const EMobileSpecularMask_1 = require("../../enums/EMobileSpecularMask");
/**
 * FLightmassMaterialInterfaceSettings
 */
class FLightmassMaterialInterfaceSettings {
    constructor() {
        /**
         * EmissiveBoost
         * @type {?number}
         * @public
         */
        this.EmissiveBoost = null;
        /**
         * DiffuseBoost
         * @type {?number}
         * @public
         */
        this.DiffuseBoost = null;
        /**
         * ExportResolutionScale
         * @type {?number}
         * @public
         */
        this.ExportResolutionScale = null;
        /**
         * bCastShadowAsMasked
         * @type {?number}
         * @public
         */
        this.bCastShadowAsMasked = null;
        /**
         * bOverrideCastShadowAsMasked
         * @type {?number}
         * @public
         */
        this.bOverrideCastShadowAsMasked = null;
        /**
         * bOverrideEmissiveBoost
         * @type {?number}
         * @public
         */
        this.bOverrideEmissiveBoost = null;
        /**
         * bOverrideDiffuseBoost
         * @type {?number}
         * @public
         */
        this.bOverrideDiffuseBoost = null;
        /**
         * bOverrideExportResolutionScale
         * @type {?number}
         * @public
         */
        this.bOverrideExportResolutionScale = null;
    }
}
exports.FLightmassMaterialInterfaceSettings = FLightmassMaterialInterfaceSettings;
/**
 * FMaterialTextureInfo
 */
class FMaterialTextureInfo {
    constructor() {
        /**
         * SamplingScale
         * @type {?number}
         * @public
         */
        this.SamplingScale = null;
        /**
         * UVChannelIndex
         * @type {?number}
         * @public
         */
        this.UVChannelIndex = null;
        /**
         * TextureName
         * @type {FName}
         * @public
         */
        this.TextureName = null;
    }
}
exports.FMaterialTextureInfo = FMaterialTextureInfo;
/**
 * UMaterialInterface
 * @extends {UObject}
 * @implements {UUnrealMaterial}
 */
class UMaterialInterface extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * SubsurfaceProfile
         * @type {?FPackageIndex}
         * @public
         */
        this.SubsurfaceProfile = null; /*SubsurfaceProfile*/
        /**
         * LightmassSettings
         * @type {?FLightmassMaterialInterfaceSettings}
         * @public
         */
        this.LightmassSettings = null;
        /**
         * TextureStreamingData
         * @type {?Array<FMaterialTextureInfo>}
         * @public
         */
        this.TextureStreamingData = null;
        /**
         * AssetUserData
         * @type {?Array<FPackageIndex>}
         * @public
         */
        this.AssetUserData = null;
        // Not sure if these are in UE4
        /**
         * FlattenedTexture
         * @type {?UTexture}
         * @public
         */
        this.FlattenedTexture = null;
        /**
         * MobileBaseTexture
         * @type {?UTexture}
         * @public
         */
        this.MobileBaseTexture = null;
        /**
         * MobileNormalTexture
         * @type {?UTexture}
         * @public
         */
        this.MobileNormalTexture = null;
        /**
         * bUseMobileSpecular
         * @type {boolean}
         * @public
         */
        this.bUseMobileSpecular = false;
        /**
         * MobileSpecularPower
         * @type {number}
         * @public
         */
        this.MobileSpecularPower = 16.0;
        /**
         * MobileSpecularMask
         * @type {EMobileSpecularMask}
         * @public
         */
        this.MobileSpecularMask = EMobileSpecularMask_1.EMobileSpecularMask.MSM_Constant;
        /**
         * MobileMaskTexture
         * @type {?UTexture}
         * @public
         */
        this.MobileMaskTexture = null;
    }
    /**
     * Gets params
     * @param {CMaterialParams} params Params to modify
     * @returns {void}
     * @public
     */
    getParams(params) {
        if (this.FlattenedTexture != null)
            params.diffuse = this.FlattenedTexture;
        if (this.MobileBaseTexture != null)
            params.diffuse = this.FlattenedTexture;
        if (this.MobileNormalTexture != null)
            params.normal = this.MobileNormalTexture;
        if (this.MobileMaskTexture != null)
            params.opacity = this.MobileMaskTexture;
        params.useMobileSpecular = this.bUseMobileSpecular;
        params.mobileSpecularPower = this.MobileSpecularPower;
        params.mobileSpecularMask = this.MobileSpecularMask;
    }
    /**
     * Gets name
     * @returns {string}
     * @public
     */
    getName() {
        return this.name;
    }
    // No default in typescript interfaces
    /**
     * Whether this is texture cube
     * @returns {boolean}
     * @public
     */
    isTextureCube() {
        return false;
    }
    /**
     * Appends textures
     * @param {Array<UUnrealMaterial>} outTextures Textures to modify
     * @param {boolean} onlyRendered Whether only rendered
     * @returns {void}
     * @public
     */
    appendReferencedTextures(outTextures, onlyRendered) {
    }
}
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", ObjectResource_1.FPackageIndex)
], UMaterialInterface.prototype, "SubsurfaceProfile", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", FLightmassMaterialInterfaceSettings)
], UMaterialInterface.prototype, "LightmassSettings", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Array)
], UMaterialInterface.prototype, "TextureStreamingData", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Array)
], UMaterialInterface.prototype, "AssetUserData", void 0);
exports.UMaterialInterface = UMaterialInterface;
