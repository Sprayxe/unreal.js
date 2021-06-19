import { UMaterialInterface } from "./UMaterialInterface";
import { FName } from "../../../objects/uobject/FName";
import { FGuid } from "../../../objects/core/misc/Guid";
import { FLinearColor } from "../../../objects/core/math/FColor";
import { Lazy } from "../../../../util/Lazy";
import { UTexture } from "../tex/UTexture";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { EBlendMode } from "../../enums/EBlendMode";
import { EMaterialShadingModel } from "../../enums/EMaterialShadingModel";
import { UProperty } from "../../../../util/decorators/UProperty";
import { UObject } from "../UObject";
import { FMaterialCachedParameters } from "../../objects/mats/FMaterialCachedParameters";

export class UMaterialInstance extends UMaterialInterface {
    public PhysMaterial: FPackageIndex /*PhysicalMaterial*/ = null
    @UProperty({ arrayDim: 8 })
    public PhysicalMaterialMap: FPackageIndex[] /*PhysicalMaterial[]*/ = null
    public Parent: Lazy<UMaterialInterface> = null
    public bHasStaticPermutationResource: boolean = null
    public bOverrideSubsurfaceProfile: boolean = null
    public ScalarParameterValues: FScalarParameterValue[] = null
    public VectorParameterValues: FVectorParameterValue[] = null
    public TextureParameterValues: FTextureParameterValue[] = null
    public RuntimeVirtualTextureParameterValues: FRuntimeVirtualTextureParameterValue[] = null
    public FontParameterValues: FFontParameterValue[] = null
    public BasePropertyOverrides: FMaterialInstanceBasePropertyOverrides = null
    public StaticParameters: FStaticParameterSet = null
    public CachedLayerParameters: FMaterialCachedParameters = null
    public CachedReferencedTextures: Lazy<UObject>[] = null
}

export class FMaterialParameterInfo {
    public Name: FName
    public Association: EMaterialParameterAssociation
    public Index: number
}

export enum EMaterialParameterAssociation {
    LayerParameter,
    BlendParameter,
    GlobalParameter
}

export class FScalarParameterValue {
    public ParameterInfo: FMaterialParameterInfo
    public ParameterValue: number
    public ExpressionGUID: FGuid
}

export class FVectorParameterValue {
    public ParameterInfo: FMaterialParameterInfo
    public ParameterValue: FLinearColor
    public ExpressionGUID: FGuid
}

export class FTextureParameterValue {
    public ParameterInfo: FMaterialParameterInfo
    public ParameterValue: Lazy<UTexture>
    public ExpressionGUID: FGuid
}

export class FRuntimeVirtualTextureParameterValue {
    public ParameterInfo: FMaterialParameterInfo
    public ParameterValue: FPackageIndex /*RuntimeVirtualTexture*/
    public ExpressionGUID: FGuid
}

export class FFontParameterValue {
    public ParameterInfo: FMaterialParameterInfo
    public FontValue: FPackageIndex /*Font*/
    public FontPage: number
    public ExpressionGUID: FGuid
}

export class FMaterialInstanceBasePropertyOverrides {
    public bOverride_OpacityMaskClipValue: boolean
    public bOverride_BlendMode: boolean
    public bOverride_ShadingModel: boolean
    public bOverride_DitheredLODTransition: boolean
    public bOverride_CastDynamicShadowAsMasked: boolean
    public bOverride_TwoSided: boolean
    public TwoSided: boolean
    public DitheredLODTransition: boolean
    public bCastDynamicShadowAsMasked: boolean
    public BlendMode: EBlendMode
    public ShadingModel: EMaterialShadingModel
    public OpacityMaskClipValue: number
}

export class FStaticParameterSet {
    public StaticSwitchParameters: FStaticSwitchParameter[]
    public StaticComponentMaskParameters: FStaticComponentMaskParameter[]
    public TerrainLayerWeightParameters: FStaticTerrainLayerWeightParameter
    public MaterialLayersParameters: FStaticMaterialLayersParameter
}

export class FStaticParameterBase {
    public ParameterInfo: FMaterialParameterInfo
    public bOverride: boolean
    public ExpressionGUID: FGuid
}

export class FStaticSwitchParameter extends FStaticParameterBase {
    public Value: boolean
}

export class FStaticComponentMaskParameter extends FStaticParameterBase {
    public R: boolean
    public G: boolean
    public B: boolean
    public A: boolean
}

export class FStaticTerrainLayerWeightParameter extends FStaticParameterBase {
    public WeightmapIndex: number
    public bWeightBasedBlend: boolean
}

export class FStaticMaterialLayersParameter extends FStaticParameterBase {
    public Value: FMaterialLayersFunctions
}

export class FMaterialLayersFunctions {
    public Layers: FPackageIndex[]
    public Blends: FPackageIndex[]
    public LayerStates: boolean[]
    public KeyString: string
}