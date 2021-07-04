"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterDataAsset = void 0;
const UObject_1 = require("../../ue4/assets/exports/UObject");
class CharacterDataAsset extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        this.CharacterID = null; // enum CharacterID
        this.Character = null;
        this.UIData = null;
        this.Role = null;
        this.CharacterSelectFXC = null;
        this.DeveloperName = null;
        this.bIsPlayableCharacter = false;
        this.bAvailableForTest = false;
        this.Uuid = null;
        this.bBaseContent = false;
    }
}
exports.CharacterDataAsset = CharacterDataAsset;
