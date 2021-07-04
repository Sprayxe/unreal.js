"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UAkMediaAssetData = exports.FAkMediaDataChunk = void 0;
const UObject_1 = require("./UObject");
const FByteBulkData_1 = require("../objects/FByteBulkData");
/**
 * FAkMediaDataChunk
 */
class FAkMediaDataChunk {
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.isPrefetch = Ar.readBoolean();
        this.bulkData = new FByteBulkData_1.FByteBulkData(Ar);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            isPrefetch: this.isPrefetch,
            bulkData: this.bulkData.header.toJson()
        };
    }
}
exports.FAkMediaDataChunk = FAkMediaDataChunk;
/**
 * UAkMediaAssetData
 * @extends {UObject}
 */
class UAkMediaAssetData extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * Whether is streamed
         * @type {boolean}
         * @public
         */
        this.isStreamed = false;
        /**
         * Whether use device memory
         * @type {boolean}
         * @public
         */
        this.useDeviceMemory = false;
        /**
         * Data chunks
         * @type {Array<FAkMediaDataChunk>}
         * @public
         */
        this.dataChunks = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos Valid position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar, validPos) {
        super.deserialize(Ar, validPos);
        // UObject Properties
        this.isStreamed = this.getOrDefault("IsStreamed", false);
        this.useDeviceMemory = this.getOrDefault("UseDeviceMemory", false);
        this.dataChunks = Ar.readArray(() => new FAkMediaDataChunk(Ar));
    }
    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any}
     * @public
     */
    toJson(locres = null) {
        return {
            isStreamed: this.isStreamed,
            useDeviceMemory: this.useDeviceMemory,
            dataChunks: this.dataChunks.map(chunk => chunk.toJson())
        };
    }
}
exports.UAkMediaAssetData = UAkMediaAssetData;
