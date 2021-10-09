import { FArchive } from "../../../reader/FArchive";
import { EFRenderingObjectVersion, FRenderingObjectVersion } from "../../../versions/FRenderingObjectVersion";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { Game } from "../../../../index";

export class FStaticMeshSection {
    public materialIndex: number
    public firstIndex: number
    public numTriangles: number
    public minVertexIndex: number
    public maxVertexIndex: number
    public enableCollision: boolean
    public castShadow: boolean
    public forceOpaque: boolean
    public visibleInRayTracing: boolean

    public constructor(Ar: FArchive) {
        this.materialIndex = Ar.readInt32()
        this.firstIndex = Ar.readInt32()
        this.numTriangles = Ar.readInt32()
        this.minVertexIndex = Ar.readInt32()
        this.maxVertexIndex = Ar.readInt32()
        this.enableCollision = Ar.readBoolean()
        this.castShadow = Ar.readBoolean()
        this.forceOpaque = FRenderingObjectVersion.get(Ar) >=
            EFRenderingObjectVersion.StaticMeshSectionForceOpaqueField && Ar.readBoolean()
        this.visibleInRayTracing = Ar.versions.get("StaticMesh.HasVisibleInRayTracing") && Ar.readBoolean()
    }

    public serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.materialIndex)
        Ar.writeInt32(this.firstIndex)
        Ar.writeInt32(this.numTriangles)
        Ar.writeInt32(this.minVertexIndex)
        Ar.writeInt32(this.maxVertexIndex)
        Ar.writeBoolean(this.enableCollision)
        Ar.writeBoolean(this.castShadow)
        if (Ar.game >= Game.GAME_UE4(25))
            Ar.writeBoolean(this.forceOpaque)
    }
}