import { FortCharacterType } from "./FortCharacterType"
import { EFortCustomGender } from "../enums/EFortCustomGender";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { FGameplayTagContainer } from "../../ue4/objects/gameplaytags/FGameplayTagContainer";

export class FortWorkerType extends FortCharacterType {
    public Gender: EFortCustomGender = null
    public FixedPortrait: FSoftObjectPath = null
    public bIsManager: boolean = false
    public ManagerSynergyTag: FGameplayTagContainer = null
    public FixedPersonalityTag: FGameplayTagContainer = null
    public FixedSetBonusTag: FGameplayTagContainer = null
    public MatchingPersonalityBonus: number = null
    public MismatchingPersonalityPenalty: number = null
}