import { FArchive } from "./FArchive";

export class FArchiveProxy extends FArchive {
    wrappedAr: FArchive
    littleEndian: boolean

    constructor(wrappedAr: FArchive) {
        super()
        this.wrappedAr = wrappedAr
        this.littleEndian = this.wrappedAr.littleEndian
    }

    clone() { return new FArchiveProxy(this.wrappedAr) }

    get pos() { return this.wrappedAr.pos }
    set pos(pos: number) { this.wrappedAr.pos = pos }
    get size() { return this.wrappedAr.size }

    read()
    read(buffer: Buffer)
    read(param?: any) { return this.wrappedAr.readBuffer(param) }

    // Only overriding these to keep optimal performance with FByteArchive
    readInt8(): number { return this.wrappedAr.readInt8() }
    readInt16(): number { return this.wrappedAr.readInt16() }
    readInt32(): number { return this.wrappedAr.readInt32() }
    readInt64() { return this.wrappedAr.readInt64() }
    readFloat32(): number { return this.wrappedAr.readFloat32() }
    readDouble(): number { return this.wrappedAr.readDouble() }
}