import Collection from "@discordjs/collection";
import { UScriptStruct } from "../exports/UScriptStruct";

export class TypeMappings {
    types: Collection<string, UScriptStruct> = new Collection()
    enums: Collection<string, string[]> = new Collection()
}