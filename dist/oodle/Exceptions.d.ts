/**
 * Creates a basic oodle exception
 * @extends {Error}
 */
export declare class OodleException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @constructor
     * @public
     */
    constructor(message: string);
}
/**
 * Creates a decompress oodle exception
 * @extends {Error}
 */
export declare class DecompressException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @constructor
     * @public
     */
    constructor(message: string);
}
/**
 * Creates a compress oodle exception
 * @extends {Error}
 */
export declare class CompressException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @constructor
     * @public
     */
    constructor(message: string);
}
