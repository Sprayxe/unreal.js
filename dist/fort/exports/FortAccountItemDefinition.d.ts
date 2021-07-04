import { FortPersistableItemDefinition } from "./FortPersistableItemDefinition";
import { FCurveTableRowHandle } from "../../ue4/assets/exports/UCurveTable";
import { FDataTableRowHandle } from "../../ue4/objects/FDataTableRowHandle";
export declare class FortAccountItemDefinition extends FortPersistableItemDefinition {
    LevelToXpHandle: FCurveTableRowHandle;
    LevelToSacrificeXpHandle: FCurveTableRowHandle;
    SacrificeRecipe: FDataTableRowHandle;
    TransmogSacrificeRow: FDataTableRowHandle;
    ConversionRecipes: FDataTableRowHandle[];
    UpgradeRarityRecipeHandle: FDataTableRowHandle;
    MinLevel: number;
    MaxLevel: number;
    GrantToProfileType: string;
}
