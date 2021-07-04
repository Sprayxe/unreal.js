import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * FDateTime
 * @implements {IStructType}
 */
export declare class FDateTime implements IStructType {
    /**
     * Date
     * @type {string}
     * @public
     */
    date: string;
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using a value
     * @param {number} date Date to use
     * @constructor
     * @public
     */
    constructor(date: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into a date
     * @returns {Date}
     * @public
     */
    toDate(): Date;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
