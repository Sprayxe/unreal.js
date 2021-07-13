import { FNiagaraVariableBase } from "./FNiagaraVariableBase";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FName } from "../uobject/FName";
import { FStructFallback } from "../../assets/objects/FStructFallback";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";

/**
 * FNiagaraVariable
 * @extends {FNiagaraVariableBase}
 */
export class FNiagaraVariable extends FNiagaraVariableBase {
    /**
     * varData
     * @type {Buffer}
     * @public
     */
    public varData: Buffer

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive)

    /**
     * Creates an instance using values
     * @param {FName} name
     * @param {FStructFallback} typeDef
     * @param {Buffer} varData
     * @constructor
     * @public
     */
    constructor(name: FName, typeDef: FStructFallback, varData: Buffer)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any, z?: any) {
        if (x instanceof FAssetArchive) {
            super(x)
            this.varData = x.read(x.readInt32())
        } else {
            super(x, y)
            this.varData = z
        }
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        super.serialize(Ar)
        Ar.write(this.varData.length)
        Ar.write(this.varData)
    }
}