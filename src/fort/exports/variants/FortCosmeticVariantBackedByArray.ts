import { FortCosmeticVariant } from "./FortCosmeticVariant";
import { BaseVariantDef } from "../../objects/variants/BaseVariantDef";

export class FortCosmeticVariantBackedByArray extends FortCosmeticVariant {
    get variants(): BaseVariantDef[] | null {
        return null
    }
}