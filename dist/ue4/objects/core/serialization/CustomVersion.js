"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCustomVersion = void 0;
const Guid_1 = require("../misc/Guid");
const FArchive_1 = require("../../../reader/FArchive");
/**
 * FCustomVersion
 */
class FCustomVersion {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.key = new Guid_1.FGuid(x);
            this.version = x.readInt32();
        }
        else {
            this.key = x;
            this.version = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.key.serialize(Ar);
        Ar.writeInt32(this.version);
    }
}
exports.FCustomVersion = FCustomVersion;
