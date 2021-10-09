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

export class BaseVariantDef {
    public bStartUnlocked: boolean
    public bIsDefault: boolean
    public bHideIfNotOwned: boolean
    public CustomizationVariantTag: FGameplayTag
    public VariantName: FText
    public PreviewImage: FSoftObjectPath
    public UnlockRequirements: FText
    public UnlockingItemDef: FSoftObjectPath

    get backendVariantName(): string | null {
        return this.CustomizationVariantTag != null
            ? this.CustomizationVariantTag.toString().substring("Cosmetics.Variant.Property.".length)
            : null
    }
}

export class MeshVariant {
    public MeshToSwap: FSoftObjectPath
    public ComponentToOverride: FName
    public OverrideMesh: FSoftObjectPath
}

export class MaterialVariants {
    public MaterialToSwap: FSoftObjectPath
    public ComponentToOverride: FName
    public CascadeMaterialName: FName
    public MaterialOverrideIndex: number
    public OverrideMaterial: FSoftObjectPath
}

export class MaterialParamterDef {
    public MaterialToAlter: FSoftObjectPath
    public CascadeMaterialName: FName
    public ColorParams: MaterialVectorVariant[]
    public TextureParams: MaterialTextureVariant[]
    public FloatParams: MaterialFloatVariant[]
}

export class VariantParticleSystemInitializerData {
    public ParticleComponentName: FName
    public ParticleSystem: FSoftObjectPath;
    public MeshToBindTO: FSoftObjectPath
    public AttachSocketName: FName
    public LocationRule: EAttachmentRule
    public RotationRule: EAttachmentRule
    public ScaleRule: EAttachmentRule
    public bWeldSimulatedBodies: boolean
}

export class ParticleVariant {
    public ParticleSystemToAlter: FSoftObjectPath
    public ComponentToOverride: FName
    public OverrideParticleSystem: FSoftObjectPath
}

export class ParticleParamterVariant {
    public ParticleSystemToAlter: FSoftObjectPath
    public ColorParams: MaterialVectorVariant[]
    public VectorParams: VectorParamVariant[]
    public FloatParams: MaterialFloatVariant[]
}

export class ManagedParticleSwapVariant {
    public ParamGroupTag: FGameplayTag
    public ParticleToOverride: FFortPortableSoftParticles
}

export class FFortPortableSoftParticles {
    public FXType: EFXType
    public NiagaraVersion: FSoftObjectPath
    public CascadeVersion: FSoftObjectPath
}

export class ManagedParticleParamVariant {
    public ParamGroupTag: FGameplayTag;
    public ColorParams: MaterialVectorVariant[]
    public VectorParams: VectorParamVariant
    public FloatParams: MaterialFloatVariant
}

export class SoundVariant {
    public SoundToSwap: FSoftObjectPath
    public ComponentToOverride: FName
    public OverrideSound: FSoftObjectPath
}

export class FoleySoundVariant {
    public LibrariesToAdd: FPackageIndex[] /*FoleySoundLibrary[]*/
    public LibrariesToRemove: FPackageIndex[] /*FoleySoundLibrary[]*/
}

export class SocketTransformVariant {
    public SourceSocketName: FName
    public OverridSocketName: FName
    public SourceObjectToModify: FSoftObjectPath
}

export class ScriptedActionVariant {
    public ActionTag: FGameplayTag
}

export class CosmeticMetaTagContainer {
    public MetaTagsToApply: FGameplayTagContainer
    public MetaTagsToRemove: FGameplayTagContainer
}