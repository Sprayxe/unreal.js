import { FGuid } from "../objects/core/misc/Guid"
import { FArchive } from "../reader/FArchive"
import { createFIoContainerId } from "./IoContainerId"
import * as fs from "fs"
import {
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
import Collection from "@discordjs/collection";

/**
 * I/O store container format version
 */
export enum EIoStoreTocVersion {
    Invalid = 0,
    Initial,
    DirectoryIndex,
    PartitionSize,
    LatestPlusOne,
    Latest = LatestPlusOne - 1
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
    containerId: bigint
    encryptionKeyGuid: FGuid
    containerFlags: EIoContainerFlags
    reserved3: uint8
    reserved4: uint16
    reserved5: uint32
    partitionSize: uint64
    reserved6 = new Array<bigint>(6)

    constructor(Ar: FArchive) {
        Ar.readToBuffer(this.tocMagic)
        if (!this.checkMagic())
            throw new Error("TOC header magic mismatch")
        this.version = Ar.readUInt8()
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
        this.reserved5 = Ar.readUInt32()
        this.partitionSize = Ar.readUInt64()
        for (let i = 0; i < this.reserved6.length; i++) {
            this.reserved6[i] = Ar.readUInt64()
        }
    }

    makeMagic() {
        this.tocMagic = Buffer.from(FIoStoreTocHeader.TocMagicImg)
    }

    checkMagic(): boolean {
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
        if (Ar) Ar.readToBuffer(this.offsetAndLength)
    }

    get offset(): uint64 {
        return BigInt(this.offsetAndLength[4])
            | BigInt(this.offsetAndLength[3]) << 8n
            | BigInt(this.offsetAndLength[2]) << 16n
            | BigInt(this.offsetAndLength[1]) << 24n
            | BigInt(this.offsetAndLength[0]) << 32n
    }

    get length(): uint64 {
        return BigInt(this.offsetAndLength[9])
            | BigInt(this.offsetAndLength[8]) << 8n
            | BigInt(this.offsetAndLength[7]) << 16n
            | BigInt(this.offsetAndLength[6]) << 24n
            | BigInt(this.offsetAndLength[5]) << 32n
    }
}

export enum FIoStoreTocEntryMetaFlags {
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
        Ar.readToBuffer(this.data)
    }

    get offset(): uint64 {
        const offset = this.data.readBigUInt64LE()
        return offset & FIoStoreTocCompressedBlockEntry.OffsetMask
    }

    get compressedSize(): uint32 {
        const size = this.data.readUInt32LE(4)
        return size >> FIoStoreTocCompressedBlockEntry.SizeShift
    }

    get uncompressedSize(): uint32 {
        const size = this.data.readUInt32LE(2 * 4)
        return size & FIoStoreTocCompressedBlockEntry.SizeMask
    }

    get compressionMethodIndex(): uint8 {
        const index = this.data.readUInt32LE(2 * 4)
        return index >> FIoStoreTocCompressedBlockEntry.SizeBits
    }
}

/**
 * TOC resource read options.
 */
export enum EIoStoreTocReadOptions {
    Default,
    ReadDirectoryIndex = (1 << 0),
    ReadTocMeta = (1 << 1),
    ReadAll = ReadDirectoryIndex | ReadTocMeta
}

/**
 * Container TOC data.
 */
export class FIoStoreTocResource {
    static CompressionMethodNameLen = 32

    header: FIoStoreTocHeader
    chunkIds: FIoChunkId[]
    chunkOffsetLengths: FIoOffsetAndLength[]
    compressionBlocks: FIoStoreTocCompressedBlockEntry[]
    compressionMethods: string[]
    chunkBlockSignatures: Buffer[] //FSHAHash[]
    chunkMetas: FIoStoreTocEntryMeta[]
    directoryIndexBuffer: Buffer
    chunkIdToIndex = new Collection<string, number>()

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
            const id = new FIoChunkId(tocBuffer)
            this.chunkIds[i] = id
            this.chunkIdToIndex.set(id.id.toString("base64"), i)
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
        this.compressionMethods[0] = "None"
        for (let i = 0; i < this.header.compressionMethodNameCount; i++) {
            const compressionMethodName = tocBuffer.readBuffer(this.header.compressionMethodNameLength)
            let length = 0
            while (compressionMethodName[length] !== 0) {
                ++length
            }
            this.compressionMethods[1 + i] = (compressionMethodName.toString("utf-8", 0, length))
        }

        // Chunk block signatures
        if (this.header.containerFlags & EIoContainerFlags.Signed) {
            const hashSize = tocBuffer.readInt32()
            tocBuffer.pos += hashSize // actually: const tocSignature = tocBuffer.readBuffer(hashSize)
            tocBuffer.pos += hashSize // actually: const blockSignature = tocBuffer.readBuffer(hashSize)
            /*this.chunkBlockSignatures = new Array(this.header.tocCompressedBlockEntryCount)
            for (let i = 0; i < this.header.tocCompressedBlockEntryCount; i++) {
                this.chunkBlockSignatures[i] = tocBuffer.readBuffer(20)
            }*/
            tocBuffer.pos += this.header.tocCompressedBlockEntryCount * 20

            // You could verify hashes here but nah
        }/* else {
            this.chunkBlockSignatures = []
        }*/

        // Directory index
        if (readOptions & EIoStoreTocReadOptions.ReadDirectoryIndex
            && this.header.containerFlags & EIoContainerFlags.Indexed
            && this.header.directoryIndexSize > 0) {
            this.directoryIndexBuffer = tocBuffer.readBuffer(this.header.directoryIndexSize)
        } else {
            tocBuffer.pos += this.header.directoryIndexSize
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

    getTocEntryIndex(chunkId: FIoChunkId) {
        return this.chunkIdToIndex.get(chunkId.id.toString("base64")) || -1
    }

    getOffsetAndLength(chunkId: FIoChunkId): FIoOffsetAndLength {
        const index = this.chunkIdToIndex.get(chunkId.id.toString("base64"))
        return index != null ? this.chunkOffsetLengths[index] : null
    }
}

export class FIoStoreReader {
    private toc = new FIoStoreTocResource()
    private decryptionKey?: Buffer = null
    private containerFileHandles: number[]
    directoryIndexReader: Lazy<FIoDirectoryIndexReader> = new Lazy<FIoDirectoryIndexReader>(() => {
        const out = new FIoDirectoryIndexReader(this.toc.directoryIndexBuffer, this.decryptionKey)
        this.toc.directoryIndexBuffer = null
        return out
    })
    /*private threadBuffers = object : ThreadLocal<FThreadBuffers>() {
        override fun initialValue() = FThreadBuffers()
    }*/
    environment: FIoStoreEnvironment

    initialize(environment: FIoStoreEnvironment, decryptionKeys: UnrealMap<FGuid, Buffer>) {
        this.environment = environment
        const tocFilePath = this.environment.path + ".utoc"
        this.toc.read(new FByteArchive(fs.readFileSync(tocFilePath)), EIoStoreTocReadOptions.ReadAll)

        this.containerFileHandles = new Array(this.toc.header.partitionCount)
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

        if (this.toc.header.containerFlags & EIoContainerFlags.Encrypted) {
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

    get containerId() {
        return this.toc.header.containerId
    }

    get containerFlags() {
        return this.toc.header.containerFlags
    }

    get encryptionKeyGuid() {
        return this.toc.header.encryptionKeyGuid
    }

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

    getFiles(): GameFile[] {
        const files = new Array<GameFile>()
        this.directoryIndexReader.value.iterateDirectoryIndex(
            FIoDirectoryIndexHandle.rootDirectory(),
            "",
            (filename, tocEntryIndex) => {
                files.push(GameFile.createFromIoStoreFile(
                    filename,
                    this.environment.path,
                    new FByteArchive(this.toc.chunkIds[tocEntryIndex].id).readUInt64())
                )
                return true
            }
        )
        return files
    }
}

class FThreadBuffers {
    uncompressedBuffer: Buffer
    compressedBuffer: Buffer
}