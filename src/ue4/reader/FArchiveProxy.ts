import { FArchive } from "./FArchive";

/**
 * Proxy for UE4 Reader
 * @extends {FArchive}
 */
export class FArchiveProxy extends FArchive {
    /**
     * The FArchive
     * @type {FArchive}
     * @public
     */
    wrappedAr: FArchive

    /**
     * Whether to use little endian
     * @type {boolean}
     * @public
     */
    littleEndian: boolean

    /**
     * Creates an instance
     * @param {FArchive} wrappedAr FArchive instance
     * @constructor
     * @public
     */
    constructor(wrappedAr: FArchive) {
        super()
        this.wrappedAr = wrappedAr
        this.littleEndian = this.wrappedAr.littleEndian
    }

    /**
     * Clones this instance
     * @returns {FArchiveProxy}
     * @public
     */
    clone(): FArchiveProxy {
        return new FArchiveProxy(this.wrappedAr)
    }

    /**
     * Current position
     * @type {number}
     * @public
     */
    get pos(): number {
        return this.wrappedAr.pos
    }

    set pos(pos: number) {
        this.wrappedAr.pos = pos
    }

    /**
     * Size of this reader
     * @type {number}
     * @public
     */
    get size(): number  {
        return this.wrappedAr.size
    }

    // Only overriding these to keep optimal performance with FByteArchive
    /**
     * Reads an 8-bit integer
     * @returns {number} Result
     * @public
     */
    readInt8(): number {
        return this.wrappedAr.readInt8()
    }

    /**
     * Reads a 16-bit integer
     * @returns {number} Result
     * @public
     */
    readInt16(): number {
        return this.wrappedAr.readInt16()
    }

    /**
     * Reads a 32-bit integer
     * @returns {number} Result
     * @public
     */
    readInt32(): number {
        return this.wrappedAr.readInt32()
    }

    /**
     * Reads a 64-bit integer
     * @returns {number} Result
     * @public
     */
    readInt64(): bigint {
        return this.wrappedAr.readInt64()
    }

    /**
     * Reads a float
     * @returns {number} Result
     * @public
     */
    readFloat32(): number {
        return this.wrappedAr.readFloat32()
    }

    /**
     * Reads a double
     * @returns {number} Result
     * @public
     */
    readDouble(): number {
        return this.wrappedAr.readDouble()
    }

    /**
     * Creates a string with FArchive info for error
     * @returns {string} Result
     * @public
     */
    printError(): string {
        // 5head /s
        return super.printError()
            .replace("FArchive", "FArchiveProxy")
    }
}