import { FortAccountItemDefinition } from "./FortAccountItemDefinition"
import { FName } from "../../ue4/objects/uobject/FName"
import { FText } from "../../ue4/objects/core/i18n/Text"
import { FPackageIndex } from "../../ue4/objects/uobject/ObjectResource"
import { FGameplayTagContainer } from "../../ue4/objects/gameplaytags/FGameplayTagContainer"
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath"
import { FGameplayTag } from "../../ue4/objects/gameplaytags/FGameplayTag"
import { CosmeticVariantInfo } from "../objects/CosmeticVariantInfo"
import { FRotator } from "../../ue4/objects/core/math/FRotator"
import { UnrealMap } from "../../util/UnrealMap"
import { FortCosmeticVariant } from "./variants/FortCosmeticVariant";
import { UProperty } from "../../util/decorators/UProperty";

export class AthenaCosmeticItemDefinition extends FortAccountItemDefinition {
    public bIsShuffleTile: boolean = false
    public bIsOwnedByCampaignHero: boolean = null
    public bHasMoreThanOneCharacterPartVariant: boolean = null
    public bHideIfNotOwned: boolean = null
    public bInitializedConfiguredDynamicInstallBundles: boolean = null
    public bDynamicInstallBundlesError: boolean = null
    public bDynamicInstallBundlesCancelled: boolean = null
    public bDynamicInstallBundlesComplete: boolean = null
    public DynamicInstallBundlesUpdateStartTime: number = null
    public DynamicInstallBundleRequestRefCount: number = null
    public DynamicInstallBundleRequestRetryCount: number = null
    public VariantUnlockType: EVariantUnlockType = null
    public PreviewPawnRotationOffset: FRotator = null
    public FoleyLibraries: FPackageIndex[] /*FoleySoundLibrary[]*/ = null
    public DisallowedCosmeticTags: FGameplayTagContainer = null
    public MetaTags: FGameplayTagContainer = null
    public VariantChannelsToNeverSendToMCP: FGameplayTag[] = null
    public ReactivePreviewDrivers: UnrealMap<CosmeticVariantInfo, FSoftObjectPath> = null
    public MaterialOverrides: AthenaCosmeticMaterialOverride[] = null
    public ObservedPlayerStats: FGameplayTagContainer = null
    public BuiltInEmotes: FPackageIndex[] /*UFortMontageItemDefinitionBase[]*/ = null
    public ItemVariants: FortCosmeticVariant[] = null
    public VariantChannelToUseForThumbnails: FGameplayTag = null
    public ItemVariantPreviews: FortCosmeticVariantPreview[] = null
    public DirectAquisitionStyleDisclaimerOverride: FText = null
    //public List<FortCosmeticAdaptiveStatPreview> ItemObservedStatPreviews
    @UProperty({ skipPrevious: 1 })
    public UnlockRequirements: FText = null
    public UnlockingItemDef: FSoftObjectPath = null
    public ItemPreviewActorClass: FSoftObjectPath /*SoftClassPath*/ = null
    public ItemPreviewParticleSystem: FSoftObjectPath = null
    public ItemPreviewMontage_Male: FSoftObjectPath = null
    public ItemPreviewMontage_Female: FSoftObjectPath = null
    public ItemPreviewHero: FSoftObjectPath = null
    public ConfiguredDynamicInstallBundles: FName[] = null
    public PendingDynamicInstallBundles: FName[] = null
    public ExclusiveRequiresOutfitTags: FGameplayTagContainer = null
    public CustomExclusiveCallout: FText = null
    public ExclusiveDesciption: FText = null
    public ExclusiveIcon: FSoftObjectPath = null
}

export enum EVariantUnlockType {
    UnlockAll,
    ExclusiveChoice
}

export class WeirdVariantStruct {
    public Unknown0: FGameplayTag = null
    public Unknown1: FGameplayTag = null
}

export class AthenaCosmeticMaterialOverride {
    public ComponentName: FName = null
    public MaterialOverrideIndex: number = null
    public OverrideMaterial: FSoftObjectPath = null
}

export class FortCosmeticVariantPreview {
    public UnlockCondition: FText = null
    public PreviewTime: number = null
    public VariantOptions: McpVariantChannelInfo[] = null
    public AdditionalItems: FortCosmeticVariantPreviewElement[] = null
}

export class McpVariantChannelInfo extends CosmeticVariantInfo {
    public OwnedVariantTags: FGameplayTagContainer = null
    public ItemVariantIsUsedFor: FPackageIndex /*FortItemDefinition*/ = null
    public CustomData: string = null
}

export class FortCosmeticVariantPreviewElement {
    public VariantOptions: McpVariantChannelInfo[] = null
    public Item: FPackageIndex /*AthenaCosmeticItemDefinition*/ = null
}