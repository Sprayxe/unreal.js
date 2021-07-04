"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FByteArchive = void 0;
const FArchive_1 = require("./FArchive");
/**
 * Byte Reader for UE4
 * @extends {FArchive}
 */
class FByteArchive extends FArchive_1.FArchive {
    /**
     * Creates an instance
     * @param {Buffer} data Buffer to reader
     * @constructor
     * @public
     */
    constructor(data) {
        super(data);
    }
    /**
     * Clones this instance
     * @returns {FByteArchive}
     * @public
     */
    clone() {
        const clone = new FByteArchive(this.data);
        clone.pos = this.pos;
        return clone;
    }
    /**
     * Returns FArchive info for error
     * @returns {string}
     * @public
     */
    printError() {
        return super.printError()
            .replace("FArchive", "FByteArchive");
    }
}
exports.FByteArchive = FByteArchive;
