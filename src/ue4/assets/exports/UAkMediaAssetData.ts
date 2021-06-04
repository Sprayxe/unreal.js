import { UObject } from "./UObject";
import { FByteBulkData } from "../objects/FByteBulkData";
import { FAssetArchive } from "../reader/FAssetArchive";

export class UAkMediaAssetData extends UObject {
    public isStreamed = false
    public useDeviceMemory = false
    public dataChunks: FAkMediaDataChunk[]

    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos);
        // UObject Properties
        this.isStreamed = this.getOrDefault("IsStreamed", false)
        this.useDeviceMemory = this.getOrDefault("UseDeviceMemory", false)
        this.dataChunks = Ar.readArray(() => new FAkMediaDataChunk(Ar))
    }
}

export class FAkMediaDataChunk {
    public readonly bulkData: FByteBulkData
    public readonly isPrefetch: boolean

    constructor(Ar: FAssetArchive) {
        this.isPrefetch = Ar.readBoolean()
        this.bulkData = new FByteBulkData(Ar)
    }

    toJson() {
        return {
            isPrefetch: this.isPrefetch,
            bulkData: this.bulkData.header.toJson()
        }
    }
}