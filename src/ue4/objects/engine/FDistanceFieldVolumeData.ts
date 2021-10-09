import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FVector2D } from "../core/math/FVector2D";
import { FBox } from "../core/math/FBox";
import { FIntVector } from "../core/math/FIntVector";
import { FArchive } from "../../reader/FArchive";
import { Game } from "../../versions/Game";
import { VER_UE4_DEPRECATE_UMG_STYLE_ASSETS, VER_UE4_RENAME_CROUCHMOVESCHARACTERDOWN } from "../../versions/Versions";

export class FDistanceFieldVolumeData {
    public distanceFieldVolume: number[] // TArray<Float16>
    public size: FIntVector
    public localBoundingBox: FBox
    public meshWasClosed: Boolean
    public builtAsIfTwoSided: Boolean
    public meshWasPlane: Boolean
    // 4.16+
    public compressedDistanceFieldVolume: Buffer
    public distanceMinMax: FVector2D

    public constructor(Ar: FArchive = null) {
        if (Ar != null) {
            if (Ar.game >= Game.GAME_UE4(16)) {
                this.compressedDistanceFieldVolume = Ar.read(Ar.readInt32())
                this.size = new FIntVector(Ar)
                this.localBoundingBox = new FBox(Ar)
                this.distanceMinMax = new FVector2D(Ar)
                this.meshWasClosed = Ar.readBoolean()
                this.builtAsIfTwoSided = Ar.readBoolean()
                this.meshWasPlane = Ar.readBoolean()
                this.distanceFieldVolume = []
            } else {
                const distanceFieldVolumeNum = Ar.readInt32()
                this.distanceFieldVolume = new Array(distanceFieldVolumeNum)
                for (let i = 0; i < distanceFieldVolumeNum; ++i)
                    this.distanceFieldVolume[i] = Ar.readInt16()
                this.size = new FIntVector(Ar)
                this.localBoundingBox = new FBox(Ar)
                this.meshWasClosed = Ar.readBoolean()
                this.builtAsIfTwoSided = Ar.ver >= VER_UE4_RENAME_CROUCHMOVESCHARACTERDOWN ? Ar.readBoolean() : false
                this.meshWasPlane = Ar.ver >= VER_UE4_DEPRECATE_UMG_STYLE_ASSETS ? Ar.readBoolean() : false
                this.compressedDistanceFieldVolume = Buffer.alloc(0)
                this.distanceMinMax = new FVector2D(0, 0)
            }
        }
    }

    public serialize(Ar: FArchiveWriter) {
    }

    public static from(
        distanceFieldVolume: number[],
        size: FIntVector,
        localBoundingBox: FBox,
        meshWasClosed: Boolean,
        builtAsIfTwoSided: Boolean,
        meshWasPlane: Boolean,
        compressedDistanceFieldVolume: Buffer,
        distanceMinMax: FVector2D
    ): FDistanceFieldVolumeData {
        const volume = new FDistanceFieldVolumeData()
        volume.distanceFieldVolume = distanceFieldVolume
        volume.size = size
        volume.localBoundingBox = localBoundingBox
        volume.meshWasClosed = meshWasClosed
        volume.builtAsIfTwoSided = builtAsIfTwoSided
        volume.meshWasPlane = meshWasPlane
        volume.compressedDistanceFieldVolume = compressedDistanceFieldVolume
        volume.distanceMinMax = distanceMinMax
        return volume
    }
}