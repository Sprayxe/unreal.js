import { FStripDataFlags } from "../../../objects/engine/FStripDataFlags";
import { FColor } from "../../../objects/core/math/FColor";
import { FArchive } from "../../../reader/FArchive";
import { VER_UE4_STATIC_SKELETAL_MESH_SERIALIZATION_FIX } from "../../../versions/Versions";
import { ParserException } from "../../../../exceptions/Exceptions";

export class FColorVertexBuffer {
    public stripFlags: FStripDataFlags
    public stride: number
    public numVertices: number
    public data: FColor[]

    public constructor(Ar: FArchive)
    public constructor(stripFlags: FStripDataFlags, stride: number, numVertices: number, data: FColor[])
    public constructor(...args) {
        const arg = args[0]
        if (arg instanceof FArchive) {
            this.stripFlags = new FStripDataFlags(arg, VER_UE4_STATIC_SKELETAL_MESH_SERIALIZATION_FIX)
            this.stride = arg.readInt32()
            this.numVertices = arg.readInt32()

            if (!this.stripFlags.isDataStrippedForServer && this.numVertices > 0) {
                const elemSize = arg.readInt32()
                const elemCount = arg.readInt32()
                const savePos = arg.pos

                const array = new Array(elemCount)
                for (let i = 0; i < elemCount; ++i)
                    array[i] = new FColor(arg)

                if (arg.pos != savePos + array.length * elemSize)
                    throw new ParserException(`RawArray item size mismatch: expected ${elemSize}, serialized ${(arg.pos - savePos) / array.length}`)

                this.data = array
            } else this.data = []
        } else {
            this.stripFlags = arg
            this.stride = args[1]
            this.numVertices = args[2]
            this.data = args[3]
        }
    }
}