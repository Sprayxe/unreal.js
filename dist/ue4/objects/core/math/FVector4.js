"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FVector4 = void 0;
const FVector_1 = require("./FVector");
const FVector2D_1 = require("./FVector2D");
const FArchive_1 = require("../../../reader/FArchive");
const FColor_1 = require("./FColor");
class FVector4 {
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    constructor(arg1, arg2, arg3, arg4) {
        if (arg1 instanceof FArchive_1.FArchive) {
            this.x = arg1.readFloat32();
            this.y = arg1.readFloat32();
            this.z = arg1.readFloat32();
            this.w = arg1.readFloat32();
        }
        else if (arg1 instanceof FVector_1.FVector) {
            this.x = arg1.x;
            this.y = arg1.y;
            this.z = arg1.z;
            this.w = arg2;
        }
        else if (arg1 instanceof FVector2D_1.FVector2D) {
            this.x = arg1.x;
            this.y = arg1.y;
            this.z = arg2.x;
            this.w = arg2.y;
        }
        else if (arg1 instanceof FColor_1.FLinearColor) {
            this.x = arg1.r;
            this.y = arg1.g;
            this.z = arg1.b;
            this.w = arg1.a;
        }
        else if (arg1 != null && arg2 != null) {
            this.x = arg1;
            this.y = arg2;
            this.z = arg3;
            this.w = arg4;
        }
        else {
            this.x = 0.0;
            this.y = 0.0;
            this.z = 0.0;
            this.w = 0.0;
        }
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            w: this.w
        };
    }
}
exports.FVector4 = FVector4;
