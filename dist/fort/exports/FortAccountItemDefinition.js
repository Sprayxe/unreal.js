"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortAccountItemDefinition = void 0;
const FortPersistableItemDefinition_1 = require("./FortPersistableItemDefinition");
class FortAccountItemDefinition extends FortPersistableItemDefinition_1.FortPersistableItemDefinition {
    constructor() {
        super(...arguments);
        this.LevelToXpHandle = null;
        this.LevelToSacrificeXpHandle = null;
        this.SacrificeRecipe = null;
        this.TransmogSacrificeRow = null;
        this.ConversionRecipes = null;
        this.UpgradeRarityRecipeHandle = null;
        this.MinLevel = null;
        this.MaxLevel = null;
        this.GrantToProfileType = null;
    }
}
exports.FortAccountItemDefinition = FortAccountItemDefinition;
