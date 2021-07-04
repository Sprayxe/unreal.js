import { UObject } from "../../ue4/assets/exports/UObject";
import { FText } from "../../ue4/objects/core/i18n/Text";
import { FName } from "../../ue4/objects/uobject/FName";
import { FPackageIndex } from "../../ue4/objects/uobject/ObjectResource";
import { UScriptMap } from "../../ue4/objects/uobject/UScriptMap";
export declare class CharacterUIData extends UObject {
    FullPortrait: FPackageIndex;
    BustPortrait: FPackageIndex;
    DisplayIconSmall: FPackageIndex;
    DisplayIcon: FPackageIndex;
    Abilities: UScriptMap;
    WwiseStateName: FName;
    DisplayName: FText;
    Description: FText;
}
