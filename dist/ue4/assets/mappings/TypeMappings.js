"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeMappings = void 0;
const UnrealMap_1 = require("../../../util/UnrealMap");
/**
 * Type mappings base
 */
class TypeMappings {
    /**
     * Creates a new instance using args
     * @param {UnrealMap<string, UScriptStruct>} types Types
     * @param {UnrealMap<string, string[]>} enums Enums
     */
    constructor(types = new UnrealMap_1.UnrealMap(), enums = new UnrealMap_1.UnrealMap()) {
        this.types = types;
        this.enums = enums;
    }
}
exports.TypeMappings = TypeMappings;
