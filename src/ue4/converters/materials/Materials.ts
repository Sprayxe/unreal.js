import { UUnrealMaterial } from "../../assets/exports/mats/UUnrealMaterial";
import { FLinearColor } from "../../objects/core/math/FColor";
import { ETextureChannel } from "../../assets/enums/ETextureChannel";
import { EMobileSpecularMask } from "../../assets/enums/EMobileSpecularMask";
import AdmZip from "adm-zip";
import { existsSync, mkdirSync } from "fs";

export class CMaterialParams {
// textures
    public diffuse?: UUnrealMaterial = null
    public normal?: UUnrealMaterial = null
    public specular?: UUnrealMaterial = null
    public specPower?: UUnrealMaterial = null
    public opacity?: UUnrealMaterial = null
    public emissive?: UUnrealMaterial = null
    public cube?: UUnrealMaterial = null
    public mask?: UUnrealMaterial = null         // multiple mask textures baked into a single one
    // channels (used with Mask texture)
    public emissiveChannel: ETextureChannel = ETextureChannel.TC_NONE
    public specularMaskChannel: ETextureChannel = ETextureChannel.TC_NONE
    public specularPowerChannel: ETextureChannel = ETextureChannel.TC_NONE
    public cubemapMaskChannel: ETextureChannel = ETextureChannel.TC_NONE
    // colors
    public emissiveColor : FLinearColor = new FLinearColor(0.5, 0.5, 1.0, 1)       // light-blue color
    // mobile
    public useMobileSpecular: boolean = false
    public mobileSpecularPower: number = 0.0
    public mobileSpecularMask: EMobileSpecularMask = EMobileSpecularMask.MSM_Constant       // EMobileSpecularMask
    // tweaks
    public specularFromAlpha: boolean = false
    public opacityFromAlpha: boolean = false

    constructor(
        diffuse: UUnrealMaterial = null,
        normal: UUnrealMaterial = null,
        specular: UUnrealMaterial = null,
        specPower: UUnrealMaterial = null,
        opacity: UUnrealMaterial = null,
        emissive: UUnrealMaterial = null,
        cube: UUnrealMaterial = null,
        mask: UUnrealMaterial = null,         // multiple mask textures baked into a single one
        // channels (used with Mask texture)
        emissiveChannel: ETextureChannel = ETextureChannel.TC_NONE,
        specularMaskChannel: ETextureChannel = ETextureChannel.TC_NONE,
        specularPowerChannel: ETextureChannel = ETextureChannel.TC_NONE,
        cubemapMaskChannel: ETextureChannel = ETextureChannel.TC_NONE,
        // colors
        emissiveColor : FLinearColor = new FLinearColor(0.5, 0.5, 1.0, 1) ,      // light-blue color
        // mobile
        useMobileSpecular: boolean = false,
        mobileSpecularPower: number = 0.0,
        mobileSpecularMask: EMobileSpecularMask = EMobileSpecularMask.MSM_Constant,       // EMobileSpecularMask
        // tweaks
        specularFromAlpha: boolean = false,
        opacityFromAlpha: boolean = false
    ) {
        this.diffuse = diffuse
        this.normal = normal
        this.specular = specular
        this.specPower = specPower
        this.opacity = opacity
        this.emissive = emissive
        this.cube = cube
        this.mask = mask
        // channels (used with Mask texture)
        this.emissiveChannel = emissiveChannel
        this.specularMaskChannel = specularMaskChannel
        this.specularPowerChannel = specularPowerChannel
        this.cubemapMaskChannel = cubemapMaskChannel
        // colors
        this.emissiveColor = emissiveColor
        // mobile
        this.useMobileSpecular = useMobileSpecular
        this.mobileSpecularPower = mobileSpecularPower
        this.mobileSpecularMask = mobileSpecularMask
        // tweaks
        this.specularFromAlpha = specularFromAlpha
        this.opacityFromAlpha = opacityFromAlpha
    }

    appendAllTextures(outTextures: UUnrealMaterial[]) {
        if (this.diffuse != null) outTextures.push(this.diffuse!!)
        if (this.normal != null) outTextures.push(this.normal!!)
        if (this.specular != null) outTextures.push(this.specular!!)
        if (this.specPower != null) outTextures.push(this.specPower!!)
        if (this.opacity != null) outTextures.push(this.opacity!!)
        if (this.emissive != null) outTextures.push(this.emissive!!)
        if (this.cube != null) outTextures.push(this.cube!!)
        if (this.mask != null) outTextures.push(this.mask!!)
    }

    get isNull() {
        return this.diffuse == null
            && this.normal == null
            && this.specular == null
            && this.specPower == null
            && this.opacity == null
            && this.emissive == null
            && this.cube == null
            && this.mask == null
    }
}

export class MaterialExport {
    public matFileName: string
    public matFile: string
    public textures: {} // Map<string, BufferedImage>
    public parentExport?: MaterialExport

    constructor(
        matFileName: string,
        matFile: string,
        textures: object, // Map<string, BufferedImage>
        parentExport?: MaterialExport
    ) {
        this.matFileName = matFileName
        this.matFile = matFile
        this.textures = textures
        this.parentExport = parentExport
    }

    writeToDir(dir: string): void {
        if (!existsSync(dir))
            mkdirSync(dir)

    }

    appendToZip(zos: AdmZip): void {

    }

    toZip(): /*Buffer*/ void {

    }

    static export(material: UUnrealMaterial) {

    }
}

