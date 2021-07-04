"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCompressedChunk = void 0;
const FArchive_1 = require("../../reader/FArchive");
class FCompressedChunk {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        if (params[0] instanceof FArchive_1.FArchive) {
            const Ar = params[0];
            this.uncompressedOffset = Ar.readInt32();
            this.uncompressedSize = Ar.readInt32();
            this.compressedOffset = Ar.readInt32();
            this.compressedSize = Ar.readInt32();
        }
        else {
            this.uncompressedOffset = params[0];
            this.uncompressedSize = params[1];
            this.compressedOffset = params[2];
            this.compressedSize = params[3];
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar FArchiveWriter to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt32(this.uncompressedOffset);
        Ar.writeInt32(this.uncompressedSize);
        Ar.writeInt32(this.compressedOffset);
        Ar.writeInt32(this.compressedSize);
    }
}
exports.FCompressedChunk = FCompressedChunk;
