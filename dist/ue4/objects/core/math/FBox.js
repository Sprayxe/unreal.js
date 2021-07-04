"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBox = void 0;
const FVector_1 = require("./FVector");
const FArchive_1 = require("../../../reader/FArchive");
/**
 * Implements an axis-aligned box
 * Boxes describe an axis-aligned extent in three dimensions. They are used for many different things in the
 * Engine and in games, such as bounding volumes, collision detection and visibility calculation
 * @implements {IStructType}
 */
class FBox {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (!x) {
            this.min = new FVector_1.FVector(0, 0, 0);
            this.max = new FVector_1.FVector(0, 0, 0);
            this.isValid = false;
        }
        else if (x instanceof FArchive_1.FArchive) {
            this.min = new FVector_1.FVector(x);
            this.max = new FVector_1.FVector(x);
            this.isValid = x.readFlag();
        }
        else if (Array.isArray(x)) {
            this.min = new FVector_1.FVector(0, 0, 0);
            this.min = new FVector_1.FVector(0, 0, 0);
            this.isValid = false;
            // TODO loop thru x
        }
        else {
            this.min = x;
            this.max = y;
            this.isValid = true;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.min.serialize(Ar);
        this.max.serialize(Ar);
        Ar.writeFlag(this.isValid);
    }
    /**
     * Compares two boxes for equality
     * @returns {boolean} Whether the boxes are equal, false otherwise
     * @public
     */
    equals(other) {
        if (this === other)
            return true;
        if (!(other instanceof FBox))
            return false;
        other;
        return this.min.equals(other.min) && this.max.equals(other.max);
    }
    /**
     * Adds to this bounding box to include a new bounding volume
     * @param {FBox} other the bounding volume to increase the bounding volume to
     * @returns {void} Reference to this bounding volume after resizing to include the other bounding volume
     * @public
     */
    plusAssign0(other) {
        if (this.isValid) {
            const min = (x, y) => Math.min(x, y);
            // min
            this.min.x = min(this.min.x, other.min.x);
            this.min.y = min(this.min.y, other.min.y);
            this.min.z = min(this.min.z, other.min.z);
            // max
            this.max.x = min(this.max.x, other.max.x);
            this.max.y = min(this.max.y, other.max.y);
            this.max.z = min(this.max.z, other.max.z);
        }
        else {
            this.min.set(other.min);
            this.max.set(other.max);
            this.isValid = true;
        }
    }
    /**
     * Adds to this bounding box to include a given point
     * @param {FVector} other the point to increase the bounding volume to
     * @returns {void} Reference to this bounding box after resizing to include the other point
     * @public
     */
    plusAssign1(other) {
        if (this.isValid) {
            const min = (x, y) => Math.min(x, y);
            // min
            this.min.x = min(this.min.x, other.x);
            this.min.y = min(this.min.y, other.y);
            this.min.z = min(this.min.z, other.z);
            // max
            this.max.x = min(this.max.x, other.x);
            this.max.y = min(this.max.y, other.y);
            this.max.z = min(this.max.z, other.z);
        }
        else {
            this.min.set(other);
            this.max.set(other);
            this.isValid = true;
        }
    }
    /**
     * Gets the result of addition to this bounding volume
     * @param {FBox} other The other volume to add to this
     * @returns {FBox} A new bounding volume
     * @public
     */
    plus0(other) {
        const box = new FBox(this);
        box.plusAssign0(other);
        return box;
    }
    /**
     * Gets the result of addition to this bounding volume
     * @param {FVector} other The other point to add to this
     * @returns {FBox} A new bounding volume
     * @public
     */
    plus1(other) {
        const box = new FBox(this);
        box.plusAssign1(other);
        return box;
    }
    /**
     * Gets the min or max of this bounding volume
     * @param {number} index the index into points of the bounding volume
     * @returns {FVector} a point of the bounding volume
     * @public
     */
    get(index) {
        if (index === 0)
            return this.min;
        if (index === 1)
            return this.max;
        throw new Error(`Index out of bounds! Received: ${index} (min: 0, max: 1)`);
    }
    /**
     * Calculates the distance of a point to this box
     * @param {FVector} point The point
     * @returns {number} The distance
     * @public
     */
    computeSquaredDistanceToPoint(point) {
        return FVector_1.FVector.computeSquaredDistanceFromBoxToPoint(this.min, this.max, point);
    }
    /**
     * Increases the box size
     * @param {FVector} v The size to increase the volume by
     * @returns {FBox} A new bounding box
     * @public
     */
    expandBy0(v) {
        return new FBox(this.min.minus0(v), this.max.plus0(v));
    }
    /**
     * Increases the box size
     * @param {number} w The size to increase the volume by
     * @returns {FBox} A new bounding box
     * @public
     */
    expandBy1(w) {
        const v = new FVector_1.FVector(w, w, w);
        return new FBox(this.min.minus0(v), this.max.plus0(v));
    }
    /**
     * Increases the box size
     * @param {FVector} neg The size to increase the volume by in the negative direction (positive values move the bounds outwards)
     * @param {FVector} pos The size to increase the volume by in the positive direction (positive values move the bounds outwards)
     * @returns {FBox} A new bounding box
     * @public
     */
    expandBy2(neg, pos) {
        return new FBox(this.min.minus0(neg), this.max.plus0(pos));
    }
    /**
     * Shifts the bounding box position
     * @param {FVector} offset The vector to shift the box by
     * @returns {FBox} A new bounding box
     * @public
     */
    shiftBy(offset) {
        return new FBox(this.min.plus0(offset), this.max.plus0(offset));
    }
    /**
     * Moves the center of bounding box to new destination
     * @param {FVector} destination The destination point to move center of box to
     * @returns {FBox} A new bounding box
     * @public
     */
    moveTo(destination) {
        const offset = destination.minus0(this.getCenter());
        return new FBox(this.min.plus0(offset), this.max.plus0(offset));
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
    getCenter() {
        return this.min.plus0(this.max).times1(0.5);
    }
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
    getCenterAndExtents(center, extents) {
        extents.set(this.getExtent());
        center.set(this.min.plus0(extents));
    }
    /**
     * Calculates the closest point on or inside the box to a given point in space
     * @param {FVector} point The point in space
     * @returns {FVector} The closest point on or inside the box
     * @public
     */
    getClosestPointTo(point) {
        // start by considering the point inside the box
        const closestPoint = point;
        // now clamp to inside box if it's outside | x
        if (point.x < this.min.x) {
            closestPoint.x = this.min.x;
        }
        else if (point.x > this.max.x) {
            closestPoint.x = this.max.x;
        }
        // now clamp to inside box if it's outside | y
        if (point.y < this.min.y) {
            closestPoint.y = this.min.y;
        }
        else if (point.y > this.max.y) {
            closestPoint.y = this.max.y;
        }
        // Now clamp to inside box if it's outside | z
        if (point.z < this.min.z) {
            closestPoint.z = this.min.z;
        }
        else if (point.z > this.max.z) {
            closestPoint.z = this.max.z;
        }
        return closestPoint;
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
    getExtent() {
        return this.max.minus0(this.max).times1(0.5);
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
    getSize() {
        return this.max.minus0(this.min);
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
    getVolume() {
        return (this.max.x - this.min.x) * (this.max.y - this.min.y) * (this.max.z - this.min.z);
    }
    /**
     * Checks whether the given bounding box intersects this bounding box
     * @param {FBox} other The bounding box to intersect with
     * @returns {boolean} Whether the boxes intersect, false otherwise
     * @public
     */
    intersect(other) {
        if ((this.min.x > other.max.x) || (other.min.x > this.max.x))
            return false;
        if ((this.min.y > other.max.y) || (other.min.y > this.max.y))
            return false;
        return !((this.min.z > other.max.z) || (other.min.z > this.max.z));
    }
    /**
     * Checks whether the given bounding box intersects this bounding box in the XY plane
     * @param {FBox} other The bounding box to test intersection
     * @returns {boolean} Whether the boxes intersect in the XY Plane, false otherwise
     * @public
     */
    intersectXY(other) {
        if ((this.min.x > other.max.x) || (other.min.x > this.max.x))
            return false;
        return !((this.min.y > other.max.y) || (other.min.y > this.max.y));
    }
    /**
     * Returns the overlap FBox of two box
     * @param {FBox} other The bounding box to test overlap
     * @returns {FBox} the overlap box. It can be 0 if they don't overlap
     * @public
     */
    overlap(other) {
        if (!this.intersect(other)) {
            const v = new FVector_1.FVector(0, 0, 0);
            return new FBox(v, v);
        }
        // otherwise they overlap
        // so find overlapping box
        const minVector = new FVector_1.FVector();
        const maxVector = new FVector_1.FVector();
        minVector.x = Math.max(this.min.x, other.min.x);
        maxVector.x = Math.min(this.max.x, other.max.x);
        minVector.y = Math.max(this.min.y, other.min.y);
        maxVector.y = Math.min(this.max.y, other.max.y);
        minVector.z = Math.max(this.min.z, other.min.z);
        maxVector.z = Math.min(this.max.z, other.max.z);
        return new FBox(minVector, maxVector);
    }
    // TODO inverseTransformBy(m: FTransform): FBox
    /**
     * Checks whether a given box is fully encapsulated by this box
     * @param {FBox} other The box to test for encapsulation within the bounding volume
     * @returns {FBox} Whether box is inside this volume
     * @public
     */
    isInside0(other) {
        return this.isInside1(other.min) && this.isInside1(other.max);
    }
    /**
     * Checks whether the given location is inside this box
     * @param {FVector} _in The location to test for inside the bounding volume
     * @returns {boolean} Whether location is inside this volume
     * @public
     * @see {isInsideXY1}
     */
    isInside1(_in) {
        return (_in.x > this.min.x) && (_in.x < this.max.x)
            && (_in.y > this.min.y) && (_in.y < this.max.y)
            && (_in.z > this.min.z) && (_in.z < this.max.z);
    }
    /**
     * Checks whether the given location is inside or on this box
     * @param {FVector} _in The location to test for inside the bounding volume
     * @returns {boolean} Whether location is inside this volume
     * @public
     * @see {isInsideXY1}
     */
    isInsideOrOn(_in) {
        return (_in.x >= this.min.x) && (_in.x <= this.max.x)
            && (_in.y >= this.min.y) && (_in.y <= this.max.y)
            && (_in.z >= this.min.z) && (_in.z <= this.max.z);
    }
    /**
     * Checks whether the given box is fully encapsulated by this box in the XY plane
     * @param {FBox} other The box to test for encapsulation within the bounding box
     * @returns {boolean} Whether is inside this box in the XY plane
     * @public
     */
    isInsideXY0(other) {
        return this.isInsideXY1(other.min) && this.isInsideXY1(other.max);
    }
    /**
     * - Checks whether the given location is inside this box in the XY plane
     * @param {FVector} _in The location to test for inside the bounding box
     * @returns {boolean} Whether location is inside this box in the XY plane
     * @public
     * @see {isInside1}
     */
    isInsideXY1(_in) {
        return (_in.x > this.min.x) && (_in.x < this.max.x)
            && (_in.y > this.min.y) && (_in.y < this.max.y);
    }
    // TODO transformBy(m: FMatrix): FBox
    // TODO transformBy(m: FTransform): FBox
    // TODO transformProjectBy(projM: FMatrix): FBox
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return `IsValid=${this.isValid}, Min=(${this.min.toString()}), Max=(${this.max.toString()})`;
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            bIsValid: this.isValid,
            max: this.max.toJson(),
            min: this.min.toJson()
        };
    }
    /**
     * Utility function to build an AABB from Origin and Extent
     * @param {FVector} origin The location of the bounding box
     * @param {FVector} extent Half size of the bounding box
     * @returns {FBox} A new axis-aligned bounding box
     * @public
     */
    static buildAABB(origin, extent) {
        return new FBox(origin.minus0(extent), origin.plus0(extent));
    }
}
exports.FBox = FBox;
