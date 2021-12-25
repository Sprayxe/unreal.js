import { FMaterialParameterInfo } from "../../exports/mats/UMaterialInstance";
import { FGuid } from "../../../objects/core/misc/Guid";
import { UProperty } from "../../../../util/decorators/UProperty";
import { FLinearColor } from "../../../objects/core/math/FColor";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";

/**
 * FMaterialCachedParameters
 */
export class FMaterialCachedParameters {
    /**
     * Entries
     * @type {Array<FMaterialCachedParameterEntry>}
     * @public
     */
    @UProperty({ arrayDim: 5 })
    public Entries: FMaterialCachedParameterEntry[]

    /**
     * Scalar values
     * @type {Array<number>}
     * @public
     */
    public ScalarValues: number[]

    /**
     * Vector values
     * @type {Array<FLinearColor>}
     * @public
     */
    public VectorValues: FLinearColor[]

    /**
     * Texture values
     * @type {Array<FPackageIndex>}
     * @public
     */
    public TextureValues: FPackageIndex[] /*Texture[]*/

    /**
     * Font values
     * @type {Array<FPackageIndex>}
     * @public
     */
    public FontValues: FPackageIndex /*Font[]*/

    /**
     * Font page values
     * @type {Array<number>}
     * @public
     */
    public FontPageValues: number[]

    /**
     * Runtime virtual values
     * @type {Array<FPackageIndex>}
     * @public
     */
    public RuntimeVirtualTextureValues: FPackageIndex[] /*RuntimeVirtualTexture*/
}

/**
 * FMaterialCachedParameterEntry
 */
export class FMaterialCachedParameterEntry {
    /**
     * Name hashes
     * @type {Array<number>}
     * @public
     */
    public NameHashes: number[]

    /**
     * Parameter infos
     * @type {Array<FMaterialParameterInfo>}
     * @public
     */
    public ParameterInfos: FMaterialParameterInfo[]

    /**
     * Expression guids
     * @type {Array<FGuid>}
     * @public
     */
    public ExpressionGuids: FGuid[]

    /**
     * Overrides
     * @type {Array<boolean>}
     * @public
     */
    public Overrides: boolean[]
}