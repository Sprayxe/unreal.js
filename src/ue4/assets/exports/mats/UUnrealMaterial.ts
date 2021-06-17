import { CMaterialParams } from "../../../converters/materials/Materials";

export interface UUnrealMaterial {
    getParams(params: CMaterialParams): void
    isTextureCube(): boolean
    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean): void
    getName(): string
}