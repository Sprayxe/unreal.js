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
exports.UMaterialInstance = exports.FStaticMaterialLayersParameter = exports.FMaterialLayersFunctions = exports.FStaticTerrainLayerWeightParameter = exports.FStaticComponentMaskParameter = exports.FStaticSwitchParameter = exports.FStaticParameterBase = exports.FStaticParameterSet = exports.FMaterialInstanceBasePropertyOverrides = exports.FFontParameterValue = exports.FRuntimeVirtualTextureParameterValue = exports.FTextureParameterValue = exports.FVectorParameterValue = exports.FScalarParameterValue = exports.EMaterialParameterAssociation = exports.FMaterialParameterInfo = void 0;
const UMaterialInterface_1 = require("./UMaterialInterface");
const UProperty_1 = require("../../../../util/decorators/UProperty");
/**
 * FMaterialParameterInfo
 */
class FMaterialParameterInfo {
}
exports.FMaterialParameterInfo = FMaterialParameterInfo;
/**
 * EMaterialParameterAssociation
 * @enum
 */
var EMaterialParameterAssociation;
(function (EMaterialParameterAssociation) {
    EMaterialParameterAssociation[EMaterialParameterAssociation["LayerParameter"] = 0] = "LayerParameter";
    EMaterialParameterAssociation[EMaterialParameterAssociation["BlendParameter"] = 1] = "BlendParameter";
    EMaterialParameterAssociation[EMaterialParameterAssociation["GlobalParameter"] = 2] = "GlobalParameter";
})(EMaterialParameterAssociation = exports.EMaterialParameterAssociation || (exports.EMaterialParameterAssociation = {}));
/**
 * FScalarParameterValue
 */
class FScalarParameterValue {
}
exports.FScalarParameterValue = FScalarParameterValue;
/**
 * FVectorParameterValue
 */
class FVectorParameterValue {
}
exports.FVectorParameterValue = FVectorParameterValue;
/**
 * FTextureParameterValue
 */
class FTextureParameterValue {
}
exports.FTextureParameterValue = FTextureParameterValue;
/**
 * FRuntimeVirtualTextureParameterValue
 */
class FRuntimeVirtualTextureParameterValue {
}
exports.FRuntimeVirtualTextureParameterValue = FRuntimeVirtualTextureParameterValue;
/**
 * FFontParameterValue
 */
class FFontParameterValue {
}
exports.FFontParameterValue = FFontParameterValue;
/**
 * FMaterialInstanceBasePropertyOverrides
 */
class FMaterialInstanceBasePropertyOverrides {
}
exports.FMaterialInstanceBasePropertyOverrides = FMaterialInstanceBasePropertyOverrides;
class FStaticParameterSet {
}
exports.FStaticParameterSet = FStaticParameterSet;
class FStaticParameterBase {
}
exports.FStaticParameterBase = FStaticParameterBase;
class FStaticSwitchParameter extends FStaticParameterBase {
}
exports.FStaticSwitchParameter = FStaticSwitchParameter;
class FStaticComponentMaskParameter extends FStaticParameterBase {
}
exports.FStaticComponentMaskParameter = FStaticComponentMaskParameter;
class FStaticTerrainLayerWeightParameter extends FStaticParameterBase {
}
exports.FStaticTerrainLayerWeightParameter = FStaticTerrainLayerWeightParameter;
class FMaterialLayersFunctions {
}
exports.FMaterialLayersFunctions = FMaterialLayersFunctions;
class FStaticMaterialLayersParameter extends FStaticParameterBase {
}
exports.FStaticMaterialLayersParameter = FStaticMaterialLayersParameter;
/**
 * UMaterialInstance
 * @extends {UMaterialInterface}
 */
class UMaterialInstance extends UMaterialInterface_1.UMaterialInterface {
    constructor() {
        super(...arguments);
        this.PhysMaterial = null;
        this.PhysicalMaterialMap = null;
        this.Parent = null;
        this.bHasStaticPermutationResource = null;
        this.bOverrideSubsurfaceProfile = null;
        this.ScalarParameterValues = null;
        this.VectorParameterValues = null;
        this.TextureParameterValues = null;
        this.RuntimeVirtualTextureParameterValues = null;
        this.FontParameterValues = null;
        this.BasePropertyOverrides = null;
        this.StaticParameters = null;
        this.CachedLayerParameters = null;
        this.CachedReferencedTextures = null;
    }
}
__decorate([
    UProperty_1.UProperty({ arrayDim: 8 }),
    __metadata("design:type", Array)
], UMaterialInstance.prototype, "PhysicalMaterialMap", void 0);
exports.UMaterialInstance = UMaterialInstance;
