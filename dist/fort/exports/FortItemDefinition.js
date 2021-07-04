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
exports.FortItemDefinition = void 0;
const McpItemDefinitionBase_1 = require("./McpItemDefinitionBase");
const EFortRarity_1 = require("../enums/EFortRarity");
const UProperty_1 = require("../../util/decorators/UProperty");
class FortItemDefinition extends McpItemDefinitionBase_1.McpItemDefinitionBase {
    constructor() {
        super(...arguments);
        //public OnItemCountChanged: MulticastInlineDelegateProperty
        this.Rarity = EFortRarity_1.EFortRarity.Uncommon;
        this.ItemType = null;
        this.PrimaryAssetIdItemTypeOverride = null;
        this.FilterOverride = null;
        this.Tier = null;
        this.MaxTier = null;
        this.Access = null;
        this.bIsAccountItem = null;
        this.bNeverPersisted = null;
        this.bAllowMultipleStacks = null;
        this.bAutoBalanceStacks = null;
        this.bForceAutoPickup = null;
        this.bInventorySizeLimited = true;
        this.ItemTypeNameOverride = null;
        this.DisplayName = null;
        this.ShortDescription = null;
        this.Description = null;
        this.DisplayNamePrefix = null;
        this.SearchTags = null;
        this.GameplayTags = null;
        this.AutomationTags = null;
        this.SecondaryCategoryOverrideTags = null;
        this.TertiaryCategoryOverrideTags = null;
        this.MaxStackSize = null;
        this.PurchaseItemLimit = null;
        this.FrontendPreviewScale = null;
        this.TooltipClass = null;
        this.StatList = null;
        this.RatingLookup = null;
        this.WidePreviewImage = null;
        this.SmallPreviewImage = null;
        this.LargePreviewImage = null;
        this.DisplayAssetPath = null;
        this.Series = null;
        this.FrontendPreviewPivotOffset = null;
        this.FrontendPreviewInitialRotation = null;
        this.FrontendPreviewMeshOverride = null;
        this.FrontendPreviewSkeletalMeshOverride = null;
    }
}
__decorate([
    UProperty_1.UProperty({ skipPrevious: 1 }),
    __metadata("design:type", EFortRarity_1.EFortRarity)
], FortItemDefinition.prototype, "Rarity", void 0);
exports.FortItemDefinition = FortItemDefinition;
