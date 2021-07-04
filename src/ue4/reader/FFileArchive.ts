import * as fs from "fs";
import { Stats } from "fs";
import { FArchive } from "./FArchive";

/**
 * File Reader
 * @extends {FArchive}
 */
export class FFileArchive extends FArchive {
    /**
     * Path to the file
     * @type {string}
     * @public
     */
    path: string

    /**
     * FS handle id
     * @type {number}
     * @public
     */
    handle: number

    /**
     * FS Stats
     * @type {Stats}
     * @public
     */
    stats: Stats

    /**
     * Creates an instance
     * @param {string} path Path to the file
     * @constructor
     * @public
     */
    constructor(path: string) {
        super()
        this.path = path
        this.handle = fs.openSync(path, "rs")
        this.stats = fs.fstatSync(this.handle)
    }

    /**
     * Size of the reader
     * @type {number}
     * @public
     */
    get size() {
        return this.stats.size
    }

    /**
     * Reads a range of bytes
     * @param {number} begin Where to begin
     * @param {number} end Where to stop
     * @param {boolean} copy Whether to remove bytes from buffer
     */
    readRange(begin: number, end: number, copy: boolean = false): Buffer {
        const length = end - begin
        const buffer = Buffer.allocUnsafe(length)
        fs.readSync(this.handle, buffer, 0, length, begin)
        return buffer
    }

    /**
     * Reads an 8-bit integer
     * @returns {number} Result
     * @public
     */
    readInt8() {
        const data = this.readBuffer(1)
        return data.readInt8()
    }

    /**
     * Reads an unsigned 8-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt8() {
        const data = this.readBuffer(1)
        return data.readUInt8()
    }

    /**
     * Reads a 16-bit integer
     * @returns {number} Result
     * @public
     */
    readInt16() {
        const data = this.readBuffer(2)
        return this.littleEndian ? data.readInt16LE() : data.readInt16BE()
    }

    /**
     * Reads an unsigned 16-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt16() {
        const data = this.readBuffer(2)
        return this.littleEndian ? data.readUInt16LE() : data.readUInt16BE()
    }

    /**
     * Reads a 32-bit integer
     * @returns {number} Result
     * @public
     */
    readInt32() {
        const data = this.readBuffer(4)
        return this.littleEndian ? data.readInt32LE() : data.readInt32BE()
    }

    /**
     * Reads an unsigned 32-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt32() {
        const data = this.readBuffer(4)
        return this.littleEndian ? data.readUInt32LE() : data.readUInt32BE()
    }

    /**
     * Reads a 64-bit integer
     * @returns {number} Result
     * @public
     */
    readInt64() {
        const data = this.readBuffer(8)
        return this.littleEndian ? data.readBigInt64LE() : data.readBigInt64BE()
    }

    /**
     * Reads an unsigned 64-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt64() {
        const data = this.readBuffer(8)
        return this.littleEndian ? data.readBigUInt64LE() : data.readBigUInt64BE()
    }

    /**
     * Reads a float
     * @returns {number} Result
     * @public
     */
    readFloat32() {
        const data = this.readBuffer(4)
        return this.littleEndian ? data.readFloatLE() : data.readFloatBE()
    }

    /**
     * Reads a double
     * @returns {number} Result
     * @public
     */
    readDouble() {
        const data = this.readBuffer(8)
        return this.littleEndian ? data.readDoubleLE() : data.readDoubleBE()
    }

    /**
     * Returns FArchive info for error
     * @returns {string}
     * @public
     */
    printError(): string {
        return `FFileArchive Info: pos ${this.pos}, stopper ${this.size}, file ${this.path}`
    }
}