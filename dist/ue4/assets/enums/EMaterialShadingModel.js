"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMaterialShadingModel = void 0;
/**
 * EMaterialShadingModel
 * @enum
 */
var EMaterialShadingModel;
(function (EMaterialShadingModel) {
    EMaterialShadingModel[EMaterialShadingModel["MSM_Unlit"] = 0] = "MSM_Unlit";
    EMaterialShadingModel[EMaterialShadingModel["MSM_DefaultLit"] = 1] = "MSM_DefaultLit";
    EMaterialShadingModel[EMaterialShadingModel["MSM_Subsurface"] = 2] = "MSM_Subsurface";
    EMaterialShadingModel[EMaterialShadingModel["MSM_PreintegratedSkin"] = 3] = "MSM_PreintegratedSkin";
    EMaterialShadingModel[EMaterialShadingModel["MSM_ClearCoat"] = 4] = "MSM_ClearCoat";
    EMaterialShadingModel[EMaterialShadingModel["MSM_SubsurfaceProfile"] = 5] = "MSM_SubsurfaceProfile";
    EMaterialShadingModel[EMaterialShadingModel["MSM_TwoSidedFoliage"] = 6] = "MSM_TwoSidedFoliage";
    EMaterialShadingModel[EMaterialShadingModel["MSM_Hair"] = 7] = "MSM_Hair";
    EMaterialShadingModel[EMaterialShadingModel["MSM_Cloth"] = 8] = "MSM_Cloth";
    EMaterialShadingModel[EMaterialShadingModel["MSM_Eye"] = 9] = "MSM_Eye";
    EMaterialShadingModel[EMaterialShadingModel["MSM_SingleLayerWater"] = 10] = "MSM_SingleLayerWater";
    EMaterialShadingModel[EMaterialShadingModel["MSM_ThinTranslucent"] = 11] = "MSM_ThinTranslucent";
    EMaterialShadingModel[EMaterialShadingModel["MSM_NUM"] = 12] = "MSM_NUM";
    EMaterialShadingModel[EMaterialShadingModel["MSM_FromMaterialExpression"] = 13] = "MSM_FromMaterialExpression";
})(EMaterialShadingModel = exports.EMaterialShadingModel || (exports.EMaterialShadingModel = {}));
