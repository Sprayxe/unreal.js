import { UMaterialInstance } from "./UMaterialInstance";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { FAssetArchive } from "../../reader/FAssetArchive";
import { CMaterialParams } from "../../../converters/materials/Material";
import { UTexture } from "../tex/UTexture";
import { FLinearColor } from "../../../objects/core/math/FColor";
import { UUnrealMaterial } from "./interfaces/UUnrealMaterial";

/**
 * UMaterialInstanceConstant
 */
export class UMaterialInstanceConstant extends UMaterialInstance {
    /**
     * PhysMaterialMask
     * @type {?FPackageIndex}
     * @public
     */
    public PhysMaterialMask?: FPackageIndex /*PhysicalMaterialMask*/ = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @param {number} validPos Valid position
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)
        Ar.pos = validPos
    }

    /**
     * Gets material params
     * @param {CMaterialParams} params Params to load
     * @returns {void}
     * @public
     */
    getParams(params: CMaterialParams) {
        // get params from linked UMaterial3
        const parent = this.Parent?.value
        if (parent != null && parent !== this)
            parent.getParams(params)

        super.getParams(params)

        // get local parameters
        let diffWeight = 0
        let normWeight = 0
        let specWeight = 0
        let specPowWeight = 0
        let opWeight = 0
        let emWeight = 0
        let emcWeight = 0
        let cubeWeight = 0
        let maskWeight = 0

        function diffuse(check: boolean, weight: number, tex: UTexture) {
            if (check && weight > diffWeight) {
                params.diffuse = tex
                diffWeight = weight
            }
        }

        function normal(check: boolean, weight: number, tex: UTexture) {
            if (check && weight > normWeight) {
                params.normal = tex
                normWeight = weight
            }
        }

        function specular(check: boolean, weight: number, tex: UTexture) {
            if (check && weight > specWeight) {
                params.specular = tex
                specWeight = weight
            }
        }

        function specPow(check: boolean, weight: number, tex: UTexture) {
            if (check && weight > specPowWeight) {
                params.specPower = tex
                specPowWeight = weight
            }
        }

        function opacity(check: boolean, weight: number, tex: UTexture) {
            if (check && weight > opWeight) {
                params.opacity = tex
                opWeight = weight
            }
        }

        function emissive(check: boolean, weight: number, tex: UTexture) {
            if (check && weight > emWeight) {
                params.emissive = tex
                emWeight = weight
            }
        }

        function cubeMap(check: boolean, weight: number, tex: UTexture) {
            if (check && weight > cubeWeight) {
                params.cube = tex
                cubeWeight = weight
            }
        }

        function bakedMask(check: boolean, weight: number, tex: UTexture) {
            if (check && weight > maskWeight) {
                params.mask = tex
                maskWeight = weight
            }
        }

        function emissiveColor(check: boolean, weight: number, color: FLinearColor) {
            if (check && weight > emcWeight) {
                params.emissiveColor = color
                emcWeight = weight
            }
        }

        if (this.TextureParameterValues.length)
            params.opacity = null                   // it's better to disable opacity mask from parent material

        for (const p of this.TextureParameterValues) {
            const name = p.ParameterInfo.Name.text.toLowerCase()
            const tex = p.ParameterValue?.value
            if (!tex)
                continue

            if (name.includes("detail")) continue     // details normal etc

            diffuse(name.includes("dif"), 100, tex)
            diffuse(name.includes("albedo"), 100, tex)
            diffuse(name.includes("color"), 80, tex)
            normal(name.includes("norm") && !name.includes("fx"), 100, tex)
            specPow(name.includes("specpow"), 100, tex)
            specular(name.includes("spec"), 100, tex)
            emissive(name.includes("emiss"), 100, tex)
            cubeMap(name.includes("cube"), 100, tex)
            cubeMap(name.includes("refl"), 90, tex)
            opacity(name.includes("opac"), 90, tex)
            opacity(name.includes("trans") && !name.includes("transm"), 80, tex)
            opacity(name.includes("opacity"), 100, tex)
            opacity(name.includes("alpha"), 100, tex)
        }

        for (const p of this.VectorParameterValues) {
            const name = p.ParameterInfo.Name.text.toLowerCase()
            const color = p.ParameterValue
            if (!color)
                continue
            emissiveColor(name.includes("Emissive"), 100, color)
        }

        // try to get diffuse texture when nothing found
        if (params.diffuse == null && this.TextureParameterValues.length === 1)
            params.diffuse = this.TextureParameterValues[0].ParameterValue?.value
    }

    /**
     * Appends textures
     * @param {Array<UUnrealMaterial>} outTextures Array to modify
     * @param {boolean} onlyRendered Whether only rendered
     * @returns {void}
     * @public
     */
    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean) {
        if (onlyRendered) {
            super.appendReferencedTextures(outTextures, true)
        } else {
            for (const value of this.TextureParameterValues) {
                const tex = value.ParameterValue?.value
                if (tex != null && !outTextures.includes(tex))
                    outTextures.push(tex)
            }
            const parent = this.Parent?.value
            if (parent != null && parent !== this) parent.appendReferencedTextures(outTextures, onlyRendered)
        }
    }
}