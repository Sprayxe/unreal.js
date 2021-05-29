import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FDateTime implements IStructType {
    date: number = 0

    constructor()
    constructor(Ar: FArchive)
    constructor(date: number)
    constructor(x?: any) {
        if (x instanceof FArchive) {
            this.date = Number(x.readInt64())
        } else {
            this.date = x
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeInt64(this.date)
    }

    toDate() {
        return new Date(this.date)
    }

    toJson(): any {
        return this.date
    }
}