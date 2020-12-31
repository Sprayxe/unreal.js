const { UtocError } = require("../../errors/Exceptions");
const FArchive = require("../reader/FArchive");

const IO_CONTAINER_FLAG_COMPRESSED = 0x1;
const IO_CONTAINER_FLAG_ENCRYPTED = 0x2;
const IO_CONTAINER_FLAG_SIGNED = 0x3;
const IO_CONTAINER_FLAG_INDEXED = 0x4;

/**
 * - I/O Store TOC header
 * @class
 */
class FIoStoreTocHeader {
    /**
     * - I/O Store TOC header
     * @param {FArchive} Ar 
     */
    constructor(Ar) {
        this.TOC_MAGIC_IMG = "-==--==--==--==-";
        this.tocMagic = 16;

        Ar.read(tocMagic);
        if (!this.checkMagic()) {
            throw new UtocError("UTOC Magic is invalid!")
        };

        this.tocHeaderSize = Ar.readInt32();
        this.tocEntryCount = Ar.readInt32();
        this.tocCompressedBlockEntryCount = Ar.readInt32();
        this.tocCompressedBlockEntrySize = Ar.readInt32();
        this.compressionMethodNameCount = Ar.readInt32();
        this.compressionMethodNameLength = Ar.readInt32();
        this.compressionBlockSize = Ar.readInt32();
        this.directoryIndexSize = Ar.readInt64();
        this.containerId = "FIoContainerId";
        this.encryptionKeyGuid = "FGuid";
        this.containerFlags = Ar.readInt32();
    };

    makeMagic() {
        this.tocMagic = Buffer.from(this.TOC_MAGIC_IMG);
    };

    checkMagic() {
        return this.tocMagic === Buffer.from(this.TOC_MAGIC_IMG);
    };
};
module.exports.FIoStoreTocHeader = FIoStoreTocHeader;


/**
 * - Combined offset and length
 * @class
 */

class FIoOffsetAndLength {
    /**
     * - Combined offset and lengt
     * @param {FArchive} Ar 
     */
    constructor(Ar = null) {
        this.offsetAndLength = Buffer.from(new ArrayBuffer(5 + 5));
        if (Ar) this.offsetAndLength =  Buffer.from(new ArrayBuffer(Ar.read(this.offsetAndLength.length)));
    };

    get offset() {
        const off = this.offsetAndLength;
        return  off[4] ||
                off[3] << 8 ||
                off[2] << 16 ||
                off[1] << 24 ||
                off[0] << 32;
    };

    setOffset(value) {
        this.offsetAndLength[0] = (value << 32);
        this.offsetAndLength[1] = (value << 24);
        this.offsetAndLength[2] = (value << 16);
        this.offsetAndLength[3] = (value << 8);
        this.offsetAndLength[4] = (value << 0);
    };


    get length() {
        const off = this.offsetAndLength;
        return  off[9] ||
                off[8] << 8 ||
                off[7] << 16 ||
                off[6] << 24 ||
                off[5] << 32;
    };

    setLength(value) {
        this.offsetAndLength[5] = (value << 32);
        this.offsetAndLength[6] = (value << 24);
        this.offsetAndLength[7] = (value << 16);
        this.offsetAndLength[8] = (value << 8);
        this.offsetAndLength[9] = (value << 0);
    };
};
module.exports.FIoOffsetAndLength = FIoOffsetAndLength;


const IO_STORE_TOC_ENTRY_META_FLAG_COMPRESSED = 1 << 0;
const IO_STORE_TOC_ENTRY_META_FLAG_MEMORY_MAPPED = 1 << 1;

/**
 * - Chunk hash
 * @class
 */
class FIoChunkHash {
    /**
     * @param {FArchive} Ar 
     */
    constructor(Ar) {
        this.hash = Ar.read(32);
    };
};
module.exports = FIoChunkHash;

/**
 * - TOC entry meta data
 * @class
 */
class FIoStoreTocEntryMeta {
    /**
     * @param {FArchive} Ar 
     */
    constructor(Ar) {
        this.chunkHash = new FIoChunkHash(Ar);
        this.flags = Ar.readUInt8();
    };
};
module.exports.FIoStoreTocEntryMeta =FIoStoreTocEntryMeta;

/**
 * - Compression block entry
 * @class
 */
class FIoStoreTocCompressedBlockEntry  {
    /**
     * @param {FArchive} Ar 
     */
    constructor(Ar) {
        this.OffsetBits = 40;
        this.OffsetMask = (1 << this.OffsetBits) - 1;
        this.SizeBits = 24;
        this.SizeMask = (1 << this.SizeBits) - 1;
        this.SizeShift = 8;
        /* 5 bytes offset, 3 bytes for size / uncompressed size and 1 byte for compresseion method. */
        this.data = Ar.read(5 + 3 + 3 + 1);
    };

    get offset() {
        const offset = Buffer.from(this.data).byteOffset;
        return offset;
    };

    get compressedSize() {
        const buf = Buffer.from(this.data);
        buf.byteOffset = 1 * 4 /*+ 1 */;
        const size = buf.byteOffset;
        return size >> this.SizeShift;
    };

    get uncompressedSize() {
        const buf = Buffer.from(this.data);
        buf.byteOffset = 2 * 4 /*+ 2*/;
        const size = buf.byteOffset;
        return size;
    };

    get compressionMethodIndex() {
        const buf = Buffer.from(this.data);
        buf.byteOffset = 2 * 4 /*+ 2*/;
        const index = buf.byteOffset;
        return index >> this.SizeBits;
    };
};
module.exports = FIoStoreTocCompressedBlockEntry;

/**
 * - Toc store
 * @class
 */
class FIoStoreToc {
    constructor() {
        this.chunkIdToIndex = new Map();
        this.toc = new FIoStoreTocResource();
        /** @type {String[]} */
        this.fileToIndex = [];
        /** @type {Number[]} */
        this.fileTocEntryIndices = [];
        this.tocResource = this.toc;
    };

    initialize() {
        this.chunkIdToIndex.clear();
        this.toc.chunkIds.forEach((v, k) => {
            this.chunkIdToIndex.set(v, k)
        });
    };

    getTocEntryIndex(chunkId) {
        return this.chunkIdToIndex.get(chunkId);
    };

    getOffsetAndLength(chunkId) {
        const entry = this.chunkIdToIndex.get(chunkId);
        return this.toc.chunkOffsetLengths.get(entry);
    };
};
module.exports.FIoStoreToc = FIoStoreToc;

/**
 * - Helper used to manage creation of I/O store file handles etc
 * @class
 */
class FIoStoreEnvironment {
    /**
     * @param {String} path 
     * @param {Number} order 
     */
    constructor(path, order) {
        this.path = path;
        this.order = order;
    };
};
module.exports.FIoStoreEnvironment = FIoStoreEnvironment;

/**
 * - Main
 * @class
 */
class FIoStoreReaderImpl {
    constructor() {
        this.toc = new FIoStoreToc();
        this.decryptionKey = null;
        this.con
    }
}

