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
exports.FTransform = void 0;
const FVector_1 = require("./FVector");
const FQuat_1 = require("./FQuat");
const FArchive_1 = require("../../../reader/FArchive");
const UProperty_1 = require("../../../../util/decorators/UProperty");
/**
 * Represent an UE4 FTransform
 * @implements {IStructType}
 */
class FTransform {
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        if (!x) {
            this.rotation = new FQuat_1.FQuat(0, 0, 0, 0);
            this.translation = new FVector_1.FVector();
            this.scale3D = new FVector_1.FVector(1);
        }
        else if (x instanceof FArchive_1.FArchive) {
            this.rotation = new FQuat_1.FQuat(x);
            this.translation = new FVector_1.FVector(x);
            this.scale3D = new FVector_1.FVector(x);
        }
        else {
            this.rotation = x;
            this.translation = y;
            this.scale3D = z;
        }
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            rotation: this.rotation.toJson(),
            translation: this.translation.toJson(),
            scale3D: this.scale3D.toJson()
        };
    }
}
__decorate([
    UProperty_1.UProperty({ name: "rotation" }),
    __metadata("design:type", FQuat_1.FQuat
    /**
     * Translation value
     * @type {FVector}
     * @public
     */
    )
], FTransform.prototype, "rotation", void 0);
__decorate([
    UProperty_1.UProperty({ name: "translation" }),
    __metadata("design:type", FVector_1.FVector
    /**
     * Scale 3D value
     * @type {FVector}
     * @public
     */
    )
], FTransform.prototype, "translation", void 0);
__decorate([
    UProperty_1.UProperty({ name: "Scale3D" }),
    __metadata("design:type", FVector_1.FVector
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    )
], FTransform.prototype, "scale3D", void 0);
exports.FTransform = FTransform;
