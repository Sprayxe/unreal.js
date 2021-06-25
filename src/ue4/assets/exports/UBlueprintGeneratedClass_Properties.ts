import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { UActorComponent } from "./components/UActorComponent";
import { UTimelineTemplate } from "./UTimelineTemplate";
import { UFunction } from "./UFunction";
import { UObject } from "./UObject";
import { UProperty } from "../../../util/decorators/UProperty";

export class UBlueprintGeneratedClass_Properties extends UObject {
    public NumReplicatedProperties: number = null
    public bHasNativizedParent: boolean = null
    public bHasCookedComponentInstancingData: boolean = null
    public DynamicBindingObjects: FPackageIndex[] = null
    public ComponentTemplates: UActorComponent[] = null
    public Timelines: UTimelineTemplate[] = null
    //public List<FBPComponentClassOverride> ComponentClassOverrides;
    @UProperty({skipPrevious: 1})
    public SimpleConstructionScript: FPackageIndex = null
    public InheritableComponentHandler: FPackageIndex = null
    public UberGraphFramePointerProperty: FPackageIndex = null
    @UProperty({skipNext: 1})
    public UberGraphFunction: UFunction = null
    //public Map<FName, FBlueprintCookedComponentInstancingData> CookedComponentInstancingData;
}