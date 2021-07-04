import { UStruct } from "./UStruct";
import { FAssetArchive } from "../reader/FAssetArchive";
/**
 * UFunction
 * @extends {UStruct}
 */
export declare class UFunction extends UStruct {
    /**
     * Function flags
     * @type {number}
     * @public
     */
    functionFlags: number;
    /**
     * Event graph function
     * @type {UFunction}
     * @public
     */
    eventGraphFunction: UFunction;
    /**
     * Event graph call offset
     * @type {number}
     * @public
     */
    eventGraphCallOffset: number;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
}
