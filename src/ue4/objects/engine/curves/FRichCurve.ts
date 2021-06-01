import { ERichCurveExtrapolation, ERichCurveInterpMode, FRealCurve } from "./FRealCurve";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { FloatRef, ObjectRef } from "../../../../util/ObjectRef";
import { FLOAT_MAX_VALUE, FLOAT_MIN_VALUE } from "../../../../util/Const";
import { isNearlyZero, lerp } from "../../core/math/UnrealMathUtility";
import Bezier from "bezier-js"
import { IStructType } from "../../../assets/objects/UScriptStruct";

/** If using RCIM_Cubic, this enum describes how the tangents should be controlled in editor. */
export enum ERichCurveTangentMode {
    /** Automatically calculates tangents to create smooth curves between values. */
    RCTM_Auto,
    /** User specifies the tangent as a unified tangent where the two tangents are locked to each other, presenting a consistent curve before and after. */
    RCTM_User,
    /** User specifies the tangent as two separate broken tangents on each side of the key which can allow a sharp change in evaluation before or after. */
    RCTM_Break,
    /** No tangents. */
    RCTM_None
}

/** Enumerates tangent weight modes. */
export enum ERichCurveTangentWeightMode {
    /** Don't take tangent weights into account. */
    RCTWM_WeightedNone,
    /** Only take the arrival tangent weight into account for evaluation. */
    RCTWM_WeightedArrive,
    /** Only take the leaving tangent weight into account for evaluation. */
    RCTWM_WeightedLeave,
    /** Take both the arrival and leaving tangent weights into account for evaluation. */
    RCTWM_WeightedBoth
}

/** One key in a rich, editable float curve */
export class FRichCurveKey implements IStructType {
    /** Interpolation mode between this key and the next */
    public interpMode: ERichCurveInterpMode

    /** Mode for tangents at this key */
    public tangentMode: ERichCurveTangentMode

    /** If either tangent at this key is 'weighted' */
    public tangentWeightMode: ERichCurveTangentWeightMode

    /** Time at this key */
    public time: number

    /** Value at this key */
    public value: number

    /** If RCIM_Cubic, the arriving tangent at this key */
    public arriveTangent: number

    /** If RCTWM_WeightedArrive or RCTWM_WeightedBoth, the weight of the left tangent */
    public arriveTangentWeight: number

    /** If RCIM_Cubic, the leaving tangent at this key */
    public leaveTangent: number

    /** If RCTWM_WeightedLeave or RCTWM_WeightedBoth, the weight of the right tangent */
    public leaveTangentWeight: number

    constructor(Ar: FArchive)
    constructor(
        interpMode: ERichCurveInterpMode,
        tangentMode: ERichCurveTangentMode,
        tangentWeightMode: ERichCurveTangentWeightMode,
        time: number,
        value: number,
        arriveTangent: number,
        arriveTangentWeight: number,
        leaveTangent: number,
        leaveTangentWeight: number
    )
    constructor(...args) {
        const arg = args[0]
        if (arg instanceof FArchive) {
            // read interpMode
            let i = arg.readUInt8()
            const _i = Object.keys(ERichCurveInterpMode).length
            if (i > _i) {
                console.warn(`Unknown ERichCurveInterpMode with ordinal ${i}, falling back to RCIM_Linear`)
                i = ERichCurveInterpMode.RCIM_Linear
            }
            this.interpMode = i
            // read tangentMode
            let t = arg.readUInt8()
            const _t = Object.keys(ERichCurveTangentMode).length
            if (t > _t) {
                console.warn(`Unknown ERichCurveTangentMode with ordinal ${i}, falling back to RCTM_Auto`)
                t = ERichCurveTangentMode.RCTM_Auto
            }
            this.tangentMode = i
            // read tangentWeightMode
            let tw = arg.readUInt8()
            const _tw = Object.keys(ERichCurveTangentWeightMode).length
            if (tw > _tw) {
                console.warn(`Unknown ERichCurveTangentWeightMode with ordinal ${i}, falling back to RCTWM_WeightedNone`)
                tw = ERichCurveTangentWeightMode.RCTWM_WeightedNone
            }
            this.tangentWeightMode = tw
            // other props
            this.time = arg.readFloat32()
            this.value = arg.readFloat32()
            this.arriveTangent = arg.readFloat32()
            this.arriveTangentWeight = arg.readFloat32()
            this.leaveTangent = arg.readFloat32()
            this.leaveTangentWeight = arg.readFloat32()
        } else {
            this.interpMode = arg
            this.tangentMode = args[1]
            this.tangentWeightMode = args[2]
            this.time = args[3]
            this.value = args[4]
            this.arriveTangent = args[5]
            this.arriveTangentWeight = args[6]
            this.leaveTangent = args[7]
            this.leaveTangentWeight = args[8]
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.write(this.interpMode)
        Ar.write(this.tangentMode)
        Ar.write(this.tangentWeightMode)
        Ar.writeFloat32(this.time)
        Ar.writeFloat32(this.value)
        Ar.writeFloat32(this.arriveTangent)
        Ar.writeFloat32(this.arriveTangentWeight)
        Ar.writeFloat32(this.leaveTangent)
        Ar.writeFloat32(this.leaveTangentWeight)
    }

    toJson(): any {
        const key = (v, k) => Object.keys(k)[v]
        return {
            interpMode: key(this.interpMode, ERichCurveInterpMode),
            tangentMode: key(this.tangentMode, ERichCurveTangentMode),
            tangentWeightMode: key(this.tangentWeightMode, ERichCurveTangentWeightMode),
            time: this.time,
            value: this.value,
            arriveTangent: this.arriveTangent,
            arriveTangentWeight: this.arriveTangentWeight,
            leaveTangent: this.leaveTangent,
            leaveTangentWeight: this.leaveTangentWeight
        }
    }
}

/** A rich, editable float curve */
export class FRichCurve extends FRealCurve {
    /** Sorted array of keys */
    public keys = new Array<FRichCurveKey>()

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
                FRichCurve.cycleTime(minTime, maxTime, inTime, cycleCount)

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
                FRichCurve.cycleTime(minTime, maxTime, inTime, cycleCount)

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

    /** Evaluate this rich curve at the specified time */
    eval(inTime: number, inDefaultValue: number = 0.0): number {
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

            interpVal = FRichCurve.evalForTwoKeys(this.keys[first - 1], this.keys[first], inTime)
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

    private static evalForTwoKeys(key1: FRichCurveKey, key2: FRichCurveKey, inTime: number): number {
        const diff = key2.time - key1.time

        if (diff > 0 && key1.interpMode !== ERichCurveInterpMode.RCIM_Constant) {
            const alpha = (inTime - key1.time) / diff
            const p0 = key1.value
            const p3 = key2.value

            if (key1.interpMode === ERichCurveInterpMode.RCIM_Linear) {
                return lerp(p0, p3, alpha)
            } else {
                if (isItNotWeighted(key1, key2)) {
                    const oneThird = 1.0 / 3.0
                    const p1 = p0 + (key1.leaveTangent * diff * oneThird)
                    const p2 = p3 - (key2.arriveTangent * diff * oneThird)

                    return bezierInterp(p0, p1, p2, p3, alpha)
                } else { //it's weighted
                    return weightedEvalForTwoKeys(
                        key1.value, key1.time, key1.leaveTangent, key1.leaveTangentWeight, key1.tangentWeightMode,
                        key2.value, key2.time, key2.arriveTangent, key2.arriveTangentWeight, key2.tangentWeightMode,
                        inTime)
                }
            }
        } else {
            return key1.value
        }
    }
}

export function bezierInterp(p0: number, p1: number, p2: number, p3: number, alpha: number): number {
    const p01 = lerp(p0, p1, alpha)
    const p12 = lerp(p1, p2, alpha)
    const p23 = lerp(p2, p3, alpha)
    const p012 = lerp(p01, p12, alpha)
    const p123 = lerp(p12, p23, alpha)
    return lerp(p012, p123, alpha)
}

export function bezierToPower(
    a1: number, b1: number, c1: number,
    d1: number, out: number[]
) {
    const a = b1 - a1
    const b = c1 - b1
    const c = d1 - c1
    const d = b - a
    /*a2*/ out[3] = c - b - d
    /*b2*/ out[2] = 3.0 * d
    /*c2*/ out[1] = 3.0 * a
    /*d2*/ out[0] = a1
}

export function weightedEvalForTwoKeys(
    key1Value: number, key1Time: number, key1LeaveTangent: number, key1LeaveTangentWeight: number, key1TangentWeightMode: ERichCurveTangentWeightMode,
    key2Value: number, key2Time: number, key2ArriveTangent: number, key2ArriveTangentWeight: number, key2TangentWeightMode: ERichCurveTangentWeightMode,
    inTime: number
): number {
    const diff = key2Time - key1Time
    const alpha = (inTime - key1Time) / diff
    const p0 = key1Value
    const p3 = key2Value
    const oneThird = 1.0 / 3.0
    const time1 = key1Time
    const time2 = key2Time
    const x = time2 - time1
    let angle = Math.atan(key1LeaveTangent)
    let cosAngle = Math.cos(angle)
    let sinAngle = Math.sin(angle)

    let leaveWeight: number
    if (key1TangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedNone
        || key1TangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedArrive) {
        const y = key1LeaveTangent * x
        leaveWeight = Math.sqrt(x * x + y * y) * oneThird
    } else {
        leaveWeight = key1LeaveTangentWeight
    }

    const key1TanX = cosAngle * leaveWeight + time1
    const key1TanY = sinAngle * leaveWeight + key1Value

    angle = Math.atan(key2ArriveTangent)
    cosAngle = Math.cos(angle)
    sinAngle = Math.sin(angle)

    let arriveWeight: number
    if (key2TangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedNone
        || key2TangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedLeave) {
        const y = key2ArriveTangent * x
        arriveWeight = Math.sqrt(x * x + y * y) * oneThird
    } else {
        arriveWeight = key2ArriveTangentWeight
    }

    const key2TanX = -cosAngle * arriveWeight + time2
    const key2TanY = -sinAngle * arriveWeight + key2Value

    // Normalize the Time Range
    const rangeX = time2 - time1
    const dx1 = key1TanX - time1
    const dx2 = key2TanX - time1

    // Normalize values
    const normalizedX1 = dx1 / rangeX
    const normalizedX2 = dx2 / rangeX

    const coeff = new Array<number>(4) // DoubleArray
    const results = new Array<number>(3) // DoubleArray

    //Convert Bezier to Power basis, also float to double for precision for root finding.
    bezierToPower(
        0.0, normalizedX1, normalizedX2, 1.0,
        coeff
    )

    coeff[0] = coeff[0] - alpha
    const numResults = new Bezier(coeff[0], results[0], coeff[1], results[1], coeff[2], results[2], coeff[3]).length() // NOT TESTED: PROBABLY WRONG LOL
    let newInterp = alpha
    if (numResults === 1) {
        newInterp = results[0]
    } else {
        newInterp = FLOAT_MIN_VALUE
        for (const result of results) {
            if ((result >= 0.0) && (result <= 1.0)) {
                if (newInterp < 0.0 || result > newInterp) {
                    newInterp = result
                }
            }
        }
        if (newInterp === FLOAT_MIN_VALUE)
            newInterp = 0
    }

    //now use newInterp and adjusted tangents plugged into the Y (Value) part of the graph.
    //val p0 = key1.value
    //val p3 = key2.value
    return bezierInterp(p0, key1TanY, key2TanY, p3, newInterp)
}

function isItNotWeighted(key1: FRichCurveKey, key2: FRichCurveKey) {
    return ((key1.tangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedNone
        || key1.tangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedArrive)
        && (key2.tangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedNone
            || key2.tangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedLeave))
}

