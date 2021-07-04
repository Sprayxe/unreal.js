import { FNiagaraVariableBase } from "./FNiagaraVariableBase";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FName } from "../uobject/FName";
import { FStructFallback } from "../../assets/objects/FStructFallback";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";
/**
 * FNiagaraVariableWithOffset
 * @extends {FNiagaraVariableBase}
 */
export declare class FNiagaraVariableWithOffset extends FNiagaraVariableBase {
    /**
     * offset
     * @type {number}
     * @public
     */
    offset: number;
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
     * @param {number} offset Offset to use
     * @constructor
     * @public
     */
    constructor(name: FName, typeDef: FStructFallback, offset: number);
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
