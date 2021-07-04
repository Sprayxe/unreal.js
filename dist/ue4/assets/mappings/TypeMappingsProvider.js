"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeMappingsProvider = void 0;
const TypeMappings_1 = require("./TypeMappings");
const ObjectTypeRegistry_1 = require("../ObjectTypeRegistry");
const Exceptions_1 = require("../../../exceptions/Exceptions");
/**
 * Base for all type mappings providers
 * @abstract
 */
class TypeMappingsProvider {
    constructor() {
        /**
         * Holds mappings
         * @type {TypeMappings}
         */
        this.mappings = new TypeMappings_1.TypeMappings();
    }
    /**
     * Gets a struct
     * @param {FName} structName FName of the struct
     * @returns {UScriptStruct} Struct
     * @public
     */
    getStruct(structName) {
        const struct = this.mappings.types[structName.text];
        if (!struct)
            return null;
        if (!struct.structClass) {
            struct.structClass = ObjectTypeRegistry_1.ObjectTypeRegistry.get(structName.text);
        }
        return struct;
    }
    /**
     * Gets an enum
     * @param {FName} enumName FName of the struct
     * @returns {string[]} Enum
     * @public
     */
    getEnum(enumName) {
        const Enum = this.mappings.enums[enumName.text];
        if (!Enum)
            throw new Exceptions_1.MissingSchemaException(`Unknown enum ${enumName}`);
        return Enum;
    }
}
exports.TypeMappingsProvider = TypeMappingsProvider;
