"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UInterfaceProperty = void 0;
const FArchive_1 = require("../../reader/FArchive");
/**
 * UInterfaceProperty
 */
class UInterfaceProperty {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x) {
        if (x instanceof FArchive_1.FArchive) {
            this.interfaceNumber = x.readInt32();
        }
        else {
            this.interfaceNumber = x;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeUInt32(this.interfaceNumber);
    }
}
exports.UInterfaceProperty = UInterfaceProperty;
