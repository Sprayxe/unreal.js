import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

export class FIntVector {
    public x: number
    public y: number
    public z: number

    constructor(Ar: FArchive)
    constructor(x: number, y: number, z: number)
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

    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.x)
        Ar.writeInt32(this.y)
        Ar.writeInt32(this.z)
    }
}
