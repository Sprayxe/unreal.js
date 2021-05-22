import { UObject } from "../../ue4/assets/exports/UObject";
import { FText } from "../../ue4/objects/core/i18n/Text";
import { FName } from "../../ue4/objects/uobject/FName";
import { FPackageIndex } from "../../ue4/objects/uobject/ObjectResource";
import { UScriptMap } from "../../ue4/objects/uobject/UScriptMap";

export class CharacterUIData extends UObject {
    FullPortrait: FPackageIndex = null
    BustPortrait: FPackageIndex = null
    DisplayIconSmall: FPackageIndex = null
    DisplayIcon: FPackageIndex = null
    Abilities: UScriptMap = null // Map<ECharacterAbilitySlot, FPackageIndex<CharacterAbilityUIData>>
    WwiseStateName: FName = null
    DisplayName: FText = null
    Description: FText = null
}