import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { UActorComponent } from "./components/UActorComponent";
import { UTimelineTemplate } from "./UTimelineTemplate";
import { UFunction } from "./UFunction";
import { UObject } from "./UObject";
import { FAssetArchive } from "../reader/FAssetArchive";
import { UProperty } from "../../../util/decorators/UProperty";

export class UBlueprintGeneratedClass_Properties extends UObject {
    public NumReplicatedProperties: number
    public bHasNativizedParent: boolean
    public bHasCookedComponentInstancingData: boolean
    public DynamicBindingObjects: FPackageIndex[]
    public ComponentTemplates: UActorComponent[]
    public Timelines: UTimelineTemplate[]
    //public List<FBPComponentClassOverride> ComponentClassOverrides;
    @UProperty({ skipPrevious: 1 })
    public SimpleConstructionScript: FPackageIndex
    public InheritableComponentHandler: FPackageIndex
    public UberGraphFramePointerProperty: FPackageIndex
    @UProperty({ skipNext: 1 })
    public UberGraphFunction: UFunction
    //public Map<FName, FBlueprintCookedComponentInstancingData> CookedComponentInstancingData;
}