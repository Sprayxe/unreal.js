export function OodleException(message: string) {
    return new Error(`[Oodle] Exception: ${message}`)
}

export function DecompressException(message: string) {
    return new Error(`[Oodle] Decompress-Exception: ${message}`)
}

export function CompressException(message: string) {
    return new Error(`[Oodle] Compress-Exception: ${message}`)
}
