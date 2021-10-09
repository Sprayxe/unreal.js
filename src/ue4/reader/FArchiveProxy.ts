import { FArchive } from "./FArchive";

/**
 * Proxy for UE4 Generic Reader
 */
export class FArchiveProxy extends FArchive {
    public wrappedAr: FArchive

    /**
     * Whether to use little endian order
     * @type {boolean}
     * @public
     */
    public get littleEndian() {
        return this.wrappedAr.littleEndian
    }

    public set littleEndian(value: boolean) {
        this.wrappedAr.littleEndian = value
    }

    /**
     * Creates an instance
     * @param {FArchive} wrappedAr Ar to proxy
     * @constructor
     * @public
     */
    constructor(wrappedAr: FArchive) {
        super()
        this.wrappedAr = wrappedAr
    }

    /**
     * Clones this
     * @returns {FArchiveProxy} Clone
     * @public
     */
    public clone(): FArchiveProxy {
        return new FArchiveProxy(this.wrappedAr)
    }

    /**
     * Size of data
     * @type {number}
     * @public
     */
    public get size(): number {
        return this.wrappedAr.size
    }

    /**
     * Current position
     * @type {number}
     * @public
     */
    public get pos(): number {
        return this.wrappedAr.pos
    }

    public set pos(pos: number) {
        this.wrappedAr.pos = pos
    }

    /**
     * Reads to a buffer
     * @param {Buffer} b Destination
     * @param {number} off Offset
     * @param {number} len Length
     * @returns {void}
     * @public
     */
    public readToBuffer(b: Buffer, off: number = 0, len: number = b.length) {
        return this.wrappedAr.readToBuffer(b, off, len)
    }

    /**
     * Returns FArchive info for error
     * @returns {string}
     * @public
     */
    public printError(): string {
        return this.wrappedAr.printError()
    }

    // Overriding these to keep optimal performance with FByteArchive

    /**
     * Reads an 8-bit integer
     * @returns {number} Result
     * @public
     */
    public readInt8(): number {
        return this.wrappedAr.readInt8()
    }

    /**
     * Reads a 16-bit integer
     * @returns {number} Result
     * @public
     */
    public readInt16(): number {
        return this.wrappedAr.readInt16()
    }

    /**
     * Reads a 32-bit integer
     * @returns {number} Result
     * @public
     */
    public readInt32(): number {
        return this.wrappedAr.readInt32()
    }

    /**
     * Reads a 64-bit integer
     * @returns {bigint} Result
     * @public
     */
    public readInt64(): bigint {
        return this.wrappedAr.readInt64()
    }

    /**
     * Reads a 32-bit float
     * @returns {number} Result
     * @public
     */
    public readFloat32(): number {
        return this.wrappedAr.readFloat32()
    }

    /**
     * Reads a double
     * @returns {number} Result
     * @public
     */
    public readDouble(): number {
        return this.wrappedAr.readDouble()
    }
}