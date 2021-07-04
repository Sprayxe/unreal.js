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
export declare enum ETextureCompressionSettings {
    TC_Default = 0,
    TC_Normalmap = 1,
    TC_Masks = 2,
    TC_Grayscale = 3,
    TC_Displacementmap = 4,
    TC_VectorDisplacementmap = 5,
    TC_HDR = 6,
    TC_EditorIcon = 7,
    TC_Alpha = 8,
    TC_DistanceFieldFont = 9,
    TC_HDR_Compressed = 10,
    TC_BC7 = 11,
    TC_HalfFloat = 12
}
/**
 * ETextureFilter
 * @enum
 */
export declare enum ETextureFilter {
    TF_Nearest = 0,
    TF_Bilinear = 1,
    TF_Trilinear = 2,
    TF_Default = 3
}
/**
 * ETextureMipLoadOptions
 * @enum
 */
export declare enum ETextureMipLoadOptions {
    Default = 0,
    AllMips = 1,
    OnlyFirstMip = 2
}
/**
 * ETextureGroup
 * @enum
 */
export declare enum ETextureGroup {
    TEXTUREGROUP_World = 0,
    TEXTUREGROUP_WorldNormalMap = 1,
    TEXTUREGROUP_WorldSpecular = 2,
    TEXTUREGROUP_Character = 3,
    TEXTUREGROUP_CharacterNormalMap = 4,
    TEXTUREGROUP_CharacterSpecular = 5,
    TEXTUREGROUP_Weapon = 6,
    TEXTUREGROUP_WeaponNormalMap = 7,
    TEXTUREGROUP_WeaponSpecular = 8,
    TEXTUREGROUP_Vehicle = 9,
    TEXTUREGROUP_VehicleNormalMap = 10,
    TEXTUREGROUP_VehicleSpecular = 11,
    TEXTUREGROUP_Cinematic = 12,
    TEXTUREGROUP_Effects = 13,
    TEXTUREGROUP_EffectsNotFiltered = 14,
    TEXTUREGROUP_Skybox = 15,
    TEXTUREGROUP_UI = 16,
    TEXTUREGROUP_Lightmap = 17,
    TEXTUREGROUP_RenderTarget = 18,
    TEXTUREGROUP_MobileFlattened = 19,
    TEXTUREGROUP_ProcBuilding_Face = 20,
    TEXTUREGROUP_ProcBuilding_LightMap = 21,
    TEXTUREGROUP_Shadowmap = 22,
    TEXTUREGROUP_ColorLookupTable = 23,
    TEXTUREGROUP_Terrain_Heightmap = 24,
    TEXTUREGROUP_Terrain_Weightmap = 25,
    TEXTUREGROUP_Bokeh = 26,
    TEXTUREGROUP_IESLightProfile = 27,
    TEXTUREGROUP_Pixels2D = 28,
    TEXTUREGROUP_HierarchicalLOD = 29,
    TEXTUREGROUP_Impostor = 30,
    TEXTUREGROUP_ImpostorNormalDepth = 31,
    TEXTUREGROUP_8BitData = 32,
    TEXTUREGROUP_16BitData = 33,
    TEXTUREGROUP_Project01 = 34,
    TEXTUREGROUP_Project02 = 35,
    TEXTUREGROUP_Project03 = 36,
    TEXTUREGROUP_Project04 = 37,
    TEXTUREGROUP_Project05 = 38,
    TEXTUREGROUP_Project06 = 39,
    TEXTUREGROUP_Project07 = 40,
    TEXTUREGROUP_Project08 = 41,
    TEXTUREGROUP_Project09 = 42,
    TEXTUREGROUP_Project10 = 43,
    TEXTUREGROUP_Project11 = 44,
    TEXTUREGROUP_Project12 = 45,
    TEXTUREGROUP_Project13 = 46,
    TEXTUREGROUP_Project14 = 47,
    TEXTUREGROUP_Project15 = 48
}
/**
 * ETextureDownscaleOptions
 * @enum
 */
export declare enum ETextureDownscaleOptions {
    Default = 0,
    Unfiltered = 1,
    SimpleAverage = 2,
    Sharpen0 = 3,
    Sharpen1 = 4,
    Sharpen2 = 5,
    Sharpen3 = 6,
    Sharpen4 = 7,
    Sharpen5 = 8,
    Sharpen6 = 9,
    Sharpen7 = 10,
    Sharpen8 = 11,
    Sharpen9 = 12,
    Sharpen10 = 13
}
/**
 * Represents an UE4 Texture
 * @extends {UStreamableRenderAsset}
 * @implements {UUnrealMaterial}
 */
export declare class UTexture extends UStreamableRenderAsset implements UUnrealMaterial {
    /**
     * GUID of lighting
     * @type {FGuid}
     * @public
     */
    LightingGuid: FGuid;
    /**
     * Lod bias
     * @type {number}
     * @public
     */
    LodBias: number;
    /**
     * Compression settings of texture
     * @type {ETextureCompressionSettings}
     * @public
     */
    CompressionSettings: ETextureCompressionSettings;
    /**
     * Texture filter
     * @type {ETextureFilter}
     * @public
     */
    Filter: ETextureFilter;
    /**
     * Mip load options
     * @type {ETextureMipLoadOptions}
     * @public
     */
    MipLoadOptions: ETextureMipLoadOptions;
    /**
     * LOD group
     * @type {ETextureGroup}
     * @public
     */
    LODGroup: ETextureGroup;
    /**
     * Texture downscale
     * @type {FPerPlatformFloat}
     * @public
     */
    Downscale: FPerPlatformFloat;
    /**
     * Options of texture downscale
     * @type {ETextureDownscaleOptions}
     * @public
     */
    DownscaleOptions: ETextureDownscaleOptions;
    /**
     * SRGB
     * @type {boolean}
     * @public
     */
    SRGB: boolean;
    /**
     * Whether tilting applies to texture
     * @type {boolean}
     * @public
     */
    bNoTiling: boolean;
    /**
     * Whether this texture is virtually streamed
     * @type {boolean}
     * @public
     */
    VirtualTextureStreaming: boolean;
    /**
     * CompressionYCoCg
     * @type {boolean}
     * @public
     */
    CompressionYCoCg: boolean;
    /**
     * Whether this is not offline processed
     * @type {boolean}
     * @public
     */
    bNotOfflineProcessed: boolean;
    /**
     * Whether an async resource release was started
     * @type {boolean}
     * @public
     */
    bAsyncResourceReleaseHasBeenStarted: boolean;
    /**
     * Asset user data
     * @type {Array<FPackageIndex>}
     * @public
     */
    AssetUserData: FPackageIndex[];
    /**
     * Gets params
     * @param {CMaterialParams} params Params to modify
     * @returns {void}
     * @public
     */
    getParams(params: CMaterialParams): void;
    /**
     * Gets name
     * @returns {string}
     * @public
     */
    getName(): string;
    /**
     * Appends textures
     * @param {Array<UUnrealMaterial>} outTextures Array to mofify
     * @param {boolean} onlyRendered Whether only rendered
     * @returns {void}
     * @public
     */
    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean): void;
    /**
     * Whether is texture cube
     * @returns {boolean}
     * @public
     */
    isTextureCube(): boolean;
}
