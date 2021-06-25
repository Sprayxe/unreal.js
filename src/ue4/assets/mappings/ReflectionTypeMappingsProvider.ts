import { TypeMappingsProvider } from "./TypeMappingsProvider";
import { FName } from "../../objects/uobject/FName";
import { UScriptStruct } from "../exports/UScriptStruct";
import { ObjectTypeRegistry } from "../ObjectTypeRegistry";

/**
 * Type mappings provider which uses reflection
 * @extends {TypeMappingsProvider}
 */
export class ReflectionTypeMappingsProvider extends TypeMappingsProvider {
    /**
     * Gets a struct
     * @param {FName} structName FName of the struct
     * @returns {UScriptStruct} Struct
     * @public
     */
    getStruct(structName: FName) {
        return new UScriptStruct(ObjectTypeRegistry.get(structName.text), structName)
    }

    /**
     * Gets an enum
     * @param {FName} enumName FName of the enum
     * @returns {Array<string>} Enum
     * @public
     */
    getEnum(enumName: FName): string[] {
        return []
    }

    /**
     * Reloads mappings
     * @returns {boolean} Result
     * @public
     */
    reload() {
        return true
    }
}