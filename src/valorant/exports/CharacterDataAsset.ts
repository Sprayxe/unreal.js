import { UObject } from "../../ue4/assets/exports/UObject";
import { FName } from "../../ue4/objects/uobject/FName";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FGuid } from "../../ue4/objects/core/misc/Guid";

export class CharacterDataAsset extends UObject {
    CharacterID: FName = null // enum CharacterID
    Character: FSoftObjectPath = null
    UIData: FSoftObjectPath = null
    Role: FSoftObjectPath = null
    CharacterSelectFXC: FSoftObjectPath = null
    DeveloperName: FName = null
    bIsPlayableCharacter: boolean = false
    bAvailableForTest: boolean = false
    Uuid: FGuid = null
    bBaseContent: boolean = false
}