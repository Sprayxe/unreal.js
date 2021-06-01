import { FPakEntry } from "./objects/FPakEntry";
import { FPakCompressedBlock } from "./objects/FPakCompressedBlock";

export class GameFile {
    path: string = ""
    pos: number = 0
    size: number = 0
    uncompressedSize: number = 0
    compressionMethod = "None"
    compressedBlocks: FPakCompressedBlock[] = []
    compressionBlockSize: number = 0
    isEncrypted: boolean = false
    pakFileName: string
    ioPackageId?: string = null

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

    static createFromIoStoreFile(path: string, pakFileName: string, ioPackageId: string) {
        const file = new GameFile()
        file.path = path
        file.pakFileName = pakFileName
        file.ioPackageId = ioPackageId
        return file
    }

    uexp: GameFile
    ubulk?: GameFile = null

    getExtension() {
       return this.path.substring(this.path.lastIndexOf(".") + 1)
    }
    isUE4Package() {
        const ext = this.getExtension()
        return ext === "uasset" || ext === "umap"
    }
    isLocres() {
        return this.getExtension() === "locres"
    }
    isAssetRegistry() {
        const name = this.getName()
        return name.startsWith("AssetRegistry") && name.endsWith(".bin")
    }

    hasUexp() {
        return !!this.uexp
    }
    hasUbulk() {
        return !!this.ubulk
    }

    isCompressed() {
        return this.uncompressedSize !== this.size || this.compressionMethod !== "None"
    }
    getPathWithoutExtension() {
        return this.path.substring(0, this.path.indexOf("."))
    }
    getName() {
        return this.path.substring(this.path.lastIndexOf("/") + 1)
    }
    getNameWithoutExtension() {
        const n = this.getName()
        return n.substring(0, n.indexOf("."))
    }

    toString() {
        return this.path
    }

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