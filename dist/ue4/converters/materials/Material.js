"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = exports.CMaterialParams = void 0;
const FColor_1 = require("../../objects/core/math/FColor");
const ETextureChannel_1 = require("../../assets/enums/ETextureChannel");
const EMobileSpecularMask_1 = require("../../assets/enums/EMobileSpecularMask");
const adm_zip_1 = __importDefault(require("adm-zip"));
const fs_1 = require("fs");
const collection_1 = __importDefault(require("@discordjs/collection"));
const UMaterialInstanceConstant_1 = require("../../assets/exports/mats/UMaterialInstanceConstant");
const Image_1 = require("../textures/Image");
class CMaterialParams {
    constructor(diffuse = null, normal = null, specular = null, specPower = null, opacity = null, emissive = null, cube = null, mask = null, // multiple mask textures baked into a single one
    // channels (used with Mask texture)
    emissiveChannel = ETextureChannel_1.ETextureChannel.TC_NONE, specularMaskChannel = ETextureChannel_1.ETextureChannel.TC_NONE, specularPowerChannel = ETextureChannel_1.ETextureChannel.TC_NONE, cubemapMaskChannel = ETextureChannel_1.ETextureChannel.TC_NONE, 
    // colors
    emissiveColor = new FColor_1.FLinearColor(0.5, 0.5, 1.0, 1), // light-blue color
    // mobile
    useMobileSpecular = false, mobileSpecularPower = 0.0, mobileSpecularMask = EMobileSpecularMask_1.EMobileSpecularMask.MSM_Constant, // EMobileSpecularMask
    // tweaks
    specularFromAlpha = false, opacityFromAlpha = false) {
        // textures
        this.diffuse = null;
        this.normal = null;
        this.specular = null;
        this.specPower = null;
        this.opacity = null;
        this.emissive = null;
        this.cube = null;
        this.mask = null; // multiple mask textures baked into a single one
        // channels (used with Mask texture)
        this.emissiveChannel = ETextureChannel_1.ETextureChannel.TC_NONE;
        this.specularMaskChannel = ETextureChannel_1.ETextureChannel.TC_NONE;
        this.specularPowerChannel = ETextureChannel_1.ETextureChannel.TC_NONE;
        this.cubemapMaskChannel = ETextureChannel_1.ETextureChannel.TC_NONE;
        // colors
        this.emissiveColor = new FColor_1.FLinearColor(0.5, 0.5, 1.0, 1); // light-blue color
        // mobile
        this.useMobileSpecular = false;
        this.mobileSpecularPower = 0.0;
        this.mobileSpecularMask = EMobileSpecularMask_1.EMobileSpecularMask.MSM_Constant; // EMobileSpecularMask
        // tweaks
        this.specularFromAlpha = false;
        this.opacityFromAlpha = false;
        this.diffuse = diffuse;
        this.normal = normal;
        this.specular = specular;
        this.specPower = specPower;
        this.opacity = opacity;
        this.emissive = emissive;
        this.cube = cube;
        this.mask = mask;
        // channels (used with Mask texture)
        this.emissiveChannel = emissiveChannel;
        this.specularMaskChannel = specularMaskChannel;
        this.specularPowerChannel = specularPowerChannel;
        this.cubemapMaskChannel = cubemapMaskChannel;
        // colors
        this.emissiveColor = emissiveColor;
        // mobile
        this.useMobileSpecular = useMobileSpecular;
        this.mobileSpecularPower = mobileSpecularPower;
        this.mobileSpecularMask = mobileSpecularMask;
        // tweaks
        this.specularFromAlpha = specularFromAlpha;
        this.opacityFromAlpha = opacityFromAlpha;
    }
    appendAllTextures(outTextures) {
        if (this.diffuse != null)
            outTextures.push(this.diffuse);
        if (this.normal != null)
            outTextures.push(this.normal);
        if (this.specular != null)
            outTextures.push(this.specular);
        if (this.specPower != null)
            outTextures.push(this.specPower);
        if (this.opacity != null)
            outTextures.push(this.opacity);
        if (this.emissive != null)
            outTextures.push(this.emissive);
        if (this.cube != null)
            outTextures.push(this.cube);
        if (this.mask != null)
            outTextures.push(this.mask);
    }
    get isNull() {
        return this.diffuse == null
            && this.normal == null
            && this.specular == null
            && this.specPower == null
            && this.opacity == null
            && this.emissive == null
            && this.cube == null
            && this.mask == null;
    }
}
exports.CMaterialParams = CMaterialParams;
class Material {
    constructor(matFileName, matFile, textures, parentExport) {
        this.matFileName = matFileName;
        this.matFile = matFile;
        this.textures = textures;
        this.parentExport = parentExport;
    }
    writeToDir(dir) {
        dir += !dir.endsWith("/") ? "/" : "";
        if (!fs_1.existsSync(dir))
            fs_1.mkdirSync(dir);
        fs_1.writeFileSync(dir + this.matFileName, this.matFile);
        this.textures.forEach((img, name) => {
            const path = dir + name + ".png";
            fs_1.writeFileSync(path, img);
        });
        this.parentExport?.writeToDir(dir);
    }
    appendToZip(zos) {
        zos.addFile(this.matFileName, Buffer.from(this.matFile));
        this.textures.forEach((value, key) => {
            zos.addFile(key + ".png", value);
        });
        this.parentExport?.appendToZip(zos);
    }
    toZip() {
        const zos = new adm_zip_1.default();
        this.appendToZip(zos);
        return zos.toBuffer();
    }
    static convert(material) {
        const allTextures = [];
        material.appendReferencedTextures(allTextures, false);
        const params = new CMaterialParams();
        material.getParams(params);
        if ((params.isNull || params.diffuse === material) && allTextures.length === 0) {
            // empty/unknown material, or material itself is a texture
            return new Material("", "", new collection_1.default(), null);
        }
        const toExport = [];
        let sb = "";
        function proc(name, arg) {
            if (arg != null) {
                sb += `\n${name}=${arg.getName()}`;
                toExport.push(arg);
            }
        }
        proc("Diffuse", params.diffuse);
        proc("Normal", params.normal);
        proc("Specular", params.specular);
        proc("SpecPower", params.specPower);
        proc("Opacity", params.opacity);
        proc("Emissive", params.emissive);
        proc("Cube", params.cube);
        proc("Mask", params.mask);
        const matFile = sb;
        // TODO create a props file like umodel?
        const textures = new collection_1.default();
        for (const obj of toExport) {
            // gotta use this to prevent circular import error
            const prop = Object.getPrototypeOf(obj).constructor?.name;
            if (prop === "UTexture2D" && obj !== material) { // TODO might also work with non-textures, not sure whether that can happen
                try {
                    textures.set(obj.name, Image_1.Image.convert(obj));
                }
                catch (e) {
                    console.warn(`Conversion of texture ${obj.name} failed`);
                }
            }
            else {
                console.warn("Material Export contained an toExport that was not an texture, please report this");
            }
        }
        const parentExport = this instanceof UMaterialInstanceConstant_1.UMaterialInstanceConstant
            ? this.convert(this.Parent?.value)
            : null;
        // TODO TextureCube3 ???
        return new Material(`${material.getName()}.mat`, matFile, textures, parentExport);
    }
}
exports.Material = Material;
