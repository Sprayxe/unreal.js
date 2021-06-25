import { FMaterialParameterInfo } from "../../exports/mats/UMaterialInstance";
import { FGuid } from "../../../objects/core/misc/Guid";
import { UProperty } from "../../../../util/decorators/UProperty";
import { FLinearColor } from "../../../objects/core/math/FColor";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";

export class FMaterialCachedParameters {
    @UProperty({arrayDim: 5})
    public Entries: FMaterialCachedParameterEntry[]
    public ScalarValues: number[]
    public VectorValues: FLinearColor[]
    public TextureValues: FPackageIndex[] /*Texture[]*/
    public FontValues: FPackageIndex /*Font[]*/
    public FontPageValues: number[]
    public RuntimeVirtualTextureValues: FPackageIndex[] /*RuntimeVirtualTexture*/
}

export class FMaterialCachedParameterEntry {
    public NameHashes: number[]
    public ParameterInfos: FMaterialParameterInfo[]
    public ExpressionGuids: FGuid[]
    public Overrides: boolean[]
}