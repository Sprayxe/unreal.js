"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFortRarity = void 0;
const Text_1 = require("../../ue4/objects/core/i18n/Text");
class EFortRarity extends Text_1.FText {
    eq(other) {
        if (other === this)
            return true;
        if (!(other instanceof EFortRarity))
            return false;
        return this.text === other.text
            && this.flags === other.flags
            && this.historyType === other.historyType
            && this.textHistory.text === other.textHistory?.text;
    }
}
exports.EFortRarity = EFortRarity;
EFortRarity.Common = new EFortRarity("Fort.Rarity", "Common", "Common");
EFortRarity.Uncommon = new EFortRarity("Fort.Rarity", "Uncommon", "Uncommon"); // default
EFortRarity.Rare = new EFortRarity("Fort.Rarity", "Rare", "Rare");
EFortRarity.Epic = new EFortRarity("Fort.Rarity", "Epic", "Epic");
EFortRarity.Legendary = new EFortRarity("Fort.Rarity", "Legendary", "Legendary");
EFortRarity.Mythic = new EFortRarity("Fort.Rarity", "Mythic", "Mythic");
EFortRarity.Transcendent = new EFortRarity("Fort.Rarity", "Transcendent", "Transcendent");
EFortRarity.Unattainable = new EFortRarity("Fort.Rarity", "Unattainable", "Unattainable");
