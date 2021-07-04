/// <reference types="node" />
/// <reference types="ref-napi" />
import { UUnrealMaterial } from "../../assets/exports/mats/interfaces/UUnrealMaterial";
import { FLinearColor } from "../../objects/core/math/FColor";
import { ETextureChannel } from "../../assets/enums/ETextureChannel";
import { EMobileSpecularMask } from "../../assets/enums/EMobileSpecularMask";
import AdmZip from "adm-zip";
import Collection from "@discordjs/collection";
export declare class CMaterialParams {
    diffuse?: UUnrealMaterial;
    normal?: UUnrealMaterial;
    specular?: UUnrealMaterial;
    specPower?: UUnrealMaterial;
    opacity?: UUnrealMaterial;
    emissive?: UUnrealMaterial;
    cube?: UUnrealMaterial;
    mask?: UUnrealMaterial;
    emissiveChannel: ETextureChannel;
    specularMaskChannel: ETextureChannel;
    specularPowerChannel: ETextureChannel;
    cubemapMaskChannel: ETextureChannel;
    emissiveColor: FLinearColor;
    useMobileSpecular: boolean;
    mobileSpecularPower: number;
    mobileSpecularMask: EMobileSpecularMask;
    specularFromAlpha: boolean;
    opacityFromAlpha: boolean;
    constructor(diffuse?: UUnrealMaterial, normal?: UUnrealMaterial, specular?: UUnrealMaterial, specPower?: UUnrealMaterial, opacity?: UUnrealMaterial, emissive?: UUnrealMaterial, cube?: UUnrealMaterial, mask?: UUnrealMaterial, // multiple mask textures baked into a single one
    emissiveChannel?: ETextureChannel, specularMaskChannel?: ETextureChannel, specularPowerChannel?: ETextureChannel, cubemapMaskChannel?: ETextureChannel, emissiveColor?: FLinearColor, // light-blue color
    useMobileSpecular?: boolean, mobileSpecularPower?: number, mobileSpecularMask?: EMobileSpecularMask, // EMobileSpecularMask
    specularFromAlpha?: boolean, opacityFromAlpha?: boolean);
    appendAllTextures(outTextures: UUnrealMaterial[]): void;
    get isNull(): boolean;
}
export declare class Material {
    matFileName: string;
    matFile: string;
    textures: Collection<string, Buffer>;
    parentExport?: Material;
    constructor(matFileName: string, matFile: string, textures: Collection<string, Buffer>, parentExport?: Material);
    writeToDir(dir: string): void;
    appendToZip(zos: AdmZip): void;
    toZip(): Buffer;
    static convert(material: UUnrealMaterial): any;
}
