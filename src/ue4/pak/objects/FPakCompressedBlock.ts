import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

export class FPakCompressedBlock {
    public compressedStart: number
    public compressedEnd: number

    constructor(Ar: FArchive)
    constructor(compressedStart: number, compressedEnd: number)
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.compressedStart = Number(x.readInt64())
            this.compressedEnd = Number(x.readInt64())
        } else {
            this.compressedStart = x
            this.compressedEnd = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeInt64(this.compressedStart)
        Ar.writeInt64(this.compressedEnd)
    }
}