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
                case "MovieSceneFloatValue": // TODO FRichCurveKey
                    break
                case "MovieSceneFrameRange":
                    this.structType = new FMovieSceneFrameRange(x)
                    break
                case "MovieSceneSegment": // TODO FMovieSceneSegment
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
                case "NavAgentSelector": // TODO FNavAgentSelector
                    break
                case "NiagaraVariable": // TODO FNiagaraVariable
                    break
                case "NiagaraVariableBase": // TODO FNiagaraVariableBase
                    break
                case "NiagaraVariableWithOffset": // TODO FNiagaraVariableWithOffset
                    break
                case "PerPlatformBool": // TODO FPerPlatformBool
                    break
                case "PerPlatformFloat": // TODO FPerPlatformFloat
                    break
                case "PerPlatformInt": // TODO FPerPlatformInt
                    break
                case "Quat": // TODO FQuat
                    break
                case "RichCurveKey": // TODO FRichCurveKey
                    break
                case "Rotator": // TODO FRotator
                    break
                case "ScalarMaterialInput":
                    this.structType = new FScalarMaterialInput(x)
                    break
                case "SectionEvaluationDataTree": // TODO FSectionEvaluationDataTree
                    break
                case "SimpleCurveKey": // TODO FSimpleCurveKey
                    break
                case "SkeletalMeshSamplingLODBuiltData": // TODO FSkeletalMeshSamplingLODBuiltData
                    break
                case "SmartName": // TODO FSmartName
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