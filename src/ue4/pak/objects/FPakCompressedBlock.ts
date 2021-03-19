export class FPakCompressedBlock {
    compressedStart = 0
    compressedEnd = 0

    serialize(Ar: any) {
        Ar.writeInt64(this.compressedStart)
        Ar.writeInt64(this.compressedEnd)
    }
}