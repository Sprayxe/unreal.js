import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FMovieSceneEvaluationKey implements IStructType {
    public sequenceId: number
    public trackId: number
    public sectionIndex: number

    constructor(Ar: FArchive)
    constructor(sequenceId: number, trackId: number, sectionIndex: number)
    constructor(x: any, y?: any, z?: any) {
        if (x instanceof FArchive) {
            this.sequenceId = x.readUInt32()
            this.trackId = x.readInt32()
            this.sectionIndex = x.readUInt32()
        } else {
            this.sequenceId = x
            this.trackId = y
            this.sectionIndex = z
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.sequenceId)
        Ar.writeInt32(this.trackId)
        Ar.writeUInt32(this.sectionIndex)
    }

    toJson(): any {
        return {
            sequenceId: this.sequenceId,
            trackId: this.trackId,
            sectionIndex: this.sectionIndex
        }
    }
}