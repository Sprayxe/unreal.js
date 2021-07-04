"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPackageId = exports.createFPackageId = exports.INVALID_ID = void 0;
const FArchive_1 = require("../../reader/FArchive");
const CityHash_1 = require("../../../util/CityHash");
/**
 * INVALID_ID
 * @type {string}
 * @export
 */
exports.INVALID_ID = (~0).toString();
/**
 * Creates an I/O package ID
 * @param {FName} name FName to use
 * @returns {bigint} ID
 * @export
 */
function createFPackageId(name) {
    const nameStr = name.toString().toLowerCase();
    const nameBuf = Buffer.from(nameStr, "utf16le");
    const hash = CityHash_1.CityHash.cityHash64(nameBuf, 0, nameBuf.length).toUnsigned().toString();
    if (hash === exports.INVALID_ID)
        throw new Error(`Package name hash collision \"${nameStr}\" and InvalidId`);
    return BigInt(hash);
}
exports.createFPackageId = createFPackageId;
/**
 * @deprecated Use '<FArchive>.readUInt64().toString()' or 'createFPackageId(<FName>)'
 */
class FPackageId {
    constructor(x) {
        this.id = exports.INVALID_ID;
        if (x instanceof FArchive_1.FArchive) {
            this.id = x.readUInt64().toString();
        }
        else {
            this.id = x;
        }
    }
    static fromName(name) {
        const nameStr = name.toString().toLowerCase();
        const nameBuf = Buffer.from(nameStr, "utf16le");
        const hash = CityHash_1.CityHash.cityHash64(nameBuf, 0, nameBuf.length).toUnsigned().toString();
        if (hash === exports.INVALID_ID)
            throw new Error(`Package name hash collision \"${nameStr}\" and InvalidId`);
        return new FPackageId(hash);
    }
    isValid() {
        return this.id !== exports.INVALID_ID;
    }
    value() {
        if (this.id === exports.INVALID_ID)
            throw new Error("Field 'id' must not be zero");
        return this.id;
    }
    equals(other) {
        if (this === other)
            return true;
        if (!(other instanceof FPackageId))
            return false;
        return this.id === other.id;
    }
    hashCode() {
        return this.id;
    }
    toString() {
        return this.id;
    }
}
exports.FPackageId = FPackageId;
