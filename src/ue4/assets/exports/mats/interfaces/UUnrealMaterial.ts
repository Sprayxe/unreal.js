import { CMaterialParams } from "../../../../converters/materials/Material";

/**
 * UUnrealMaterial
 */
export interface UUnrealMaterial {
    /**
     * Gets unreal material params
     * @param {CMaterialParams} params Material params
     * @returns {void}
     * @public
     */
    getParams(params: CMaterialParams): void

    /**
     * Whether this is a texture cube
     * @returns {boolean}
     * @public
     */
    isTextureCube(): boolean

    /**
     * Appends textures
     * @param {Array<UUnrealMaterial>} outTextures Texture array which will be modified
     * @param {boolean} onlyRendered Whether only rendered textures
     * @returns {void}
     * @public
     */
    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean): void

    /**
     * Gets name
     * @returns {string}
     * @public
     */
    getName(): string
}