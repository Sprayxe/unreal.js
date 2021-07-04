"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FDateTime = void 0;
const FArchive_1 = require("../../../reader/FArchive");
/**
 * FDateTime
 * @implements {IStructType}
 */
class FDateTime {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x) {
        /**
         * Date
         * @type {string}
         * @public
         */
        this.date = null;
        if (x instanceof FArchive_1.FArchive) {
            this.date = x.readInt64().toString();
        }
        else {
            this.date = x;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt64(parseInt(this.date));
    }
    /**
     * Turns this into a date
     * @returns {Date}
     * @public
     */
    toDate() {
        return new Date(this.date);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return this.date;
    }
}
exports.FDateTime = FDateTime;
