"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UCurveFloat = exports.FRuntimeFloatCurve = void 0;
const UObject_1 = require("../../../assets/exports/UObject");
/**
 * FRuntimeFloatCurve
 */
class FRuntimeFloatCurve {
    constructor() {
        /**
         * EditorCurveData
         * @type {FRichCurve}
         * @public
         */
        this.EditorCurveData = null;
        /**
         * ExternalCurve
         * @type {Lazy<UCurveFloat>}
         * @public
         */
        this.ExternalCurve = null;
    }
}
exports.FRuntimeFloatCurve = FRuntimeFloatCurve;
/**
 * UCurveFloat
 * @extends {UObject}
 */
class UCurveFloat extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * Keyframe data
         * @type {FRichCurve}
         * @public
         */
        this.FloatCurve = null;
        /**
         * Flag to represent event curve
         * @type {boolean}
         * @public
         */
        this.bIsEventCurve = null;
    }
}
exports.UCurveFloat = UCurveFloat;
