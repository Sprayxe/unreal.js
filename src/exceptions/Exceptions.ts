export function ParserException(message: string) {
    return new Error(`[UNREAL.JS - ERROR] ParserException: ${message}`)
}

export function InvalidAesKeyException(message: string) {
    return new Error(`[UNREAL.JS - ERROR] InvalidAesKeyException: ${message}`)
}

export function MissingSchemaException(message: string) {
    return new Error(`[UNREAL.JS - ERROR] MissingSchemaException: ${message}`)
}

export function UnknownPropertyException(message: string) {
    return new Error(`[UNREAL.JS - PARSER] UnknownPropertyException: ${message}`)
}