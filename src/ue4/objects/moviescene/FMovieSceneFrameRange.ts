import { IStructType } from "../../assets/objects/UScriptStruct";
import { TRange } from "../core/math/TRange";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

export class FMovieSceneFrameRange implements IStructType {
    public value: TRange<number>

    constructor(arg: FArchive | TRange<number>) {
        this.value = arg instanceof FArchive
            ? new TRange(arg, () => arg.readInt32())
            : arg
    }

    serialize(Ar: FArchiveWriter) {
        this.value.serialize(Ar, (it) => Ar.writeInt32(it))
    }

    toJson(): any {
        return this.value.toJson()
    }
}