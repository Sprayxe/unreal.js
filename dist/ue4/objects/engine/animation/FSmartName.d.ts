import { FName } from "../../uobject/FName";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * FSmartName
 * @implements {IStructType}
 */
export declare class FSmartName implements IStructType {
    /**
     * displayName
     * @type {FName}
     * @public
     */
    displayName: FName;
    /**
     * Creates an instance using an UE4 Reader or FName
     * @param {FArchive | FName} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg: FArchive | FName);
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
