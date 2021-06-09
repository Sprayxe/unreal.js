import { UObject } from "./UObject";
import { FName } from "../../objects/uobject/FName";
import { UStruct } from "./UStruct";
import { UClass } from "./UClass";
import { UActorComponent } from "./components/UActorComponent";
import { FBPVariableMetaDataEntry } from "../objects/FBPVariableMetaDataEntry";
import { FGuid } from "../../objects/core/misc/Guid";

export class USCS_Node extends UObject {
    public ComponentClass: UClass = null
    public ComponentTemplate: UActorComponent = null
    public CookedComponentInstancingData: FBlueprintCookedComponentInstancingData = null
    public AttachToName: FName = null
    public ParentComponentOrVariableName: FName = null
    public ParentComponentOwnerClassName: FName = null
    public bIsParentComponentNative: boolean = null
    public ChildNodes: USCS_Node[] = null
    public MetaDataArray: FBPVariableMetaDataEntry[] = null
    public VariableGuid: FGuid = null
    public InternalVariableName: FName = null
}

export class FBlueprintCookedComponentInstancingData {
    public ChangedPropertyList: FBlueprintComponentChangedPropertyInfo[] = null
    public bHasValidCookedData: boolean = null
}

export class FBlueprintComponentChangedPropertyInfo {
    public PropertyName: FName = null
    public ArrayIndex: number = null
    public PropertyScope: UStruct = null
}