import { FArchive } from "../reader/FArchive";
import { int32, uint16 } from "../../Types";

/**
 * Helper used to manage creation of I/O store file handles etc
 */
export class FIoStoreEnvironment {
    /**
     * Path of environment
     * @type {string}
     * @public
     */
    path: string

    /**
     * Order
     * @type {number}
     * @public
     */
    order: int32

    /**
     * Creates an instance using values
     * @param {string} path Path of environment
     * @param {number} order Order
     * @constructor
     * @public
     */
    constructor(path: string, order: int32 = 0) {
        this.path = path
        this.order = order
    }
}

/**
 * Chunk hash
 */
export class FIoChunkHash {
    /**
     * Hash
     * @type {Buffer}
     * @public
     */
    hash = Buffer.alloc(32)

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        Ar.readToBuffer(this.hash)
    }
}

/**
 * Identifier to a chunk of data
 */
export class FIoChunkId {
    /**
     * ID
     * @type {Buffer}
     * @public
     */
    id = Buffer.alloc(12)

    /**
     * Type of chunk
     * @type {number}
     * @public
     */
    get chunkType() {
        return this.id[11]
    }

    /**
     * Creates an instance using an UE4 Reader or empty
     * @param {?FArchive} Ar UE4 Reader to use or null
     * @constructor
     * @public
     */
    constructor(Ar?: FArchive) {
        if (Ar) Ar.readToBuffer(this.id)
    }

    /**
     * Whether this equals other object
     * @param {FIoChunkId} other Other chunk id
     * @returns {boolean} Result
     * @public
     */
    equals(other: FIoChunkId): boolean {
        return this.id?.equals(other.id) ?? false
    }
}

/**
 * Addressable chunk types
 * @enum
 */
export enum EIoChunkType {
    Invalid,
    InstallManifest,
    ExportBundleData,
    BulkData,
    OptionalBulkData,
    MemoryMappedBulkData,
    LoaderGlobalMeta,
    LoaderInitialLoadMeta,
    LoaderGlobalNames,
    LoaderGlobalNameHashes,
    ContainerHeader
}

/**
 * Creates a chunk identifier
 * @param {bigint} chunkId ID of chunk
 * @param {number} chunkIndex Index of chunk
 * @param {EIoChunkType} ioChunkType Type of chunk
 * @returns {Buffer} Chunk ID
 * @public
 */
export function createIoChunkId(chunkId: bigint, chunkIndex: uint16, ioChunkType: EIoChunkType) {
    const ioChunkId = new FIoChunkId()
    ioChunkId.id.writeBigUInt64LE(chunkId, 0)
    ioChunkId.id.writeUInt16LE(chunkIndex, 8)
    ioChunkId.id.writeUInt8(ioChunkType, 11)
    return ioChunkId
}

/**
 * EIoContainerFlags
 * @enum
 */
export enum EIoContainerFlags {
    None,
    Compressed = (1 << 0),
    Encrypted = (1 << 1),
    Signed = (1 << 2),
    Indexed = (1 << 3)
}

//////////////////////////////////////////////////////////////////////////

/**
 * FIoDispatcherMountedContainer
 */
export class FIoDispatcherMountedContainer {
    /**
     * Environment
     * @type {FIoStoreEnvironment}
     * @public
     */
    environment: FIoStoreEnvironment

    /**
     * Container ID
     * @type {FIoStoreEnvironment}
     * @public
     */
    containerId: bigint

    /**
     * Creates instance using values
     * @param {FIoStoreEnvironment} environment Environment
     * @param {bigint} containerId Container ID
     * @constructor
     * @public
     */
    constructor(environment: FIoStoreEnvironment, containerId: bigint) {
        this.environment = environment
        this.containerId = containerId
    }
}

/**
 * FOnContainerMountedListener
 * @abstract
 */
export abstract class FOnContainerMountedListener {
    /**
     * Method to call on mounted container
     * @param {FIoDispatcherMountedContainer} container Container that got mounted
     * @returns {void}
     * @public
     */
    abstract onContainerMounted(container: FIoDispatcherMountedContainer)
}

/**
 * FIoDirectoryIndexHandle
 */
export class FIoDirectoryIndexHandle {
    /**
     * Handle
     * @type {number}
     * @public
     */
    handle: number

    /**
     * Creates an instance using handle value
     * @param {number} handle Handle value
     * @constructor
     * @private
     */
    private constructor(handle: number) {
        this.handle = handle
    }

    /**
     * INVALID_HANDLE
     * @type {number}
     * @public
     * @static
     */
    static INVALID_HANDLE = ~0

    /**
     * ROOT_HANDLE
     * @type {number}
     * @public
     * @static
     */
    static ROOT_HANDLE = 0

    /**
     * Creates instance from index
     * @param {number} index Index
     * @returns {FIoDirectoryIndexHandle} Instance
     * @public
     */
    static fromIndex(index: number) {
        return new FIoDirectoryIndexHandle(index)
    }

    /**
     * Creates instance using root value
     * @returns {FIoDirectoryIndexHandle} Instance
     * @see {ROOT_HANDLE}
     * @public
     */
    static rootDirectory() {
        return new FIoDirectoryIndexHandle(FIoDirectoryIndexHandle.ROOT_HANDLE)
    }

    /**
     * Creates instance using invalid value
     * @returns {FIoDirectoryIndexHandle} Instance
     * @see {INVALID_HANDLE}
     * @public
     */
    static invalid() {
        return new FIoDirectoryIndexHandle(FIoDirectoryIndexHandle.INVALID_HANDLE)
    }

    /**
     * Whether valid
     * @returns {boolean} Result
     * @see {INVALID_HANDLE}
     * @public
     */
    isValid() {
        return this.handle !== FIoDirectoryIndexHandle.INVALID_HANDLE
    }

    /**
     * Whether equals other object
     * @param {?any} other Other object to check
     * @returns {boolean} Result
     * @public
     */
    equals(other: any) {
        if (this === other) return true
        if (!(other instanceof FIoDirectoryIndexHandle)) return false
        return this.handle === other.handle
    }

    /**
     * Returns index value
     * @returns {number} Index
     * @public
     */
    toIndex() {
        return this.handle
    }
}