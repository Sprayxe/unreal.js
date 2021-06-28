import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

/**
 * Represents an UE4 FIntPoint
 * @implements {IStructType}
 */
export class FIntPoint implements IStructType {
    /**
     * X Value
     * @type {number}
     * @public
     */
    public x: number

    /**
     * Y Value
     * @type {number}
     * @public
     */
    public y: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using XY values
     * @param {number} x X value
     * @param {number} y Y value
     * @constructor
     * @public
     */
    constructor(x: number, y: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg1: any, arg2?: any) {
        if (arg1 instanceof FArchive) {
            this.x = arg1.readInt32()
            this.y = arg1.readInt32()
        } else {
            this.x = arg1
            this.y = arg2
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.x)
        Ar.writeInt32(this.y)
    }

    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return `X=${this.x} Y=${this.y}`
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            x: this.x,
            y: this.y
        }
    }
}