import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { UActorComponent } from "./components/UActorComponent";
import { UTimelineTemplate } from "./UTimelineTemplate";
import { UFunction } from "./UFunction";
import { UClass } from "./UClass";
/**
 * UBlueprintGeneratedClass_Properties
 * @extends {UClass}
 */
export declare class UBlueprintGeneratedClass_Properties extends UClass {
    /**
     * NumReplicatedProperties
     * @type {number}
     * @public
     */
    NumReplicatedProperties: number;
    /**
     * bHasNativizedParent
     * @type {boolean}
     * @public
     */
    bHasNativizedParent: boolean;
    /**
     * bHasCookedComponentInstancingData
     * @type {boolean}
     * @public
     */
    bHasCookedComponentInstancingData: boolean;
    /**
     * DynamicBindingObjects
     * @type {Array<FPackageIndex>}
     * @public
     */
    DynamicBindingObjects: FPackageIndex[];
    /**
     * ComponentTemplates
     * @type {Array<UActorComponent>}
     * @public
     */
    ComponentTemplates: UActorComponent[];
    /**
     * Timelines
     * @type {Array<UTimelineTemplate>}
     * @public
     */
    Timelines: UTimelineTemplate[];
    /**
     * SimpleConstructionScript
     * @type {FPackageIndex}
     * @public
     */
    SimpleConstructionScript: FPackageIndex;
    /**
     * InheritableComponentHandler
     * @type {FPackageIndex}
     * @public
     */
    InheritableComponentHandler: FPackageIndex;
    /**
     * UberGraphFramePointerProperty
     * @type {FPackageIndex}
     * @public
     */
    UberGraphFramePointerProperty: FPackageIndex;
    /**
     * UberGraphFunction
     * @type {UFunction}
     * @public
     */
    UberGraphFunction: UFunction;
}
