import { FName } from "../../uobject/FName";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FSmartName implements IStructType {
    public displayName: FName

    constructor(arg: FArchive | FName) {
        this.displayName = arg instanceof FArchive ? arg.readFName() : arg
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeFName(this.displayName)
    }

    toJson(): any {
        return this.displayName.text
    }
}