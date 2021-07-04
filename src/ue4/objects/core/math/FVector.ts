import { FArchive } from "../../../reader/FArchive";
import { FVector2D } from "./FVector2D";
import { FVector4 } from "./FVector4";
import { FLinearColor } from "./FColor";
import { FIntVector } from "./FIntVector";
import { FIntPoint } from "./FIntPoint";
import { KINDA_SMALL_NUMBER } from "../../../../util/Const";
import { square } from "./UnrealMathUtility";
import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

/** Allowed error for a normalized vector (against squared magnitude) */
const THRESH_VECTOR_NORMALIZED = 0.01

/**
 * Represents an UE4 FVector
 * @implements {IStructType}
 */
export class FVector implements IStructType {
    /**
     * Vector's X component
     * @type {number}
     * @public
     */

    public x: number
    /**
     * Vector's Y component
     * @type {number}
     * @public
     */
    public y: number

    /**
     * Vector's Z component
     * @type {number}
     * @public
     */
    public z: number

    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an empty with a default value
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
     * Creates an instance using FVector4
     * @param {FVector4} v 4D Vector to copy from
     * @constructor
     * @public
     */
    constructor(v: FVector4)

    /**
     * Creates an instance using FLinearColor
     * @param {FLinearColor} color Color to copy from
     * @constructor
     * @public
     */
    constructor(color: FLinearColor)

    /**
     * Creates an instance using FIntVector
     * @param {FIntVector} vector FIntVector to copy from
     * @constructor
     * @public
     */
    constructor(vector: FIntVector)

    /**
     * Creates an instance using FIntPoint
     * @param {FIntPoint} a Int Point used to set X and Y coordinates, Z is set to zero
     * @constructor
     * @public
     */
    constructor(a: FIntPoint)

    /**
     * Creates an instance using FVector2D and a Z value
     * @param {FVector2D} v Vector to copy from
     * @param {number} z Z Coordinate
     * @constructor
     * @public
     */
    constructor(v: FVector2D, z: number)

    /**
     * Creates an instance using values
     * @param {number} x X Coordinate
     * @param {number} y Y Coordinate
     * @param {number} z Z Coordinate
     * @constructor
     * @public
     */
    constructor(x: number, y: number, z: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeFloat32(this.x)
        Ar.writeFloat32(this.y)
        Ar.writeFloat32(this.z)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    }

    /**
     * Copy another FVector into this one
     * @param {FVector} other The other vector
     * @returns {FVector} Reference to vector after copy
     * @public
     */
    set(other: FVector): FVector {
        this.x = other.x
        this.y = other.y
        this.x = other.x
        return this
    }

    /**
     * Calculate cross product between this and another vector
     * @param {FVector} v The other vector
     * @returns {FVector} The cross product
     * @public
     */
    xor(v: FVector): FVector {
        return new FVector(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        )
    }

    /**
     * Calculate the dot product between this and another vector
     * @param {FVector} v The other vector
     * @returns {number} The dot product
     * @public
     */
    or(v: FVector): number {
        return this.x * v.x + this.y * v.y + this.z * v.z
    }

    /**
     * Gets the result of component-wise addition of this and another vector
     * @param {FVector} v The vector to add to this
     * @returns {FVector} The result of vector addition
     * @public
     */
    plus0(v: FVector): FVector {
        return new FVector(this.x + v.x, this.y + v.y, this.z + v.z)
    }

    /**
     * Gets the result of adding to each component of the vector
     * @param {number} bias How much to add to each component
     * @returns {FVector}  The result of addition
     * @public
     */
    plus1(bias: number): FVector {
        return new FVector(this.x + bias, this.y + bias, this.z + bias)
    }

    /**
     * Gets the result of component-wise subtraction of this by another vector
     * @param {FVector} v The vector to subtract from this
     * @returns {FVector} The result of vector subtraction
     * @public
     */
    minus0(v: FVector): FVector {
        return new FVector(this.x - v.x, this.y - v.y, this.z - v.z)
    }

    /**
     * Gets the result of subtracting from each component of the vector
     * @param {number} bias How much to subtract from each component
     * @returns {FVector} The result of subtraction
     * @public
     */
    minus1(bias: number): FVector {
        return new FVector(this.x - bias, this.y - bias, this.z - bias)
    }

    /**
     * Gets the result of component-wise multiplication of this vector by another
     * @param {FVector} v The vector to multiply with
     * @returns {FVector} The result of multiplication
     * @public
     */
    times0(v: FVector) {
        return new FVector(this.x * v.x, this.y * v.y, this.z * v.z)
    }

    /**
     * Gets the result of scaling the vector (multiplying each component by a value)
     * @param {number} scale What to multiply each component by
     * @returns {FVector} The result of multiplication
     * @public
     */
    times1(scale: number): FVector {
        return new FVector(this.x * scale, this.y * scale, this.z * scale)
    }

    /**
     * Gets the result of component-wise division of this vector by another
     * @param {FVector} v The vector to divide by
     * @returns {FVector} The result of division
     * @public
     */
    div0(v: FVector) {
        return new FVector(this.x / v.x, this.y / v.y, this.z / v.z)
    }

    /**
     * Gets the result of dividing each component of the vector by a value
     * @param {number} scale What to divide each component by
     * @returns {FVector} The result of division
     * @public
     */
    div1(scale: number): FVector {
        const rScale = 1 / scale
        return new FVector(this.x * rScale, this.y * rScale, this.z * rScale)
    }

    /**
     * Checks for equality to another object
     * @param {?any} other Other object
     * @returns {boolean} Result
     * @public
     */
    equals(other?: any)

    /**
     * Checks for equality to another FVector and a tolerance
     * @param {FVector} v FVector to check
     * @param {number} tolerance Tolerance to use
     * @returns {boolean} Result
     * @public
     */
    equals(v: FVector, tolerance: number)

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
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

    /**
     * Checks Whether all components are equal
     * @param {number} tolerance Tolerance to use
     * @returns {boolean}
     * @public
     */
    allComponentsEqual(tolerance: number = KINDA_SMALL_NUMBER) {
        return Math.abs(this.x - this.y) <= tolerance
            && Math.abs(this.x - this.z) <= tolerance
            && Math.abs(this.y - this.z) <= tolerance
    }

    /**
     * Get a negated copy of the vector
     * @returns {FVector} A negated copy of the vector
     * @public
     */
    unaryMinus(): FVector {
        return new FVector(-this.x, -this.y, -this.z)
    }

    /**
     * Adds another vector to this
     * Uses component-wise addition
     * @param {FVector} v Vector to add to this
     * @returns {void}
     * @public
     */
    plusAssign(v: FVector) {
        this.x += v.x
        this.y += v.y
        this.z += v.z
    }

    /**
     * Subtracts another vector from this
     * Uses component-wise subtraction
     * @param {FVector} v Vector to subtract from this
     * @returns {void}
     * @public
     */
    minusAssign(v: FVector) {
        this.x -= v.x
        this.y -= v.y
        this.z -= v.z
    }

    /**
     * Scales the vector
     * @param {number} scale Amount to scale this vector by
     * @returns {void}
     * @public
     */
    timesAssign0(scale: number) {
        this.x *= scale
        this.y *= scale
        this.z *= scale
    }

    /**
     * Multiplies the vector with another vector, using component-wise multiplication
     * @param {FVector} v What to multiply this vector with
     * @returns {void}
     * @public
     */
    timesAssign1(v: FVector) {
        this.x *= v.x
        this.y *= v.y
        this.z *= v.z
    }

    /**
     * Divides the vector by a number
     * @param {FVector} v What to divide this vector by
     * @returns {void}
     * @public
     */
    divAssign(v: FVector) {
        this.x /= v.x
        this.y /= v.y
        this.z /= v.z
    }

    /**
     * Gets specific component of the vector
     * @param {number} index the index of vector component
     * @returns {number} Copy of the component
     * @throws {RangeError} If index is < 0 or > 2
     * @public
     */
    get(index: number): number {
        if (index === 0)
            return this.x
        if (index === 1)
            return this.y
        if (index === 2)
            return this.z
        throw new RangeError(`Received index: ${index}, but max./min. index: 2/0`)
    }

    /**
     * Sets specific component of the vector
     * @param {number} index the index of vector component
     * @param {number} value the new value of vector component
     * @returns {void}
     * @throws {RangeError} If index is < 0 or > 2
     * @public
     */
    set0(index: number, value: number) {
        if (index === 0)
            this.x = value
        if (index === 1)
            this.y = value
        if (index === 2)
            this.z = value
        throw new RangeError(`Received index: ${index}, but max./min. index: 2/0`)
    }

    /**
     * Set the values of the vector directly
     * @param {number} x New X coordinate
     * @param {number} y New Y coordinate
     * @param {number} z New Z coordinate
     * @returns {void}
     * @public
     */
    set1(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    /**
     * Get the maximum value of the vector's components
     * @returns {number} The maximum value of the vector's components
     * @public
     */
    getMax(): number {
        return Math.max(Math.max(this.x, this.y), this.z)
    }

    /**
     * Get the maximum absolute value of the vector's components
     * @returns {number} The maximum absolute value of the vector's components
     * @public
     */
    getAbsMax(): number {
        return Math.max(Math.max(Math.abs(this.x), Math.abs(this.y)), Math.abs(this.z))
    }

    /**
     * Get the minimum value of the vector's components
     * @returns {number} The minimum value of the vector's components
     * @public
     */
    getMin(): number {
        return Math.min(Math.min(this.x, this.y), this.z)
    }

    /**
     * Get the minimum absolute value of the vector's components
     * @returns {number} The minimum absolute value of the vector's components
     * @public
     */
    getAbsMin(): number {
        return Math.min(Math.min(Math.abs(this.x), Math.abs(this.y)), Math.abs(this.z))
    }

    /**
     * Gets the component-wise min of two vectors
     * @param {FVector} other Other FVector
     * @returns {FVector} New instance
     * @public
     */
    componentMin(other: FVector): FVector {
        return new FVector(Math.min(this.x, other.x), Math.min(this.y, other.y), Math.min(this.z, other.z))
    }

    /**
     * Gets the component-wise max of two vectors
     * @param {FVector} other Other FVector
     * @returns {FVector} New instance
     * @public
     */
    componentMax(other: FVector): FVector {
        return new FVector(Math.max(this.x, other.x), Math.max(this.y, other.y), Math.max(this.z, other.z))
    }

    /**
     * Get a copy of this vector with absolute value of each component
     * @returns {FVector} A copy of this vector with absolute value of each component
     * @public
     */
    getAbs(): FVector {
        return new FVector(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z))
    }

    /**
     * The length (magnitude) of this vector
     * @type {number}
     * @public
     */
    get size(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    /**
     * The squared length of this vector
     * @type {number}
     * @public
     */
    get sizeSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z
    }

    /**
     * The length of the 2D components of this vector
     * @type {number}
     * @public
     */
    get size2D(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    /**
     * The squared length of the 2D components of this vector
     * @type {number}
     * @public
     */
    get sizeSquared2D(): number {
        return this.x * this.x + this.y * this.y
    }

    /**
     * Checks whether vector is near to zero within a specified tolerance
     * @param {number} tolerance Error tolerance
     * @returns {boolean} Whether the vector is near to zero, false otherwise
     * @public
     */
    isNearlyZero(tolerance: number = KINDA_SMALL_NUMBER): boolean {
        return Math.abs(this.x) <= tolerance && Math.abs(this.y) <= tolerance && Math.abs(this.z) <= tolerance
    }

    /**
     * Whether all components of the vector are exactly zero
     * @type {boolean}
     * @public
     */
    get isZero(): boolean {
        return this.x === 0 && this.y === 0 && this.z === 0
    }

    /**
     * Check if the vector is of unit length, with specified tolerance
     * @param {number} lengthSquaredTolerance Tolerance against squared length
     * @returns {boolean} Whether the vector is a unit vector within the specified tolerance
     * @public
     */
    isUnit(lengthSquaredTolerance: number = KINDA_SMALL_NUMBER): boolean {
        return Math.abs(1 - this.sizeSquared) < lengthSquaredTolerance
    }

    /**
     * Whether vector is normalized
     * @type {boolean}
     * @public
     */
    get isNormalized(): boolean {
        return Math.abs(1 - this.sizeSquared) < THRESH_VECTOR_NORMALIZED
    }

    // TODO port more methods

    /**
     * Get a textual representation of this vector
     * @returns {string} A string describing the vector
     * @public
     */
    toString() {
        return `X=${this.x.toLocaleString()} Y=${this.y.toLocaleString()} Z=${this.z.toLocaleString()}`
    }

    /**
     * Squared distance between two points
     * @param {FVector} other The other point
     * @returns {number} The squared distance between two points
     * @public
     */
    distSquared(other: FVector) {
        return square(other.x - this.x) + square(other.y - this.y)
    }

    /**
     * Calculate the cross product of two vectors
     * @param {FVector} a The first vector
     * @param {FVector} b The second vector
     * @returns {number} The cross product
     * @public
     */
    static crossProduct(a: FVector, b: FVector): FVector {
        return a.xor(b)
    }

    /**
     * Calculate the dot product of two vectors
     * @param {FVector} a The first vector
     * @param {FVector} b The second vector
     * @returns {number} The dot product
     * @public
     */
    static dotProduct(a: FVector, b: FVector): number {
        return a.or(b)
    }

    /**
     * Util to calculate distance from a point to a bounding box
     * @param {FVector} mins 3D Point defining the lower values of the axis of the bound box
     * @param {FVector} maxs 3D Point defining the lower values of the axis of the bound box
     * @param {FVector} point 3D position of interest
     * @returns {number} the distance from the Point to the bounding box
     * @public
     * @static
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

