import { UnrealMap } from "../../../util/UnrealMap";
import { UScriptStruct } from "../exports/UScriptStruct";
/**
 * Type mappings base
 */
export declare class TypeMappings {
    /**
     * Stores types
     * @type {object}
     * @public
     */
    types: any;
    /**
     * Stores enums
     * @type {object}
     * @public
     */
    enums: any;
    /**
     * Creates a new instance using args
     * @param {UnrealMap<string, UScriptStruct>} types Types
     * @param {UnrealMap<string, string[]>} enums Enums
     */
    constructor(types?: UnrealMap<string, UScriptStruct>, enums?: UnrealMap<string, string[]>);
}
