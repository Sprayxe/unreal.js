import { FPackageIndex } from "./ObjectResource";
import { FName } from "./FName";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";

export class FScriptDelegate {
    object: FPackageIndex
    functionName: FName

    constructor(Ar: FAssetArchive)
    constructor(object: FPackageIndex, functionName: FName)
    constructor(x?: any, y?: any) {
        if (x instanceof FAssetArchive) {
            this.object = new FPackageIndex(x)
            this.functionName = x.readFName()
        } else {
            this.object = x
            this.functionName = y
        }
    }

    serialize(Ar: FAssetArchiveWriter) {
        this.object.serialize(Ar)
        Ar.writeFName(this.functionName)
    }
}