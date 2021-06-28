import { UnrealMap } from "../../../util/UnrealMap";
import { UScriptStruct } from "../exports/UScriptStruct";

/**
 * Type mappings base
 */
export class TypeMappings {
    /**
     * Stores types
     * @type {object}
     * @public
     */
    types: any // Map<string, UScriptStruct>

    /**
     * Stores enums
     * @type {object}
     * @public
     */
    enums: any // Map<string, string[]>

    /**
     * Creates a new instance using args
     * @param {UnrealMap<string, UScriptStruct>} types Types
     * @param {UnrealMap<string, string[]>} enums Enums
     */
    constructor(
        types: UnrealMap<string, UScriptStruct> = new UnrealMap(),
        enums: UnrealMap<string, string[]> = new UnrealMap()
    ) {
        this.types = types
        this.enums = enums
    }
}