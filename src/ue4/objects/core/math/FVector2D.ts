import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

/**
 * A vector in 2-D space composed of components (X, Y) with floating point precision
 * @implements {IStructType}
 */
export class FVector2D implements IStructType {
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
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @constructor
     * @public
     */
    constructor(x: number, y: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg1?: any, arg2?: any) {
        if (arg1 instanceof FArchive) {
            this.x = arg1.readFloat32()
            this.y = arg1.readFloat32()
        } else if (arg1 && arg2) {
            this.x = arg1
            this.y = arg2
        } else {
            this.x = 0
            this.y = 0
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
    }

    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return `X=${this.x.toLocaleString()} Y=${this.y.toLocaleString()}`
    }

    /**
     * Turns this into json
     * @returns {json} Json
     * @public
     */
    toJson(): any {
        return {
            x: this.x,
            y: this.y
        }
    }
}