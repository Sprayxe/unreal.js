"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSmartName = void 0;
const FArchive_1 = require("../../../reader/FArchive");
/**
 * FSmartName
 * @implements {IStructType}
 */
class FSmartName {
    /**
     * Creates an instance using an UE4 Reader or FName
     * @param {FArchive | FName} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg) {
        this.displayName = arg instanceof FArchive_1.FArchive ? arg.readFName() : arg;
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeFName(this.displayName);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return this.displayName.text;
    }
}
exports.FSmartName = FSmartName;
