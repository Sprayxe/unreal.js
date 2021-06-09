import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
import { ERichCurveExtrapolation, ERichCurveInterpMode, FRealCurve } from "./FRealCurve";
import { FloatRef, ObjectRef } from "../../../../util/ObjectRef";
import { isNearlyZero, lerp } from "../../core/math/UnrealMathUtility";
import { FLOAT_MAX_VALUE } from "../../../../util/Const";
import { UProperty } from "../../../../util/decorators/UProperty";

/** One key in a rich, editable float curve */
export class FSimpleCurveKey implements IStructType {
    /** Time at this key */
    public time: number = 0
    /** Value at this key */
    public value: number = 0

    constructor(Ar: FArchive)
    constructor(time: number, value: number)
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.time = x.readFloat32()
            this.value = x.readFloat32()
        } else {
            this.time = x
            this.value = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeFloat32(this.time)
        Ar.writeFloat32(this.value)
    }

    toJson(): any {
        return {
            time: this.time,
            value: this.value
        }
    }
}

/** A rich, editable float curve */
export class FSimpleCurve extends FRealCurve {
    /** Interpolation mode between this key and the next */
    @UProperty({ name: "InterpMode" })
    public interpMode = ERichCurveInterpMode.RCIM_Linear
    /** Sorted array of keys */
    @UProperty({ name: "Keys" })
    public keys = new Array<FSimpleCurveKey>()

    /** Get range of input time values. Outside this region curve continues constantly the start/end values. */
    getTimeRange(minTime: FloatRef, maxTime: FloatRef) {
        if (this.keys.length === 0) {
            minTime.element = 0
            maxTime.element = 0
        } else {
            minTime.element = this.keys[0].time
            maxTime.element = this.keys.pop().time
        }
    }

    /** Get range of output values. */
   getValueRange(minValue: FloatRef, maxValue: FloatRef) {
        if (this.keys.length === 0) {
            minValue.element = 0
            maxValue.element = 0
        } else {
            minValue.element = this.keys[0].value
            maxValue.element = this.keys[0].value

            for (const key of this.keys) {
                minValue.element = Math.min(minValue.element, key.value)
                maxValue.element = Math.max(maxValue.element, key.value)
            }
        }
   }

    /** Clear all keys. */
    reset() {
        this.keys = []
    }

    /** Remap inTime based on pre and post infinity extrapolation values */
    remapTimeValue(inTime: FloatRef, cycleValueOffset: FloatRef) {
        const numKeys = this.keys.length
        if (numKeys < 2)
            return

        if (inTime.element <= this.keys[0].time) {
            if (this.preInfinityExtrap !== ERichCurveExtrapolation.RCCE_Linear
                && this.preInfinityExtrap !== ERichCurveExtrapolation.RCCE_Constant) {
                const minTime = this.keys[0].time
                const maxTime = this.keys[numKeys - 1].time

                const cycleCount = new ObjectRef(0)
                FRealCurve.cycleTime(minTime, maxTime, inTime, cycleCount)

                if (this.preInfinityExtrap === ERichCurveExtrapolation.RCCE_CycleWithOffset) {
                    const dv = this.keys[0].value - this.keys[numKeys - 1].value
                    cycleValueOffset.element = dv * cycleCount.element
                } else if (this.preInfinityExtrap === ERichCurveExtrapolation.RCCE_Oscillate) {
                    if (cycleCount.element % 2 === 1) {
                        inTime.element = minTime + (maxTime - inTime.element)
                    }
                }
            }
        } else if (inTime.element >= this.keys[numKeys - 1].time) {
            if (this.postInfinityExtrap !== ERichCurveExtrapolation.RCCE_Linear
                && this.postInfinityExtrap !== ERichCurveExtrapolation.RCCE_Constant) {
                const minTime = this.keys[0].time
                const maxTime = this.keys[numKeys - 1].time

                const cycleCount = new ObjectRef(0)
                FRealCurve.cycleTime(minTime, maxTime, inTime, cycleCount)

                if (this.postInfinityExtrap === ERichCurveExtrapolation.RCCE_CycleWithOffset) {
                    const dv = this.keys[numKeys - 1].value - this.keys[0].value
                    cycleValueOffset.element = dv * cycleCount.element
                } else if (this.postInfinityExtrap === ERichCurveExtrapolation.RCCE_Oscillate) {
                    if (cycleCount.element % 2 === 1) {
                        inTime.element = minTime + (maxTime - inTime.element)
                    }
                }
            }
        }
    }

    /** Evaluate this curve at the specified time */
    eval(inTime: number, inDefaultValue: number): number {
        // Remap time if extrapolation is present and compute offset value to use if cycling
        let cycleValueOffset = 0
        const inTimeRef = new ObjectRef(inTime)
        const cycleValueOffsetRef = new ObjectRef(cycleValueOffset)
        this.remapTimeValue(inTimeRef, cycleValueOffsetRef)
        inTime = inTimeRef.element
        cycleValueOffset = cycleValueOffsetRef.element

        const numKeys = this.keys.length
        // If the default value hasn't been initialized, use the incoming default value
        let interpVal = this.defaultValue === FLOAT_MAX_VALUE ? inDefaultValue : this.defaultValue
        if (numKeys === 0) {
            // If no keys in curve, return the Default value.
        } else if (numKeys < 2 || (inTime <= this.keys[0].time)) {
            if (this.preInfinityExtrap === ERichCurveExtrapolation.RCCE_Linear && numKeys > 1) {
                const dt = this.keys[1].time - this.keys[0].time
                if (isNearlyZero(dt)) {
                    interpVal = this.keys[0].value
                } else {
                    const dv = this.keys[1].value - this.keys[0].value
                    const slope = dv / dt
                    interpVal = slope * (inTime - this.keys[0].time) + this.keys[0].value
                }
            } else {
                // Otherwise if constant or in a cycle or oscillate, always use the first key value
                interpVal = this.keys[0].value
            }
        } else if (inTime < this.keys.pop().time) {
            // perform a lower bound to get the second of the interpolation nodes
            let first = 1
            const last = numKeys - 1
            let count = last - first
            while (count > 0) {
                const step = count / 2
                const middle = first + step
                if (inTime >= this.keys[middle].time) {
                    first = middle + 1
                    count -= step + 1
                } else {
                    count = step
                }
            }
            interpVal = this.evalForTwoKeys(this.keys[first - 1], this.keys[first], inTime)
        } else {
            if (this.postInfinityExtrap === ERichCurveExtrapolation.RCCE_Linear) {
                const dt = this.keys[numKeys - 2].time - this.keys[numKeys - 1].time
                if (isNearlyZero(dt)) {
                    interpVal = this.keys[numKeys - 1].value
                } else {
                    const dv = this.keys[numKeys - 2].value - this.keys[numKeys - 1].value
                    const slope = dv / dt

                    interpVal = slope * (inTime - this.keys[numKeys - 1].time) + this.keys[numKeys - 1].value
                }
            } else {
                // Otherwise if constant or in a cycle or oscillate, always use the last key value
                interpVal = this.keys[numKeys - 1].value
            }
        }

        return interpVal + cycleValueOffset
    }

    toJson() {
        const obj = super.toJson() as any
        obj.interpMode = Object.keys(ERichCurveInterpMode)[this.interpMode]
        obj.keys = this.keys.map(k => k.toJson())
        return obj
    }

    private evalForTwoKeys(key1: FSimpleCurveKey, key2: FSimpleCurveKey, inTime: number) {
        const diff = key2.time - key1.time
        if (diff > 0 && this.interpMode !== ERichCurveInterpMode.RCIM_Constant) {
            const alpha = (inTime - key1.time) / diff
            const p0 = key1.value
            const p3 = key2.value
            return lerp(p0, p3, alpha)
        } else {
            return key1.value
        }
    }
}


