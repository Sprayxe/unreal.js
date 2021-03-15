import { TypeMappingsProvider } from "./TypeMappingsProvider";
import { FName } from "../../objects/uobject/FName";
import { UScriptStruct } from "../exports/UScriptStruct";
import { ObjectTypeRegistry } from "../ObjectTypeRegistry";

export class ReflectionTypeMappingsProvider extends TypeMappingsProvider {
    getStruct(structName: FName) {
        return new UScriptStruct(ObjectTypeRegistry.get(structName.text), structName)
    }

    getEnum(enumName: FName): string[] {
        return []
    }

    reload() {
        return true
    }
}