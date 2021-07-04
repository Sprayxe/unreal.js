import { FloatRef, IntRef } from "../../../../util/ObjectRef";
import { FStructFallback } from "../../../assets/objects/FStructFallback";
/**
 * Method of interpolation between this key and the next
 * @enum
 */
export declare enum ERichCurveInterpMode {
    /** Use linear interpolation between values. */
    RCIM_Linear = 0,
    /** Use a constant value. Represents stepped values. */
    RCIM_Constant = 1,
    /** Cubic interpolation. See TangentMode for different cubic interpolation options. */
    RCIM_Cubic = 2,
    /** No interpolation. */
    RCIM_None = 3
}
/**
 * Enumerates extrapolation options.
 * @enum
 */
export declare enum ERichCurveExtrapolation {
    /** Repeat the curve without an offset. */
    RCCE_Cycle = 0,
    /** Repeat the curve with an offset relative to the first or last key's value. */
    RCCE_CycleWithOffset = 1,
    /** Sinusoidally extrapolate. */
    RCCE_Oscillate = 2,
    /** Use a linearly increasing value for extrapolation. */
    RCCE_Linear = 3,
    /** Use a constant value for extrapolation */
    RCCE_Constant = 4,
    /** No Extrapolation */
    RCCE_None = 5
}
/**
 * A rich, editable float curve
 */
export declare class FRealCurve {
    /**
     * Default value
     * @type {number}
     * @public
     */
    defaultValue: number;
    /**
     * Pre-infinity extrapolation state
     * @type {ERichCurveExtrapolation}
     * @public
     */
    preInfinityExtrap: ERichCurveExtrapolation;
    /**
     * Post-infinity extrapolation state
     * @type {ERichCurveExtrapolation}
     * @public
     */
    postInfinityExtrap: ERichCurveExtrapolation;
    /**
     * Get range of input time values. Outside this region curve continues constantly the start/end values
     * @param {FloatRef} minTime Min time
     * @param {FloatRef} maxTime Max time
     * @returns {void}
     * @public
     */
    getTimeRange(minTime: FloatRef, maxTime: FloatRef): void;
    /**
     * Get range of output values
     * @param {FloatRef} minValue Min value
     * @param {FloatRef} maxValue Max value
     * @returns {void}
     * @public
     */
    getValueRange(minValue: FloatRef, maxValue: FloatRef): void;
    /**
     * Clear all keys.
     * @returns {void}
     * @public
     */
    reset(): void;
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
     * Cycles time
     * @param {number} minTime Min time
     * @param {number} maxTime Max time
     * @param {FloatRef} inTime In time
     * @param {IntRef} cycleCount Cycle count
     * @returns {void}
     * @protected
     * @static
     */
    protected static cycleTime(minTime: number, maxTime: number, inTime: FloatRef, cycleCount: IntRef): void;
    /**
     * Applies values from FStructFallback
     * @param {FStructFallback} fallback Fallback to use
     * @param {FRealCurve} obj Object to apply values to
     * @returns {FRealCurve} Object
     * @public
     * @static
     */
    static loadFromFallback(fallback: FStructFallback, obj?: FRealCurve): FRealCurve;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): {
        defaultValue: number;
        preInfinityExtrap: string;
        postInfinityExtrap: string;
    };
}
