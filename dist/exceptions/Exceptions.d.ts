import { FArchive } from "../ue4/reader/FArchive";
import { FArchiveWriter } from "../ue4/writer/FArchiveWriter";
/**
 * Creates a parser exception
 * @extends {Error}
 */
export declare class ParserException extends Error {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @param {FArchive | FArchiveWriter | null} Ar Archive for additional info
     * @constructor
     * @public
     */
    constructor(message: string, Ar?: FArchive | FArchiveWriter);
}
/**
 * Creates an invalid aes key exception
 * @extends {Error}
 */
export declare class InvalidAesKeyException extends ParserException {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @constructor
     * @public
     */
    constructor(message: string);
}
/**
 * Creates a missing schema exception
 * @extends {Error}
 */
export declare class MissingSchemaException extends ParserException {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @constructor
     * @public
     */
    constructor(message: string);
}
/**
 * Creates an unknown property exception
 * @extends {Error}
 */
export declare class UnknownPropertyException extends ParserException {
    /**
     * Creates an instance
     * @param {string} message Message to use
     * @param {FArchive} Ar FArchive for additional info
     * @constructor
     * @public
     */
    constructor(message: string, Ar: FArchive);
}
