import * as fs from "fs";
import { Stats } from "fs";
import { FArchive } from "./FArchive";

export class FFileArchive extends FArchive {
    path: string
    handle: number
    stats: Stats

    constructor(path: string) {
        super()
        this.path = path
        this.handle = fs.openSync(path, "rs")
        this.stats = fs.fstatSync(this.handle)
    }

    get size() { return this.stats.size }

    readRange(begin: number, end: number, copy: boolean = false): Buffer {
        const length = end - begin
        const buffer = Buffer.allocUnsafe(length)
        fs.readSync(this.handle, buffer, 0, length, begin)
        return buffer
    }

    readInt8() {
        const data = this.readBuffer(1)
        return data.readInt8()
    }

    readUInt8() {
        const data = this.readBuffer(1)
        return data.readUInt8()
    }

    readInt16() {
        const data = this.readBuffer(2)
        return this.littleEndian ? data.readInt16LE() : data.readInt16BE()
    }

    readUInt16() {
        const data = this.readBuffer(2)
        return this.littleEndian ? data.readUInt16LE() : data.readUInt16BE()
    }

    readInt32() {
        const data = this.readBuffer(4)
        return this.littleEndian ? data.readInt32LE() : data.readInt32BE()
    }

    readUInt32() {
        const data = this.readBuffer(4)
        return this.littleEndian ? data.readUInt32LE() : data.readUInt32BE()
    }

    readInt64() {
        const data = this.readBuffer(8)
        return this.littleEndian ? data.readBigInt64LE() : data.readBigInt64BE()
    }

    readUInt64() {
        const data = this.readBuffer(8)
        return this.littleEndian ? data.readBigUInt64LE() : data.readBigUInt64BE()
    }

    readFloat32() {
        const data = this.readBuffer(4)
        return this.littleEndian ? data.readFloatLE() : data.readFloatBE()
    }

    readDouble() {
        const data = this.readBuffer(8)
        return this.littleEndian ? data.readDoubleLE() : data.readDoubleBE()
    }

    printError(): string {
        return `FFileArchive Info: pos ${this.pos}, stopper ${this.size}, file ${this.path}`
    }
}