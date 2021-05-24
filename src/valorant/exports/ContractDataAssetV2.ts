import { UObject } from "../../ue4/assets/exports/UObject";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FGuid } from "../../ue4/objects/core/misc/Guid";
import { FPackageIndex } from "../../ue4/objects/uobject/ObjectResource";

export class ContractDataAssetV2 extends UObject {
    UIData: FSoftObjectPath
    Uuid: FGuid
    FreeRewardScheduleID: FGuid
    Content: FPackageIndex
}