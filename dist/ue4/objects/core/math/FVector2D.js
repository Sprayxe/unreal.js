"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FVector2D = void 0;
const FArchive_1 = require("../../../reader/FArchive");
/**
 * A vector in 2-D space composed of components (X, Y) with floating point precision
 * @implements {IStructType}
 */
class FVector2D {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg1, arg2) {
        if (arg1 instanceof FArchive_1.FArchive) {
            this.x = arg1.readFloat32();
            this.y = arg1.readFloat32();
        }
        else if (arg1 && arg2) {
            this.x = arg1;
            this.y = arg2;
        }
        else {
            this.x = 0;
            this.y = 0;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeFloat32(this.x);
        Ar.writeFloat32(this.y);
    }
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return `X=${this.x.toLocaleString()} Y=${this.y.toLocaleString()}`;
    }
    /**
     * Turns this into json
     * @returns {json} Json
     * @public
     */
    toJson() {
        return {
            x: this.x,
            y: this.y
        };
    }
}
exports.FVector2D = FVector2D;
