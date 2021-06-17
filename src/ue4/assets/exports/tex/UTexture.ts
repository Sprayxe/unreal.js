import { UStreamableRenderAsset } from "../UStreamableRenderAsset";
import { UUnrealMaterial } from "../mats/UUnrealMaterial";
import { FGuid } from "../../../objects/core/misc/Guid";
import { FPerPlatformFloat } from "../../../objects/engine/PerPlatformProperties";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { CMaterialParams } from "../../../converters/materials/Materials";

export class UTexture extends UStreamableRenderAsset implements UUnrealMaterial {
    public LightingGuid: FGuid
    public LodBias: number
    public CompressionSettings: ETextureCompressionSettings
    public Filter: ETextureFilter
    public MipLoadOptions: ETextureMipLoadOptions
    public LODGroup: ETextureGroup
    public Downscale: FPerPlatformFloat
    public DownscaleOptions: ETextureDownscaleOptions
    public SRGB: boolean
    public bNoTiling: boolean
    public VirtualTextureStreaming: boolean
    public CompressionYCoCg: boolean
    public bNotOfflineProcessed: boolean
    public bAsyncResourceReleaseHasBeenStarted: boolean
    public AssetUserData: FPackageIndex[]

    getParams(params: CMaterialParams) {
        // ???
    }

    getName(): string {
        return this.name
    }

    // no default in typescript interfaces
    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean) {
        const params = new CMaterialParams()
        this.getParams(params)
        params.appendAllTextures(outTextures)
    }

    // no default in typescript interfaces
    isTextureCube() {
        return false
    }
}

export enum ETextureCompressionSettings {
    TC_Default,
    TC_Normalmap,
    TC_Masks,
    TC_Grayscale,
    TC_Displacementmap,
    TC_VectorDisplacementmap,
    TC_HDR,
    TC_EditorIcon,
    TC_Alpha,
    TC_DistanceFieldFont,
    TC_HDR_Compressed,
    TC_BC7,
    TC_HalfFloat
}

export enum ETextureFilter {
    TF_Nearest,
    TF_Bilinear,
    TF_Trilinear,
    TF_Default
}

export enum ETextureMipLoadOptions {
    Default,
    AllMips,
    OnlyFirstMip
}

export enum ETextureGroup {
    TEXTUREGROUP_World,
    TEXTUREGROUP_WorldNormalMap,
    TEXTUREGROUP_WorldSpecular,
    TEXTUREGROUP_Character,
    TEXTUREGROUP_CharacterNormalMap,
    TEXTUREGROUP_CharacterSpecular,
    TEXTUREGROUP_Weapon,
    TEXTUREGROUP_WeaponNormalMap,
    TEXTUREGROUP_WeaponSpecular,
    TEXTUREGROUP_Vehicle,
    TEXTUREGROUP_VehicleNormalMap,
    TEXTUREGROUP_VehicleSpecular,
    TEXTUREGROUP_Cinematic,
    TEXTUREGROUP_Effects,
    TEXTUREGROUP_EffectsNotFiltered,
    TEXTUREGROUP_Skybox,
    TEXTUREGROUP_UI,
    TEXTUREGROUP_Lightmap,
    TEXTUREGROUP_RenderTarget,
    TEXTUREGROUP_MobileFlattened,
    TEXTUREGROUP_ProcBuilding_Face,
    TEXTUREGROUP_ProcBuilding_LightMap,
    TEXTUREGROUP_Shadowmap,
    TEXTUREGROUP_ColorLookupTable,
    TEXTUREGROUP_Terrain_Heightmap,
    TEXTUREGROUP_Terrain_Weightmap,
    TEXTUREGROUP_Bokeh,
    TEXTUREGROUP_IESLightProfile,
    TEXTUREGROUP_Pixels2D,
    TEXTUREGROUP_HierarchicalLOD,
    TEXTUREGROUP_Impostor,
    TEXTUREGROUP_ImpostorNormalDepth,
    TEXTUREGROUP_8BitData,
    TEXTUREGROUP_16BitData,
    TEXTUREGROUP_Project01,
    TEXTUREGROUP_Project02,
    TEXTUREGROUP_Project03,
    TEXTUREGROUP_Project04,
    TEXTUREGROUP_Project05,
    TEXTUREGROUP_Project06,
    TEXTUREGROUP_Project07,
    TEXTUREGROUP_Project08,
    TEXTUREGROUP_Project09,
    TEXTUREGROUP_Project10,
    TEXTUREGROUP_Project11,
    TEXTUREGROUP_Project12,
    TEXTUREGROUP_Project13,
    TEXTUREGROUP_Project14,
    TEXTUREGROUP_Project15
}

export enum ETextureDownscaleOptions {
    Default,
    Unfiltered,
    SimpleAverage,
    Sharpen0,
    Sharpen1,
    Sharpen2,
    Sharpen3,
    Sharpen4,
    Sharpen5,
    Sharpen6,
    Sharpen7,
    Sharpen8,
    Sharpen9,
    Sharpen10
}