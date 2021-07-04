import { FArchive } from "../../reader/FArchive";
import { FName } from "../../objects/uobject/FName";
import { FGuid } from "../../objects/core/misc/Guid";
import { FMD5Hash } from "./FMD5Hash";
export declare class FAssetPackageData {
    packageName: FName;
    diskSize: number;
    packageGuid: FGuid;
    cookedHash?: FMD5Hash;
    constructor(Ar: FArchive, serializeHash: boolean);
}
