import { USceneComponent } from "./USceneComponent";
import { UProperty } from "../../../../util/decorators/UProperty";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { FMulticastScriptDelegate } from "../../../objects/uobject/ScriptDelegates";
import { Lazy } from "../../../../util/Lazy";
import { FLightingChannels } from "../../objects/FLightningChannels";
import { FBodyInstance } from "../../objects/FBodyInstance";
import { AActor } from "../actors/AActor";

export enum ESceneDepthPriorityGroup {
    SDPG_World,
    SDPG_Foreground
}

export enum ELightmapType {
    Default,
    ForceSurface,
    ForceVolumetric
}

export enum EHasCustomNavigableGeometry {
    No,
    Yes,
    EvenIfNotCollidable,
    DontExport
}

export enum ECanBeCharacterBase {
    ECB_No,
    ECB_Yes,
    ECB_Owner
}

export enum ERendererStencilMask {
    ERSM_Default,
    ERSM_255,
    ERSM_1,
    ERSM_2,
    ERSM_4,
    ERSM_8,
    ERSM_16,
    ERSM_32,
    ERSM_64,
    ERSM_128
}

export class UPrimitiveComponent extends USceneComponent {
    public MinDrawDistance: number
    public LDMaxDrawDistance: number = null
    public CachedMaxDrawDistance: number = null
    public DepthPriorityGroup: ESceneDepthPriorityGroup = null
    /*public ESceneDepthPriorityGroup ViewOwnerDepthPriorityGroup = null
    public EIndirectLightingCacheQuality IndirectLightingCacheQuality = null*/
    @UProperty({ skipPrevious: 2 })
    public LightmapType: ELightmapType = null
    public bUseMaxLODAsImposter: boolean = null
    public bBatchImpostersAsInstances: boolean = null
    public bNeverDistanceCull: boolean = null
    public bAlwaysCreatePhysicsState: boolean = null
    public bGenerateOverlapEvents: boolean = null
    public bMultiBodyOverlap: boolean = null
    public bTraceComplexOnMove: boolean = null
    public bReturnMaterialOnMove: boolean = null
    public bUseViewOwnerDepthPriorityGroup: boolean = null
    public bAllowCullDistanceVolume: boolean = null
    public bHasMotionBlurVelocityMeshes: boolean = null
    public bVisibleInReflectionCaptures: boolean = null
    public bVisibleInRealTimeSkyCaptures: boolean = null
    public bVisibleInRayTracing: boolean = null
    public bRenderInMainPass: boolean = null
    public bRenderInDepthPass: boolean = null
    public bReceivesDecals: boolean = null
    public bOwnerNoSee: boolean = null
    public bOnlyOwnerSee: boolean = null
    public bTreatAsBackgroundForOcclusion: boolean = null
    public bUseAsOccluder: boolean = null
    public bSelectable: boolean = null
    public bForceMipStreaming: boolean = null
    public bHasPerInstanceHitProxies: boolean = null
    public CastShadow: boolean = null
    public bAffectDynamicIndirectLighting: boolean = null
    public bAffectDistanceFieldLighting: boolean = null
    public bCastDynamicShadow: boolean = null
    public bCastStaticShadow: boolean = null
    public bCastVolumetricTranslucentShadow: boolean = null
    public bCastContactShadow: boolean = null
    public bSelfShadowOnly: boolean = null
    public bCastFarShadow: boolean = null
    public bCastInsetShadow: boolean = null
    public bCastCinematicShadow: boolean = null
    public bCastHiddenShadow: boolean = null
    public bCastShadowAsTwoSided: boolean = null
    public bLightAsIfStatic: boolean = null
    public bLightAttachmentsAsGroup: boolean = null
    public bExcludeFromLightAttachmentGroup: boolean = null
    public bReceiveMobileCSMShadows: boolean = null
    public bSingleSampleShadowFromStationaryLights: boolean = null
    public bIgnoreRadialImpulse: boolean = null
    public bIgnoreRadialForce: boolean = null
    public bApplyImpulseOnDamage: boolean = null
    public bReplicatePhysicsToAutonomousProxy: boolean = null
    public bFillCollisionUnderneathForNavmesh: boolean = null
    public AlwaysLoadOnClient: boolean = null
    public AlwaysLoadOnServer: boolean = null
    public bUseEditorCompositing: boolean = null
    public bRenderCustomDepth: boolean = null
    public EHasCustomNavigableGeometry = null
    public CanCharacterStepUpOn: ECanBeCharacterBase = null
    public LightingChannels: FLightingChannels = null
    public CustomDepthStencilWriteMask: ERendererStencilMask = null
    public CustomDepthStencilValue: number = null
    /*public FCustomPrimitiveData CustomPrimitiveData = null
    public FCustomPrimitiveData CustomPrimitiveDataInternal = null*/
    @UProperty({ skipPrevious: 2 })
    public TranslucencySortPriority: number = null
    public VisibilityId: number = null
    public RuntimeVirtualTextures: FPackageIndex[] /*RuntimeVirtualTexture[]*/ = null
    public VirtualTextureLodBias: number = null
    public VirtualTextureCullMips: number = null
    public VirtualTextureMinCoverage: number = null
    //public ERuntimeVirtualTextureMainPassType VirtualTextureRenderPassType = null
    @UProperty({ skipPrevious: 1 })
    public LpvBiasMultiplier: number = null
    public BoundsScale: number = null
    public MoveIgnoreActors: Lazy<AActor>[] = null
    public MoveIgnoreComponents: FPackageIndex[] /*PrimitiveComponent[]*/ = null
    public BodyInstance: FBodyInstance = null
    public OnComponentHit: FMulticastScriptDelegate = null
    public OnComponentBeginOverlap: FMulticastScriptDelegate = null
    public OnComponentEndOverlap: FMulticastScriptDelegate = null
    public OnComponentWake: FMulticastScriptDelegate = null
    public OnComponentSleep: FMulticastScriptDelegate = null
    public OnBeginCursorOver: FMulticastScriptDelegate = null
    public OnEndCursorOver: FMulticastScriptDelegate = null
    public OnClicked: FMulticastScriptDelegate = null
    public OnReleased: FMulticastScriptDelegate = null
    public OnInputTouchBegin: FMulticastScriptDelegate = null
    public OnInputTouchEnd: FMulticastScriptDelegate = null
    public OnInputTouchEnter: FMulticastScriptDelegate = null
    public OnInputTouchLeave: FMulticastScriptDelegate = null
    public LODParentPrimitive: Lazy<UPrimitiveComponent> = null
}