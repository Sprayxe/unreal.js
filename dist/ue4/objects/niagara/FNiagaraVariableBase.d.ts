import { FName } from "../uobject/FName";
import { FStructFallback } from "../../assets/objects/FStructFallback";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";
/**
 * FNiagaraVariableBase
 * @implements {IStructType}
 */
export declare class FNiagaraVariableBase implements IStructType {
    /**
     * name
     * @type {FName}
     * @public
     */
    name: FName;
    /**
     * typeDef
     * @type {FStructFallback}
     * @public
     */
    typeDef: FStructFallback;
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates an instance using values
     * @param {FName} name
     * @param {FStructFallback} typeDef
     * @constructor
     * @public
     */
    constructor(name: FName, typeDef: FStructFallback);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
