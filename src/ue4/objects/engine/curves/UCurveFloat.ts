import { UObject } from "../../../assets/exports/UObject";
import { FRichCurve } from "./FRichCurve";
import { Lazy } from "../../../../util/Lazy";

export class FRuntimeFloatCurve {
    public EditorCurveData: FRichCurve = null
    public ExternalCurve: Lazy<UCurveFloat> = null
}

export class UCurveFloat extends UObject {
    /** Keyframe data */
    public FloatCurve: FRichCurve = null
    /** Flag to represent event curve */
    public bIsEventCurve: boolean = null
}