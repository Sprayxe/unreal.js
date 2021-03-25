import { FArchive } from "../../reader/FArchive";

export class FSerializedNameHeader {
    data = Buffer.alloc(2)

    constructor(Ar?: FArchive) {
        if (Ar)
            Ar.readToBuffer(this.data)
    }

    isUtf16() {
        return (this.data[0] & 0x80) !== 0
    }

    len() {
        return ((this.data[0] & 0x7F) << 8) + this.data[1]
    }
}

export function loadNameHeader(inOutAr: FArchive) {
    const header = new FSerializedNameHeader(inOutAr)
    const len = header.len()
    return header.isUtf16() ?
        Buffer.from(inOutAr.readBuffer(len * 2)).toString("utf16le") :
        Buffer.from(inOutAr.readBuffer(len)).toString("utf-8")
}
