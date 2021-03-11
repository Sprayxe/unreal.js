import * as Long from "long"

export class FPakCompressedBlock {
    compressedStart = Long.ZERO
    compressedEnd = Long.ZERO

    serialize(Ar: any) {
        Ar.writeInt64(this.compressedStart)
        Ar.writeInt64(this.compressedEnd)
    }
}