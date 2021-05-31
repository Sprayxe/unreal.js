import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FVector2D } from "./FVector2D";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

/**
 * Implements a rectangular 2D Box.
 */
export class FBox2D implements IStructType {
    /** Holds the box's minimum point. */
    public min: FVector2D

    /** Holds the box's maximum point. */
    public max: FVector2D

    /** Holds a flag indicating whether this box is valid. */
    public isValid: boolean

    /**
     * - Creates and initializes a new box.
     *
     * The box extents are initialized to zero and the box is marked as invalid.
     */
    constructor()

    /**
     * - Creates and initializes a new box.
     *
     * The box extents are initialized using the provided FArchive
     */

    constructor(Ar: FArchive)
    /**
     * - Creates and initializes a new box from the specified parameters.
     *
     * @param min The box's minimum point.
     * @param max The box's maximum point.
     */
    constructor(min: FVector2D, max: FVector2D)

    /**
     * - Constructor used by library
     */
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

    serialize(Ar: FArchiveWriter) {
        this.min.serialize(Ar)
        this.max.serialize(Ar)
        Ar.writeFlag(this.isValid)
    }

    /**
     * - Get a textual representation of this box.
     *
     * @return A string describing the box.
     */
    toString() {
        return `bIsValid=${this.isValid}, Min=(${this.min.toString()}), Max=(${this.max.toString()})`
    }

    toJson(): any {
        return {
            bIsValid: this.isValid,
            min: this.min.toJson(),
            max: this.max.toJson()
        }
    }
}
