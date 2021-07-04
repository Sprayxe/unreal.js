"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBlendMode = void 0;
/**
 * EBlendMode
 * @enum
 */
var EBlendMode;
(function (EBlendMode) {
    EBlendMode[EBlendMode["BLEND_Opaque"] = 0] = "BLEND_Opaque";
    EBlendMode[EBlendMode["BLEND_Masked"] = 1] = "BLEND_Masked";
    EBlendMode[EBlendMode["BLEND_Translucent"] = 2] = "BLEND_Translucent";
    EBlendMode[EBlendMode["BLEND_Additive"] = 3] = "BLEND_Additive";
    EBlendMode[EBlendMode["BLEND_Modulate"] = 4] = "BLEND_Modulate";
    EBlendMode[EBlendMode["BLEND_ModulateAndAdd"] = 5] = "BLEND_ModulateAndAdd";
    EBlendMode[EBlendMode["BLEND_SoftMasked"] = 6] = "BLEND_SoftMasked";
    EBlendMode[EBlendMode["BLEND_AlphaComposite"] = 7] = "BLEND_AlphaComposite";
    EBlendMode[EBlendMode["BLEND_DitheredTranslucent"] = 8] = "BLEND_DitheredTranslucent";
})(EBlendMode = exports.EBlendMode || (exports.EBlendMode = {}));
