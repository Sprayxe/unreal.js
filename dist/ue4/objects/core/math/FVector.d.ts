import { FArchive } from "../../../reader/FArchive";
import { FVector2D } from "./FVector2D";
import { FVector4 } from "./FVector4";
import { FLinearColor } from "./FColor";
import { FIntVector } from "./FIntVector";
import { FIntPoint } from "./FIntPoint";
import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
/**
 * Represents an UE4 FVector
 * @implements {IStructType}
 */
export declare class FVector implements IStructType {
    /**
     * Vector's X component
     * @type {number}
     * @public
     */
    x: number;
    /**
     * Vector's Y component
     * @type {number}
     * @public
     */
    y: number;
    /**
     * Vector's Z component
     * @type {number}
     * @public
     */
    z: number;
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an empty with a default value
     * @param {number} f Value to set all components to
     * @constructor
     * @public
     */
    constructor(f: number);
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using FVector4
     * @param {FVector4} v 4D Vector to copy from
     * @constructor
     * @public
     */
    constructor(v: FVector4);
    /**
     * Creates an instance using FLinearColor
     * @param {FLinearColor} color Color to copy from
     * @constructor
     * @public
     */
    constructor(color: FLinearColor);
    /**
     * Creates an instance using FIntVector
     * @param {FIntVector} vector FIntVector to copy from
     * @constructor
     * @public
     */
    constructor(vector: FIntVector);
    /**
     * Creates an instance using FIntPoint
     * @param {FIntPoint} a Int Point used to set X and Y coordinates, Z is set to zero
     * @constructor
     * @public
     */
    constructor(a: FIntPoint);
    /**
     * Creates an instance using FVector2D and a Z value
     * @param {FVector2D} v Vector to copy from
     * @param {number} z Z Coordinate
     * @constructor
     * @public
     */
    constructor(v: FVector2D, z: number);
    /**
     * Creates an instance using values
     * @param {number} x X Coordinate
     * @param {number} y Y Coordinate
     * @param {number} z Z Coordinate
     * @constructor
     * @public
     */
    constructor(x: number, y: number, z: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
    /**
     * Copy another FVector into this one
     * @param {FVector} other The other vector
     * @returns {FVector} Reference to vector after copy
     * @public
     */
    set(other: FVector): FVector;
    /**
     * Calculate cross product between this and another vector
     * @param {FVector} v The other vector
     * @returns {FVector} The cross product
     * @public
     */
    xor(v: FVector): FVector;
    /**
     * Calculate the dot product between this and another vector
     * @param {FVector} v The other vector
     * @returns {number} The dot product
     * @public
     */
    or(v: FVector): number;
    /**
     * Gets the result of component-wise addition of this and another vector
     * @param {FVector} v The vector to add to this
     * @returns {FVector} The result of vector addition
     * @public
     */
    plus0(v: FVector): FVector;
    /**
     * Gets the result of adding to each component of the vector
     * @param {number} bias How much to add to each component
     * @returns {FVector}  The result of addition
     * @public
     */
    plus1(bias: number): FVector;
    /**
     * Gets the result of component-wise subtraction of this by another vector
     * @param {FVector} v The vector to subtract from this
     * @returns {FVector} The result of vector subtraction
     * @public
     */
    minus0(v: FVector): FVector;
    /**
     * Gets the result of subtracting from each component of the vector
     * @param {number} bias How much to subtract from each component
     * @returns {FVector} The result of subtraction
     * @public
     */
    minus1(bias: number): FVector;
    /**
     * Gets the result of component-wise multiplication of this vector by another
     * @param {FVector} v The vector to multiply with
     * @returns {FVector} The result of multiplication
     * @public
     */
    times0(v: FVector): FVector;
    /**
     * Gets the result of scaling the vector (multiplying each component by a value)
     * @param {number} scale What to multiply each component by
     * @returns {FVector} The result of multiplication
     * @public
     */
    times1(scale: number): FVector;
    /**
     * Gets the result of component-wise division of this vector by another
     * @param {FVector} v The vector to divide by
     * @returns {FVector} The result of division
     * @public
     */
    div0(v: FVector): FVector;
    /**
     * Gets the result of dividing each component of the vector by a value
     * @param {number} scale What to divide each component by
     * @returns {FVector} The result of division
     * @public
     */
    div1(scale: number): FVector;
    /**
     * Checks for equality to another object
     * @param {?any} other Other object
     * @returns {boolean} Result
     * @public
     */
    equals(other?: any): any;
    /**
     * Checks for equality to another FVector and a tolerance
     * @param {FVector} v FVector to check
     * @param {number} tolerance Tolerance to use
     * @returns {boolean} Result
     * @public
     */
    equals(v: FVector, tolerance: number): any;
    /**
     * Checks Whether all components are equal
     * @param {number} tolerance Tolerance to use
     * @returns {boolean}
     * @public
     */
    allComponentsEqual(tolerance?: number): boolean;
    /**
     * Get a negated copy of the vector
     * @returns {FVector} A negated copy of the vector
     * @public
     */
    unaryMinus(): FVector;
    /**
     * Adds another vector to this
     * Uses component-wise addition
     * @param {FVector} v Vector to add to this
     * @returns {void}
     * @public
     */
    plusAssign(v: FVector): void;
    /**
     * Subtracts another vector from this
     * Uses component-wise subtraction
     * @param {FVector} v Vector to subtract from this
     * @returns {void}
     * @public
     */
    minusAssign(v: FVector): void;
    /**
     * Scales the vector
     * @param {number} scale Amount to scale this vector by
     * @returns {void}
     * @public
     */
    timesAssign0(scale: number): void;
    /**
     * Multiplies the vector with another vector, using component-wise multiplication
     * @param {FVector} v What to multiply this vector with
     * @returns {void}
     * @public
     */
    timesAssign1(v: FVector): void;
    /**
     * Divides the vector by a number
     * @param {FVector} v What to divide this vector by
     * @returns {void}
     * @public
     */
    divAssign(v: FVector): void;
    /**
     * Gets specific component of the vector
     * @param {number} index the index of vector component
     * @returns {number} Copy of the component
     * @throws {RangeError} If index is < 0 or > 2
     * @public
     */
    get(index: number): number;
    /**
     * Sets specific component of the vector
     * @param {number} index the index of vector component
     * @param {number} value the new value of vector component
     * @returns {void}
     * @throws {RangeError} If index is < 0 or > 2
     * @public
     */
    set0(index: number, value: number): void;
    /**
     * Set the values of the vector directly
     * @param {number} x New X coordinate
     * @param {number} y New Y coordinate
     * @param {number} z New Z coordinate
     * @returns {void}
     * @public
     */
    set1(x: number, y: number, z: number): void;
    /**
     * Get the maximum value of the vector's components
     * @returns {number} The maximum value of the vector's components
     * @public
     */
    getMax(): number;
    /**
     * Get the maximum absolute value of the vector's components
     * @returns {number} The maximum absolute value of the vector's components
     * @public
     */
    getAbsMax(): number;
    /**
     * Get the minimum value of the vector's components
     * @returns {number} The minimum value of the vector's components
     * @public
     */
    getMin(): number;
    /**
     * Get the minimum absolute value of the vector's components
     * @returns {number} The minimum absolute value of the vector's components
     * @public
     */
    getAbsMin(): number;
    /**
     * Gets the component-wise min of two vectors
     * @param {FVector} other Other FVector
     * @returns {FVector} New instance
     * @public
     */
    componentMin(other: FVector): FVector;
    /**
     * Gets the component-wise max of two vectors
     * @param {FVector} other Other FVector
     * @returns {FVector} New instance
     * @public
     */
    componentMax(other: FVector): FVector;
    /**
     * Get a copy of this vector with absolute value of each component
     * @returns {FVector} A copy of this vector with absolute value of each component
     * @public
     */
    getAbs(): FVector;
    /**
     * The length (magnitude) of this vector
     * @type {number}
     * @public
     */
    get size(): number;
    /**
     * The squared length of this vector
     * @type {number}
     * @public
     */
    get sizeSquared(): number;
    /**
     * The length of the 2D components of this vector
     * @type {number}
     * @public
     */
    get size2D(): number;
    /**
     * The squared length of the 2D components of this vector
     * @type {number}
     * @public
     */
    get sizeSquared2D(): number;
    /**
     * Checks whether vector is near to zero within a specified tolerance
     * @param {number} tolerance Error tolerance
     * @returns {boolean} Whether the vector is near to zero, false otherwise
     * @public
     */
    isNearlyZero(tolerance?: number): boolean;
    /**
     * Whether all components of the vector are exactly zero
     * @type {boolean}
     * @public
     */
    get isZero(): boolean;
    /**
     * Check if the vector is of unit length, with specified tolerance
     * @param {number} lengthSquaredTolerance Tolerance against squared length
     * @returns {boolean} Whether the vector is a unit vector within the specified tolerance
     * @public
     */
    isUnit(lengthSquaredTolerance?: number): boolean;
    /**
     * Whether vector is normalized
     * @type {boolean}
     * @public
     */
    get isNormalized(): boolean;
    /**
     * Get a textual representation of this vector
     * @returns {string} A string describing the vector
     * @public
     */
    toString(): string;
    /**
     * Squared distance between two points
     * @param {FVector} other The other point
     * @returns {number} The squared distance between two points
     * @public
     */
    distSquared(other: FVector): number;
    /**
     * Calculate the cross product of two vectors
     * @param {FVector} a The first vector
     * @param {FVector} b The second vector
     * @returns {number} The cross product
     * @public
     */
    static crossProduct(a: FVector, b: FVector): FVector;
    /**
     * Calculate the dot product of two vectors
     * @param {FVector} a The first vector
     * @param {FVector} b The second vector
     * @returns {number} The dot product
     * @public
     */
    static dotProduct(a: FVector, b: FVector): number;
    /**
     * Util to calculate distance from a point to a bounding box
     * @param {FVector} mins 3D Point defining the lower values of the axis of the bound box
     * @param {FVector} maxs 3D Point defining the lower values of the axis of the bound box
     * @param {FVector} point 3D position of interest
     * @returns {number} the distance from the Point to the bounding box
     * @public
     * @static
     */
    static computeSquaredDistanceFromBoxToPoint(mins: FVector, maxs: FVector, point: FVector): number;
}
