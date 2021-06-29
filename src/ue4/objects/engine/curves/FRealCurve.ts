/** Method of interpolation between this key and the next. */
import { FloatRef, IntRef, ObjectRef } from "../../../../util/ObjectRef";
import { FLOAT_MAX_VALUE } from "../../../../util/Const";
import { UProperty } from "../../../../util/decorators/UProperty";
import { FStructFallback } from "../../../assets/objects/FStructFallback";

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

/** Enumerates extrapolation options. */
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

/** A rich, editable float curve */
export class FRealCurve {
    /** Default value */
    @UProperty({ name: "DefaultValue" })
    defaultValue = FLOAT_MAX_VALUE
    /** Pre-infinity extrapolation state */
    @UProperty({ name: "PreInfinityExtrap" })
    preInfinityExtrap = ERichCurveExtrapolation.RCCE_Constant
    /** Post-infinity extrapolation state */
    @UProperty({ name: "PostInfinityExtrap" })
    postInfinityExtrap = ERichCurveExtrapolation.RCCE_Constant

    /** Get range of input time values. Outside this region curve continues constantly the start/end values. */
    getTimeRange(minTime: FloatRef, maxTime: FloatRef) { }

    /** Get range of output values. */
    getValueRange(minValue: FloatRef, maxValue: FloatRef) { }

    /** Clear all keys. */
    reset() { }

    /** Remap inTime based on pre and post infinity extrapolation values */
    remapTimeValue(inTime: FloatRef, cycleValueOffset: FloatRef) { }

    /** Evaluate this curve at the specified time */
    eval(inTime: number, inDefaultValue: number = 0.0) {
        return 0
    }

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

    static loadFromFallback(fallback: FStructFallback, obj: FRealCurve = new FRealCurve()) {
        obj.defaultValue = fallback.get("DefaultValue")
        obj.preInfinityExtrap = ERichCurveExtrapolation[fallback.get<any>("PreInfinityExtrap").text.split(":").pop()] as any
        obj.postInfinityExtrap = ERichCurveExtrapolation[fallback.get<any>("PostInfinityExtrap").text.split(":").pop()] as any
        return obj
    }

    toJson() {
        return {
            defaultValue: this.defaultValue,
            preInfinityExtrap: Object.keys(ERichCurveExtrapolation).filter(k => k.length > 1)[this.preInfinityExtrap],
            postInfinityExtrap: Object.keys(ERichCurveExtrapolation).filter(k => k.length > 1)[this.postInfinityExtrap]
        }
    }
}
