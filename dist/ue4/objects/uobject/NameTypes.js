"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMinimalName = exports.FNameEntryId = exports.NAME_NO_NUMBER_INTERNAL = void 0;
const FArchive_1 = require("../../reader/FArchive");
const FName_1 = require("./FName");
/**
 * NAME_NO_NUMBER_INTERNAL
 * @type {number}
 * @public
 */
exports.NAME_NO_NUMBER_INTERNAL = 0;
/**
 * FNameEntryId
 */
class FNameEntryId {
    /**
     * Creates an instance using UE4 Reader or number
     * @param {number | FArchive} value Value to use
     * @constructor
     * @public
     */
    constructor(value) {
        /**
         * value
         * @type {number}
         * @public
         */
        this.value = 0;
        this.value = value instanceof FArchive_1.FArchive
            ? value.readUInt32()
            : value;
    }
}
exports.FNameEntryId = FNameEntryId;
/**
 * FMinimalName
 */
class FMinimalName {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        /**
         * Number portion of the string/number pair (stored internally as 1 more than actual, so zero'd memory will be the default, no-instance case)
         * @type {number}
         * @public
         */
        this.num = exports.NAME_NO_NUMBER_INTERNAL;
        if (x instanceof FArchive_1.FArchive) {
            this.index = new FNameEntryId(x);
            this.num = x.readInt32();
            this.nameMap = y;
        }
        else {
            this.index = x;
            this.num = y;
            this.nameMap = z;
        }
    }
    /**
     * Turns this into name
     * @returns {FNameDummy} FName instance
     * @public
     */
    toName() {
        return FName_1.FName.dummy(this.nameMap[this.index.value], this.num);
    }
}
exports.FMinimalName = FMinimalName;
