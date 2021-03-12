import { FName } from "./uobject/FName";
import { FPackageIndex } from "./uobject/ObjectResource";
import { FAssetArchive } from "../assets/reader/FAssetArchive";

export class FFieldPath {
    path: FName[]
    resolvedOwner: FPackageIndex

    constructor()
    constructor(Ar: FAssetArchive)
    constructor(path: FName[], resolvedOwner: FPackageIndex)
    constructor(x?: any, y?: any) {
        if (x) {
            if (x instanceof FAssetArchive) {
                this.path = x.readArray((ar) => ar.readFName())
                if (this.path.length === 1 && this.path[0] === FName.NAME_None) {
                    this.path = []
                }
                this.resolvedOwner = new FPackageIndex(x)
            } else {
                this.path = x
                this.resolvedOwner = y
            }
        } else {
            this.path = []
            this.resolvedOwner = new FPackageIndex()
        }
    }
}