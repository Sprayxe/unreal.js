import { FNiagaraVariableBase } from "./FNiagaraVariableBase";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FName } from "../uobject/FName";
import { FStructFallback } from "../../assets/objects/FStructFallback";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";

export class FNiagaraVariable extends FNiagaraVariableBase {
    public varData: Buffer

    constructor(Ar: FAssetArchive)
    constructor(name: FName, typeDef: FStructFallback, varData: Buffer)
    constructor(x: any, y?: any, z?: any) {
        if (x instanceof FAssetArchive) {
            super(x)
            this.varData = x.readBuffer(x.readInt32())
        } else {
            super(x, y)
            this.varData = z
        }
    }

    serialize(Ar: FAssetArchiveWriter) {
        super.serialize(Ar)
        Ar.write(this.varData.length)
        Ar.write(this.varData)
    }
}