import { UMaterialInstance } from "./UMaterialInstance";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { FAssetArchive } from "../../reader/FAssetArchive";
import { CMaterialParams } from "../../../converters/materials/Material";
import { UUnrealMaterial } from "./interfaces/UUnrealMaterial";
/**
 * UMaterialInstanceConstant
 */
export declare class UMaterialInstanceConstant extends UMaterialInstance {
    /**
     * PhysMaterialMask
     * @type {?FPackageIndex}
     * @public
     */
    PhysMaterialMask?: FPackageIndex;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @param {number} validPos Valid position
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
    /**
     * Gets material params
     * @param {CMaterialParams} params Params to load
     * @returns {void}
     * @public
     */
    getParams(params: CMaterialParams): void;
    /**
     * Appends textures
     * @param {Array<UUnrealMaterial>} outTextures Array to modify
     * @param {boolean} onlyRendered Whether only rendered
     * @returns {void}
     * @public
     */
    appendReferencedTextures(outTextures: UUnrealMaterial[], onlyRendered: boolean): void;
}
