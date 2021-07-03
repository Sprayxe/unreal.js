import { UObject } from "../UObject";
import { UUnrealMaterial } from "./interfaces/UUnrealMaterial";
import { UProperty } from "../../../../util/decorators/UProperty";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { FName } from "../../../objects/uobject/FName";
import { UTexture } from "../tex/UTexture";
import { EMobileSpecularMask } from "../../enums/EMobileSpecularMask";
import { CMaterialParams } from "../../../converters/materials/Material";

/**
 * FLightmassMaterialInterfaceSettings
 */
export class FLightmassMaterialInterfaceSettings {
    /**
     * EmissiveBoost
     * @type {?number}
     * @public
     */
    public EmissiveBoost?: number = null

    /**
     * DiffuseBoost
     * @type {?number}
     * @public
     */
    public DiffuseBoost?: number = null

    /**
     * ExportResolutionScale
     * @type {?number}
     * @public
     */
    public ExportResolutionScale?: number = null

    /**
     * bCastShadowAsMasked
     * @type {?number}
     * @public
     */
    public bCastShadowAsMasked?: boolean = null

    /**
     * bOverrideCastShadowAsMasked
     * @type {?number}
     * @public
     */
    public bOverrideCastShadowAsMasked?: boolean = null

    /**
     * bOverrideEmissiveBoost
     * @type {?number}
     * @public
     */
    public bOverrideEmissiveBoost?: boolean = null

    /**
     * bOverrideDiffuseBoost
     * @type {?number}
     * @public
     */
    public bOverrideDiffuseBoost?: boolean = null

    /**
     * bOverrideExportResolutionScale
     * @type {?number}
     * @public
     */
    public bOverrideExportResolutionScale?: boolean = null
}

/**
 * FMaterialTextureInfo
 */
export class FMaterialTextureInfo {
    /**
     * SamplingScale
     * @type {?number}
     * @public
     */
    public SamplingScale?: number = null

    /**
     * UVChannelIndex
     * @type {?number}
     * @public
     */
    public UVChannelIndex?: number = null

    /**
     * TextureName
     * @type {FName}
     * @public
     */
    public TextureName: FName = null
}

/**
 * UMaterialInterface
 * @extends {UObject}
 * @implements {UUnrealMaterial}
 */
export class UMaterialInterface extends UObject implements UUnrealMaterial {
    /**
     * SubsurfaceProfile
     * @type {?FPackageIndex}
     * @public
     */
    @UProperty() public SubsurfaceProfile?: FPackageIndex = null /*SubsurfaceProfile*/

    /**
     * LightmassSettings
     * @type {?FLightmassMaterialInterfaceSettings}
     * @public
     */
    @UProperty() public LightmassSettings?: FLightmassMaterialInterfaceSettings = null

    /**
     * TextureStreamingData
     * @type {?Array<FMaterialTextureInfo>}
     * @public
     */
    @UProperty() public TextureStreamingData?: FMaterialTextureInfo[] = null

    /**
     * AssetUserData
     * @type {?Array<FPackageIndex>}
     * @public
     */
    @UProperty() public AssetUserData?: FPackageIndex[] = null

    // Not sure if these are in UE4
    /**
     * FlattenedTexture
     * @type {?UTexture}
     * @public
     */
    public FlattenedTexture?: UTexture = null

    /**
     * MobileBaseTexture
     * @type {?UTexture}
     * @public
     */
    public MobileBaseTexture?: UTexture = null

    /**
     * MobileNormalTexture
     * @type {?UTexture}
     * @public
     */
    public MobileNormalTexture?: UTexture = null

    /**
     * bUseMobileSpecular
     * @type {boolean}
     * @public
     */
    public bUseMobileSpecular: boolean = false

    /**
     * MobileSpecularPower
     * @type {number}
     * @public
     */
    public MobileSpecularPower: number = 16.0

    /**
     * MobileSpecularMask
     * @type {EMobileSpecularMask}
     * @public
     */
    public MobileSpecularMask: EMobileSpecularMask = EMobileSpecularMask.MSM_Constant

    /**
     * MobileMaskTexture
     * @type {?UTexture}
     * @public
     */
    public MobileMaskTexture?: UTexture = null

    /**
     * Gets params
     * @param {CMaterialParams} params Params to modify
     * @returns {void}
     * @public
     */
    getParams(params: CMaterialParams) {
        if (this.FlattenedTexture != null) params.diffuse = this.FlattenedTexture
        if (this.MobileBaseTexture != null) params.diffuse = this.FlattenedTexture
        if (this.MobileNormalTexture != null) params.normal = this.MobileNormalTexture
        if (this.MobileMaskTexture != null) params.opacity = this.MobileMaskTexture
        params.useMobileSpecular = this.bUseMobileSpecular
        params.mobileSpecularPower = this.MobileSpecularPower
        params.mobileSpecularMask = this.MobileSpecularMask
    }

    /**
     * Gets name
     * @returns {string}
     * @public
     */
    getName(): string {
        return this.name
    }

    // No default in typescript interfaces
    /**
     * Wether this is texture cube
     * @returns {boolean}
     * @public
     */
    isTextureCube(): boolean {
        return false
    }

    /**
     * Appends textures
     * @param {Array<UUnrealMaterial>} outTextures Textures to modify
     * @param {boolean} onlyRendered Wether only rendered
     * @returns {void}
     * @public
     */
    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean) {
    }
}