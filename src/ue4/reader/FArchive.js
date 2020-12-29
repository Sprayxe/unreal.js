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
     * - Reads a buffer
     * @param {Number} size Size of the buffer
     * @returns {Buffer}
     */
    readBuffer(size) {
        const buffer = Buffer.alloc(size);
        this.read(buffer.length);
        return buffer;
    };

    /**
     * - Reads 8 Int
     * @returns {Number}
     */
    readInt8() {
        const localOffset = this.offset;
        this.offset += 1;
        return this.data.readInt8(localOffset);
    };

    /**
     * - Reads 8 UInt
     * @returns {Number}
     */
    readUInt8() {
        const localOffset = this.offset;
        this.offset += 1;
        return this.data.readUInt8(localOffset);
    };

    /**
     * - Reads 16 Int
     * @returns {Number}
     */
    readInt16() {
        const localOffset = this.offset;
        this.offset += 2;
        return this.LE ? this.data.readInt16LE(localOffset) : this.data.readInt16BE(localOffset);
    };

    /**
     * - Reads 16 UInt
     * @returns {Number}
     */
    readUInt16() {
        const localOffset = this.offset;
        this.offset += 2;
        return this.LE ? this.data.readUInt16LE(localOffset) : this.data.readUInt16BE(localOffset);
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
     * - Reads 32 UInt
     * @returns {Number}
     */
    readUInt32() {
        const localOffset = this.offset;
        this.offset += 4;
        return this.LE ? this.data.readUInt32LE(localOffset) : this.data.readUInt32BE(localOffset);
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
     * - Reads 64 UInt
     * @returns {Number}
     */
    readUInt64() {
        const localOffset = this.offset;
        this.offset += 8;
        return this.LE ? this.data.readBigUInt64LE(localOffset) : this.data.readBigUInt64BE(localOffset);
    };
    
    /**
     * - Reads 16 Float
     * @returns {Number}
     */
    readFloat16() {
        const localOffset = this.offset;
        this.offset += 2;
        return this.LE ? this.data.readFloatLE(localOffset) : this.data.readFloatBE(localOffset);
    };

    /**
     * - Reads 32 Float
     * @returns {Number}
     */
    readFloat32() {
        const localOffset = this.offset;
        this.offset += 4;
        return this.LE ? this.data.readFloatLE(localOffset) : this.data.readFloatBE(localOffset);
    };

    /**
     * - Reads Double
     * @returns {Number}
     */
    readDouble() {
        const localOffset = this.offset;
        this.offset += 8;
        return this.LE ? this.data.readDoubleLE(localOffset) : this.data.readDoubleBE(localOffset);
    };

    /**
     * - Reads a boolean
     * @returns {Boolean}
     */
    readBoolean() {
        const int = this.readInt32();
        if (int != 0 && int != 1) 
            throw new Error(`Invalid boolean value (${int})`);
        return int != 0;
    };

    /**
     * - Reads flag
     * @returns {Boolean}
     */
    readFlag() {
        const int = this.readUInt8();
        if (int != 0 && int != 1) 
            throw new Error(`Invalid boolean value (${int})`);
        return int != 0;
    };

    /**
     * - Reads data
     * @param {Number} numBytes Amount of bytes to read
     * @returns {Buffer}
     */
    read(numBytes) {
        const out = this.data.slice(this.offset, this.offset + numBytes)
        this.offset += numBytes;
        return out;
    };

    /**
     * - FString
     * @returns {String}
     */
    readString() {
        const length = this.readInt32();
        if (length < -65536 || length > 65536) 
            throw new Error(`Invalid String length '${length}'`);

        if (length < 0) {
            const utf16length = -length;
            const dat = new Array(utf16length - 1).push(this.readUInt16());
            if (this.readUInt16() != 0) 
                throw new Error("Serialized FString is not null-terminated");
                
            return dat.toString().slice(0, utf16length - 1);
        } else {
            if (length == 0) return "";
            const string = this.readBuffer(length - 1).toString("utf-8");

            if (this.readUInt8() != 0)  
                throw new Error("Serialized FString is not null-terminated");
            
            return string;
        };
    };
};

module.exports = FArchive;