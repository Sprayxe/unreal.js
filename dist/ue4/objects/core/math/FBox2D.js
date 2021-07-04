"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBox2D = void 0;
const FVector2D_1 = require("./FVector2D");
const FArchive_1 = require("../../../reader/FArchive");
/**
 * Implements a rectangular 2D Box
 * @implements {IStructType}
 */
class FBox2D {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (!x) {
            this.max = new FVector2D_1.FVector2D(0, 0);
            this.min = new FVector2D_1.FVector2D(0, 0);
            this.isValid = false;
        }
        else if (x instanceof FArchive_1.FArchive) {
            this.max = new FVector2D_1.FVector2D(x);
            this.min = new FVector2D_1.FVector2D(x);
            this.isValid = x.readFlag();
        }
        else {
            this.max = x;
            this.min = y;
            this.isValid = true;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Reader to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.min.serialize(Ar);
        this.max.serialize(Ar);
        Ar.writeFlag(this.isValid);
    }
    /**
     * Get a textual representation of this box
     * @returns {string} A string describing the box
     * @public
     */
    toString() {
        return `bIsValid=${this.isValid}, Min=(${this.min.toString()}), Max=(${this.max.toString()})`;
    }
    /**
     * Turns this into json
     * @returns {any} json
     * @public
     */
    toJson() {
        return {
            bIsValid: this.isValid,
            min: this.min.toJson(),
            max: this.max.toJson()
        };
    }
}
exports.FBox2D = FBox2D;
