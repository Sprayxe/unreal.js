import { FortPersistableItemDefinition } from "./FortPersistableItemDefinition";
import { FCurveTableRowHandle } from "../../ue4/assets/exports/UCurveTable";
import { FDataTableRowHandle } from "../../ue4/objects/FDataTableRowHandle";

export class FortAccountItemDefinition extends FortPersistableItemDefinition {
    public LevelToXpHandle: FCurveTableRowHandle
    public LevelToSacrificeXpHandle: FCurveTableRowHandle
    public SacrificeRecipe: FDataTableRowHandle
    public TransmogSacrificeRow: FDataTableRowHandle
    public ConversionRecipes: FDataTableRowHandle[]
    public UpgradeRarityRecipeHandle: FDataTableRowHandle
    public MinLevel: number
    public MaxLevel: number
    public GrantToProfileType: string
}