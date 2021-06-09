import { FortWorkerType } from "./FortWorkerType"
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath"
import { FPackageIndex } from "../../ue4/objects/uobject/ObjectResource"
import { FText } from "../../ue4/objects/core/i18n/Text"
import { FDataTableRowHandle } from "../../ue4/objects/FDataTableRowHandle"
import { FGameplayTagContainer } from "../../ue4/objects/gameplaytags/FGameplayTagContainer";
import { FortAttributeInitializationKey } from "../objects/FortAttributeInitializationKey";
import { GameplayEffectApplicationInfo } from "../objects/GameplayEffectApplicationInfo";

export class FortHeroType extends FortWorkerType {
    public bForceShowHeadAccessory: boolean = null
    public bForceShowBackpack: boolean = null
    public Specializations: FSoftObjectPath[] = null
    public DefaultMontageLookupTable: FSoftObjectPath = null
    public OverrideMontageLookupTable: FSoftObjectPath = null
    public CombinedStatGEs: GameplayEffectApplicationInfo[] = null
    public RequiredGPTags: FGameplayTagContainer = null
    public MaleOverrideFeedback: FSoftObjectPath = null
    public FemaleOverrideFeedback: FSoftObjectPath = null
    public OverridePawnClass: FSoftObjectPath /*SoftClassPath*/ = null
    public HeroGameplayDefinition: FPackageIndex /*FortHeroGameplayDefinition*/ = null
    public HeroCosmeticOutfitDefinition: FPackageIndex /*AthenaCharacterItemDefinition*/ = null
    public HeroCosmeticBackblingDefinition: FPackageIndex /*AthenaBackpackItemDefinition*/ = null
    public FrontEndAnimClass: FSoftObjectPath /*SoftClassPath*/ = null
    public ItemPreviewAnimClass: FSoftObjectPath /*SoftClassPath*/ = null
    public FrontendAnimMontageIdleOverride: FSoftObjectPath = null
    public FrontEndBackPreviewRotationOffset: number = null
    public Subtype: FText = null
    public AttributeInitKey: FortAttributeInitializationKey = null
    public LegacyStatHandle: FDataTableRowHandle = null
    public ItemPreviewMontage_Male: FSoftObjectPath = null
    public ItemPreviewMontage_Female: FSoftObjectPath = null
}