/// <reference types="node" />
/// <reference types="ref-napi" />
import { FNiagaraVariableBase } from "./FNiagaraVariableBase";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FName } from "../uobject/FName";
import { FStructFallback } from "../../assets/objects/FStructFallback";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";
/**
 * FNiagaraVariable
 * @extends {FNiagaraVariableBase}
 */
export declare class FNiagaraVariable extends FNiagaraVariableBase {
    /**
     * varData
     * @type {Buffer}
     * @public
     */
    varData: Buffer;
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
     * @param {Buffer} varData
     * @constructor
     * @public
     */
    constructor(name: FName, typeDef: FStructFallback, varData: Buffer);
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
}
