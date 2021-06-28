import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

/**
 * Represents an UE4 FQuat
 * @implements {IStructType}
 */
export class FQuat implements IStructType {
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
     * W Value
     * @type {number}
     * @public
     */
    public w: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using XYZW values
     * @param {number} x X value
     * @param {number} y Y value
     * @param {number} z Z value
     * @param {number} w W value
     * @constructor
     * @public
     */
    constructor(x: number, y: number, z: number, w: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg = args[0]
        if (arg instanceof FArchive) {
            this.x = arg.readFloat32()
            this.y = arg.readFloat32()
            this.z = arg.readFloat32()
            this.w = arg.readFloat32()
        } else {
            this.x = arg
            this.y = args[1]
            this.z = args[2]
            this.w = args[3]
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
        Ar.writeFloat32(this.z)
        Ar.writeFloat32(this.w)
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
            z: this.z,
            w: this.w
        }
    }
}
