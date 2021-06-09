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
    public bIsOwnedByCampaignHero: boolean
    public bHasMoreThanOneCharacterPartVariant: boolean
    public bHideIfNotOwned: boolean
    public bInitializedConfiguredDynamicInstallBundles: boolean
    public bDynamicInstallBundlesError: boolean
    public bDynamicInstallBundlesCancelled: boolean
    public bDynamicInstallBundlesComplete: boolean
    public DynamicInstallBundlesUpdateStartTime: number
    public DynamicInstallBundleRequestRefCount: number
    public DynamicInstallBundleRequestRetryCount: number
    public VariantUnlockType: EVariantUnlockType
    public PreviewPawnRotationOffset: FRotator
    public FoleyLibraries: FPackageIndex[] /*FoleySoundLibrary[]*/
    public DisallowedCosmeticTags: FGameplayTagContainer
    public MetaTags: FGameplayTagContainer
    public VariantChannelsToNeverSendToMCP: FGameplayTag[]
    public ReactivePreviewDrivers: UnrealMap<CosmeticVariantInfo, FSoftObjectPath>
    public MaterialOverrides: AthenaCosmeticMaterialOverride[]
    public ObservedPlayerStats: FGameplayTagContainer
    public BuiltInEmotes: FPackageIndex[] /*UFortMontageItemDefinitionBase[]*/
    public ItemVariants: FortCosmeticVariant[]
    public VariantChannelToUseForThumbnails: FGameplayTag
    public ItemVariantPreviews: FortCosmeticVariantPreview[]
    public DirectAquisitionStyleDisclaimerOverride: FText
    //public List<FortCosmeticAdaptiveStatPreview> ItemObservedStatPreviews
    @UProperty({ skipPrevious: 1 })
    public UnlockRequirements: FText
    public UnlockingItemDef: FSoftObjectPath
    public ItemPreviewActorClass: FSoftObjectPath /*SoftClassPath*/
    public ItemPreviewParticleSystem: FSoftObjectPath
    public ItemPreviewMontage_Male: FSoftObjectPath
    public ItemPreviewMontage_Female: FSoftObjectPath
    public ItemPreviewHero: FSoftObjectPath
    public ConfiguredDynamicInstallBundles: FName[]
    public PendingDynamicInstallBundles: FName[]
    public ExclusiveRequiresOutfitTags: FGameplayTagContainer
    public CustomExclusiveCallout: FText
    public ExclusiveDesciption: FText
    public ExclusiveIcon: FSoftObjectPath
}

export enum EVariantUnlockType {
    UnlockAll,
    ExclusiveChoice
}

export class WeirdVariantStruct {
    public Unknown0: FGameplayTag
    public Unknown1: FGameplayTag
}

export class AthenaCosmeticMaterialOverride {
    public ComponentName: FName
    public MaterialOverrideIndex: number
    public OverrideMaterial: FSoftObjectPath
}

export class FortCosmeticVariantPreview {
    public UnlockCondition: FText
    public PreviewTime: number
    public VariantOptions: McpVariantChannelInfo[]
    public AdditionalItems: FortCosmeticVariantPreviewElement[]
}

export class McpVariantChannelInfo extends CosmeticVariantInfo {
    public OwnedVariantTags: FGameplayTagContainer
    public ItemVariantIsUsedFor: FPackageIndex /*FortItemDefinition*/
    public CustomData: string
}

export class FortCosmeticVariantPreviewElement {
    public VariantOptions: McpVariantChannelInfo[]
    public Item: FPackageIndex /*AthenaCosmeticItemDefinition*/
}