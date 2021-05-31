import { FName } from "../uobject/FName";
import { FStructFallback } from "../../assets/objects/FStructFallback";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";

export class FNiagaraVariableBase implements IStructType {
    public name: FName
    public typeDef: FStructFallback // originally FNiagaraTypeDefinitionHandle typeDefHandle

    constructor(Ar: FAssetArchive)
    constructor(name: FName, typeDef: FStructFallback)
    constructor(x: any, y?: any) {
        if (x instanceof FAssetArchive) {
            this.name = x.readFName()
            this.typeDef = new FStructFallback(x, FName.dummy("NiagaraTypeDefinition"))
        } else {
            this.name = x
            this.typeDef = y
        }
    }

    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeFName(this.name)
        this.typeDef.serialize(Ar)
    }

    toJson(): any {
        return {
            name: this.name.text,
            typeDef: this.typeDef.toJson()
        }
    }
}
