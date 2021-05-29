import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FIntPoint implements IStructType {
    public x: number
    public y: number

    constructor(Ar: FArchive)
    constructor(x: number, y: number)
    constructor(arg1: any, arg2?: any) {
        if (arg1 instanceof FArchive) {
            this.x = arg1.readInt32()
            this.y = arg1.readInt32()
        } else {
            this.x = arg1
            this.y = arg2
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.x)
        Ar.writeInt32(this.y)
    }

    toString() {
        return `X=${this.x} Y=${this.y}`
    }

    toJson(): any {
        return {
            x: this.x,
            y: this.y
        }
    }
}