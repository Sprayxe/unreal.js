"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUniqueObjectGuid = void 0;
const Guid_1 = require("../core/misc/Guid");
const FArchive_1 = require("../../reader/FArchive");
/**
 * FUniqueObjectGuid
 */
class FUniqueObjectGuid {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x) {
        if (x instanceof FArchive_1.FArchive) {
            this.guid = new Guid_1.FGuid(x);
        }
        else {
            this.guid = x;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.guid.serialize(Ar);
    }
}
exports.FUniqueObjectGuid = FUniqueObjectGuid;
