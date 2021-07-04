import { FArchive } from "../../reader/FArchive";
/**
 * AbstractHierarchy
 * @abstract
 */
export declare abstract class AbstractHierarchy {
    /**
     * id
     * @type {number}
     * @public
     */
    id: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     * @abstract
     */
    abstract toJson(): any;
}
