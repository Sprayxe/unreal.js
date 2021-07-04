"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMatrix = void 0;
const UnrealArray_1 = require("../../../../util/UnrealArray");
const FVector4_1 = require("./FVector4");
const FVector_1 = require("./FVector");
/**
 * Represents an UE4 FMatix
 * @implements {IStructType}
 */
class FMatrix {
    constructor() {
        /**
         * Values
         * @type {Array<Array<number>>}
         * @public
         */
        this.m = new UnrealArray_1.UnrealArray(4, () => new Array(4));
    }
    /**
     * Homogeneous transform
     * @param {FVector4} p Vector to transform
     * @returns {FVector4} Transformed vector
     * @public
     */
    transformFVector4(p) {
        return new FVector4_1.FVector4(p.x * this.m[0][0] + p.y * this.m[1][0] + p.z * this.m[2][0] + p.w * this.m[3][0], p.x * this.m[0][1] + p.y * this.m[1][1] + p.z * this.m[2][1] + p.w * this.m[3][1], p.x * this.m[0][2] + p.y * this.m[1][2] + p.z * this.m[2][2] + p.w * this.m[3][2], p.x * this.m[0][3] + p.y * this.m[1][3] + p.z * this.m[2][3] + p.w * this.m[3][3]);
    }
    /**
     * Transform a direction vector - will not take into account translation part of the FMatrix
     * If you want to transform a surface normal (or plane) and correctly account for non-uniform scaling you should use transformByUsingAdjointT
     * @param {FVector4} v Vector to transform
     * @returns {FVector4} Transformed vector
     * @public
     */
    transformVector(v) {
        return this.transformFVector4(new FVector4_1.FVector4(v.x, v.y, v.z, 0));
    }
    /**
     * Gets a transposed representation of current instance
     * @type {FMatrix}
     * @public
     */
    get transposed() {
        const result = new FMatrix();
        result.m[0][0] = this.m[0][0];
        result.m[0][1] = this.m[1][0];
        result.m[0][2] = this.m[2][0];
        result.m[0][3] = this.m[3][0];
        result.m[1][0] = this.m[0][1];
        result.m[1][1] = this.m[1][1];
        result.m[1][2] = this.m[2][1];
        result.m[1][3] = this.m[3][1];
        result.m[2][0] = this.m[0][2];
        result.m[2][1] = this.m[1][2];
        result.m[2][2] = this.m[2][2];
        result.m[2][3] = this.m[3][2];
        result.m[3][0] = this.m[0][3];
        result.m[3][1] = this.m[1][3];
        result.m[3][2] = this.m[2][3];
        result.m[3][3] = this.m[3][3];
        return result;
    }
    ///** Apply Scale to this matrix **/
    // TODO applyScale(scale: number)
    /**
     * The origin of the co-ordinate system
     * @type {FVector}
     * @public
     */
    get origin() {
        return new FVector_1.FVector(this.m[3][0], this.m[3][1], this.m[3][2]);
    }
    /**
     * Get a textual representation of the vector
     * @returns {string} Text describing the vector
     * @public
     */
    toString() {
        let output = "";
        output += `[${this.m[0][0]} ${this.m[0][1]} ${this.m[0][2]} ${this.m[0][3]}] `;
        output += `[${this.m[1][0]} ${this.m[1][1]} ${this.m[1][2]} ${this.m[1][3]}] `;
        output += `[${this.m[2][0]} ${this.m[2][1]} ${this.m[2][2]} ${this.m[2][3]}] `;
        output += `[${this.m[3][0]} ${this.m[3][1]} ${this.m[3][2]} ${this.m[3][3]}] `;
        return output;
    }
    /**
     * Turns this into string
     * @returns {any}
     * @public
     */
    toJson() {
        return this.m;
    }
}
exports.FMatrix = FMatrix;
