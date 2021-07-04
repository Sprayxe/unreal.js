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
export declare class FBlueprintCookedComponentInstancingData {
    /**
     * ChangedPropertyList
     * @type {Array<FBlueprintComponentChangedPropertyInfo>}
     * @public
     */
    ChangedPropertyList: FBlueprintComponentChangedPropertyInfo[];
    /**
     * bHasValidCookedData
     * @type {boolean}
     * @public
     */
    bHasValidCookedData: boolean;
}
/**
 * FBlueprintComponentChangedPropertyInfo
 */
export declare class FBlueprintComponentChangedPropertyInfo {
    /**
     * PropertyName
     * @type {FName}
     * @public
     */
    PropertyName: FName;
    /**
     * ArrayIndex
     * @type {number}
     * @public
     */
    ArrayIndex: number;
    /**
     * PropertyScope
     * @type {UStruct}
     * @public
     */
    PropertyScope: UStruct;
}
/**
 * USCS_Node
 * @extends {UObject}
 */
export declare class USCS_Node extends UObject {
    /**
     * ComponentClass
     * @type {UClass}
     * @public
     */
    ComponentClass: UClass;
    /**
     * ComponentTemplate
     * @type {UActorComponent}
     * @public
     */
    ComponentTemplate: UActorComponent;
    /**
     * CookedComponentInstancingData
     * @type {FBlueprintCookedComponentInstancingData}
     * @public
     */
    CookedComponentInstancingData: FBlueprintCookedComponentInstancingData;
    /**
     * AttachToName
     * @type {FName}
     * @public
     */
    AttachToName: FName;
    /**
     * ParentComponentOrVariableName
     * @type {FName}
     * @public
     */
    ParentComponentOrVariableName: FName;
    /**
     * ParentComponentOwnerClassName
     * @type {FName}
     * @public
     */
    ParentComponentOwnerClassName: FName;
    /**
     * bIsParentComponentNative
     * @type {boolean}
     * @public
     */
    bIsParentComponentNative: boolean;
    /**
     * ChildNodes
     * @type {Array<USCS_Node>}
     * @public
     */
    ChildNodes: USCS_Node[];
    /**
     * MetaDataArray
     * @type {Array<FBPVariableMetaDataEntry>}
     * @public
     */
    MetaDataArray: FBPVariableMetaDataEntry[];
    /**
     * VariableGuid
     * @type {FGuid}
     * @public
     */
    VariableGuid: FGuid;
    /**
     * InternalVariableName
     * @type {FName}
     * @public
     */
    InternalVariableName: FName;
}
