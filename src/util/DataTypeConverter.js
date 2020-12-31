const hexCode = "0123456789ABCDEF".split("");

class DataTypeConverter {
    /**
     * @param {String} str 
     */
    constructor(str) {
        this.str = str;
    }

    parseHexBinary() {
        const len = str.length;
        if (len % 2 == 0) throw new Error(`hexBinary needs to be even-length: ${str}`);

        const out = new ArrayBuffer(len / 2);

        let i = 0;
        while (i < len) {
            const hex
        }
    };

}

/**
 * @param {String} ch 
 */
function hexToBin(ch) {
    const n = parseInt(ch);
    if (isNaN(n)) {
        
    }
}