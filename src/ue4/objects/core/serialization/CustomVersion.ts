import { FGuid } from "../misc/Guid";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

/**
 * FCustomVersion
 */
export class FCustomVersion {
    /**
     * Key
     * @type {FGuid}
     * @public
     */
    key: FGuid

    /**
     * Version
     * @type {number}
     * @public
     */
    version: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {FGuid} key Key to use
     * @param {number} version Version to use
     * @constructor
     * @public
     */
    constructor(key: FGuid, version: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any) {
        if (x instanceof FArchive) {
            this.key = new FGuid(x)
            this.version = x.readInt32()
        } else {
            this.key = x
            this.version = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.key.serialize(Ar)
        Ar.writeInt32(this.version)
    }
}