"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthenaCharacterItemDefinition = void 0;
const AthenaCosmeticItemDefinition_1 = require("./AthenaCosmeticItemDefinition");
const SoftObjectPath_1 = require("../../ue4/objects/uobject/SoftObjectPath");
const UProperty_1 = require("../../util/decorators/UProperty");
class AthenaCharacterItemDefinition extends AthenaCosmeticItemDefinition_1.AthenaCosmeticItemDefinition {
    constructor() {
        super(...arguments);
        this.RequestedDataStores = null;
        this.AuthoredVFXData_ByPart = null;
        this.HeroDefinition = null;
        this.DefaultBackpack = null;
        this.RequiredCosmeticItems = null;
        this.Gender = null;
        this.FeedbackBank = null;
        //public Map<GameplayTag, AthenaCharacterTaggedPartsList> TaggedPartsOverride;
    }
}
__decorate([
    UProperty_1.UProperty({ skipNext: 1 }),
    __metadata("design:type", SoftObjectPath_1.FSoftObjectPath)
], AthenaCharacterItemDefinition.prototype, "FeedbackBank", void 0);
exports.AthenaCharacterItemDefinition = AthenaCharacterItemDefinition;
