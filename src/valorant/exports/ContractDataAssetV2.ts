import { UObject } from "../../ue4/assets/exports/UObject";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FGuid } from "../../ue4/objects/core/misc/Guid";

export class ContractDataAssetV2 extends UObject {
    UIData: FSoftObjectPath = null
    Uuid: FGuid = null
    FreeRewardScheduleID: FGuid
    // TODO Content: { ObjectName: string, ObjectPath: string }
}