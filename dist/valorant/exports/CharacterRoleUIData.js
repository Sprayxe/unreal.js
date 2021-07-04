"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterRoleUIData = void 0;
const UObject_1 = require("../../ue4/assets/exports/UObject");
class CharacterRoleUIData extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        this.DisplayName = null;
        this.Description = null;
        this.DisplayIcon = null;
    }
}
exports.CharacterRoleUIData = CharacterRoleUIData;
