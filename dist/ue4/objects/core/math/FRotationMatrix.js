"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRotationMatrix = void 0;
const FRotationTranslationMatrix_1 = require("./FRotationTranslationMatrix");
const FVector_1 = require("./FVector");
/**
 * Represents an UE4 FRotationMatrix
 * @extends {FRotationTranslationMatrix}
 * @implements {IStructType}
 */
class FRotationMatrix extends FRotationTranslationMatrix_1.FRotationTranslationMatrix {
    /**
     * Constructor
     * @param {FRotator} rot Rotation to use
     * @constructor
     * @public
     */
    constructor(rot) {
        super(rot, new FVector_1.FVector(0, 0, 0));
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return this.m;
    }
}
exports.FRotationMatrix = FRotationMatrix;
