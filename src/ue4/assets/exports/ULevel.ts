import { FVector } from "../../objects/core/math/FVector";
import { FArchive } from "../../reader/FArchive";
import { FColor } from "../../objects/core/math/FColor";
import { ULevel_Properties } from "./ULevel_Properties";
import { FUrl } from "../../objects/engine/FUrl";
import { UObject } from "./UObject";
import { FVector2D } from "../../objects/core/math/FVector2D";
import { FAssetArchive } from "../reader/FAssetArchive";

export class FPrecomputedVisibilityCell {
    public min: FVector = null
    public chunkIndex: number = null
    public dataOffset: number = null

    constructor(Ar: FArchive) {
        this.min = new FVector(Ar)
        this.chunkIndex = Ar.readUInt16()
        this.dataOffset = Ar.readUInt16()
    }
}

export class FCompressedVisibilityChunk {
    public bCompressed: boolean
    public uncompressedSize: number
    public data: Buffer

    constructor(Ar: FArchive) {
        this.bCompressed = Ar.readBoolean()
        this.uncompressedSize = Ar.readInt32()
        this.data = Ar.readBuffer(Ar.readInt32())
    }
}

export class FPrecomputedVisibilityBucket {
    public cellDataSize: number
    public cells: FPrecomputedVisibilityCell[]
    public cellDataChunks: FCompressedVisibilityChunk[]

    constructor(Ar: FArchive) {
        this.cellDataSize = Ar.readInt32()
        this.cells = Ar.readArray(() => new FPrecomputedVisibilityCell(Ar))
        this.cellDataChunks = Ar.readArray(() => new FCompressedVisibilityChunk(Ar))
    }
}

export class FPrecomputedVisibilityHandler {
    precomputedVisibilityCellBucketOriginXY: FVector2D
    precomputedVisibilityCellSizeXY: number
    precomputedVisibilityCellSizeZ: number
    precomputedVisibilityCellBucketSizeXY: number
    precomputedVisibilityNumCellBuckets: number
    precomputedVisibilityCellBuckets: FPrecomputedVisibilityBucket[]

    constructor(Ar: FArchive) {
        this.precomputedVisibilityCellBucketOriginXY = new FVector2D(Ar)
        this.precomputedVisibilityCellSizeXY = Ar.readFloat32()
        this.precomputedVisibilityCellSizeZ = Ar.readFloat32()
        this.precomputedVisibilityCellBucketSizeXY = Ar.readInt32()
        this.precomputedVisibilityNumCellBuckets = Ar.readInt32()
        this.precomputedVisibilityCellBuckets = Ar.readArray(() => new FPrecomputedVisibilityBucket(Ar))
    }
}

export class FPrecomputedVolumeDistanceField {
    public volumeMaxDistance: number
    public volumeBox: any // TODO FBox
    public volumeSizeX: number
    public volumeSizeY: number
    public volumeSizeZ: number
    data: FColor[]

    constructor(Ar: FArchive) {
        this.volumeMaxDistance = Ar.readFloat32()
        // TODO this.volumeBox = new FBox(Ar)
        this.volumeSizeX = Ar.readInt32()
        this.volumeSizeY = Ar.readInt32()
        this.volumeSizeZ = Ar.readInt32()
        this.data = Ar.readArray(() => new FColor(Ar))
    }
}

export class ULevel extends ULevel_Properties {
    public url: FUrl
    public actors: UObject[]
    public model: UObject
    public modelComponents: UObject[]
    public levelScriptActor: UObject
    public navListStart: UObject
    public navListEnd: UObject
    public precomputedVisibilityHandler: FPrecomputedVisibilityHandler
    public precomputedVolumeDistanceField: FPrecomputedVolumeDistanceField

    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)
        this.actors = Ar.readArray(() => Ar.readObject())
        this.url = new FUrl(Ar)
        this.model = Ar.readObject()
        this.modelComponents = Ar.readArray(() => Ar.readObject())
        this.levelScriptActor = Ar.readObject()
        this.navListStart = Ar.readObject()
        this.navListEnd = Ar.readObject()
        this.precomputedVisibilityHandler = new FPrecomputedVisibilityHandler(Ar)
        this.precomputedVolumeDistanceField = new FPrecomputedVolumeDistanceField(Ar)
    }
}

