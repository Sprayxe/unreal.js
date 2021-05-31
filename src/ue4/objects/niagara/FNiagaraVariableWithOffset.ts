import { FNiagaraVariableBase } from "./FNiagaraVariableBase";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FName } from "../uobject/FName";
import { FStructFallback } from "../../assets/objects/FStructFallback";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";

export class FNiagaraVariableWithOffset extends FNiagaraVariableBase {
    public offset: number

    constructor(Ar: FAssetArchive)
    constructor(name: FName, typeDef: FStructFallback, offset: number)
    constructor(x: any, y?: any, z?: any) {
        if (x instanceof FAssetArchive) {
            super(x)
            this.offset = x.readInt32()
        } else {
            super(x, y)
            this.offset = z
        }
    }

    serialize(Ar: FAssetArchiveWriter) {
        super.serialize(Ar);
        Ar.write(this.offset)
    }

    toJson(): any {
        const obj = super.toJson()
        obj.offset = this.offset
        return obj
    }
}