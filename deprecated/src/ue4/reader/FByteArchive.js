const FArchive = require("./FArchive");
const { Buffer } = require("buffer");

class FByteArchive extends FArchive {
    /**
     * - Byte archive
     * @param {Buffer | ArrayBuffer} params 
     */
    constructor(...params) {
        super();

        params.forEach((v, k) => {
            if (typeof k === "object") {
                this.data = Buffer.from(v);
            } else {
                this.data = v;
            }
        })
    };

    get LE() { return true; };

    get pos() {
        return this.data.byteOffset;
    };

    get size() {
        return this.data.length
    };

    clone() {
        const clone = new FByteArchive(this.data);
        clone.pos = this.pos;
        return clone;
    };

    seek(pos) {
        this.pos = pos;
    };

    /*readBuffer(size) {
        const buf = Buffer.alloc(this.pos + size);
        this.data.copy(buf);
        this.pos += size;
        return buf;
    };

    read(b, off, len) {
        const count = Math.min(this.size - this.pos, len);
        if (count == 0) return  -1;
        this.data.copy(b, off, null, len);
        return count;
    };*/
};

module.exports = FByteArchive;
