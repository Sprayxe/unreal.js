import { FName } from "../../ue4/objects/uobject/FName";
import { FGameplayTagContainer } from "../../ue4/objects/gameplaytags/FGameplayTagContainer";
import { FGameplayTag } from "../../ue4/objects/gameplaytags/FGameplayTag";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { EFXType } from "../enums/EFXType";
import { UnrealMap } from "../../util/UnrealMap";
import { FTransform } from "../../ue4/objects/core/math/FTransform";

export class MarshalledVFXAuthoredData {
    public NiagaraVFX: MarshalledVFXData[]
    public CascadeVFX: MarshalledVFXData[]
    public NameReplacements: UnrealMap<FName, ParameterNameMapping>;
}

export class MarshalledVFXData {
    public ParameterGroups: FGameplayTagContainer
    public Type: EFXType
    public Asset: FSoftObjectPath
    public AttachAtBone: FName
    public RelativeOffset: FTransform
    public EffectIdTag: FGameplayTag
    public bAutoActivate: boolean
}

export class ParameterNameMapping {
    public CascadeName: FName
    public NiagaraName: FName
}