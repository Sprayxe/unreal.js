import { FPackedNormal, FPackedRGBA16N } from "../../../objects/rendercore/FPackedNormal";
import { FMeshUVFloat } from "./FMeshUVFloat";
import { FArchive } from "../../../reader/FArchive";
import { FMeshUVHalf } from "./FMeshUVHalf";

export class FStaticMeshUVItem {
    public normal: FPackedNormal[]
    public uv: FMeshUVFloat[]

    public constructor(Ar: FArchive = null, useHighPrecisionTangents: boolean = null,
                       numStaticUVSets: number = null, useStaticFloatUVs: boolean = null) {
        if (Ar != null) {
            // Serialize Tangents
            this.normal = FStaticMeshUVItem.serializeTangents(Ar, useHighPrecisionTangents)
            // Serialize Texcoords
            this.uv = FStaticMeshUVItem.serializeTexcoords(Ar, numStaticUVSets, useStaticFloatUVs)
        }
    }

    public static from(normal: FPackedNormal[], uv: FMeshUVFloat[]): FStaticMeshUVItem {
        const item = new FStaticMeshUVItem()
        item.normal = normal
        item.uv = uv
        return item
    }

    public static serializeTangents(Ar: FArchive, useHighPrecisionTangents: boolean): FPackedNormal[] {
        if (!useHighPrecisionTangents) {
            return [new FPackedNormal(Ar), FPackedNormal.fromNumber(0), new FPackedNormal(Ar)] // TangentX and TangentZ
        } else {
            const normal = new FPackedRGBA16N(Ar)
            const tangent = new FPackedRGBA16N(Ar)
            return [normal.toPackedNormal(), FPackedNormal.fromNumber(0), tangent.toPackedNormal()]
        }
    }

    public static serializeTexcoords(Ar: FArchive, numStaticUVSets: number, useStaticFloatUVs: Boolean): FMeshUVFloat[] {
        const array = new Array(numStaticUVSets)
        if (useStaticFloatUVs) {
            for (let i = 0; i < numStaticUVSets; ++i)
                array[i] = new FMeshUVFloat(Ar)
        } else {
            for (let i = 0; i < numStaticUVSets; ++i)
                array[i] = new FMeshUVHalf(Ar).toMeshUVFloat()
        }
        return array
    }


}