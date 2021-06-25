import { FArchive } from "../ue4/reader/FArchive";
import { FArchiveWriter } from "../ue4/writer/FArchiveWriter";

/**
 * Creates a parser exception
 */
export class ParserException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @param {FArchive | FArchiveWriter | null} Ar Archive for additional info
     * @constructor
     * @public
     */
    constructor(message: string, Ar?: FArchive | FArchiveWriter) {
        super(message + (Ar ? ("\n" + Ar.printError()) : ""))
    }
}

/**
 * Creates an invalid aes key exception
 */
export class InvalidAesKeyException extends ParserException {
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
 * Creates a missing schema exception
 */
export class MissingSchemaException extends ParserException {
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
 * Creates an unknown property exception
 */
export class UnknownPropertyException extends ParserException {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @param {FArchive} Ar FArchive for additional info
     * @constructor
     * @public
     */
    constructor(message: string, Ar: FArchive) {
        super(message, Ar)
    }
}