/**
 * Creates a normal oodle exception
 * @param {string} message Message to use
 * @returns {Error} Exception
 */
export function OodleException(message: string) {
    return new Error(`[Oodle] Exception: ${message}`)
}

/**
 * Creates a decompress oodle exception
 * @param {string} message Message to use
 * @returns {Error} Exception
 */
export function DecompressException(message: string) {
    return new Error(`[Oodle] Decompress-Exception: ${message}`)
}

/**
 * Creates a compress oodle exception
 * @param {string} message Message to use
 * @returns {Error} Exception
 */
export function CompressException(message: string) {
    return new Error(`[Oodle] Compress-Exception: ${message}`)
}
