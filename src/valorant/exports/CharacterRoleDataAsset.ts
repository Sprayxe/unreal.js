import { UObject } from "../../ue4/assets/exports/UObject";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FGuid } from "../../ue4/objects/core/misc/Guid";

export class CharacterRoleDataAsset extends UObject {
    UIData: FSoftObjectPath = null
    Uuid: FGuid = null
}