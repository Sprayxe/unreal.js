import { FChunkPart } from "./FChunkPart";

/**
 * FFileManifest
 */
export class FFileManifest {
    /**
     * File Name
     * @type {string}
     * @public
     */
    public fileName: string = ""

    /**
     *  Symlink target
     *  @type {string}
     *  @public
     */
    public symlinkTarget: string = ""

    /**
     * File hash
     * @type {Buffer}
     * @public
     */
    public fileHash: Buffer = Buffer.alloc(0)

    /**
     *  File meta flags
     *  @type {number}
     *  @public
     */
    public fileMetaFlags: number = 0

    /**
     *  Install tags
     *  @type {Array<string>}
     *  @public
     */
    public installTags: string[] = []

    /**
     *  Chunk parts
     *  @type {Array<FChunkPart>}
     *  @public
     */
    public chunkParts: FChunkPart[] = []

    /**
     *  File size
     *  @type {number}
     *  @public
     */
    public fileSize: number = 0

    /**
     * Creates an instance using values
     * @param {string} fileName File name to use
     * @param {string} symlinkTarget Symlink target to use
     * @param {Buffer} fileHash File hash to use
     * @param {number} fileMetaFlags File meta flags to use
     * @param {number} installTags Install tags size to use
     * @param {Array<FChunkPart>} chunkParts Chunk parts to use
     * @param {number} fileSize File size to use
     * @constructor
     * @public
     */
    constructor(
        fileName?: string,
        symlinkTarget?: string,
        fileHash?: Buffer,
        fileMetaFlags?: number,
        installTags?: string[],
        chunkParts?: FChunkPart[],
        fileSize?: number
    ) {
        if (fileName != null) this.fileName = fileName
        if (symlinkTarget != null) this.symlinkTarget = symlinkTarget
        if (fileHash != null) this.fileHash = fileHash
        if (fileMetaFlags != null) this.fileMetaFlags = fileMetaFlags
        if (installTags != null) this.installTags = installTags
        if (chunkParts != null) this.chunkParts = chunkParts
        if (fileSize != null) this.fileSize = fileSize
    }
}