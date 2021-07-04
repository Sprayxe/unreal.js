"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIntPoint = void 0;
const FArchive_1 = require("../../../reader/FArchive");
/**
 * Represents an UE4 FIntPoint
 * @implements {IStructType}
 */
class FIntPoint {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg1, arg2) {
        if (arg1 instanceof FArchive_1.FArchive) {
            this.x = arg1.readInt32();
            this.y = arg1.readInt32();
        }
        else {
            this.x = arg1;
            this.y = arg2;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt32(this.x);
        Ar.writeInt32(this.y);
    }
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return `X=${this.x} Y=${this.y}`;
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            x: this.x,
            y: this.y
        };
    }
}
exports.FIntPoint = FIntPoint;
