import { FGuid } from "../core/misc/Guid";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";
/**
 * FLevelSequenceLegacyObjectReference
 * @implements {IStructType}
 */
export declare class FLevelSequenceLegacyObjectReference implements IStructType {
    /**
     * keyGuid
     * @type {FGuid}
     * @public
     */
    keyGuid: FGuid;
    /**
     * objectId
     * @type {FGuid}
     * @public
     */
    objectId: FGuid;
    /**
     * objectPath
     * @type {string}
     * @public
     */
    objectPath: string;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {FGuid} keyGuid Key guid to use
     * @param {FGuid} objectId Object id to use
     * @param {string} objectPath Object path to use
     * @constructor
     * @public
     */
    constructor(keyGuid: FGuid, objectId: FGuid, objectPath: string);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
export declare class FLevelSequenceObjectReferenceMap implements IStructType {
    mapData: FLevelSequenceLegacyObjectReference[];
    constructor(arg: FArchive | FLevelSequenceLegacyObjectReference[]);
    serialize(Ar: FArchiveWriter): void;
    toJson(): any;
}
