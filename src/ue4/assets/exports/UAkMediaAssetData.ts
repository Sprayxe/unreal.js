import { UObject } from "./UObject";
import { FByteBulkData } from "../objects/FByteBulkData";
import { FAssetArchive } from "../reader/FAssetArchive";
import { Locres } from "../../locres/Locres";

/**
 * FAkMediaDataChunk
 */
export class FAkMediaDataChunk {
    /**
     * Bulk data
     * @type {FByteBulkData}
     * @public
     */
    public readonly bulkData: FByteBulkData

    /**
     * Whether is prefetch
     * @type {boolean}
     * @public
     */
    public readonly isPrefetch: boolean

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive) {
        this.isPrefetch = Ar.readBoolean()
        this.bulkData = new FByteBulkData(Ar)
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
        }
    }
}

/**
 * UAkMediaAssetData
 * @extends {UObject}
 */
export class UAkMediaAssetData extends UObject {
    /**
     * Whether is streamed
     * @type {boolean}
     * @public
     */
    public isStreamed = false

    /**
     * Whether use device memory
     * @type {boolean}
     * @public
     */
    public useDeviceMemory = false

    /**
     * Data chunks
     * @type {Array<FAkMediaDataChunk>}
     * @public
     */
    public dataChunks: FAkMediaDataChunk[] = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos Valid position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos);
        // UObject Properties
        this.isStreamed = this.getOrDefault("IsStreamed", false)
        this.useDeviceMemory = this.getOrDefault("UseDeviceMemory", false)
        const chunkLen = Ar.readInt32()
        this.dataChunks = new Array(chunkLen)
        for (let i = 0; i < chunkLen; ++i) {
            this.dataChunks[i] = new FAkMediaDataChunk(Ar)
        }
    }

    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any}
     * @public
     */
    toJson(locres: Locres = null): any {
        return {
            isStreamed: this.isStreamed,
            useDeviceMemory: this.useDeviceMemory,
            dataChunks: this.dataChunks.map(chunk => chunk.toJson())
        }
    }
}