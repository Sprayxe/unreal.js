import { TypeMappingsProvider } from "./TypeMappingsProvider";
import { FName } from "../../objects/uobject/FName";
import { UScriptStruct } from "../exports/UScriptStruct";
/**
 * Type mappings provider which uses reflection
 * @extends {TypeMappingsProvider}
 */
export declare class ReflectionTypeMappingsProvider extends TypeMappingsProvider {
    /**
     * Gets a struct
     * @param {FName} structName FName of the struct
     * @returns {UScriptStruct} Struct
     * @public
     */
    getStruct(structName: FName): UScriptStruct;
    /**
     * Gets an enum
     * @param {FName} enumName FName of the enum
     * @returns {Array<string>} Enum
     * @public
     */
    getEnum(enumName: FName): string[];
    /**
     * Reloads mappings
     * @returns {boolean} Result
     * @public
     */
    reload(): boolean;
}
