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

/**
 * FMaterialParameterInfo
 */
export class FMaterialParameterInfo {
    /**
     * Name
     * @type {FName}
     * @public
     */
    public Name: FName

    /**
     * Association
     * @type {EMaterialParameterAssociation}
     * @public
     */
    public Association: EMaterialParameterAssociation

    /**
     * Index
     * @type {number}
     * @public
     */
    public Index: number
}

/**
 * EMaterialParameterAssociation
 * @enum
 */
export enum EMaterialParameterAssociation {
    LayerParameter,
    BlendParameter,
    GlobalParameter
}

/**
 * FScalarParameterValue
 */
export class FScalarParameterValue {
    /**
     * ParameterInfo
     * @type {FMaterialParameterInfo}
     * @public
     */
    public ParameterInfo: FMaterialParameterInfo

    /**
     * ParameterValue
     * @type {number}
     * @public
     */
    public ParameterValue: number

    /**
     * ExpressionGUID
     * @type {FGuid}
     * @public
     */
    public ExpressionGUID: FGuid
}

/**
 * FVectorParameterValue
 */
export class FVectorParameterValue {
    /**
     * ParameterInfo
     * @type {FMaterialParameterInfo}
     * @public
     */
    public ParameterInfo: FMaterialParameterInfo

    /**
     * ParameterValue
     * @type {FLinearColor}
     * @public
     */
    public ParameterValue: FLinearColor

    /**
     * ExpressionGUID
     * @type {FGuid}
     * @public
     */
    public ExpressionGUID: FGuid
}

/**
 * FTextureParameterValue
 */
export class FTextureParameterValue {
    /**
     * ParameterInfo
     * @type {FMaterialParameterInfo}
     * @public
     */
    public ParameterInfo: FMaterialParameterInfo

    /**
     * ParameterValue
     * @type {Lazy<UTexture>}
     * @public
     */
    public ParameterValue: Lazy<UTexture>

    /**
     * ExpressionGUID
     * @type {FGuid}
     * @public
     */
    public ExpressionGUID: FGuid
}

/**
 * FRuntimeVirtualTextureParameterValue
 */
export class FRuntimeVirtualTextureParameterValue {
    /**
     * ParameterInfo
     * @type {FMaterialParameterInfo}
     * @public
     */
    public ParameterInfo: FMaterialParameterInfo

    /**
     * ParameterValue
     * @type {FPackageIndex}
     * @public
     */
    public ParameterValue: FPackageIndex /*RuntimeVirtualTexture*/

    /**
     * ExpressionGUID
     * @type {FGuid}
     * @public
     */
    public ExpressionGUID: FGuid
}

/**
 * FFontParameterValue
 */
export class FFontParameterValue {
    /**
     * ParameterInfo
     * @type {FMaterialParameterInfo}
     * @public
     */
    public ParameterInfo: FMaterialParameterInfo

    /**
     * FontValue
     * @type {FPackageIndex}
     * @public
     */
    public FontValue: FPackageIndex /*Font*/

    /**
     * FontPage
     * @type {number}
     * @public
     */
    public FontPage: number

    /**
     * ExpressionGUID
     * @type {FGuid}
     * @public
     */
    public ExpressionGUID: FGuid
}

/**
 * FMaterialInstanceBasePropertyOverrides
 */
export class FMaterialInstanceBasePropertyOverrides {
    /**
     * bOverride_OpacityMaskClipValue
     * @type {boolean}
     * @public
     */
    public bOverride_OpacityMaskClipValue: boolean

    /**
     * bOverride_BlendMode
     * @type {boolean}
     * @public
     */
    public bOverride_BlendMode: boolean

    /**
     * bOverride_ShadingModel
     * @type {boolean}
     * @public
     */
    public bOverride_ShadingModel: boolean

    /**
     * bOverride_DitheredLODTransition
     * @type {boolean}
     * @public
     */
    public bOverride_DitheredLODTransition: boolean

    /**
     * bOverride_CastDynamicShadowAsMasked
     * @type {boolean}
     * @public
     */
    public bOverride_CastDynamicShadowAsMasked: boolean

    /**
     * bOverride_TwoSided
     * @type {boolean}
     * @public
     */
    public bOverride_TwoSided: boolean

    /**
     * TwoSided
     * @type {boolean}
     * @public
     */
    public TwoSided: boolean

    /**
     * DitheredLODTransition
     * @type {boolean}
     * @public
     */
    public DitheredLODTransition: boolean

    /**
     * bCastDynamicShadowAsMasked
     * @type {boolean}
     * @public
     */
    public bCastDynamicShadowAsMasked: boolean

    /**
     * BlendMode
     * @type {EBlendMode}
     * @public
     */
    public BlendMode: EBlendMode

    /**
     * ShadingModel
     * @type {EMaterialShadingModel}
     * @public
     */
    public ShadingModel: EMaterialShadingModel

    /**
     * OpacityMaskClipValue
     * @type {number}
     * @public
     */
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

export class FMaterialLayersFunctions {
    public Layers: FPackageIndex[]
    public Blends: FPackageIndex[]
    public LayerStates: boolean[]
    public KeyString: string
}

export class FStaticMaterialLayersParameter extends FStaticParameterBase {
    public Value: FMaterialLayersFunctions
}

/**
 * UMaterialInstance
 * @extends {UMaterialInterface}
 */
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