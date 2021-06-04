import { FArchive } from "../../reader/FArchive";

export abstract class AbstractHierarchy {
    public id: number

    constructor(Ar: FArchive) {
        this.id = Ar.readUInt32()
    }

    abstract toJson(): any
}