import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FGuid } from "../../objects/core/misc/Guid";
import { FVector } from "../../objects/core/math/FVector";
import { FIntVector } from "../../objects/core/math/FIntVector";
import { UObject } from "./UObject";

export class ULevel_Properties extends UObject {
    public /*World*/ OwningWorld: FPackageIndex
    public Model: FPackageIndex
    public ModelComponents: FPackageIndex[]
    public ActorCluster: FPackageIndex
    public NumTextureStreamingUnbuiltComponents: number
    public NumTextureStreamingDirtyResources: number
    public LevelScriptActor: FPackageIndex
    public NavListStart: FPackageIndex
    public NavListEnd: FPackageIndex
    public NavDataChunks: FPackageIndex[]
    public LightmapTotalSize: number
    public ShadowmapTotalSize: number
    public StaticNavigableGeometry: FVector[]
    public StreamingTextureGuids: FGuid
    public LevelBuildDataId: FGuid
    public MapBuildData: FPackageIndex
    public LightBuildLevelOffset: FIntVector
    public bIsLightingScenario: boolean
    public bTextureStreamingRotationChanged: boolean
    public bStaticComponentsRegisteredInStreamingManager: boolean
    public bIsVisible: boolean
    public WorldSettings: FPackageIndex
    public AssetUserData: FPackageIndex[]
    //public DestroyedReplicatedStaticActors: FReplicatedStaticActorDestructionInfo[]
}