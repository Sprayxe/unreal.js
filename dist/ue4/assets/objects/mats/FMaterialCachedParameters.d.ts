import { FMaterialParameterInfo } from "../../exports/mats/UMaterialInstance";
import { FGuid } from "../../../objects/core/misc/Guid";
import { FLinearColor } from "../../../objects/core/math/FColor";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
/**
 * FMaterialCachedParameters
 */
export declare class FMaterialCachedParameters {
    /**
     * Entries
     * @type {Array<FMaterialCachedParameterEntry>}
     * @public
     */
    Entries: FMaterialCachedParameterEntry[];
    /**
     * Scalar values
     * @type {Array<number>}
     * @public
     */
    ScalarValues: number[];
    /**
     * Vector values
     * @type {Array<FLinearColor>}
     * @public
     */
    VectorValues: FLinearColor[];
    /**
     * Texture values
     * @type {Array<FPackageIndex>}
     * @public
     */
    TextureValues: FPackageIndex[];
    /**
     * Font values
     * @type {Array<FPackageIndex>}
     * @public
     */
    FontValues: FPackageIndex;
    /**
     * Font page values
     * @type {Array<number>}
     * @public
     */
    FontPageValues: number[];
    /**
     * Runtime virtual values
     * @type {Array<FPackageIndex>}
     * @public
     */
    RuntimeVirtualTextureValues: FPackageIndex[];
}
/**
 * FMaterialCachedParameterEntry
 */
export declare class FMaterialCachedParameterEntry {
    /**
     * Name hashes
     * @type {Array<number>}
     * @public
     */
    NameHashes: number[];
    /**
     * Parameter infos
     * @type {Array<FMaterialParameterInfo>}
     * @public
     */
    ParameterInfos: FMaterialParameterInfo[];
    /**
     * Expression guids
     * @type {Array<FGuid>}
     * @public
     */
    ExpressionGuids: FGuid[];
    /**
     * Overrides
     * @type {Array<boolean>}
     * @public
     */
    Overrides: boolean[];
}
