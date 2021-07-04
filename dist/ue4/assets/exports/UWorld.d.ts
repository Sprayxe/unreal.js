import { UObject } from "./UObject";
import { ULevel } from "./ULevel";
import { FAssetArchive } from "../reader/FAssetArchive";
/**
 * UWorld
 * @extends {UObject}
 */
export declare class UWorld extends UObject {
    /**
     * persistentLevel
     * @type {ULevel}
     * @public
     */
    persistentLevel: ULevel;
    /**
     * extraReferencedObjects
     * @type {UObject}
     * @public
     */
    extraReferencedObjects: UObject;
    /**
     * streamingLevels
     * @type {UObject}
     * @public
     */
    streamingLevels: UObject;
    deserialize(Ar: FAssetArchive, validPos: number): void;
}
