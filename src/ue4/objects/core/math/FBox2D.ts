import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FVector2D } from "./FVector2D";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

/**
 * Implements a rectangular 2D Box
 * @implements {IStructType}
 */
export class FBox2D implements IStructType {
    /**
     * Holds the box's minimum point
     * @type {FVector2D}
     * @public
     */
    public min: FVector2D

    /**
     * Holds the box's maximum point
     * @type {FVector2D}
     * @public
     */
    public max: FVector2D

    /**
     * Holds a flag indicating whether this box is valid
     * @type {boolean}
     * @public
     */
    public isValid: boolean

    /**
     * Creates and initializes a new box.
     * The box extents are initialized to zero and the box is marked as invalid
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates and initializes a new box using UE4 reader
     * The box extents are initialized using the provided FArchive
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */

    constructor(Ar: FArchive)
    /**
     * Creates and initializes a new box from the specified parameters
     * @param {FVector2D} min The box's minimum point
     * @param {FVector2D} max The box's maximum point
     * @constructor
     * @public
     */
    constructor(min: FVector2D, max: FVector2D)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any) {
        if (!x) {
            this.max = new FVector2D(0, 0)
            this.min = new FVector2D(0, 0)
            this.isValid = false
        } else if (x instanceof FArchive) {
            this.max = new FVector2D(x)
            this.min = new FVector2D(x)
            this.isValid = x.readFlag()
        } else {
            this.max = x
            this.min = y
            this.isValid = true
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Reader to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.min.serialize(Ar)
        this.max.serialize(Ar)
        Ar.writeFlag(this.isValid)
    }

    /**
     * Get a textual representation of this box
     * @returns {string} A string describing the box
     * @public
     */
    toString() {
        return `bIsValid=${this.isValid}, Min=(${this.min.toString()}), Max=(${this.max.toString()})`
    }

    /**
     * Turns this into json
     * @returns {any} json
     * @public
     */
    toJson(): any {
        return {
            bIsValid: this.isValid,
            min: this.min.toJson(),
            max: this.max.toJson()
        }
    }
}
