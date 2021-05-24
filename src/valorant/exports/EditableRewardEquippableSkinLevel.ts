import { UObject } from "../../ue4/assets/exports/UObject";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";

export class EditableRewardEquippableSkinLevel extends UObject {
    public EquippableSkinLevel: FSoftObjectPath
    public bHighlighted: boolean
}