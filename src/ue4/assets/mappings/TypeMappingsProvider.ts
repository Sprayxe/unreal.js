import { TypeMappings } from "./TypeMappings";
import { FName } from "../../objects/uobject/FName";
import { UStruct } from "../exports/UStruct";
import { ObjectTypeRegistry } from "../ObjectTypeRegistry";
import { MissingSchemaException } from "../../../exceptions/Exceptions";

/**
 * Base for all type mappings providers
 * @abstract
 */
export abstract class TypeMappingsProvider {
    /**
     * Holds mappings
     * @type {TypeMappings}
     */
    mappings = new TypeMappings()

    /**
     * Reloads mappings
     * @abstract
     * @public
     */
    abstract reload(): boolean

    /**
     * Gets a struct
     * @param {FName} structName FName of the struct
     * @returns {UScriptStruct} Struct
     * @public
     */
    getStruct(structName: FName): UStruct {
        const struct = this.mappings.types[structName.text]
        if (!struct)
            return null
        if (!struct.structClass) {
            struct.structClass = ObjectTypeRegistry.get(structName.text)
        }
        return struct
    }

    /**
     * Gets an enum
     * @param {FName} enumName FName of the struct
     * @returns {string[]} Enum
     * @public
     */
    getEnum(enumName: FName) {
        const Enum = this.mappings.enums[enumName.text]
        if (!Enum)
            throw new MissingSchemaException(`Unknown enum ${enumName}`)
        return Enum
    }
}