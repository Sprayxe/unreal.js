import { UObject } from "./UObject";
import { FByteBulkData } from "../objects/FByteBulkData";
import { FAssetArchive } from "../reader/FAssetArchive";
import { Locres } from "../../locres/Locres";
/**
 * FAkMediaDataChunk
 */
export declare class FAkMediaDataChunk {
    /**
     * Bulk data
     * @type {FByteBulkData}
     * @public
     */
    readonly bulkData: FByteBulkData;
    /**
     * Whether is prefetch
     * @type {boolean}
     * @public
     */
    readonly isPrefetch: boolean;
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): {
        isPrefetch: boolean;
        bulkData: {
            bulkDataFlag: string;
            elementCount: number;
            sizeOnDisk: number;
            offsetInFile: number;
        };
    };
}
/**
 * UAkMediaAssetData
 * @extends {UObject}
 */
export declare class UAkMediaAssetData extends UObject {
    /**
     * Whether is streamed
     * @type {boolean}
     * @public
     */
    isStreamed: boolean;
    /**
     * Whether use device memory
     * @type {boolean}
     * @public
     */
    useDeviceMemory: boolean;
    /**
     * Data chunks
     * @type {Array<FAkMediaDataChunk>}
     * @public
     */
    dataChunks: FAkMediaDataChunk[];
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos Valid position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {any}
     * @public
     */
    toJson(locres?: Locres): any;
}
