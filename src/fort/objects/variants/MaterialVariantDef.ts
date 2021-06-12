import {
    BaseVariantDef, CosmeticMetaTagContainer,
    FoleySoundVariant,
    MaterialParamterDef,
    MaterialVariants,
    SoundVariant
} from "./BaseVariantDef";

export class MaterialVariantDef extends BaseVariantDef {
    public VariantMaterials: MaterialVariants[]
    public VariantMaterialParams: MaterialParamterDef[]
    public VariantSounds: SoundVariant[]
    public VariantFoley: FoleySoundVariant[]
    public MetaTags: CosmeticMetaTagContainer
}