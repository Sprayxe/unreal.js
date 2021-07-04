import { UObject } from "../../../assets/exports/UObject";
import { FRichCurve } from "./FRichCurve";
import { Lazy } from "../../../../util/Lazy";
/**
 * FRuntimeFloatCurve
 */
export declare class FRuntimeFloatCurve {
    /**
     * EditorCurveData
     * @type {FRichCurve}
     * @public
     */
    EditorCurveData: FRichCurve;
    /**
     * ExternalCurve
     * @type {Lazy<UCurveFloat>}
     * @public
     */
    ExternalCurve: Lazy<UCurveFloat>;
}
/**
 * UCurveFloat
 * @extends {UObject}
 */
export declare class UCurveFloat extends UObject {
    /**
     * Keyframe data
     * @type {FRichCurve}
     * @public
     */
    FloatCurve: FRichCurve;
    /**
     * Flag to represent event curve
     * @type {boolean}
     * @public
     */
    bIsEventCurve: boolean;
}
