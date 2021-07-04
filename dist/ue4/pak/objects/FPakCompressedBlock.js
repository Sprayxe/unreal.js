"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPakCompressedBlock = void 0;
const FArchive_1 = require("../../reader/FArchive");
/**
 * FPakCompressedBlock
 */
class FPakCompressedBlock {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.compressedStart = Number(x.readInt64());
            this.compressedEnd = Number(x.readInt64());
        }
        else {
            this.compressedStart = x;
            this.compressedEnd = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt64(this.compressedStart);
        Ar.writeInt64(this.compressedEnd);
    }
}
exports.FPakCompressedBlock = FPakCompressedBlock;
