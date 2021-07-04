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
exports.UDataTable = void 0;
const UObject_1 = require("./UObject");
const UnrealMap_1 = require("../../../util/UnrealMap");
const FName_1 = require("../../objects/uobject/FName");
const UScriptStruct_1 = require("./UScriptStruct");
const UnversionedPropertySerialization_1 = require("../../objects/uobject/serialization/UnversionedPropertySerialization");
const StructFallbackReflectionUtil_1 = require("../util/StructFallbackReflectionUtil");
const UProperty_1 = require("../../../util/decorators/UProperty");
/**
 * Represents an UE4 Data Table
 * @extends {UObject}
 */
class UDataTable extends UObject_1.UObject {
    /**
     * Creates an instance using rows
     * @param {?UnrealMap<FName, UObject>} rows Rows to apply
     * @constructor
     * @public
     */
    constructor(rows = new UnrealMap_1.UnrealMap()) {
        super();
        /**
         * Struct of rows
         * @type {UScriptStruct}
         * @public
         */
        this.RowStruct = null;
        /**
         * Whether strip from client builds
         * @type {?boolean}
         * @public
         */
        this.bStripFromClientBuilds = null;
        /**
         * Whether ignore extra fields
         * @type {?boolean}
         * @public
         */
        this.bIgnoreExtraFields = null;
        /**
         * Whether ignore missing fields
         * @type {?boolean}
         * @public
         */
        this.bIgnoreMissingFields = null;
        /**
         * Import key fields
         * @type {?string}
         * @public
         */
        this.ImportKeyField = null;
        this.rows = rows;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar, validPos) {
        super.deserialize(Ar, validPos);
        this.rows = Ar.readTMap(null, () => {
            const key = Ar.readFName();
            const rowProperties = [];
            if (Ar.useUnversionedPropertySerialization) {
                UnversionedPropertySerialization_1.deserializeUnversionedProperties(rowProperties, this.RowStruct, Ar);
            }
            else {
                UObject_1.deserializeVersionedTaggedProperties(rowProperties, Ar);
            }
            const value = new UObject_1.UObject(rowProperties);
            return { key, value };
        });
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        super.serialize(Ar);
        Ar.writeTMap(this.rows, (key, value) => {
            Ar.writeFName(key);
            UObject_1.serializeProperties(Ar, value.properties);
        });
    }
    /**
     * Finds a row
     * @param {string} rowName Name of row to find
     * @returns {?UObject} Row or null
     * @public
     */
    findRow(rowName) {
        return rowName instanceof FName_1.FName
            ? this.rows.get(rowName)
            : this.rows.get(FName_1.FName.dummy(rowName));
    }
    /**
     * Finds a row mapped (maps properties to object)
     * @param {string} rowName Name of row to find
     * @returns {?any} Row or null
     * @public
     */
    findRowMapped(rowName) {
        const row = this.findRow(rowName);
        if (!row)
            return null;
        return StructFallbackReflectionUtil_1.mapToClass(row.properties, this.RowStruct.structClass);
    }
    /**
     * Turns this into json
     * @param {Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres = null) {
        return this.rows.map((v, k) => {
            return { key: k.text, value: v.toJson(locres) };
        });
    }
}
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", UScriptStruct_1.UScriptStruct)
], UDataTable.prototype, "RowStruct", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Boolean)
], UDataTable.prototype, "bStripFromClientBuilds", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Boolean)
], UDataTable.prototype, "bIgnoreExtraFields", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", Boolean)
], UDataTable.prototype, "bIgnoreMissingFields", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", String)
], UDataTable.prototype, "ImportKeyField", void 0);
__decorate([
    UProperty_1.UProperty(),
    __metadata("design:type", UnrealMap_1.UnrealMap)
], UDataTable.prototype, "rows", void 0);
exports.UDataTable = UDataTable;
