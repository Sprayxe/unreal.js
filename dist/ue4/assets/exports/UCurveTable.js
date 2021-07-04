"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCurveTableRowHandle = exports.UCurveTable = exports.ECurveTableMode = void 0;
const UObject_1 = require("./UObject");
const FName_1 = require("../../objects/uobject/FName");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const FSimpleCurve_1 = require("../../objects/engine/curves/FSimpleCurve");
const FRichCurve_1 = require("../../objects/engine/curves/FRichCurve");
const UProperty_1 = require("../../../util/decorators/UProperty");
const FStructFallback_1 = require("../objects/FStructFallback");
/**
 * Whether the curve table contains simple, rich, or no curves
 * @enum
 */
var ECurveTableMode;
(function (ECurveTableMode) {
    ECurveTableMode[ECurveTableMode["Empty"] = 0] = "Empty";
    ECurveTableMode[ECurveTableMode["SimpleCurves"] = 1] = "SimpleCurves";
    ECurveTableMode[ECurveTableMode["RichCurves"] = 2] = "RichCurves";
})(ECurveTableMode = exports.ECurveTableMode || (exports.ECurveTableMode = {}));
/**
 * UCurveTable
 * @extends {UObject}
 */
class UCurveTable extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * Map of name of row to row data structure.
         * If curveTableMode is SimpleCurves the value type will be FSimpleCurve
         * If curveTableMode is RichCurves the value type will be FRichCurve
         * @type {UnrealMap<FName, FRealCurve>}
         * @public
         */
        this.rowMap = null;
        /**
         * Mode of curve table
         * @type {ECurveTableMode}
         * @public
         */
        this.curveTableMode = null;
    }
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
    deserialize(Ar, validPos) {
        // When loading, this should load our RowCurve!
        super.deserialize(Ar, validPos);
        const numRows = Ar.readInt32();
        this.curveTableMode = Ar.readUInt8();
        this.rowMap = Ar.readTMap(numRows, () => {
            const key = Ar.readFName();
            let instance;
            let curve;
            if (this.curveTableMode === ECurveTableMode.Empty) {
                throw new Exceptions_1.ParserException("CurveTableMode == ECurveTableMode::Empty, unsupported");
            }
            else if (this.curveTableMode === ECurveTableMode.SimpleCurves) {
                curve = "SimpleCurve";
                instance = FSimpleCurve_1.FSimpleCurve;
            }
            else if (this.curveTableMode === ECurveTableMode.RichCurves) {
                curve = "RichCurve";
                instance = FRichCurve_1.FRichCurve;
            }
            const fallback = new FStructFallback_1.FStructFallback(Ar, FName_1.FName.dummy(curve));
            const value = instance.loadFromFallback(fallback);
            return { key, value };
        });
    }
    /**
     * Method to find the row of a table given its name
     * @returns {FRealCurve} Curve
     * @public
     */
    findCurve(rowName, warnIfNotFound = true) {
        if (rowName.equals(FName_1.FName.NAME_None)) {
            if (warnIfNotFound)
                console.warn(`UCurveTable::FindCurve : NAME_None is invalid row name for CurveTable '${this.getPathName()}'.`);
            return null;
        }
        const foundCurve = this.rowMap.get(rowName);
        if (foundCurve == null) {
            if (warnIfNotFound)
                console.warn(`UCurveTable::FindCurve : Row '${rowName.text}' not found in CurveTable '${this.getPathName()}'.`);
            return null;
        }
        return foundCurve;
    }
    /**
     * Turns this into json
     * @param {Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres = null) {
        return this.rowMap.map((v, k) => {
            return { key: k.text, value: v.toJson() };
        });
    }
}
exports.UCurveTable = UCurveTable;
/**
 * Handle to a particular row in a table.
 */
class FCurveTableRowHandle {
    constructor() {
        /**
         * Pointer to table we want a row from
         * @type {UCurveTable}
         * @public
         */
        this.curveTable = null;
        /**
         * Name of row in the table that we want
         * @type {FName}
         * @public
         */
        this.rowName = FName_1.FName.NAME_None;
    }
    /**
     * Get the curve straight from the row handle
     * @returns {FRealCurve} Curve
     * @public
     */
    getCurve(warnIfNotFound = true) {
        if (this.curveTable === null) {
            if (!this.rowName.equals(FName_1.FName.NAME_None)) {
                if (warnIfNotFound)
                    console.warn(`FCurveTableRowHandle::FindRow : No CurveTable for row ${this.rowName}.`);
            }
            return null;
        }
        return this.curveTable?.findCurve(this.rowName, warnIfNotFound);
    }
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    eval(arg1, arg2) {
        if (!arg2)
            return this.getCurve()?.eval(arg1) || 0;
        const curve = this.getCurve();
        if (curve != null) {
            arg2.element = curve.eval(arg1);
            return true;
        }
        return false;
    }
}
__decorate([
    UProperty_1.UProperty({ name: "CurveTable" }),
    __metadata("design:type", UCurveTable)
], FCurveTableRowHandle.prototype, "curveTable", void 0);
__decorate([
    UProperty_1.UProperty({ name: "RowName" }),
    __metadata("design:type", FName_1.FName)
], FCurveTableRowHandle.prototype, "rowName", void 0);
exports.FCurveTableRowHandle = FCurveTableRowHandle;
