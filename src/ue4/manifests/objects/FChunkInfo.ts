import { FGuid } from "../../objects/core/misc/Guid";

/**
 * FChunkInfo
 */
export class FChunkInfo {
    /**
     * Guid
     * @type {FGuid}
     * @public
     */
    public guid: FGuid = new FGuid()

    /**
     *  Hash
     *  @type {number}
     *  @public
     */
    public hash: number = 0

    /**
     * SHA-Hash
     * @type {Buffer}
     * @public
     */
    public shaHash: Buffer = Buffer.alloc(0)

    /**
     *  Group number
     *  @type {number}
     *  @public
     */
    public groupNumber: number = 0

    /**
     *  Window size
     *  @type {number}
     *  @public
     */
    public windowSize: number = 0

    /**
     *  File size
     *  @type {number}
     *  @public
     */
    public fileSize: number = 0

    /**
     * Creates an instance using values
     * @param {FGuid} guid Guid to use
     * @param {number} hash Hash to use
     * @param {Buffer} shaHash SHA-Hash to use
     * @param {number} groupNumber Group number to use
     * @param {number} windowSize Window size to use
     * @param {number} fileSize File size to use
     * @constructor
     * @public
     */
    constructor(
        guid?: FGuid,
        hash?: number,
        shaHash?: Buffer,
        groupNumber?: number,
        windowSize?: number,
        fileSize?: number
    ) {
        if (guid != null) this.guid = guid
        if (hash != null) this.hash = hash
        if (shaHash != null) this.shaHash = shaHash
        if (groupNumber != null) this.groupNumber = groupNumber
        if (windowSize != null) this.windowSize = windowSize
        if (fileSize != null) this.fileSize = fileSize
    }
}