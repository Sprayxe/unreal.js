import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

export class FMeshUVFloat {
    public u: number
    public v: number

    public constructor(Ar: FArchive = null) {
        this.u = Ar.readFloat32()
        this.v = Ar.readFloat32()
    }

    public serialize(Ar: FArchiveWriter) {
        Ar.writeFloat32(this.u)
        Ar.writeFloat32(this.v)
    }

    public static from(u: number, v: number): FMeshUVFloat {
        const uv = new FMeshUVFloat()
        uv.u = u
        uv.v = v
        return uv
    }
}