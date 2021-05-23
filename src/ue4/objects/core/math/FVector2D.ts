/**
 * A vector in 2-D space composed of components (X, Y) with floating point precision.
 */
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

export class FVector2D {
    /** Vector's X component. */
    public x: number
    /** Vector's Y component. */
    public y: number

    /**
     * - Constructor which initializes all components to zero.
     */
    constructor()

    /**
     * - Constructor which initializes all components using FArchive
     */
    constructor(Ar: FArchive)

    /**
     * - Constructor using initial values for each component.
     *
     * @param x X coordinate.
     * @param y Y coordinate.
     */
    constructor(x: number, y: number)

    /**
     * - Constructor used to initialize the class
     */
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

    serialize(Ar: FArchiveWriter) {
        Ar.writeFloat32(this.x)
        Ar.writeFloat32(this.y)
    }

    toString() {
        return `X=${this.x.toLocaleString()} Y=${this.y.toLocaleString()}`
    }
}