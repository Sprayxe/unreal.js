import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FVector } from "./FVector";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

/**
 * Implements an axis-aligned box.
 *
 * Boxes describe an axis-aligned extent in three dimensions. They are used for many different things in the
 * Engine and in games, such as bounding volumes, collision detection and visibility calculation.
 */
export class FBox implements IStructType {
    /** Holds the box's minimum point. */
    public min: FVector

    /** Holds the box's maximum point. */
    public max: FVector

    /** Holds a flag indicating whether this box is valid. */
    public isValid: boolean

    constructor()
    constructor(box: FBox)
    constructor(Ar: FArchive)
    constructor(points: FVector[])
    constructor(min: FVector, max: FVector)
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

    serialize(Ar: FArchiveWriter) {
        this.min.serialize(Ar)
        this.max.serialize(Ar)
        Ar.writeFlag(this.isValid)
    }

    /**
     * - Compares two boxes for equality.
     *
     * @return true if the boxes are equal, false otherwise.
     */
    equals(other: any): boolean {
        if (this === other) return true
        if (!(other instanceof FBox)) return false
        other as FBox
        return this.min.equals(other.min) && this.max.equals(other.max)
    }

    /**
     * - Adds to this bounding box to include a new bounding volume.
     *
     * @param other the bounding volume to increase the bounding volume to.
     * @return Reference to this bounding volume after resizing to include the other bounding volume.
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
     * - Adds to this bounding box to include a given point.
     *
     * @param other the point to increase the bounding volume to.
     * @return Reference to this bounding box after resizing to include the other point.
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
     * - Gets the result of addition to this bounding volume.
     *
     * @param other The other volume to add to this.
     * @return A new bounding volume.
     */
    plus0(other: FBox): FBox {
        const box = new FBox(this)
        box.plusAssign0(other)
        return box
    }

    /**
     * - Gets the result of addition to this bounding volume.
     *
     * @param other The other point to add to this.
     * @return A new bounding volume.
     */
    plus1(other: FVector): FBox {
        const box = new FBox(this)
        box.plusAssign1(other)
        return box
    }

    /**
     * - Gets the min or max of this bounding volume.
     *
     * @param index the index into points of the bounding volume.
     * @return a point of the bounding volume.
     */
    get(index: number): FVector {
        if (index === 0)
            return this.min
        if (index === 1)
            return this.max
        throw new Error(`Index out of bounds! Received: ${index} (min: 0, max: 1)`)
    }

    /**
     * - Calculates the distance of a point to this box.
     *
     * @param point The point.
     * @return The distance.
     */
    computeSquaredDistanceToPoint(point: FVector): number {
        return FVector.computeSquaredDistanceFromBoxToPoint(this.min, this.max, point)
    }

    /**
     * - Increases the box size.
     *
     * @param v The size to increase the volume by.
     * @return A new bounding box.
     */
    expandBy0(v: FVector): FBox {
        return new FBox(this.min.minus0(v), this.max.plus0(v))
    }

    /**
     * - Increases the box size.
     *
     * @param w The size to increase the volume by.
     * @return A new bounding box.
     */
    expandBy1(w: number): FBox {
        const v = new FVector(w, w, w)
        return new FBox(this.min.minus0(v), this.max.plus0(v))
    }

    /**
     * - Increases the box size.
     *
     * @param neg The size to increase the volume by in the negative direction (positive values move the bounds outwards)
     * @param pos The size to increase the volume by in the positive direction (positive values move the bounds outwards)
     * @return A new bounding box.
     */
    expandBy2(neg: FVector, pos: FVector): FBox {
        return new FBox(this.min.minus0(neg), this.max.plus0(pos))
    }

    /**
     * - Shifts the bounding box position.
     *
     * @param offset The vector to shift the box by.
     * @return A new bounding box.
     */
    shiftBy(offset: FVector): FBox {
        return new FBox(this.min.plus0(offset), this.max.plus0(offset))
    }

    /**
     * - Moves the center of bounding box to new destination.
     *
     * @param destination The destination point to move center of box to.
     * @return A new bounding box.
     */
    moveTo(destination: FVector): FBox {
        const offset = destination.minus0(this.getCenter())
        return new FBox(this.min.plus0(offset), this.max.plus0(offset))
    }

    /**
     * Gets the center point of this box.
     *
     * @return The center point.
     * @see getCenterAndExtents
     * @see getExtent
     * @see getSize
     * @see getVolume
     */
    getCenter(): FVector {
        return this.min.plus0(this.max).times1(0.5)
    }

    /**
     * - Gets the center and extents of this box.
     *
     * @param center(out) Will contain the box center point.
     * @param extents(out) Will contain the extent around the center.
     * @see getCenter
     * @see getExtent
     * @see getSize
     * @see getVolume
     */
    getCenterAndExtents(center: FVector, extents: FVector): void {
        extents.set(this.getExtent())
        center.set(this.min.plus0(extents))
    }

    /**
     * - Calculates the closest point on or inside the box to a given point in space.
     *
     * @param point The point in space.
     * @return The closest point on or inside the box.
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
     * - Gets the extents of this box.
     *
     * @return The box extents.
     * @see getCenter
     * @see getCenterAndExtents
     * @see getSize
     * @see getVolume
     */
    getExtent(): FVector {
        return this.max.minus0(this.max).times1(0.5)
    }

    /**
     * Gets the size of this box.
     *
     * @return The box size.
     * @see getCenter
     * @see getCenterAndExtents
     * @see getExtent
     * @see getVolume
     */
    getSize(): FVector {
        return this.max.minus0(this.min)
    }

    /**
     * - Gets the volume of this box.
     *
     * @return The box volume.
     * @see getCenter
     * @see getCenterAndExtents
     * @see getExtent
     * @see getSize
     */
    getVolume(): number {
        return (this.max.x - this.min.x) * (this.max.y - this.min.y) * (this.max.z - this.min.z)
    }

    /**
     * - Checks whether the given bounding box intersects this bounding box.
     *
     * @param other The bounding box to intersect with.
     * @return true if the boxes intersect, false otherwise.
     */
    intersect(other: FBox): boolean {
        if ((this.min.x > other.max.x) || (other.min.x > this.max.x))
            return false
        if ((this.min.y > other.max.y) || (other.min.y > this.max.y))
            return false
        return !((this.min.z > other.max.z) || (other.min.z > this.max.z))
    }

    /**
     * - Checks whether the given bounding box intersects this bounding box in the XY plane.
     *
     * @param other The bounding box to test intersection.
     * @return true if the boxes intersect in the XY Plane, false otherwise.
     */
    intersectXY(other: FBox): boolean {
        if ((this.min.x > other.max.x) || (other.min.x > this.max.x))
            return false
        return !((this.min.y > other.max.y) || (other.min.y > this.max.y))
    }

    /**
     * - Returns the overlap FBox of two box
     *
     * @param other The bounding box to test overlap
     * @return the overlap box. It can be 0 if they don't overlap
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
     * - Checks whether a given box is fully encapsulated by this box.
     *
     * @param other The box to test for encapsulation within the bounding volume.
     * @return true if box is inside this volume.
     */
    isInside0(other: FBox) {
        return this.isInside1(other.min) && this.isInside1(other.max)
    }

    /**
     * - Checks whether the given location is inside this box.
     *
     * @param _in The location to test for inside the bounding volume.
     * @return true if location is inside this volume.
     * @see isInsideXY
     */
    isInside1(_in: FVector): boolean {
        return (_in.x > this.min.x) && (_in.x < this.max.x)
            && (_in.y > this.min.y) && (_in.y < this.max.y)
            && (_in.z > this.min.z) && (_in.z < this.max.z)
    }

    /**
     * - Checks whether the given location is inside or on this box.
     *
     * @param _in The location to test for inside the bounding volume.
     * @return true if location is inside this volume.
     * @see isInsideXY
     */
    isInsideOrOn(_in: FVector): boolean {
        return (_in.x >= this.min.x) && (_in.x <= this.max.x)
            && (_in.y >= this.min.y) && (_in.y <= this.max.y)
            && (_in.z >= this.min.z) && (_in.z <= this.max.z)
    }

    /**
     * - Checks whether the given box is fully encapsulated by this box in the XY plane.
     *
     * @param other The box to test for encapsulation within the bounding box.
     * @return true if box is inside this box in the XY plane.
     */
    isInsideXY0(other: FBox): boolean {
        return this.isInsideXY1(other.min) && this.isInsideXY1(other.max)
    }

    /**
     * - Checks whether the given location is inside this box in the XY plane.
     *
     * @param _in The location to test for inside the bounding box.
     * @return true if location is inside this box in the XY plane.
     * @see isInside
     */
    isInsideXY1(_in: FVector): boolean {
        return (_in.x > this.min.x) && (_in.x < this.max.x)
            && (_in.y > this.min.y) && (_in.y < this.max.y)
    }

    // TODO transformBy(m: FMatrix): FBox

    // TODO transformBy(m: FTransform): FBox

    // TODO transformProjectBy(projM: FMatrix): FBox

    toString() {
        return `IsValid=${this.isValid}, Min=(${this.min.toString()}), Max=(${this.max.toString()})`
    }

    toJson() {
        return {
            bIsValid: this.isValid,
            max: this.max.toJson(),
            min: this.min.toJson()
        }
    }

    /**
     * - Utility function to build an AABB from Origin and Extent
     *
     * @param origin The location of the bounding box.
     * @param extent Half size of the bounding box.
     * @return A new axis-aligned bounding box.
     */
    static buildAABB(origin: FVector, extent: FVector): FBox {
        return new FBox(origin.minus0(extent), origin.plus0(extent))
    }
}
