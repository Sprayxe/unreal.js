import { FFileManifest } from "./FFileManifest";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FArchive } from "../../reader/FArchive";
import { FChunkPart } from "./FChunkPart";

/**
 * FFileManifestList
 */
export class FFileManifestList {
    /**
     * File list
     * @type {Array<FFileManifest>}
     * @public
     */
    public fileList: FFileManifest[]

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        const startPos = Ar.pos
        const dataSize = Ar.readUInt32()
        /*val dataVersionInt = */Ar.readUInt8()
        const elementCount = Ar.readInt32()
        this.fileList = []
        for (let i = 0; i < elementCount; ++i)
            this.fileList[i] = new FFileManifest()
        for (const fileManifest of this.fileList) fileManifest.fileName = Ar.readString()
        for (const fileManifest of this.fileList) fileManifest.symlinkTarget = Ar.readString()
        for (const fileManifest of this.fileList) fileManifest.fileHash = Ar.readBuffer(20)
        for (const fileManifest of this.fileList) fileManifest.fileMetaFlags = Ar.readUInt8()
        for (const fileManifest of this.fileList) fileManifest.installTags = Ar.readArray(() => Ar.readString())
        for (const fileManifest of this.fileList) fileManifest.chunkParts = Ar.readArray(() => new FChunkPart(Ar))
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