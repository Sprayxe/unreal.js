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
exports.FScalableFloat = void 0;
const UCurveTable_1 = require("../assets/exports/UCurveTable");
const UProperty_1 = require("../../util/decorators/UProperty");
/**
 * FScalableFloat
 */
class FScalableFloat {
    constructor() {
        /**
         * Raw value, is multiplied by curve
         * @type {number}
         * @public
         */
        this.value = 0;
        /**
         * Curve that is evaluated at a specific level. If found, it is multipled by value
         * @type {?FCurveTableRowHandle}
         * @public
         */
        this.curve = null;
        /**
         * Cached direct pointer to the RealCurve we should evaluate
         * @type {?FRealCurve}
         * @private
         */
        this.finalCurve = null;
    }
    /**
     * Returns the scaled value at a given level
     * @returns {number} Value
     * @public
     */
    getValueAtLevel(level) {
        if (this.curve?.curveTable != null) {
            if (this.finalCurve == null) {
                this.finalCurve = this.curve.getCurve();
            }
            if (this.finalCurve != null) {
                return this.value * this.finalCurve.eval(level);
            }
        }
        return this.value;
    }
    /**
     * Returns the scaled value at level 0
     * @returns {number} Value
     * @see {getValueAtLevel}
     * @public
     */
    getValue0() {
        return this.getValueAtLevel(0);
    }
}
__decorate([
    UProperty_1.UProperty({ name: "Value" }),
    __metadata("design:type", Number)
], FScalableFloat.prototype, "value", void 0);
__decorate([
    UProperty_1.UProperty({ name: "Curve" }),
    __metadata("design:type", UCurveTable_1.FCurveTableRowHandle)
], FScalableFloat.prototype, "curve", void 0);
exports.FScalableFloat = FScalableFloat;
