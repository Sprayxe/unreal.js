"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRange = void 0;
const TRangeBound_1 = require("./TRangeBound");
const FArchive_1 = require("../../../reader/FArchive");
/**
 * Represents an UE4 Range
 * @implements {IStructType}
 */
class TRange {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.lowerBound = new TRangeBound_1.TRangeBound(x, y);
            this.upperBound = new TRangeBound_1.TRangeBound(x, y);
        }
        else {
            this.lowerBound = x;
            this.upperBound = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @param {void} write Function to use
     * @example <TRange>.serialize(Ar, (it) => Ar.writeInt8(it))
     * @returns {void}
     * @public
     */
    serialize(Ar, write) {
        this.lowerBound.serialize(Ar, write);
        this.upperBound.serialize(Ar, write);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            lowerBound: this.lowerBound.toJson(),
            upperBound: this.upperBound.toJson()
        };
    }
}
exports.TRange = TRange;
