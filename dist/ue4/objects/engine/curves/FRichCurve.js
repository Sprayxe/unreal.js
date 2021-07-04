"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRichCurve = exports.FRichCurveKey = exports.ERichCurveTangentWeightMode = exports.ERichCurveTangentMode = void 0;
const FRealCurve_1 = require("./FRealCurve");
const FArchive_1 = require("../../../reader/FArchive");
const ObjectRef_1 = require("../../../../util/ObjectRef");
const Const_1 = require("../../../../util/Const");
const UnrealMathUtility_1 = require("../../core/math/UnrealMathUtility");
const bezier_js_1 = __importDefault(require("bezier-js"));
const UProperty_1 = require("../../../../util/decorators/UProperty");
/**
 * If using RCIM_Cubic, this enum describes how the tangents should be controlled in editor.
 * @enum
 */
var ERichCurveTangentMode;
(function (ERichCurveTangentMode) {
    /** Automatically calculates tangents to create smooth curves between values. */
    ERichCurveTangentMode[ERichCurveTangentMode["RCTM_Auto"] = 0] = "RCTM_Auto";
    /** User specifies the tangent as a unified tangent where the two tangents are locked to each other, presenting a consistent curve before and after. */
    ERichCurveTangentMode[ERichCurveTangentMode["RCTM_User"] = 1] = "RCTM_User";
    /** User specifies the tangent as two separate broken tangents on each side of the key which can allow a sharp change in evaluation before or after. */
    ERichCurveTangentMode[ERichCurveTangentMode["RCTM_Break"] = 2] = "RCTM_Break";
    /** No tangents. */
    ERichCurveTangentMode[ERichCurveTangentMode["RCTM_None"] = 3] = "RCTM_None";
})(ERichCurveTangentMode = exports.ERichCurveTangentMode || (exports.ERichCurveTangentMode = {}));
/**
 * Enumerates tangent weight modes
 * @enum
 */
var ERichCurveTangentWeightMode;
(function (ERichCurveTangentWeightMode) {
    /** Don't take tangent weights into account. */
    ERichCurveTangentWeightMode[ERichCurveTangentWeightMode["RCTWM_WeightedNone"] = 0] = "RCTWM_WeightedNone";
    /** Only take the arrival tangent weight into account for evaluation. */
    ERichCurveTangentWeightMode[ERichCurveTangentWeightMode["RCTWM_WeightedArrive"] = 1] = "RCTWM_WeightedArrive";
    /** Only take the leaving tangent weight into account for evaluation. */
    ERichCurveTangentWeightMode[ERichCurveTangentWeightMode["RCTWM_WeightedLeave"] = 2] = "RCTWM_WeightedLeave";
    /** Take both the arrival and leaving tangent weights into account for evaluation. */
    ERichCurveTangentWeightMode[ERichCurveTangentWeightMode["RCTWM_WeightedBoth"] = 3] = "RCTWM_WeightedBoth";
})(ERichCurveTangentWeightMode = exports.ERichCurveTangentWeightMode || (exports.ERichCurveTangentWeightMode = {}));
/**
 * One key in a rich, editable float curve
 * @implements {IStructType}
 */
class FRichCurveKey {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg = args[0];
        if (arg instanceof FArchive_1.FArchive) {
            // read interpMode
            let i = arg.readUInt8();
            const _i = Object.keys(FRealCurve_1.ERichCurveInterpMode).length;
            if (i > _i) {
                console.warn(`Unknown ERichCurveInterpMode with ordinal ${i}, falling back to RCIM_Linear`);
                i = FRealCurve_1.ERichCurveInterpMode.RCIM_Linear;
            }
            this.interpMode = i;
            // read tangentMode
            let t = arg.readUInt8();
            const _t = Object.keys(ERichCurveTangentMode).length;
            if (t > _t) {
                console.warn(`Unknown ERichCurveTangentMode with ordinal ${i}, falling back to RCTM_Auto`);
                t = ERichCurveTangentMode.RCTM_Auto;
            }
            this.tangentMode = i;
            // read tangentWeightMode
            let tw = arg.readUInt8();
            const _tw = Object.keys(ERichCurveTangentWeightMode).length;
            if (tw > _tw) {
                console.warn(`Unknown ERichCurveTangentWeightMode with ordinal ${i}, falling back to RCTWM_WeightedNone`);
                tw = ERichCurveTangentWeightMode.RCTWM_WeightedNone;
            }
            this.tangentWeightMode = tw;
            // other props
            this.time = arg.readFloat32();
            this.value = arg.readFloat32();
            this.arriveTangent = arg.readFloat32();
            this.arriveTangentWeight = arg.readFloat32();
            this.leaveTangent = arg.readFloat32();
            this.leaveTangentWeight = arg.readFloat32();
        }
        else {
            this.interpMode = arg;
            this.tangentMode = args[1];
            this.tangentWeightMode = args[2];
            this.time = args[3];
            this.value = args[4];
            this.arriveTangent = args[5];
            this.arriveTangentWeight = args[6];
            this.leaveTangent = args[7];
            this.leaveTangentWeight = args[8];
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.write(this.interpMode);
        Ar.write(this.tangentMode);
        Ar.write(this.tangentWeightMode);
        Ar.writeFloat32(this.time);
        Ar.writeFloat32(this.value);
        Ar.writeFloat32(this.arriveTangent);
        Ar.writeFloat32(this.arriveTangentWeight);
        Ar.writeFloat32(this.leaveTangent);
        Ar.writeFloat32(this.leaveTangentWeight);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        const key = (v, k) => Object.keys(k)[v];
        return {
            interpMode: key(this.interpMode, FRealCurve_1.ERichCurveInterpMode),
            tangentMode: key(this.tangentMode, ERichCurveTangentMode),
            tangentWeightMode: key(this.tangentWeightMode, ERichCurveTangentWeightMode),
            time: this.time,
            value: this.value,
            arriveTangent: this.arriveTangent,
            arriveTangentWeight: this.arriveTangentWeight,
            leaveTangent: this.leaveTangent,
            leaveTangentWeight: this.leaveTangentWeight
        };
    }
}
exports.FRichCurveKey = FRichCurveKey;
/**
 * A rich, editable float curve
 * @extends {FRealCurve}
 * */
class FRichCurve extends FRealCurve_1.FRealCurve {
    constructor() {
        super(...arguments);
        /**
         * Sorted array of keys
         * @type {Array<FRichCurveKey>}
         */
        this.keys = [];
    }
    /**
     * Applies values from FStructFallback
     * @param {FStructFallback} fallback Fallback to use
     * @returns {FRichCurve} Object
     * @public
     * @static
     */
    static loadFromFallback(fallback) {
        const obj = new FRichCurve();
        super.loadFromFallback(fallback, obj);
        obj.keys = fallback.get("Keys").contents.map(s => s.struct.structType);
        return obj;
    }
    /**
     * Remaps inTime based on pre and post infinity extrapolation values
     * @param {FloatRef} inTime In time
     * @param {FloatRef} cycleValueOffset Cycle value offset
     * @returns {void}
     * @public
     */
    remapTimeValue(inTime, cycleValueOffset) {
        const numKeys = this.keys.length;
        if (numKeys < 2)
            return;
        if (inTime.element <= this.keys[0].time) {
            if (this.preInfinityExtrap !== FRealCurve_1.ERichCurveExtrapolation.RCCE_Linear
                && this.preInfinityExtrap !== FRealCurve_1.ERichCurveExtrapolation.RCCE_Constant) {
                const minTime = this.keys[0].time;
                const maxTime = this.keys[numKeys - 1].time;
                const cycleCount = new ObjectRef_1.ObjectRef(0);
                FRichCurve.cycleTime(minTime, maxTime, inTime, cycleCount);
                if (this.preInfinityExtrap === FRealCurve_1.ERichCurveExtrapolation.RCCE_CycleWithOffset) {
                    const dv = this.keys[0].value - this.keys[numKeys - 1].value;
                    cycleValueOffset.element = dv * cycleCount.element;
                }
                else if (this.preInfinityExtrap === FRealCurve_1.ERichCurveExtrapolation.RCCE_Oscillate) {
                    if (cycleCount.element % 2 === 1) {
                        inTime.element = minTime + (maxTime - inTime.element);
                    }
                }
            }
        }
        else if (inTime.element >= this.keys[numKeys - 1].time) {
            if (this.postInfinityExtrap !== FRealCurve_1.ERichCurveExtrapolation.RCCE_Linear
                && this.postInfinityExtrap !== FRealCurve_1.ERichCurveExtrapolation.RCCE_Constant) {
                const minTime = this.keys[0].time;
                const maxTime = this.keys[numKeys - 1].time;
                const cycleCount = new ObjectRef_1.ObjectRef(0);
                FRichCurve.cycleTime(minTime, maxTime, inTime, cycleCount);
                if (this.postInfinityExtrap === FRealCurve_1.ERichCurveExtrapolation.RCCE_CycleWithOffset) {
                    const dv = this.keys[numKeys - 1].value - this.keys[0].value;
                    cycleValueOffset.element = dv * cycleCount.element;
                }
                else if (this.postInfinityExtrap === FRealCurve_1.ERichCurveExtrapolation.RCCE_Oscillate) {
                    if (cycleCount.element % 2 === 1) {
                        inTime.element = minTime + (maxTime - inTime.element);
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
    eval(inTime, inDefaultValue = 0.0) {
        // Remap time if extrapolation is present and compute offset value to use if cycling
        let cycleValueOffset = 0;
        const inTimeRef = new ObjectRef_1.ObjectRef(inTime);
        const cycleValueOffsetRef = new ObjectRef_1.ObjectRef(cycleValueOffset);
        this.remapTimeValue(inTimeRef, cycleValueOffsetRef);
        inTime = inTimeRef.element;
        cycleValueOffset = cycleValueOffsetRef.element;
        const numKeys = this.keys.length;
        // If the default value hasn't been initialized, use the incoming default value
        let interpVal = this.defaultValue === Const_1.FLOAT_MAX_VALUE ? inDefaultValue : this.defaultValue;
        if (numKeys === 0) {
            // If no keys in curve, return the Default value.
        }
        else if (numKeys < 2 || (inTime <= this.keys[0].time)) {
            if (this.preInfinityExtrap === FRealCurve_1.ERichCurveExtrapolation.RCCE_Linear && numKeys > 1) {
                const dt = this.keys[1].time - this.keys[0].time;
                if (UnrealMathUtility_1.isNearlyZero(dt)) {
                    interpVal = this.keys[0].value;
                }
                else {
                    const dv = this.keys[1].value - this.keys[0].value;
                    const slope = dv / dt;
                    interpVal = slope * (inTime - this.keys[0].time) + this.keys[0].value;
                }
            }
            else {
                // Otherwise if constant or in a cycle or oscillate, always use the first key value
                interpVal = this.keys[0].value;
            }
        }
        else if (inTime < this.keys.pop().time) {
            // perform a lower bound to get the second of the interpolation nodes
            let first = 1;
            const last = numKeys - 1;
            let count = last - first;
            while (count > 0) {
                const step = count / 2;
                const middle = first + step;
                if (inTime >= this.keys[middle].time) {
                    first = middle + 1;
                    count -= step + 1;
                }
                else {
                    count = step;
                }
            }
            interpVal = FRichCurve.evalForTwoKeys(this.keys[first - 1], this.keys[first], inTime);
        }
        else {
            if (this.postInfinityExtrap === FRealCurve_1.ERichCurveExtrapolation.RCCE_Linear) {
                const dt = this.keys[numKeys - 2].time - this.keys[numKeys - 1].time;
                if (UnrealMathUtility_1.isNearlyZero(dt)) {
                    interpVal = this.keys[numKeys - 1].value;
                }
                else {
                    const dv = this.keys[numKeys - 2].value - this.keys[numKeys - 1].value;
                    const slope = dv / dt;
                    interpVal = slope * (inTime - this.keys[numKeys - 1].time) + this.keys[numKeys - 1].value;
                }
            }
            else {
                // Otherwise if constant or in a cycle or oscillate, always use the last key value
                interpVal = this.keys[numKeys - 1].value;
            }
        }
        return interpVal + cycleValueOffset;
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        const obj = this.toJson();
        obj.keys = this.keys.map(k => k.toJson());
        return obj;
    }
    /**
     * Evals for two keys
     * @param {FRichCurveKey} key1 First key
     * @param {FRichCurveKey} key2 Second key
     * @param {number} inTime In time
     * @returns {number} Result
     * @private
     * @static
     */
    static evalForTwoKeys(key1, key2, inTime) {
        const diff = key2.time - key1.time;
        if (diff > 0 && key1.interpMode !== FRealCurve_1.ERichCurveInterpMode.RCIM_Constant) {
            const alpha = (inTime - key1.time) / diff;
            const p0 = key1.value;
            const p3 = key2.value;
            if (key1.interpMode === FRealCurve_1.ERichCurveInterpMode.RCIM_Linear) {
                return UnrealMathUtility_1.lerp(p0, p3, alpha);
            }
            else {
                if (isItNotWeighted(key1, key2)) {
                    const oneThird = 1.0 / 3.0;
                    const p1 = p0 + (key1.leaveTangent * diff * oneThird);
                    const p2 = p3 - (key2.arriveTangent * diff * oneThird);
                    return bezierInterp(p0, p1, p2, p3, alpha);
                }
                else { //it's weighted
                    return weightedEvalForTwoKeys(key1.value, key1.time, key1.leaveTangent, key1.leaveTangentWeight, key1.tangentWeightMode, key2.value, key2.time, key2.arriveTangent, key2.arriveTangentWeight, key2.tangentWeightMode, inTime);
                }
            }
        }
        else {
            return key1.value;
        }
    }
}
__decorate([
    UProperty_1.UProperty({ name: "Keys" }),
    __metadata("design:type", Array)
], FRichCurve.prototype, "keys", void 0);
exports.FRichCurve = FRichCurve;
function bezierInterp(p0, p1, p2, p3, alpha) {
    const p01 = UnrealMathUtility_1.lerp(p0, p1, alpha);
    const p12 = UnrealMathUtility_1.lerp(p1, p2, alpha);
    const p23 = UnrealMathUtility_1.lerp(p2, p3, alpha);
    const p012 = UnrealMathUtility_1.lerp(p01, p12, alpha);
    const p123 = UnrealMathUtility_1.lerp(p12, p23, alpha);
    return UnrealMathUtility_1.lerp(p012, p123, alpha);
}
function bezierToPower(a1, b1, c1, d1, out) {
    const a = b1 - a1;
    const b = c1 - b1;
    const c = d1 - c1;
    const d = b - a;
    /*a2*/ out[3] = c - b - d;
    /*b2*/ out[2] = 3.0 * d;
    /*c2*/ out[1] = 3.0 * a;
    /*d2*/ out[0] = a1;
}
function weightedEvalForTwoKeys(key1Value, key1Time, key1LeaveTangent, key1LeaveTangentWeight, key1TangentWeightMode, key2Value, key2Time, key2ArriveTangent, key2ArriveTangentWeight, key2TangentWeightMode, inTime) {
    const diff = key2Time - key1Time;
    const alpha = (inTime - key1Time) / diff;
    const p0 = key1Value;
    const p3 = key2Value;
    const oneThird = 1.0 / 3.0;
    const time1 = key1Time;
    const time2 = key2Time;
    const x = time2 - time1;
    let angle = Math.atan(key1LeaveTangent);
    let cosAngle = Math.cos(angle);
    let sinAngle = Math.sin(angle);
    let leaveWeight;
    if (key1TangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedNone
        || key1TangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedArrive) {
        const y = key1LeaveTangent * x;
        leaveWeight = Math.sqrt(x * x + y * y) * oneThird;
    }
    else {
        leaveWeight = key1LeaveTangentWeight;
    }
    const key1TanX = cosAngle * leaveWeight + time1;
    const key1TanY = sinAngle * leaveWeight + key1Value;
    angle = Math.atan(key2ArriveTangent);
    cosAngle = Math.cos(angle);
    sinAngle = Math.sin(angle);
    let arriveWeight;
    if (key2TangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedNone
        || key2TangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedLeave) {
        const y = key2ArriveTangent * x;
        arriveWeight = Math.sqrt(x * x + y * y) * oneThird;
    }
    else {
        arriveWeight = key2ArriveTangentWeight;
    }
    const key2TanX = -cosAngle * arriveWeight + time2;
    const key2TanY = -sinAngle * arriveWeight + key2Value;
    // Normalize the Time Range
    const rangeX = time2 - time1;
    const dx1 = key1TanX - time1;
    const dx2 = key2TanX - time1;
    // Normalize values
    const normalizedX1 = dx1 / rangeX;
    const normalizedX2 = dx2 / rangeX;
    const coeff = new Array(4); // DoubleArray
    const results = new Array(3); // DoubleArray
    // Convert Bezier to Power basis, also float to double for precision for root finding.
    bezierToPower(0.0, normalizedX1, normalizedX2, 1.0, coeff);
    coeff[0] = coeff[0] - alpha;
    const numResults = new bezier_js_1.default(coeff[0], results[0], coeff[1], results[1], coeff[2], results[2], coeff[3]).length(); // NOT TESTED: PROBABLY WRONG LOL
    let newInterp = alpha;
    if (numResults === 1) {
        newInterp = results[0];
    }
    else {
        newInterp = Const_1.FLOAT_MIN_VALUE;
        for (const result of results) {
            if ((result >= 0.0) && (result <= 1.0)) {
                if (newInterp < 0.0 || result > newInterp) {
                    newInterp = result;
                }
            }
        }
        if (newInterp === Const_1.FLOAT_MIN_VALUE)
            newInterp = 0;
    }
    //now use newInterp and adjusted tangents plugged into the Y (Value) part of the graph.
    //val p0 = key1.value
    //val p3 = key2.value
    return bezierInterp(p0, key1TanY, key2TanY, p3, newInterp);
}
function isItNotWeighted(key1, key2) {
    return ((key1.tangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedNone
        || key1.tangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedArrive)
        && (key2.tangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedNone
            || key2.tangentWeightMode === ERichCurveTangentWeightMode.RCTWM_WeightedLeave));
}
