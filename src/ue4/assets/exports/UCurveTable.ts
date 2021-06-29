import { deserializeVersionedTaggedProperties, UObject } from "./UObject";
import { FName } from "../../objects/uobject/FName";
import { FRealCurve } from "../../objects/engine/curves/FRealCurve";
import { FAssetArchive } from "../reader/FAssetArchive";
import { UScriptStruct } from "./UScriptStruct";
import { ParserException } from "../../../exceptions/Exceptions";
import { FSimpleCurve } from "../../objects/engine/curves/FSimpleCurve";
import { FRichCurve } from "../../objects/engine/curves/FRichCurve";
import { deserializeUnversionedProperties } from "../../objects/uobject/serialization/UnversionedPropertySerialization";
import { mapToClass } from "../util/StructFallbackReflectionUtil";
import { UnrealMap } from "../../../util/UnrealMap";
import { Locres } from "../../locres/Locres";
import { FloatRef } from "../../../util/ObjectRef";
import { UProperty } from "../../../util/decorators/UProperty";

/**
 * - Whether the curve table contains simple, rich, or no curves
 */
export enum ECurveTableMode {
    Empty,
    SimpleCurves,
    RichCurves
}

export class UCurveTable extends UObject {
    /**
     * Map of name of row to row data structure.
     * If curveTableMode is SimpleCurves the value type will be FSimpleCurve
     * If curveTableMode is RichCurves the value type will be FRichCurve
     */
    public rowMap: UnrealMap<FName, FRealCurve> = null
    public curveTableMode: ECurveTableMode = null

    /*val richCurveRowMap get(): Map<FName, FRichCurve> {
        check(curveTableMode != ECurveTableMode.SimpleCurves)
        return rowMap as Map<FName, FRichCurve>
    }*/
    deserialize(Ar: FAssetArchive, validPos: number) {
        // When loading, this should load our RowCurve!
        super.deserialize(Ar, validPos);
        const numRows = Ar.readInt32()
        this.curveTableMode = Ar.readUInt8()
        let rowStruct: UScriptStruct
        if (this.curveTableMode === ECurveTableMode.Empty) {
            throw new ParserException("CurveTableMode == ECurveTableMode::Empty, unsupported")
        } else if (this.curveTableMode === ECurveTableMode.SimpleCurves) {
            rowStruct = new UScriptStruct(FSimpleCurve)
        } else if (this.curveTableMode === ECurveTableMode.RichCurves) {
            rowStruct = new UScriptStruct(FRichCurve)
        }
        this.rowMap = Ar.readTMap(numRows, () => {
            const key = Ar.readFName()
            let value: FRealCurve
            if (this.curveTableMode === ECurveTableMode.Empty) {
                throw new ParserException("CurveTableMode == ECurveTableMode::Empty, unsupported")
            } else if (this.curveTableMode === ECurveTableMode.SimpleCurves) {
                value = new FSimpleCurve()
            } else if (this.curveTableMode === ECurveTableMode.RichCurves) {
                value = new FRichCurve()
            }
            const properties = []
            if (Ar.useUnversionedPropertySerialization) {
                deserializeUnversionedProperties(properties, rowStruct, Ar)
            } else {
                deserializeVersionedTaggedProperties(properties, Ar)
            }
            (value as any) = mapToClass(properties, value)
            return {key, value}
        })
    }

    /** Function to find the row of a table given its name. */
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

    toJson(locres: Locres = null): any {
        return this.rowMap.map((v, k) => {
            return {key: k.text, value: v.toJson()}
        })
    }
}

/**
 * - Handle to a particular row in a table.
 */
export class FCurveTableRowHandle {
    /**
     * Pointer to table we want a row from
     * @type {UCurveTable}
     */
    @UProperty({name: "CurveTable"})
    public curveTable: UCurveTable = null
    /**
     * Name of row in the table that we want
     * @type {FName}
     */
    @UProperty({name: "RowName"})
    public rowName: FName = FName.NAME_None

    /** Get the curve straight from the row handle */
    getCurve(warnIfNotFound: boolean = true): FRealCurve {
        if (this.curveTable === null) {
            if (!this.rowName.equals(FName.NAME_None)) {
                if (warnIfNotFound) console.warn(`FCurveTableRowHandle::FindRow : No CurveTable for row ${this.rowName}.`)
            }
            return null
        }
        return this.curveTable?.findCurve(this.rowName, warnIfNotFound)
    }

    /** Evaluate the curve if it is valid
     * @param {number} xValue The input X value to the curve
     * @returns {number} The value of the curve if valid, 0 if not
     */
    eval(xValue: number): number

    /** Evaluate the curve if it is valid
     * @param {number} xValue The input X value to the curve
     * @param {?FloatRef} yValue The output Y value from the curve
     * @returns {boolean} Wether it filled out yValue with a valid number, false otherwise
     */
    eval(xValue: number, yValue?: FloatRef): boolean | number {
        if (!yValue)
            return this.getCurve()?.eval(xValue) || 0
        const curve = this.getCurve()
        if (curve != null) {
            yValue.element = curve.eval(xValue)
            return true
        }
        return false
    }
}