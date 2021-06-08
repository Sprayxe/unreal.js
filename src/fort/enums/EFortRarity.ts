import { FText } from "../../ue4/objects/core/i18n/Text";

export class EFortRarity extends FText {
    static Common = new EFortRarity("Fort.Rarity", "Common", "Common")
    static Uncommon = new EFortRarity("Fort.Rarity", "Uncommon", "Uncommon") // default
    static Rare = new EFortRarity("Fort.Rarity", "Rare", "Rare")
    static Epic = new EFortRarity("Fort.Rarity", "Epic", "Epic")
    static Legendary = new EFortRarity("Fort.Rarity", "Legendary", "Legendary")
    static Mythic = new EFortRarity("Fort.Rarity", "Mythic", "Mythic")
    static Transcendent = new EFortRarity("Fort.Rarity", "Transcendent", "Transcendent")
    static Unattainable = new EFortRarity("Fort.Rarity", "Unattainable", "Unattainable")

    eq(other?: any) {
        if (other === this) return true
        if (!(other instanceof EFortRarity)) return false
        return this.text === other.text
            && this.flags === other.flags
            && this.historyType === other.historyType
            && this.textHistory.text === other.textHistory?.text
    }
}