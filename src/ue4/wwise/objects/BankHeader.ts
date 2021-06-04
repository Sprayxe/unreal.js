import { FArchive } from "../../reader/FArchive";

export class BankHeader {
    public readonly version: number
    public readonly id: number

    constructor(Ar: FArchive) {
        this.version = Ar.readUInt32()
        this.id = Ar.readUInt32()
    }
}