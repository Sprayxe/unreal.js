import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FVector } from "./FVector";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
/**
 * Implements an axis-aligned box
 * Boxes describe an axis-aligned extent in three dimensions. They are used for many different things in the
 * Engine and in games, such as bounding volumes, collision detection and visibility calculation
 * @implements {IStructType}
 */
export declare class FBox implements IStructType {
    /**
     * Holds the box's minimum point
     * @type {FVector}
     * @public
     */
    min: FVector;
    /**
     * Holds the box's maximum point
     * @type {FVector}
     * @public
     */
    max: FVector;
    /**
     * Holds a flag indicating whether this box is valid
     * @type {boolean}
     * @public
     */
    isValid: boolean;
    /**
     * Creates empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance using FBox
     * @param {FBox} box Box to yeet data from
     * @constructor
     * @public
     */
    constructor(box: FBox);
    /**
     * Creates an instance using UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using FVector's
     * @param {Array<FVector>} points Vectors to use
     * @constructor
     * @public
     */
    constructor(points: FVector[]);
    /**
     * Creates an instance using two FVector's
     * @param {FVector} min Min
     * @param {FVector} max Max
     * @constructor
     * @public
     */
    constructor(min: FVector, max: FVector);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Compares two boxes for equality
     * @returns {boolean} Whether the boxes are equal, false otherwise
     * @public
     */
    equals(other: any): boolean;
    /**
     * Adds to this bounding box to include a new bounding volume
     * @param {FBox} other the bounding volume to increase the bounding volume to
     * @returns {void} Reference to this bounding volume after resizing to include the other bounding volume
     * @public
     */
    plusAssign0(other: FBox): void;
    /**
     * Adds to this bounding box to include a given point
     * @param {FVector} other the point to increase the bounding volume to
     * @returns {void} Reference to this bounding box after resizing to include the other point
     * @public
     */
    plusAssign1(other: FVector): void;
    /**
     * Gets the result of addition to this bounding volume
     * @param {FBox} other The other volume to add to this
     * @returns {FBox} A new bounding volume
     * @public
     */
    plus0(other: FBox): FBox;
    /**
     * Gets the result of addition to this bounding volume
     * @param {FVector} other The other point to add to this
     * @returns {FBox} A new bounding volume
     * @public
     */
    plus1(other: FVector): FBox;
    /**
     * Gets the min or max of this bounding volume
     * @param {number} index the index into points of the bounding volume
     * @returns {FVector} a point of the bounding volume
     * @public
     */
    get(index: number): FVector;
    /**
     * Calculates the distance of a point to this box
     * @param {FVector} point The point
     * @returns {number} The distance
     * @public
     */
    computeSquaredDistanceToPoint(point: FVector): number;
    /**
     * Increases the box size
     * @param {FVector} v The size to increase the volume by
     * @returns {FBox} A new bounding box
     * @public
     */
    expandBy0(v: FVector): FBox;
    /**
     * Increases the box size
     * @param {number} w The size to increase the volume by
     * @returns {FBox} A new bounding box
     * @public
     */
    expandBy1(w: number): FBox;
    /**
     * Increases the box size
     * @param {FVector} neg The size to increase the volume by in the negative direction (positive values move the bounds outwards)
     * @param {FVector} pos The size to increase the volume by in the positive direction (positive values move the bounds outwards)
     * @returns {FBox} A new bounding box
     * @public
     */
    expandBy2(neg: FVector, pos: FVector): FBox;
    /**
     * Shifts the bounding box position
     * @param {FVector} offset The vector to shift the box by
     * @returns {FBox} A new bounding box
     * @public
     */
    shiftBy(offset: FVector): FBox;
    /**
     * Moves the center of bounding box to new destination
     * @param {FVector} destination The destination point to move center of box to
     * @returns {FBox} A new bounding box
     * @public
     */
    moveTo(destination: FVector): FBox;
    /**
     * Gets the center point of this box
     * @returns {FVector} The center point
     * @public
     * @see {getCenterAndExtents}
     * @see {getExtent}
     * @see {getSize}
     * @see {getVolume}
     */
    getCenter(): FVector;
    /**
     * Gets the center and extents of this box.
     * @param {FVector} center(out) Will contain the box center point.
     * @param {FVector} extents(out) Will contain the extent around the center.
     * @returns {void}
     * @public
     * @see {getCenter}
     * @see {getExtent}
     * @see {getSize}
     * @see {getVolume}
     */
    getCenterAndExtents(center: FVector, extents: FVector): void;
    /**
     * Calculates the closest point on or inside the box to a given point in space
     * @param {FVector} point The point in space
     * @returns {FVector} The closest point on or inside the box
     * @public
     */
    getClosestPointTo(point: FVector): FVector;
    /**
     * Gets the extents of this box
     * @returns {FVector} The box extents
     * @public
     * @see {getCenter}
     * @see {getCenterAndExtents}
     * @see {getSize}
     * @see {getVolume}
     */
    getExtent(): FVector;
    /**
     * Gets the size of this box
     * @returns {FVector} The box size
     * @public
     * @see {getCenter}
     * @see {getCenterAndExtents}
     * @see {getExtent}
     * @see {getVolume}
     */
    getSize(): FVector;
    /**
     * Gets the volume of this box
     * @returns {number} The box volume
     * @public
     * @see {getCenter}
     * @see {getCenterAndExtents}
     * @see {getExtent}
     * @see {getSize}
     */
    getVolume(): number;
    /**
     * Checks whether the given bounding box intersects this bounding box
     * @param {FBox} other The bounding box to intersect with
     * @returns {boolean} Whether the boxes intersect, false otherwise
     * @public
     */
    intersect(other: FBox): boolean;
    /**
     * Checks whether the given bounding box intersects this bounding box in the XY plane
     * @param {FBox} other The bounding box to test intersection
     * @returns {boolean} Whether the boxes intersect in the XY Plane, false otherwise
     * @public
     */
    intersectXY(other: FBox): boolean;
    /**
     * Returns the overlap FBox of two box
     * @param {FBox} other The bounding box to test overlap
     * @returns {FBox} the overlap box. It can be 0 if they don't overlap
     * @public
     */
    overlap(other: FBox): FBox;
    /**
     * Checks whether a given box is fully encapsulated by this box
     * @param {FBox} other The box to test for encapsulation within the bounding volume
     * @returns {FBox} Whether box is inside this volume
     * @public
     */
    isInside0(other: FBox): boolean;
    /**
     * Checks whether the given location is inside this box
     * @param {FVector} _in The location to test for inside the bounding volume
     * @returns {boolean} Whether location is inside this volume
     * @public
     * @see {isInsideXY1}
     */
    isInside1(_in: FVector): boolean;
    /**
     * Checks whether the given location is inside or on this box
     * @param {FVector} _in The location to test for inside the bounding volume
     * @returns {boolean} Whether location is inside this volume
     * @public
     * @see {isInsideXY1}
     */
    isInsideOrOn(_in: FVector): boolean;
    /**
     * Checks whether the given box is fully encapsulated by this box in the XY plane
     * @param {FBox} other The box to test for encapsulation within the bounding box
     * @returns {boolean} Whether is inside this box in the XY plane
     * @public
     */
    isInsideXY0(other: FBox): boolean;
    /**
     * - Checks whether the given location is inside this box in the XY plane
     * @param {FVector} _in The location to test for inside the bounding box
     * @returns {boolean} Whether location is inside this box in the XY plane
     * @public
     * @see {isInside1}
     */
    isInsideXY1(_in: FVector): boolean;
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString(): string;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): {
        bIsValid: boolean;
        max: any;
        min: any;
    };
    /**
     * Utility function to build an AABB from Origin and Extent
     * @param {FVector} origin The location of the bounding box
     * @param {FVector} extent Half size of the bounding box
     * @returns {FBox} A new axis-aligned bounding box
     * @public
     */
    static buildAABB(origin: FVector, extent: FVector): FBox;
}
