import { FArchive } from "../reader/FArchive";
import { int32, uint16, uint64 } from "../../Types";

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
        Ar.read(this.hash)
    }
}

/**
 * Identifier to a chunk of data.
 */
export class FIoChunkId {
    id = Buffer.alloc(12)

    constructor(Ar?: FArchive) {
        if (Ar) Ar.read(this.id)
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
 * Creates a chunk identifier,
 */
export function createIoChunkId(chunkId: uint64, chunkIndex: uint16, ioChunkType: EIoChunkType) {
    const ioChunkId = new FIoChunkId()

    ioChunkId.id.writeBigUInt64LE(chunkId, 0)
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