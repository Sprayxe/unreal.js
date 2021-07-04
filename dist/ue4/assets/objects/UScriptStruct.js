"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UScriptStruct = void 0;
const FAssetArchive_1 = require("../reader/FAssetArchive");
const FProperty_1 = require("./FProperty");
const FColor_1 = require("../../objects/core/math/FColor");
const DateTime_1 = require("../../objects/core/misc/DateTime");
const Guid_1 = require("../../objects/core/misc/Guid");
const FIntPoint_1 = require("../../objects/core/math/FIntPoint");
const FIntVector_1 = require("../../objects/core/math/FIntVector");
const FVector_1 = require("../../objects/core/math/FVector");
const FVector2D_1 = require("../../objects/core/math/FVector2D");
const FVector4_1 = require("../../objects/core/math/FVector4");
const FStructFallback_1 = require("./FStructFallback");
const FBox_1 = require("../../objects/core/math/FBox");
const FBox2D_1 = require("../../objects/core/math/FBox2D");
const SoftObjectPath_1 = require("../../objects/uobject/SoftObjectPath");
const MaterialExpressionIO_1 = require("../../objects/engine/MaterialExpressionIO");
const FFrameNumber_1 = require("../../objects/core/misc/FFrameNumber");
const FGameplayTagContainer_1 = require("../../objects/gameplaytags/FGameplayTagContainer");
const FLevelSequenceLegacyObjectReference_1 = require("../../objects/levelsequence/FLevelSequenceLegacyObjectReference");
const FMovieSceneEvaluationKey_1 = require("../../objects/moviescene/evaluation/FMovieSceneEvaluationKey");
const FMovieSceneEvaluationTemplate_1 = require("../../objects/moviescene/evaluation/FMovieSceneEvaluationTemplate");
const FMovieSceneFrameRange_1 = require("../../objects/moviescene/FMovieSceneFrameRange");
const FMovieSceneSegment_1 = require("../../objects/moviescene/evaluation/FMovieSceneSegment");
const FNavAgentSelector_1 = require("../../objects/ai/navigation/FNavAgentSelector");
const FNiagaraVariable_1 = require("../../objects/niagara/FNiagaraVariable");
const FNiagaraVariableBase_1 = require("../../objects/niagara/FNiagaraVariableBase");
const FNiagaraVariableWithOffset_1 = require("../../objects/niagara/FNiagaraVariableWithOffset");
const PerPlatformProperties_1 = require("../../objects/engine/PerPlatformProperties");
const FQuat_1 = require("../../objects/core/math/FQuat");
const FRotator_1 = require("../../objects/core/math/FRotator");
const FSmartName_1 = require("../../objects/engine/animation/FSmartName");
const FWeightedRandomSampler_1 = require("../../objects/engine/FWeightedRandomSampler");
const FSectionEvaluationDataTree_1 = require("../../objects/moviescene/evaluation/FSectionEvaluationDataTree");
const FRichCurve_1 = require("../../objects/engine/curves/FRichCurve");
const FSimpleCurve_1 = require("../../objects/engine/curves/FSimpleCurve");
const Config_1 = require("../../../Config");
/**
 * UScriptStruct
 */
class UScriptStruct {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        if (x instanceof FAssetArchive_1.FAssetArchive) {
            this.structName = y.structName;
            switch (this.structName.text) {
                case "Box":
                    this.structType = z !== FProperty_1.ReadType.ZERO ? new FBox_1.FBox(x) : new FBox_1.FBox();
                    break;
                case "Box2D":
                    this.structType = z !== FProperty_1.ReadType.ZERO ? new FBox2D_1.FBox2D(x) : new FBox2D_1.FBox2D();
                    break;
                case "Color":
                    this.structType = z !== FProperty_1.ReadType.ZERO ? new FColor_1.FColor(x) : new FColor_1.FColor();
                    break;
                case "ColorMaterialInput":
                    this.structType = new MaterialExpressionIO_1.FColorMaterialInput(x);
                    break;
                case "DateTime":
                case "Timespan":
                    this.structType = z !== FProperty_1.ReadType.ZERO ? new DateTime_1.FDateTime(x) : new DateTime_1.FDateTime();
                    break;
                case "ExpressionInput":
                    this.structType = new MaterialExpressionIO_1.FExpressionInput(x);
                    break;
                case "FrameNumber":
                    this.structType = new FFrameNumber_1.FFrameNumber(x);
                    break;
                case "GameplayTagContainer":
                    this.structType = z !== FProperty_1.ReadType.ZERO ? new FGameplayTagContainer_1.FGameplayTagContainer(x) : new FGameplayTagContainer_1.FGameplayTagContainer();
                    break;
                case "Guid":
                    this.structType = z !== FProperty_1.ReadType.ZERO ? new Guid_1.FGuid(x) : new Guid_1.FGuid();
                    break;
                case "IntPoint":
                    this.structType = new FIntPoint_1.FIntPoint(x);
                    break;
                case "IntVector":
                    this.structType = new FIntVector_1.FIntVector(x);
                    break;
                case "LevelSequenceObjectReferenceMap":
                    this.structType = new FLevelSequenceLegacyObjectReference_1.FLevelSequenceObjectReferenceMap(x);
                    break;
                case "LinearColor":
                    this.structType = z !== FProperty_1.ReadType.ZERO ? new FColor_1.FLinearColor(x) : new FColor_1.FLinearColor();
                    break;
                case "MaterialAttributesInput":
                    this.structType = new MaterialExpressionIO_1.FMaterialAttributesInput(x);
                    break;
                case "MovieSceneEvaluationKey":
                    this.structType = new FMovieSceneEvaluationKey_1.FMovieSceneEvaluationKey(x);
                    break;
                case "MovieSceneEvaluationTemplate":
                    this.structType = new FMovieSceneEvaluationTemplate_1.FMovieSceneEvaluationTemplate(x);
                    break;
                case "MovieSceneFloatValue":
                    this.structType = new FRichCurve_1.FRichCurveKey(x);
                    break;
                case "MovieSceneFrameRange":
                    this.structType = new FMovieSceneFrameRange_1.FMovieSceneFrameRange(x);
                    break;
                case "MovieSceneSegment":
                    this.structType = new FMovieSceneSegment_1.FMovieSceneSegment(x);
                    break;
                case "MovieSceneSegmentIdentifier":
                    this.structType = new FFrameNumber_1.FFrameNumber(x);
                    break;
                case "MovieSceneSequenceID":
                    this.structType = new FFrameNumber_1.FFrameNumber(x);
                    break;
                case "MovieSceneTrackIdentifier":
                    this.structType = new FFrameNumber_1.FFrameNumber(x);
                    break;
                case "NavAgentSelector":
                    this.structType = new FNavAgentSelector_1.FNavAgentSelector(x);
                    break;
                case "NiagaraVariable":
                    this.structType = new FNiagaraVariable_1.FNiagaraVariable(x);
                    break;
                case "NiagaraVariableBase":
                    this.structType = new FNiagaraVariableBase_1.FNiagaraVariableBase(x);
                    break;
                case "NiagaraVariableWithOffset":
                    this.structType = new FNiagaraVariableWithOffset_1.FNiagaraVariableWithOffset(x);
                    break;
                case "PerPlatformBool":
                    this.structType = new PerPlatformProperties_1.FPerPlatformBool(x);
                    break;
                case "PerPlatformFloat":
                    this.structType = new PerPlatformProperties_1.FPerPlatformFloat(x);
                    break;
                case "PerPlatformInt":
                    this.structType = new PerPlatformProperties_1.FPerPlatformInt(x);
                    break;
                case "Quat":
                    this.structType = new FQuat_1.FQuat(x);
                    break;
                case "RichCurveKey":
                    this.structType = new FRichCurve_1.FRichCurveKey(x);
                    break;
                case "Rotator":
                    this.structType = z !== FProperty_1.ReadType.ZERO ? new FRotator_1.FRotator(x) : new FRotator_1.FRotator();
                    break;
                case "ScalarMaterialInput":
                    this.structType = new MaterialExpressionIO_1.FScalarMaterialInput(x);
                    break;
                case "SectionEvaluationDataTree":
                    this.structType = new FSectionEvaluationDataTree_1.FSectionEvaluationDataTree(x);
                    break;
                case "SimpleCurveKey":
                    this.structType = new FSimpleCurve_1.FSimpleCurveKey(x);
                    break;
                case "SkeletalMeshSamplingLODBuiltData":
                    this.structType = new FWeightedRandomSampler_1.FWeightedRandomSampler(x);
                    break;
                case "SmartName":
                    this.structType = new FSmartName_1.FSmartName(x);
                    break;
                case "SoftObjectPath":
                    const softObjectPath = z !== FProperty_1.ReadType.ZERO ? new SoftObjectPath_1.FSoftObjectPath(x) : new SoftObjectPath_1.FSoftObjectPath();
                    softObjectPath.owner = x.owner;
                    this.structType = softObjectPath;
                    break;
                case "SoftClassPath":
                    const softClassPath = z !== FProperty_1.ReadType.ZERO ? new SoftObjectPath_1.FSoftClassPath(x) : new SoftObjectPath_1.FSoftClassPath();
                    softClassPath.owner = x.owner;
                    this.structType = softClassPath;
                    break;
                case "Vector":
                    this.structType = z !== FProperty_1.ReadType.ZERO ? new FVector_1.FVector(x) : new FVector_1.FVector();
                    break;
                case "Vector2D":
                    this.structType = z !== FProperty_1.ReadType.ZERO ? new FVector2D_1.FVector2D(x) : new FVector2D_1.FVector2D();
                    break;
                case "Vector2MaterialInput":
                    this.structType = new MaterialExpressionIO_1.FVector2MaterialInput(x);
                    break;
                case "Vector4":
                    this.structType = z !== FProperty_1.ReadType.ZERO ? new FVector4_1.FVector4(x) : new FVector4_1.FVector4();
                    break;
                case "VectorMaterialInput":
                    this.structType = new MaterialExpressionIO_1.FVectorMaterialInput(x);
                    break;
                default:
                    if (Config_1.Config.GDebugProperties)
                        console.debug(`Using property serialization for struct ${this.structName}`);
                    this.structType = new FStructFallback_1.FStructFallback(x, y.structClass, this.structName);
            }
        }
        else {
            this.structName = x;
            this.structType = y;
        }
    }
}
exports.UScriptStruct = UScriptStruct;
