"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonTypeMappingsProvider = void 0;
const TypeMappingsProvider_1 = require("./TypeMappingsProvider");
const UScriptStruct_1 = require("../exports/UScriptStruct");
const PropertyInfo_1 = require("../objects/PropertyInfo");
const Lazy_1 = require("../../../util/Lazy");
/**
 * Type mappings provider which uses json data
 * @abstract
 * @extends {TypeMappingsProvider}
 */
class JsonTypeMappingsProvider extends TypeMappingsProvider_1.TypeMappingsProvider {
    /**
     * Adds a struct
     * @param {object} json JSON data
     * @returns {boolean} Whether if it was successful or not
     * @protected
     */
    addStructs(json) {
        if (!Array.isArray(json))
            return false;
        for (const entry of json) {
            if (Object.keys(entry).length < 1)
                continue;
            const structEntry = new UScriptStruct_1.UScriptStruct();
            structEntry.name = entry.name;
            const superType = entry.superType;
            structEntry.superStruct = new Lazy_1.Lazy(() => superType != null ? this.mappings.types[superType] : null);
            structEntry.childProperties2 = entry.properties?.map(it => new PropertyInfo_1.PropertyInfo(it)) || [];
            structEntry.propertyCount = entry.propertyCount;
            this.mappings.types[structEntry.name] = structEntry;
        }
        return true;
    }
    /**
     * Adds an enum
     * @param {object} json JSON data
     * @returns {boolean} Whether if it was successful or not
     * @protected
     */
    addEnums(json) {
        if (!Array.isArray(json))
            return false;
        for (const entry of json) {
            if (Object.keys(entry).length < 1)
                continue;
            const enumName = entry.name;
            this.mappings.enums[enumName] = entry.values?.map(it => it);
        }
        return true;
    }
}
exports.JsonTypeMappingsProvider = JsonTypeMappingsProvider;
