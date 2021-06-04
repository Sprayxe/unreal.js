import { UObject } from "../../ue4/assets/exports/UObject";
import { FAssetArchive } from "../../ue4/assets/reader/FAssetArchive";

export class AkMediaAsset extends UObject {
    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos);
    }
}