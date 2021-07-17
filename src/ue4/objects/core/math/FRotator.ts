import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { FVector } from "./FVector";
import { FRotationMatrix } from "./FRotationMatrix";
import { IStructType } from "../../../assets/objects/UScriptStruct";

/**
 * Implements a container for rotation information
 * All rotation values are stored in degrees
 * @implements {IStructType}
 */
export class FRotator implements IStructType {
    /**
     * Rotation around the right axis (around Y axis), Looking up and down (0=Straight Ahead, +Up, -Down)
     * @type {number}
     * @public
     */
    public pitch: number

    /**
     * Rotation around the up axis (around Z axis), Running in circles 0=East, +North, -South
     * @type {number}
     * @public
     */
    public yaw: number

    /**
     * Rotation around the forward axis (around X axis), Tilting your head, 0=Straight, +Clockwise, -CCW
     * @type {number}
     * @public
     */
    public roll: number

    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance with one default value
     * @param {number} f Value to set all components to
     * @constructor
     * @public
     */
    constructor(f: number)

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {number} pitch Pitch in degrees
     * @param {number} yaw Yaw in degrees
     * @param {number} roll Roll in degrees
     * @constructor
     * @public
     */
    constructor(pitch: number, yaw: number, roll: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any, z?: any) {
        if (x == null) {
            this.pitch = 0
            this.yaw = 0
            this.roll = 0
        } else if (typeof x === "number") {
            this.pitch = x
            this.yaw = x
            this.roll = x
        } else if (x instanceof FArchive) {
            this.pitch = x.readFloat32()
            this.yaw = x.readFloat32()
            this.roll = x.readFloat32()
        } else {
            this.pitch = x
            this.yaw = y
            this.roll = z
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeFloat32(this.pitch)
        Ar.writeFloat32(this.yaw)
        Ar.writeFloat32(this.roll)
    }

    /**
     * Get the result of adding a rotator to this
     * @param {FRotator} r The other rotator
     * @returns {FRotator} The result of adding a rotator to this
     * @public
     */
    "+"(r: FRotator): FRotator {
        return new FRotator(this.pitch + r.pitch, this.yaw + r.yaw, this.roll + r.roll)
    }

    /**
     * Get the result of subtracting a rotator from this
     * @param {FRotator} r The other rotator
     * @returns {FRotator} The result of subtracting a rotator from this
     * @public
     */
    "-"(r: FRotator): FRotator {
        return new FRotator(this.pitch - r.pitch, this.yaw - r.yaw, this.roll - r.roll)
    }

    /**
     * Get the result of scaling this rotator
     * @param {number} scale The scaling factor
     * @returns {number} The result of scaling
     * @public
     */
    "*"(scale: number): FRotator {
        return new FRotator(this.pitch * scale, this.yaw * scale, this.roll * scale)
    }

    /**
     * Multiply this rotator by a scaling factor
     * @param {number} scale The scaling factor
     * @returns {void}
     * @public
     */
    "*="(scale: number): void {
        this.pitch *= scale;
        this.yaw *= scale;
        this.roll *= scale
    }

    /**
     * Checks for equality to another object
     * @param {?any} other Other object
     * @returns {boolean}
     * @public
     */
    equals(other?: any): boolean {
        if (this === other) return true
        if (!(other instanceof FRotator)) return false

        other as FRotator

        if (this.pitch !== other.pitch) return false
        if (this.yaw !== other.yaw) return false

        return this.roll === other.roll;
    }

    /**
     * Rotate a vector rotated by this rotator
     * @param {FVector} v The vector to rotate
     * @returns {FVector} The rotated vector
     * @public
     */
    rotateVector(v: FVector): FVector {
        return new FVector(new FRotationMatrix(this).transformVector(v))
    }

    /**
     * Returns the vector rotated by the inverse of this rotator
     * @param {FVector} v The vector to rotate
     * @returns {FVector} The rotated vector
     * @public
     */
    unrotateVector(v: FVector): FVector {
        return new FVector(new FRotationMatrix(this).transposed.transformVector(v))
    }

    /**
     * Get a textual representation of the vector
     * @returns {string} Text describing the vector
     * @public
     */
    toString() {
        return `P=${this.pitch} Y=${this.yaw} R=${this.roll}`
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            pitch: this.pitch,
            yaw: this.yaw,
            roll: this.roll
        }
    }
}
