"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTexture = exports.ETextureDownscaleOptions = exports.ETextureGroup = exports.ETextureMipLoadOptions = exports.ETextureFilter = exports.ETextureCompressionSettings = void 0;
const UStreamableRenderAsset_1 = require("../UStreamableRenderAsset");
const Material_1 = require("../../../converters/materials/Material");
/**
 * ETextureCompressionSettings
 * @enum
 */
var ETextureCompressionSettings;
(function (ETextureCompressionSettings) {
    ETextureCompressionSettings[ETextureCompressionSettings["TC_Default"] = 0] = "TC_Default";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_Normalmap"] = 1] = "TC_Normalmap";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_Masks"] = 2] = "TC_Masks";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_Grayscale"] = 3] = "TC_Grayscale";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_Displacementmap"] = 4] = "TC_Displacementmap";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_VectorDisplacementmap"] = 5] = "TC_VectorDisplacementmap";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_HDR"] = 6] = "TC_HDR";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_EditorIcon"] = 7] = "TC_EditorIcon";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_Alpha"] = 8] = "TC_Alpha";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_DistanceFieldFont"] = 9] = "TC_DistanceFieldFont";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_HDR_Compressed"] = 10] = "TC_HDR_Compressed";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_BC7"] = 11] = "TC_BC7";
    ETextureCompressionSettings[ETextureCompressionSettings["TC_HalfFloat"] = 12] = "TC_HalfFloat";
})(ETextureCompressionSettings = exports.ETextureCompressionSettings || (exports.ETextureCompressionSettings = {}));
/**
 * ETextureFilter
 * @enum
 */
var ETextureFilter;
(function (ETextureFilter) {
    ETextureFilter[ETextureFilter["TF_Nearest"] = 0] = "TF_Nearest";
    ETextureFilter[ETextureFilter["TF_Bilinear"] = 1] = "TF_Bilinear";
    ETextureFilter[ETextureFilter["TF_Trilinear"] = 2] = "TF_Trilinear";
    ETextureFilter[ETextureFilter["TF_Default"] = 3] = "TF_Default";
})(ETextureFilter = exports.ETextureFilter || (exports.ETextureFilter = {}));
/**
 * ETextureMipLoadOptions
 * @enum
 */
var ETextureMipLoadOptions;
(function (ETextureMipLoadOptions) {
    ETextureMipLoadOptions[ETextureMipLoadOptions["Default"] = 0] = "Default";
    ETextureMipLoadOptions[ETextureMipLoadOptions["AllMips"] = 1] = "AllMips";
    ETextureMipLoadOptions[ETextureMipLoadOptions["OnlyFirstMip"] = 2] = "OnlyFirstMip";
})(ETextureMipLoadOptions = exports.ETextureMipLoadOptions || (exports.ETextureMipLoadOptions = {}));
/**
 * ETextureGroup
 * @enum
 */
var ETextureGroup;
(function (ETextureGroup) {
    ETextureGroup[ETextureGroup["TEXTUREGROUP_World"] = 0] = "TEXTUREGROUP_World";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_WorldNormalMap"] = 1] = "TEXTUREGROUP_WorldNormalMap";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_WorldSpecular"] = 2] = "TEXTUREGROUP_WorldSpecular";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Character"] = 3] = "TEXTUREGROUP_Character";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_CharacterNormalMap"] = 4] = "TEXTUREGROUP_CharacterNormalMap";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_CharacterSpecular"] = 5] = "TEXTUREGROUP_CharacterSpecular";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Weapon"] = 6] = "TEXTUREGROUP_Weapon";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_WeaponNormalMap"] = 7] = "TEXTUREGROUP_WeaponNormalMap";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_WeaponSpecular"] = 8] = "TEXTUREGROUP_WeaponSpecular";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Vehicle"] = 9] = "TEXTUREGROUP_Vehicle";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_VehicleNormalMap"] = 10] = "TEXTUREGROUP_VehicleNormalMap";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_VehicleSpecular"] = 11] = "TEXTUREGROUP_VehicleSpecular";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Cinematic"] = 12] = "TEXTUREGROUP_Cinematic";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Effects"] = 13] = "TEXTUREGROUP_Effects";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_EffectsNotFiltered"] = 14] = "TEXTUREGROUP_EffectsNotFiltered";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Skybox"] = 15] = "TEXTUREGROUP_Skybox";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_UI"] = 16] = "TEXTUREGROUP_UI";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Lightmap"] = 17] = "TEXTUREGROUP_Lightmap";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_RenderTarget"] = 18] = "TEXTUREGROUP_RenderTarget";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_MobileFlattened"] = 19] = "TEXTUREGROUP_MobileFlattened";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_ProcBuilding_Face"] = 20] = "TEXTUREGROUP_ProcBuilding_Face";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_ProcBuilding_LightMap"] = 21] = "TEXTUREGROUP_ProcBuilding_LightMap";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Shadowmap"] = 22] = "TEXTUREGROUP_Shadowmap";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_ColorLookupTable"] = 23] = "TEXTUREGROUP_ColorLookupTable";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Terrain_Heightmap"] = 24] = "TEXTUREGROUP_Terrain_Heightmap";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Terrain_Weightmap"] = 25] = "TEXTUREGROUP_Terrain_Weightmap";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Bokeh"] = 26] = "TEXTUREGROUP_Bokeh";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_IESLightProfile"] = 27] = "TEXTUREGROUP_IESLightProfile";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Pixels2D"] = 28] = "TEXTUREGROUP_Pixels2D";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_HierarchicalLOD"] = 29] = "TEXTUREGROUP_HierarchicalLOD";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Impostor"] = 30] = "TEXTUREGROUP_Impostor";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_ImpostorNormalDepth"] = 31] = "TEXTUREGROUP_ImpostorNormalDepth";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_8BitData"] = 32] = "TEXTUREGROUP_8BitData";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_16BitData"] = 33] = "TEXTUREGROUP_16BitData";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project01"] = 34] = "TEXTUREGROUP_Project01";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project02"] = 35] = "TEXTUREGROUP_Project02";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project03"] = 36] = "TEXTUREGROUP_Project03";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project04"] = 37] = "TEXTUREGROUP_Project04";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project05"] = 38] = "TEXTUREGROUP_Project05";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project06"] = 39] = "TEXTUREGROUP_Project06";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project07"] = 40] = "TEXTUREGROUP_Project07";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project08"] = 41] = "TEXTUREGROUP_Project08";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project09"] = 42] = "TEXTUREGROUP_Project09";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project10"] = 43] = "TEXTUREGROUP_Project10";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project11"] = 44] = "TEXTUREGROUP_Project11";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project12"] = 45] = "TEXTUREGROUP_Project12";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project13"] = 46] = "TEXTUREGROUP_Project13";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project14"] = 47] = "TEXTUREGROUP_Project14";
    ETextureGroup[ETextureGroup["TEXTUREGROUP_Project15"] = 48] = "TEXTUREGROUP_Project15";
})(ETextureGroup = exports.ETextureGroup || (exports.ETextureGroup = {}));
/**
 * ETextureDownscaleOptions
 * @enum
 */
var ETextureDownscaleOptions;
(function (ETextureDownscaleOptions) {
    ETextureDownscaleOptions[ETextureDownscaleOptions["Default"] = 0] = "Default";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Unfiltered"] = 1] = "Unfiltered";
    ETextureDownscaleOptions[ETextureDownscaleOptions["SimpleAverage"] = 2] = "SimpleAverage";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Sharpen0"] = 3] = "Sharpen0";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Sharpen1"] = 4] = "Sharpen1";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Sharpen2"] = 5] = "Sharpen2";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Sharpen3"] = 6] = "Sharpen3";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Sharpen4"] = 7] = "Sharpen4";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Sharpen5"] = 8] = "Sharpen5";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Sharpen6"] = 9] = "Sharpen6";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Sharpen7"] = 10] = "Sharpen7";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Sharpen8"] = 11] = "Sharpen8";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Sharpen9"] = 12] = "Sharpen9";
    ETextureDownscaleOptions[ETextureDownscaleOptions["Sharpen10"] = 13] = "Sharpen10";
})(ETextureDownscaleOptions = exports.ETextureDownscaleOptions || (exports.ETextureDownscaleOptions = {}));
/**
 * Represents an UE4 Texture
 * @extends {UStreamableRenderAsset}
 * @implements {UUnrealMaterial}
 */
class UTexture extends UStreamableRenderAsset_1.UStreamableRenderAsset {
    /**
     * Gets params
     * @param {CMaterialParams} params Params to modify
     * @returns {void}
     * @public
     */
    getParams(params) {
        // ???
    }
    /**
     * Gets name
     * @returns {string}
     * @public
     */
    getName() {
        return this.name;
    }
    /**
     * Appends textures
     * @param {Array<UUnrealMaterial>} outTextures Array to mofify
     * @param {boolean} onlyRendered Whether only rendered
     * @returns {void}
     * @public
     */
    appendReferencedTextures(outTextures, onlyRendered) {
        const params = new Material_1.CMaterialParams();
        this.getParams(params);
        params.appendAllTextures(outTextures);
    }
    /**
     * Whether is texture cube
     * @returns {boolean}
     * @public
     */
    isTextureCube() {
        return false;
    }
}
exports.UTexture = UTexture;
