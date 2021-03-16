import { FGuid } from "../objects/core/misc/Guid"
import { FArchive } from "../reader/FArchive"
import { FIoContainerId } from "./IoContainerId"
import * as fs from "fs";
import { FIoChunkHash, FIoChunkId, FIoStoreEnvironment } from "./IoDispatcher";
import { FByteArchive } from "../reader/FByteArchive";
import { int32, uint16, uint32, uint64, uint8 } from "../../Types";

/**
 * I/O store container format version
 */
enum EIoStoreTocVersion {
    Invalid = 0,
    Initial,
    DirectoryIndex,
    PartitionSize,
    LatestPlusOne,
    Latest = LatestPlusOne - 1
}

// actually in IoDispatcher.h
enum EIoContainerFlags {
    None,
    Compressed = (1 << 0),
    Encrypted = (1 << 1),
    Signed = (1 << 2),
    Indexed = (1 << 3),
}

/**
 * I/O Store TOC header
 */
export class FIoStoreTocHeader {
    static TocMagicImg = "-==--==--==--==-"

    tocMagic = Buffer.alloc(16)
    version: EIoStoreTocVersion
    reserved0: uint8
    reserved1: uint16
    tocHeaderSize: uint32
    tocEntryCount: uint32
    tocCompressedBlockEntryCount: uint32
    tocCompressedBlockEntrySize: uint32 // For sanity checking
    compressionMethodNameCount: uint32
    compressionMethodNameLength: uint32
    compressionBlockSize: uint32
    directoryIndexSize: uint32
    partitionCount: uint32
    containerId: FIoContainerId
    encryptionKeyGuid: FGuid
    containerFlags: EIoContainerFlags
    reserved3: uint8
    reserved4: uint16
    reserved5: uint32
    partitionSize: uint64
    reserved6 = new Array<bigint>(6)

    constructor(Ar: FArchive) {
        Ar.read(this.tocMagic)
        if (!this.checkMagic())
            throw new Error("TOC header magic mismatch")
        console.log(`read version at ${Ar.pos}`); this.version = Ar.read()
        console.log(`read reserved0 at ${Ar.pos}`); this.reserved0 = Ar.readUInt8()
        console.log(`read reserved1 at ${Ar.pos}`); this.reserved1 = Ar.readUInt16()
        console.log(`read tocHeaderSize at ${Ar.pos}`); this.tocHeaderSize = Ar.readUInt32()
        console.log(`read tocEntryCount at ${Ar.pos}`); this.tocEntryCount = Ar.readUInt32()
        console.log(`read tocCompressedBlockEntryCount at ${Ar.pos}`); this.tocCompressedBlockEntryCount = Ar.readUInt32()
        console.log(`read tocCompressedBlockEntrySize at ${Ar.pos}`); this.tocCompressedBlockEntrySize = Ar.readUInt32()
        console.log(`read compressionMethodNameCount at ${Ar.pos}`); this.compressionMethodNameCount = Ar.readUInt32()
        console.log(`read compressionMethodNameLength at ${Ar.pos}`); this.compressionMethodNameLength = Ar.readUInt32()
        console.log(`read compressionBlockSize at ${Ar.pos}`); this.compressionBlockSize = Ar.readUInt32()
        console.log(`read directoryIndexSize at ${Ar.pos}`); this.directoryIndexSize = Ar.readUInt32()
        console.log(`read partitionCount at ${Ar.pos}`); this.partitionCount = Ar.readUInt32()
        console.log(`read containerId at ${Ar.pos}`); this.containerId = new FIoContainerId(Ar)
        console.log(`read encryptionKeyGuid at ${Ar.pos}`); this.encryptionKeyGuid = new FGuid(Ar)
        console.log(`read containerFlags at ${Ar.pos}`); this.containerFlags = Ar.read()
        console.log(`read reserved3 at ${Ar.pos}`); this.reserved3 = Ar.readUInt8()
        console.log(`read reserved4 at ${Ar.pos}`); this.reserved4 = Ar.readUInt16()
        console.log(`read reserved5 at ${Ar.pos}`); this.reserved5 = Ar.readUInt32()
        console.log(`read partitionSize at ${Ar.pos}`); this.partitionSize = Ar.readUInt64()
        for (let i = 0; i < this.reserved6.length; i++) {
            this.reserved6[i] = Ar.readUInt64()
        }
    }

    makeMagic() {
        this.tocMagic = Buffer.from(FIoStoreTocHeader.TocMagicImg)
    }

    checkMagic() {
        return this.tocMagic.equals(Buffer.from(FIoStoreTocHeader.TocMagicImg))
    }
}

/**
 * Combined offset and length
 */
export class FIoOffsetAndLength {
    // We use 5 bytes for offset and size, this is enough to represent
    // an offset and size of 1PB
    offsetAndLength = Buffer.alloc(5 + 5)

    constructor(Ar: FArchive = null) {
        this.offsetAndLength = Buffer.from(new ArrayBuffer(5 + 5))
        if (Ar) Ar.read(this.offsetAndLength)
    }

    get offset() {
        return BigInt(this.offsetAndLength[4])
            | BigInt(this.offsetAndLength[3]) << 8n
            | BigInt(this.offsetAndLength[2]) << 16n
            | BigInt(this.offsetAndLength[1]) << 24n
            | BigInt(this.offsetAndLength[0]) << 32n
    }

    get length() {
        return BigInt(this.offsetAndLength[9])
            | BigInt(this.offsetAndLength[8]) << 8n
            | BigInt(this.offsetAndLength[7]) << 16n
            | BigInt(this.offsetAndLength[6]) << 24n
            | BigInt(this.offsetAndLength[5]) << 32n
    }
}

enum FIoStoreTocEntryMetaFlags {
    None,
    Compressed = (1 << 0),
    MemoryMapped = (1 << 1)
}

/**
 * TOC entry meta data
 */
export class FIoStoreTocEntryMeta {
    chunkHash: FIoChunkHash
    flags: FIoStoreTocEntryMetaFlags

    constructor(Ar: FArchive) {
        this.chunkHash = new FIoChunkHash(Ar)
        this.flags = Ar.readUInt8()
    }
}

/**
 * Compression block entry
 */
export class FIoStoreTocCompressedBlockEntry {
    static OffsetBits = 40
    static OffsetMask = (1n << BigInt(FIoStoreTocCompressedBlockEntry.OffsetBits)) - 1n
    static SizeBits = 24
    static SizeMask = (1 << FIoStoreTocCompressedBlockEntry.SizeBits) - 1
    static SizeShift = 8

    /* 5 bytes offset, 3 bytes for size / uncompressed size and 1 byte for compresseion method. */
    data = Buffer.alloc(5 + 3 + 3 + 1)

    constructor(Ar: FArchive) {
        Ar.read(this.data)
    }

    get offset() {
        const offset = this.data.readBigUInt64LE()
        return offset & FIoStoreTocCompressedBlockEntry.OffsetMask
    }

    get compressedSize() {
        const size = this.data.readUInt32LE(4)
        return size >> FIoStoreTocCompressedBlockEntry.SizeShift
    }

    get uncompressedSize() {
        const size = this.data.readUInt32LE(2 * 4)
        return size & FIoStoreTocCompressedBlockEntry.SizeMask
    }

    get compressionMethodIndex() {
        const index = this.data.readUInt32LE(2 * 4)
        return index >> FIoStoreTocCompressedBlockEntry.SizeBits
    }
}

/**
 * TOC resource read options.
 */
enum EIoStoreTocReadOptions {
    Default,
    ReadDirectoryIndex = (1 << 0),
    ReadTocMeta = (1 << 1),
    ReadAll = ReadDirectoryIndex | ReadTocMeta
}

/**
 * Container TOC data.
 */
class FIoStoreTocResource {
    static CompressionMethodNameLen = 32

    header: FIoStoreTocHeader
    chunkIds: FIoChunkId[]
    chunkOffsetLengths: FIoOffsetAndLength[]
    compressionBlocks: FIoStoreTocCompressedBlockEntry[]
    compressionMethods: string[]
    chunkBlockSignatures: Buffer[] //FSHAHash[]
    chunkMetas: FIoStoreTocEntryMeta[]
    directoryIndexBuffer: Buffer

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
        this.chunkIds = new Array(this.header.tocEntryCount)
        for (let i = 0; i < this.header.tocEntryCount; i++) {
            this.chunkIds[i] = new FIoChunkId(tocBuffer)
        }

        // Chunk offsets
        this.chunkOffsetLengths = new Array(this.header.tocEntryCount)
        for (let i = 0; i < this.header.tocEntryCount; i++) {
            this.chunkOffsetLengths[i] = new FIoOffsetAndLength(tocBuffer)
        }

        // Compression blocks
        this.compressionBlocks = new Array(this.header.tocCompressedBlockEntryCount)
        for (let i = 0; i < this.header.tocCompressedBlockEntryCount; i++) {
            this.compressionBlocks[i] = new FIoStoreTocCompressedBlockEntry(tocBuffer)
        }

        // Compression methods
        this.compressionMethods = new Array(this.header.compressionMethodNameCount + 1)
        this.compressionMethods.push("None")
        for (let i = 0; i < this.header.compressionMethodNameCount; i++) {
            const compressionMethodName = tocBuffer.read(this.header.compressionMethodNameLength)
            let length = 0
            while (compressionMethodName[length] !== 0) {
                ++length
            }
            this.compressionMethods.push(compressionMethodName.toString("utf-8", 0, length))
        }

        // Chunk block signatures
        if (this.header.containerFlags & EIoContainerFlags.Signed) {
            const hashSize = tocBuffer.readInt32()
            tocBuffer.pos += hashSize // actually: const tocSignature = tocBuffer.read(hashSize)
            tocBuffer.pos += hashSize // actually: const blockSignature = tocBuffer.read(hashSize)
            this.chunkBlockSignatures = new Array(this.header.tocCompressedBlockEntryCount)
            for (let i = 0; i < this.header.tocCompressedBlockEntryCount; i++) {
                this.chunkBlockSignatures[i] = tocBuffer.read(20)
            }

            // You could verify hashes here but nah
        } else {
            this.chunkBlockSignatures = []
        }

        // Directory index
        if (readOptions & EIoStoreTocReadOptions.ReadDirectoryIndex
            && this.header.containerFlags & EIoContainerFlags.Indexed
            && this.header.directoryIndexSize > 0) {
            this.directoryIndexBuffer = tocBuffer.read(this.header.directoryIndexSize)
        }

        // Meta
        if ((readOptions & EIoStoreTocReadOptions.ReadTocMeta)) {
            this.chunkMetas = new Array(this.header.tocEntryCount)
            for (let i = 0; i < this.header.tocEntryCount; i++) {
                this.chunkMetas[i] = new FIoStoreTocEntryMeta(tocBuffer)
            }
        } else {
            this.chunkMetas = []
        }
    }
}

export class FIoStoreToc {
    chunkIdToIndex = new Map<FIoChunkId, int32>();
    toc: FIoStoreTocResource
    filesToIndex = new Array<string>()
    fileTocEntryIndices = new Array<uint32>()

    initialize() {
        this.chunkIdToIndex.clear()

        for (let chunkIndex = 0; chunkIndex < this.toc.chunkIds.length; ++chunkIndex) {
            this.chunkIdToIndex.set(this.toc.chunkIds[chunkIndex], chunkIndex)
        }
    }

    get tocResource() { return this.toc }

    getTocEntryIndex(chunkId: FIoChunkId) {
        return this.chunkIdToIndex.get(chunkId)
    }

    getOffsetAndLength(chunkId: FIoChunkId) {
        const index = this.chunkIdToIndex.get(chunkId)
        return index != null ? this.toc.chunkOffsetLengths[index] : null;
    }
}

export class FIoStoreReader {
    private toc = new FIoStoreToc()
    private decryptionKey?: Buffer = null
    private containerFileHandles: number[]
    //directoryIndexReader?: FIoDirectoryIndexReaderImpl = null
    /*private threadBuffers = object : ThreadLocal<FThreadBuffers>() {
        override fun initialValue() = FThreadBuffers()
    }*/
    environment: FIoStoreEnvironment

    initialize(environment: FIoStoreEnvironment, decryptionKeys: Map<FGuid, Buffer>) {
        this.environment = environment
        const tocFilePath = this.environment.path + ".utoc";
        const tocResource = this.toc.tocResource
        tocResource.read(new FByteArchive(fs.readFileSync(tocFilePath)), EIoStoreTocReadOptions.ReadAll)
        this.toc.initialize()

        this.containerFileHandles = []
        for (let partitionIndex = 0; partitionIndex < tocResource.header.partitionCount; ++partitionIndex) {
            let containerFilePath = ""
            containerFilePath += this.environment.path
            if (partitionIndex > 0) {
                containerFilePath += `_s${partitionIndex}`
            }
            containerFilePath += ".ucas"
            try {
                this.containerFileHandles.push(fs.openSync(containerFilePath, "rs"))
            } catch (err) {
                throw new Error(`Failed to open IoStore container file '${containerFilePath}'`)
            }
        }

        if (tocResource.header.containerFlags & EIoContainerFlags.Encrypted) {
            const findKey = decryptionKeys.get(tocResource.header.encryptionKeyGuid)
            if (!findKey) {
                throw new Error(`Missing decryption key for IoStore container file '${environment.path}'`)
            }
            this.decryptionKey = findKey
        }

        /*if (tocResource.header.containerFlags & EIoContainerFlags.Indexed) {
            this.directoryIndexReader = new FIoDirectoryIndexReaderImpl(tocResource.directoryIndexBuffer, this.decryptionKey)
        }*/
    }

    get containerId() { return this.toc.tocResource.header.containerId }

    get containerFlags() { return this.toc.tocResource.header.containerFlags }

    get encryptionKeyGuid() { return this.toc.tocResource.header.encryptionKeyGuid }
}