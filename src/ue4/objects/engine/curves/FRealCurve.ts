import { FloatRef, IntRef } from "../../../../util/ObjectRef";
import { FLOAT_MAX_VALUE } from "../../../../util/Const";
import { UProperty } from "../../../../util/decorators/UProperty";
import { FStructFallback } from "../../../assets/objects/FStructFallback";

/**
 * Method of interpolation between this key and the next
 * @enum
 */
export enum ERichCurveInterpMode {
    /** Use linear interpolation between values. */
    RCIM_Linear,
    /** Use a constant value. Represents stepped values. */
    RCIM_Constant,
    /** Cubic interpolation. See TangentMode for different cubic interpolation options. */
    RCIM_Cubic,
    /** No interpolation. */
    RCIM_None
}

/**
 * Enumerates extrapolation options.
 * @enum
 */
export enum ERichCurveExtrapolation {
    /** Repeat the curve without an offset. */
    RCCE_Cycle,
    /** Repeat the curve with an offset relative to the first or last key's value. */
    RCCE_CycleWithOffset,
    /** Sinusoidally extrapolate. */
    RCCE_Oscillate,
    /** Use a linearly increasing value for extrapolation. */
    RCCE_Linear,
    /** Use a constant value for extrapolation */
    RCCE_Constant,
    /** No Extrapolation */
    RCCE_None
}

/**
 * A rich, editable float curve
 */
export class FRealCurve {
    /**
     * Default value
     * @type {number}
     * @public
     */
    @UProperty({ name: "DefaultValue" })
    defaultValue = FLOAT_MAX_VALUE

    /**
     * Pre-infinity extrapolation state
     * @type {ERichCurveExtrapolation}
     * @public
     */
    @UProperty({ name: "PreInfinityExtrap" })
    preInfinityExtrap = ERichCurveExtrapolation.RCCE_Constant

    /**
     * Post-infinity extrapolation state
     * @type {ERichCurveExtrapolation}
     * @public
     */
    @UProperty({ name: "PostInfinityExtrap" })
    postInfinityExtrap = ERichCurveExtrapolation.RCCE_Constant

    /**
     * Get range of input time values. Outside this region curve continues constantly the start/end values
     * @param {FloatRef} minTime Min time
     * @param {FloatRef} maxTime Max time
     * @returns {void}
     * @public
     */
    getTimeRange(minTime: FloatRef, maxTime: FloatRef) {
    }

    /**
     * Get range of output values
     * @param {FloatRef} minValue Min value
     * @param {FloatRef} maxValue Max value
     * @returns {void}
     * @public
     */
    getValueRange(minValue: FloatRef, maxValue: FloatRef) {
    }

    /**
     * Clear all keys.
     * @returns {void}
     * @public
     */
    reset() {
    }

    /**
     * Remaps inTime based on pre and post infinity extrapolation values
     * @param {FloatRef} inTime In time
     * @param {FloatRef} cycleValueOffset Cycle value offset
     * @returns {void}
     * @public
     */
    remapTimeValue(inTime: FloatRef, cycleValueOffset: FloatRef) {
    }

    /**
     * Evaluates this curve at the specified time
     * @param {number} inTime In time
     * @param {number} inDefaultValue In default value
     * @returns {number} Result
     * @public
     */
    eval(inTime: number, inDefaultValue: number = 0.0) {
        return 0
    }

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
    protected static cycleTime(minTime: number, maxTime: number, inTime: FloatRef, cycleCount: IntRef) {
        const initTime = inTime.element
        const duration = maxTime - minTime

        if (inTime.element > maxTime) {
            cycleCount.element = (maxTime - inTime.element) / duration
            inTime.element = inTime.element + duration * cycleCount.element
        } else if (inTime.element < minTime) {
            cycleCount.element = (inTime.element - minTime) / duration
            inTime.element = inTime.element - duration * cycleCount.element
        }

        if (inTime.element === maxTime && initTime < minTime) {
            inTime.element = minTime
        }

        if (inTime.element === minTime && initTime > maxTime) {
            inTime.element = maxTime
        }

        cycleCount.element = Math.abs(cycleCount.element)
    }

    /**
     * Applies values from FStructFallback
     * @param {FStructFallback} fallback Fallback to use
     * @param {FRealCurve} obj Object to apply values to
     * @returns {FRealCurve} Object
     * @public
     * @static
     */
    static loadFromFallback(fallback: FStructFallback, obj: FRealCurve = new FRealCurve()) {
        obj.defaultValue = fallback.get("DefaultValue")
        obj.preInfinityExtrap = ERichCurveExtrapolation[fallback.get<any>("PreInfinityExtrap").text.split(":").pop()] as any
        obj.postInfinityExtrap = ERichCurveExtrapolation[fallback.get<any>("PostInfinityExtrap").text.split(":").pop()] as any
        return obj
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            defaultValue: this.defaultValue,
            preInfinityExtrap: Object.keys(ERichCurveExtrapolation).filter(k => k.length > 1)[this.preInfinityExtrap],
            postInfinityExtrap: Object.keys(ERichCurveExtrapolation).filter(k => k.length > 1)[this.postInfinityExtrap]
        }
    }
}
