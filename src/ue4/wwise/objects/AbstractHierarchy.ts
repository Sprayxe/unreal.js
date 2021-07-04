import { FArchive } from "../../reader/FArchive";

/**
 * AbstractHierarchy
 * @abstract
 */
export abstract class AbstractHierarchy {
    /**
     * id
     * @type {number}
     * @public
     */
    public id: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.id = Ar.readUInt32()
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     * @abstract
     */
    abstract toJson(): any
}