import { UObject } from "../UObject";
import { FName } from "../../../objects/uobject/FName";
import { FGuid } from "../../../objects/core/misc/Guid";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { FMulticastScriptDelegate } from "../../../objects/uobject/ScriptDelegates";

export class UActorComponent extends UObject {
    public ComponentTags: FName[]
    public AssetUserData: FPackageIndex[]
    public UCSSerializationIndex: number
    public bNetAddressable: boolean
    public bReplicates: boolean
    public bAutoActivate: boolean
    public bIsActive: boolean;
    public bEditableWhenInherited: boolean;
    public bCanEverAffectNavigation: boolean;
    public bIsEditorOnly: boolean;
    public CreationMethod: EComponentCreationMethod;
    public OnComponentActivated: FMulticastScriptDelegate;
    public OnComponentDeactivated: FMulticastScriptDelegate;
    public UCSModifiedProperties: FSimpleMemberReference[];
}

export enum EComponentCreationMethod {
    Native,
    SimpleConstructionScript,
    UserConstructionScript,
    Instance
}

export class FSimpleMemberReference {
    public MemberParent: UObject;
    public MemberName: FName;
    public MemberGuid: FGuid;
}