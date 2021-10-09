import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FArchive } from "../../reader/FArchive";

/**
 * FManifestHeader
 */
export class FManifestHeader {
    /**
     * Manifest header magic
     * @type {number}
     * @public
     * @static
     */
    public static readonly MANIFEST_HEADER_MAGIC = 0x44BEC00C

    /**
     * Magic
     * @type {number}
     * @public
     */
    public magic: number

    /**
     * Header size
     * @type {number}
     * @public
     */
    public headerSize: number

    /**
     * Data size uncompressed
     * @type {number}
     * @public
     */
    public dataSizeUncompressed: number

    /**
     * Data size compressed
     * @type {number}
     * @public
     */
    public dataSizeCompressed: number

    /**
     * SHA-Hash
     * @type {Buffer}
     * @public
     */
    public shaHash: Buffer

    /**
     * Stored as
     * @type {number}
     * @public
     */
    public storedAs: number

    /**
     * Version
     * @type {number}
     * @public
     */
    public version: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        const startPos = Ar.pos
        this.magic = Ar.readUInt32()
        this.headerSize = Ar.readUInt32()
        this.dataSizeUncompressed = Ar.readUInt32()
        this.dataSizeCompressed = Ar.readUInt32()
        this.shaHash = Ar.read(20)
        this.storedAs = Ar.readUInt8()
        this.version = Ar.readInt32()
        Ar.pos = startPos + this.headerSize
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
    }
}