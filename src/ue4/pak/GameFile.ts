import { FPakEntry } from "./objects/FPakEntry";
import { FPakCompressedBlock } from "./objects/FPakCompressedBlock";

export class GameFile {
    /**
     * Path to the file
     * @type {string}
     * @public
     */
    path: string = ""

    /**
     * Reader position of the file
     * @type {number}
     * @public
     */
    pos: number = 0

    /**
     * Size of the file
     * @type {number}
     * @public
     */
    size: number = 0

    /**
     * Uncompress size of the file
     * @type {number}
     * @public
     */
    uncompressedSize: number = 0

    /**
     * Compression method of the file
     * @type {string}
     * @public
     */
    compressionMethod = "None"

    /**
     * Compressed block of the file
     * @type {Array<FPakCompressedBlock>}
     * @public
     */
    compressedBlocks: FPakCompressedBlock[] = []

    /**
     * Compression block size of the file
     * @type {number}
     * @public
     */
    compressionBlockSize: number = 0

    /**
     * Whether this file is encrypted
     * @type {boolean}
     * @public
     */
    isEncrypted: boolean = false

    /**
     * Pak file name of the file
     * @type {string}
     * @public
     */
    pakFileName: string

    /**
     * I/O Package ID of the file
     * @type {?bigint}
     * @public
     */
    ioPackageId?: bigint = null

    /**
     * Creates an instance
     * @param {?FPakEntry} pakEntry Pak entry of file
     * @param {?string} mountPrefix Mount prefix of file
     * @param {?string} pakFileName Pak file name of file
     * @constructor
     * @public
     */
    constructor(pakEntry?: FPakEntry, mountPrefix?: string, pakFileName?: string) {
        if (pakEntry) {
            this.path = mountPrefix + pakEntry.name
            this.pos = pakEntry.pos
            this.size = pakEntry.size
            this.uncompressedSize = pakEntry.uncompressedSize
            this.compressionMethod = pakEntry.compressionMethod
            this.compressedBlocks = pakEntry.compressionBlocks
            this.compressionBlockSize = pakEntry.compressionBlockSize
            this.isEncrypted = pakEntry.isEncrypted
            this.pakFileName = pakFileName
            this.ioPackageId = null
        }
    }

    /**
     * Creates an instance from io store file
     * @param {string} path Path to file
     * @param {string} pakFileName Pak file name of file
     * @param {bigint} ioPackageId I/O Package ID of file
     * @public
     * @static
     */
    static createFromIoStoreFile(path: string, pakFileName: string, ioPackageId: bigint) {
        const file = new GameFile()
        file.path = path
        file.pakFileName = pakFileName
        file.ioPackageId = ioPackageId
        return file
    }

    /**
     * UEXP File
     * @type {GameFile}
     * @public
     */
    uexp: GameFile

    /**
     * UBULK File
     * @type {?GameFile}
     * @public
     */
    ubulk?: GameFile = null

    /**
     * Gets extension of this file
     * @returns {string}
     * @public
     */
    getExtension() {
        return this.path.substring(this.path.lastIndexOf(".") + 1)
    }

    /**
     * Whether if this is an UE4 Package
     * @returns {boolean}
     * @public
     */
    isUE4Package() {
        const ext = this.getExtension()
        return ext === "uasset" || ext === "umap"
    }

    /**
     * Whether if this is a locres file
     * @returns {boolean}
     * @public
     */
    isLocres() {
        return this.getExtension() === "locres"
    }

    /**
     * Whether if this is an asset registry
     * @returns {boolean}
     * @public
     */
    isAssetRegistry() {
        const name = this.getName()
        return name.startsWith("AssetRegistry") && name.endsWith(".bin")
    }

    /**
     * Whether if this has uexp data
     * @returns {boolean}
     * @public
     */
    hasUexp() {
        return !!this.uexp
    }

    /**
     * Whether if this has ubulk data
     * @returns {boolean}
     * @public
     */
    hasUbulk() {
        return !!this.ubulk
    }

    /**
     * Whether if this is compressed
     * @returns {boolean}
     * @public
     */
    isCompressed() {
        return this.uncompressedSize !== this.size || this.compressionMethod !== "None"
    }

    /**
     * Gets path without extension
     * @returns {string}
     * @public
     */
    getPathWithoutExtension() {
        return this.path.substring(0, this.path.indexOf("."))
    }

    /**
     * Gets name of this
     * @returns {string}
     * @public
     */
    getName() {
        return this.path.substring(this.path.lastIndexOf("/") + 1)
    }

    /**
     * Gets name without extension
     * @returns {string}
     * @public
     */
    getNameWithoutExtension() {
        const n = this.getName()
        return n.substring(0, n.indexOf("."))
    }

    /**
     * Turns this into string
     * @returns {string}
     * @public
     */
    toString() {
        return this.path
    }

    /**
     * Whether this equals another object
     * @param {?any} other Object to check
     * @returns {boolean}
     */
    equals(other?: any) {
        if (this === other) return true
        if (!(other instanceof GameFile)) return false

        other as GameFile

        if (this.path !== other.path) return false
        if (this.pos !== other.pos) return false
        if (this.size !== other.size) return false
        if (this.uncompressedSize !== other.uncompressedSize) return false

        return this.compressionMethod === other.compressionMethod
    }
}