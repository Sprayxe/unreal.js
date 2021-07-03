import { UStreamableRenderAsset } from "../UStreamableRenderAsset";
import { UUnrealMaterial } from "../mats/interfaces/UUnrealMaterial";
import { FGuid } from "../../../objects/core/misc/Guid";
import { FPerPlatformFloat } from "../../../objects/engine/PerPlatformProperties";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { CMaterialParams } from "../../../converters/materials/Material";

/**
 * ETextureCompressionSettings
 * @enum
 */
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

/**
 * ETextureFilter
 * @enum
 */
export enum ETextureFilter {
    TF_Nearest,
    TF_Bilinear,
    TF_Trilinear,
    TF_Default
}

/**
 * ETextureMipLoadOptions
 * @enum
 */
export enum ETextureMipLoadOptions {
    Default,
    AllMips,
    OnlyFirstMip
}

/**
 * ETextureGroup
 * @enum
 */
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

/**
 * ETextureDownscaleOptions
 * @enum
 */
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

/**
 * Represents an UE4 Texture
 * @extends {UStreamableRenderAsset}
 * @implements {UUnrealMaterial}
 */
export class UTexture extends UStreamableRenderAsset implements UUnrealMaterial {
    /**
     * GUID of lighting
     * @type {FGuid}
     * @public
     */
    public LightingGuid: FGuid

    /**
     * Lod bias
     * @type {number}
     * @public
     */
    public LodBias: number

    /**
     * Compression settings of texture
     * @type {ETextureCompressionSettings}
     * @public
     */
    public CompressionSettings: ETextureCompressionSettings

    /**
     * Texture filter
     * @type {ETextureFilter}
     * @public
     */
    public Filter: ETextureFilter

    /**
     * Mip load options
     * @type {ETextureMipLoadOptions}
     * @public
     */
    public MipLoadOptions: ETextureMipLoadOptions

    /**
     * LOD group
     * @type {ETextureGroup}
     * @public
     */
    public LODGroup: ETextureGroup

    /**
     * Texture downscale
     * @type {FPerPlatformFloat}
     * @public
     */
    public Downscale: FPerPlatformFloat

    /**
     * Options of texture downscale
     * @type {ETextureDownscaleOptions}
     * @public
     */
    public DownscaleOptions: ETextureDownscaleOptions

    /**
     * SRGB
     * @type {boolean}
     * @public
     */
    public SRGB: boolean

    /**
     * Wether tilting applies to texture
     * @type {boolean}
     * @public
     */
    public bNoTiling: boolean

    /**
     * Wether this texture is virtually streamed
     * @type {boolean}
     * @public
     */
    public VirtualTextureStreaming: boolean

    /**
     * CompressionYCoCg
     * @type {boolean}
     * @public
     */
    public CompressionYCoCg: boolean

    /**
     * Wether this is not offline processed
     * @type {boolean}
     * @public
     */
    public bNotOfflineProcessed: boolean

    /**
     * Wether an async resource release was started
     * @type {boolean}
     * @public
     */
    public bAsyncResourceReleaseHasBeenStarted: boolean

    /**
     * Asset user data
     * @type {Array<FPackageIndex>}
     * @public
     */
    public AssetUserData: FPackageIndex[]

    /**
     * Gets params
     * @param {CMaterialParams} params Params to modify
     * @returns {void}
     * @public
     */
    getParams(params: CMaterialParams) {
        // ???
    }

    /**
     * Gets name
     * @returns {string}
     * @public
     */
    getName(): string {
        return this.name
    }

    /**
     * Appends textures
     * @param {Array<UUnrealMaterial>} outTextures Array to mofify
     * @param {boolean} onlyRendered Wether only rendered
     * @returns {void}
     * @public
     */
    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean) {
        const params = new CMaterialParams()
        this.getParams(params)
        params.appendAllTextures(outTextures)
    }

    /**
     * Wether is texture cube
     * @returns {boolean}
     * @public
     */
    isTextureCube() {
        return false
    }
}