/** One key in a rich, editable float curve */
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FSimpleCurveKey implements IStructType {
    /** Time at this key */
    public time: number = 0
    /** Value at this key */
    public value: number = 0

    constructor(Ar: FArchive)
    constructor(time: number, value: number)
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.time = x.readFloat32()
            this.value = x.readFloat32()
        } else {
            this.time = x
            this.value = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeFloat32(this.time)
        Ar.writeFloat32(this.value)
    }

    toJson(): any {
        return {
            time: this.time,
            value: this.value
        }
    }
}

// TODO FSimpleCurve


