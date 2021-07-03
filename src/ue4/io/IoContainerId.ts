import { FArchive } from "../reader/FArchive";

/**
 * Creates FIoContainer ID
 * @param {bigint | FArchive | null} source Source to use
 * @returns {bigint} ID
 * @export
 */
export function createFIoContainerId(source?: bigint | FArchive) {
    let id = 0xFFFFFFFFFFFFFFFFn
    if (source) {
        id = source instanceof FArchive
            ? source.readUInt64()
            : source
    }
    return id
}

/**
 * Container ID
 * @deprecated Use 'createFIoContainerId(source?: string | FArchive)' and 'isFIoContainerIdValid(id: string)'
 */
export class FIoContainerId {
    /**
     * Invalid ID
     * @type {string}
     * @public
     * @static
     */
    static InvalidId = (0xFFFFFFFFFFFFFFFFn).toString()

    /**
     * ID
     * @type {string}
     * @public
     */
    id = FIoContainerId.InvalidId

    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using ID
     * @param {string} id ID to use
     * @constructor
     * @public
     */
    constructor(id: string)

    /**
     * Crates an instance using UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    constructor(x?: any) {
        if (x)
            this.id = x instanceof FArchive ? x.readUInt64().toString() : x
    }

    /**
     * Returns ID value
     * @returns {string} ID
     * @public
     */
    value() {
        return this.id
    }

    /**
     * Wether valid
     * @returns {boolean} Result
     * @public
     */
    isValid() {
        return this.id !== FIoContainerId.InvalidId
    }

    /**
     * Wether equals other object
     * @param {?any} other Object to check
     * @returns {boolean} Result
     * @public
     */
    equals(other?: any) {
        if (this === other) return true
        if (!(this instanceof FIoContainerId)) return false
        return this.id === other.id
    }
}