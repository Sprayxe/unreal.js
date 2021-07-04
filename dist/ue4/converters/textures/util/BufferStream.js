"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferStream = void 0;
class BufferStream {
    constructor(buf, offset, length) {
        this.pos = 0;
        this.count = 0;
        this.mark = 0;
        this.buf = buf;
        if (offset != null) {
            this.pos = offset;
            this.count = Math.min(offset + length, buf.length);
            this.mark = offset;
        }
        else {
            this.pos = 0;
            this.count = buf.length;
        }
    }
    read(x, y, z) {
        if (x) {
            if (Buffer.isBuffer(x)) {
                if (y == null)
                    y = 0;
                if (z == null)
                    z = x.length;
                if (this.pos > this.count)
                    return -1;
                const avail = this.count - this.pos;
                if (z > avail)
                    z = avail;
                if (z < 0)
                    return 0;
                this.buf.copy(x, y, this.pos, this.pos += z);
                return z;
            }
            let retValue = 0;
            for (let i = this.pos; i < this.pos + x; i++) {
                if (this.getBit(i)) {
                    retValue |= 1 << (i - this.pos);
                }
            }
            this.pos += x;
            return retValue;
        }
        return this.pos < this.count ? this.buf[this.pos++] & 0xff : -1;
    }
    readAllBytes() {
        const result = this.buf.slice(this.pos, this.count);
        this.pos = this.count;
        return result;
    }
    readNBytes(b, off, len) {
        const n = this.read(b, off, len);
        return n === -1 ? 0 : n;
    }
    skip(n) {
        let k = this.count - this.pos;
        if (n < k) {
            k = n < 0 ? 0 : n;
        }
        this.pos += k;
        return k;
    }
    get available() {
        return this.count - this.pos;
    }
    getBit(bitIndex) {
        const byte = ~~(bitIndex / 8);
        const bit = bitIndex % 8;
        const idByte = this.buf[byte];
        return idByte & Math.pow(2, (7 - bit));
    }
}
exports.BufferStream = BufferStream;
