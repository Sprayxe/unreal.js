import { FortCosmeticVariantBackedByArray } from "./FortCosmeticVariantBackedByArray";
import { MaterialVariantDef } from "../../objects/variants/MaterialVariantDef";
import { BaseVariantDef } from "../../objects/variants/BaseVariantDef";

export class FortCosmeticMaterialVariant extends FortCosmeticVariantBackedByArray {
    public MaterialOptions: MaterialVariantDef[]

    get variants(): BaseVariantDef[] | null {
        return this.MaterialOptions
    }
}