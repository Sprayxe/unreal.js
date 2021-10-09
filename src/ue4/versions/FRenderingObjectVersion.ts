import { FGuid } from "../objects/core/misc/Guid";
import { FArchive } from "../reader/FArchive";
import { Game } from "./Game";

export enum EFRenderingObjectVersion {
    // Before any version changes were made
    BeforeCustomVersionWasAdded,

    // Added support for 3 band SH in the ILC
    IndirectLightingCache3BandSupport,

    // Allows specifying resolution for reflection capture probes
    CustomReflectionCaptureResolutionSupport,

    RemovedTextureStreamingLevelData,

    // translucency is now a property which matters for materials with the decal domain
    IntroducedMeshDecals,

    // Reflection captures are no longer prenormalized
    ReflectionCapturesStoreAverageBrightness,

    ChangedPlanarReflectionFadeDefaults,

    RemovedRenderTargetSize,

    // Particle Cutout (SubUVAnimation) data is now stored in the ParticleRequired Module
    MovedParticleCutoutsToRequiredModule,

    MapBuildDataSeparatePackage,

    // StaticMesh and SkeletalMesh texcoord size data.
    TextureStreamingMeshUVChannelData,

    // Added type handling to material normalize and length (sqrt) nodes
    TypeHandlingForMaterialSqrtNodes,

    FixedBSPLightmaps,

    DistanceFieldSelfShadowBias,

    FixedLegacyMaterialAttributeNodeTypes,

    ShaderResourceCodeSharing,

    MotionBlurAndTAASupportInSceneCapture2d,

    AddedTextureRenderTargetFormats,

    // Triggers a rebuild of the mesh UV density while also adding an update in the postedit
    FixedMeshUVDensity,

    AddedbUseShowOnlyList,

    VolumetricLightmaps,

    MaterialAttributeLayerParameters,

    StoreReflectionCaptureBrightnessForCooking,

    // FModelVertexBuffer does serialize a regular TArray instead of a TResourceArray
    ModelVertexBufferSerialization,

    ReplaceLightAsIfStati,

    // Added per FShaderType permutation id.
    ShaderPermutationId,

    // Changed normal precision in imported data
    IncreaseNormalPrecision,

    VirtualTexturedLightmaps,

    GeometryCacheFastDecoder,

    LightmapHasShadowmapData,

    // Removed old gaussian and bokeh DOF methods from deferred shading renderer.
    DiaphragmDOFOnlyForDeferredShadingRenderer,

    // Lightmaps replace ULightMapVirtualTexture (non-UTexture derived class) with ULightMapVirtualTexture2D (derived from UTexture)
    VirtualTexturedLightmapsV2,

    SkyAtmosphereStaticLightingVersioning,

    // UTextureRenderTarget2D now explicitly allows users to create sRGB or non-sRGB type targets
    ExplicitSRGBSetting,

    VolumetricLightmapStreaming,

    //ShaderModel4 support removed from engine
    RemovedSM4,

    // Deterministic ShaderMapID serialization
    MaterialShaderMapIdSerialization,

    // Add force opaque flag for static mesh
    StaticMeshSectionForceOpaqueField,

    // Add force opaque flag for static mesh
    AutoExposureChanges,

    // Removed emulated instancing from instanced static meshes
    RemovedEmulatedInstancing,

    // Added per instance custom data (for Instanced Static Meshes)
    PerInstanceCustomData,

    // Added material attributes to shader graph to support anisotropic materials
    AnisotropicMaterial,

    // Add if anything has changed in the exposure, override the bias to avoid the new default propagating
    AutoExposureForceOverrideBiasFlag,

    // Override for a special case for objects that were serialized and deserialized between versions AutoExposureChanges and AutoExposureForceOverrideBiasFlag
    AutoExposureDefaultFix,

    // Remap Volume Extinction material input to RGB
    VolumeExtinctionBecomesRGB,

    // Add a new virtual texture to support virtual texture light map on mobile
    VirtualTexturedLightmapsV3,

    // -----<new versions can be added above this line>-------------------------------------------------
    LatestVersion = VirtualTexturedLightmapsV3
}

export class FRenderingObjectVersion {
    public static readonly GUID = new FGuid(0x12F88B9F, 0x88754AFC, 0xA67CD90C, 0x383ABD29)

    public static get(Ar: FArchive): number {
        const ver = Ar.customVersion(this.GUID)
        if (ver >= 0)
            return ver
        const game = Ar.game
        if (game < Game.GAME_UE4(12))
            return EFRenderingObjectVersion.BeforeCustomVersionWasAdded
        if (game < Game.GAME_UE4(13))
            return EFRenderingObjectVersion.CustomReflectionCaptureResolutionSupport
        if (game < Game.GAME_UE4(14))
            return EFRenderingObjectVersion.IntroducedMeshDecals
        if (game < Game.GAME_UE4(16))
            return EFRenderingObjectVersion.FixedBSPLightmaps // 4.14 and 4.15
        if (game < Game.GAME_UE4(17))
            return EFRenderingObjectVersion.ShaderResourceCodeSharing
        if (game < Game.GAME_UE4(18))
            return EFRenderingObjectVersion.AddedbUseShowOnlyList
        if (game < Game.GAME_UE4(19))
            return EFRenderingObjectVersion.VolumetricLightmaps
        if (game < Game.GAME_UE4(20))
            return EFRenderingObjectVersion.ShaderPermutationId
        if (game < Game.GAME_UE4(21))
            return EFRenderingObjectVersion.IncreaseNormalPrecision
        if (game < Game.GAME_UE4(23))
            return EFRenderingObjectVersion.VirtualTexturedLightmaps
        if (game < Game.GAME_UE4(24))
            return EFRenderingObjectVersion.GeometryCacheFastDecoder
        if (game < Game.GAME_UE4(25))
            return EFRenderingObjectVersion.MaterialShaderMapIdSerialization
        if (game < Game.GAME_UE4(26))
            return EFRenderingObjectVersion.AutoExposureDefaultFix
        return EFRenderingObjectVersion.LatestVersion
    }
}