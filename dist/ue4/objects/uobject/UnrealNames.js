"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadNameHeader = exports.FSerializedNameHeader = void 0;
/**
 * FSerializedNameHeader
 */
class FSerializedNameHeader {
    /**
     * Creates an instance using an UE4 Reader or an empty instance
     * @param {?FArchive} Ar UE4 Reader to use or null
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * Data
         * @type {Buffer}
         * @public
         */
        this.data = Buffer.alloc(2);
        if (Ar)
            Ar.readToBuffer(this.data);
    }
    /**
     * Whether is utf16 encoded
     * @returns {boolean} Result
     * @public
     */
    isUtf16() {
        return (this.data[0] & 0x80) !== 0;
    }
    /**
     * Gets length
     * @returns {number} Length
     * @public
     */
    len() {
        return ((this.data[0] & 0x7F) << 8) + this.data[1];
    }
}
exports.FSerializedNameHeader = FSerializedNameHeader;
/**
 * Loads name header
 * @param {FArchive} inOutAr UE4 Reader to use
 * @returns {string} Header
 * @public
 */
function loadNameHeader(inOutAr) {
    const header = new FSerializedNameHeader(inOutAr);
    const len = header.len();
    return header.isUtf16()
        ? Buffer.from(inOutAr.readBuffer(len * 2)).toString("utf16le")
        : Buffer.from(inOutAr.readBuffer(len)).toString();
}
exports.loadNameHeader = loadNameHeader;
