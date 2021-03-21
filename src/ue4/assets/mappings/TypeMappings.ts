import { UnrealMap } from "../../../util/UnrealMap";
import { UScriptStruct } from "../exports/UScriptStruct";

export class TypeMappings {
    types: UnrealMap<string, UScriptStruct>
    enums: UnrealMap<string, string[]>

    constructor(
        types: UnrealMap<string, UScriptStruct> = new UnrealMap(),
        enums: UnrealMap<string, string[]> = new UnrealMap()
    ) {
        this.types = types
        this.enums = enums
    }
}