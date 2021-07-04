"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRotationTranslationMatrix = void 0;
const FMatrix_1 = require("./FMatrix");
const Utils_1 = require("../../../../util/Utils");
/**
 * Represents an UE4 FRotationTranslationMatrix
 * @extends {FMatrix}
 */
class FRotationTranslationMatrix extends FMatrix_1.FMatrix {
    /**
     * Constructor
     * @param {FRotator} rot Rotation to use
     * @param {FVector} origin Translation to use
     * @constructor
     * @public
     */
    constructor(rot, origin) {
        super();
        const p = Utils_1.Utils.toRadians(rot.pitch);
        const y = Utils_1.Utils.toRadians(rot.yaw);
        const r = Utils_1.Utils.toRadians(rot.roll);
        const sP = Math.sin(p);
        const sY = Math.sin(y);
        const sR = Math.sin(r);
        const cP = Math.cos(p);
        const cY = Math.cos(y);
        const cR = Math.cos(r);
        this.m[0][0] = cP * cY;
        this.m[0][1] = cP * sY;
        this.m[0][2] = sP;
        this.m[0][3] = 0;
        this.m[1][0] = sR * sP * cY - cR * sY;
        this.m[1][1] = sR * sP * sY + cR * cY;
        this.m[1][2] = -sR * cP;
        this.m[1][3] = 0;
        this.m[2][0] = -(cR * sP * cY + sR * sY);
        this.m[2][1] = cY * sR - cR * sP * sY;
        this.m[2][2] = cR * cP;
        this.m[2][3] = 0;
        this.m[3][0] = origin.x;
        this.m[3][1] = origin.y;
        this.m[3][2] = origin.z;
        this.m[3][3] = 1;
    }
}
exports.FRotationTranslationMatrix = FRotationTranslationMatrix;
