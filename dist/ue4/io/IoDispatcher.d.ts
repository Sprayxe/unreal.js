/// <reference types="node" />
/// <reference types="ref-napi" />
import { FArchive } from "../reader/FArchive";
import { int32, uint16 } from "../../Types";
/**
 * Helper used to manage creation of I/O store file handles etc
 */
export declare class FIoStoreEnvironment {
    /**
     * Path of environment
     * @type {string}
     * @public
     */
    path: string;
    /**
     * Order
     * @type {number}
     * @public
     */
    order: int32;
    /**
     * Creates an instance using values
     * @param {string} path Path of environment
     * @param {number} order Order
     * @constructor
     * @public
     */
    constructor(path: string, order?: int32);
}
/**
 * Chunk hash
 */
export declare class FIoChunkHash {
    /**
     * Hash
     * @type {Buffer}
     * @public
     */
    hash: Buffer;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
}
/**
 * Identifier to a chunk of data
 */
export declare class FIoChunkId {
    /**
     * ID
     * @type {Buffer}
     * @public
     */
    id: Buffer;
    /**
     * Type of chunk
     * @type {number}
     * @public
     */
    get chunkType(): number;
    /**
     * Creates an instance using an UE4 Reader or empty
     * @param {?FArchive} Ar UE4 Reader to use or null
     * @constructor
     * @public
     */
    constructor(Ar?: FArchive);
    /**
     * Whether this equals other object
     * @param {FIoChunkId} other Other chunk id
     * @returns {boolean} Result
     * @public
     */
    equals(other: FIoChunkId): boolean;
}
/**
 * Addressable chunk types
 * @enum
 */
export declare enum EIoChunkType {
    Invalid = 0,
    InstallManifest = 1,
    ExportBundleData = 2,
    BulkData = 3,
    OptionalBulkData = 4,
    MemoryMappedBulkData = 5,
    LoaderGlobalMeta = 6,
    LoaderInitialLoadMeta = 7,
    LoaderGlobalNames = 8,
    LoaderGlobalNameHashes = 9,
    ContainerHeader = 10
}
/**
 * Creates a chunk identifier
 * @param {bigint} chunkId ID of chunk
 * @param {number} chunkIndex Index of chunk
 * @param {EIoChunkType} ioChunkType Type of chunk
 * @returns {Buffer} Chunk ID
 * @public
 */
export declare function createIoChunkId(chunkId: bigint, chunkIndex: uint16, ioChunkType: EIoChunkType): FIoChunkId;
/**
 * EIoContainerFlags
 * @enum
 */
export declare enum EIoContainerFlags {
    None = 0,
    Compressed = 1,
    Encrypted = 2,
    Signed = 4,
    Indexed = 8
}
/**
 * FIoDispatcherMountedContainer
 */
export declare class FIoDispatcherMountedContainer {
    /**
     * Environment
     * @type {FIoStoreEnvironment}
     * @public
     */
    environment: FIoStoreEnvironment;
    /**
     * Container ID
     * @type {FIoStoreEnvironment}
     * @public
     */
    containerId: bigint;
    /**
     * Creates instance using values
     * @param {FIoStoreEnvironment} environment Environment
     * @param {bigint} containerId Container ID
     * @constructor
     * @public
     */
    constructor(environment: FIoStoreEnvironment, containerId: bigint);
}
/**
 * FOnContainerMountedListener
 * @abstract
 */
export declare abstract class FOnContainerMountedListener {
    /**
     * Method to call on mounted container
     * @param {FIoDispatcherMountedContainer} container Container that got mounted
     * @returns {void}
     * @public
     */
    abstract onContainerMounted(container: FIoDispatcherMountedContainer): any;
}
/**
 * FIoDirectoryIndexHandle
 */
export declare class FIoDirectoryIndexHandle {
    /**
     * Handle
     * @type {number}
     * @public
     */
    handle: number;
    /**
     * Creates an instance using handle value
     * @param {number} handle Handle value
     * @constructor
     * @private
     */
    private constructor();
    /**
     * INVALID_HANDLE
     * @type {number}
     * @public
     * @static
     */
    static INVALID_HANDLE: number;
    /**
     * ROOT_HANDLE
     * @type {number}
     * @public
     * @static
     */
    static ROOT_HANDLE: number;
    /**
     * Creates instance from index
     * @param {number} index Index
     * @returns {FIoDirectoryIndexHandle} Instance
     * @public
     */
    static fromIndex(index: number): FIoDirectoryIndexHandle;
    /**
     * Creates instance using root value
     * @returns {FIoDirectoryIndexHandle} Instance
     * @see {ROOT_HANDLE}
     * @public
     */
    static rootDirectory(): FIoDirectoryIndexHandle;
    /**
     * Creates instance using invalid value
     * @returns {FIoDirectoryIndexHandle} Instance
     * @see {INVALID_HANDLE}
     * @public
     */
    static invalid(): FIoDirectoryIndexHandle;
    /**
     * Whether valid
     * @returns {boolean} Result
     * @see {INVALID_HANDLE}
     * @public
     */
    isValid(): boolean;
    /**
     * Whether equals other object
     * @param {?any} other Other object to check
     * @returns {boolean} Result
     * @public
     */
    equals(other: any): boolean;
    /**
     * Returns index value
     * @returns {number} Index
     * @public
     */
    toIndex(): number;
}
