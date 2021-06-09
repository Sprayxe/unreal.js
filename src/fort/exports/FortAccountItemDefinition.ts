import { FortPersistableItemDefinition } from "./FortPersistableItemDefinition";
import { FCurveTableRowHandle } from "../../ue4/assets/exports/UCurveTable";
import { FDataTableRowHandle } from "../../ue4/objects/FDataTableRowHandle";

export class FortAccountItemDefinition extends FortPersistableItemDefinition {
    public LevelToXpHandle: FCurveTableRowHandle = null
    public LevelToSacrificeXpHandle: FCurveTableRowHandle = null
    public SacrificeRecipe: FDataTableRowHandle = null
    public TransmogSacrificeRow: FDataTableRowHandle = null
    public ConversionRecipes: FDataTableRowHandle[] = null
    public UpgradeRarityRecipeHandle: FDataTableRowHandle = null
    public MinLevel: number = null
    public MaxLevel: number = null
    public GrantToProfileType: string = null
}