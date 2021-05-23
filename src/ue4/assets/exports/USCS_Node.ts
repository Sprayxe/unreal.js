import { UObject } from "./UObject";
import { FName } from "../../objects/uobject/FName";
import { UStruct } from "./UStruct";
import { UClass } from "./UClass";
import { UActorComponent } from "./components/UActorComponent";
import { FBPVariableMetaDataEntry } from "../objects/FBPVariableMetaDataEntry";
import { FGuid } from "../../objects/core/misc/Guid";

export class USCS_Node extends UObject {
    public ComponentClass: UClass
    public ComponentTemplate: UActorComponent
    public CookedComponentInstancingData: FBlueprintCookedComponentInstancingData
    public AttachToName: FName
    public ParentComponentOrVariableName: FName
    public ParentComponentOwnerClassName: FName
    public bIsParentComponentNative: boolean
    public ChildNodes: USCS_Node[]
    public MetaDataArray: FBPVariableMetaDataEntry[]
    public VariableGuid: FGuid
    public InternalVariableName: FName
}

export class FBlueprintCookedComponentInstancingData {
    public ChangedPropertyList: FBlueprintComponentChangedPropertyInfo[]
    public bHasValidCookedData: boolean
}

export class FBlueprintComponentChangedPropertyInfo {
    public PropertyName: FName
    public ArrayIndex: number
    public PropertyScope: UStruct
}