import { FChunkInfo } from "./FChunkInfo";
import { FArchive } from "../../reader/FArchive";
import { FGuid } from "../../objects/core/misc/Guid";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

/**
 * FChunkDataList
 */
export class FChunkDataList {
    /**
     * List of chunks
     * @type {Array<FChunkInfo>}
     * @public
     */
    public chunkList: FChunkInfo[]

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        const startPos = Ar.pos
        const dataSize = Ar.readUInt32()
        /*const dataVersionInt = */Ar.readUInt8()
        const elementCount = Ar.readInt32()
        this.chunkList = []
        for (let i = 0; i < elementCount; ++i)
            this.chunkList[i] = new FChunkInfo()
        for (const chunkInfo of this.chunkList) chunkInfo.guid = new FGuid(Ar)
        for (const chunkInfo of this.chunkList) chunkInfo.hash = Number(Ar.readUInt64())
        for (const chunkInfo of this.chunkList) chunkInfo.shaHash = Ar.readBuffer(20)
        for (const chunkInfo of this.chunkList) chunkInfo.groupNumber = Ar.readUInt8()
        for (const chunkInfo of this.chunkList) chunkInfo.windowSize = Ar.readUInt32()
        for (const chunkInfo of this.chunkList) chunkInfo.fileSize = Number(Ar.readInt64())
        Ar.pos = startPos + dataSize
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) { }
}