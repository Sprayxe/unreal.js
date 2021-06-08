import { McpItemDefinitionBase } from "./McpItemDefinitionBase"
import { EFortRarity } from "../enums/EFortRarity"
import { EFortItemType } from "../enums/EFortItemType"
import { FText } from "../../ue4/objects/core/i18n/Text"
import { FGameplayTagContainer } from "../../ue4/objects/gameplaytags/FGameplayTagContainer"
import { EFortInventoryFilter } from "../enums/EFortInventoryFilter";
import { EFortItemTier } from "../enums/EFortItemTier";
import { EFortTemplateAccess } from "../enums/EFortTemplateAccess";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FVector } from "../../ue4/objects/core/math/FVector";
import { FRotator } from "../../ue4/objects/core/math/FRotator";
import { FCurveTableRowHandle } from "../../ue4/assets/exports/UCurveTable";
import { FScalableFloat } from "../../ue4/objects/FScalableFloat";
import { FortItemSeriesDefinition } from "./FortItemSeriesDefinition";

export class FortItemDefinition extends McpItemDefinitionBase {
    //public OnItemCountChanged: MulticastInlineDelegateProperty
    public Rarity: EFortRarity = EFortRarity.Uncommon
    public ItemType: EFortItemType
    public PrimaryAssetIdItemTypeOverride: EFortItemType
    public FilterOverride: EFortInventoryFilter
    public Tier: EFortItemTier
    public MaxTier: EFortItemTier
    public Access: EFortTemplateAccess
    public bIsAccountItem: boolean
    public bNeverPersisted: boolean
    public bAllowMultipleStacks: boolean
    public bAutoBalanceStacks: boolean
    public bForceAutoPickup: boolean
    public bInventorySizeLimited: boolean = true
    public ItemTypeNameOverride: FText
    public DisplayName: FText
    public ShortDescription: FText
    public Description: FText
    public DisplayNamePrefix: FText
    public SearchTags: FText
    public GameplayTags: FGameplayTagContainer
    public AutomationTags: FGameplayTagContainer
    public SecondaryCategoryOverrideTags: FGameplayTagContainer
    public TertiaryCategoryOverrideTags: FGameplayTagContainer
    public MaxStackSize: FScalableFloat
    public PurchaseItemLimit: FScalableFloat
    public FrontendPreviewScale: number
    public TooltipClass: FSoftObjectPath /*SoftClassPath*/
    public StatList: FSoftObjectPath
    public RatingLookup: FCurveTableRowHandle
    public WidePreviewImage: FSoftObjectPath
    public SmallPreviewImage: FSoftObjectPath
    public LargePreviewImage: FSoftObjectPath
    public DisplayAssetPath: FSoftObjectPath
    public Series: FortItemSeriesDefinition
    public FrontendPreviewPivotOffset: FVector
    public FrontendPreviewInitialRotation: FRotator
    public FrontendPreviewMeshOverride: FSoftObjectPath
    public FrontendPreviewSkeletalMeshOverride: FSoftObjectPath
}