import { UnrealMap } from "../../../../util/UnrealMap";
import { FName } from "../FName";
import { FByteBulkData } from "../../../assets/objects/FByteBulkData";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../../assets/writer/FAssetArchiveWriter";
/**
 * FFormatContainer
 */
export declare class FFormatContainer {
    /**
     * formats
     * @type {UnrealMap<FName, FByteBulkData>}
     * @public
     */
    formats: UnrealMap<FName, FByteBulkData>;
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
}
