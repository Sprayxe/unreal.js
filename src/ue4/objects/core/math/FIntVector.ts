import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FIntVector implements IStructType {
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
     * Z Value
     * @type {number}
     * @public
     */
    public z: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using XYZ values
     * @param {number} x X value
     * @param {number} y Y value
     * @param {number} z Z value
     * @constructor
     * @public
     */
    constructor(x: number, y: number, z: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg1: any, arg2?: any, arg3?: any) {
        if (arg1 instanceof FArchive) {
            this.x = arg1.readInt32()
            this.y = arg1.readInt32()
            this.z = arg1.readInt32()
        } else {
            this.x = arg1
            this.y = arg2
            this.z = arg3
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
        Ar.writeInt32(this.z)
    }

    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return `X=${this.x} Y=${this.y} Z=${this.z}`
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    }
}
