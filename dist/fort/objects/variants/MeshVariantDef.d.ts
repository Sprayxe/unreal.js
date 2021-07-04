import { BaseVariantDef, CosmeticMetaTagContainer, FoleySoundVariant, MaterialParamterDef, MaterialVariants, MeshVariant, ParticleParamterVariant, ParticleVariant, ScriptedActionVariant, SocketTransformVariant, SoundVariant, VariantParticleSystemInitializerData } from "./BaseVariantDef";
export declare class MeshVariantDef extends BaseVariantDef {
    VariantMeshes: MeshVariant[];
    VariantMaterials: MaterialVariants[];
    VariantMaterialParams: MaterialParamterDef[];
    InitialParticleSystemData: VariantParticleSystemInitializerData[];
    VariantParticles: ParticleVariant[];
    VariantParticleParams: ParticleParamterVariant[];
    SocketTransforms: SocketTransformVariant[];
    VariantSounds: SoundVariant[];
    VariantFoley: FoleySoundVariant[];
    VariantActions: ScriptedActionVariant[];
    MetaTags: CosmeticMetaTagContainer;
}
