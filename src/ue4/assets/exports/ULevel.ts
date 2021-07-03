import { FVector } from "../../objects/core/math/FVector";
import { FArchive } from "../../reader/FArchive";
import { FColor } from "../../objects/core/math/FColor";
import { ULevel_Properties } from "./ULevel_Properties";
import { FUrl } from "../../objects/engine/FUrl";
import { UObject } from "./UObject";
import { FVector2D } from "../../objects/core/math/FVector2D";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FBox } from "../../objects/core/math/FBox";

/**
 * FPrecomputedVisibilityCell
 */
export class FPrecomputedVisibilityCell {
    /**
     * Min
     * @type {FVector}
     * @public
     */
    public min: FVector = null

    /**
     * Chunk index
     * @type {number}
     * @public
     */
    public chunkIndex: number = null

    /**
     * Data offset
     * @type {number}
     * @public
     */
    public dataOffset: number = null

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.min = new FVector(Ar)
        this.chunkIndex = Ar.readUInt16()
        this.dataOffset = Ar.readUInt16()
    }
}

/**
 * FCompressedVisibilityChunk
 */
export class FCompressedVisibilityChunk {
    /**
     * bCompressed
     * @type {boolean}
     * @public
     */
    public bCompressed: boolean

    /**
     * uncompressedSize
     * @type {number}
     * @public
     */
    public uncompressedSize: number

    /**
     * Data
     * @type {Buffer}
     * @public
     */
    public data: Buffer

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.bCompressed = Ar.readBoolean()
        this.uncompressedSize = Ar.readInt32()
        this.data = Ar.readBuffer(Ar.readInt32())
    }
}

/**
 * FPrecomputedVisibilityBucket
 */
export class FPrecomputedVisibilityBucket {
    /**
     * Cell data size
     * @type {number}
     * @public
     */
    public cellDataSize: number

    /**
     * Cells
     * @type {Array<FPrecomputedVisibilityCell>}
     * @public
     */
    public cells: FPrecomputedVisibilityCell[]

    /**
     * Cell data chunks
     * @type {Array<FCompressedVisibilityChunk>}
     * @public
     */
    public cellDataChunks: FCompressedVisibilityChunk[]

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.cellDataSize = Ar.readInt32()
        this.cells = Ar.readArray(() => new FPrecomputedVisibilityCell(Ar))
        this.cellDataChunks = Ar.readArray(() => new FCompressedVisibilityChunk(Ar))
    }
}

/**
 * FPrecomputedVisibilityHandler
 */
export class FPrecomputedVisibilityHandler {
    /**
     * precomputedVisibilityCellBucketOriginXY
     * @type {FVector2D}
     * @public
     */
    precomputedVisibilityCellBucketOriginXY: FVector2D

    /**
     * precomputedVisibilityCellSizeXY
     * @type {number}
     * @public
     */
    precomputedVisibilityCellSizeXY: number

    /**
     * precomputedVisibilityCellSizeZ
     * @type {number}
     * @public
     */
    precomputedVisibilityCellSizeZ: number

    /**
     * precomputedVisibilityCellBucketSizeXY
     * @type {number}
     * @public
     */
    precomputedVisibilityCellBucketSizeXY: number

    /**
     * precomputedVisibilityNumCellBuckets
     * @type {number}
     * @public
     */
    precomputedVisibilityNumCellBuckets: number

    /**
     * precomputedVisibilityCellBuckets
     * @type {Array<FPrecomputedVisibilityBucket>}
     * @public
     */
    precomputedVisibilityCellBuckets: FPrecomputedVisibilityBucket[]

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.precomputedVisibilityCellBucketOriginXY = new FVector2D(Ar)
        this.precomputedVisibilityCellSizeXY = Ar.readFloat32()
        this.precomputedVisibilityCellSizeZ = Ar.readFloat32()
        this.precomputedVisibilityCellBucketSizeXY = Ar.readInt32()
        this.precomputedVisibilityNumCellBuckets = Ar.readInt32()
        this.precomputedVisibilityCellBuckets = Ar.readArray(() => new FPrecomputedVisibilityBucket(Ar))
    }
}

/**
 * FPrecomputedVolumeDistanceField
 */
export class FPrecomputedVolumeDistanceField {
    /**
     * volumeMaxDistance
     * @type {number}
     * @public
     */
    public volumeMaxDistance: number

    /**
     * volumeBox
     * @type {FBox}
     * @public
     */
    public volumeBox: FBox

    /**
     * volumeSizeX
     * @type {number}
     * @public
     */
    public volumeSizeX: number

    /**
     * volumeSizeY
     * @type {number}
     * @public
     */
    public volumeSizeY: number

    /**
     * volumeSizeZ
     * @type {number}
     * @public
     */
    public volumeSizeZ: number

    /**
     * data
     * @type {Array<FColor>}
     * @public
     */
    data: FColor[]

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.volumeMaxDistance = Ar.readFloat32()
        this.volumeBox = new FBox(Ar)
        this.volumeSizeX = Ar.readInt32()
        this.volumeSizeY = Ar.readInt32()
        this.volumeSizeZ = Ar.readInt32()
        this.data = Ar.readArray(() => new FColor(Ar))
    }
}

/**
 * ULevel
 * @extends {ULevel_Properties}
 */
export class ULevel extends ULevel_Properties {
    /**
     * url
     * @type {FUrl}
     */
    public url: FUrl

    /**
     * actors
     * @type {Array<UObject>}
     */
    public actors: UObject[]

    /**
     * model
     * @type {UObject}
     */
    public model: UObject

    /**
     * modelComponents
     * @type {Array<UObject>}
     */
    public modelComponents: UObject[]

    /**
     * levelScriptActor
     * @type {UObject}
     */
    public levelScriptActor: UObject

    /**
     * navListStart
     * @type {UObject}
     */
    public navListStart: UObject

    /**
     * navListEnd
     * @type {UObject}
     */
    public navListEnd: UObject

    /**
     * precomputedVisibilityHandler
     * @type {FPrecomputedVisibilityHandler}
     */
    public precomputedVisibilityHandler: FPrecomputedVisibilityHandler

    /**
     * precomputedVolumeDistanceField
     * @type {FPrecomputedVolumeDistanceField}
     */
    public precomputedVolumeDistanceField: FPrecomputedVolumeDistanceField

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
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

