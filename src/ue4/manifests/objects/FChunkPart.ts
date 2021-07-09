import { FGuid } from "../../objects/core/misc/Guid";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

/**
 * FChunkPart
 */
export class FChunkPart {
    public guid: FGuid
    public offset: number
    public size: number

    constructor(Ar: FArchive) {
        const startPos = Ar.pos
        const dataSize = Ar.readUInt32()
        this.guid = new FGuid(Ar)
        this.offset = Ar.readUInt32()
        this.size = Ar.readUInt32()
        Ar.pos = startPos + dataSize
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.guid.serialize(Ar)
        Ar.writeUInt32(this.offset)
        Ar.writeUInt32(this.size)
    }
}