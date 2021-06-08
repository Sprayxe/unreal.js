import { FortWorkerType } from "./FortWorkerType"
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath"
import { FPackageIndex } from "../../ue4/objects/uobject/ObjectResource"
import { FText } from "../../ue4/objects/core/i18n/Text"
import { FDataTableRowHandle } from "../../ue4/objects/FDataTableRowHandle"
import { FGameplayTagContainer } from "../../ue4/objects/gameplaytags/FGameplayTagContainer";
import { FortAttributeInitializationKey } from "../objects/FortAttributeInitializationKey";
import { GameplayEffectApplicationInfo } from "../objects/GameplayEffectApplicationInfo";

export class FortHeroType extends FortWorkerType {
    public bForceShowHeadAccessory: boolean
    public bForceShowBackpack: boolean
    public Specializations: FSoftObjectPath[]
    public DefaultMontageLookupTable: FSoftObjectPath
    public OverrideMontageLookupTable: FSoftObjectPath
    public CombinedStatGEs: GameplayEffectApplicationInfo[]
    public RequiredGPTags: FGameplayTagContainer
    public MaleOverrideFeedback: FSoftObjectPath
    public FemaleOverrideFeedback: FSoftObjectPath
    public OverridePawnClass: FSoftObjectPath /*SoftClassPath*/
    public HeroGameplayDefinition: FPackageIndex /*FortHeroGameplayDefinition*/
    public HeroCosmeticOutfitDefinition: FPackageIndex /*AthenaCharacterItemDefinition*/
    public HeroCosmeticBackblingDefinition: FPackageIndex /*AthenaBackpackItemDefinition*/
    public FrontEndAnimClass: FSoftObjectPath /*SoftClassPath*/
    public ItemPreviewAnimClass: FSoftObjectPath /*SoftClassPath*/
    public FrontendAnimMontageIdleOverride: FSoftObjectPath
    public FrontEndBackPreviewRotationOffset: number
    public Subtype: FText
    public AttributeInitKey: FortAttributeInitializationKey
    public LegacyStatHandle: FDataTableRowHandle
    public ItemPreviewMontage_Male: FSoftObjectPath
    public ItemPreviewMontage_Female: FSoftObjectPath
}