import { UObject } from "../../../assets/exports/UObject";
import { FRichCurve } from "./FRichCurve";
import { Lazy } from "../../../../util/Lazy";

/**
 * FRuntimeFloatCurve
 */
export class FRuntimeFloatCurve {
    /**
     * EditorCurveData
     * @type {FRichCurve}
     * @public
     */
    public EditorCurveData: FRichCurve = null

    /**
     * ExternalCurve
     * @type {Lazy<UCurveFloat>}
     * @public
     */
    public ExternalCurve: Lazy<UCurveFloat> = null
}

/**
 * UCurveFloat
 * @extends {UObject}
 */
export class UCurveFloat extends UObject {
    /**
     * Keyframe data
     * @type {FRichCurve}
     * @public
     */
    public FloatCurve: FRichCurve = null

    /**
     * Flag to represent event curve
     * @type {boolean}
     * @public
     */
    public bIsEventCurve: boolean = null
}