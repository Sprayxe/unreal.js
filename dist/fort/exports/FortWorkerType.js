"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortWorkerType = void 0;
const FortCharacterType_1 = require("./FortCharacterType");
class FortWorkerType extends FortCharacterType_1.FortCharacterType {
    constructor() {
        super(...arguments);
        this.Gender = null;
        this.FixedPortrait = null;
        this.bIsManager = false;
        this.ManagerSynergyTag = null;
        this.FixedPersonalityTag = null;
        this.FixedSetBonusTag = null;
        this.MatchingPersonalityBonus = null;
        this.MismatchingPersonalityPenalty = null;
    }
}
exports.FortWorkerType = FortWorkerType;
