import { FGameplayTag } from "../../../ue4/objects/gameplaytags/FGameplayTag";
import { FText } from "../../../ue4/objects/core/i18n/Text";
import { FSoftObjectPath } from "../../../ue4/objects/uobject/SoftObjectPath";
import { FName } from "../../../ue4/objects/uobject/FName";
import { EFXType } from "../../enums/EFXType";
import { FPackageIndex } from "../../../ue4/objects/uobject/ObjectResource";
import { FGameplayTagContainer } from "../../../ue4/objects/gameplaytags/FGameplayTagContainer";
import { MaterialVectorVariant } from "./MaterialVectorVariant";
import { MaterialTextureVariant } from "./MaterialTextureVariant";
import { MaterialFloatVariant } from "./MaterialFloatVariant";
import { EAttachmentRule } from "../../enums/EAttachmentRule";
import { VectorParamVariant } from "./VectorParamVariant";
export declare class BaseVariantDef {
    bStartUnlocked: boolean;
    bIsDefault: boolean;
    bHideIfNotOwned: boolean;
    CustomizationVariantTag: FGameplayTag;
    VariantName: FText;
    PreviewImage: FSoftObjectPath;
    UnlockRequirements: FText;
    UnlockingItemDef: FSoftObjectPath;
    get backendVariantName(): string | null;
}
export declare class MeshVariant {
    MeshToSwap: FSoftObjectPath;
    ComponentToOverride: FName;
    OverrideMesh: FSoftObjectPath;
}
export declare class MaterialVariants {
    MaterialToSwap: FSoftObjectPath;
    ComponentToOverride: FName;
    CascadeMaterialName: FName;
    MaterialOverrideIndex: number;
    OverrideMaterial: FSoftObjectPath;
}
export declare class MaterialParamterDef {
    MaterialToAlter: FSoftObjectPath;
    CascadeMaterialName: FName;
    ColorParams: MaterialVectorVariant[];
    TextureParams: MaterialTextureVariant[];
    FloatParams: MaterialFloatVariant[];
}
export declare class VariantParticleSystemInitializerData {
    ParticleComponentName: FName;
    ParticleSystem: FSoftObjectPath;
    MeshToBindTO: FSoftObjectPath;
    AttachSocketName: FName;
    LocationRule: EAttachmentRule;
    RotationRule: EAttachmentRule;
    ScaleRule: EAttachmentRule;
    bWeldSimulatedBodies: boolean;
}
export declare class ParticleVariant {
    ParticleSystemToAlter: FSoftObjectPath;
    ComponentToOverride: FName;
    OverrideParticleSystem: FSoftObjectPath;
}
export declare class ParticleParamterVariant {
    ParticleSystemToAlter: FSoftObjectPath;
    ColorParams: MaterialVectorVariant[];
    VectorParams: VectorParamVariant[];
    FloatParams: MaterialFloatVariant[];
}
export declare class ManagedParticleSwapVariant {
    ParamGroupTag: FGameplayTag;
    ParticleToOverride: FFortPortableSoftParticles;
}
export declare class FFortPortableSoftParticles {
    FXType: EFXType;
    NiagaraVersion: FSoftObjectPath;
    CascadeVersion: FSoftObjectPath;
}
export declare class ManagedParticleParamVariant {
    ParamGroupTag: FGameplayTag;
    ColorParams: MaterialVectorVariant[];
    VectorParams: VectorParamVariant;
    FloatParams: MaterialFloatVariant;
}
export declare class SoundVariant {
    SoundToSwap: FSoftObjectPath;
    ComponentToOverride: FName;
    OverrideSound: FSoftObjectPath;
}
export declare class FoleySoundVariant {
    LibrariesToAdd: FPackageIndex[];
    LibrariesToRemove: FPackageIndex[];
}
export declare class SocketTransformVariant {
    SourceSocketName: FName;
    OverridSocketName: FName;
    SourceObjectToModify: FSoftObjectPath;
}
export declare class ScriptedActionVariant {
    ActionTag: FGameplayTag;
}
export declare class CosmeticMetaTagContainer {
    MetaTagsToApply: FGameplayTagContainer;
    MetaTagsToRemove: FGameplayTagContainer;
}
