"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFrameNumber = void 0;
const FArchive_1 = require("../../../reader/FArchive");
/**
 * FFrameNumber
 * @implements {IStructType}
 */
class FFrameNumber {
    /**
     * Creates an instance using an UE4 Reader or number
     * @param {FArchive | number} arg UE4 Reader or number to use
     * @constructor
     * @public
     */
    constructor(arg) {
        this.value = arg instanceof FArchive_1.FArchive ? arg.readFloat32() : arg;
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeFloat32(this.value);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return this.value;
    }
}
exports.FFrameNumber = FFrameNumber;
