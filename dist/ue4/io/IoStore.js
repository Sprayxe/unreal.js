"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIoStoreReader = exports.FIoStoreTocResource = exports.EIoStoreTocReadOptions = exports.FIoStoreTocCompressedBlockEntry = exports.FIoStoreTocEntryMeta = exports.FIoStoreTocEntryMetaFlags = exports.FIoOffsetAndLength = exports.FIoStoreTocHeader = exports.EIoStoreTocVersion = void 0;
const Guid_1 = require("../objects/core/misc/Guid");
const IoContainerId_1 = require("./IoContainerId");
const fs = __importStar(require("fs"));
const IoDispatcher_1 = require("./IoDispatcher");
const FByteArchive_1 = require("../reader/FByteArchive");
const Aes_1 = require("../../encryption/aes/Aes");
const Compression_1 = require("../../compression/Compression");
const Utils_1 = require("../../util/Utils");
const GameFile_1 = require("../pak/GameFile");
const IoDirectoryIndex_1 = require("./IoDirectoryIndex");
const Lazy_1 = require("../../util/Lazy");
/**
 * I/O store container format version
 * @enum
 */
var EIoStoreTocVersion;
(function (EIoStoreTocVersion) {
    EIoStoreTocVersion[EIoStoreTocVersion["Invalid"] = 0] = "Invalid";
    EIoStoreTocVersion[EIoStoreTocVersion["Initial"] = 1] = "Initial";
    EIoStoreTocVersion[EIoStoreTocVersion["DirectoryIndex"] = 2] = "DirectoryIndex";
    EIoStoreTocVersion[EIoStoreTocVersion["PartitionSize"] = 3] = "PartitionSize";
    EIoStoreTocVersion[EIoStoreTocVersion["LatestPlusOne"] = 4] = "LatestPlusOne";
    EIoStoreTocVersion[EIoStoreTocVersion["Latest"] = 3] = "Latest";
})(EIoStoreTocVersion = exports.EIoStoreTocVersion || (exports.EIoStoreTocVersion = {}));
/**
 * I/O Store TOC header
 */
class FIoStoreTocHeader {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * Toc magic
         * @type {Buffer}
         * @public
         */
        this.tocMagic = Buffer.alloc(16);
        /**
         * Reserved6
         * @type {Array<bigint>}
         * @public
         */
        this.reserved6 = new Array(6);
        Ar.readToBuffer(this.tocMagic);
        if (!this.checkMagic())
            throw new Error("TOC header magic mismatch");
        this.version = Ar.readUInt8();
        this.reserved0 = Ar.readUInt8();
        this.reserved1 = Ar.readUInt16();
        this.tocHeaderSize = Ar.readUInt32();
        this.tocEntryCount = Ar.readUInt32();
        this.tocCompressedBlockEntryCount = Ar.readUInt32();
        this.tocCompressedBlockEntrySize = Ar.readUInt32();
        this.compressionMethodNameCount = Ar.readUInt32();
        this.compressionMethodNameLength = Ar.readUInt32();
        this.compressionBlockSize = Ar.readUInt32();
        this.directoryIndexSize = Ar.readUInt32();
        this.partitionCount = Ar.readUInt32();
        this.containerId = IoContainerId_1.createFIoContainerId(Ar);
        this.encryptionKeyGuid = new Guid_1.FGuid(Ar);
        this.containerFlags = Ar.readUInt8();
        this.reserved3 = Ar.readUInt8();
        this.reserved4 = Ar.readUInt16();
        this.reserved5 = Ar.readUInt32();
        this.partitionSize = Ar.readUInt64();
        for (let i = 0; i < this.reserved6.length; i++) {
            this.reserved6[i] = Ar.readUInt64();
        }
    }
    /**
     * Creates toc magic
     * @returns {Buffer} Magic
     * @public
     */
    makeMagic() {
        this.tocMagic = Buffer.from(FIoStoreTocHeader.TocMagicImg);
    }
    /**
     * Checks magic
     * @returns {boolean} Result
     * @public
     */
    checkMagic() {
        return this.tocMagic.equals(Buffer.from(FIoStoreTocHeader.TocMagicImg));
    }
}
exports.FIoStoreTocHeader = FIoStoreTocHeader;
/**
 * Toc magic template
 * @type {string}
 * @public
 * @static
 */
FIoStoreTocHeader.TocMagicImg = "-==--==--==--==-";
/**
 * Combined offset and length
 */
class FIoOffsetAndLength {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar = null) {
        this.offsetAndLength = Buffer.alloc(5 + 5);
        if (Ar)
            Ar.readToBuffer(this.offsetAndLength);
    }
    /**
     * Offset
     * @type {bigint}
     * @public
     */
    get offset() {
        return BigInt(this.offsetAndLength[4])
            | BigInt(this.offsetAndLength[3]) << 8n
            | BigInt(this.offsetAndLength[2]) << 16n
            | BigInt(this.offsetAndLength[1]) << 24n
            | BigInt(this.offsetAndLength[0]) << 32n;
    }
    /**
     * Length
     * @type {bigint}
     * @public
     */
    get length() {
        return BigInt(this.offsetAndLength[9])
            | BigInt(this.offsetAndLength[8]) << 8n
            | BigInt(this.offsetAndLength[7]) << 16n
            | BigInt(this.offsetAndLength[6]) << 24n
            | BigInt(this.offsetAndLength[5]) << 32n;
    }
}
exports.FIoOffsetAndLength = FIoOffsetAndLength;
/**
 * FIoStoreTocEntryMetaFlags
 * @enum
 */
var FIoStoreTocEntryMetaFlags;
(function (FIoStoreTocEntryMetaFlags) {
    FIoStoreTocEntryMetaFlags[FIoStoreTocEntryMetaFlags["None"] = 0] = "None";
    FIoStoreTocEntryMetaFlags[FIoStoreTocEntryMetaFlags["Compressed"] = 1] = "Compressed";
    FIoStoreTocEntryMetaFlags[FIoStoreTocEntryMetaFlags["MemoryMapped"] = 2] = "MemoryMapped";
})(FIoStoreTocEntryMetaFlags = exports.FIoStoreTocEntryMetaFlags || (exports.FIoStoreTocEntryMetaFlags = {}));
/**
 * TOC entry meta data
 */
class FIoStoreTocEntryMeta {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.chunkHash = new IoDispatcher_1.FIoChunkHash(Ar);
        this.flags = Ar.readUInt8();
    }
}
exports.FIoStoreTocEntryMeta = FIoStoreTocEntryMeta;
/**
 * Compression block entry
 */
class FIoStoreTocCompressedBlockEntry {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * Data
         * 5 bytes offset, 3 bytes for size / uncompressed size and 1 byte for compression method -> Buffer size
         * @type {Buffer}
         * @public
         */
        this.data = Buffer.alloc(5 + 3 + 3 + 1);
        Ar.readToBuffer(this.data);
    }
    /**
     * Offset
     * @type {bigint}
     * @public
     */
    get offset() {
        const offset = this.data.readBigUInt64LE();
        return offset & FIoStoreTocCompressedBlockEntry.OffsetMask;
    }
    /**
     * Compressed size
     * @type {number}
     * @public
     */
    get compressedSize() {
        const size = this.data.readUInt32LE(4);
        return size >> FIoStoreTocCompressedBlockEntry.SizeShift;
    }
    /**
     * Uncompressed size
     * @type {number}
     * @public
     */
    get uncompressedSize() {
        const size = this.data.readUInt32LE(2 * 4);
        return size & FIoStoreTocCompressedBlockEntry.SizeMask;
    }
    /**
     * Compression method index
     * @type {number}
     * @public
     */
    get compressionMethodIndex() {
        const index = this.data.readUInt32LE(2 * 4);
        return index >> FIoStoreTocCompressedBlockEntry.SizeBits;
    }
}
exports.FIoStoreTocCompressedBlockEntry = FIoStoreTocCompressedBlockEntry;
/**
 * OffsetBits
 * @type {number}
 * @public
 * @static
 */
FIoStoreTocCompressedBlockEntry.OffsetBits = 40;
/**
 * OffsetMask
 * @type {bigint}
 * @public
 * @static
 */
FIoStoreTocCompressedBlockEntry.OffsetMask = (1n << BigInt(FIoStoreTocCompressedBlockEntry.OffsetBits)) - 1n;
/**
 * SizeBits
 * @type {number}
 * @public
 * @static
 */
FIoStoreTocCompressedBlockEntry.SizeBits = 24;
/**
 * SizeMask
 * @type {number}
 * @public
 * @static
 */
FIoStoreTocCompressedBlockEntry.SizeMask = (1 << FIoStoreTocCompressedBlockEntry.SizeBits) - 1;
/**
 * SizeShift
 * @type {number}
 * @public
 * @static
 */
FIoStoreTocCompressedBlockEntry.SizeShift = 8;
/**
 * TOC resource read options
 * @enum
 */
var EIoStoreTocReadOptions;
(function (EIoStoreTocReadOptions) {
    EIoStoreTocReadOptions[EIoStoreTocReadOptions["Default"] = 0] = "Default";
    EIoStoreTocReadOptions[EIoStoreTocReadOptions["ReadDirectoryIndex"] = 1] = "ReadDirectoryIndex";
    EIoStoreTocReadOptions[EIoStoreTocReadOptions["ReadTocMeta"] = 2] = "ReadTocMeta";
    EIoStoreTocReadOptions[EIoStoreTocReadOptions["ReadAll"] = 3] = "ReadAll";
})(EIoStoreTocReadOptions = exports.EIoStoreTocReadOptions || (exports.EIoStoreTocReadOptions = {}));
/**
 * Container TOC data
 */
class FIoStoreTocResource {
    constructor() {
        /**
         * chunkIdToIndex (sort of: Collection<string, number>)
         * @type {object}
         * @public
         */
        this.chunkIdToIndex = {};
    }
    /**
     * Reads a toc buffer
     * @param {FArchive} tocBuffer Toc buffer to read
     * @param {EIoStoreTocReadOptions} readOptions Config for reading
     * @returns {void}
     * @public
     */
    read(tocBuffer, readOptions) {
        // Header
        this.header = new FIoStoreTocHeader(tocBuffer);
        if (this.header.tocHeaderSize !== 144 /*sizeof(FIoStoreTocHeader)*/) {
            throw new Error("TOC header size mismatch"); //throw new FIoStatusException(EIoErrorCode.CorruptToc, "TOC header size mismatch", tocBuffer)
        }
        if (this.header.tocCompressedBlockEntrySize !== 12 /*sizeof(FIoStoreTocCompressedBlockEntry)*/) {
            throw new Error("TOC compressed block entry size mismatch"); //throw new FIoStatusException(EIoErrorCode.CorruptToc, "TOC compressed block entry size mismatch", tocBuffer)
        }
        if (this.header.version < EIoStoreTocVersion.DirectoryIndex) {
            throw new Error("Outdated TOC header version"); //throw new FIoStatusException(EIoErrorCode.CorruptToc, "Outdated TOC header version", tocBuffer)
        }
        if (this.header.version < EIoStoreTocVersion.PartitionSize) {
            this.header.partitionCount = 1;
            this.header.partitionSize = 0xfffffffffffffffn;
        }
        // Chunk IDs
        this.chunkIds = [];
        for (let i = 0; i < this.header.tocEntryCount; i++) {
            const id = new IoDispatcher_1.FIoChunkId(tocBuffer);
            this.chunkIds[i] = id;
            this.chunkIdToIndex[id.id.toString("base64")] = i;
        }
        // Chunk offsets
        this.chunkOffsetLengths = [];
        for (let i = 0; i < this.header.tocEntryCount; i++) {
            this.chunkOffsetLengths[i] = new FIoOffsetAndLength(tocBuffer);
        }
        // Compression blocks
        this.compressionBlocks = [];
        for (let i = 0; i < this.header.tocCompressedBlockEntryCount; i++) {
            this.compressionBlocks[i] = new FIoStoreTocCompressedBlockEntry(tocBuffer);
        }
        // Compression methods
        this.compressionMethods = [];
        this.compressionMethods[0] = "None";
        for (let i = 0; i < this.header.compressionMethodNameCount; i++) {
            const compressionMethodName = tocBuffer.readBuffer(this.header.compressionMethodNameLength);
            let length = 0;
            while (compressionMethodName[length] !== 0) {
                ++length;
            }
            this.compressionMethods[1 + i] = (compressionMethodName.toString("utf-8", 0, length));
        }
        // Chunk block signatures
        if (this.header.containerFlags & IoDispatcher_1.EIoContainerFlags.Signed) {
            const hashSize = tocBuffer.readInt32();
            tocBuffer.pos += hashSize; // actually: const tocSignature = tocBuffer.readBuffer(hashSize)
            tocBuffer.pos += hashSize; // actually: const blockSignature = tocBuffer.readBuffer(hashSize)
            /*this.chunkBlockSignatures = new Array(this.header.tocCompressedBlockEntryCount)
            for (let i = 0; i < this.header.tocCompressedBlockEntryCount; i++) {
                this.chunkBlockSignatures[i] = tocBuffer.readBuffer(20)
            }*/
            tocBuffer.pos += this.header.tocCompressedBlockEntryCount * 20;
            // You could verify hashes here but nah
        } /* else {
            this.chunkBlockSignatures = []
        }*/
        // Directory index
        if (readOptions & EIoStoreTocReadOptions.ReadDirectoryIndex
            && this.header.containerFlags & IoDispatcher_1.EIoContainerFlags.Indexed
            && this.header.directoryIndexSize > 0) {
            this.directoryIndexBuffer = tocBuffer.readBuffer(this.header.directoryIndexSize);
        }
        else {
            tocBuffer.pos += this.header.directoryIndexSize;
        }
        // Meta
        if ((readOptions & EIoStoreTocReadOptions.ReadTocMeta)) {
            this.chunkMetas = new Array(this.header.tocEntryCount);
            for (let i = 0; i < this.header.tocEntryCount; i++) {
                this.chunkMetas[i] = new FIoStoreTocEntryMeta(tocBuffer);
            }
        }
        else {
            this.chunkMetas = [];
        }
    }
    /**
     * getTocEntryIndex
     * @param {FIoChunkId} chunkId Chunk ID
     * @returns {number} Index
     * @public
     */
    getTocEntryIndex(chunkId) {
        return this.chunkIdToIndex[chunkId.id.toString("base64")] || -1;
    }
    /**
     * getOffsetAndLength
     * @param {FIoChunkId} chunkId Chunk ID
     * @returns {FIoOffsetAndLength} Offset and length
     * @public
     */
    getOffsetAndLength(chunkId) {
        const index = this.chunkIdToIndex[chunkId.id.toString("base64")];
        return index != null ? this.chunkOffsetLengths[index] : null;
    }
}
exports.FIoStoreTocResource = FIoStoreTocResource;
/**
 * CompressionMethodNameLen
 * @type {number}
 * @public
 * @static
 */
FIoStoreTocResource.CompressionMethodNameLen = 32;
/**
 * FIoStoreReader
 */
class FIoStoreReader {
    constructor() {
        /**
         * Toc
         * @type {FIoStoreTocResource}
         * @private
         */
        this.toc = new FIoStoreTocResource();
        /**
         * decryptionKey
         * @type {?Buffer}
         * @private
         */
        this.decryptionKey = null;
        /**
         * directoryIndexReader
         * @type {Lazy<FIoDirectoryIndexReader>}
         * @public
         */
        this.directoryIndexReader = new Lazy_1.Lazy(() => {
            const out = new IoDirectoryIndex_1.FIoDirectoryIndexReader(this.toc.directoryIndexBuffer, this.decryptionKey);
            this.toc.directoryIndexBuffer = null;
            return out;
        });
    }
    /**
     * Initializes this
     * @param {FIoStoreEnvironment} environment Environment to use
     * @param {UnrealMap<FGuid, Buffer>} decryptionKeys Decryption keys to use
     * @returns {void}
     * @public
     */
    initialize(environment, decryptionKeys) {
        this.environment = environment;
        const tocFilePath = this.environment.path + ".utoc";
        this.toc.read(new FByteArchive_1.FByteArchive(fs.readFileSync(tocFilePath)), EIoStoreTocReadOptions.ReadAll);
        this.containerFileHandles = new Array(this.toc.header.partitionCount);
        for (let partitionIndex = 0; partitionIndex < this.toc.header.partitionCount; ++partitionIndex) {
            let containerFilePath = "";
            containerFilePath += this.environment.path;
            if (partitionIndex > 0) {
                containerFilePath += `_s${partitionIndex}`;
            }
            containerFilePath += ".ucas";
            try {
                this.containerFileHandles[partitionIndex] = fs.openSync(containerFilePath, "rs");
            }
            catch (err) {
                throw new Error(`Failed to open IoStore container file '${containerFilePath}'`);
            }
        }
        if (this.toc.header.containerFlags & IoDispatcher_1.EIoContainerFlags.Encrypted) {
            const findKey = decryptionKeys.get(this.toc.header.encryptionKeyGuid);
            if (!findKey) {
                throw new Error(`Missing decryption key for IoStore container file '${environment.path}'`);
            }
            this.decryptionKey = findKey;
        }
        console.log("IoStore \"%s\": %d %s, version %d", environment.path, this.toc.header.tocEntryCount, this.decryptionKey ? "encrypted chunks" : "chunks", this.toc.header.version);
    }
    /**
     * Container ID
     * @type {bigint}
     * @public
     */
    get containerId() {
        return this.toc.header.containerId;
    }
    /**
     * Container Flags
     * @type {EIoContainerFlags}
     * @public
     */
    get containerFlags() {
        return this.toc.header.containerFlags;
    }
    /**
     * Encryption key guid
     * @type {FGuid}
     * @public
     */
    get encryptionKeyGuid() {
        return this.toc.header.encryptionKeyGuid;
    }
    /**
     * Reads chunk id
     * @param {FIoChunkId} chunkId ID to read
     * @returns {Buffer} Read bytes
     * @public
     */
    read(chunkId /*, options: FIoReadOptions = FIoReadOptions()*/) {
        const offsetAndLength = this.toc.getOffsetAndLength(chunkId);
        if (!offsetAndLength)
            throw new Error("Unknown chunk ID");
        const _offset = offsetAndLength.offset;
        const _length = offsetAndLength.length;
        const offset = Number(_offset);
        const length = Number(_length);
        const threadBuffers = new FThreadBuffers();
        const compressionBlockSize = this.toc.header.compressionBlockSize;
        const firstBlockIndex = Math.floor(offset / compressionBlockSize);
        const lastBlockIndex = Math.floor((Utils_1.Utils.alignBigInt(_offset + _length, BigInt(compressionBlockSize)) - 1) / compressionBlockSize);
        let offsetInBlock = offset % compressionBlockSize;
        const dst = Buffer.alloc(length);
        let dstOff = 0;
        let remainingSize = length;
        let blockIndex = firstBlockIndex; // 'while()' seems to be faster than: 'for (let blockIndex = firstBlockIndex; blockIndex <= lastBlockIndex; ++blockIndex)'
        while (blockIndex <= lastBlockIndex) {
            const compressionBlock = this.toc.compressionBlocks[blockIndex];
            const rawSize = Utils_1.Utils.align(compressionBlock.compressedSize, Aes_1.Aes.BLOCK_SIZE);
            if (threadBuffers.compressedBuffer == null || threadBuffers.compressedBuffer.length < rawSize) {
                threadBuffers.compressedBuffer = Buffer.alloc(rawSize);
            }
            const uncompressedSize = compressionBlock.uncompressedSize;
            if (threadBuffers.uncompressedBuffer == null || threadBuffers.uncompressedBuffer.length < uncompressedSize) {
                threadBuffers.uncompressedBuffer = Buffer.alloc(uncompressedSize);
            }
            const partitionIndex = Math.floor(Number(compressionBlock.offset / this.toc.header.partitionSize));
            const partitionOffset = Number(compressionBlock.offset % this.toc.header.partitionSize);
            const fileHandle = this.containerFileHandles[partitionIndex];
            fs.readSync(fileHandle, threadBuffers.compressedBuffer, 0, rawSize, partitionOffset);
            if (this.toc.header.containerFlags & IoDispatcher_1.EIoContainerFlags.Encrypted) {
                threadBuffers.compressedBuffer = Aes_1.Aes.decrypt(threadBuffers.compressedBuffer, this.decryptionKey);
            }
            let src;
            if (compressionBlock.compressionMethodIndex === 0) {
                src = threadBuffers.compressedBuffer;
            }
            else {
                const compressionMethod = this.toc.compressionMethods[compressionBlock.compressionMethodIndex];
                try {
                    Compression_1.Compression.uncompress(compressionMethod, threadBuffers.uncompressedBuffer, 0, uncompressedSize, threadBuffers.compressedBuffer, 0, compressionBlock.compressedSize);
                    src = threadBuffers.uncompressedBuffer;
                }
                catch (e) {
                    throw new Error("Failed uncompressing block");
                }
            }
            const sizeInBlock = Math.min(compressionBlockSize - offsetInBlock, remainingSize);
            src.copy(dst, dstOff, offsetInBlock, offsetInBlock + sizeInBlock);
            offsetInBlock = 0;
            remainingSize -= sizeInBlock;
            dstOff += sizeInBlock;
            ++blockIndex;
        }
        return dst;
    }
    /**
     * Gets files
     * @returns {Array<GameFile>} Files
     * @public
     */
    getFiles() {
        const files = new Array();
        this.directoryIndexReader.value.iterateDirectoryIndex(IoDispatcher_1.FIoDirectoryIndexHandle.rootDirectory(), "", (filename, tocEntryIndex) => {
            const chunkId = this.toc.chunkIds[tocEntryIndex];
            if (chunkId.chunkType === IoDispatcher_1.EIoChunkType.ExportBundleData) {
                files.push(GameFile_1.GameFile.createFromIoStoreFile(filename, this.environment.path, new FByteArchive_1.FByteArchive(this.toc.chunkIds[tocEntryIndex].id).readUInt64()));
            }
            return true;
        });
        return files;
    }
}
exports.FIoStoreReader = FIoStoreReader;
/**
 * FThreadBuffers
 */
class FThreadBuffers {
}
