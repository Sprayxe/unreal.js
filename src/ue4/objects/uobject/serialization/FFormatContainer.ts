import { UnrealMap } from "../../../../util/UnrealMap";
import { FName } from "../FName";
import { FByteBulkData } from "../../../assets/objects/FByteBulkData";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../../assets/writer/FAssetArchiveWriter";

export class FFormatContainer {
    public formats: UnrealMap<FName, FByteBulkData>
    constructor(Ar: FAssetArchive) {
        this.formats = Ar.readTMap(null, () => {
            return {
                key: Ar.readFName(),
                value: new FByteBulkData(Ar)
            }
        })
    }

    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeTMap(this.formats, (k, v) => {
            Ar.writeFName(k)
            v.serialize(Ar)
        })
    }
}