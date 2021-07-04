import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

/**
 * FDateTime
 * @implements {IStructType}
 */
export class FDateTime implements IStructType {
    /**
     * Date
     * @type {string}
     * @public
     */
    date: string = null

    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using a value
     * @param {number} date Date to use
     * @constructor
     * @public
     */
    constructor(date: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any) {
        if (x instanceof FArchive) {
            this.date = x.readInt64().toString()
        } else {
            this.date = x
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeInt64(parseInt(this.date))
    }

    /**
     * Turns this into a date
     * @returns {Date}
     * @public
     */
    toDate() {
        return new Date(this.date)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return this.date
    }
}