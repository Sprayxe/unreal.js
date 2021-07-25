import { FName } from "../../objects/uobject/FName";
import { FAssetArchive } from "../reader/FAssetArchive";
import { PropertyType } from "./PropertyType";
import { ReadType } from "./FProperty";
import { FColor, FLinearColor } from "../../objects/core/math/FColor";
import { FDateTime } from "../../objects/core/misc/DateTime";
import { FGuid } from "../../objects/core/misc/Guid";
import { FIntPoint } from "../../objects/core/math/FIntPoint";
import { FIntVector } from "../../objects/core/math/FIntVector";
import { FVector } from "../../objects/core/math/FVector";
import { FVector2D } from "../../objects/core/math/FVector2D";
import { FVector4 } from "../../objects/core/math/FVector4";
import { FStructFallback } from "./FStructFallback";
import { FBox } from "../../objects/core/math/FBox";
import { FBox2D } from "../../objects/core/math/FBox2D";
import { FSoftClassPath, FSoftObjectPath } from "../../objects/uobject/SoftObjectPath";
import {
    FColorMaterialInput,
    FExpressionInput,
    FMaterialAttributesInput,
    FScalarMaterialInput,
    FVector2MaterialInput,
    FVectorMaterialInput
} from "../../objects/engine/MaterialExpressionIO";
import { FFrameNumber } from "../../objects/core/misc/FFrameNumber";
import { FGameplayTagContainer } from "../../objects/gameplaytags/FGameplayTagContainer";
import { FLevelSequenceObjectReferenceMap } from "../../objects/levelsequence/FLevelSequenceLegacyObjectReference";
import { FMovieSceneEvaluationKey } from "../../objects/moviescene/evaluation/FMovieSceneEvaluationKey";
import { FMovieSceneEvaluationTemplate } from "../../objects/moviescene/evaluation/FMovieSceneEvaluationTemplate";
import { FMovieSceneFrameRange } from "../../objects/moviescene/FMovieSceneFrameRange";
import { FMovieSceneSegment } from "../../objects/moviescene/evaluation/FMovieSceneSegment";
import { FNavAgentSelector } from "../../objects/ai/navigation/FNavAgentSelector";
import { FNiagaraVariable } from "../../objects/niagara/FNiagaraVariable";
import { FNiagaraVariableBase } from "../../objects/niagara/FNiagaraVariableBase";
import { FNiagaraVariableWithOffset } from "../../objects/niagara/FNiagaraVariableWithOffset";
import { FPerPlatformBool, FPerPlatformFloat, FPerPlatformInt } from "../../objects/engine/PerPlatformProperties";
import { FQuat } from "../../objects/core/math/FQuat";
import { FRotator } from "../../objects/core/math/FRotator";
import { FSmartName } from "../../objects/engine/animation/FSmartName";
import { FWeightedRandomSampler } from "../../objects/engine/FWeightedRandomSampler";
import { FSectionEvaluationDataTree } from "../../objects/moviescene/evaluation/FSectionEvaluationDataTree";
import { FRichCurveKey } from "../../objects/engine/curves/FRichCurve";
import { FSimpleCurveKey } from "../../objects/engine/curves/FSimpleCurve";
import { Config } from "../../../Config";
import { FPerQualityLevelInt } from "../../objects/engine/PerQualityLevelProperties";

/**
 * UScriptStruct
 */
export class UScriptStruct {
    /**
     * Name of struct
     * @type {FName}
     * @public
     */
    structName: FName

    /**
     * Type of struct
     * @type {IStructType}
     * @public
     */
    structType: IStructType

    /**
     * Creates an instance from reading
     * @param {FAssetArchive} Ar Reader to use
     * @param {PropertyType} typeData Type data
     * @param {ReadType} type Read type
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive, typeData: PropertyType, type: ReadType)

    /**
     * Creates an instance using FName and any
     * @param {FName} structName Name of struct
     * @param {IStructType} structType Type of struct
     * @constructor
     * @public
     */
    constructor(structName: FName, structType: IStructType)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any, z?: any) {
        if (x instanceof FAssetArchive) {
            this.structName = y.structName
            const nz = z !== ReadType.ZERO
            switch (this.structName.text) {
                case "Box":
                    this.structType = nz ? new FBox(x) : new FBox()
                    break
                case "Box2D":
                    this.structType = nz ? new FBox2D(x) : new FBox2D()
                    break
                case "Color":
                    this.structType = nz ? new FColor(x) : new FColor()
                    break
                case "ColorMaterialInput":
                    this.structType = new FColorMaterialInput(x)
                    break
                case "DateTime":
                case "Timespan":
                    this.structType = nz ? new FDateTime(x) : new FDateTime()
                    break
                case "ExpressionInput":
                    this.structType = new FExpressionInput(x)
                    break
                case "FrameNumber":
                    this.structType = new FFrameNumber(x)
                    break
                case "GameplayTagContainer":
                    this.structType = nz ? new FGameplayTagContainer(x) : new FGameplayTagContainer()
                    break
                case "GUID":
                case "Guid":
                    this.structType = nz ? new FGuid(x) : new FGuid()
                    break
                case "IntPoint":
                    this.structType = new FIntPoint(x)
                    break
                case "IntVector":
                    this.structType = new FIntVector(x)
                    break
                case "LevelSequenceObjectReferenceMap":
                    this.structType = new FLevelSequenceObjectReferenceMap(x)
                    break
                case "LinearColor":
                    this.structType = nz ? new FLinearColor(x) : new FLinearColor()
                    break
                case "MaterialAttributesInput":
                    this.structType = new FMaterialAttributesInput(x)
                    break
                case "MovieSceneEvaluationKey":
                    this.structType = new FMovieSceneEvaluationKey(x)
                    break
                case "MovieSceneEvaluationTemplate":
                    this.structType = new FMovieSceneEvaluationTemplate(x)
                    break
                case "MovieSceneFloatValue":
                    this.structType = new FRichCurveKey(x)
                    break
                case "MovieSceneFrameRange":
                    this.structType = new FMovieSceneFrameRange(x)
                    break
                case "MovieSceneSegment":
                    this.structType = new FMovieSceneSegment(x)
                    break
                case "MovieSceneSegmentIdentifier":
                    this.structType = new FFrameNumber(x)
                    break
                case "MovieSceneSequenceID":
                    this.structType = new FFrameNumber(x)
                    break
                case "MovieSceneTrackIdentifier":
                    this.structType = new FFrameNumber(x)
                    break
                case "NavAgentSelector":
                    this.structType = new FNavAgentSelector(x)
                    break
                case "NiagaraVariable":
                    this.structType = new FNiagaraVariable(x)
                    break
                case "NiagaraVariableBase":
                    this.structType = new FNiagaraVariableBase(x)
                    break
                case "NiagaraVariableWithOffset":
                    this.structType = new FNiagaraVariableWithOffset(x)
                    break
                case "PerPlatformBool":
                    this.structType = new FPerPlatformBool(x)
                    break
                case "PerPlatformFloat":
                    this.structType = new FPerPlatformFloat(x)
                    break
                case "PerPlatformInt":
                    this.structType = new FPerPlatformInt(x)
                    break
                case "PerQualityLevelInt":
                    this.structType = new FPerQualityLevelInt(x)
                    break
                case "Quat":
                    this.structType = new FQuat(x)
                    break
                case "RichCurveKey":
                    this.structType = new FRichCurveKey(x)
                    break
                case "Rotator":
                    this.structType = nz ? new FRotator(x) : new FRotator()
                    break
                case "ScalarMaterialInput":
                    this.structType = new FScalarMaterialInput(x)
                    break
                case "SectionEvaluationDataTree":
                    this.structType = new FSectionEvaluationDataTree(x)
                    break
                case "SimpleCurveKey":
                    this.structType = new FSimpleCurveKey(x)
                    break
                case "SkeletalMeshSamplingLODBuiltData":
                    this.structType = new FWeightedRandomSampler(x)
                    break
                case "SmartName":
                    this.structType = new FSmartName(x)
                    break
                case "SoftObjectPath":
                    const softObjectPath = nz ? new FSoftObjectPath(x) : new FSoftObjectPath()
                    softObjectPath.owner = x.owner
                    this.structType = softObjectPath
                    break
                case "SoftClassPath":
                    const softClassPath = nz ? new FSoftClassPath(x) : new FSoftClassPath()
                    softClassPath.owner = x.owner
                    this.structType = softClassPath
                    break
                case "Vector":
                    this.structType = nz ? new FVector(x) : new FVector()
                    break
                case "Vector2D":
                    this.structType = nz ? new FVector2D(x) : new FVector2D()
                    break
                case "Vector2MaterialInput":
                    this.structType = new FVector2MaterialInput(x)
                    break
                case "Vector4":
                    this.structType = nz ? new FVector4(x) : new FVector4()
                    break
                case "VectorMaterialInput":
                    this.structType = new FVectorMaterialInput(x)
                    break
                default:
                    if (Config.GDebug) console.debug(`Using property serialization for struct ${this.structName}`)
                    this.structType = new FStructFallback(x, y.structClass, this.structName)
            }
        } else {
            this.structName = x
            this.structType = y
        }
    }
}

/**
 * Represents a struct type
 */
export interface IStructType {
    /**
     * Turns this into json
     * @returns {any}
     * @public
     */
    toJson(): any
}