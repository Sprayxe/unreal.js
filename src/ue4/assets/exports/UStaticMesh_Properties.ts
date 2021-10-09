import { UStreamableRenderAsset } from "./UStreamableRenderAsset";
import { FPerPlatformInt } from "../../objects/engine/PerPlatformProperties";
import { FVector } from "../../objects/core/math/FVector";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";
import { FStaticMaterial } from "../objects/meshes/FStaticMaterial";
import { FBoxSphereBounds } from "../../objects/core/math/FBoxSphereBounds";

export class UStaticMesh_Properties extends UStreamableRenderAsset {
    public MinLOD: FPerPlatformInt = null
    public LpvBiasMultiplier: number = null
    public StaticMaterials: FStaticMaterial[] = null
    public LightmapUVDensity: number = null
    public LightMapResolution: number = null
    public LightMapCoordinateIndex: number = null
    public DistanceFieldSelfShadowBias: number = null
    public BodySetup: FPackageIndex /*BodySetup*/ = null
    public LODForCollision: number = null
    public bGenerateMeshDistanceField: boolean = null
    public bStripComplexCollisionForConsole: boolean = null
    public bHasNavigationData: boolean = null
    public bSupportUniformlyDistributedSampling: boolean = null
    public bSupportPhysicalMaterialMasks: boolean = null
    public bIsBuiltAtRuntime: boolean = null
    public bAllowCPUAccess: boolean = null
    public bSupportGpuUniformlyDistributedSampling: boolean = null
    public Sockets: FPackageIndex[] /*StaticMeshSocket[]*/ = null
    public PositiveBoundsExtension: FVector = null
    public NegativeBoundsExtension: FVector = null
    public ExtendedBounds: FBoxSphereBounds = null
    public ElementToIgnoreForTexFactor: number = null
    public AssetUserData: FPackageIndex[] /*AssetUserData[]*/ = null
    public EditableMesh: FPackageIndex /*Object*/ = null
    public NavCollision: FPackageIndex /*NavCollisionBase*/ = null
}