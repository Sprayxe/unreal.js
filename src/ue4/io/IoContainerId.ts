import { FArchive } from "../reader/FArchive";

export function createFIoContainerId(source?: string | FArchive) {
    let id = (0xFFFFFFFFFFFFFFFFn).toString()
    if (source) {
        id = source instanceof FArchive
            ? source.readUInt64().toString()
            : source
    }
    return id
}

/**
 * - Container ID:
 * @deprecated Use 'createFIoContainerId(source?: string | FArchive)' and 'isFIoContainerIdValid(id: string)'
 */
export class FIoContainerId {
    static InvalidId = (0xFFFFFFFFFFFFFFFFn).toString()

    id = FIoContainerId.InvalidId

    constructor()
    constructor(id: string)
    constructor(Ar: FArchive)
    constructor(x?: any) {
        if (x)
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