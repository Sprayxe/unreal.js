import { UObject } from "../../ue4/assets/exports/UObject";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { ArrayProperty } from "../../ue4/assets/objects/FProperty";

export class ContractDataAssetV2ContentCharacter extends UObject {
    public RelatedCharacter: FSoftObjectPath
    public Chapters: ArrayProperty
}

