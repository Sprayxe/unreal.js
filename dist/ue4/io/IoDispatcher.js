"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIoDirectoryIndexHandle = exports.FOnContainerMountedListener = exports.FIoDispatcherMountedContainer = exports.EIoContainerFlags = exports.createIoChunkId = exports.EIoChunkType = exports.FIoChunkId = exports.FIoChunkHash = exports.FIoStoreEnvironment = void 0;
/**
 * Helper used to manage creation of I/O store file handles etc
 */
class FIoStoreEnvironment {
    /**
     * Creates an instance using values
     * @param {string} path Path of environment
     * @param {number} order Order
     * @constructor
     * @public
     */
    constructor(path, order = 0) {
        this.path = path;
        this.order = order;
    }
}
exports.FIoStoreEnvironment = FIoStoreEnvironment;
/**
 * Chunk hash
 */
class FIoChunkHash {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * Hash
         * @type {Buffer}
         * @public
         */
        this.hash = Buffer.alloc(32);
        Ar.readToBuffer(this.hash);
    }
}
exports.FIoChunkHash = FIoChunkHash;
/**
 * Identifier to a chunk of data
 */
class FIoChunkId {
    /**
     * Creates an instance using an UE4 Reader or empty
     * @param {?FArchive} Ar UE4 Reader to use or null
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * ID
         * @type {Buffer}
         * @public
         */
        this.id = Buffer.alloc(12);
        if (Ar)
            Ar.readToBuffer(this.id);
    }
    /**
     * Type of chunk
     * @type {number}
     * @public
     */
    get chunkType() {
        return this.id[11];
    }
    /**
     * Whether this equals other object
     * @param {FIoChunkId} other Other chunk id
     * @returns {boolean} Result
     * @public
     */
    equals(other) {
        return this.id?.equals(other.id) ?? false;
    }
}
exports.FIoChunkId = FIoChunkId;
/**
 * Addressable chunk types
 * @enum
 */
var EIoChunkType;
(function (EIoChunkType) {
    EIoChunkType[EIoChunkType["Invalid"] = 0] = "Invalid";
    EIoChunkType[EIoChunkType["InstallManifest"] = 1] = "InstallManifest";
    EIoChunkType[EIoChunkType["ExportBundleData"] = 2] = "ExportBundleData";
    EIoChunkType[EIoChunkType["BulkData"] = 3] = "BulkData";
    EIoChunkType[EIoChunkType["OptionalBulkData"] = 4] = "OptionalBulkData";
    EIoChunkType[EIoChunkType["MemoryMappedBulkData"] = 5] = "MemoryMappedBulkData";
    EIoChunkType[EIoChunkType["LoaderGlobalMeta"] = 6] = "LoaderGlobalMeta";
    EIoChunkType[EIoChunkType["LoaderInitialLoadMeta"] = 7] = "LoaderInitialLoadMeta";
    EIoChunkType[EIoChunkType["LoaderGlobalNames"] = 8] = "LoaderGlobalNames";
    EIoChunkType[EIoChunkType["LoaderGlobalNameHashes"] = 9] = "LoaderGlobalNameHashes";
    EIoChunkType[EIoChunkType["ContainerHeader"] = 10] = "ContainerHeader";
})(EIoChunkType = exports.EIoChunkType || (exports.EIoChunkType = {}));
/**
 * Creates a chunk identifier
 * @param {bigint} chunkId ID of chunk
 * @param {number} chunkIndex Index of chunk
 * @param {EIoChunkType} ioChunkType Type of chunk
 * @returns {Buffer} Chunk ID
 * @public
 */
function createIoChunkId(chunkId, chunkIndex, ioChunkType) {
    const ioChunkId = new FIoChunkId();
    ioChunkId.id.writeBigUInt64LE(chunkId, 0);
    ioChunkId.id.writeUInt16LE(chunkIndex, 8);
    ioChunkId.id.writeUInt8(ioChunkType, 11);
    return ioChunkId;
}
exports.createIoChunkId = createIoChunkId;
/**
 * EIoContainerFlags
 * @enum
 */
var EIoContainerFlags;
(function (EIoContainerFlags) {
    EIoContainerFlags[EIoContainerFlags["None"] = 0] = "None";
    EIoContainerFlags[EIoContainerFlags["Compressed"] = 1] = "Compressed";
    EIoContainerFlags[EIoContainerFlags["Encrypted"] = 2] = "Encrypted";
    EIoContainerFlags[EIoContainerFlags["Signed"] = 4] = "Signed";
    EIoContainerFlags[EIoContainerFlags["Indexed"] = 8] = "Indexed";
})(EIoContainerFlags = exports.EIoContainerFlags || (exports.EIoContainerFlags = {}));
//////////////////////////////////////////////////////////////////////////
/**
 * FIoDispatcherMountedContainer
 */
class FIoDispatcherMountedContainer {
    /**
     * Creates instance using values
     * @param {FIoStoreEnvironment} environment Environment
     * @param {bigint} containerId Container ID
     * @constructor
     * @public
     */
    constructor(environment, containerId) {
        this.environment = environment;
        this.containerId = containerId;
    }
}
exports.FIoDispatcherMountedContainer = FIoDispatcherMountedContainer;
/**
 * FOnContainerMountedListener
 * @abstract
 */
class FOnContainerMountedListener {
}
exports.FOnContainerMountedListener = FOnContainerMountedListener;
/**
 * FIoDirectoryIndexHandle
 */
class FIoDirectoryIndexHandle {
    /**
     * Creates an instance using handle value
     * @param {number} handle Handle value
     * @constructor
     * @private
     */
    constructor(handle) {
        this.handle = handle;
    }
    /**
     * Creates instance from index
     * @param {number} index Index
     * @returns {FIoDirectoryIndexHandle} Instance
     * @public
     */
    static fromIndex(index) {
        return new FIoDirectoryIndexHandle(index);
    }
    /**
     * Creates instance using root value
     * @returns {FIoDirectoryIndexHandle} Instance
     * @see {ROOT_HANDLE}
     * @public
     */
    static rootDirectory() {
        return new FIoDirectoryIndexHandle(FIoDirectoryIndexHandle.ROOT_HANDLE);
    }
    /**
     * Creates instance using invalid value
     * @returns {FIoDirectoryIndexHandle} Instance
     * @see {INVALID_HANDLE}
     * @public
     */
    static invalid() {
        return new FIoDirectoryIndexHandle(FIoDirectoryIndexHandle.INVALID_HANDLE);
    }
    /**
     * Whether valid
     * @returns {boolean} Result
     * @see {INVALID_HANDLE}
     * @public
     */
    isValid() {
        return this.handle !== FIoDirectoryIndexHandle.INVALID_HANDLE;
    }
    /**
     * Whether equals other object
     * @param {?any} other Other object to check
     * @returns {boolean} Result
     * @public
     */
    equals(other) {
        if (this === other)
            return true;
        if (!(other instanceof FIoDirectoryIndexHandle))
            return false;
        return this.handle === other.handle;
    }
    /**
     * Returns index value
     * @returns {number} Index
     * @public
     */
    toIndex() {
        return this.handle;
    }
}
exports.FIoDirectoryIndexHandle = FIoDirectoryIndexHandle;
/**
 * INVALID_HANDLE
 * @type {number}
 * @public
 * @static
 */
FIoDirectoryIndexHandle.INVALID_HANDLE = ~0;
/**
 * ROOT_HANDLE
 * @type {number}
 * @public
 * @static
 */
FIoDirectoryIndexHandle.ROOT_HANDLE = 0;
