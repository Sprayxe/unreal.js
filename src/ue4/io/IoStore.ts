import { FGuid } from "../objects/core/misc/Guid"
import { FArchive } from "../reader/FArchive"
import { createFIoContainerId } from "./IoContainerId"
import * as fs from "fs"
import {
    EIoChunkType,
    EIoChunkType5,
    EIoContainerFlags,
    FIoChunkHash,
    FIoChunkId,
    FIoDirectoryIndexHandle,
    FIoStoreEnvironment
} from "./IoDispatcher"
import { FByteArchive } from "../reader/FByteArchive"
import { uint16, uint32, uint64, uint8 } from "../../Types"
import { UnrealMap } from "../../util/UnrealMap"
import { Aes } from "../../encryption/aes/Aes"
import { Compression } from "../../compression/Compression"
import { Utils } from "../../util/Utils"
import { GameFile } from "../pak/GameFile";
import { FIoDirectoryIndexReader } from "./IoDirectoryIndex";
import { Lazy } from "../../util/Lazy";
import { AbstractAesVfsReader } from "../vfs/AbstractAesVfsReader";
import { Game } from "../versions/Game";
import { VersionContainer } from "../versions/VersionContainer";

/**
 * I/O store container format version
 * @enum
 */
export enum EIoStoreTocVersion {
    Invalid = 0,
    Initial,
    DirectoryIndex,
    PartitionSize,
    PerfectHash,
    PerfectHashWithOverflow,
    LatestPlusOne,
    Latest = LatestPlusOne - 1
}

/**
 * I/O Store TOC header
 */
export class FIoStoreTocHeader {
    /**
     * Toc magic template
     * @type {string}
     * @public
     * @static
     */
    static TocMagicImg = "-==--==--==--==-"

    /**
     * Toc magic
     * @type {Buffer}
     * @public
     */
    tocMagic = Buffer.alloc(16)

    /**
     * Version
     * @type {EIoStoreTocVersion}
     * @public
     */
    version: EIoStoreTocVersion

    /**
     * Reserved0
     * @type {number}
     * @public
     */
    reserved0: uint8

    /**
     * Reserved1
     * @type {number}
     * @public
     */
    reserved1: uint16

    /**
     * Toc header size
     * @type {number}
     * @public
     */
    tocHeaderSize: uint32

    /**
     * Toc entry count
     * @type {number}
     * @public
     */
    tocEntryCount: uint32

    /**
     * Toc compressed block entry count
     * @type {number}
     * @public
     */
    tocCompressedBlockEntryCount: uint32

    /**
     * Toc compressed block entry size
     * @type {number}
     * @public
     */
    tocCompressedBlockEntrySize: uint32 // For sanity checking

    /**
     * Compression method name count
     * @type {number}
     * @public
     */
    compressionMethodNameCount: uint32

    /**
     * Compression method name length
     * @type {number}
     * @public
     */
    compressionMethodNameLength: uint32

    /**
     * Compression block size
     * @type {number}
     * @public
     */
    compressionBlockSize: uint32

    /**
     * Director index size
     * @type {number}
     * @public
     */
    directoryIndexSize: uint32

    /**
     * Partition count
     * @type {number}
     * @public
     */
    partitionCount: uint32

    /**
     * Container id
     * @type {bigint}
     * @public
     */
    containerId: bigint

    /**
     * Encryption key guid
     * @type {number}
     * @public
     */
    encryptionKeyGuid: FGuid

    /**
     * Container flags
     * @type {EIoContainerFlags}
     * @public
     */
    containerFlags: EIoContainerFlags

    /**
     * Reserved3
     * @type {number}
     * @public
     */
    reserved3: uint8

    /**
     * Reserved4
     * @type {number}
     * @public
     */
    reserved4: uint16

    /**
     * Toc chunk perfect hash seeds count
     * @type {number}
     * @public
     */
    tocChunkPerfectHashSeedsCount: uint32

    /**
     * Partition size
     * @type {bigint}
     * @public
     */
    partitionSize: uint64

    /**
     * Toc chunk without perfect hash count
     * @type {number}
     * @public
     */
    tocChunksWithoutPerfectHashCount: uint32

    /**
     * Reserved7
     * @type {number}
     * @public
     */
    reserved7: uint32

    /**
     * Reserved8
     * @type {Array<bigint>}
     * @public
     */
    reserved8 = new Array<bigint>(5)

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        Ar.readToBuffer(this.tocMagic)
        if (!this.checkMagic())
            throw new Error("TOC header magic mismatch")
        this.version = Ar.readUInt8()
        if (!Object.values(EIoStoreTocVersion).includes(this.version)) {
            const latest = EIoStoreTocVersion.Latest
            console.warn(`Unsupported TOC version ${this.version}, falling back to latest (${latest})`)
            this.version = latest
        }
        this.reserved0 = Ar.readUInt8()
        this.reserved1 = Ar.readUInt16()
        this.tocHeaderSize = Ar.readUInt32()
        this.tocEntryCount = Ar.readUInt32()
        this.tocCompressedBlockEntryCount = Ar.readUInt32()
        this.tocCompressedBlockEntrySize = Ar.readUInt32()
        this.compressionMethodNameCount = Ar.readUInt32()
        this.compressionMethodNameLength = Ar.readUInt32()
        this.compressionBlockSize = Ar.readUInt32()
        this.directoryIndexSize = Ar.readUInt32()
        this.partitionCount = Ar.readUInt32()
        this.containerId = createFIoContainerId(Ar)
        this.encryptionKeyGuid = new FGuid(Ar)
        this.containerFlags = Ar.readUInt8()
        this.reserved3 = Ar.readUInt8()
        this.reserved4 = Ar.readUInt16()
        this.tocChunkPerfectHashSeedsCount = Ar.readUInt32()
        this.partitionSize = Ar.readUInt64()
        this.tocChunksWithoutPerfectHashCount = Ar.readUInt32()
        this.reserved7 = Ar.readUInt32()
        const len = this.reserved8.length
        for (let i = 0; i < len; i++) {
            this.reserved8[i] = Ar.readUInt64()
        }
    }

    /**
     * Creates toc magic
     * @returns {Buffer} Magic
     * @public
     */
    makeMagic() {
        this.tocMagic = Buffer.from(FIoStoreTocHeader.TocMagicImg)
    }

    /**
     * Checks magic
     * @returns {boolean} Result
     * @public
     */
    checkMagic(): boolean {
        return this.tocMagic.equals(Buffer.from(FIoStoreTocHeader.TocMagicImg))
    }
}

/**
 * Combined offset and length
 */
export class FIoOffsetAndLength {
    /**
     * We use 5 bytes for offset and size, this is enough to represent
     * an offset and size of 1PB
     * @type {Buffer}
     * @public
     */
    offsetAndLength: Buffer

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive = null) {
        this.offsetAndLength = Buffer.alloc(5 + 5)
        if (Ar) Ar.readToBuffer(this.offsetAndLength)
    }

    /**
     * Offset
     * @type {bigint}
     * @public
     */
    get offset(): uint64 {
        return BigInt(this.offsetAndLength[4])
            | BigInt(this.offsetAndLength[3]) << 8n
            | BigInt(this.offsetAndLength[2]) << 16n
            | BigInt(this.offsetAndLength[1]) << 24n
            | BigInt(this.offsetAndLength[0]) << 32n
    }

    /**
     * Length
     * @type {bigint}
     * @public
     */
    get length(): uint64 {
        return BigInt(this.offsetAndLength[9])
            | BigInt(this.offsetAndLength[8]) << 8n
            | BigInt(this.offsetAndLength[7]) << 16n
            | BigInt(this.offsetAndLength[6]) << 24n
            | BigInt(this.offsetAndLength[5]) << 32n
    }
}

/**
 * FIoStoreTocEntryMetaFlags
 * @enum
 */
export enum FIoStoreTocEntryMetaFlags {
    None,
    Compressed = (1 << 0),
    MemoryMapped = (1 << 1)
}

/**
 * TOC entry meta data
 */
export class FIoStoreTocEntryMeta {
    /**
     * Chunk hash
     * @type {FIoChunkHash}
     * @public
     */
    chunkHash: FIoChunkHash

    /**
     * Flags
     * @type {FIoStoreTocEntryMetaFlags}
     * @public
     */
    flags: FIoStoreTocEntryMetaFlags

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.chunkHash = new FIoChunkHash(Ar)
        this.flags = Ar.readUInt8()
    }
}

/**
 * Compression block entry
 */
export class FIoStoreTocCompressedBlockEntry {
    /**
     * OffsetBits
     * @type {number}
     * @public
     * @static
     */
    static OffsetBits = 40

    /**
     * OffsetMask
     * @type {bigint}
     * @public
     * @static
     */
    static OffsetMask = (1n << BigInt(FIoStoreTocCompressedBlockEntry.OffsetBits)) - 1n

    /**
     * SizeBits
     * @type {number}
     * @public
     * @static
     */
    static SizeBits = 24

    /**
     * SizeMask
     * @type {number}
     * @public
     * @static
     */
    static SizeMask = (1 << FIoStoreTocCompressedBlockEntry.SizeBits) - 1

    /**
     * SizeShift
     * @type {number}
     * @public
     * @static
     */
    static SizeShift = 8

    /**
     * Data
     * 5 bytes offset, 3 bytes for size / uncompressed size and 1 byte for compression method -> Buffer size
     * @type {Buffer}
     * @public
     */
    data = Buffer.alloc(5 + 3 + 3 + 1)

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        Ar.readToBuffer(this.data)
    }

    /**
     * Offset
     * @type {bigint}
     * @public
     */
    get offset(): uint64 {
        const offset = this.data.readBigUInt64LE()
        return offset & FIoStoreTocCompressedBlockEntry.OffsetMask
    }

    /**
     * Compressed size
     * @type {number}
     * @public
     */
    get compressedSize(): uint32 {
        const size = this.data.readUInt32LE(4)
        return size >> FIoStoreTocCompressedBlockEntry.SizeShift
    }

    /**
     * Uncompressed size
     * @type {number}
     * @public
     */
    get uncompressedSize(): uint32 {
        const size = this.data.readUInt32LE(2 * 4)
        return size & FIoStoreTocCompressedBlockEntry.SizeMask
    }

    /**
     * Compression method index
     * @type {number}
     * @public
     */
    get compressionMethodIndex(): uint8 {
        const index = this.data.readUInt32LE(2 * 4)
        return index >> FIoStoreTocCompressedBlockEntry.SizeBits
    }
}

/**
 * TOC resource read options
 * @enum
 */
export enum EIoStoreTocReadOptions {
    Default,
    ReadDirectoryIndex = (1 << 0),
    ReadTocMeta = (1 << 1),
    ReadAll = ReadDirectoryIndex | ReadTocMeta
}

/**
 * Container TOC data
 */
export class FIoStoreTocResource {
    /**
     * CompressionMethodNameLen
     * @type {number}
     * @public
     * @static
     */
    static CompressionMethodNameLen = 32

    /**
     * Header
     * @type {FIoStoreTocHeader}
     * @public
     */
    header: FIoStoreTocHeader

    /**
     * chunkIds
     * @type {Array<FIoChunkId>}
     * @public
     */
    chunkIds: FIoChunkId[]

    /**
     * chunkOffsetLengths
     * @type {Array<FIoOffsetAndLength>}
     * @public
     */
    chunkOffsetLengths: FIoOffsetAndLength[]

    /**
     * Chunk perfect hash seeds
     * @type {Array<number> | null}
     * @public
     */
    chunkPerfectHashSeeds?: number[] = null

    /**
     * Chunk indices without perfect hash
     * @type {Array<number> | null}
     * @public
     */
    chunkIndicesWithoutPerfectHash?: number[] = null

    /**
     * compressionBlocks
     * @type {Array<FIoStoreTocCompressedBlockEntry>}
     * @public
     */
    compressionBlocks: FIoStoreTocCompressedBlockEntry[]

    /**
     * compressionMethods
     * @type {Array<string>}
     * @public
     */
    compressionMethods: string[]

    /**
     * chunkBlockSignatures
     * @type {Array<Buffer>}
     * @public
     */
    chunkBlockSignatures: Buffer[] //FSHAHash[]

    /**
     * chunkMetas
     * @type {Array<FIoStoreTocEntryMeta>}
     * @public
     */
    chunkMetas: FIoStoreTocEntryMeta[]

    /**
     * directoryIndexBuffer
     * @type {Array<Buffer>}
     * @public
     */
    directoryIndexBuffer: Buffer

    /**
     * chunkIdToIndex (sort of: Collection<string, number>)
     * @type {object}
     * @public
     */
    chunkIdToIndex = {}

    /**
     * Reads a toc buffer
     * @param {FArchive} tocBuffer Toc buffer to read
     * @param {EIoStoreTocReadOptions} readOptions Config for reading
     * @returns {void}
     * @public
     */
    read(tocBuffer: FArchive, readOptions: EIoStoreTocReadOptions) {
        // Header
        this.header = new FIoStoreTocHeader(tocBuffer)

        if (this.header.tocHeaderSize !== 144 /*sizeof(FIoStoreTocHeader)*/) {
            throw new Error("TOC header size mismatch") //throw new FIoStatusException(EIoErrorCode.CorruptToc, "TOC header size mismatch", tocBuffer)
        }

        if (this.header.tocCompressedBlockEntrySize !== 12 /*sizeof(FIoStoreTocCompressedBlockEntry)*/) {
            throw new Error("TOC compressed block entry size mismatch") //throw new FIoStatusException(EIoErrorCode.CorruptToc, "TOC compressed block entry size mismatch", tocBuffer)
        }

        if (this.header.version < EIoStoreTocVersion.DirectoryIndex) {
            throw new Error("Outdated TOC header version") //throw new FIoStatusException(EIoErrorCode.CorruptToc, "Outdated TOC header version", tocBuffer)
        }

        if (this.header.version < EIoStoreTocVersion.PartitionSize) {
            this.header.partitionCount = 1
            this.header.partitionSize = 0xFFFFFFFFFFFFFFFn
        }

        // Chunk IDs
        const _len1 = this.header.tocEntryCount
        this.chunkIds = new Array(_len1)
        if (this.header.version >= EIoStoreTocVersion.PerfectHash) {
            this.chunkIdToIndex = {}
            for (let i = 0; i < _len1; ++i) {
                this.chunkIds[i] = new FIoChunkId(tocBuffer)
            }
        } else {
            for (let i = 0; i < _len1; i++) {
                const id = new FIoChunkId(tocBuffer)
                this.chunkIds[i] = id
                this.chunkIdToIndex[id.id.toString("base64")] = i
            }
        }

        // Chunk offsets
        this.chunkOffsetLengths = new Array(_len1)
        for (let i = 0; i < _len1; i++) {
            this.chunkOffsetLengths[i] = new FIoOffsetAndLength(tocBuffer)
        }

        // Chunk perfect hash map
        let perfectHashSeedsCount = 0
        let chunksWithoutPerfectHashCount = 0
        if (this.header.version >= EIoStoreTocVersion.PerfectHashWithOverflow) {
            perfectHashSeedsCount = this.header.tocChunkPerfectHashSeedsCount
            chunksWithoutPerfectHashCount = this.header.tocChunksWithoutPerfectHashCount
        } else if (this.header.version >= EIoStoreTocVersion.PerfectHash) {
            perfectHashSeedsCount = this.header.tocChunkPerfectHashSeedsCount
        }
        if (perfectHashSeedsCount > 0) {
            this.chunkPerfectHashSeeds = new Array(perfectHashSeedsCount)
            for (let i = 0; i < perfectHashSeedsCount; ++i) {
                this.chunkPerfectHashSeeds[i] = tocBuffer.readInt32()
            }
        }
        if (chunksWithoutPerfectHashCount > 0) {
            this.chunkIndicesWithoutPerfectHash = new Array(chunksWithoutPerfectHashCount)
            for (let i = 0; i < chunksWithoutPerfectHashCount; ++i) {
                this.chunkIndicesWithoutPerfectHash[i] = tocBuffer.readInt32()
            }
            for (let chunkIndexWithoutPerfectHash of this.chunkIndicesWithoutPerfectHash) {
                this.chunkIdToIndex[this.chunkIds[chunkIndexWithoutPerfectHash].id.toString("base64")] = chunkIndexWithoutPerfectHash
            }
        }

        // Compression blocks
        const _len2 = this.header.tocCompressedBlockEntryCount
        this.compressionBlocks = new Array(_len2)
        for (let i = 0; i < _len2; i++) {
            this.compressionBlocks[i] = new FIoStoreTocCompressedBlockEntry(tocBuffer)
        }

        // Compression methods
        this.compressionMethods = ["None"]
        for (let i = 0; i < this.header.compressionMethodNameCount; i++) {
            const compressionMethodName = tocBuffer.read(this.header.compressionMethodNameLength)
            let length = 0
            while (compressionMethodName[length] !== 0) {
                ++length
            }
            this.compressionMethods[1 + i] = (compressionMethodName.toString("utf-8", 0, length))
        }

        // Chunk block signatures
        if (this.header.containerFlags & EIoContainerFlags.Signed) {
            const hashSize = tocBuffer.readInt32()
            tocBuffer.pos += hashSize // actually: const tocSignature = tocBuffer.read(hashSize)
            tocBuffer.pos += hashSize // actually: const blockSignature = tocBuffer.read(hashSize)
            /*this.chunkBlockSignatures = new Array(this.header.tocCompressedBlockEntryCount)
            for (let i = 0; i < this.header.tocCompressedBlockEntryCount; i++) {
                this.chunkBlockSignatures[i] = tocBuffer.read(20)
            }*/
            tocBuffer.pos += this.header.tocCompressedBlockEntryCount * 20

            // You could verify hashes here but nah
        }/* else {
            this.chunkBlockSignatures = []
        }*/

        // Directory index
        if (this.header.containerFlags & EIoContainerFlags.Indexed
            && this.header.directoryIndexSize > 0) {
            if (readOptions & EIoStoreTocReadOptions.ReadDirectoryIndex) {
                this.directoryIndexBuffer = tocBuffer.read(this.header.directoryIndexSize & 0xFFFFFFFF)
            } else {
                tocBuffer.pos += this.header.directoryIndexSize
            }
        }

        // Meta
        if ((readOptions & EIoStoreTocReadOptions.ReadTocMeta)) {
            this.chunkMetas = new Array(_len1)
            for (let i = 0; i < _len1; i++) {
                this.chunkMetas[i] = new FIoStoreTocEntryMeta(tocBuffer)
            }
        } else {
            this.chunkMetas = []
        }
    }

    /**
     * getTocEntryIndex
     * @param {FIoChunkId} chunkId Chunk ID
     * @returns {number} Index
     * @public
     */
    getTocEntryIndex(chunkId: FIoChunkId) {
        const chunkPerfectHashSeeds = this.chunkPerfectHashSeeds
        if (chunkPerfectHashSeeds != null) {
            const chunkCount = this.header.tocEntryCount
            if (chunkCount === 0)
                return -1
            const seedCount = chunkPerfectHashSeeds.length
            const seedIndex = chunkId.hashWithSeed(0) % BigInt(seedCount)
            const seed = chunkPerfectHashSeeds[Number(seedIndex)]
            if (seed === 0)
                return -1
            let slot: number
            if (seed < 0) {
                const seedAsIndex = -seed - 1
                if (seedAsIndex < chunkCount) {
                    slot = seedAsIndex
                } else {
                    // Entry without perfect hash
                    return this.chunkIdToIndex[chunkId.id.toString("base64")] || -1
                }
            } else {
                slot = Number(chunkId.hashWithSeed(seed) % BigInt(chunkCount))
            }
            if (this.chunkIds[slot]?.equals(chunkId))
                return slot
            return -1
        }
        return this.chunkIdToIndex[chunkId.id.toString("base64")] || -1
    }

    /**
     * getOffsetAndLength
     * @param {FIoChunkId} chunkId Chunk ID
     * @returns {FIoOffsetAndLength} Offset and length
     * @public
     */
    getOffsetAndLength(chunkId: FIoChunkId): FIoOffsetAndLength {
        const tocEntryIndex = this.getTocEntryIndex(chunkId)
        return tocEntryIndex !== -1 ? this.chunkOffsetLengths[tocEntryIndex] : null
    }
}

/**
 * FIoStoreReader
 */
export class FIoStoreReader extends AbstractAesVfsReader {
    constructor(path: string, versions: VersionContainer) {
        super(path, versions)
    }

    /**
     * Toc
     * @type {FIoStoreTocResource}
     * @private
     */
    private toc = new FIoStoreTocResource()

    /**
     * decryptionKey
     * @type {?Buffer}
     * @private
     */
    private decryptionKey?: Buffer = null

    /**
     * containerFileHandles
     * @type {Array<number>}
     * @private
     */
    private containerFileHandles: number[] = []

    /**
     * directoryIndexReader
     * @type {Lazy<FIoDirectoryIndexReader>}
     * @public
     */
    directoryIndexReader = new Lazy<FIoDirectoryIndexReader>(() => {
        if ((this.toc.header.containerFlags & EIoContainerFlags.Indexed) && this.toc.directoryIndexBuffer != null) {
            const out = new FIoDirectoryIndexReader(this.toc.directoryIndexBuffer, this.decryptionKey)
            this.toc.directoryIndexBuffer = null
            return out
        }
        return null
    })


    public get hasDirectoryIndex(): boolean {
        return this.directoryIndexReader != null || this.toc.directoryIndexBuffer != null
    }

    /*private threadBuffers = object : ThreadLocal<FThreadBuffers>() {
        override fun initialValue() = FThreadBuffers()
    }*/

    /**
     * Environment
     * @type {FIoStoreEnvironment}
     * @public
     */
    environment: FIoStoreEnvironment

    /**
     * Initializes this
     * @param {FIoStoreEnvironment} environment Environment to use
     * @param {UnrealMap<FGuid, Buffer>} decryptionKeys Decryption keys to use
     * @param {number} readOptions Options for reading io store toc
     * @returns {void}
     * @public
     */
    initialize(environment: FIoStoreEnvironment, decryptionKeys: UnrealMap<FGuid, Buffer>, readOptions: number) {
        this.environment = environment
        this.toc.read(new FByteArchive(fs.readFileSync(this.environment.path + ".utoc")), readOptions)

        for (let partitionIndex = 0; partitionIndex < this.toc.header.partitionCount; ++partitionIndex) {
            let containerFilePath = ""
            containerFilePath += this.environment.path
            if (partitionIndex > 0) {
                containerFilePath += `_s${partitionIndex}`
            }
            containerFilePath += ".ucas"
            try {
                this.containerFileHandles[partitionIndex] = fs.openSync(containerFilePath, "rs")
            } catch (err) {
                throw new Error(`Failed to open IoStore container file '${containerFilePath}'`)
            }
        }

        if (this.isEncrypted) {
            const findKey = decryptionKeys.get(this.toc.header.encryptionKeyGuid)
            if (!findKey) {
                throw new Error(`Missing decryption key for IoStore container file '${environment.path}'`)
            }
            this.decryptionKey = findKey
        }

        console.log("IoStore \"%s\": %d %s, version %d",
            environment.path,
            this.toc.header.tocEntryCount,
            this.decryptionKey ? "encrypted chunks" : "chunks",
            this.toc.header.version)
    }

    public extract(gameFile: GameFile): Buffer {
        if (gameFile.ioChunkId == null && gameFile.pakFileName != this.name)
            throw new TypeError(`Wrong I/O store reader, required ${gameFile.pakFileName}, this is ${this.name}`)
        return this.read(gameFile.ioChunkId)
    }

    public readIndex(): GameFile[] {
        const start = Date.now()
        const files = []
        const directoryIndex = this.directoryIndexReader.value
        if (directoryIndex != null) {
            const exportBundleDataChunkType = this.game >= Game.GAME_UE5_BASE ? EIoChunkType5.ExportBundleData : EIoChunkType.ExportBundleData
            directoryIndex.iterateDirectoryIndex(FIoDirectoryIndexHandle.rootDirectory(), "", (fileName, tocEntryIndex) => {
                const chunkId = this.toc.chunkIds[tocEntryIndex]
                if (chunkId.chunkType === exportBundleDataChunkType)
                    files.push(GameFile.createFromIoStoreFile(fileName, this.name, chunkId))
                return true
            })
            this.mountPoint = directoryIndex.mountPoint
        }

        // Print statistics
        const chunks = this.toc.header.tocEntryCount
        const encrypted = this.isEncrypted ? "encrypted chunks" : "chunks"
        const v = this.toc.header.version
        const time = Date.now() - start
        console.log(`IoStore \"${this.path}\": ${chunks} ${encrypted}, version ${v} in ${time}ms`)

        this.files = files
        return files
    }

    public indexCheckBytes(): Buffer {
        return this.toc.directoryIndexBuffer || Buffer.alloc(AbstractAesVfsReader.MAX_MOUNTPOINT_TEST_LENGTH)
    }

    get isEncrypted() {
        return (this.toc.header.containerFlags & EIoContainerFlags.Encrypted) != 0
    }

    /**
     * Container ID
     * @type {bigint}
     * @public
     */
    get containerId() {
        return this.toc.header.containerId
    }

    /**
     * Container Flags
     * @type {EIoContainerFlags}
     * @public
     */
    get containerFlags() {
        return this.toc.header.containerFlags
    }

    /**
     * Encryption key guid
     * @type {FGuid}
     * @public
     */
    get encryptionKeyGuid() {
        return this.toc.header.encryptionKeyGuid
    }

    /**
     * Reads chunk id
     * @param {FIoChunkId} chunkId ID to read
     * @returns {Buffer} Read bytes
     * @public
     */
    read(chunkId: FIoChunkId/*, options: FIoReadOptions = FIoReadOptions()*/): Buffer {
        const offsetAndLength = this.toc.getOffsetAndLength(chunkId)
        if (!offsetAndLength)
            throw new Error("Unknown chunk ID")
        const _offset = offsetAndLength.offset
        const _length = offsetAndLength.length
        const offset = Number(_offset)
        const length = Number(_length)
        const threadBuffers = new FThreadBuffers()
        const compressionBlockSize = this.toc.header.compressionBlockSize
        const firstBlockIndex = Math.floor(offset / compressionBlockSize)
        const lastBlockIndex = Math.floor((Utils.alignBigInt(_offset + _length, BigInt(compressionBlockSize)) - 1) / compressionBlockSize)
        let offsetInBlock = offset % compressionBlockSize
        const dst = Buffer.alloc(length)
        let dstOff = 0
        let remainingSize = length
        let blockIndex = firstBlockIndex // 'while()' seems to be faster than: 'for (let blockIndex = firstBlockIndex; blockIndex <= lastBlockIndex; ++blockIndex)'
        while (blockIndex <= lastBlockIndex) {
            const compressionBlock = this.toc.compressionBlocks[blockIndex]
            const rawSize = Utils.align(compressionBlock.compressedSize, Aes.BLOCK_SIZE)
            if (threadBuffers.compressedBuffer == null || threadBuffers.compressedBuffer.length < rawSize) {
                threadBuffers.compressedBuffer = Buffer.alloc(rawSize)
            }
            const uncompressedSize = compressionBlock.uncompressedSize
            if (threadBuffers.uncompressedBuffer == null || threadBuffers.uncompressedBuffer.length < uncompressedSize) {
                threadBuffers.uncompressedBuffer = Buffer.alloc(uncompressedSize)
            }
            const partitionIndex = Math.floor(Number(compressionBlock.offset / this.toc.header.partitionSize))
            const partitionOffset = Number(compressionBlock.offset % this.toc.header.partitionSize)
            const fileHandle = this.containerFileHandles[partitionIndex]
            fs.readSync(fileHandle, threadBuffers.compressedBuffer, 0, rawSize, partitionOffset)
            if (this.toc.header.containerFlags & EIoContainerFlags.Encrypted) {
                threadBuffers.compressedBuffer = Aes.decrypt(threadBuffers.compressedBuffer, this.decryptionKey)
            }
            let src: Buffer
            if (compressionBlock.compressionMethodIndex === 0) {
                src = threadBuffers.compressedBuffer
            } else {
                const compressionMethod = this.toc.compressionMethods[compressionBlock.compressionMethodIndex]
                try {
                    Compression.uncompress(compressionMethod, threadBuffers.uncompressedBuffer, 0, uncompressedSize, threadBuffers.compressedBuffer, 0, compressionBlock.compressedSize)
                    src = threadBuffers.uncompressedBuffer
                } catch (e) {
                    throw new Error("Failed uncompressing block")
                }
            }
            const sizeInBlock = Math.min(compressionBlockSize - offsetInBlock, remainingSize)
            src.copy(dst, dstOff, offsetInBlock, offsetInBlock + sizeInBlock)
            offsetInBlock = 0
            remainingSize -= sizeInBlock
            dstOff += sizeInBlock
            ++blockIndex
        }
        return dst
    }

    /**
     * Gets files
     * @returns {Array<GameFile>} Files
     * @public
     */
    getFiles(): GameFile[] {
        const files = new Array<GameFile>()
        this.directoryIndexReader.value?.iterateDirectoryIndex(
            FIoDirectoryIndexHandle.rootDirectory(),
            "",
            (filename, tocEntryIndex) => {
                const chunkId = this.toc.chunkIds[tocEntryIndex]
                if (chunkId.chunkType === EIoChunkType.ExportBundleData) {
                    files.push(GameFile.createFromIoStoreFile(
                        filename,
                        this.environment.path,
                        chunkId),
                    )
                }
                return true
            }
        )
        return files
    }

    // TODO getChunkInfo(chunkId: FIoChunkId): FIoStoreTocChunkInfo
    // TODO getChunkInfo(tocEntryIndex: number): FIoStoreTocChunkInfo
}

/**
 * FThreadBuffers
 */
class FThreadBuffers {
    /**
     * uncompressedBuffer
     * @type {Buffer}
     * @public
     */
    uncompressedBuffer: Buffer

    /**
     * compressedBuffer
     * @type {Buffer}
     * @public
     */
    compressedBuffer: Buffer
}