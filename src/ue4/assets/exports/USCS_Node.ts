import { UObject } from "./UObject";
import { FName } from "../../objects/uobject/FName";
import { UStruct } from "./UStruct";
import { UClass } from "./UClass";
import { UActorComponent } from "./components/UActorComponent";
import { FBPVariableMetaDataEntry } from "../objects/FBPVariableMetaDataEntry";
import { FGuid } from "../../objects/core/misc/Guid";

/**
 * FBlueprintCookedComponentInstancingData
 */
export class FBlueprintCookedComponentInstancingData {
    /**
     * ChangedPropertyList
     * @type {Array<FBlueprintComponentChangedPropertyInfo>}
     * @public
     */
    public ChangedPropertyList: FBlueprintComponentChangedPropertyInfo[] = null

    /**
     * bHasValidCookedData
     * @type {boolean}
     * @public
     */
    public bHasValidCookedData: boolean = null
}

/**
 * FBlueprintComponentChangedPropertyInfo
 */
export class FBlueprintComponentChangedPropertyInfo {
    /**
     * PropertyName
     * @type {FName}
     * @public
     */
    public PropertyName: FName = null

    /**
     * ArrayIndex
     * @type {number}
     * @public
     */
    public ArrayIndex: number = null

    /**
     * PropertyScope
     * @type {UStruct}
     * @public
     */
    public PropertyScope: UStruct = null
}

/**
 * USCS_Node
 * @extends {UObject}
 */
export class USCS_Node extends UObject {
    /**
     * ComponentClass
     * @type {UClass}
     * @public
     */
    public ComponentClass: UClass = null

    /**
     * ComponentTemplate
     * @type {UActorComponent}
     * @public
     */
    public ComponentTemplate: UActorComponent = null

    /**
     * CookedComponentInstancingData
     * @type {FBlueprintCookedComponentInstancingData}
     * @public
     */
    public CookedComponentInstancingData: FBlueprintCookedComponentInstancingData = null

    /**
     * AttachToName
     * @type {FName}
     * @public
     */
    public AttachToName: FName = null

    /**
     * ParentComponentOrVariableName
     * @type {FName}
     * @public
     */
    public ParentComponentOrVariableName: FName = null

    /**
     * ParentComponentOwnerClassName
     * @type {FName}
     * @public
     */
    public ParentComponentOwnerClassName: FName = null

    /**
     * bIsParentComponentNative
     * @type {boolean}
     * @public
     */
    public bIsParentComponentNative: boolean = null

    /**
     * ChildNodes
     * @type {Array<USCS_Node>}
     * @public
     */
    public ChildNodes: USCS_Node[] = null

    /**
     * MetaDataArray
     * @type {Array<FBPVariableMetaDataEntry>}
     * @public
     */
    public MetaDataArray: FBPVariableMetaDataEntry[] = null

    /**
     * VariableGuid
     * @type {FGuid}
     * @public
     */
    public VariableGuid: FGuid = null

    /**
     * InternalVariableName
     * @type {FName}
     * @public
     */
    public InternalVariableName: FName = null
}