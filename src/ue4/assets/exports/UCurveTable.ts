import { UObject } from "./UObject";
import { FName } from "../../objects/uobject/FName";
import { FRealCurve } from "../../objects/engine/curves/FRealCurve";
import { FAssetArchive } from "../reader/FAssetArchive";
import { ParserException } from "../../../exceptions/Exceptions";
import { FSimpleCurve } from "../../objects/engine/curves/FSimpleCurve";
import { FRichCurve } from "../../objects/engine/curves/FRichCurve";
import { UnrealMap } from "../../../util/UnrealMap";
import { Locres } from "../../locres/Locres";
import { FloatRef } from "../../../util/ObjectRef";
import { UProperty } from "../../../util/decorators/UProperty";
import { FStructFallback } from "../objects/FStructFallback";

/**
 * Whether the curve table contains simple, rich, or no curves
 * @enum
 */
export enum ECurveTableMode {
    Empty,
    SimpleCurves,
    RichCurves
}

/**
 * UCurveTable
 * @extends {UObject}
 */
export class UCurveTable extends UObject {
    /**
     * Map of name of row to row data structure.
     * If curveTableMode is SimpleCurves the value type will be FSimpleCurve
     * If curveTableMode is RichCurves the value type will be FRichCurve
     * @type {UnrealMap<FName, FRealCurve>}
     * @public
     */
    public rowMap: UnrealMap<FName, FRealCurve> = null

    /**
     * Mode of curve table
     * @type {ECurveTableMode}
     * @public
     */
    public curveTableMode: ECurveTableMode = null

    /*val richCurveRowMap get(): Map<FName, FRichCurve> {
        check(curveTableMode != ECurveTableMode.SimpleCurves)
        return rowMap as Map<FName, FRichCurve>
    }*/

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number) {
        // When loading, this should load our RowCurve!
        super.deserialize(Ar, validPos);
        const numRows = Ar.readInt32()
        this.curveTableMode = Ar.readUInt8()
        this.rowMap = Ar.readTMap(numRows, () => {
            const key = Ar.readFName()
            let instance: any
            let curve: string
            if (this.curveTableMode === ECurveTableMode.Empty) {
                throw new ParserException("CurveTableMode == ECurveTableMode::Empty, unsupported")
            } else if (this.curveTableMode === ECurveTableMode.SimpleCurves) {
                curve = "SimpleCurve"
                instance = FSimpleCurve
            } else if (this.curveTableMode === ECurveTableMode.RichCurves) {
                curve = "RichCurve"
                instance = FRichCurve
            }
            const fallback = new FStructFallback(Ar, FName.dummy(curve))
            const value = instance.loadFromFallback(fallback)
            return {key, value}
        })
    }

    /**
     * Method to find the row of a table given its name
     * @returns {FRealCurve} Curve
     * @public
     */
    findCurve(rowName: FName, warnIfNotFound: boolean = true): FRealCurve {
        if (rowName.equals(FName.NAME_None)) {
            if (warnIfNotFound) console.warn(`UCurveTable::FindCurve : NAME_None is invalid row name for CurveTable '${this.getPathName()}'.`)
            return null
        }

        const foundCurve = this.rowMap.get(rowName)
        if (foundCurve == null) {
            if (warnIfNotFound) console.warn(`UCurveTable::FindCurve : Row '${rowName.text}' not found in CurveTable '${this.getPathName()}'.`)
            return null
        }

        return foundCurve
    }

    /**
     * Turns this into json
     * @param {Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres: Locres = null): any {
        return this.rowMap.map((v, k) => {
            return { key: k.text, value: v.toJson() }
        })
    }
}

/**
 * Handle to a particular row in a table.
 */
export class FCurveTableRowHandle {
    /**
     * Pointer to table we want a row from
     * @type {UCurveTable}
     * @public
     */
    @UProperty({name: "CurveTable"})
    public curveTable: UCurveTable = null

    /**
     * Name of row in the table that we want
     * @type {FName}
     * @public
     */
    @UProperty({name: "RowName"})
    public rowName: FName = FName.NAME_None

    /**
     * Get the curve straight from the row handle
     * @returns {FRealCurve} Curve
     * @public
     */
    getCurve(warnIfNotFound: boolean = true): FRealCurve {
        if (this.curveTable === null) {
            if (!this.rowName.equals(FName.NAME_None)) {
                if (warnIfNotFound) console.warn(`FCurveTableRowHandle::FindRow : No CurveTable for row ${this.rowName}.`)
            }
            return null
        }
        return this.curveTable?.findCurve(this.rowName, warnIfNotFound)
    }

    /**
     * Evaluate the curve if it is valid
     * @param {number} xValue The input X value to the curve
     * @returns {number} The value of the curve if valid, 0 if not
     * @public
     */
    eval(xValue: number): number

    /**
     * Evaluate the curve if it is valid
     * @param {number} xValue The input X value to the curve
     * @param {?FloatRef} yValue The output Y value from the curve
     * @returns {boolean} Wether it filled out yValue with a valid number, false otherwise
     * @public
     */
    eval(xValue: number, yValue: FloatRef): boolean

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    eval(arg1: any, arg2?: any): any {
        if (!arg2)
            return this.getCurve()?.eval(arg1) || 0
        const curve = this.getCurve()
        if (curve != null) {
            arg2.element = curve.eval(arg1)
            return true
        }
        return false
    }
}