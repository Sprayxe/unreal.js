import { FGuid } from "../core/misc/Guid";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";

export class FLevelSequenceLegacyObjectReference implements IStructType {
    public keyGuid: FGuid
    public objectId: FGuid
    public objectPath: string

    constructor(Ar: FArchive)
    constructor(keyGuid: FGuid, objectId: FGuid, objectPath: string)
    constructor(x: any, y?: any, z?: any) {
        if (x instanceof FArchive) {
            this.keyGuid = new FGuid(x)
            this.objectId = new FGuid(x)
            this.objectPath = x.readString()
        } else {
            this.keyGuid = x
            this.objectId = y
            this.objectPath = z
        }
    }

    serialize(Ar: FArchiveWriter) {
        this.keyGuid.serialize(Ar)
        this.objectId.serialize(Ar)
        Ar.writeString(this.objectPath)
    }

    toJson(): any {
        return {
            keyGuid: this.keyGuid.toJson(),
            objectId: this.objectId.toJson(),
            objectPath: this.objectPath
        }
    }
}

export class FLevelSequenceObjectReferenceMap implements IStructType {
    public mapData: FLevelSequenceLegacyObjectReference[]

    constructor(arg: FArchive | FLevelSequenceLegacyObjectReference[]) {
        this.mapData = arg instanceof FArchive
            ? arg.readArray(() => new FLevelSequenceLegacyObjectReference(arg))
            : arg
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeTArray(this.mapData, (it) => it.serialize(Ar))
    }

    toJson(): any {
        return this.mapData.map(m => m.toJson())
    }
}
