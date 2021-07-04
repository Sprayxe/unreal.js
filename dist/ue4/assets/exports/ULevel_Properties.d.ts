import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FGuid } from "../../objects/core/misc/Guid";
import { FVector } from "../../objects/core/math/FVector";
import { FIntVector } from "../../objects/core/math/FIntVector";
import { UObject } from "./UObject";
/**
 * ULevel_Properties
 * @extends {UObject}
 */
export declare class ULevel_Properties extends UObject {
    /**
     * OwningWorld
     * @type {FPackageIndex}
     * @public
     */
    OwningWorld: FPackageIndex;
    /**
     * Model
     * @type {FPackageIndex}
     * @public
     */
    Model: FPackageIndex;
    /**
     * ModelComponents
     * @type {Array<FPackageIndex>}
     * @public
     */
    ModelComponents: FPackageIndex[];
    /**
     * ActorCluster
     * @type {FPackageIndex}
     * @public
     */
    ActorCluster: FPackageIndex;
    /**
     * NumTextureStreamingUnbuiltComponents
     * @type {number}
     * @public
     */
    NumTextureStreamingUnbuiltComponents: number;
    /**
     * NumTextureStreamingDirtyResources
     * @type {number}
     * @public
     */
    NumTextureStreamingDirtyResources: number;
    /**
     * LevelScriptActor
     * @type {FPackageIndex}
     * @public
     */
    LevelScriptActor: FPackageIndex;
    /**
     * NavListStart
     * @type {FPackageIndex}
     * @public
     */
    NavListStart: FPackageIndex;
    /**
     * NavListEnd
     * @type {FPackageIndex}
     * @public
     */
    NavListEnd: FPackageIndex;
    /**
     * NavDataChunks
     * @type {Array<FPackageIndex>}
     * @public
     */
    NavDataChunks: FPackageIndex[];
    /**
     * LightmapTotalSize
     * @type {number}
     * @public
     */
    LightmapTotalSize: number;
    /**
     * ShadowmapTotalSize
     * @type {number}
     * @public
     */
    ShadowmapTotalSize: number;
    /**
     * StaticNavigableGeometry
     * @type {Array<FVector>}
     * @public
     */
    StaticNavigableGeometry: FVector[];
    /**
     * StreamingTextureGuids
     * @type {FGuid}
     * @public
     */
    StreamingTextureGuids: FGuid;
    /**
     * LevelBuildDataId
     * @type {FGuid}
     * @public
     */
    LevelBuildDataId: FGuid;
    /**
     * MapBuildData
     * @type {FPackageIndex}
     * @public
     */
    MapBuildData: FPackageIndex;
    /**
     * LightBuildLevelOffset
     * @type {FIntVector}
     * @public
     */
    LightBuildLevelOffset: FIntVector;
    /**
     * bIsLightingScenario
     * @type {boolean}
     * @public
     */
    bIsLightingScenario: boolean;
    /**
     * bTextureStreamingRotationChanged
     * @type {boolean}
     * @public
     */
    bTextureStreamingRotationChanged: boolean;
    /**
     * bStaticComponentsRegisteredInStreamingManager
     * @type {boolean}
     * @public
     */
    bStaticComponentsRegisteredInStreamingManager: boolean;
    /**
     * bIsVisible
     * @type {boolean}
     * @public
     */
    bIsVisible: boolean;
    /**
     * WorldSettings
     * @type {FPackageIndex}
     * @public
     */
    WorldSettings: FPackageIndex;
    /**
     * AssetUserData
     * @type {Array<FPackageIndex>}
     * @public
     */
    AssetUserData: FPackageIndex[];
}
