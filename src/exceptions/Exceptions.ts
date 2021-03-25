export function ParserException(message: string) {
    return new Error(`ParserException: ${message}`)
}

export function InvalidAesKeyException(message: string) {
    return new Error(`InvalidAesKeyException: ${message}`)
}

export function MissingSchemaException(message: string) {
    return new Error(`MissingSchemaException: ${message}`)
}

export function UnknownPropertyException(message: string) {
    return new Error(`UnknownPropertyException: ${message}`)
}