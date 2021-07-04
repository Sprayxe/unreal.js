import { FName } from "../uobject/FName";
import { FStructFallback } from "../../assets/objects/FStructFallback";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";

/**
 * FNiagaraVariableBase
 * @implements {IStructType}
 */
export class FNiagaraVariableBase implements IStructType {
    /**
     * name
     * @type {FName}
     * @public
     */
    public name: FName

    /**
     * typeDef
     * @type {FStructFallback}
     * @public
     */
    public typeDef: FStructFallback // originally FNiagaraTypeDefinitionHandle typeDefHandle

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
     * @constructor
     * @public
     */
    constructor(name: FName, typeDef: FStructFallback)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any) {
        if (x instanceof FAssetArchive) {
            this.name = x.readFName()
            this.typeDef = new FStructFallback(x, FName.dummy("NiagaraTypeDefinition"))
        } else {
            this.name = x
            this.typeDef = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeFName(this.name)
        this.typeDef.serialize(Ar)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            name: this.name.text,
            typeDef: this.typeDef.toJson()
        }
    }
}
