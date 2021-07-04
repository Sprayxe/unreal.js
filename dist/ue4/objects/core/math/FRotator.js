"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRotator = void 0;
const FArchive_1 = require("../../../reader/FArchive");
const FVector_1 = require("./FVector");
const FRotationMatrix_1 = require("./FRotationMatrix");
/**
 * Implements a container for rotation information
 * All rotation values are stored in degrees
 * @implements {IStructType}
 */
class FRotator {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        if (x == null) {
            this.pitch = 0;
            this.yaw = 0;
            this.roll = 0;
        }
        else if (typeof x === "number") {
            this.pitch = x;
            this.yaw = x;
            this.roll = x;
        }
        else if (x instanceof FArchive_1.FArchive) {
            this.pitch = x.readFloat32();
            this.yaw = x.readFloat32();
            this.roll = x.readFloat32();
        }
        else {
            this.pitch = x;
            this.yaw = y;
            this.roll = z;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeFloat32(this.pitch);
        Ar.writeFloat32(this.yaw);
        Ar.writeFloat32(this.roll);
    }
    /**
     * Get the result of adding a rotator to this
     * @param {FRotator} r The other rotator
     * @returns {FRotator} The result of adding a rotator to this
     * @public
     */
    plus(r) {
        return new FRotator(this.pitch + r.pitch, this.yaw + r.yaw, this.roll + r.roll);
    }
    /**
     * Get the result of subtracting a rotator from this
     * @param {FRotator} r The other rotator
     * @returns {FRotator} The result of subtracting a rotator from this
     * @public
     */
    minus(r) {
        return new FRotator(this.pitch - r.pitch, this.yaw - r.yaw, this.roll - r.roll);
    }
    /**
     * Get the result of scaling this rotator
     * @param {number} scale The scaling factor
     * @returns {number} The result of scaling
     * @public
     */
    times(scale) {
        return new FRotator(this.pitch * scale, this.yaw * scale, this.roll * scale);
    }
    /**
     * Multiply this rotator by a scaling factor
     * @param {number} scale The scaling factor
     * @returns {void}
     * @public
     */
    timesAssign(scale) {
        this.pitch *= scale;
        this.yaw *= scale;
        this.roll *= scale;
    }
    /**
     * Checks for equality to another object
     * @param {?any} other Other object
     * @returns {boolean}
     * @public
     */
    equals(other) {
        if (this === other)
            return true;
        if (!(other instanceof FRotator))
            return false;
        other;
        if (this.pitch !== other.pitch)
            return false;
        if (this.yaw !== other.yaw)
            return false;
        return this.roll === other.roll;
    }
    /**
     * Rotate a vector rotated by this rotator
     * @param {FVector} v The vector to rotate
     * @returns {FVector} The rotated vector
     * @public
     */
    rotateVector(v) {
        return new FVector_1.FVector(new FRotationMatrix_1.FRotationMatrix(this).transformVector(v));
    }
    /**
     * Returns the vector rotated by the inverse of this rotator
     * @param {FVector} v The vector to rotate
     * @returns {FVector} The rotated vector
     * @public
     */
    unrotateVector(v) {
        return new FVector_1.FVector(new FRotationMatrix_1.FRotationMatrix(this).transposed.transformVector(v));
    }
    /**
     * Get a textual representation of the vector
     * @returns {string} Text describing the vector
     * @public
     */
    toString() {
        return `P=${this.pitch} Y=${this.yaw} R=${this.roll}`;
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            pitch: this.pitch,
            yaw: this.yaw,
            roll: this.roll
        };
    }
}
exports.FRotator = FRotator;
