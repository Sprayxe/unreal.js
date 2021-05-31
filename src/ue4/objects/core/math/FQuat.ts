import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

export class FQuat implements IStructType {
    public x: number
    public y: number
    public z: number
    public w: number

    constructor(Ar: FArchive)
    constructor(x: number, y: number, z: number, w: number)
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

    serialize(Ar: FArchiveWriter) {
        Ar.writeFloat32(this.x)
        Ar.writeFloat32(this.y)
        Ar.writeFloat32(this.z)
        Ar.writeFloat32(this.w)
    }

    toJson(): any {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            w: this.w
        }
    }
}
