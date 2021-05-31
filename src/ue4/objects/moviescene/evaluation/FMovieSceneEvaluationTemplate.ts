import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

export class FMovieSceneEvaluationTemplate implements IStructType {
    /** The internal value of the serial number */
    public value: number

    constructor(arg: FArchive | number) {
        this.value = arg instanceof FArchive ? arg.readUInt32() : arg
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.value)
    }

    toJson(): any {
        return this.value
    }
}