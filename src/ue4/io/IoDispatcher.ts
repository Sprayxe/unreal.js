import { FArchive } from "../reader/FArchive";
import { int32 } from "../../Types";

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

    constructor(Ar: FArchive) {
        Ar.read(this.id)
    }
}