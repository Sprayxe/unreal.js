import { ERichCurveInterpMode, FRealCurve } from "./FRealCurve";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { FloatRef } from "../../../../util/ObjectRef";
import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FStructFallback } from "../../../assets/objects/FStructFallback";
/**
 * If using RCIM_Cubic, this enum describes how the tangents should be controlled in editor.
 * @enum
 */
export declare enum ERichCurveTangentMode {
    /** Automatically calculates tangents to create smooth curves between values. */
    RCTM_Auto = 0,
    /** User specifies the tangent as a unified tangent where the two tangents are locked to each other, presenting a consistent curve before and after. */
    RCTM_User = 1,
    /** User specifies the tangent as two separate broken tangents on each side of the key which can allow a sharp change in evaluation before or after. */
    RCTM_Break = 2,
    /** No tangents. */
    RCTM_None = 3
}
/**
 * Enumerates tangent weight modes
 * @enum
 */
export declare enum ERichCurveTangentWeightMode {
    /** Don't take tangent weights into account. */
    RCTWM_WeightedNone = 0,
    /** Only take the arrival tangent weight into account for evaluation. */
    RCTWM_WeightedArrive = 1,
    /** Only take the leaving tangent weight into account for evaluation. */
    RCTWM_WeightedLeave = 2,
    /** Take both the arrival and leaving tangent weights into account for evaluation. */
    RCTWM_WeightedBoth = 3
}
/**
 * One key in a rich, editable float curve
 * @implements {IStructType}
 */
export declare class FRichCurveKey implements IStructType {
    /**
     * Interpolation mode between this key and the next
     * @type {ERichCurveInterpMode}
     * @public
     */
    interpMode: ERichCurveInterpMode;
    /**
     * Mode for tangents at this key
     * @type {ERichCurveTangentMode}
     * @public
     */
    tangentMode: ERichCurveTangentMode;
    /**
     * If either tangent at this key is 'weighted'
     * @type {ERichCurveTangentWeightMode}
     * @public
     */
    tangentWeightMode: ERichCurveTangentWeightMode;
    /**
     * Time at this key
     * @type {number}
     * @public
     */
    time: number;
    /**
     * Value at this key
     * @type {number}
     * @public
     */
    value: number;
    /**
     * If RCIM_Cubic, the arriving tangent at this key
     * @type {number}
     * @public
     */
    arriveTangent: number;
    /**
     * If RCTWM_WeightedArrive or RCTWM_WeightedBoth, the weight of the left tangent
     * @type {number}
     * @public
     */
    arriveTangentWeight: number;
    /**
     * If RCIM_Cubic, the leaving tangent at this key
     * @type {number}
     * @public
     */
    leaveTangent: number;
    /**
     * If RCTWM_WeightedLeave or RCTWM_WeightedBoth, the weight of the right tangent
     * @type {number}
     * @public
     */
    leaveTangentWeight: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {ERichCurveInterpMode} interpMode
     * @param {ERichCurveTangentMode} tangentMode
     * @param {ERichCurveTangentWeightMode} tangentWeightMode
     * @param {number} time
     * @param {number} value
     * @param {number} arriveTangent
     * @param {number} arriveTangentWeight
     * @param {number} leaveTangent
     * @param {number} leaveTangentWeight
     * @constructor
     * @public
     */
    constructor(interpMode: ERichCurveInterpMode, tangentMode: ERichCurveTangentMode, tangentWeightMode: ERichCurveTangentWeightMode, time: number, value: number, arriveTangent: number, arriveTangentWeight: number, leaveTangent: number, leaveTangentWeight: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * A rich, editable float curve
 * @extends {FRealCurve}
 * */
export declare class FRichCurve extends FRealCurve {
    /**
     * Sorted array of keys
     * @type {Array<FRichCurveKey>}
     */
    keys: FRichCurveKey[];
    /**
     * Applies values from FStructFallback
     * @param {FStructFallback} fallback Fallback to use
     * @returns {FRichCurve} Object
     * @public
     * @static
     */
    static loadFromFallback(fallback: FStructFallback): FRichCurve;
    /**
     * Remaps inTime based on pre and post infinity extrapolation values
     * @param {FloatRef} inTime In time
     * @param {FloatRef} cycleValueOffset Cycle value offset
     * @returns {void}
     * @public
     */
    remapTimeValue(inTime: FloatRef, cycleValueOffset: FloatRef): void;
    /**
     * Evaluates this curve at the specified time
     * @param {number} inTime In time
     * @param {number} inDefaultValue In default value
     * @returns {number} Result
     * @public
     */
    eval(inTime: number, inDefaultValue?: number): number;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
    /**
     * Evals for two keys
     * @param {FRichCurveKey} key1 First key
     * @param {FRichCurveKey} key2 Second key
     * @param {number} inTime In time
     * @returns {number} Result
     * @private
     * @static
     */
    private static evalForTwoKeys;
}
