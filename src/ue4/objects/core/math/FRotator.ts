/**
 * Implements a container for rotation information.
 *
 * All rotation values are stored in degrees.
 */
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { FVector } from "./FVector";
import { FRotationMatrix } from "./FRotationMatrix";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FRotator implements IStructType {
    /** Rotation around the right axis (around Y axis), Looking up and down (0=Straight Ahead, +Up, -Down) */
    public pitch: number

    /** Rotation around the up axis (around Z axis), Running in circles 0=East, +North, -South. */
    public yaw: number

    /** Rotation around the forward axis (around X axis), Tilting your head, 0=Straight, +Clockwise, -CCW. */
    public roll: number

    /**
     * - Default constructor (no initialization).
     */
    constructor()

    /**
     * - Constructor
     *
     * @param f Value to set all components to.
     */
    constructor(f: number)

    /**
     * - Constructor which initialized using FArchive
     *
     * @param Ar The FArchive instance to use
     */
    constructor(Ar: FArchive)

    /**
     * - Constructor.
     *
     * @param pitch Pitch in degrees.
     * @param yaw Yaw in degrees.
     * @param roll Roll in degrees.
     */
    constructor(pitch: number, yaw: number, roll: number)

    /**
     * - Constructor used by library
     */
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

    serialize(Ar: FArchiveWriter) {
        Ar.writeFloat32(this.pitch)
        Ar.writeFloat32(this.yaw)
        Ar.writeFloat32(this.roll)
    }

    /**
     * Get the result of adding a rotator to this.
     *
     * @param r The other rotator.
     * @return The result of adding a rotator to this.
     */
    plus(r: FRotator): FRotator {
        return new FRotator(this.pitch + r.pitch, this.yaw + r.yaw, this.roll + r.roll)
    }

    /**
     * Get the result of subtracting a rotator from this.
     *
     * @param r The other rotator.
     * @return The result of subtracting a rotator from this.
     */
    minus(r: FRotator): FRotator {
        return new FRotator(this.pitch - r.pitch, this.yaw - r.yaw, this.roll - r.roll)
    }

    /**
     * Get the result of scaling this rotator.
     *
     * @param scale The scaling factor.
     * @return The result of scaling.
     */
    times(scale: number): FRotator {
        return new FRotator(this.pitch * scale, this.yaw * scale, this.roll * scale)
    }

    /**
     * Multiply this rotator by a scaling factor.
     *
     * @param scale The scaling factor.
     */
    timesAssign(scale: number): void {
        this.pitch *= scale;
        this.yaw *= scale;
        this.roll *= scale
    }

    equals(other: any): boolean {
        if (this === other) return true
        if (!(other instanceof FRotator)) return false

        other as FRotator

        if (this.pitch !== other.pitch) return false
        if (this.yaw !== other.yaw) return false

        return this.roll === other.roll;
    }

    /**
     * Rotate a vector rotated by this rotator.
     *
     * @param v The vector to rotate.
     * @return The rotated vector.
     */
    rotateVector(v: FVector): FVector {
        return new FVector(new FRotationMatrix(this).transformVector(v))
    }

    /**
     * Returns the vector rotated by the inverse of this rotator.
     *
     * @param v The vector to rotate.
     * @return The rotated vector.
     */
    unrotateVector(v: FVector): FVector {
        return new FVector(new FRotationMatrix(this).getTransposed().transformVector(v))
    }

    /**
     * Get a textual representation of the vector.
     *
     * @return Text describing the vector.
     */
    toString() {
        return `P=${this.pitch} Y=${this.yaw} R=${this.roll}`
    }

    toJson(): any {
        return {
            pitch: this.pitch,
            yaw: this.yaw,
            roll: this.roll
        }
    }
}
