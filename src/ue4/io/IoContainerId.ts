import { FArchive } from "../reader/FArchive";

/**
 * Container ID.
 */
export class FIoContainerId {
    static InvalidId = 0xFFFFFFFFFFFFFFFFn

    id = FIoContainerId.InvalidId

    constructor(Ar: FArchive) {
        this.id = Ar.readUInt64()
    }
}