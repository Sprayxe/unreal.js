/// <reference types="node" />
/// <reference types="ref-napi" />
import { FGuid } from "../objects/core/misc/Guid";
import { FArchive } from "../reader/FArchive";
import { EIoContainerFlags, FIoChunkHash, FIoChunkId, FIoStoreEnvironment } from "./IoDispatcher";
import { uint16, uint32, uint64, uint8 } from "../../Types";
import { UnrealMap } from "../../util/UnrealMap";
import { GameFile } from "../pak/GameFile";
import { FIoDirectoryIndexReader } from "./IoDirectoryIndex";
import { Lazy } from "../../util/Lazy";
/**
 * I/O store container format version
 * @enum
 */
export declare enum EIoStoreTocVersion {
    Invalid = 0,
    Initial = 1,
    DirectoryIndex = 2,
    PartitionSize = 3,
    LatestPlusOne = 4,
    Latest = 3
}
/**
 * I/O Store TOC header
 */
export declare class FIoStoreTocHeader {
    /**
     * Toc magic template
     * @type {string}
     * @public
     * @static
     */
    static TocMagicImg: string;
    /**
     * Toc magic
     * @type {Buffer}
     * @public
     */
    tocMagic: Buffer;
    /**
     * Version
     * @type {EIoStoreTocVersion}
     * @public
     */
    version: EIoStoreTocVersion;
    /**
     * Reserved0
     * @type {number}
     * @public
     */
    reserved0: uint8;
    /**
     * Reserved1
     * @type {number}
     * @public
     */
    reserved1: uint16;
    /**
     * Toc header size
     * @type {number}
     * @public
     */
    tocHeaderSize: uint32;
    /**
     * Toc entry count
     * @type {number}
     * @public
     */
    tocEntryCount: uint32;
    /**
     * Toc compressed block entry count
     * @type {number}
     * @public
     */
    tocCompressedBlockEntryCount: uint32;
    /**
     * Toc compressed block entry size
     * @type {number}
     * @public
     */
    tocCompressedBlockEntrySize: uint32;
    /**
     * Compression method name count
     * @type {number}
     * @public
     */
    compressionMethodNameCount: uint32;
    /**
     * Compression method name length
     * @type {number}
     * @public
     */
    compressionMethodNameLength: uint32;
    /**
     * Compression block size
     * @type {number}
     * @public
     */
    compressionBlockSize: uint32;
    /**
     * Director index size
     * @type {number}
     * @public
     */
    directoryIndexSize: uint32;
    /**
     * Partition count
     * @type {number}
     * @public
     */
    partitionCount: uint32;
    /**
     * Container id
     * @type {bigint}
     * @public
     */
    containerId: bigint;
    /**
     * Encryption key guid
     * @type {number}
     * @public
     */
    encryptionKeyGuid: FGuid;
    /**
     * Container flags
     * @type {EIoContainerFlags}
     * @public
     */
    containerFlags: EIoContainerFlags;
    /**
     * Reserved3
     * @type {number}
     * @public
     */
    reserved3: uint8;
    /**
     * Reserved4
     * @type {number}
     * @public
     */
    reserved4: uint16;
    /**
     * Reserved5
     * @type {number}
     * @public
     */
    reserved5: uint32;
    /**
     * Partition size
     * @type {bigint}
     * @public
     */
    partitionSize: uint64;
    /**
     * Reserved6
     * @type {Array<bigint>}
     * @public
     */
    reserved6: bigint[];
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates toc magic
     * @returns {Buffer} Magic
     * @public
     */
    makeMagic(): void;
    /**
     * Checks magic
     * @returns {boolean} Result
     * @public
     */
    checkMagic(): boolean;
}
/**
 * Combined offset and length
 */
export declare class FIoOffsetAndLength {
    /**
     * We use 5 bytes for offset and size, this is enough to represent
     * an offset and size of 1PB
     * @type {Buffer}
     * @public
     */
    offsetAndLength: Buffer;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar?: FArchive);
    /**
     * Offset
     * @type {bigint}
     * @public
     */
    get offset(): uint64;
    /**
     * Length
     * @type {bigint}
     * @public
     */
    get length(): uint64;
}
/**
 * FIoStoreTocEntryMetaFlags
 * @enum
 */
export declare enum FIoStoreTocEntryMetaFlags {
    None = 0,
    Compressed = 1,
    MemoryMapped = 2
}
/**
 * TOC entry meta data
 */
export declare class FIoStoreTocEntryMeta {
    /**
     * Chunk hash
     * @type {FIoChunkHash}
     * @public
     */
    chunkHash: FIoChunkHash;
    /**
     * Flags
     * @type {FIoStoreTocEntryMetaFlags}
     * @public
     */
    flags: FIoStoreTocEntryMetaFlags;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * Compression block entry
 */
export declare class FIoStoreTocCompressedBlockEntry {
    /**
     * OffsetBits
     * @type {number}
     * @public
     * @static
     */
    static OffsetBits: number;
    /**
     * OffsetMask
     * @type {bigint}
     * @public
     * @static
     */
    static OffsetMask: bigint;
    /**
     * SizeBits
     * @type {number}
     * @public
     * @static
     */
    static SizeBits: number;
    /**
     * SizeMask
     * @type {number}
     * @public
     * @static
     */
    static SizeMask: number;
    /**
     * SizeShift
     * @type {number}
     * @public
     * @static
     */
    static SizeShift: number;
    /**
     * Data
     * 5 bytes offset, 3 bytes for size / uncompressed size and 1 byte for compression method -> Buffer size
     * @type {Buffer}
     * @public
     */
    data: Buffer;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Offset
     * @type {bigint}
     * @public
     */
    get offset(): uint64;
    /**
     * Compressed size
     * @type {number}
     * @public
     */
    get compressedSize(): uint32;
    /**
     * Uncompressed size
     * @type {number}
     * @public
     */
    get uncompressedSize(): uint32;
    /**
     * Compression method index
     * @type {number}
     * @public
     */
    get compressionMethodIndex(): uint8;
}
/**
 * TOC resource read options
 * @enum
 */
export declare enum EIoStoreTocReadOptions {
    Default = 0,
    ReadDirectoryIndex = 1,
    ReadTocMeta = 2,
    ReadAll = 3
}
/**
 * Container TOC data
 */
export declare class FIoStoreTocResource {
    /**
     * CompressionMethodNameLen
     * @type {number}
     * @public
     * @static
     */
    static CompressionMethodNameLen: number;
    /**
     * Header
     * @type {FIoStoreTocHeader}
     * @public
     */
    header: FIoStoreTocHeader;
    /**
     * chunkIds
     * @type {Array<FIoChunkId>}
     * @public
     */
    chunkIds: FIoChunkId[];
    /**
     * chunkOffsetLengths
     * @type {Array<FIoOffsetAndLength>}
     * @public
     */
    chunkOffsetLengths: FIoOffsetAndLength[];
    /**
     * compressionBlocks
     * @type {Array<FIoStoreTocCompressedBlockEntry>}
     * @public
     */
    compressionBlocks: FIoStoreTocCompressedBlockEntry[];
    /**
     * compressionMethods
     * @type {Array<string>}
     * @public
     */
    compressionMethods: string[];
    /**
     * chunkBlockSignatures
     * @type {Array<Buffer>}
     * @public
     */
    chunkBlockSignatures: Buffer[];
    /**
     * chunkMetas
     * @type {Array<FIoStoreTocEntryMeta>}
     * @public
     */
    chunkMetas: FIoStoreTocEntryMeta[];
    /**
     * directoryIndexBuffer
     * @type {Array<Buffer>}
     * @public
     */
    directoryIndexBuffer: Buffer;
    /**
     * chunkIdToIndex (sort of: Collection<string, number>)
     * @type {object}
     * @public
     */
    chunkIdToIndex: {};
    /**
     * Reads a toc buffer
     * @param {FArchive} tocBuffer Toc buffer to read
     * @param {EIoStoreTocReadOptions} readOptions Config for reading
     * @returns {void}
     * @public
     */
    read(tocBuffer: FArchive, readOptions: EIoStoreTocReadOptions): void;
    /**
     * getTocEntryIndex
     * @param {FIoChunkId} chunkId Chunk ID
     * @returns {number} Index
     * @public
     */
    getTocEntryIndex(chunkId: FIoChunkId): any;
    /**
     * getOffsetAndLength
     * @param {FIoChunkId} chunkId Chunk ID
     * @returns {FIoOffsetAndLength} Offset and length
     * @public
     */
    getOffsetAndLength(chunkId: FIoChunkId): FIoOffsetAndLength;
}
/**
 * FIoStoreReader
 */
export declare class FIoStoreReader {
    /**
     * Toc
     * @type {FIoStoreTocResource}
     * @private
     */
    private toc;
    /**
     * decryptionKey
     * @type {?Buffer}
     * @private
     */
    private decryptionKey?;
    /**
     * containerFileHandles
     * @type {Array<number>}
     * @private
     */
    private containerFileHandles;
    /**
     * directoryIndexReader
     * @type {Lazy<FIoDirectoryIndexReader>}
     * @public
     */
    directoryIndexReader: Lazy<FIoDirectoryIndexReader>;
    /**
     * Environment
     * @type {FIoStoreEnvironment}
     * @public
     */
    environment: FIoStoreEnvironment;
    /**
     * Initializes this
     * @param {FIoStoreEnvironment} environment Environment to use
     * @param {UnrealMap<FGuid, Buffer>} decryptionKeys Decryption keys to use
     * @returns {void}
     * @public
     */
    initialize(environment: FIoStoreEnvironment, decryptionKeys: UnrealMap<FGuid, Buffer>): void;
    /**
     * Container ID
     * @type {bigint}
     * @public
     */
    get containerId(): bigint;
    /**
     * Container Flags
     * @type {EIoContainerFlags}
     * @public
     */
    get containerFlags(): EIoContainerFlags;
    /**
     * Encryption key guid
     * @type {FGuid}
     * @public
     */
    get encryptionKeyGuid(): FGuid;
    /**
     * Reads chunk id
     * @param {FIoChunkId} chunkId ID to read
     * @returns {Buffer} Read bytes
     * @public
     */
    read(chunkId: FIoChunkId): Buffer;
    /**
     * Gets files
     * @returns {Array<GameFile>} Files
     * @public
     */
    getFiles(): GameFile[];
}
