/**
 * Creates a basic oodle exception
 * @extends {Error}
 */
export class OodleException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @constructor
     * @public
     */
    constructor(message: string) {
        super(message)
    }
}

/**
 * Creates a decompress oodle exception
 * @extends {Error}
 */
export class DecompressException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @constructor
     * @public
     */
    constructor(message: string) {
        super(message)
    }
}

/**
 * Creates a compress oodle exception
 * @extends {Error}
 */
export class CompressException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @constructor
     * @public
     */
    constructor(message: string) {
        super(message)
    }
}
