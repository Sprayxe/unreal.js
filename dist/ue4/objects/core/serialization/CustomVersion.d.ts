import { FGuid } from "../misc/Guid";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
/**
 * FCustomVersion
 */
export declare class FCustomVersion {
    /**
     * Key
     * @type {FGuid}
     * @public
     */
    key: FGuid;
    /**
     * Version
     * @type {number}
     * @public
     */
    version: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {FGuid} key Key to use
     * @param {number} version Version to use
     * @constructor
     * @public
     */
    constructor(key: FGuid, version: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
