import { FGuid } from "../core/misc/Guid";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";

/**
 * FLevelSequenceLegacyObjectReference
 * @implements {IStructType}
 */
export class FLevelSequenceLegacyObjectReference implements IStructType {
    /**
     * keyGuid
     * @type {FGuid}
     * @public
     */
    public keyGuid: FGuid

    /**
     * objectId
     * @type {FGuid}
     * @public
     */
    public objectId: FGuid

    /**
     * objectPath
     * @type {string}
     * @public
     */
    public objectPath: string

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {FGuid} keyGuid Key guid to use
     * @param {FGuid} objectId Object id to use
     * @param {string} objectPath Object path to use
     * @constructor
     * @public
     */
    constructor(keyGuid: FGuid, objectId: FGuid, objectPath: string)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.keyGuid.serialize(Ar)
        this.objectId.serialize(Ar)
        Ar.writeString(this.objectPath)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
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
