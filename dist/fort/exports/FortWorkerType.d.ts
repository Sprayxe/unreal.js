import { FortCharacterType } from "./FortCharacterType";
import { EFortCustomGender } from "../enums/EFortCustomGender";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FGameplayTagContainer } from "../../ue4/objects/gameplaytags/FGameplayTagContainer";
export declare class FortWorkerType extends FortCharacterType {
    Gender: EFortCustomGender;
    FixedPortrait: FSoftObjectPath;
    bIsManager: boolean;
    ManagerSynergyTag: FGameplayTagContainer;
    FixedPersonalityTag: FGameplayTagContainer;
    FixedSetBonusTag: FGameplayTagContainer;
    MatchingPersonalityBonus: number;
    MismatchingPersonalityPenalty: number;
}
