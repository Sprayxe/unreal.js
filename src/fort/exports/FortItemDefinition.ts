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
import { UProperty } from "../../util/decorators/UProperty";

export class FortItemDefinition extends McpItemDefinitionBase {
    //public OnItemCountChanged: MulticastInlineDelegateProperty
    @UProperty({ skipPrevious: 1 })
    public Rarity: EFortRarity = EFortRarity.Uncommon
    public ItemType: EFortItemType = null
    public PrimaryAssetIdItemTypeOverride: EFortItemType = null
    public FilterOverride: EFortInventoryFilter = null
    public Tier: EFortItemTier = null
    public MaxTier: EFortItemTier = null
    public Access: EFortTemplateAccess = null
    public bIsAccountItem: boolean = null
    public bNeverPersisted: boolean = null
    public bAllowMultipleStacks: boolean = null
    public bAutoBalanceStacks: boolean = null
    public bForceAutoPickup: boolean = null
    public bInventorySizeLimited: boolean = true
    public ItemTypeNameOverride: FText = null
    public DisplayName: FText = null
    public ShortDescription: FText = null
    public Description: FText = null
    public DisplayNamePrefix: FText = null
    public SearchTags: FText = null
    public GameplayTags: FGameplayTagContainer = null
    public AutomationTags: FGameplayTagContainer = null
    public SecondaryCategoryOverrideTags: FGameplayTagContainer = null
    public TertiaryCategoryOverrideTags: FGameplayTagContainer = null
    public MaxStackSize: FScalableFloat = null
    public PurchaseItemLimit: FScalableFloat = null
    public FrontendPreviewScale: number = null
    public TooltipClass: FSoftObjectPath /*SoftClassPath*/ = null
    public StatList: FSoftObjectPath = null
    public RatingLookup: FCurveTableRowHandle = null
    public WidePreviewImage: FSoftObjectPath = null
    public SmallPreviewImage: FSoftObjectPath = null
    public LargePreviewImage: FSoftObjectPath = null
    public DisplayAssetPath: FSoftObjectPath = null
    public Series: FortItemSeriesDefinition = null
    public FrontendPreviewPivotOffset: FVector = null
    public FrontendPreviewInitialRotation: FRotator = null
    public FrontendPreviewMeshOverride: FSoftObjectPath = null
    public FrontendPreviewSkeletalMeshOverride: FSoftObjectPath = null
}