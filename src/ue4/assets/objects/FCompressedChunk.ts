import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

export class FCompressedChunk {
    uncompressedOffset: number
    uncompressedSize: number
    compressedOffset: number
    compressedSize: number

    constructor(Ar: FArchive)
    constructor(uncompressedOffset: number, uncompressedSize: number, compressedOffset: number, compressedSize: number)
    constructor(...params) {
        if (params[0] instanceof FArchive) {
            const Ar = params[0]
            this.uncompressedOffset = Ar.readInt32()
            this.uncompressedSize = Ar.readInt32()
            this.compressedOffset = Ar.readInt32()
            this.compressedSize = Ar.readInt32()
        } else {
            this.uncompressedOffset = params[0]
            this.uncompressedSize = params[1]
            this.compressedOffset = params[2]
            this.compressedSize = params[3]
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.uncompressedOffset)
        Ar.writeInt32(this.uncompressedSize)
        Ar.writeInt32(this.compressedOffset)
        Ar.writeInt32(this.compressedSize)
    }
}