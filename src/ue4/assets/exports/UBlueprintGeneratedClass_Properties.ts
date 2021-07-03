import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { UActorComponent } from "./components/UActorComponent";
import { UTimelineTemplate } from "./UTimelineTemplate";
import { UFunction } from "./UFunction";
import { UProperty } from "../../../util/decorators/UProperty";
import { UClass } from "./UClass";

/**
 * UBlueprintGeneratedClass_Properties
 * @extends {UClass}
 */
export class UBlueprintGeneratedClass_Properties extends UClass {
    /**
     * NumReplicatedProperties
     * @type {number}
     * @public
     */
    public NumReplicatedProperties: number = null

    /**
     * bHasNativizedParent
     * @type {boolean}
     * @public
     */
    public bHasNativizedParent: boolean = null

    /**
     * bHasCookedComponentInstancingData
     * @type {boolean}
     * @public
     */
    public bHasCookedComponentInstancingData: boolean = null

    /**
     * DynamicBindingObjects
     * @type {Array<FPackageIndex>}
     * @public
     */
    public DynamicBindingObjects: FPackageIndex[] = null

    /**
     * ComponentTemplates
     * @type {Array<UActorComponent>}
     * @public
     */
    public ComponentTemplates: UActorComponent[] = null

    /**
     * Timelines
     * @type {Array<UTimelineTemplate>}
     * @public
     */
    public Timelines: UTimelineTemplate[] = null
    //public List<FBPComponentClassOverride> ComponentClassOverrides;

    /**
     * SimpleConstructionScript
     * @type {FPackageIndex}
     * @public
     */
    @UProperty({skipPrevious: 1})
    public SimpleConstructionScript: FPackageIndex = null

    /**
     * InheritableComponentHandler
     * @type {FPackageIndex}
     * @public
     */
    public InheritableComponentHandler: FPackageIndex = null

    /**
     * UberGraphFramePointerProperty
     * @type {FPackageIndex}
     * @public
     */
    public UberGraphFramePointerProperty: FPackageIndex = null

    /**
     * UberGraphFunction
     * @type {UFunction}
     * @public
     */
    @UProperty({skipNext: 1})
    public UberGraphFunction: UFunction = null
    //public Map<FName, FBlueprintCookedComponentInstancingData> CookedComponentInstancingData;
}