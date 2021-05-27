import { FArchive } from "../reader/FArchive";

/**
 * Container ID.
 */
export class FIoContainerId {
    static InvalidId = (0xFFFFFFFFFFFFFFFFn).toString()

    id = FIoContainerId.InvalidId

    constructor(id: string)
    constructor(Ar: FArchive)
    constructor(x?: any) {
        this.id = x instanceof FArchive ? x.readUInt64().toString() : x
    }

    value() {
        return this.id
    }

    isValid() {
        return this.id !== FIoContainerId.InvalidId
    }

    equals(other?: any) {
        if (this === other) return true
        if (!(this instanceof FIoContainerId)) return false
        return this.id === other.id
    }
}