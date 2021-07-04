"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ULevel = exports.FPrecomputedVolumeDistanceField = exports.FPrecomputedVisibilityHandler = exports.FPrecomputedVisibilityBucket = exports.FCompressedVisibilityChunk = exports.FPrecomputedVisibilityCell = void 0;
const FVector_1 = require("../../objects/core/math/FVector");
const FColor_1 = require("../../objects/core/math/FColor");
const ULevel_Properties_1 = require("./ULevel_Properties");
const FUrl_1 = require("../../objects/engine/FUrl");
const FVector2D_1 = require("../../objects/core/math/FVector2D");
const FBox_1 = require("../../objects/core/math/FBox");
/**
 * FPrecomputedVisibilityCell
 */
class FPrecomputedVisibilityCell {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * Min
         * @type {FVector}
         * @public
         */
        this.min = null;
        /**
         * Chunk index
         * @type {number}
         * @public
         */
        this.chunkIndex = null;
        /**
         * Data offset
         * @type {number}
         * @public
         */
        this.dataOffset = null;
        this.min = new FVector_1.FVector(Ar);
        this.chunkIndex = Ar.readUInt16();
        this.dataOffset = Ar.readUInt16();
    }
}
exports.FPrecomputedVisibilityCell = FPrecomputedVisibilityCell;
/**
 * FCompressedVisibilityChunk
 */
class FCompressedVisibilityChunk {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.bCompressed = Ar.readBoolean();
        this.uncompressedSize = Ar.readInt32();
        this.data = Ar.readBuffer(Ar.readInt32());
    }
}
exports.FCompressedVisibilityChunk = FCompressedVisibilityChunk;
/**
 * FPrecomputedVisibilityBucket
 */
class FPrecomputedVisibilityBucket {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.cellDataSize = Ar.readInt32();
        this.cells = Ar.readArray(() => new FPrecomputedVisibilityCell(Ar));
        this.cellDataChunks = Ar.readArray(() => new FCompressedVisibilityChunk(Ar));
    }
}
exports.FPrecomputedVisibilityBucket = FPrecomputedVisibilityBucket;
/**
 * FPrecomputedVisibilityHandler
 */
class FPrecomputedVisibilityHandler {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.precomputedVisibilityCellBucketOriginXY = new FVector2D_1.FVector2D(Ar);
        this.precomputedVisibilityCellSizeXY = Ar.readFloat32();
        this.precomputedVisibilityCellSizeZ = Ar.readFloat32();
        this.precomputedVisibilityCellBucketSizeXY = Ar.readInt32();
        this.precomputedVisibilityNumCellBuckets = Ar.readInt32();
        this.precomputedVisibilityCellBuckets = Ar.readArray(() => new FPrecomputedVisibilityBucket(Ar));
    }
}
exports.FPrecomputedVisibilityHandler = FPrecomputedVisibilityHandler;
/**
 * FPrecomputedVolumeDistanceField
 */
class FPrecomputedVolumeDistanceField {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.volumeMaxDistance = Ar.readFloat32();
        this.volumeBox = new FBox_1.FBox(Ar);
        this.volumeSizeX = Ar.readInt32();
        this.volumeSizeY = Ar.readInt32();
        this.volumeSizeZ = Ar.readInt32();
        this.data = Ar.readArray(() => new FColor_1.FColor(Ar));
    }
}
exports.FPrecomputedVolumeDistanceField = FPrecomputedVolumeDistanceField;
/**
 * ULevel
 * @extends {ULevel_Properties}
 */
class ULevel extends ULevel_Properties_1.ULevel_Properties {
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar, validPos) {
        super.deserialize(Ar, validPos);
        this.actors = Ar.readArray(() => Ar.readObject());
        this.url = new FUrl_1.FUrl(Ar);
        this.model = Ar.readObject();
        this.modelComponents = Ar.readArray(() => Ar.readObject());
        this.levelScriptActor = Ar.readObject();
        this.navListStart = Ar.readObject();
        this.navListEnd = Ar.readObject();
        this.precomputedVisibilityHandler = new FPrecomputedVisibilityHandler(Ar);
        this.precomputedVolumeDistanceField = new FPrecomputedVolumeDistanceField(Ar);
    }
}
exports.ULevel = ULevel;
