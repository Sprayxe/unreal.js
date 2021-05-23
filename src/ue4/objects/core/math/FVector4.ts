import { FVector } from "./FVector";
import { FVector2D } from "./FVector2D";
import { FArchive } from "../../../reader/FArchive";
import { FLinearColor } from "./FColor";

export class FVector4 {
    /** The vector's X-component. */
    public x: number

    /** The vector's Y-component. */
    public y: number

    /** The vector's Z-component. */
    public z: number

    /** The vector's W-component. */
    public w: number

    /**
     * - Constructor which initializes all components using FArchive
     */
    constructor(Ar: FArchive)

    /**
     * - Constructor.
     *
     * @param vector 3D Vector to set first three components.
     * @param w W Coordinate.
     */
    constructor(vector: FVector, w: number)

    /**
     * - Creates and initializes a new vector from a color value.
     *
     * @param color Color used to set vector.
     */
    constructor(color: FLinearColor)

    /**
     * - Creates and initializes a new vector from the specified components.
     *
     * @param x X Coordinate.
     * @param y Y Coordinate.
     * @param z Z Coordinate.
     * @param w W Coordinate.
     */
    constructor(x: number, y: number, z: number, w: number)

    /**
     * - Creates and initializes a new vector from the specified 2D vectors.
     *
     * @param xy A 2D vector holding the X- and Y-components.
     * @param zw A 2D vector holding the Z- and W-components.
     */
    constructor(xy: FVector2D, zw: FVector2D)

    constructor(arg1: any, arg2?: any, arg3?: any, arg4?: any) {
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
        } else {
            this.x = arg1
            this.y = arg2
            this.z = arg3
            this.w = arg4
        }
    }
}