import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

export class FFrameNumber implements IStructType {
    public value: number
    constructor(arg: FArchive | number) {
        this.value = arg instanceof FArchive ? arg.readFloat32() : arg
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeFloat32(this.value)
    }

    toJson(): any {
        return this.value
    }
}