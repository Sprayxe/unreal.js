import { UMaterialInterface } from "./UMaterialInterface";
import { FName } from "../../../objects/uobject/FName";
import { FGuid } from "../../../objects/core/misc/Guid";
import { FLinearColor } from "../../../objects/core/math/FColor";
import { Lazy } from "../../../../util/Lazy";
import { UTexture } from "../tex/UTexture";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { EBlendMode } from "../../enums/EBlendMode";
import { EMaterialShadingModel } from "../../enums/EMaterialShadingModel";
import { UObject } from "../UObject";
import { FMaterialCachedParameters } from "../../objects/mats/FMaterialCachedParameters";
/**
 * FMaterialParameterInfo
 */
export declare class FMaterialParameterInfo {
    /**
     * Name
     * @type {FName}
     * @public
     */
    Name: FName;
    /**
     * Association
     * @type {EMaterialParameterAssociation}
     * @public
     */
    Association: EMaterialParameterAssociation;
    /**
     * Index
     * @type {number}
     * @public
     */
    Index: number;
}
/**
 * EMaterialParameterAssociation
 * @enum
 */
export declare enum EMaterialParameterAssociation {
    LayerParameter = 0,
    BlendParameter = 1,
    GlobalParameter = 2
}
/**
 * FScalarParameterValue
 */
export declare class FScalarParameterValue {
    /**
     * ParameterInfo
     * @type {FMaterialParameterInfo}
     * @public
     */
    ParameterInfo: FMaterialParameterInfo;
    /**
     * ParameterValue
     * @type {number}
     * @public
     */
    ParameterValue: number;
    /**
     * ExpressionGUID
     * @type {FGuid}
     * @public
     */
    ExpressionGUID: FGuid;
}
/**
 * FVectorParameterValue
 */
export declare class FVectorParameterValue {
    /**
     * ParameterInfo
     * @type {FMaterialParameterInfo}
     * @public
     */
    ParameterInfo: FMaterialParameterInfo;
    /**
     * ParameterValue
     * @type {FLinearColor}
     * @public
     */
    ParameterValue: FLinearColor;
    /**
     * ExpressionGUID
     * @type {FGuid}
     * @public
     */
    ExpressionGUID: FGuid;
}
/**
 * FTextureParameterValue
 */
export declare class FTextureParameterValue {
    /**
     * ParameterInfo
     * @type {FMaterialParameterInfo}
     * @public
     */
    ParameterInfo: FMaterialParameterInfo;
    /**
     * ParameterValue
     * @type {Lazy<UTexture>}
     * @public
     */
    ParameterValue: Lazy<UTexture>;
    /**
     * ExpressionGUID
     * @type {FGuid}
     * @public
     */
    ExpressionGUID: FGuid;
}
/**
 * FRuntimeVirtualTextureParameterValue
 */
export declare class FRuntimeVirtualTextureParameterValue {
    /**
     * ParameterInfo
     * @type {FMaterialParameterInfo}
     * @public
     */
    ParameterInfo: FMaterialParameterInfo;
    /**
     * ParameterValue
     * @type {FPackageIndex}
     * @public
     */
    ParameterValue: FPackageIndex;
    /**
     * ExpressionGUID
     * @type {FGuid}
     * @public
     */
    ExpressionGUID: FGuid;
}
/**
 * FFontParameterValue
 */
export declare class FFontParameterValue {
    /**
     * ParameterInfo
     * @type {FMaterialParameterInfo}
     * @public
     */
    ParameterInfo: FMaterialParameterInfo;
    /**
     * FontValue
     * @type {FPackageIndex}
     * @public
     */
    FontValue: FPackageIndex;
    /**
     * FontPage
     * @type {number}
     * @public
     */
    FontPage: number;
    /**
     * ExpressionGUID
     * @type {FGuid}
     * @public
     */
    ExpressionGUID: FGuid;
}
/**
 * FMaterialInstanceBasePropertyOverrides
 */
export declare class FMaterialInstanceBasePropertyOverrides {
    /**
     * bOverride_OpacityMaskClipValue
     * @type {boolean}
     * @public
     */
    bOverride_OpacityMaskClipValue: boolean;
    /**
     * bOverride_BlendMode
     * @type {boolean}
     * @public
     */
    bOverride_BlendMode: boolean;
    /**
     * bOverride_ShadingModel
     * @type {boolean}
     * @public
     */
    bOverride_ShadingModel: boolean;
    /**
     * bOverride_DitheredLODTransition
     * @type {boolean}
     * @public
     */
    bOverride_DitheredLODTransition: boolean;
    /**
     * bOverride_CastDynamicShadowAsMasked
     * @type {boolean}
     * @public
     */
    bOverride_CastDynamicShadowAsMasked: boolean;
    /**
     * bOverride_TwoSided
     * @type {boolean}
     * @public
     */
    bOverride_TwoSided: boolean;
    /**
     * TwoSided
     * @type {boolean}
     * @public
     */
    TwoSided: boolean;
    /**
     * DitheredLODTransition
     * @type {boolean}
     * @public
     */
    DitheredLODTransition: boolean;
    /**
     * bCastDynamicShadowAsMasked
     * @type {boolean}
     * @public
     */
    bCastDynamicShadowAsMasked: boolean;
    /**
     * BlendMode
     * @type {EBlendMode}
     * @public
     */
    BlendMode: EBlendMode;
    /**
     * ShadingModel
     * @type {EMaterialShadingModel}
     * @public
     */
    ShadingModel: EMaterialShadingModel;
    /**
     * OpacityMaskClipValue
     * @type {number}
     * @public
     */
    OpacityMaskClipValue: number;
}
export declare class FStaticParameterSet {
    StaticSwitchParameters: FStaticSwitchParameter[];
    StaticComponentMaskParameters: FStaticComponentMaskParameter[];
    TerrainLayerWeightParameters: FStaticTerrainLayerWeightParameter;
    MaterialLayersParameters: FStaticMaterialLayersParameter;
}
export declare class FStaticParameterBase {
    ParameterInfo: FMaterialParameterInfo;
    bOverride: boolean;
    ExpressionGUID: FGuid;
}
export declare class FStaticSwitchParameter extends FStaticParameterBase {
    Value: boolean;
}
export declare class FStaticComponentMaskParameter extends FStaticParameterBase {
    R: boolean;
    G: boolean;
    B: boolean;
    A: boolean;
}
export declare class FStaticTerrainLayerWeightParameter extends FStaticParameterBase {
    WeightmapIndex: number;
    bWeightBasedBlend: boolean;
}
export declare class FMaterialLayersFunctions {
    Layers: FPackageIndex[];
    Blends: FPackageIndex[];
    LayerStates: boolean[];
    KeyString: string;
}
export declare class FStaticMaterialLayersParameter extends FStaticParameterBase {
    Value: FMaterialLayersFunctions;
}
/**
 * UMaterialInstance
 * @extends {UMaterialInterface}
 */
export declare class UMaterialInstance extends UMaterialInterface {
    PhysMaterial: FPackageIndex;
    PhysicalMaterialMap: FPackageIndex[];
    Parent: Lazy<UMaterialInterface>;
    bHasStaticPermutationResource: boolean;
    bOverrideSubsurfaceProfile: boolean;
    ScalarParameterValues: FScalarParameterValue[];
    VectorParameterValues: FVectorParameterValue[];
    TextureParameterValues: FTextureParameterValue[];
    RuntimeVirtualTextureParameterValues: FRuntimeVirtualTextureParameterValue[];
    FontParameterValues: FFontParameterValue[];
    BasePropertyOverrides: FMaterialInstanceBasePropertyOverrides;
    StaticParameters: FStaticParameterSet;
    CachedLayerParameters: FMaterialCachedParameters;
    CachedReferencedTextures: Lazy<UObject>[];
}
