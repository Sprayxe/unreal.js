import { FortCharacterType } from "./FortCharacterType"
import { EFortCustomGender } from "../enums/EFortCustomGender";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FGameplayTagContainer } from "../../ue4/objects/gameplaytags/FGameplayTagContainer";

export class FortWorkerType extends FortCharacterType {
    public Gender: EFortCustomGender
    public FixedPortrait: FSoftObjectPath
    public bIsManager: boolean = false
    public ManagerSynergyTag: FGameplayTagContainer
    public FixedPersonalityTag: FGameplayTagContainer
    public FixedSetBonusTag: FGameplayTagContainer
    public MatchingPersonalityBonus: number
    public MismatchingPersonalityPenalty: number
}