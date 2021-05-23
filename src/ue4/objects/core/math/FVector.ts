import { FArchive } from "../../../reader/FArchive";
import { FVector2D } from "./FVector2D";
import { FVector4 } from "./FVector4";
import { FLinearColor } from "./FColor";
import { FIntVector } from "./FIntVector";
import { FIntPoint } from "./FIntPoint";
import { FArc } from "../../../assets/IoPackage";

const THRESH_VECTOR_NORMALIZED = 0.01
export class FVector {
    /** Vector's X component. */
    public x: number
    /** Vector's Y component. */
    public y: number
    /** Vector's Z component. */
    public z: number

    constructor()
    constructor(f: number)
    constructor(Ar: FArchive)
    constructor(v: FVector4)
    constructor(color: FLinearColor)
    constructor(vector: FIntVector)
    constructor(a: FIntPoint)
    constructor(x: number, y: number, z: number)
    constructor(v: FVector2D, z: number)
    constructor(arg1?: any, arg2?: any, arg3?: any) {
        if (arg1 instanceof FArchive) {
            this.x = arg1.readFloat32()
            this.y = arg1.readFloat32()
            this.z = arg1.readFloat32()
        } else if (typeof arg1 === "number" && !arg2) {
            this.x = arg1
            this.y = arg1
            this.z = arg1
        }
    }
}
