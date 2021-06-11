import { TypeMappings } from "./TypeMappings";
import { FName } from "../../objects/uobject/FName";
import { UStruct } from "../exports/UStruct";
import { ObjectTypeRegistry } from "../ObjectTypeRegistry";
import { MissingSchemaException } from "../../../exceptions/Exceptions";

export abstract class TypeMappingsProvider {
    mappings = new TypeMappings()
    abstract reload(): boolean

    getStruct(structName: FName): UStruct {
        const struct = this.mappings.types[structName.text]
        if (!struct)
            return null
        if (!struct.structClass) {
            struct.structClass = ObjectTypeRegistry.get(structName.text)
        }
        return struct
    }

    getEnum(enumName: FName) {
        const Enum = this.mappings.enums[enumName.text]
        if (!Enum)
            throw MissingSchemaException(`Unknown enum ${enumName}`)
        return Enum
    }
}