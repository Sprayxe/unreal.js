export function ParserException(message: string) {
    return `[UNREAL.JS] ${message}`
}

export function InvalidAesKeyException(message: string) {
    return `[UNREAL.JS - AES] ${message}`
}

export function MissingSchemaException(message: string) {
    return `[UNREAL.JS - PARSER] ${message}`
}

export function UnknownPropertyException(message: string) {
    return `[UNREAL.JS - PARSER] ${message}`
}