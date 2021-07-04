"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortCosmeticMaterialVariant = void 0;
const FortCosmeticVariantBackedByArray_1 = require("./FortCosmeticVariantBackedByArray");
class FortCosmeticMaterialVariant extends FortCosmeticVariantBackedByArray_1.FortCosmeticVariantBackedByArray {
    get variants() {
        return this.MaterialOptions;
    }
}
exports.FortCosmeticMaterialVariant = FortCosmeticMaterialVariant;
