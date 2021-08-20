import { UObject } from "./UObject";
import { ULevel } from "./ULevel";
import { FAssetArchive } from "../reader/FAssetArchive";
import { Lazy } from "../../../util/Lazy";

/**
 * UWorld
 * @extends {UObject}
 */
export class UWorld extends UObject {
    /**
     * persistentLevel
     * @type {ULevel}
     * @public
     */
    public persistentLevel: Lazy<ULevel> = null

    /**
     * extraReferencedObjects
     * @type {UObject}
     * @public
     */
    public extraReferencedObjects: Lazy<UObject> = null

    /**
     * streamingLevels
     * @type {UObject}
     * @public
     */
    public streamingLevels: Lazy<UObject> = null

    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos);
        this.persistentLevel = Ar.readObject()
        this.extraReferencedObjects = Ar.readObject()
        this.streamingLevels = Ar.readObject()
    }
}