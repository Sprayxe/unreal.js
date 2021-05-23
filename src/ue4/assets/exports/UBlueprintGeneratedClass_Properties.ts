import { UClass } from "./UClass";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { UActorComponent } from "./components/UActorComponent";
import { UTimelineTemplate } from "./UTimelineTemplate";
import { UFunction } from "./UFunction";

export class UBlueprintGeneratedClass_Properties extends UClass {
    public NumReplicatedProperties: number
    public bHasNativizedParent: number
    public bHasCookedComponentInstancingData: boolean
    public DynamicBindingObjects: FPackageIndex[]
    public ComponentTemplates: UActorComponent[]
    public Timelines: UTimelineTemplate[]
    //public List<FBPComponentClassOverride> ComponentClassOverrides;
    public SimpleConstructionScript: FPackageIndex
    public InheritableComponentHandler: FPackageIndex
    public UberGraphFramePointerProperty: FPackageIndex
    public UberGraphFunction: UFunction
    //public Map<FName, FBlueprintCookedComponentInstancingData> CookedComponentInstancingData;
}