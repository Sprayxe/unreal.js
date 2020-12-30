const FArchive = require("./FArchive");

class FByteArchive extends FArchive {
    /**
     * - Byte archive
     * @param {Buffer} data 
     */
    constructor(data) {
        super();
        this.data = data;
    };

    /**
     * - Byte archive
     * @param {ArrayBuffer} data 
     */
    constructor(data) {
        super();
        this.data = Buffer.from(data);
    };

    get LE() { return true; };

    get pos() {
        this.data.indexOf("")
    }

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

    readBuffer(size) {
        
    }
};

module.exports = FByteArchive;
