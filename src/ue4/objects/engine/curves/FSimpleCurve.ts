import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
import { ERichCurveExtrapolation, ERichCurveInterpMode, FRealCurve } from "./FRealCurve";
import { FloatRef, ObjectRef } from "../../../../util/ObjectRef";
import { isNearlyZero, lerp } from "../../core/math/UnrealMathUtility";
import { FLOAT_MAX_VALUE } from "../../../../util/Const";
import { UProperty } from "../../../../util/decorators/UProperty";
import { FStructFallback } from "../../../assets/objects/FStructFallback";

/**
 * One key in a rich, editable float curve
 * @implements {IStructType}
 */
export class FSimpleCurveKey implements IStructType {
    /**
     * Time at this key
     * @type {number}
     * @public
     */
    public time: number = 0

    /**
     * Value at this key
     * @type {number}
     * @public
     */
    public value: number = 0

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using a value
     * @param {number} time Time to use
     * @param {number} value Value to use
     * @constructor
     * @public
     */
    constructor(time: number, value: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.time = x.readFloat32()
            this.value = x.readFloat32()
        } else {
            this.time = x
            this.value = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeFloat32(this.time)
        Ar.writeFloat32(this.value)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            time: this.time,
            value: this.value
        }
    }
}

/**
 * A rich, editable float curve
 * @extends {FRealCurve}
 */
export class FSimpleCurve extends FRealCurve {
    /**
     * Interpolation mode between this key and the next
     * @type {ERichCurveInterpMode}
     * @public
     */
    @UProperty({name: "InterpMode"})
    public interpMode = ERichCurveInterpMode.RCIM_Linear

    /**
     * Sorted array of keys
     * @type {Array<FSimpleCurveKey>}
     * @public
     */
    @UProperty({name: "Keys"})
    public keys: FSimpleCurveKey[] = []

    /**
     * Applies values from FStructFallback
     * @param {FStructFallback} fallback Fallback to use
     * @returns {FSimpleCurve} Object
     * @public
     * @static
     */
    static loadFromFallback(fallback: FStructFallback) {
        const obj = new FSimpleCurve()
        super.loadFromFallback(fallback, obj)
        const mode = fallback.get<any>("InterpMode").text.split(":").pop()
        obj.interpMode = ERichCurveInterpMode[mode] as any
        obj.keys = fallback.get<any>("Keys").contents.map(s => s.struct.structType)
        return obj
    }

    /**
     * Get range of input time values. Outside this region curve continues constantly the start/end values
     * @param {FloatRef} minTime Min time
     * @param {FloatRef} maxTime Max time
     * @returns {void}
     * @public
     */
    getTimeRange(minTime: FloatRef, maxTime: FloatRef) {
        if (this.keys.length === 0) {
            minTime.element = 0
            maxTime.element = 0
        } else {
            minTime.element = this.keys[0].time
            maxTime.element = this.keys.pop().time
        }
    }

    /**
     * Get range of output values
     * @param {FloatRef} minValue Min value
     * @param {FloatRef} maxValue Max value
     * @returns {void}
     * @public
     */
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

    /**
     * Clear all keys.
     * @returns {void}
     * @public
     */
    reset() {
        this.keys = []
    }

    /**
     * Remaps inTime based on pre and post infinity extrapolation values
     * @param {FloatRef} inTime In time
     * @param {FloatRef} cycleValueOffset Cycle value offset
     * @returns {void}
     * @public
     */
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

    /**
     * Evaluates this curve at the specified time
     * @param {number} inTime In time
     * @param {number} inDefaultValue In default value
     * @returns {number} Result
     * @public
     */
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
                interpVal = this.keys.pop().value
            }
        }

        return interpVal + cycleValueOffset
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        const obj = super.toJson() as any
        obj.interpMode = Object.keys(ERichCurveInterpMode).filter(k => k.length > 1)[this.interpMode]
        obj.keys = this.keys.map(k => k.toJson())
        return obj
    }

    /**
     * Evals for two keys
     * @param {FRichCurveKey} key1 First key
     * @param {FRichCurveKey} key2 Second key
     * @param {number} inTime In time
     * @returns {number} Result
     * @private
     */
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


