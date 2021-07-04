"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownPropertyException = exports.MissingSchemaException = exports.InvalidAesKeyException = exports.ParserException = void 0;
/**
 * Creates a parser exception
 * @extends {Error}
 */
class ParserException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @param {FArchive | FArchiveWriter | null} Ar Archive for additional info
     * @constructor
     * @public
     */
    constructor(message, Ar) {
        super(message + (Ar ? ("\n" + Ar.printError()) : ""));
    }
}
exports.ParserException = ParserException;
/**
 * Creates an invalid aes key exception
 * @extends {Error}
 */
class InvalidAesKeyException extends ParserException {
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
exports.InvalidAesKeyException = InvalidAesKeyException;
/**
 * Creates a missing schema exception
 * @extends {Error}
 */
class MissingSchemaException extends ParserException {
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
exports.MissingSchemaException = MissingSchemaException;
/**
 * Creates an unknown property exception
 * @extends {Error}
 */
class UnknownPropertyException extends ParserException {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @param {FArchive} Ar FArchive for additional info
     * @constructor
     * @public
     */
    constructor(message, Ar) {
        super(message, Ar);
    }
}
exports.UnknownPropertyException = UnknownPropertyException;
