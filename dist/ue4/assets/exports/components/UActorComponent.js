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
exports.UActorComponent = exports.FSimpleMemberReference = exports.EComponentCreationMethod = void 0;
const UObject_1 = require("../UObject");
const UProperty_1 = require("../../../../util/decorators/UProperty");
/**
 * EComponentCreationMethod
 * @enum
 */
var EComponentCreationMethod;
(function (EComponentCreationMethod) {
    EComponentCreationMethod[EComponentCreationMethod["Native"] = 0] = "Native";
    EComponentCreationMethod[EComponentCreationMethod["SimpleConstructionScript"] = 1] = "SimpleConstructionScript";
    EComponentCreationMethod[EComponentCreationMethod["UserConstructionScript"] = 2] = "UserConstructionScript";
    EComponentCreationMethod[EComponentCreationMethod["Instance"] = 3] = "Instance";
})(EComponentCreationMethod = exports.EComponentCreationMethod || (exports.EComponentCreationMethod = {}));
/**
 * FSimpleMemberReference
 */
class FSimpleMemberReference {
}
exports.FSimpleMemberReference = FSimpleMemberReference;
/**
 * UActorComponent
 * @extends {UObject}
 */
class UActorComponent extends UObject_1.UObject {
}
__decorate([
    UProperty_1.UProperty({ skipPrevious: 1 }),
    __metadata("design:type", Array)
], UActorComponent.prototype, "ComponentTags", void 0);
exports.UActorComponent = UActorComponent;
