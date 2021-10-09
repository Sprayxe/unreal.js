import { FVector } from "../../../objects/core/math/FVector";
import { FArchive } from "../../../reader/FArchive";
import { ParserException } from "../../../../exceptions/Exceptions";

export class FPositionVertexBuffer {
    public verts: FVector[]
    public stride: number
    public numVertices: number

    public constructor(Ar: FArchive)
    public constructor(verts: FVector[], stride: number, numVertices: number)
    public constructor(...args) {
        const arg = args[0]
        if (arg instanceof FArchive) {
            this.stride = arg.readInt32()
            this.numVertices = arg.readInt32()

            const elemSize = arg.readInt32()
            const elemCount = arg.readInt32()
            const savePos = arg.pos

            const array = new Array(elemCount)
            for (let i = 0; i < elemCount; ++i)
                array[i] = new FVector(arg)

            if (arg.pos != savePos + array.length * elemSize)
                throw new ParserException(`RawArray item size mismatch: expected ${elemSize}, serialized ${(arg.pos - savePos) / array.length}`)

            this.verts = array
        } else {
            this.verts = arg
            this.stride = args[1]
            this.numVertices = args[2]
        }
    }
}