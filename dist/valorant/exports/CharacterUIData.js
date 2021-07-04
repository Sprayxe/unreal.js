"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterUIData = void 0;
const UObject_1 = require("../../ue4/assets/exports/UObject");
class CharacterUIData extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        this.FullPortrait = null;
        this.BustPortrait = null;
        this.DisplayIconSmall = null;
        this.DisplayIcon = null;
        this.Abilities = null; // Map<ECharacterAbilitySlot, FPackageIndex<CharacterAbilityUIData>>
        this.WwiseStateName = null;
        this.DisplayName = null;
        this.Description = null;
    }
}
exports.CharacterUIData = CharacterUIData;
