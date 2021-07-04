import { FName } from "../../objects/uobject/FName";
import { FArchive } from "../../reader/FArchive";
export declare class FAssetIdentifier {
    packageName: FName;
    primaryAssetType: FName;
    objectName: FName;
    valueName: FName;
    constructor(Ar: FArchive);
}
