import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FGuid } from "../../objects/core/misc/Guid";
import { FVector } from "../../objects/core/math/FVector";
import { FIntVector } from "../../objects/core/math/FIntVector";
import { UObject } from "./UObject";
import { UProperty } from "../../../util/decorators/UProperty";

export class ULevel_Properties extends UObject {
    public /*World*/ OwningWorld: FPackageIndex = null
    public Model: FPackageIndex = null
    public ModelComponents: FPackageIndex[] = null
    public ActorCluster: FPackageIndex = null
    public NumTextureStreamingUnbuiltComponents: number = null
    public NumTextureStreamingDirtyResources: number = null
    public LevelScriptActor: FPackageIndex = null
    public NavListStart: FPackageIndex = null
    public NavListEnd: FPackageIndex = null
    public NavDataChunks: FPackageIndex[] = null
    public LightmapTotalSize: number = null
    public ShadowmapTotalSize: number = null
    public StaticNavigableGeometry: FVector[] = null
    public StreamingTextureGuids: FGuid = null
    public LevelBuildDataId: FGuid = null
    public MapBuildData: FPackageIndex = null
    public LightBuildLevelOffset: FIntVector = null
    public bIsLightingScenario: boolean = null
    public bTextureStreamingRotationChanged: boolean = null
    public bStaticComponentsRegisteredInStreamingManager: boolean = null
    public bIsVisible: boolean = null
    public WorldSettings: FPackageIndex = null
    @UProperty({skipNext: 1})
    public AssetUserData: FPackageIndex[] = null
    //public DestroyedReplicatedStaticActors: FReplicatedStaticActorDestructionInfo[]
}