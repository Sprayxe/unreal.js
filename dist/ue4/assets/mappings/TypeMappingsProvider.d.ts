import { TypeMappings } from "./TypeMappings";
import { FName } from "../../objects/uobject/FName";
import { UStruct } from "../exports/UStruct";
/**
 * Base for all type mappings providers
 * @abstract
 */
export declare abstract class TypeMappingsProvider {
    /**
     * Holds mappings
     * @type {TypeMappings}
     */
    mappings: TypeMappings;
    /**
     * Reloads mappings
     * @abstract
     * @public
     */
    abstract reload(): boolean;
    /**
     * Gets a struct
     * @param {FName} structName FName of the struct
     * @returns {UScriptStruct} Struct
     * @public
     */
    getStruct(structName: FName): UStruct;
    /**
     * Gets an enum
     * @param {FName} enumName FName of the struct
     * @returns {string[]} Enum
     * @public
     */
    getEnum(enumName: FName): any;
}
