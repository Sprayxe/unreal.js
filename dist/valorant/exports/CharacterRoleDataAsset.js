"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterRoleDataAsset = void 0;
const UObject_1 = require("../../ue4/assets/exports/UObject");
class CharacterRoleDataAsset extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        this.UIData = null;
        this.Uuid = null;
    }
}
exports.CharacterRoleDataAsset = CharacterRoleDataAsset;
