import { FortCosmeticVariant } from "./FortCosmeticVariant";
import { BaseVariantDef } from "../../objects/variants/BaseVariantDef";
export declare class FortCosmeticVariantBackedByArray extends FortCosmeticVariant {
    get variants(): BaseVariantDef[] | null;
}
