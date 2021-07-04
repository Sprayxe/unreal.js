import { BaseVariantDef, CosmeticMetaTagContainer, FoleySoundVariant, MaterialParamterDef, MaterialVariants, SoundVariant } from "./BaseVariantDef";
export declare class MaterialVariantDef extends BaseVariantDef {
    VariantMaterials: MaterialVariants[];
    VariantMaterialParams: MaterialParamterDef[];
    VariantSounds: SoundVariant[];
    VariantFoley: FoleySoundVariant[];
    MetaTags: CosmeticMetaTagContainer;
}
