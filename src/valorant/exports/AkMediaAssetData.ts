import { UObject } from "../../ue4/assets/exports/UObject";
import { FAssetArchive } from "../../ue4/assets/reader/FAssetArchive";
import { FByteBulkData } from "../../ue4/assets/objects/FByteBulkData";
import { Locres } from "../../ue4/locres/Locres";

export class AkMediaAssetData extends UObject {
    public DataChunks: DataChunk[]

    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos);
        this.DataChunks = Ar.readArray(() => new DataChunk(Ar))
    }

    toJson(locres: Locres = null): any {
        return this.DataChunks.map(d => d.toJson())
    }
}

class DataChunk {
    public IsPrefetch: boolean
    public BulkData: FByteBulkData

    constructor(Ar: FAssetArchive) {
        this.IsPrefetch = Ar.readBoolean()
        this.BulkData = new FByteBulkData(Ar)
    }

    toJson() {
        return {
            bIsPrefetch: this.IsPrefetch,
            bulkData: this.BulkData.header.toJson()
        }
    }
}