import { FArchive } from "./FArchive";
import { Stats } from "fs";
import fs from "fs";

/**
 * File Reader
 */
export class FFileArchive extends FArchive {
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
     * Path to the file
     * @type {string}
     * @public
     */
    public path: string

    /**
     * FS handle id
     * @type {number}
     * @public
     */
    public handle: number

    /**
     * FS Stats
     * @type {Stats}
     * @public
     */
    public stats: Stats

    /**
     * Size of the reader
     * @type {number}
     * @public
     */
    public get size(): number {
        return this.stats.size
    }

    /**
     * Current position
     * @type {number}
     * @public
     */
    public get pos(): number {
        return this.position
    }
    public set pos(pos: number) {
        this.position = pos
    }

    /**
     * Reads to a buffer
     * @param {Buffer} b Destination
     * @param {number} off Offset in buffer
     * @param {number} len Length to read
     * @returns {void}
     * @public
     */
    public readToBuffer(b: Buffer, off: number = 0, len: number = b.length) {
        fs.readSync(this.handle, b, off, len, this.position)
        this.position += len
    }

    /**
     * Creates an instance
     * @param {?string} path Path to the file
     * @constructor
     * @public
     */
    constructor(path?: string) {
        super()
        if (path) {
            this.path = path
            this.handle = fs.openSync(path, "rs")
            this.stats = fs.fstatSync(this.handle)
        }
    }

    /**
     * Clones this
     * @returns {FFileArchive} Clone
     * @public
     */
    public clone(): FFileArchive {
        const clone = new FFileArchive()
        clone.path = this.path
        clone.handle = this.handle
        clone.stats = this.stats
        return clone
    }

    /**
     * Returns FArchive info for error
     * @returns {string}
     * @public
     */
    public printError(): string {
        return `FFileArchive Info: pos ${this.pos}, stopper ${this.size}, file ${this.path}`
    }
}