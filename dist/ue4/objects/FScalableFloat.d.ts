import { FCurveTableRowHandle } from "../assets/exports/UCurveTable";
/**
 * FScalableFloat
 */
export declare class FScalableFloat {
    /**
     * Raw value, is multiplied by curve
     * @type {number}
     * @public
     */
    value: number;
    /**
     * Curve that is evaluated at a specific level. If found, it is multipled by value
     * @type {?FCurveTableRowHandle}
     * @public
     */
    curve?: FCurveTableRowHandle;
    /**
     * Cached direct pointer to the RealCurve we should evaluate
     * @type {?FRealCurve}
     * @private
     */
    private finalCurve?;
    /**
     * Returns the scaled value at a given level
     * @returns {number} Value
     * @public
     */
    getValueAtLevel(level: number): number;
    /**
     * Returns the scaled value at level 0
     * @returns {number} Value
     * @see {getValueAtLevel}
     * @public
     */
    getValue0(): number;
}
