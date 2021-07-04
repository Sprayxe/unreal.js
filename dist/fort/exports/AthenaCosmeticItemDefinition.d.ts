import { FortAccountItemDefinition } from "./FortAccountItemDefinition";
import { FName } from "../../ue4/objects/uobject/FName";
import { FText } from "../../ue4/objects/core/i18n/Text";
import { FPackageIndex } from "../../ue4/objects/uobject/ObjectResource";
import { FGameplayTagContainer } from "../../ue4/objects/gameplaytags/FGameplayTagContainer";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FGameplayTag } from "../../ue4/objects/gameplaytags/FGameplayTag";
import { CosmeticVariantInfo } from "../objects/CosmeticVariantInfo";
import { FRotator } from "../../ue4/objects/core/math/FRotator";
import { UnrealMap } from "../../util/UnrealMap";
import { FortCosmeticVariant } from "./variants/FortCosmeticVariant";
export declare class AthenaCosmeticItemDefinition extends FortAccountItemDefinition {
    bIsShuffleTile: boolean;
    bIsOwnedByCampaignHero: boolean;
    bHasMoreThanOneCharacterPartVariant: boolean;
    bHideIfNotOwned: boolean;
    bInitializedConfiguredDynamicInstallBundles: boolean;
    bDynamicInstallBundlesError: boolean;
    bDynamicInstallBundlesCancelled: boolean;
    bDynamicInstallBundlesComplete: boolean;
    DynamicInstallBundlesUpdateStartTime: number;
    DynamicInstallBundleRequestRefCount: number;
    DynamicInstallBundleRequestRetryCount: number;
    VariantUnlockType: EVariantUnlockType;
    PreviewPawnRotationOffset: FRotator;
    FoleyLibraries: FPackageIndex[];
    DisallowedCosmeticTags: FGameplayTagContainer;
    MetaTags: FGameplayTagContainer;
    VariantChannelsToNeverSendToMCP: FGameplayTag[];
    ReactivePreviewDrivers: UnrealMap<CosmeticVariantInfo, FSoftObjectPath>;
    MaterialOverrides: AthenaCosmeticMaterialOverride[];
    ObservedPlayerStats: FGameplayTagContainer;
    BuiltInEmotes: FPackageIndex[];
    ItemVariants: FortCosmeticVariant[];
    VariantChannelToUseForThumbnails: FGameplayTag;
    ItemVariantPreviews: FortCosmeticVariantPreview[];
    DirectAquisitionStyleDisclaimerOverride: FText;
    UnlockRequirements: FText;
    UnlockingItemDef: FSoftObjectPath;
    ItemPreviewActorClass: FSoftObjectPath;
    ItemPreviewParticleSystem: FSoftObjectPath;
    ItemPreviewMontage_Male: FSoftObjectPath;
    ItemPreviewMontage_Female: FSoftObjectPath;
    ItemPreviewHero: FSoftObjectPath;
    ConfiguredDynamicInstallBundles: FName[];
    PendingDynamicInstallBundles: FName[];
    ExclusiveRequiresOutfitTags: FGameplayTagContainer;
    CustomExclusiveCallout: FText;
    ExclusiveDesciption: FText;
    ExclusiveIcon: FSoftObjectPath;
}
export declare enum EVariantUnlockType {
    UnlockAll = 0,
    ExclusiveChoice = 1
}
export declare class WeirdVariantStruct {
    Unknown0: FGameplayTag;
    Unknown1: FGameplayTag;
}
export declare class AthenaCosmeticMaterialOverride {
    ComponentName: FName;
    MaterialOverrideIndex: number;
    OverrideMaterial: FSoftObjectPath;
}
export declare class FortCosmeticVariantPreview {
    UnlockCondition: FText;
    PreviewTime: number;
    VariantOptions: McpVariantChannelInfo[];
    AdditionalItems: FortCosmeticVariantPreviewElement[];
}
export declare class McpVariantChannelInfo extends CosmeticVariantInfo {
    OwnedVariantTags: FGameplayTagContainer;
    ItemVariantIsUsedFor: FPackageIndex;
    CustomData: string;
}
export declare class FortCosmeticVariantPreviewElement {
    VariantOptions: McpVariantChannelInfo[];
    Item: FPackageIndex;
}
