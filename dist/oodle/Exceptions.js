"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressException = exports.DecompressException = exports.OodleException = void 0;
/**
 * Creates a basic oodle exception
 * @extends {Error}
 */
class OodleException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @constructor
     * @public
     */
    constructor(message) {
        super(message);
    }
}
exports.OodleException = OodleException;
/**
 * Creates a decompress oodle exception
 * @extends {Error}
 */
class DecompressException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @constructor
     * @public
     */
    constructor(message) {
        super(message);
    }
}
exports.DecompressException = DecompressException;
/**
 * Creates a compress oodle exception
 * @extends {Error}
 */
class CompressException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @constructor
     * @public
     */
    constructor(message) {
        super(message);
    }
}
exports.CompressException = CompressException;
