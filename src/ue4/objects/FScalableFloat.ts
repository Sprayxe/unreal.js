import { FCurveTableRowHandle } from "../assets/exports/UCurveTable";
import { FRealCurve } from "./engine/curves/FRealCurve";
import { UProperty } from "../../util/decorators/UProperty";

/**
 * FScalableFloat
 */
export class FScalableFloat {
    /**
     * Raw value, is multiplied by curve
     * @type {number}
     * @public
     */
    @UProperty({name: "Value"})
    public value: number = 0

    /**
     * Curve that is evaluated at a specific level. If found, it is multipled by value
     * @type {?FCurveTableRowHandle}
     * @public
     */
    @UProperty({name: "Curve"})
    public curve?: FCurveTableRowHandle = null

    /**
     * Cached direct pointer to the RealCurve we should evaluate
     * @type {?FRealCurve}
     * @private
     */
    private finalCurve?: FRealCurve = null

    /**
     * Returns the scaled value at a given level
     * @returns {number} Value
     * @public
     */
    getValueAtLevel(level: number): number {
        if (this.curve?.curveTable != null) {
            if (this.finalCurve == null) {
                this.finalCurve = this.curve.getCurve()
            }
            if (this.finalCurve != null) {
                return this.value * this.finalCurve.eval(level)
            }
        }
        return this.value
    }

    /**
     * Returns the scaled value at level 0
     * @returns {number} Value
     * @see {getValueAtLevel}
     * @public
     */
    getValue0() {
        return this.getValueAtLevel(0)
    }
}