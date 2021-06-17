import { UUnrealMaterial } from "../../assets/exports/mats/UUnrealMaterial";
import { FLinearColor } from "../../objects/core/math/FColor";
import { ETextureChannel } from "../../assets/enums/ETextureChannel";
import { EMobileSpecularMask } from "../../assets/enums/EMobileSpecularMask";
import AdmZip from "adm-zip";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import Collection from "@discordjs/collection";
import { UTexture2D } from "../../assets/exports/tex/UTexture2D";

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
    public textures: Collection<string, Buffer>
    public parentExport?: MaterialExport

    constructor(
        matFileName: string,
        matFile: string,
        textures: Collection<string, Buffer>,
        parentExport?: MaterialExport
    ) {
        this.matFileName = matFileName
        this.matFile = matFile
        this.textures = textures
        this.parentExport = parentExport
    }

    writeToDir(dir: string): void {
        dir += !dir.endsWith("/") ? "/" : ""
        if (!existsSync(dir))
            mkdirSync(dir)
        writeFileSync(dir + this.matFileName, this.matFile)
        this.textures.forEach((img, name) => {
            const path = dir + name + ".png"
            writeFileSync(path, img)
        })
        this.parentExport?.writeToDir(dir)
    }

    appendToZip(zos: AdmZip): void {
        zos.addFile(this.matFileName, Buffer.from(this.matFile))
        this.textures.forEach((value, key) => {
            zos.addFile(key + ".png", value)
        })
        this.parentExport?.appendToZip(zos)
    }

    toZip(): Buffer {
        const zos = new AdmZip()
        this.appendToZip(zos)
        return zos.toBuffer()
    }

    static export(material: UUnrealMaterial) {
        const allTextures = []
        material.appendReferencedTextures(allTextures, false)

        const params = new CMaterialParams()
        material.getParams(params)
        if ((params.isNull || params.diffuse === material) && allTextures.length === 0) {
            // empty/unknown material, or material itself is a texture
            return new MaterialExport("", "", new Collection(), null)
        }

        const toExport = []
        let sb = ""
        function proc(name: string, arg?: UUnrealMaterial) {
            if (arg != null) {
                sb += `\n${name}=${arg.getName()}`
                toExport.push(arg)
            }
        }

        proc("Diffuse", params.diffuse)
        proc("Normal", params.normal)
        proc("Specular", params.specular)
        proc("SpecPower", params.specPower)
        proc("Opacity", params.opacity)
        proc("Emissive", params.emissive)
        proc("Cube", params.cube)
        proc("Mask", params.mask)

        const matFile = sb

        // TODO create a props file like umodel?

        const textures = new Collection<string, Buffer>()
        for (const obj of toExport) {
            if (obj instanceof UTexture2D && obj !== material) { //TODO might also work with non-textures, not sure whether that can happen
                try {
                    // TODO textures.set(obj.name, obj.toBufferedImage())
                } catch (e) {
                    console.warn(`Conversion of texture ${obj.name} failed`)
                }
            } else {
                console.warn("Material Export contained an toExport that was not an texture, please report this")
            }
        }

        // TODO val parentExport = if (this is UMaterialInstanceConstant) {
        //         Parent?.value?.export()
        //     } else null
        // TODO TextureCube3 ???

        return new MaterialExport(`${material.getName()}.mat`, matFile, textures/* TODO, parentExport*/)
    }
}

