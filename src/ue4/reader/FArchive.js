class FArchive {
    /**
     * - Reads a buffer
     * @param {Buffer} data 
     * @param {Boolean} LE
     */
    constructor(data, LE = true) {
        this.data = data;
        this.LE = LE;
        this.offset = 0;
    };

    /**
     * - Reads 32 Int
     * @returns {Number}
     */
    readInt32() {
        const localOffset = this.offset;
        this.offset += 4;
        return this.LE ? this.data.readInt32LE(localOffset) : this.data.readInt32BE(localOffset);
    };

    /**
     * - Reads 64 Int
     * @returns {Number}
     */
    readInt64() {
        const localOffset = this.offset;
        this.offset += 8;
        return this.LE ? this.data.readBigInt64LE(localOffset) : this.data.readBigInt64BE(localOffset);
    };

    /**
     * - Reads the data
     * @param {Number} numBytes Amount of bytes to read
     * @returns {Buffer}
     */
    read(numBytes) {
        const out = this.data.slice(this.offset, this.offset + numBytes)
        this.offset += numBytes;
        return out;
    };
};

module.exports = FArchive;