"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIoContainerId = exports.createFIoContainerId = void 0;
const FArchive_1 = require("../reader/FArchive");
/**
 * Creates FIoContainer ID
 * @param {bigint | FArchive | null} source Source to use
 * @returns {bigint} ID
 * @export
 */
function createFIoContainerId(source) {
    let id = 0xffffffffffffffffn;
    if (source) {
        id = source instanceof FArchive_1.FArchive
            ? source.readUInt64()
            : source;
    }
    return id;
}
exports.createFIoContainerId = createFIoContainerId;
/**
 * Container ID
 * @deprecated Use 'createFIoContainerId(source?: string | FArchive)' and 'isFIoContainerIdValid(id: string)'
 */
class FIoContainerId {
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    constructor(x) {
        /**
         * ID
         * @type {string}
         * @public
         */
        this.id = FIoContainerId.InvalidId;
        if (x)
            this.id = x instanceof FArchive_1.FArchive ? x.readUInt64().toString() : x;
    }
    /**
     * Returns ID value
     * @returns {string} ID
     * @public
     */
    value() {
        return this.id;
    }
    /**
     * Whether valid
     * @returns {boolean} Result
     * @public
     */
    isValid() {
        return this.id !== FIoContainerId.InvalidId;
    }
    /**
     * Whether equals other object
     * @param {?any} other Object to check
     * @returns {boolean} Result
     * @public
     */
    equals(other) {
        if (this === other)
            return true;
        if (!(this instanceof FIoContainerId))
            return false;
        return this.id === other.id;
    }
}
exports.FIoContainerId = FIoContainerId;
/**
 * Invalid ID
 * @type {string}
 * @public
 * @static
 */
FIoContainerId.InvalidId = (0xffffffffffffffffn).toString();
