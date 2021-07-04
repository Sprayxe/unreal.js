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
exports.FRealCurve = exports.ERichCurveExtrapolation = exports.ERichCurveInterpMode = void 0;
const Const_1 = require("../../../../util/Const");
const UProperty_1 = require("../../../../util/decorators/UProperty");
/**
 * Method of interpolation between this key and the next
 * @enum
 */
var ERichCurveInterpMode;
(function (ERichCurveInterpMode) {
    /** Use linear interpolation between values. */
    ERichCurveInterpMode[ERichCurveInterpMode["RCIM_Linear"] = 0] = "RCIM_Linear";
    /** Use a constant value. Represents stepped values. */
    ERichCurveInterpMode[ERichCurveInterpMode["RCIM_Constant"] = 1] = "RCIM_Constant";
    /** Cubic interpolation. See TangentMode for different cubic interpolation options. */
    ERichCurveInterpMode[ERichCurveInterpMode["RCIM_Cubic"] = 2] = "RCIM_Cubic";
    /** No interpolation. */
    ERichCurveInterpMode[ERichCurveInterpMode["RCIM_None"] = 3] = "RCIM_None";
})(ERichCurveInterpMode = exports.ERichCurveInterpMode || (exports.ERichCurveInterpMode = {}));
/**
 * Enumerates extrapolation options.
 * @enum
 */
var ERichCurveExtrapolation;
(function (ERichCurveExtrapolation) {
    /** Repeat the curve without an offset. */
    ERichCurveExtrapolation[ERichCurveExtrapolation["RCCE_Cycle"] = 0] = "RCCE_Cycle";
    /** Repeat the curve with an offset relative to the first or last key's value. */
    ERichCurveExtrapolation[ERichCurveExtrapolation["RCCE_CycleWithOffset"] = 1] = "RCCE_CycleWithOffset";
    /** Sinusoidally extrapolate. */
    ERichCurveExtrapolation[ERichCurveExtrapolation["RCCE_Oscillate"] = 2] = "RCCE_Oscillate";
    /** Use a linearly increasing value for extrapolation. */
    ERichCurveExtrapolation[ERichCurveExtrapolation["RCCE_Linear"] = 3] = "RCCE_Linear";
    /** Use a constant value for extrapolation */
    ERichCurveExtrapolation[ERichCurveExtrapolation["RCCE_Constant"] = 4] = "RCCE_Constant";
    /** No Extrapolation */
    ERichCurveExtrapolation[ERichCurveExtrapolation["RCCE_None"] = 5] = "RCCE_None";
})(ERichCurveExtrapolation = exports.ERichCurveExtrapolation || (exports.ERichCurveExtrapolation = {}));
/**
 * A rich, editable float curve
 */
class FRealCurve {
    constructor() {
        /**
         * Default value
         * @type {number}
         * @public
         */
        this.defaultValue = Const_1.FLOAT_MAX_VALUE;
        /**
         * Pre-infinity extrapolation state
         * @type {ERichCurveExtrapolation}
         * @public
         */
        this.preInfinityExtrap = ERichCurveExtrapolation.RCCE_Constant;
        /**
         * Post-infinity extrapolation state
         * @type {ERichCurveExtrapolation}
         * @public
         */
        this.postInfinityExtrap = ERichCurveExtrapolation.RCCE_Constant;
    }
    /**
     * Get range of input time values. Outside this region curve continues constantly the start/end values
     * @param {FloatRef} minTime Min time
     * @param {FloatRef} maxTime Max time
     * @returns {void}
     * @public
     */
    getTimeRange(minTime, maxTime) { }
    /**
     * Get range of output values
     * @param {FloatRef} minValue Min value
     * @param {FloatRef} maxValue Max value
     * @returns {void}
     * @public
     */
    getValueRange(minValue, maxValue) { }
    /**
     * Clear all keys.
     * @returns {void}
     * @public
     */
    reset() { }
    /**
     * Remaps inTime based on pre and post infinity extrapolation values
     * @param {FloatRef} inTime In time
     * @param {FloatRef} cycleValueOffset Cycle value offset
     * @returns {void}
     * @public
     */
    remapTimeValue(inTime, cycleValueOffset) { }
    /**
     * Evaluates this curve at the specified time
     * @param {number} inTime In time
     * @param {number} inDefaultValue In default value
     * @returns {number} Result
     * @public
     */
    eval(inTime, inDefaultValue = 0.0) {
        return 0;
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
    static cycleTime(minTime, maxTime, inTime, cycleCount) {
        const initTime = inTime.element;
        const duration = maxTime - minTime;
        if (inTime.element > maxTime) {
            cycleCount.element = (maxTime - inTime.element) / duration;
            inTime.element = inTime.element + duration * cycleCount.element;
        }
        else if (inTime.element < minTime) {
            cycleCount.element = (inTime.element - minTime) / duration;
            inTime.element = inTime.element - duration * cycleCount.element;
        }
        if (inTime.element === maxTime && initTime < minTime) {
            inTime.element = minTime;
        }
        if (inTime.element === minTime && initTime > maxTime) {
            inTime.element = maxTime;
        }
        cycleCount.element = Math.abs(cycleCount.element);
    }
    /**
     * Applies values from FStructFallback
     * @param {FStructFallback} fallback Fallback to use
     * @param {FRealCurve} obj Object to apply values to
     * @returns {FRealCurve} Object
     * @public
     * @static
     */
    static loadFromFallback(fallback, obj = new FRealCurve()) {
        obj.defaultValue = fallback.get("DefaultValue");
        obj.preInfinityExtrap = ERichCurveExtrapolation[fallback.get("PreInfinityExtrap").text.split(":").pop()];
        obj.postInfinityExtrap = ERichCurveExtrapolation[fallback.get("PostInfinityExtrap").text.split(":").pop()];
        return obj;
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
        };
    }
}
__decorate([
    UProperty_1.UProperty({ name: "DefaultValue" }),
    __metadata("design:type", Object)
], FRealCurve.prototype, "defaultValue", void 0);
__decorate([
    UProperty_1.UProperty({ name: "PreInfinityExtrap" }),
    __metadata("design:type", Object)
], FRealCurve.prototype, "preInfinityExtrap", void 0);
__decorate([
    UProperty_1.UProperty({ name: "PostInfinityExtrap" }),
    __metadata("design:type", Object)
], FRealCurve.prototype, "postInfinityExtrap", void 0);
exports.FRealCurve = FRealCurve;
