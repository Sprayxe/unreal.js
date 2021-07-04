import { UnrealMap } from "../../../../util/UnrealMap";
import { FName } from "../FName";
import { FByteBulkData } from "../../../assets/objects/FByteBulkData";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../../assets/writer/FAssetArchiveWriter";

/**
 * FFormatContainer
 */
export class FFormatContainer {
    /**
     * formats
     * @type {UnrealMap<FName, FByteBulkData>}
     * @public
     */
    public formats: UnrealMap<FName, FByteBulkData>

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive) {
        this.formats = Ar.readTMap(null, () => {
            return {
                key: Ar.readFName(),
                value: new FByteBulkData(Ar)
            }
        })
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeTMap(this.formats, (k, v) => {
            Ar.writeFName(k)
            v.serialize(Ar)
        })
    }
}