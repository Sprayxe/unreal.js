import { FManifestHeader } from "./FManifestHeader";
import { FManifestMeta } from "./FManifestMeta";
import { FChunkDataList } from "./FChunkDataList";
import { FFileManifestList } from "./FFileManifestList";
import { FCustomFields } from "./FCustomFields";
import { FArchive } from "../../reader/FArchive";
import { Compression } from "../../../compression/Compression";
import { FByteArchive } from "../../reader/FByteArchive";

/**
 * FManifestData
 */
export class FManifestData {
    /**
     * Header
     * @type {FManifestHeader}
     * @public
     */
    public header: FManifestHeader

    /**
     * Meta
     * @type {FManifestMeta}
     * @public
     */
    public meta: FManifestMeta

    /**
     * Chunk data list
     * @type {FChunkDataList}
     * @public
     */
    public chunkDataList: FChunkDataList

    /**
     * File manifest list
     * @type {FFileManifestList}
     * @public
     */
    public fileManifestList: FFileManifestList

    /**
     * Custom fields
     * @type {FCustomFields}
     * @public
     */
    public customFields: FCustomFields

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        const startPos = Ar.pos
        this.header = new FManifestHeader(Ar)
        let manifestRawData = Ar.readBuffer(this.header.dataSizeCompressed)
        if (this.header.storedAs & 1) {
            //Compressed, only compression format is ZLib
            manifestRawData = Compression.uncompress0("Zlib", manifestRawData, this.header.dataSizeUncompressed)
        }
        const rawAr = new FByteArchive(manifestRawData)
        this.meta = new FManifestMeta(rawAr)
        this.chunkDataList = new FChunkDataList(rawAr)
        this.fileManifestList = new FFileManifestList(rawAr)
        this.customFields = new FCustomFields(rawAr)
        Ar.pos = startPos + this.header.headerSize + this.header.dataSizeCompressed
    }
}