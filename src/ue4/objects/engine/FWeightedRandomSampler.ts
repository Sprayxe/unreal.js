import { IStructType } from "../../assets/objects/UScriptStruct";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

export class FWeightedRandomSampler implements IStructType {
    public prob: number[]
    public alias: number[]
    public totalWeight: number

    constructor(Ar: FArchive)
    constructor(prob: number[], alias: number[], totalWeight: number)
    constructor(x: any, y?: any, z?: any) {
        if (x instanceof FArchive) {
            this.prob = x.readArray(() => x.readFloat32())
            this.alias = x.readArray(() => x.readInt32())
            this.totalWeight = x.readFloat32()
        } else {
            this.prob = x
            this.alias = y
            this.totalWeight = z
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeTArray(this.prob, (it) => Ar.writeFloat32(it))
        Ar.writeTArray(this.alias, (it) => Ar.writeInt32(it))
        Ar.writeFloat32(this.totalWeight)
    }

    toJson(): any {
        return {
            prob: this.prob,
            alias: this.alias,
            totalWeight: this.totalWeight
        }
    }
}