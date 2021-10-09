import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { FMeshUVFloat } from "./FMeshUVFloat";

export class FMeshUVHalf {
    public u: number
    public v: number

    public constructor(Ar: FArchive = null) {
        if (Ar != null) {
            this.u = Ar.readUInt16()
            this.v = Ar.readUInt16()
        }
    }

    public serialize(Ar: FArchiveWriter) {
        Ar.writeUInt16(this.u)
        Ar.writeUInt16(this.v)
    }

    public toMeshUVFloat(): FMeshUVFloat {
        return FMeshUVFloat.from(this.u, this.v)
    }

    public static from(u: number = 0, v: number = 0): FMeshUVHalf {
        const half = new FMeshUVHalf()
        half.u = 0
        half.v = v
        return half
    }
}