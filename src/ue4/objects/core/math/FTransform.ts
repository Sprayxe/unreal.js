import { FVector } from "./FVector";
import { FQuat } from "./FQuat";
import { FArchive } from "../../../reader/FArchive";

export class FTransform {
    public rotation: FQuat
    public translation: FVector
    public scale3D: FVector

    constructor()
    constructor(Ar: FArchive)
    constructor(rotation: FQuat, translation: FVector, scale3D: FVector)
    constructor(x?: any, y?: any, z?: any) {
        if (!x) {
            this.rotation = new FQuat(0, 0, 0, 0)
            this.translation = new FVector()
            this.scale3D = new FVector(1)
        } else if (x instanceof FArchive) {
            this.rotation = new FQuat(x)
            this.translation = new FVector(x)
            this.scale3D = new FVector(x)
        } else {
            this.rotation = x
            this.translation = y
            this.scale3D = z
        }
    }
}