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
export class FBox implements IStructType {
    /**
     * Holds the box's minimum point
     * @type {FVector}
     * @public
     */
    public min: FVector

    /**
     * Holds the box's maximum point
     * @type {FVector}
     * @public
     */
    public max: FVector

    /**
     * Holds a flag indicating whether this box is valid
     * @type {boolean}
     * @public
     */
    public isValid: boolean

    /**
     * Creates empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using FBox
     * @param {FBox} box Box to yeet data from
     * @constructor
     * @public
     */
    constructor(box: FBox)

    /**
     * Creates an instance using UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using FVector's
     * @param {Array<FVector>} points Vectors to use
     * @constructor
     * @public
     */
    constructor(points: FVector[])

    /**
     * Creates an instance using two FVector's
     * @param {FVector} min Min
     * @param {FVector} max Max
     * @constructor
     * @public
     */
    constructor(min: FVector, max: FVector)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any) {
        if (!x) {
            this.min = new FVector(0, 0, 0)
            this.max = new FVector(0, 0, 0)
            this.isValid = false
        } else if (x instanceof FArchive) {
            this.min = new FVector(x)
            this.max = new FVector(x)
            this.isValid = x.readFlag()
        } else if (Array.isArray(x)) {
            this.min = new FVector(0, 0, 0)
            this.min = new FVector(0, 0, 0)
            this.isValid = false
            // TODO loop thru x
        } else {
            this.min = x
            this.max = y
            this.isValid = true
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.min.serialize(Ar)
        this.max.serialize(Ar)
        Ar.writeFlag(this.isValid)
    }

    /**
     * Compares two boxes for equality
     * @returns {boolean} Wether the boxes are equal, false otherwise
     * @public
     */
    equals(other: any): boolean {
        if (this === other) return true
        if (!(other instanceof FBox)) return false
        other as FBox
        return this.min.equals(other.min) && this.max.equals(other.max)
    }

    /**
     * Adds to this bounding box to include a new bounding volume
     * @param other the bounding volume to increase the bounding volume to
     * @returns {void} Reference to this bounding volume after resizing to include the other bounding volume
     * @public
     */
    plusAssign0(other: FBox): void {
        if (this.isValid) {
            const min = (x, y) => Math.min(x, y)
            // min
            this.min.x = min(this.min.x, other.min.x)
            this.min.y = min(this.min.y, other.min.y)
            this.min.z = min(this.min.z, other.min.z)
            // max
            this.max.x = min(this.max.x, other.max.x)
            this.max.y = min(this.max.y, other.max.y)
            this.max.z = min(this.max.z, other.max.z)
        } else {
            this.min.set(other.min)
            this.max.set(other.max)
            this.isValid = true
        }
    }

    /**
     * Adds to this bounding box to include a given point
     * @param other the point to increase the bounding volume to
     * @returns {void} Reference to this bounding box after resizing to include the other point
     * @public
     */
    plusAssign1(other: FVector): void {
        if (this.isValid) {
            const min = (x, y) => Math.min(x, y)
            // min
            this.min.x = min(this.min.x, other.x)
            this.min.y = min(this.min.y, other.y)
            this.min.z = min(this.min.z, other.z)
            // max
            this.max.x = min(this.max.x, other.x)
            this.max.y = min(this.max.y, other.y)
            this.max.z = min(this.max.z, other.z)
        } else {
            this.min.set(other)
            this.max.set(other)
            this.isValid = true
        }
    }

    /**
     * Gets the result of addition to this bounding volume
     * @param other The other volume to add to this
     * @returns {FBox} A new bounding volume
     * @public
     */
    plus0(other: FBox): FBox {
        const box = new FBox(this)
        box.plusAssign0(other)
        return box
    }

    /**
     * Gets the result of addition to this bounding volume
     * @param other The other point to add to this
     * @returns {FBox} A new bounding volume
     * @public
     */
    plus1(other: FVector): FBox {
        const box = new FBox(this)
        box.plusAssign1(other)
        return box
    }

    /**
     * Gets the min or max of this bounding volume
     * @param index the index into points of the bounding volume
     * @returns {FVector} a point of the bounding volume
     * @public
     */
    get(index: number): FVector {
        if (index === 0)
            return this.min
        if (index === 1)
            return this.max
        throw new Error(`Index out of bounds! Received: ${index} (min: 0, max: 1)`)
    }

    /**
     * Calculates the distance of a point to this box
     * @param point The point
     * @returns {number} The distance
     * @public
     */
    computeSquaredDistanceToPoint(point: FVector): number {
        return FVector.computeSquaredDistanceFromBoxToPoint(this.min, this.max, point)
    }

    /**
     * Increases the box size
     * @param v The size to increase the volume by
     * @returns {FBox} A new bounding box
     * @public
     */
    expandBy0(v: FVector): FBox {
        return new FBox(this.min.minus0(v), this.max.plus0(v))
    }

    /**
     * Increases the box size
     * @param w The size to increase the volume by
     * @returns {FBox} A new bounding box
     * @public
     */
    expandBy1(w: number): FBox {
        const v = new FVector(w, w, w)
        return new FBox(this.min.minus0(v), this.max.plus0(v))
    }

    /**
     * Increases the box size
     * @param neg The size to increase the volume by in the negative direction (positive values move the bounds outwards)
     * @param pos The size to increase the volume by in the positive direction (positive values move the bounds outwards)
     * @returns {FBox} A new bounding box
     * @public
     */
    expandBy2(neg: FVector, pos: FVector): FBox {
        return new FBox(this.min.minus0(neg), this.max.plus0(pos))
    }

    /**
     * Shifts the bounding box position
     * @param offset The vector to shift the box by
     * @returns {FBox} A new bounding box
     * @public
     */
    shiftBy(offset: FVector): FBox {
        return new FBox(this.min.plus0(offset), this.max.plus0(offset))
    }

    /**
     * - Moves the center of bounding box to new destination
     * @param destination The destination point to move center of box to
     * @returns {FBox} A new bounding box
     * @public
     */
    moveTo(destination: FVector): FBox {
        const offset = destination.minus0(this.getCenter())
        return new FBox(this.min.plus0(offset), this.max.plus0(offset))
    }

    /**
     * Gets the center point of this box
     * @returns {FVector} The center point
     * @public
     * @see {getCenterAndExtents}
     * @see {getExtent}
     * @see {getSize}
     * @see {getVolume}
     */
    getCenter(): FVector {
        return this.min.plus0(this.max).times1(0.5)
    }

    /**
     * Gets the center and extents of this box.
     * @param center(out) Will contain the box center point.
     * @param extents(out) Will contain the extent around the center.
     * @returns {void}
     * @public
     * @see {getCenter}
     * @see {getExtent}
     * @see {getSize}
     * @see {getVolume}
     */
    getCenterAndExtents(center: FVector, extents: FVector): void {
        extents.set(this.getExtent())
        center.set(this.min.plus0(extents))
    }

    /**
     * Calculates the closest point on or inside the box to a given point in space
     * @param point The point in space
     * @returns {FVector} The closest point on or inside the box
     * @public
     */
    getClosestPointTo(point: FVector): FVector {
        // start by considering the point inside the box
        const closestPoint = point

        // now clamp to inside box if it's outside | x
        if (point.x < this.min.x) {
            closestPoint.x = this.min.x
        } else if (point.x > this.max.x) {
            closestPoint.x = this.max.x
        }

        // now clamp to inside box if it's outside | y
        if (point.y < this.min.y) {
            closestPoint.y = this.min.y
        } else if (point.y > this.max.y) {
            closestPoint.y = this.max.y
        }

        // Now clamp to inside box if it's outside | z
        if (point.z < this.min.z) {
            closestPoint.z = this.min.z
        } else if (point.z > this.max.z) {
            closestPoint.z = this.max.z
        }

        return closestPoint
    }

    /**
     * Gets the extents of this box
     * @returns {FVector} The box extents
     * @public
     * @see {getCenter}
     * @see {getCenterAndExtents}
     * @see {getSize}
     * @see {getVolume}
     */
    getExtent(): FVector {
        return this.max.minus0(this.max).times1(0.5)
    }

    /**
     * Gets the size of this box
     * @returns {FVector} The box size
     * @public
     * @see {getCenter}
     * @see {getCenterAndExtents}
     * @see {getExtent}
     * @see {getVolume}
     */
    getSize(): FVector {
        return this.max.minus0(this.min)
    }

    /**
     * Gets the volume of this box
     * @returns {number} The box volume
     * @public
     * @see {getCenter}
     * @see {getCenterAndExtents}
     * @see {getExtent}
     * @see {getSize}
     */
    getVolume(): number {
        return (this.max.x - this.min.x) * (this.max.y - this.min.y) * (this.max.z - this.min.z)
    }

    /**
     * Checks whether the given bounding box intersects this bounding box
     * @param {FBox} other The bounding box to intersect with
     * @returns {boolean} Wether the boxes intersect, false otherwise
     * @public
     */
    intersect(other: FBox): boolean {
        if ((this.min.x > other.max.x) || (other.min.x > this.max.x))
            return false
        if ((this.min.y > other.max.y) || (other.min.y > this.max.y))
            return false
        return !((this.min.z > other.max.z) || (other.min.z > this.max.z))
    }

    /**
     * Checks whether the given bounding box intersects this bounding box in the XY plane
     * @param {FBox} other The bounding box to test intersection
     * @returns {boolean} Wether the boxes intersect in the XY Plane, false otherwise
     * @public
     */
    intersectXY(other: FBox): boolean {
        if ((this.min.x > other.max.x) || (other.min.x > this.max.x))
            return false
        return !((this.min.y > other.max.y) || (other.min.y > this.max.y))
    }

    /**
     * Returns the overlap FBox of two box
     * @param {FBox} other The bounding box to test overlap
     * @returns {FBox} the overlap box. It can be 0 if they don't overlap
     * @public
     */
    overlap(other: FBox): FBox {
        if (!this.intersect(other)) {
            const v = new FVector(0, 0, 0)
            return new FBox(v, v)
        }

        // otherwise they overlap
        // so find overlapping box
        const minVector = new FVector()
        const maxVector = new FVector()

        minVector.x = Math.max(this.min.x, other.min.x)
        maxVector.x = Math.min(this.max.x, other.max.x)

        minVector.y = Math.max(this.min.y, other.min.y)
        maxVector.y = Math.min(this.max.y, other.max.y)

        minVector.z = Math.max(this.min.z, other.min.z)
        maxVector.z = Math.min(this.max.z, other.max.z)

        return new FBox(minVector, maxVector)
    }

    // TODO inverseTransformBy(m: FTransform): FBox


    /**
     * Checks whether a given box is fully encapsulated by this box
     * @param {FBox} other The box to test for encapsulation within the bounding volume
     * @returns {FBox} Wether box is inside this volume
     * @public
     */
    isInside0(other: FBox) {
        return this.isInside1(other.min) && this.isInside1(other.max)
    }

    /**
     * Checks whether the given location is inside this box
     * @param {FVector} _in The location to test for inside the bounding volume
     * @returns {boolean} Wether location is inside this volume
     * @public
     * @see {isInsideXY1}
     */
    isInside1(_in: FVector): boolean {
        return (_in.x > this.min.x) && (_in.x < this.max.x)
            && (_in.y > this.min.y) && (_in.y < this.max.y)
            && (_in.z > this.min.z) && (_in.z < this.max.z)
    }

    /**
     * Checks whether the given location is inside or on this box
     * @param _in The location to test for inside the bounding volume
     * @returns {boolean} Wether location is inside this volume
     * @public
     * @see {isInsideXY1}
     */
    isInsideOrOn(_in: FVector): boolean {
        return (_in.x >= this.min.x) && (_in.x <= this.max.x)
            && (_in.y >= this.min.y) && (_in.y <= this.max.y)
            && (_in.z >= this.min.z) && (_in.z <= this.max.z)
    }

    /**
     * Checks whether the given box is fully encapsulated by this box in the XY plane
     * @param other The box to test for encapsulation within the bounding box
     * @returns {boolean} Wether is inside this box in the XY plane
     * @public
     */
    isInsideXY0(other: FBox): boolean {
        return this.isInsideXY1(other.min) && this.isInsideXY1(other.max)
    }

    /**
     * - Checks whether the given location is inside this box in the XY plane
     * @param _in The location to test for inside the bounding box
     * @returns {boolean} Wether location is inside this box in the XY plane
     * @public
     * @see {isInside1}
     */
    isInsideXY1(_in: FVector): boolean {
        return (_in.x > this.min.x) && (_in.x < this.max.x)
            && (_in.y > this.min.y) && (_in.y < this.max.y)
    }

    // TODO transformBy(m: FMatrix): FBox

    // TODO transformBy(m: FTransform): FBox

    // TODO transformProjectBy(projM: FMatrix): FBox

    /**
     * Turns this into string
     * @returns {string}
     * @public
     */
    toString() {
        return `IsValid=${this.isValid}, Min=(${this.min.toString()}), Max=(${this.max.toString()})`
    }

    /**
     * Turns this into json
     * @returns {any}
     * @public
     */
    toJson() {
        return {
            bIsValid: this.isValid,
            max: this.max.toJson(),
            min: this.min.toJson()
        }
    }

    /**
     * Utility function to build an AABB from Origin and Extent
     * @param {FVector} origin The location of the bounding box
     * @param {FVector} extent Half size of the bounding box
     * @returns {FBox} A new axis-aligned bounding box
     * @public
     */
    static buildAABB(origin: FVector, extent: FVector): FBox {
        return new FBox(origin.minus0(extent), origin.plus0(extent))
    }
}
