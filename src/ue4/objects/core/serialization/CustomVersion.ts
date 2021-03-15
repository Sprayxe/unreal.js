import { FGuid } from "../misc/Guid";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

export class FCustomVersion {
    key: FGuid
    version: number

    constructor(Ar: FArchive)
    constructor(key: FGuid, version: number)
    constructor(x?: any, y?: any) {
        if (x instanceof FArchive) {
            this.key = new FGuid(x)
            this.version = x.readInt32()
        } else {
            this.key = x
            this.version = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        this.key.serialize(Ar)
        Ar.writeInt32(this.version)
    }
}