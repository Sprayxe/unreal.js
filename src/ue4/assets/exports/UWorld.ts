import { UObject } from "./UObject";
import { ULevel } from "./ULevel";
import { FAssetArchive } from "../reader/FAssetArchive";

export class UWorld extends UObject {
    public persistentLevel: ULevel
    public extraReferencedObjects: UObject
    public streamingLevels: UObject

    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos);
        this.persistentLevel = Ar.readObject()
        this.extraReferencedObjects = Ar.readObject()
        this.streamingLevels = Ar.readObject()
    }
}