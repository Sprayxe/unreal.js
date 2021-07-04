import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
import { ERichCurveInterpMode, FRealCurve } from "./FRealCurve";
import { FloatRef } from "../../../../util/ObjectRef";
import { FStructFallback } from "../../../assets/objects/FStructFallback";
/**
 * One key in a rich, editable float curve
 * @implements {IStructType}
 */
export declare class FSimpleCurveKey implements IStructType {
    /**
     * Time at this key
     * @type {number}
     * @public
     */
    time: number;
    /**
     * Value at this key
     * @type {number}
     * @public
     */
    value: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using a value
     * @param {number} time Time to use
     * @param {number} value Value to use
     * @constructor
     * @public
     */
    constructor(time: number, value: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * A rich, editable float curve
 * @extends {FRealCurve}
 */
export declare class FSimpleCurve extends FRealCurve {
    /**
     * Interpolation mode between this key and the next
     * @type {ERichCurveInterpMode}
     * @public
     */
    interpMode: ERichCurveInterpMode;
    /**
     * Sorted array of keys
     * @type {Array<FSimpleCurveKey>}
     * @public
     */
    keys: FSimpleCurveKey[];
    /**
     * Applies values from FStructFallback
     * @param {FStructFallback} fallback Fallback to use
     * @returns {FSimpleCurve} Object
     * @public
     * @static
     */
    static loadFromFallback(fallback: FStructFallback): FSimpleCurve;
    /**
     * Get range of input time values. Outside this region curve continues constantly the start/end values
     * @param {FloatRef} minTime Min time
     * @param {FloatRef} maxTime Max time
     * @returns {void}
     * @public
     */
    getTimeRange(minTime: FloatRef, maxTime: FloatRef): void;
    /**
     * Get range of output values
     * @param {FloatRef} minValue Min value
     * @param {FloatRef} maxValue Max value
     * @returns {void}
     * @public
     */
    getValueRange(minValue: FloatRef, maxValue: FloatRef): void;
    /**
     * Clear all keys.
     * @returns {void}
     * @public
     */
    reset(): void;
    /**
     * Remaps inTime based on pre and post infinity extrapolation values
     * @param {FloatRef} inTime In time
     * @param {FloatRef} cycleValueOffset Cycle value offset
     * @returns {void}
     * @public
     */
    remapTimeValue(inTime: FloatRef, cycleValueOffset: FloatRef): void;
    /**
     * Evaluates this curve at the specified time
     * @param {number} inTime In time
     * @param {number} inDefaultValue In default value
     * @returns {number} Result
     * @public
     */
    eval(inTime: number, inDefaultValue: number): number;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
    /**
     * Evals for two keys
     * @param {FRichCurveKey} key1 First key
     * @param {FRichCurveKey} key2 Second key
     * @param {number} inTime In time
     * @returns {number} Result
     * @private
     */
    private evalForTwoKeys;
}
