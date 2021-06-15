export interface UUnrealMaterial {
    getParams(): void
    isTextureCube(): boolean
    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean): void
    name(): string
}