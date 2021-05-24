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

export class UScriptStruct {
    structName: FName
    structType: any

    constructor(Ar: FAssetArchive, typeData: PropertyType, type: ReadType)
    constructor(structName: FName, structType: any)
    constructor(x?: any, y?: any, z?: any) {
        if (x instanceof FAssetArchive) {
            this.structName = y.structName
            switch (this.structName.text) {
                case "Box": // TODO FBox
                    break
                case "Box2D": // TODO FBox2D
                    break
                case "Color":
                    this.structType = z !== ReadType.ZERO ? new FColor(x) : new FColor()
                    break
                case "ColorMaterialInput": // TODO FColorMaterialInput
                    break
                case "DateTime":
                case "Timespan":
                    this.structType = z !== ReadType.ZERO ? new FDateTime(x) : new FDateTime()
                    break
                case "ExpressionInput": // TODO FExpressionInput
                    break
                case "FrameNumber": // TODO FFrameNumber
                    break
                case "GameplayTagContainer": // TODO FGameplayTagContainer
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
                case "LevelSequenceObjectReferenceMap": // TODO FLevelSequenceObjectReferenceMap
                    break
                case "LinearColor":
                    this.structType = z !== ReadType.ZERO ? new FLinearColor(x) : new FLinearColor()
                    break
                case "MaterialAttributesInput": // TODO FMaterialAttributesInput
                    break
                case "MovieSceneEvaluationKey": // TODO FMovieSceneEvaluationKey
                    break
                case "MovieSceneEvaluationTemplate": // TODO FMovieSceneEvaluationTemplate
                    break
                case "MovieSceneFloatValue": // TODO FRichCurveKey
                    break
                case "MovieSceneFrameRange": // TODO FMovieSceneFrameRange
                    break
                case "MovieSceneSegment": // TODO FMovieSceneSegment
                    break
                case "MovieSceneSegmentIdentifier": // TODO FFrameNumber
                    break
                case "MovieSceneSequenceID": // TODO FFrameNumber
                    break
                case "MovieSceneTrackIdentifier": // TODO FFrameNumber
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
                case "ScalarMaterialInput": // TODO FScalarMaterialInput
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
                    break
                case "SoftClassPath": // TODO FSoftClassPath
                    break
                case "Vector":
                    this.structType = z !== ReadType.ZERO ? new FVector(x) : new FVector()
                    break
                case "Vector2D":
                    this.structType = z !== ReadType.ZERO ? new FVector2D(x) : new FVector2D()
                    break
                case "Vector2MaterialInput": // TODO FVector2MaterialInput
                    break
                case "Vector4":
                    this.structType = z !== ReadType.ZERO ? new FVector4(x) : new FVector4()
                    break
                case "VectorMaterialInput": // TODO FFVectorMaterialInput
                    break
            }
        } else {
            this.structName = x
            this.structType = y
        }
    }
}