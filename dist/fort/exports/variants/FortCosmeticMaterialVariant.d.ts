import { FortCosmeticVariantBackedByArray } from "./FortCosmeticVariantBackedByArray";
import { MaterialVariantDef } from "../../objects/variants/MaterialVariantDef";
import { BaseVariantDef } from "../../objects/variants/BaseVariantDef";
export declare class FortCosmeticMaterialVariant extends FortCosmeticVariantBackedByArray {
    MaterialOptions: MaterialVariantDef[];
    get variants(): BaseVariantDef[] | null;
}
