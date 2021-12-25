import { UMeshComponent } from "./UMeshComponent"
import { FColor } from "../../../objects/core/math/FColor";
import { UProperty } from "../../../../util/decorators/UProperty";
import { Lazy } from "../../../../util/Lazy";
import { FArchive } from "../../../reader/FArchive";
import { VER_UE4_NEW_LIGHTMASS_PRIMITIVE_SETTING } from "../../../versions/Versions";
import { UStaticMesh } from "../UStaticMesh";

export class FStreamingTextureBuildInfo {
    public PackedRelativeBox: number = null
    public TextureLevelIndex: number = null
    public TexelFactor: number = null
}

export class FLightmassPrimitiveSettings {
    public bUseTwoSidedLighting: boolean = null
    public bShadowIndirectOnly: boolean = null
    public bUseEmissiveForStaticLighting: boolean = null
    public bUseVertexNormalForHemisphereGather: boolean = null
    public EmissiveLightFalloffExponent: number = null
    public EmissiveLightExplicitInfluenceRadius: number = null
    public EmissiveBoost: number = null
    public DiffuseBoost: number = null
    public FullyOccludedSamplesFraction: number = null

    constructor(Ar?: FArchive) {
        if (Ar != null) {
            this.bUseTwoSidedLighting = Ar.readBoolean();
            this.bShadowIndirectOnly = Ar.readBoolean();
            this.FullyOccludedSamplesFraction = Ar.readFloat32();
            this.bUseEmissiveForStaticLighting = Ar.readBoolean();
            if (Ar.ver >= VER_UE4_NEW_LIGHTMASS_PRIMITIVE_SETTING) {
                this.bUseVertexNormalForHemisphereGather = Ar.readBoolean();
            }
            this.EmissiveLightFalloffExponent = Ar.readFloat32();
            this.EmissiveLightExplicitInfluenceRadius = Ar.readFloat32();
            this.EmissiveBoost = Ar.readFloat32();
            this.DiffuseBoost = Ar.readFloat32();
        }
    }
}

export class UStaticMeshComponent extends UMeshComponent {
    public ForcedLodModel: number = null
    public PreviousLODLevel: number = null
    public MinLOD: number = null
    public SubDivisionStepSize: number = null
    public StaticMesh: Lazy<UStaticMesh>
    public WireframeColorOverride: FColor = null
    public bEvaluateWorldPositionOffset: boolean = null
    public bOverrideWireframeColor: boolean = null
    public bOverrideMinLod: boolean = null
    public bOverrideNavigationExport: boolean = null
    public bForceNavigationObstacle: boolean = null
    public bDisallowMeshPaintPerInstance: boolean = null
    public bIgnoreInstanceForTextureStreaming: boolean = null
    public bOverrideLightMapRes: boolean = null
    public bCastDistanceFieldIndirectShadow: boolean = null
    public bOverrideDistanceFieldSelfShadowBias: boolean = null
    public bUseSubDivisions: boolean = null
    public bUseDefaultCollision: boolean = null
    public bReverseCulling: boolean = null
    public OverriddenLightMapRes: number = null
    public DistanceFieldIndirectShadowMinVisibility: number = null
    public DistanceFieldSelfShadowBias: number = null
    public StreamingDistanceMultiplier: number = null
    //public List<FStaticMeshComponentLODInfo> LODData = null
    @UProperty({ skipPrevious: 1 })
    public StreamingTextureData: FStreamingTextureBuildInfo[] = null
    public LightmassSettings: FLightmassPrimitiveSettings = null
}