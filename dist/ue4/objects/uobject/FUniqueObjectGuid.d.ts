import { FGuid } from "../core/misc/Guid";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
/**
 * FUniqueObjectGuid
 */
export declare class FUniqueObjectGuid {
    /**
     * Guid
     * @type {FGuid}
     * @public
     */
    guid: FGuid;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using a value
     * @param {FGuid} guid Guid to use
     * @constructor
     * @public
     */
    constructor(guid: FGuid);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
