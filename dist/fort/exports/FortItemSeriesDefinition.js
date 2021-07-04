"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortItemSeriesDefinition = void 0;
const UPrimaryDataAsset_1 = require("../../ue4/assets/exports/UPrimaryDataAsset");
class FortItemSeriesDefinition extends UPrimaryDataAsset_1.UPrimaryDataAsset {
    constructor() {
        super(...arguments);
        this.DisplayName = null;
        this.Colors = null;
        this.BackgroundTexture = null;
        this.ItemCardMaterial = null;
        this.BackgroundMaterial = null;
    }
}
exports.FortItemSeriesDefinition = FortItemSeriesDefinition;
