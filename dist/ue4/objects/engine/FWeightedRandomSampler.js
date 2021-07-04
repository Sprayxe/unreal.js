"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FWeightedRandomSampler = void 0;
const FArchive_1 = require("../../reader/FArchive");
/**
 * FWeightedRandomSampler
 * @implements {IStructType}
 */
class FWeightedRandomSampler {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        if (x instanceof FArchive_1.FArchive) {
            this.prob = x.readArray(() => x.readFloat32());
            this.alias = x.readArray(() => x.readInt32());
            this.totalWeight = x.readFloat32();
        }
        else {
            this.prob = x;
            this.alias = y;
            this.totalWeight = z;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeTArray(this.prob, (it) => Ar.writeFloat32(it));
        Ar.writeTArray(this.alias, (it) => Ar.writeInt32(it));
        Ar.writeFloat32(this.totalWeight);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            prob: this.prob,
            alias: this.alias,
            totalWeight: this.totalWeight
        };
    }
}
exports.FWeightedRandomSampler = FWeightedRandomSampler;
