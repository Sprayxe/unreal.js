"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIntVector = void 0;
const FArchive_1 = require("../../../reader/FArchive");
class FIntVector {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg1, arg2, arg3) {
        if (arg1 instanceof FArchive_1.FArchive) {
            this.x = arg1.readInt32();
            this.y = arg1.readInt32();
            this.z = arg1.readInt32();
        }
        else {
            this.x = arg1;
            this.y = arg2;
            this.z = arg3;
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
        Ar.writeInt32(this.z);
    }
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return `X=${this.x} Y=${this.y} Z=${this.z}`;
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
            z: this.z
        };
    }
}
exports.FIntVector = FIntVector;
