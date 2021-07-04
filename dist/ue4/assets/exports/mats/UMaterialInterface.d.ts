import { UObject } from "../UObject";
import { UUnrealMaterial } from "./interfaces/UUnrealMaterial";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { FName } from "../../../objects/uobject/FName";
import { UTexture } from "../tex/UTexture";
import { EMobileSpecularMask } from "../../enums/EMobileSpecularMask";
import { CMaterialParams } from "../../../converters/materials/Material";
/**
 * FLightmassMaterialInterfaceSettings
 */
export declare class FLightmassMaterialInterfaceSettings {
    /**
     * EmissiveBoost
     * @type {?number}
     * @public
     */
    EmissiveBoost?: number;
    /**
     * DiffuseBoost
     * @type {?number}
     * @public
     */
    DiffuseBoost?: number;
    /**
     * ExportResolutionScale
     * @type {?number}
     * @public
     */
    ExportResolutionScale?: number;
    /**
     * bCastShadowAsMasked
     * @type {?number}
     * @public
     */
    bCastShadowAsMasked?: boolean;
    /**
     * bOverrideCastShadowAsMasked
     * @type {?number}
     * @public
     */
    bOverrideCastShadowAsMasked?: boolean;
    /**
     * bOverrideEmissiveBoost
     * @type {?number}
     * @public
     */
    bOverrideEmissiveBoost?: boolean;
    /**
     * bOverrideDiffuseBoost
     * @type {?number}
     * @public
     */
    bOverrideDiffuseBoost?: boolean;
    /**
     * bOverrideExportResolutionScale
     * @type {?number}
     * @public
     */
    bOverrideExportResolutionScale?: boolean;
}
/**
 * FMaterialTextureInfo
 */
export declare class FMaterialTextureInfo {
    /**
     * SamplingScale
     * @type {?number}
     * @public
     */
    SamplingScale?: number;
    /**
     * UVChannelIndex
     * @type {?number}
     * @public
     */
    UVChannelIndex?: number;
    /**
     * TextureName
     * @type {FName}
     * @public
     */
    TextureName: FName;
}
/**
 * UMaterialInterface
 * @extends {UObject}
 * @implements {UUnrealMaterial}
 */
export declare class UMaterialInterface extends UObject implements UUnrealMaterial {
    /**
     * SubsurfaceProfile
     * @type {?FPackageIndex}
     * @public
     */
    SubsurfaceProfile?: FPackageIndex;
    /**
     * LightmassSettings
     * @type {?FLightmassMaterialInterfaceSettings}
     * @public
     */
    LightmassSettings?: FLightmassMaterialInterfaceSettings;
    /**
     * TextureStreamingData
     * @type {?Array<FMaterialTextureInfo>}
     * @public
     */
    TextureStreamingData?: FMaterialTextureInfo[];
    /**
     * AssetUserData
     * @type {?Array<FPackageIndex>}
     * @public
     */
    AssetUserData?: FPackageIndex[];
    /**
     * FlattenedTexture
     * @type {?UTexture}
     * @public
     */
    FlattenedTexture?: UTexture;
    /**
     * MobileBaseTexture
     * @type {?UTexture}
     * @public
     */
    MobileBaseTexture?: UTexture;
    /**
     * MobileNormalTexture
     * @type {?UTexture}
     * @public
     */
    MobileNormalTexture?: UTexture;
    /**
     * bUseMobileSpecular
     * @type {boolean}
     * @public
     */
    bUseMobileSpecular: boolean;
    /**
     * MobileSpecularPower
     * @type {number}
     * @public
     */
    MobileSpecularPower: number;
    /**
     * MobileSpecularMask
     * @type {EMobileSpecularMask}
     * @public
     */
    MobileSpecularMask: EMobileSpecularMask;
    /**
     * MobileMaskTexture
     * @type {?UTexture}
     * @public
     */
    MobileMaskTexture?: UTexture;
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
     * Whether this is texture cube
     * @returns {boolean}
     * @public
     */
    isTextureCube(): boolean;
    /**
     * Appends textures
     * @param {Array<UUnrealMaterial>} outTextures Textures to modify
     * @param {boolean} onlyRendered Whether only rendered
     * @returns {void}
     * @public
     */
    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean): void;
}
