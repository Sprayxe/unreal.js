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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSimpleCurve = exports.FSimpleCurveKey = void 0;
const FArchive_1 = require("../../../reader/FArchive");
const FRealCurve_1 = require("./FRealCurve");
const ObjectRef_1 = require("../../../../util/ObjectRef");
const UnrealMathUtility_1 = require("../../core/math/UnrealMathUtility");
const Const_1 = require("../../../../util/Const");
const UProperty_1 = require("../../../../util/decorators/UProperty");
/**
 * One key in a rich, editable float curve
 * @implements {IStructType}
 */
class FSimpleCurveKey {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        /**
         * Time at this key
         * @type {number}
         * @public
         */
        this.time = 0;
        /**
         * Value at this key
         * @type {number}
         * @public
         */
        this.value = 0;
        if (x instanceof FArchive_1.FArchive) {
            this.time = x.readFloat32();
            this.value = x.readFloat32();
        }
        else {
            this.time = x;
            this.value = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeFloat32(this.time);
        Ar.writeFloat32(this.value);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            time: this.time,
            value: this.value
        };
    }
}
exports.FSimpleCurveKey = FSimpleCurveKey;
/**
 * A rich, editable float curve
 * @extends {FRealCurve}
 */
class FSimpleCurve extends FRealCurve_1.FRealCurve {
    constructor() {
        super(...arguments);
        /**
         * Interpolation mode between this key and the next
         * @type {ERichCurveInterpMode}
         * @public
         */
        this.interpMode = FRealCurve_1.ERichCurveInterpMode.RCIM_Linear;
        /**
         * Sorted array of keys
         * @type {Array<FSimpleCurveKey>}
         * @public
         */
        this.keys = [];
    }
    /**
     * Applies values from FStructFallback
     * @param {FStructFallback} fallback Fallback to use
     * @returns {FSimpleCurve} Object
     * @public
     * @static
     */
    static loadFromFallback(fallback) {
        const obj = new FSimpleCurve();
        super.loadFromFallback(fallback, obj);
        const mode = fallback.get("InterpMode").text.split(":").pop();
        obj.interpMode = FRealCurve_1.ERichCurveInterpMode[mode];
        obj.keys = fallback.get("Keys").contents.map(s => s.struct.structType);
        return obj;
    }
    /**
     * Get range of input time values. Outside this region curve continues constantly the start/end values
     * @param {FloatRef} minTime Min time
     * @param {FloatRef} maxTime Max time
     * @returns {void}
     * @public
     */
    getTimeRange(minTime, maxTime) {
        if (this.keys.length === 0) {
            minTime.element = 0;
            maxTime.element = 0;
        }
        else {
            minTime.element = this.keys[0].time;
            maxTime.element = this.keys.pop().time;
        }
    }
    /**
     * Get range of output values
     * @param {FloatRef} minValue Min value
     * @param {FloatRef} maxValue Max value
     * @returns {void}
     * @public
     */
    getValueRange(minValue, maxValue) {
        if (this.keys.length === 0) {
            minValue.element = 0;
            maxValue.element = 0;
        }
        else {
            minValue.element = this.keys[0].value;
            maxValue.element = this.keys[0].value;
            for (const key of this.keys) {
                minValue.element = Math.min(minValue.element, key.value);
                maxValue.element = Math.max(maxValue.element, key.value);
            }
        }
    }
    /**
     * Clear all keys.
     * @returns {void}
     * @public
     */
    reset() {
        this.keys = [];
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
                FRealCurve_1.FRealCurve.cycleTime(minTime, maxTime, inTime, cycleCount);
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
                FRealCurve_1.FRealCurve.cycleTime(minTime, maxTime, inTime, cycleCount);
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
    eval(inTime, inDefaultValue) {
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
            interpVal = this.evalForTwoKeys(this.keys[first - 1], this.keys[first], inTime);
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
        const obj = super.toJson();
        obj.interpMode = Object.keys(FRealCurve_1.ERichCurveInterpMode).filter(k => k.length > 1)[this.interpMode];
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
     */
    evalForTwoKeys(key1, key2, inTime) {
        const diff = key2.time - key1.time;
        if (diff > 0 && this.interpMode !== FRealCurve_1.ERichCurveInterpMode.RCIM_Constant) {
            const alpha = (inTime - key1.time) / diff;
            const p0 = key1.value;
            const p3 = key2.value;
            return UnrealMathUtility_1.lerp(p0, p3, alpha);
        }
        else {
            return key1.value;
        }
    }
}
__decorate([
    UProperty_1.UProperty({ name: "InterpMode" }),
    __metadata("design:type", Object)
], FSimpleCurve.prototype, "interpMode", void 0);
__decorate([
    UProperty_1.UProperty({ name: "Keys" }),
    __metadata("design:type", Array)
], FSimpleCurve.prototype, "keys", void 0);
exports.FSimpleCurve = FSimpleCurve;
