import { FArchive } from "../reader/FArchive";

/**
 * Container ID.
 */
export class FIoContainerId {
    static InvalidId = 0xFFFFFFFFFFFFFFFFn

    id = FIoContainerId.InvalidId

    constructor(id: bigint)
    constructor(Ar: FArchive)
    constructor(x?: any) {
        this.id = x instanceof FArchive ? x.readUInt64() : x
    }

    value() {
        return this.id
    }

    isValid() {
        return this.id !== FIoContainerId.InvalidId
    }
}