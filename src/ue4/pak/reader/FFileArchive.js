const FArchive = require("../../reader/FArchive");
const fs = require("fs").promises;

class FFileArchive extends FArchive {
    /**
     * - FPakArchive
     * @param {String} fileName 
     */
    constructor(fileName) {
        this.fileName = fileName;
        //this.pakInfo = new FPakInfo();
    };

    /**
     * - Reads buffer
     * @param {Number} size 
     */
    readBuffer(size) {
        const buffer = Buffer.alloc(size);
        super.readBuffer(buffer);
        return buffer;
    };

    read(size) {
        const res = new ArrayBuffer(size);
        super.read(res.length)
        return res;
    };
};

module.exports = FFileArchive;