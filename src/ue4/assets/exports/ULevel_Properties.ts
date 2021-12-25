import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FGuid } from "../../objects/core/misc/Guid";
import { FVector } from "../../objects/core/math/FVector";
import { FIntVector } from "../../objects/core/math/FIntVector";
import { UObject } from "./UObject";
import { UProperty } from "../../../util/decorators/UProperty";

/**
 * ULevel_Properties
 * @extends {UObject}
 */
export class ULevel_Properties extends UObject {
    /**
     * OwningWorld
     * @type {FPackageIndex}
     * @public
     */
    public /*World*/ OwningWorld: FPackageIndex = null

    /**
     * Model
     * @type {FPackageIndex}
     * @public
     */
    public Model: FPackageIndex = null

    /**
     * ModelComponents
     * @type {Array<FPackageIndex>}
     * @public
     */
    public ModelComponents: FPackageIndex[] = null

    /**
     * ActorCluster
     * @type {FPackageIndex}
     * @public
     */
    public ActorCluster: FPackageIndex = null

    /**
     * NumTextureStreamingUnbuiltComponents
     * @type {number}
     * @public
     */
    public NumTextureStreamingUnbuiltComponents: number = null

    /**
     * NumTextureStreamingDirtyResources
     * @type {number}
     * @public
     */
    public NumTextureStreamingDirtyResources: number = null

    /**
     * LevelScriptActor
     * @type {FPackageIndex}
     * @public
     */
    public LevelScriptActor: FPackageIndex = null

    /**
     * NavListStart
     * @type {FPackageIndex}
     * @public
     */
    public NavListStart: FPackageIndex = null

    /**
     * NavListEnd
     * @type {FPackageIndex}
     * @public
     */
    public NavListEnd: FPackageIndex = null

    /**
     * NavDataChunks
     * @type {Array<FPackageIndex>}
     * @public
     */
    public NavDataChunks: FPackageIndex[] = null

    /**
     * LightmapTotalSize
     * @type {number}
     * @public
     */
    public LightmapTotalSize: number = null

    /**
     * ShadowmapTotalSize
     * @type {number}
     * @public
     */
    public ShadowmapTotalSize: number = null

    /**
     * StaticNavigableGeometry
     * @type {Array<FVector>}
     * @public
     */
    public StaticNavigableGeometry: FVector[] = null

    /**
     * StreamingTextureGuids
     * @type {FGuid}
     * @public
     */
    public StreamingTextureGuids: FGuid = null

    /**
     * LevelBuildDataId
     * @type {FGuid}
     * @public
     */
    public LevelBuildDataId: FGuid = null

    /**
     * MapBuildData
     * @type {FPackageIndex}
     * @public
     */
    public MapBuildData: FPackageIndex = null

    /**
     * LightBuildLevelOffset
     * @type {FIntVector}
     * @public
     */
    public LightBuildLevelOffset: FIntVector = null

    /**
     * bIsLightingScenario
     * @type {boolean}
     * @public
     */
    public bIsLightingScenario: boolean = null

    /**
     * bTextureStreamingRotationChanged
     * @type {boolean}
     * @public
     */
    public bTextureStreamingRotationChanged: boolean = null

    /**
     * bStaticComponentsRegisteredInStreamingManager
     * @type {boolean}
     * @public
     */
    public bStaticComponentsRegisteredInStreamingManager: boolean = null

    /**
     * bIsVisible
     * @type {boolean}
     * @public
     */
    public bIsVisible: boolean = null

    /**
     * WorldSettings
     * @type {FPackageIndex}
     * @public
     */
    public WorldSettings: FPackageIndex = null

    /**
     * AssetUserData
     * @type {Array<FPackageIndex>}
     * @public
     */
    @UProperty({ skipNext: 1 })
    public AssetUserData: FPackageIndex[] = null
    //public DestroyedReplicatedStaticActors: FReplicatedStaticActorDestructionInfo[]
}