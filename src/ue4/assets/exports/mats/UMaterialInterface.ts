import { UObject } from "../UObject";
import { UUnrealMaterial } from "./interfaces/UUnrealMaterial";
import { UProperty } from "../../../../util/decorators/UProperty";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { FName } from "../../../objects/uobject/FName";
import { UTexture } from "../tex/UTexture";
import { EMobileSpecularMask } from "../../enums/EMobileSpecularMask";
import { CMaterialParams } from "../../../converters/materials/Material";

export class FLightmassMaterialInterfaceSettings {
    public EmissiveBoost?: number = null
    public DiffuseBoost?: number = null
    public ExportResolutionScale?: number = null
    public bCastShadowAsMasked?: boolean = null
    public bOverrideCastShadowAsMasked?: boolean = null
    public bOverrideEmissiveBoost?: boolean = null
    public bOverrideDiffuseBoost?: boolean = null
    public bOverrideExportResolutionScale?: boolean = null
}

export class FMaterialTextureInfo {
    public SamplingScale?: number = null
    public UVChannelIndex?: number = null
    public TextureName: FName = null
}

export class UMaterialInterface extends UObject implements UUnrealMaterial {
    @UProperty() public SubsurfaceProfile?: FPackageIndex = null /*SubsurfaceProfile*/
    @UProperty() public LightmassSettings?: FLightmassMaterialInterfaceSettings = null
    @UProperty() public TextureStreamingData?: FMaterialTextureInfo[] = null
    @UProperty() public AssetUserData?: FPackageIndex[] = null

    // Not sure if these are in UE4
    public FlattenedTexture?: UTexture = null
    public MobileBaseTexture?: UTexture = null
    public MobileNormalTexture?: UTexture = null
    public bUseMobileSpecular: boolean = false
    public MobileSpecularPower: number = 16.0
    public MobileSpecularMask: EMobileSpecularMask = EMobileSpecularMask.MSM_Constant
    public MobileMaskTexture?: UTexture = null

    getParams(params: CMaterialParams) {
        if (this.FlattenedTexture != null) params.diffuse = this.FlattenedTexture
        if (this.MobileBaseTexture != null) params.diffuse = this.FlattenedTexture
        if (this.MobileNormalTexture != null) params.normal = this.MobileNormalTexture
        if (this.MobileMaskTexture != null) params.opacity = this.MobileMaskTexture
        params.useMobileSpecular = this.bUseMobileSpecular
        params.mobileSpecularPower = this.MobileSpecularPower
        params.mobileSpecularMask = this.MobileSpecularMask
    }

    getName(): string {
        return this.name
    }

    // No default in typescript interfaces
    isTextureCube(): boolean {
        return false
    }
    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean) {
    }
}