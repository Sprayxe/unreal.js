/// <reference types="node" />
/// <reference types="ref-napi" />
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
export declare class FPrecomputedVisibilityCell {
    /**
     * Min
     * @type {FVector}
     * @public
     */
    min: FVector;
    /**
     * Chunk index
     * @type {number}
     * @public
     */
    chunkIndex: number;
    /**
     * Data offset
     * @type {number}
     * @public
     */
    dataOffset: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FCompressedVisibilityChunk
 */
export declare class FCompressedVisibilityChunk {
    /**
     * bCompressed
     * @type {boolean}
     * @public
     */
    bCompressed: boolean;
    /**
     * uncompressedSize
     * @type {number}
     * @public
     */
    uncompressedSize: number;
    /**
     * Data
     * @type {Buffer}
     * @public
     */
    data: Buffer;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FPrecomputedVisibilityBucket
 */
export declare class FPrecomputedVisibilityBucket {
    /**
     * Cell data size
     * @type {number}
     * @public
     */
    cellDataSize: number;
    /**
     * Cells
     * @type {Array<FPrecomputedVisibilityCell>}
     * @public
     */
    cells: FPrecomputedVisibilityCell[];
    /**
     * Cell data chunks
     * @type {Array<FCompressedVisibilityChunk>}
     * @public
     */
    cellDataChunks: FCompressedVisibilityChunk[];
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FPrecomputedVisibilityHandler
 */
export declare class FPrecomputedVisibilityHandler {
    /**
     * precomputedVisibilityCellBucketOriginXY
     * @type {FVector2D}
     * @public
     */
    precomputedVisibilityCellBucketOriginXY: FVector2D;
    /**
     * precomputedVisibilityCellSizeXY
     * @type {number}
     * @public
     */
    precomputedVisibilityCellSizeXY: number;
    /**
     * precomputedVisibilityCellSizeZ
     * @type {number}
     * @public
     */
    precomputedVisibilityCellSizeZ: number;
    /**
     * precomputedVisibilityCellBucketSizeXY
     * @type {number}
     * @public
     */
    precomputedVisibilityCellBucketSizeXY: number;
    /**
     * precomputedVisibilityNumCellBuckets
     * @type {number}
     * @public
     */
    precomputedVisibilityNumCellBuckets: number;
    /**
     * precomputedVisibilityCellBuckets
     * @type {Array<FPrecomputedVisibilityBucket>}
     * @public
     */
    precomputedVisibilityCellBuckets: FPrecomputedVisibilityBucket[];
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * FPrecomputedVolumeDistanceField
 */
export declare class FPrecomputedVolumeDistanceField {
    /**
     * volumeMaxDistance
     * @type {number}
     * @public
     */
    volumeMaxDistance: number;
    /**
     * volumeBox
     * @type {FBox}
     * @public
     */
    volumeBox: FBox;
    /**
     * volumeSizeX
     * @type {number}
     * @public
     */
    volumeSizeX: number;
    /**
     * volumeSizeY
     * @type {number}
     * @public
     */
    volumeSizeY: number;
    /**
     * volumeSizeZ
     * @type {number}
     * @public
     */
    volumeSizeZ: number;
    /**
     * data
     * @type {Array<FColor>}
     * @public
     */
    data: FColor[];
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * ULevel
 * @extends {ULevel_Properties}
 */
export declare class ULevel extends ULevel_Properties {
    /**
     * url
     * @type {FUrl}
     */
    url: FUrl;
    /**
     * actors
     * @type {Array<UObject>}
     */
    actors: UObject[];
    /**
     * model
     * @type {UObject}
     */
    model: UObject;
    /**
     * modelComponents
     * @type {Array<UObject>}
     */
    modelComponents: UObject[];
    /**
     * levelScriptActor
     * @type {UObject}
     */
    levelScriptActor: UObject;
    /**
     * navListStart
     * @type {UObject}
     */
    navListStart: UObject;
    /**
     * navListEnd
     * @type {UObject}
     */
    navListEnd: UObject;
    /**
     * precomputedVisibilityHandler
     * @type {FPrecomputedVisibilityHandler}
     */
    precomputedVisibilityHandler: FPrecomputedVisibilityHandler;
    /**
     * precomputedVolumeDistanceField
     * @type {FPrecomputedVolumeDistanceField}
     */
    precomputedVolumeDistanceField: FPrecomputedVolumeDistanceField;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
}
