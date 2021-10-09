import {
    BaseVariantDef,
    CosmeticMetaTagContainer,
    FoleySoundVariant,
    MaterialParamterDef,
    MaterialVariants,
    MeshVariant,
    ParticleParamterVariant,
    ParticleVariant,
    ScriptedActionVariant,
    SocketTransformVariant,
    SoundVariant,
    VariantParticleSystemInitializerData
} from "./BaseVariantDef";

export class MeshVariantDef extends BaseVariantDef {
    public VariantMeshes: MeshVariant[]
    public VariantMaterials: MaterialVariants[]
    public VariantMaterialParams: MaterialParamterDef[]
    public InitialParticleSystemData: VariantParticleSystemInitializerData[]
    public VariantParticles: ParticleVariant[]
    public VariantParticleParams: ParticleParamterVariant[]
    public SocketTransforms: SocketTransformVariant[]
    public VariantSounds: SoundVariant[]
    public VariantFoley: FoleySoundVariant[]
    public VariantActions: ScriptedActionVariant[]
    public MetaTags: CosmeticMetaTagContainer
}