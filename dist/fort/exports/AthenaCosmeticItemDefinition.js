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
exports.FortCosmeticVariantPreviewElement = exports.McpVariantChannelInfo = exports.FortCosmeticVariantPreview = exports.AthenaCosmeticMaterialOverride = exports.WeirdVariantStruct = exports.EVariantUnlockType = exports.AthenaCosmeticItemDefinition = void 0;
const FortAccountItemDefinition_1 = require("./FortAccountItemDefinition");
const Text_1 = require("../../ue4/objects/core/i18n/Text");
const CosmeticVariantInfo_1 = require("../objects/CosmeticVariantInfo");
const UProperty_1 = require("../../util/decorators/UProperty");
class AthenaCosmeticItemDefinition extends FortAccountItemDefinition_1.FortAccountItemDefinition {
    constructor() {
        super(...arguments);
        this.bIsShuffleTile = false;
        this.bIsOwnedByCampaignHero = null;
        this.bHasMoreThanOneCharacterPartVariant = null;
        this.bHideIfNotOwned = null;
        this.bInitializedConfiguredDynamicInstallBundles = null;
        this.bDynamicInstallBundlesError = null;
        this.bDynamicInstallBundlesCancelled = null;
        this.bDynamicInstallBundlesComplete = null;
        this.DynamicInstallBundlesUpdateStartTime = null;
        this.DynamicInstallBundleRequestRefCount = null;
        this.DynamicInstallBundleRequestRetryCount = null;
        this.VariantUnlockType = null;
        this.PreviewPawnRotationOffset = null;
        this.FoleyLibraries = null;
        this.DisallowedCosmeticTags = null;
        this.MetaTags = null;
        this.VariantChannelsToNeverSendToMCP = null;
        this.ReactivePreviewDrivers = null;
        this.MaterialOverrides = null;
        this.ObservedPlayerStats = null;
        this.BuiltInEmotes = null;
        this.ItemVariants = null;
        this.VariantChannelToUseForThumbnails = null;
        this.ItemVariantPreviews = null;
        this.DirectAquisitionStyleDisclaimerOverride = null;
        //public List<FortCosmeticAdaptiveStatPreview> ItemObservedStatPreviews
        this.UnlockRequirements = null;
        this.UnlockingItemDef = null;
        this.ItemPreviewActorClass = null;
        this.ItemPreviewParticleSystem = null;
        this.ItemPreviewMontage_Male = null;
        this.ItemPreviewMontage_Female = null;
        this.ItemPreviewHero = null;
        this.ConfiguredDynamicInstallBundles = null;
        this.PendingDynamicInstallBundles = null;
        this.ExclusiveRequiresOutfitTags = null;
        this.CustomExclusiveCallout = null;
        this.ExclusiveDesciption = null;
        this.ExclusiveIcon = null;
    }
}
__decorate([
    UProperty_1.UProperty({ skipPrevious: 1 }),
    __metadata("design:type", Text_1.FText)
], AthenaCosmeticItemDefinition.prototype, "UnlockRequirements", void 0);
exports.AthenaCosmeticItemDefinition = AthenaCosmeticItemDefinition;
var EVariantUnlockType;
(function (EVariantUnlockType) {
    EVariantUnlockType[EVariantUnlockType["UnlockAll"] = 0] = "UnlockAll";
    EVariantUnlockType[EVariantUnlockType["ExclusiveChoice"] = 1] = "ExclusiveChoice";
})(EVariantUnlockType = exports.EVariantUnlockType || (exports.EVariantUnlockType = {}));
class WeirdVariantStruct {
    constructor() {
        this.Unknown0 = null;
        this.Unknown1 = null;
    }
}
exports.WeirdVariantStruct = WeirdVariantStruct;
class AthenaCosmeticMaterialOverride {
    constructor() {
        this.ComponentName = null;
        this.MaterialOverrideIndex = null;
        this.OverrideMaterial = null;
    }
}
exports.AthenaCosmeticMaterialOverride = AthenaCosmeticMaterialOverride;
class FortCosmeticVariantPreview {
    constructor() {
        this.UnlockCondition = null;
        this.PreviewTime = null;
        this.VariantOptions = null;
        this.AdditionalItems = null;
    }
}
exports.FortCosmeticVariantPreview = FortCosmeticVariantPreview;
class McpVariantChannelInfo extends CosmeticVariantInfo_1.CosmeticVariantInfo {
    constructor() {
        super(...arguments);
        this.OwnedVariantTags = null;
        this.ItemVariantIsUsedFor = null;
        this.CustomData = null;
    }
}
exports.McpVariantChannelInfo = McpVariantChannelInfo;
class FortCosmeticVariantPreviewElement {
    constructor() {
        this.VariantOptions = null;
        this.Item = null;
    }
}
exports.FortCosmeticVariantPreviewElement = FortCosmeticVariantPreviewElement;
