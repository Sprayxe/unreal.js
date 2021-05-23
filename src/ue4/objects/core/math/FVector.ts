import { FArchive } from "../../../reader/FArchive";
import { FVector2D } from "./FVector2D";
import { FVector4 } from "./FVector4";
import { FLinearColor } from "./FColor";
import { FIntVector } from "./FIntVector";
import { FIntPoint } from "./FIntPoint";
import { KINDA_SMALL_NUMBER } from "../../../../util/Const";
import { square } from "./UnrealMathUtility";

/** Allowed error for a normalized vector (against squared magnitude) */
const THRESH_VECTOR_NORMALIZED = 0.01
export class FVector {
    /** Vector's X component. */
    public x: number
    /** Vector's Y component. */
    public y: number
    /** Vector's Z component. */
    public z: number

    /** Default constructor (no initialization). */
    constructor()

    /**
     * - Constructor initializing all components to a single float value.
     *
     * @param f Value to set all components to.
     */
    constructor(f: number)

    /**
     * - Constructor initializing all components using FArchive
     *
     * @param Ar FArchive to use.
     */
    constructor(Ar: FArchive)

    /**
     * - Constructor using the XYZ components from a 4D vector.
     *
     * @param v 4D Vector to copy from.
     */
    constructor(v: FVector4)

    /**
     * - Constructs a vector from an FLinearColor.
     *
     * @param color Color to copy from.
     */
    constructor(color: FLinearColor)

    /**
     * - Constructs a vector from an FIntVector.
     *
     * @param vector FIntVector to copy from.
     */
    constructor(vector: FIntVector)

    /**
     * - Constructs a vector from an FIntPoint.
     *
     * @param a Int Point used to set X and Y coordinates, Z is set to zero.
     */
    constructor(a: FIntPoint)

    /**
     * - Constructs a vector from an FVector2D and Z value.
     *
     * @param v Vector to copy from.
     * @param z Z Coordinate.
     */
    constructor(v: FVector2D, z: number)

    /**
     * - Constructor using initial values for each component.
     *
     * @param x X Coordinate.
     * @param y Y Coordinate.
     * @param z Z Coordinate.
     */
    constructor(x: number, y: number, z: number)

    /**
     * - 'Internal' constructor of library [do not use]
     * @param arg1
     * @param arg2
     * @param arg3
     */
    constructor(arg1?: any, arg2?: any, arg3?: any) {
        if (typeof arg1 === "number" && !arg2) {
            this.x = arg1
            this.y = arg1
            this.z = arg1
        } else if (arg1 instanceof FArchive) {
            this.x = arg1.readFloat32()
            this.y = arg1.readFloat32()
            this.z = arg1.readFloat32()
        } else if (arg1 instanceof FVector4) {
            this.x = arg1.x
            this.y = arg1.y
            this.z = arg1.z
        } else if (arg1 instanceof FLinearColor) {
            this.x = arg1.r
            this.y = arg1.g
            this.z = arg1.b
        } else if (arg1 instanceof FIntVector) {
            this.x = arg1.x
            this.y = arg1.y
            this.z = arg1.z
        } else if (arg1 instanceof FIntPoint) {
            this.x = arg1.x
            this.y = arg1.y
            this.z = 0
        } else if (arg1 instanceof FVector2D && typeof arg2 === "number") {
            this.x = arg1.x
            this.y = arg1.y
            this.z = arg2
        } else {
            this.x = arg1.x
            this.y = arg2
            this.z = arg3
        }
    }

    /**
     * Copy another FVector into this one
     *
     * @param other The other vector.
     * @return Reference to vector after copy.
     */
    set(other: FVector): FVector {
        this.x = other.x
        this.y = other.y
        this.x = other.x
        return this
    }

    /**
     * Calculate cross product between this and another vector.
     *
     * @param v The other vector.
     * @return The cross product.
     */
    xor(v: FVector): FVector {
        return new FVector(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        )
    }

    /**
     * Calculate the dot product between this and another vector.
     *
     * @param v The other vector.
     * @return The dot product.
     */
    or(v: FVector): number {
        return this.x * v.x + this.y * v.y + this.z * v.z
    }

    /**
     * Gets the result of component-wise addition of this and another vector.
     *
     * @param v The vector to add to this.
     * @return The result of vector addition.
     */
    plus0(v: FVector): FVector {
        return new FVector(this.x + v.x, this.y + v.y, this.z + v.z)
    }

    /**
     * Gets the result of adding to each component of the vector.
     *
     * @param bias How much to add to each component.
     * @return The result of addition.
     */
    plus1(bias: number): FVector {
        return new FVector(this.x + bias, this.y + bias, this.z + bias)
    }

    /**
     * Gets the result of component-wise subtraction of this by another vector.
     *
     * @param v The vector to subtract from this.
     * @return The result of vector subtraction.
     */
    minus0(v: FVector): FVector {
        return new FVector(this.x - v.x, this.y - v.y, this.z - v.z)
    }

    /**
     * Gets the result of subtracting from each component of the vector.
     *
     * @param bias How much to subtract from each component.
     * @return The result of subtraction.
     */
    minus1(bias: number): FVector {
        return new FVector(this.x - bias, this.y - bias, this.z - bias)
    }

    /**
     * Gets the result of component-wise multiplication of this vector by another.
     *
     * @param v The vector to multiply with.
     * @return The result of multiplication.
     */
    times0(v: FVector) {
        return new FVector(this.x * v.x, this.y * v.y, this.z * v.z)
    }

    /**
     * Gets the result of scaling the vector (multiplying each component by a value).
     *
     * @param scale What to multiply each component by.
     * @return The result of multiplication.
     */
    times1(scale: number): FVector {
        return new FVector(this.x * scale, this.y * scale, this.z * scale)
    }

    /**
     * Gets the result of component-wise division of this vector by another.
     *
     * @param v The vector to divide by.
     * @return The result of division.
     */
    div0(v: FVector) {
        return new FVector(this.x / v.x, this.y / v.y, this.z / v.z)
    }

    /**
     * Gets the result of dividing each component of the vector by a value.
     *
     * @param scale What to divide each component by.
     * @return The result of division.
     */
    div1(scale: number): FVector {
        const rScale = 1 / scale
        return new FVector(this.x * rScale, this.y * rScale, this.z * rScale)
    }

    equals(other: any)
    equals(v: FVector, tolerance: number)
    equals(x?: any, y?: any) {
        if (x instanceof FVector && y != null) {
            return Math.abs(this.x - x.x) <= y
                && Math.abs(this.y - x.y) <= y
                && Math.abs(this.z - x.z) <= y
        } else {
            if (this === x) return true
            if (!(x instanceof FVector)) return false
            return this.x === x.x
                && this.y === x.y
                && this.z === x.y
        }
    }

    allComponentsEqual(tolerance: number = KINDA_SMALL_NUMBER) {
        return Math.abs(this.x - this.y) <= tolerance
            && Math.abs(this.x - this.z) <= tolerance
            && Math.abs(this.y - this.z) <= tolerance
    }

    /**
     * Get a negated copy of the vector.
     *
     * @return A negated copy of the vector.
     */
    unaryMinus(): FVector {
        return new FVector(-this.x, -this.y, -this.z)
    }

    /**
     * Adds another vector to this.
     * Uses component-wise addition.
     *
     * @param v Vector to add to this.
     */
    plusAssign(v: FVector) {
        this.x += v.x
        this.y += v.y
        this.z += v.z
    }

    /**
     * Subtracts another vector from this.
     * Uses component-wise subtraction.
     *
     * @param v Vector to subtract from this.
     */
    minusAssign(v: FVector) {
        this.x -= v.x
        this.y -= v.y
        this.z -= v.z
    }

    /**
     * Scales the vector.
     *
     * @param scale Amount to scale this vector by.
     */
    timesAssign0(scale: number) {
        this.x *= scale
        this.y *= scale
        this.z *= scale
    }

    /**
     * Multiplies the vector with another vector, using component-wise multiplication.
     *
     * @param v What to multiply this vector with.
     */
    timesAssign1(v: FVector) {
        this.x *= v.x
        this.y *= v.y
        this.z *= v.z
    }

    /**
     * Divides the vector by a number.
     *
     * @param v What to divide this vector by.
     */
    divAssign(v: FVector) {
        this.x /= v.x
        this.y /= v.y
        this.z /= v.z
    }

    /**
     * Gets specific component of the vector.
     *
     * @param index the index of vector component
     * @return Copy of the component.
     */
    get(index: number): number {
        if (index === 0)
            return this.x
        if (index === 1)
            return this.y
        if (index === 2)
            return this.z
        throw new RangeError(`Received index: ${index}, but max. index is 2`)
    }

    /**
     * Sets specific component of the vector.
     *
     * @param index the index of vector component
     * @param value the new value of vector component
     */
    set0(index: number, value: number) {
        if (index === 0)
            this.x = value
        if (index === 1)
            this.y = value
        if (index === 2)
            this.z = value
        throw new RangeError(`Received index: ${index}, but max. index is 2`)
    }

    /**
     * Set the values of the vector directly.
     *
     * @param x New X coordinate.
     * @param y New Y coordinate.
     * @param z New Z coordinate.
     */
    set1(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    /**
     * Get the maximum value of the vector's components.
     *
     * @return The maximum value of the vector's components.
     */
    getMax(): number {
        return Math.max(Math.max(this.x, this.y), this.z)
    }

    /**
     * Get the maximum absolute value of the vector's components.
     *
     * @return The maximum absolute value of the vector's components.
     */
    getAbsMax(): number {
        return Math.max(Math.max(Math.abs(this.x), Math.abs(this.y)), Math.abs(this.z))
    }

    /**
     * Get the minimum value of the vector's components.
     *
     * @return The minimum value of the vector's components.
     */
    getMin(): number {
        return Math.min(Math.min(this.x, this.y), this.z)
    }

    /**
     * Get the minimum absolute value of the vector's components.
     *
     * @return The minimum absolute value of the vector's components.
     */
    getAbsMin(): number {
        return Math.min(Math.min(Math.abs(this.x), Math.abs(this.y)), Math.abs(this.z))
    }

    /** Gets the component-wise min of two vectors. */
    componentMin(other: FVector): FVector {
        return new FVector(Math.min(this.x, other.x), Math.min(this.y, other.y), Math.min(this.z, other.z))
    }

    /** Gets the component-wise max of two vectors. */
    componentMax(other: FVector): FVector {
        return new FVector(Math.max(this.x, other.x), Math.max(this.y, other.y), Math.max(this.z, other.z))
    }

    /**
     * Get a copy of this vector with absolute value of each component.
     *
     * @return A copy of this vector with absolute value of each component.
     */
    getAbs(): FVector {
        return new FVector(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z))
    }

    /**
     * Get the length (magnitude) of this vector.
     *
     * @return The length of this vector.
     */
    size(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    /**
     * Get the squared length of this vector.
     *
     * @return The squared length of this vector.
     */
    sizeSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z
    }

    /**
     * Get the length of the 2D components of this vector.
     *
     * @return The 2D length of this vector.
     */
    size2D(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    /**
     * Get the squared length of the 2D components of this vector.
     *
     * @return The squared 2D length of this vector.
     */
    sizeSquared2D(): number {
        return this.x * this.x + this.y * this.y
    }

    /**
     * Checks whether vector is near to zero within a specified tolerance.
     *
     * @param tolerance Error tolerance.
     * @return true if the vector is near to zero, false otherwise.
     */
    isNearlyZero(tolerance: number = KINDA_SMALL_NUMBER): boolean {
        return Math.abs(this.x) <= tolerance && Math.abs(this.y) <= tolerance && Math.abs(this.z) <= tolerance
    }

    /**
     * Checks whether all components of the vector are exactly zero.
     *
     * @return true if the vector is exactly zero, false otherwise.
     */
    isZero(): boolean {
        return this.x === 0 && this.y === 0 && this.z === 0
    }

    /**
     * Check if the vector is of unit length, with specified tolerance.
     *
     * @param lengthSquaredTolerance Tolerance against squared length.
     * @return true if the vector is a unit vector within the specified tolerance.
     */
    isUnit(lengthSquaredTolerance: number = KINDA_SMALL_NUMBER): boolean {
        return Math.abs(1 - this.sizeSquared()) < lengthSquaredTolerance
    }

    /**
     * Checks whether vector is normalized.
     *
     * @return true if normalized, false otherwise.
     */
    isNormalized(): boolean {
        return Math.abs(1 - this.sizeSquared()) < THRESH_VECTOR_NORMALIZED // TODO port more methods
    }

    /**
     * Get a textual representation of this vector.
     *
     * @return A string describing the vector.
     */
    toString() {
        return `X=${this.x.toLocaleString()} Y=${this.y.toLocaleString()} Z=${this.z.toLocaleString()}`
    }

    /**
     * Squared distance between two points.
     *
     * @param other The other point.
     * @return The squared distance between two points.
     */
    distSquared(other: FVector) {
        return square(other.x - this.x) + square(other.y - this.y)
    }

    /**
     * Calculate the cross product of two vectors.
     *
     * @param a The first vector.
     * @param b The second vector.
     * @return The cross product.
     */
    static crossProduct(a: FVector, b: FVector): FVector {
        return a.xor(b)
    }

    /**
     * Calculate the dot product of two vectors.
     *
     * @param a The first vector.
     * @param b The second vector.
     * @return The dot product.
     */
    static dotProduct(a: FVector, b: FVector): number {
        return a.or(b)
    }

    /**
     * Util to calculate distance from a point to a bounding box
     *
     * @param mins 3D Point defining the lower values of the axis of the bound box
     * @param maxs 3D Point defining the lower values of the axis of the bound box
     * @param point 3D position of interest
     * @return the distance from the Point to the bounding box.
     */
    static computeSquaredDistanceFromBoxToPoint(mins: FVector, maxs: FVector, point: FVector): number {
        // Accumulates the distance as we iterate axis
        let distSquared = 0

        // Check each axis for min/max and add the distance accordingly
        // NOTE: Loop manually unrolled for > 2x speed up
        if (point.x < mins.x) {
            distSquared += (point.x - mins.x) * (point.x - mins.x)
        } else if (point.x > maxs.x) {
            distSquared += (point.x - maxs.x) * (point.x - maxs.x)
        }

        if (point.y < mins.y) {
            distSquared += (point.y - mins.y) * (point.y - mins.y)
        } else if (point.y > maxs.y) {
            distSquared += (point.y - maxs.y) * (point.y - maxs.y)
        }

        if (point.z < mins.z) {
            distSquared += (point.z - mins.z) * (point.z - mins.z)
        } else if (point.z > maxs.z) {
            distSquared += (point.z - maxs.z) * (point.z - maxs.z)
        }

        return distSquared
    }
 }

