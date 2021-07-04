"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRangeBound = void 0;
const FArchive_1 = require("../../../reader/FArchive");
/**
 * Template for range bounds
 * @implements {IStructType}
 */
class TRangeBound {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.type = x.readInt8();
            this.value = y();
        }
        else {
            this.type = x;
            this.value = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @param {void} write Function to use
     * @example <TRangeBound>.serialize(Ar, (it) => Ar.writeInt8(it))
     * @returns {void}
     * @public
     */
    serialize(Ar, write) {
        Ar.writeInt8(this.type);
        write(this.value);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            type: Object.keys(ERangeBoundTypes)[this.type],
            value: this.value.toJson ? this.value.toJson() : this.value
        };
    }
}
exports.TRangeBound = TRangeBound;
/**
 * Enumerates the valid types of range bounds.
 */
var ERangeBoundTypes;
(function (ERangeBoundTypes) {
    /** The range excludes the bound. */
    ERangeBoundTypes[ERangeBoundTypes["Exclusive"] = 0] = "Exclusive";
    /** The range includes the bound. */
    ERangeBoundTypes[ERangeBoundTypes["Inclusive"] = 1] = "Inclusive";
    /** The bound is open. */
    ERangeBoundTypes[ERangeBoundTypes["Open"] = 2] = "Open";
})(ERangeBoundTypes || (ERangeBoundTypes = {}));
