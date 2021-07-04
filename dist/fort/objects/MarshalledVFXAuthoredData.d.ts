import { FName } from "../../ue4/objects/uobject/FName";
import { FGameplayTagContainer } from "../../ue4/objects/gameplaytags/FGameplayTagContainer";
import { FGameplayTag } from "../../ue4/objects/gameplaytags/FGameplayTag";
import { FSoftObjectPath } from "../../ue4/objects/uobject/SoftObjectPath";
import { EFXType } from "../enums/EFXType";
import { UnrealMap } from "../../util/UnrealMap";
import { FTransform } from "../../ue4/objects/core/math/FTransform";
export declare class MarshalledVFXAuthoredData {
    NiagaraVFX: MarshalledVFXData[];
    CascadeVFX: MarshalledVFXData[];
    NameReplacements: UnrealMap<FName, ParameterNameMapping>;
}
export declare class MarshalledVFXData {
    ParameterGroups: FGameplayTagContainer;
    Type: EFXType;
    Asset: FSoftObjectPath;
    AttachAtBone: FName;
    RelativeOffset: FTransform;
    EffectIdTag: FGameplayTag;
    bAutoActivate: boolean;
}
export declare class ParameterNameMapping {
    CascadeName: FName;
    NiagaraName: FName;
}
