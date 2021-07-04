"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPerPlatformBool = exports.FPerPlatformFloat = exports.FPerPlatformInt = void 0;
const FArchive_1 = require("../../reader/FArchive");
/**
 * FPerPlatformInt
 * @implements {IStructType}
 */
class FPerPlatformInt {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.cooked = x.readBoolean();
            this.value = x.readInt32();
        }
        else {
            this.cooked = x;
            this.value = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeBoolean(this.cooked);
        Ar.writeInt32(this.value);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            cooked: this.cooked,
            value: this.value
        };
    }
}
exports.FPerPlatformInt = FPerPlatformInt;
/**
 * FPerPlatformFloat
 * @implements {IStructType}
 */
class FPerPlatformFloat {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.cooked = x.readBoolean();
            this.value = x.readFloat32();
        }
        else {
            this.cooked = x;
            this.value = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeBoolean(this.cooked);
        Ar.writeFloat32(this.value);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            cooked: this.cooked,
            value: this.value
        };
    }
}
exports.FPerPlatformFloat = FPerPlatformFloat;
/**
 * FPerPlatformBool
 * @implements {IStructType}
 */
class FPerPlatformBool {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.cooked = x.readBoolean();
            this.value = x.readBoolean();
        }
        else {
            this.cooked = x;
            this.value = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeBoolean(this.cooked);
        Ar.writeBoolean(this.value);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            cooked: this.cooked,
            value: this.value
        };
    }
}
exports.FPerPlatformBool = FPerPlatformBool;
