"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FNavAgentSelector = void 0;
const FArchive_1 = require("../../../reader/FArchive");
/**
 * FNavAgentSelector
 * @implements {IStructType}
 */
class FNavAgentSelector {
    /**
     * Creates an instance using UE4 Reader or number
     * @param {FArchive | number} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg) {
        this.packedBits = arg instanceof FArchive_1.FArchive ? arg.readUInt32() : arg;
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeUInt32(this.packedBits);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return this.packedBits;
    }
}
exports.FNavAgentSelector = FNavAgentSelector;
