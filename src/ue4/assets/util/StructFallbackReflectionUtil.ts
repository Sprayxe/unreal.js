// TODO ? https://github.com/FabianFG/JFortniteParse/blob/master/src/main/kotlin/me/fungames/jfortniteparse/ue4/assets/util/StructFallbackReflectionUtil.kt ?

import { FPropertyTag } from "../objects/FPropertyTag";

/* This does apply properties to an object but it doesn't check the object's property names (wether lower/uppercase, wether it exists etc.)*/
export function mapToClass<T>(properties: FPropertyTag[], obj: T) {
    if (!properties.length)
        return obj
    for (const prop of properties) {
        const fieldName = prop.name.text
        const fieldValue = prop.getTagTypeValue()
        obj[fieldName] = fieldValue?.toJson ? fieldValue.toJson() : fieldValue
    }
    return obj
}