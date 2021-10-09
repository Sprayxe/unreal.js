import { FStripDataFlags } from "../../../objects/engine/FStripDataFlags";
import { FArchive } from "../../../reader/FArchive";
import { VER_UE4_STATIC_SKELETAL_MESH_SERIALIZATION_FIX } from "../../../versions/Versions";
import { Game } from "../../../versions/Game";
import { FStaticMeshUVItem } from "./FStaticMeshUVItem";
import { ParserException } from "../../../../exceptions/Exceptions";

export class FStaticMeshVertexBuffer {
    public stripFlags: FStripDataFlags
    public numTexCoords: number
    public stride: number
    public numVertices: number
    public useFullPrecisionUVs: boolean
    public useHighPrecisionTangentBasis: boolean
    public uv: FStaticMeshUVItem[]

    public constructor(Ar: FArchive = null) {
        if (Ar != null) {
            this.stripFlags = new FStripDataFlags(Ar, VER_UE4_STATIC_SKELETAL_MESH_SERIALIZATION_FIX)
            this.numTexCoords = Ar.readInt32()
            this.stride = Ar.game < Game.GAME_UE4(19) ? Ar.readInt32() : -1
            this.numVertices = Ar.readInt32()
            this.useFullPrecisionUVs = Ar.readBoolean()
            this.useHighPrecisionTangentBasis = Ar.game >= Game.GAME_UE4(12) ? Ar.readBoolean() : false

            if (!this.stripFlags.isDataStrippedForServer) {
                if (Ar.game < Game.GAME_UE4(19))
                    this.uv = Ar.readBulkArray(() => new FStaticMeshUVItem(Ar, this.useHighPrecisionTangentBasis, this.numTexCoords, this.useFullPrecisionUVs))
                else {
                    // Tangents: simulate TArray::BulkSerialize()
                    let itemSize = Ar.readInt32()
                    let itemCount = Ar.readInt32()
                    if (itemCount != this.numVertices)
                        throw new ParserException(`FStaticMeshVertexBuffer: item count (${itemCount}) != num vertices (${this.numVertices})`)

                    let pos = Ar.pos
                    this.uv = new Array(this.numVertices)
                    for (let i = 0; i < this.numVertices; ++i)
                        this.uv[i] = FStaticMeshUVItem.from(FStaticMeshUVItem.serializeTangents(Ar, this.useHighPrecisionTangentBasis), [])
                    if (Ar.pos - pos != itemCount * itemSize)
                        throw new ParserException(`FStaticMeshVertexBuffer: read wrong amount of tangent bytes: ${Ar.pos - pos}, should be ${itemCount * itemSize}`)

                    // Texture coordinates: simulate TArray::BulkSerialize()
                    itemSize = Ar.readInt32()
                    itemCount = Ar.readInt32()
                    if (itemCount != this.numVertices * this.numTexCoords)
                        throw new ParserException(`FStaticMeshVertexBuffer: item count (${itemCount}) != num vertices * num tex coords (${this.numVertices * this.numTexCoords})`)
                    pos = Ar.pos

                    for (let i = 0; i < this.numVertices; ++i)
                        this.uv[i].uv = FStaticMeshUVItem.serializeTexcoords(Ar, this.numTexCoords, this.useFullPrecisionUVs)
                    if (Ar.pos - pos != itemCount * itemSize)
                        throw new ParserException(`FStaticMeshVertexBuffer: read wrong amount of texcoord bytes: ${Ar.pos - pos}, should be ${itemCount * itemSize}`)
                }
            } else this.uv = []
        }
    }

    public static from(
        stripFlags: FStripDataFlags,
        numTexCoords: number,
        stride: number,
        numVertices: number,
        useFullPrecisionUVs: boolean,
        useHighPrecisionTangentBasis: boolean,
        uv: FStaticMeshUVItem[]
    ): FStaticMeshVertexBuffer {
        const buffer = new FStaticMeshVertexBuffer()
        buffer.stripFlags = stripFlags
        buffer.numTexCoords = numTexCoords
        buffer.stride = stride
        buffer.numVertices = numVertices
        buffer.useFullPrecisionUVs = useFullPrecisionUVs
        buffer.useHighPrecisionTangentBasis = useHighPrecisionTangentBasis
        buffer.uv = uv
        return buffer
    }
}
