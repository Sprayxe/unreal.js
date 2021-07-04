"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortHeroType = void 0;
const FortWorkerType_1 = require("./FortWorkerType");
class FortHeroType extends FortWorkerType_1.FortWorkerType {
    constructor() {
        super(...arguments);
        this.bForceShowHeadAccessory = null;
        this.bForceShowBackpack = null;
        this.Specializations = null;
        this.DefaultMontageLookupTable = null;
        this.OverrideMontageLookupTable = null;
        this.CombinedStatGEs = null;
        this.RequiredGPTags = null;
        this.MaleOverrideFeedback = null;
        this.FemaleOverrideFeedback = null;
        this.OverridePawnClass = null;
        this.HeroGameplayDefinition = null;
        this.HeroCosmeticOutfitDefinition = null;
        this.HeroCosmeticBackblingDefinition = null;
        this.FrontEndAnimClass = null;
        this.ItemPreviewAnimClass = null;
        this.FrontendAnimMontageIdleOverride = null;
        this.FrontEndBackPreviewRotationOffset = null;
        this.Subtype = null;
        this.AttributeInitKey = null;
        this.LegacyStatHandle = null;
        this.ItemPreviewMontage_Male = null;
        this.ItemPreviewMontage_Female = null;
    }
}
exports.FortHeroType = FortHeroType;
