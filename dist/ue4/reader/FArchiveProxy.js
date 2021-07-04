"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FArchiveProxy = void 0;
const FArchive_1 = require("./FArchive");
/**
 * Proxy for UE4 Reader
 * @extends {FArchive}
 */
class FArchiveProxy extends FArchive_1.FArchive {
    /**
     * Creates an instance
     * @param {FArchive} wrappedAr FArchive instance
     * @constructor
     * @public
     */
    constructor(wrappedAr) {
        super();
        this.wrappedAr = wrappedAr;
        this.littleEndian = this.wrappedAr.littleEndian;
    }
    /**
     * Clones this instance
     * @returns {FArchiveProxy}
     * @public
     */
    clone() {
        return new FArchiveProxy(this.wrappedAr);
    }
    /**
     * Current position
     * @type {number}
     * @public
     */
    get pos() {
        return this.wrappedAr.pos;
    }
    set pos(pos) {
        this.wrappedAr.pos = pos;
    }
    /**
     * Size of this reader
     * @type {number}
     * @public
     */
    get size() {
        return this.wrappedAr.size;
    }
    // Only overriding these to keep optimal performance with FByteArchive
    /**
     * Reads an 8-bit integer
     * @returns {number} Result
     * @public
     */
    readInt8() {
        return this.wrappedAr.readInt8();
    }
    /**
     * Reads a 16-bit integer
     * @returns {number} Result
     * @public
     */
    readInt16() {
        return this.wrappedAr.readInt16();
    }
    /**
     * Reads a 32-bit integer
     * @returns {number} Result
     * @public
     */
    readInt32() {
        return this.wrappedAr.readInt32();
    }
    /**
     * Reads a 64-bit integer
     * @returns {number} Result
     * @public
     */
    readInt64() {
        return this.wrappedAr.readInt64();
    }
    /**
     * Reads a float
     * @returns {number} Result
     * @public
     */
    readFloat32() {
        return this.wrappedAr.readFloat32();
    }
    /**
     * Reads a double
     * @returns {number} Result
     * @public
     */
    readDouble() {
        return this.wrappedAr.readDouble();
    }
    /**
     * Creates a string with FArchive info for error
     * @returns {string} Result
     * @public
     */
    printError() {
        // 5head /s
        return super.printError()
            .replace("FArchive", "FArchiveProxy");
    }
}
exports.FArchiveProxy = FArchiveProxy;
