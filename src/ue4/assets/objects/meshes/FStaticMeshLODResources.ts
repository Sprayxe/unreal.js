import { FAssetArchive } from "../../reader/FAssetArchive";
import { FStaticMeshSection } from "./FStaticMeshSection";
import { FPositionVertexBuffer } from "./FPositionVertexBuffer";
import { FColorVertexBuffer } from "./FColorVertexBuffer";
import { FRawStaticIndexBuffer } from "./FRawStaticIndexBuffer";
import { FStaticMeshVertexBuffer } from "./FStaticMeshVertexBuffer";
import { FArchive } from "../../../reader/FArchive";
import { FStripDataFlags } from "../../../objects/engine/FStripDataFlags";
import { FWeightedRandomSampler } from "../../../objects/engine/FWeightedRandomSampler";
import { Game } from "../../../versions/Game";
import {
    VER_UE4_FTEXT_HISTORY,
    VER_UE4_RENAME_CROUCHMOVESCHARACTERDOWN,
    VER_UE4_SOUND_CONCURRENCY_PACKAGE
} from "../../../versions/Versions";
import { FByteBulkData } from "../FByteBulkData";
import { FByteArchive } from "../../../reader/FByteArchive";
import { FDistanceFieldVolumeData } from "../../../objects/engine/FDistanceFieldVolumeData";

export class FStaticMeshLODResources {
    private static readonly CDSF_AdjancencyData = 1
    // UE4.20+
    private static readonly CDSF_MinLodData = 2
    private static readonly CDSF_ReversedIndexBuffer = 4
    private static readonly CDSF_RaytracingResources = 8

    public sections: FStaticMeshSection[] = null
    public vertexBuffer: FStaticMeshVertexBuffer = null
    public positionVertexBuffer: FPositionVertexBuffer = null
    public colorVertexBuffer: FColorVertexBuffer = null
    public indexBuffer: FRawStaticIndexBuffer = null
    public reversedIndexBuffer = new FRawStaticIndexBuffer()
    public depthOnlyIndexBuffer: FRawStaticIndexBuffer = null
    public reversedDepthOnlyIndexBuffer = new FRawStaticIndexBuffer()
    public wireframeIndexBuffer = new FRawStaticIndexBuffer()
    public adjacencyIndexBuffer = new FRawStaticIndexBuffer()
    public maxDeviation: number = null
    public isLODCookedOut = false
    public inlined = false

    public get skipLod(): boolean {
        return this.vertexBuffer == null
            || this.indexBuffer == null
            || this.positionVertexBuffer == null
            || this.colorVertexBuffer == null
    }

    public constructor(Ar: FAssetArchive) {
        const stripFlags = new FStripDataFlags(Ar)

        const sectionsNum = Ar.readInt32()
        this.sections = new Array(sectionsNum)
        for (let i = 0; i < sectionsNum; ++i)
            this.sections[i] = new FStaticMeshSection(Ar)

        this.maxDeviation = Ar.readFloat32()

        if (!Ar.versions.get("StaticMesh.UseNewCookedFormat")) {
            if (!stripFlags.isDataStrippedForServer && !stripFlags.isClassDataStripped(FStaticMeshLODResources.CDSF_MinLodData))
                this.serializeBuffersLegacy(Ar, stripFlags)
            return
        }

        // UE4.23+
        this.isLODCookedOut = Ar.readBoolean()
        this.inlined = Ar.readBoolean()

        if (!stripFlags.isDataStrippedForServer && !this.isLODCookedOut) {
            if (this.inlined) {
                this.serializeBuffers(Ar)
            } else {
                const bulk = new FByteBulkData(Ar)
                if (bulk.header.elementCount > 0) {
                    const tempAr = new FByteArchive(bulk.data, Ar.versions)
                    tempAr.littleEndian = Ar.littleEndian
                    this.serializeBuffers(tempAr)
                }

                // FStaticMeshLODResources::SerializeAvailabilityInfo()
                Ar.readUInt32() // DepthOnlyNumTriangles
                Ar.readUInt32() // PackedData

                // ... SerializeMetaData() for all buffers
                Ar.pos += 4 * 4 + 2 * 4 + 2 * 4 + 5 * (2 * 4)
                // StaticMeshVertexBuffer = 2x int32, 2x bool
                // PositionVertexBuffer = 2x int32
                // ColorVertexBuffer = 2x int32
                // IndexBuffer = int32 + bool
                // ReversedIndexBuffer
                // DepthOnlyIndexBuffer
                // ReversedDepthOnlyIndexBuffer
                // WireframeIndexBuffer

                /* TODO if (FUE5ReleaseStreamObjectVersion.get(Ar) < FUE5ReleaseStreamObjectVersion.RemovingTessellation) {
                    Ar.pos += 2*4 // AdjacencyIndexBuffer */
            }
        }
        // FStaticMeshBuffersSize
        Ar.readUInt32() // SerializedBuffersSize
        Ar.readUInt32() // DepthOnlyIBSize
        Ar.readUInt32() // ReversedIBsSize
    }

    private serializeBuffersLegacy(Ar: FArchive, stripFlags: FStripDataFlags) {
        this.positionVertexBuffer = new FPositionVertexBuffer(Ar)
        this.vertexBuffer = new FStaticMeshVertexBuffer(Ar)
        this.colorVertexBuffer = new FColorVertexBuffer(Ar)
        this.indexBuffer = new FRawStaticIndexBuffer(Ar)

        if (Ar.ver >= VER_UE4_SOUND_CONCURRENCY_PACKAGE && !stripFlags.isClassDataStripped(FStaticMeshLODResources.CDSF_ReversedIndexBuffer)) {
            this.reversedIndexBuffer = new FRawStaticIndexBuffer(Ar)
            this.depthOnlyIndexBuffer = new FRawStaticIndexBuffer(Ar)
            this.reversedDepthOnlyIndexBuffer = new FRawStaticIndexBuffer(Ar)
        } else {
            // UE4.8 or older, or when has CDSF_ReversedIndexBuffer
            this.depthOnlyIndexBuffer = new FRawStaticIndexBuffer(Ar)
        }

        if (Ar.ver >= VER_UE4_FTEXT_HISTORY && Ar.ver <= VER_UE4_RENAME_CROUCHMOVESCHARACTERDOWN) {
            new FDistanceFieldVolumeData(Ar) // distanceFieldData
        }

        if (!stripFlags.isEditorDataStripped)
            this.wireframeIndexBuffer = new FRawStaticIndexBuffer(Ar)

        if (!stripFlags.isClassDataStripped(FStaticMeshLODResources.CDSF_AdjancencyData))
            this.adjacencyIndexBuffer = new FRawStaticIndexBuffer(Ar)

        if (Ar.game >= Game.GAME_UE4(16)) {
            // AreaWeightedSectionSamplers
            for (let i = 0; i < this.sections.length; ++i)
                new FWeightedRandomSampler(Ar) // typealias FStaticMeshSectionAreaWeightedTriangleSampler = FWeightedRandomSampler
            new FWeightedRandomSampler(Ar) // AreaWeightedSampler
        }
    }

    private serializeBuffers(Ar: FArchive) {
        const stripFlags = new FStripDataFlags(Ar)
        this.positionVertexBuffer = new FPositionVertexBuffer(Ar)
        this.vertexBuffer = new FStaticMeshVertexBuffer(Ar)
        this.colorVertexBuffer = new FColorVertexBuffer(Ar)
        this.indexBuffer = new FRawStaticIndexBuffer(Ar)

        if (!stripFlags.isClassDataStripped(FStaticMeshLODResources.CDSF_ReversedIndexBuffer))
            this.reversedIndexBuffer = new FRawStaticIndexBuffer(Ar)

        this.depthOnlyIndexBuffer = new FRawStaticIndexBuffer(Ar)
        if (!stripFlags.isClassDataStripped(FStaticMeshLODResources.CDSF_ReversedIndexBuffer))
            this.reversedDepthOnlyIndexBuffer = new FRawStaticIndexBuffer(Ar)

        if (!stripFlags.isEditorDataStripped)
            this.wireframeIndexBuffer = new FRawStaticIndexBuffer(Ar)

        if (/*TODO FUE5ReleaseStreamObjectVersion.get(Ar) < FUE5ReleaseStreamObjectVersion.RemovingTessellation && */
            !stripFlags.isClassDataStripped(FStaticMeshLODResources.CDSF_AdjancencyData))
            this.adjacencyIndexBuffer = new FRawStaticIndexBuffer(Ar)

        // UE4.25+
        if (Ar.versions.get("StaticMesh.HasRayTracingGeometry") && !stripFlags.isClassDataStripped(FStaticMeshLODResources.CDSF_RaytracingResources))
            Ar.readBulkByteArray() // Raw data

        // AreaWeightedSectionSamplers
        for (let i = 0; i < this.sections.length; ++i)
            new FWeightedRandomSampler(Ar) // typealias FStaticMeshSectionAreaWeightedTriangleSampler = FWeightedRandomSampler
        new FWeightedRandomSampler(Ar) // AreaWeightedSampler
    }
}