import { FArchive } from "../../reader/FArchive";

export class DataIndex {
    public readonly id: number
    public readonly offset: number
    public readonly length: number

    constructor(Ar: FArchive) {
        this.id = Ar.readUInt32()
        this.offset = Ar.readUInt32()
        this.length = Ar.readInt32()
    }
}