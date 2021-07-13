import { FArchive } from "./FArchive";

/**
 * Byte Reader for UE4
 * @extends {FArchive}
 */
export class FByteArchive extends FArchive {
    /**
     * Position of the reader
     * @type {number}
     * @protected
     */
    protected position = 0

    /**
     * Whether to use little endian
     * @type {boolean}
     * @public
     */
    public littleEndian = true

    /**
     * Stores the buffer data
     * @type {Buffer}
     * @public
     */
    public data: Buffer

    /**
     * Creates an instance
     * @param {Buffer} data Bytes to read
     * @constructor
     * @public
     */
    constructor(data: Buffer) {
        super()
        this.data = data
    }

    /**
     * Current position
     * @type {number}
     * @public
     */
    public get pos() {
        return this.position
    }
    public set pos(pos: number) {
        this.position = pos
    }

    /**
     * Clones this instance
     * @returns {FByteArchive}
     * @public
     */
    public clone(): FByteArchive {
        const clone = new FByteArchive(this.data)
        clone.pos = this.position
        return clone
    }

    /**
     * Size of data
     * @type {number}
     * @public
     */
    public get size(): number {
        return this.data.length
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
        this.data.copy(b, off, this.position, this.position += len)
    }

    /**
     * Returns FByteArchive info for error
     * @returns {string}
     * @public
     */
    public printError(): string {
        return `FByteArchive Info: pos ${this.position}, stopper ${this.size}`
    }
}