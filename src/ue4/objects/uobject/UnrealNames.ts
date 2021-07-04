import { FArchive } from "../../reader/FArchive";

/**
 * FSerializedNameHeader
 */
export class FSerializedNameHeader {
    /**
     * Data
     * @type {Buffer}
     * @public
     */
    data = Buffer.alloc(2)

    /**
     * Creates an instance using an UE4 Reader or an empty instance
     * @param {?FArchive} Ar UE4 Reader to use or null
     * @constructor
     * @public
     */
    constructor(Ar?: FArchive) {
        if (Ar)
            Ar.readToBuffer(this.data)
    }

    /**
     * Whether is utf16 encoded
     * @returns {boolean} Result
     * @public
     */
    isUtf16() {
        return (this.data[0] & 0x80) !== 0
    }

    /**
     * Gets length
     * @returns {number} Length
     * @public
     */
    len() {
        return ((this.data[0] & 0x7F) << 8) + this.data[1]
    }
}

/**
 * Loads name header
 * @param {FArchive} inOutAr UE4 Reader to use
 * @returns {string} Header
 * @public
 */
export function loadNameHeader(inOutAr: FArchive) {
    const header = new FSerializedNameHeader(inOutAr)
    const len = header.len()
    return header.isUtf16()
        ? Buffer.from(inOutAr.readBuffer(len * 2)).toString("utf16le")
        : Buffer.from(inOutAr.readBuffer(len)).toString()
}
