import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FNavAgentSelector implements IStructType {
    public packedBits: number

    constructor(arg: FArchive | number) {
        this.packedBits = arg instanceof FArchive ? arg.readUInt32() : arg
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.packedBits)
    }

    toJson(): any {
        return this.packedBits
    }
}