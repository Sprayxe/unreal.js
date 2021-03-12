import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

export class UInterfaceProperty {
    interfaceNumber: number

    constructor(Ar: FArchive)
    constructor(interfaceNumber: number)
    constructor(x?: any) {
        if (x instanceof FArchive) {
            this.interfaceNumber = x.readInt32()
        } else {
            this.interfaceNumber = x
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.interfaceNumber)
    }
}
