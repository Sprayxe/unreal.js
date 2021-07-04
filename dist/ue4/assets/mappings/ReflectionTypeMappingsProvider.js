"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectionTypeMappingsProvider = void 0;
const TypeMappingsProvider_1 = require("./TypeMappingsProvider");
const UScriptStruct_1 = require("../exports/UScriptStruct");
const ObjectTypeRegistry_1 = require("../ObjectTypeRegistry");
/**
 * Type mappings provider which uses reflection
 * @extends {TypeMappingsProvider}
 */
class ReflectionTypeMappingsProvider extends TypeMappingsProvider_1.TypeMappingsProvider {
    /**
     * Gets a struct
     * @param {FName} structName FName of the struct
     * @returns {UScriptStruct} Struct
     * @public
     */
    getStruct(structName) {
        return new UScriptStruct_1.UScriptStruct(ObjectTypeRegistry_1.ObjectTypeRegistry.get(structName.text), structName);
    }
    /**
     * Gets an enum
     * @param {FName} enumName FName of the enum
     * @returns {Array<string>} Enum
     * @public
     */
    getEnum(enumName) {
        return [];
    }
    /**
     * Reloads mappings
     * @returns {boolean} Result
     * @public
     */
    reload() {
        return true;
    }
}
exports.ReflectionTypeMappingsProvider = ReflectionTypeMappingsProvider;
