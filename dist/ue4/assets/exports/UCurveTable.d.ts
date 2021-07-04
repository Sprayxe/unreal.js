import { UObject } from "./UObject";
import { FName } from "../../objects/uobject/FName";
import { FRealCurve } from "../../objects/engine/curves/FRealCurve";
import { FAssetArchive } from "../reader/FAssetArchive";
import { UnrealMap } from "../../../util/UnrealMap";
import { Locres } from "../../locres/Locres";
import { FloatRef } from "../../../util/ObjectRef";
/**
 * Whether the curve table contains simple, rich, or no curves
 * @enum
 */
export declare enum ECurveTableMode {
    Empty = 0,
    SimpleCurves = 1,
    RichCurves = 2
}
/**
 * UCurveTable
 * @extends {UObject}
 */
export declare class UCurveTable extends UObject {
    /**
     * Map of name of row to row data structure.
     * If curveTableMode is SimpleCurves the value type will be FSimpleCurve
     * If curveTableMode is RichCurves the value type will be FRichCurve
     * @type {UnrealMap<FName, FRealCurve>}
     * @public
     */
    rowMap: UnrealMap<FName, FRealCurve>;
    /**
     * Mode of curve table
     * @type {ECurveTableMode}
     * @public
     */
    curveTableMode: ECurveTableMode;
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number): void;
    /**
     * Method to find the row of a table given its name
     * @returns {FRealCurve} Curve
     * @public
     */
    findCurve(rowName: FName, warnIfNotFound?: boolean): FRealCurve;
    /**
     * Turns this into json
     * @param {Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres?: Locres): any;
}
/**
 * Handle to a particular row in a table.
 */
export declare class FCurveTableRowHandle {
    /**
     * Pointer to table we want a row from
     * @type {UCurveTable}
     * @public
     */
    curveTable: UCurveTable;
    /**
     * Name of row in the table that we want
     * @type {FName}
     * @public
     */
    rowName: FName;
    /**
     * Get the curve straight from the row handle
     * @returns {FRealCurve} Curve
     * @public
     */
    getCurve(warnIfNotFound?: boolean): FRealCurve;
    /**
     * Evaluate the curve if it is valid
     * @param {number} xValue The input X value to the curve
     * @returns {number} The value of the curve if valid, 0 if not
     * @public
     */
    eval(xValue: number): number;
    /**
     * Evaluate the curve if it is valid
     * @param {number} xValue The input X value to the curve
     * @param {?FloatRef} yValue The output Y value from the curve
     * @returns {boolean} Whether it filled out yValue with a valid number, false otherwise
     * @public
     */
    eval(xValue: number, yValue: FloatRef): boolean;
}
