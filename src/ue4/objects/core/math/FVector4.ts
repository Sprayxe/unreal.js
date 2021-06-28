import { FVector } from "./FVector";
import { FVector2D } from "./FVector2D";
import { FArchive } from "../../../reader/FArchive";
import { FLinearColor } from "./FColor";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FVector4 implements IStructType {
    /**
     * The vector's X-component
     * @type {number}
     * @public
     */
    public x: number

    /**
     * The vector's Y-component
     * @type {number}
     * @public
     */
    public y: number

    /**
     * The vector's Z-component
     * @type {number}
     * @public
     */
    public z: number

    /**
     * The vector's W-component
     * @type {number}
     * @public
     */
    public w: number

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
     * Creates an instance using FVector and number
     * @param {FVector} vector 3D Vector to set first three components
     * @param {number} w W Coordinate
     * @constructor
     * @public
     */
    constructor(vector: FVector, w: number)

    /**
     * Creates an instance using FLinearColor
     * @param {FLinearColor} color Color used to set vector
     * @constructor
     * @public
     */
    constructor(color: FLinearColor)

    /**
     * Creates an instance using values
     * @param {number} x X Coordinate
     * @param {number} y Y Coordinate
     * @param {number} z Z Coordinate
     * @param {number} w W Coordinate
     * @constructor
     * @public
     */
    constructor(x: number, y: number, z: number, w: number)

    /**
     * Creates an instance using specified 2D vectors
     * @param {FVector2D} xy A 2D vector holding the X- and Y-components
     * @param {FVector2D} zw A 2D vector holding the Z- and W-components
     * @constructor
     * @public
     */
    constructor(xy: FVector2D, zw: FVector2D)

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    constructor(arg1?: any, arg2?: any, arg3?: any, arg4?: any) {
        if (arg1 instanceof FArchive) {
            this.x = arg1.readFloat32()
            this.y = arg1.readFloat32()
            this.z = arg1.readFloat32()
            this.w = arg1.readFloat32()
        } else if (arg1 instanceof FVector) {
            this.x = arg1.x
            this.y = arg1.y
            this.z = arg1.z
            this.w = arg2
        } else if (arg1 instanceof FVector2D) {
            this.x = arg1.x
            this.y = arg1.y
            this.z = arg2.x
            this.w = arg2.y
        } else if (arg1 instanceof FLinearColor) {
            this.x = arg1.r
            this.y = arg1.g
            this.z = arg1.b
            this.w = arg1.a
        } else if (arg1 != null && arg2 != null) {
            this.x = arg1
            this.y = arg2
            this.z = arg3
            this.w = arg4
        } else {
            this.x = 0.0
            this.y = 0.0
            this.z = 0.0
            this.w = 0.0
        }
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