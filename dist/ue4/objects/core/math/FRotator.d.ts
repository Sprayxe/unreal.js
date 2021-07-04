import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { FVector } from "./FVector";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * Implements a container for rotation information
 * All rotation values are stored in degrees
 * @implements {IStructType}
 */
export declare class FRotator implements IStructType {
    /**
     * Rotation around the right axis (around Y axis), Looking up and down (0=Straight Ahead, +Up, -Down)
     * @type {number}
     * @public
     */
    pitch: number;
    /**
     * Rotation around the up axis (around Z axis), Running in circles 0=East, +North, -South
     * @type {number}
     * @public
     */
    yaw: number;
    /**
     * Rotation around the forward axis (around X axis), Tilting your head, 0=Straight, +Clockwise, -CCW
     * @type {number}
     * @public
     */
    roll: number;
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance with one default value
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
     * Creates an instance using values
     * @param {number} pitch Pitch in degrees
     * @param {number} yaw Yaw in degrees
     * @param {number} roll Roll in degrees
     * @constructor
     * @public
     */
    constructor(pitch: number, yaw: number, roll: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Get the result of adding a rotator to this
     * @param {FRotator} r The other rotator
     * @returns {FRotator} The result of adding a rotator to this
     * @public
     */
    plus(r: FRotator): FRotator;
    /**
     * Get the result of subtracting a rotator from this
     * @param {FRotator} r The other rotator
     * @returns {FRotator} The result of subtracting a rotator from this
     * @public
     */
    minus(r: FRotator): FRotator;
    /**
     * Get the result of scaling this rotator
     * @param {number} scale The scaling factor
     * @returns {number} The result of scaling
     * @public
     */
    times(scale: number): FRotator;
    /**
     * Multiply this rotator by a scaling factor
     * @param {number} scale The scaling factor
     * @returns {void}
     * @public
     */
    timesAssign(scale: number): void;
    /**
     * Checks for equality to another object
     * @param {?any} other Other object
     * @returns {boolean}
     * @public
     */
    equals(other?: any): boolean;
    /**
     * Rotate a vector rotated by this rotator
     * @param {FVector} v The vector to rotate
     * @returns {FVector} The rotated vector
     * @public
     */
    rotateVector(v: FVector): FVector;
    /**
     * Returns the vector rotated by the inverse of this rotator
     * @param {FVector} v The vector to rotate
     * @returns {FVector} The rotated vector
     * @public
     */
    unrotateVector(v: FVector): FVector;
    /**
     * Get a textual representation of the vector
     * @returns {string} Text describing the vector
     * @public
     */
    toString(): string;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
