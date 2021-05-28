import { FArchive } from "../reader/FArchive";
import { int32, uint16, uint64 } from "../../Types";
import { FIoContainerId } from "./IoContainerId";
import { Utils } from "../../util/Utils";

/**
 * Helper used to manage creation of I/O store file handles etc
 */
export class FIoStoreEnvironment {
    path: string
    order: int32

    constructor(path: string, order: int32 = 0) {
        this.path = path
        this.order = order
    }
}

/**
 * Chunk hash
 */
export class FIoChunkHash {
    hash = Buffer.alloc(32)

    constructor(Ar: FArchive) {
        Ar.readToBuffer(this.hash)
    }
}

/**
 * Identifier to a chunk of data.
 */
export class FIoChunkId {
    id = Buffer.alloc(12)

    constructor(Ar?: FArchive) {
        if (Ar) Ar.readToBuffer(this.id)
    }

    equals(other: FIoChunkId): boolean {
        return this.id.equals(other.id)
    }
}

/**
 * Addressable chunk types.
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
 */
export function createIoChunkId(chunkId: string, chunkIndex: uint16, ioChunkType: EIoChunkType) {
    const ioChunkId = new FIoChunkId()
    ioChunkId.id.writeBigUInt64LE(BigInt(chunkId), 0)
    ioChunkId.id.writeUInt16LE(chunkIndex, 8)
    ioChunkId.id.writeUInt8(ioChunkType, 11)
    return ioChunkId
}

export enum EIoContainerFlags {
    None,
    Compressed = (1 << 0),
    Encrypted = (1 << 1),
    Signed = (1 << 2),
    Indexed = (1 << 3)
}

//////////////////////////////////////////////////////////////////////////

export class FIoDispatcherMountedContainer {
    environment: FIoStoreEnvironment
    containerId: FIoContainerId

    constructor(environment: FIoStoreEnvironment, containerId: FIoContainerId) {
        this.environment = environment
        this.containerId = containerId
    }
}

export abstract class FOnContainerMountedListener {
    abstract onContainerMounted(container: FIoDispatcherMountedContainer)
}

export class FIoDirectoryIndexHandle {
    handle: number
    private constructor(handle: number) {
        this.handle = handle
    }

    static INVALID_HANDLE = ~0
    static ROOT_HANDLE = 0

    static fromIndex(index: number) { return new FIoDirectoryIndexHandle(index) }
    static rootDirectory() { return new FIoDirectoryIndexHandle(FIoDirectoryIndexHandle.ROOT_HANDLE) }
    static invalid() { return new FIoDirectoryIndexHandle(FIoDirectoryIndexHandle.INVALID_HANDLE) }

    isValid() { return this.handle !== FIoDirectoryIndexHandle.INVALID_HANDLE }

    equals(other: any) {
        if (this === other) return true
        if (!(other instanceof FIoDirectoryIndexHandle)) return false
        return this.handle === other.handle
    }

    hashCode() { return Utils.hash(this.handle.toString()) }

    toIndex() { return this.handle }
}