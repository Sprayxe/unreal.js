import { UnrealMap } from "../../../util/UnrealMap";
import { UScriptStruct } from "../exports/UScriptStruct";

export class TypeMappings {
    types: UnrealMap<string, UScriptStruct> = new UnrealMap()
    enums: UnrealMap<string, string[]> = new UnrealMap()
}