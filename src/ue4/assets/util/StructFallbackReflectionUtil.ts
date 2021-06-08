// TODO https://github.com/FabianFG/JFortniteParse/blob/master/src/main/kotlin/me/fungames/jfortniteparse/ue4/assets/util/StructFallbackReflectionUtil.kt ?

import { FPropertyTag } from "../objects/FPropertyTag";

export function mapToClass<T>(properties: FPropertyTag[], clazz: Function, obj: T) {
    if (!properties.length)
        return obj
    const fields = Object.keys(clazz.prototype)
    for (const prop of properties) {
        const fieldName = prop.name.text;
        const field = fields.find(f => f.toLowerCase() === fieldName.toLowerCase())
        if (field)
            obj[field] = prop.getTagTypeValue()
    }
    return obj
}