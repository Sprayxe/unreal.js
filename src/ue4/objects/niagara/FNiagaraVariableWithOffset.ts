import { FNiagaraVariableBase } from "./FNiagaraVariableBase";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FName } from "../uobject/FName";
import { FStructFallback } from "../../assets/objects/FStructFallback";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";

/**
 * FNiagaraVariableWithOffset
 * @extends {FNiagaraVariableBase}
 */
export class FNiagaraVariableWithOffset extends FNiagaraVariableBase {
    /**
     * offset
     * @type {number}
     * @public
     */
    public offset: number

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
     * @param {number} offset Offset to use
     * @constructor
     * @public
     */
    constructor(name: FName, typeDef: FStructFallback, offset: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any, z?: any) {
        if (x instanceof FAssetArchive) {
            super(x)
            this.offset = x.readInt32()
        } else {
            super(x, y)
            this.offset = z
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        super.serialize(Ar);
        Ar.write(this.offset)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        const obj = super.toJson()
        obj.offset = this.offset
        return obj
    }
}