import { UObject } from "../../ue4/assets/exports/UObject";
import { FName } from "../../ue4/objects/uobject/FName";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FGuid } from "../../ue4/objects/core/misc/Guid";
export declare class CharacterDataAsset extends UObject {
    CharacterID: FName;
    Character: FSoftObjectPath;
    UIData: FSoftObjectPath;
    Role: FSoftObjectPath;
    CharacterSelectFXC: FSoftObjectPath;
    DeveloperName: FName;
    bIsPlayableCharacter: boolean;
    bAvailableForTest: boolean;
    Uuid: FGuid;
    bBaseContent: boolean;
}
