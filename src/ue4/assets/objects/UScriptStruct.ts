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

export class UScriptStruct {
    structName: FName
    structType: IStructType

    constructor(Ar: FAssetArchive, typeData: PropertyType, type: ReadType)
    constructor(structName: FName, structType: any)
    constructor(x?: any, y?: any, z?: any) {
        if (x instanceof FAssetArchive) {
            this.structName = y.structName
            switch (this.structName.text) {
                case "Box":
                    this.structType = z !== ReadType.ZERO ? new FBox(x) : new FBox()
                    break
                case "Box2D":
                    this.structType = z !== ReadType.ZERO ? new FBox2D(x) : new FBox2D()
                    break
                case "Color":
                    this.structType = z !== ReadType.ZERO ? new FColor(x) : new FColor()
                    break
                case "ColorMaterialInput":
                    this.structType = new FColorMaterialInput(x)
                    break
                case "DateTime":
                case "Timespan":
                    this.structType = z !== ReadType.ZERO ? new FDateTime(x) : new FDateTime()
                    break
                case "ExpressionInput":
                    this.structType = new FExpressionInput(x)
                    break
                case "FrameNumber":
                    this.structType = new FFrameNumber(x)
                    break
                case "GameplayTagContainer":
                    this.structType = z !== ReadType.ZERO ? new FGameplayTagContainer(x) : new FGameplayTagContainer()
                    break
                case "Guid":
                    this.structType = z !== ReadType.ZERO ? new FGuid(x) : new FGuid()
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
                    this.structType = z !== ReadType.ZERO ? new FLinearColor(x) : new FLinearColor()
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
                case "Quat":
                    this.structType = new FQuat(x)
                    break
                case "RichCurveKey":
                    this.structType = new FRichCurveKey(x)
                    break
                case "Rotator":
                    this.structType = z !== ReadType.ZERO ? new FRotator(x) : new FRotator()
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
                    const softObjectPath = z !== ReadType.ZERO ? new FSoftObjectPath(x) : new FSoftObjectPath()
                    softObjectPath.owner = x.owner
                    this.structType = softObjectPath
                    break
                case "SoftClassPath":
                    const softClassPath = z !== ReadType.ZERO ? new FSoftClassPath(x) : new FSoftClassPath()
                    softClassPath.owner = x.owner
                    this.structType = softClassPath
                    break
                case "Vector":
                    this.structType = z !== ReadType.ZERO ? new FVector(x) : new FVector()
                    break
                case "Vector2D":
                    this.structType = z !== ReadType.ZERO ? new FVector2D(x) : new FVector2D()
                    break
                case "Vector2MaterialInput":
                    this.structType = new FVector2MaterialInput(x)
                    break
                case "Vector4":
                    this.structType = z !== ReadType.ZERO ? new FVector4(x) : new FVector4()
                    break
                case "VectorMaterialInput":
                    this.structType = new FVectorMaterialInput(x)
                    break
                default:
                    console.debug(`Using property serialization for struct ${this.structName}`)
                    this.structType = new FStructFallback(x, y.structClass, z)
            }
        } else {
            this.structName = x
            this.structType = y
        }
    }
}

export interface IStructType {
    toJson(): any
}