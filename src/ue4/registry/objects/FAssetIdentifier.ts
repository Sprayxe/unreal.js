import { FName } from "../../objects/uobject/FName";
import { FArchive } from "../../reader/FArchive";

export class FAssetIdentifier {
    packageName: FName = null
    primaryAssetType: FName = null
    objectName: FName = null
    valueName: FName = null

    constructor(Ar: FArchive) {
        const fieldBits = Ar.readInt8()
        if ((fieldBits & (1 << 0)) !== 0)
            this.packageName = Ar.readFName()
        if ((fieldBits & (1 << 1)) !== 0)
            this.primaryAssetType = Ar.readFName()
        if ((fieldBits & (1 << 2)) !== 0)
            this.objectName = Ar.readFName()
        if ((fieldBits & (1 << 3)) !== 0)
            this.valueName = Ar.readFName()
    }
}