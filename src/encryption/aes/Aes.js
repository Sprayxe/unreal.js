const crypto = require("crypto");

class AES {
    constructor() {
        this.BLOCK_SIZE = 16;
    };

    /**
     * - Parses an AES key
     * @param {String} key 
     * @returns {Buffer}
     */
    parseKey(key) {
        if (!key) throw new Error("Invalid AES key!");

        const data = Buffer.from(key.startsWith("0x") ? key.substring(2) : key);
        if (data.size !== 32)
            throw new Error("Given AES key is not properly formatted, needs to be exactly 32 bytes long");

        return data;
    };

    /**
     * - Decrypts a buffer
     * @param {Buffer} encrypted 
     * @param {String} key 
     */
    decrypt(encrypted, key) {
        this.decrypt(encrypted, this.parseKey(key));
    };

    /**
     * - Decrypts a buffer
     * @param {Buffer} encrypted 
     * @param {Buffer} key 
     * @returns {Buffer} Decrypted buffer
     */
    decrypt(encrypted, key) {
        if (Buffer.isBuffer(key))
            throw new Error("Argument 'encrypted' must be a buffer!");

        const iv = Buffer.alloc(this.BLOCK_SIZE);
        const algorithm = "aes-256-cbc";
        const secretKey = crypto.scryptSync(key, "salt", 32);
        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
        
        const decrypted = "";
        decipher.on("readable", () => {
            while (null !== (chunk = decipher.read())) {
                decrypted += chunk.toString("utf8");
            };
        });
        decipher.on("end", () => {
            console.log("SUCCESSFULLY DECRYPTED!");
        });

        decipher.write(encrypted, "binary");
        decipher.end();

        return Buffer.from(decrypted);
    };

    /**
     * - Encrypts a buffer
     * @param {Buffer} encrypted 
     * @param {String} key 
     */
    encrypt(encrypted, key) {
        this.encrypt(encrypted, this.parseKey(key));
    };

    /**
     * - Encrypts a buffer
     * @param {Buffer} decrypted 
     * @param {Buffer} key 
     * @returns {Buffer} Encrypted buffer
     */
    encrypt(decrypted, key) {
        if (Buffer.isBuffer(key))
            throw new Error("Argument 'encrypted' must be a buffer!");

        const iv = Buffer.alloc(this.BLOCK_SIZE);
        const algorithm = "aes-256-cbc";
        const secretKey = crypto.scryptSync(key, "salt", 32);
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
        
        const encrypted = "";
        cipher.on("readable", () => {
            while (null !== (chunk = cipher.read())) {
                cipher += chunk.toString("utf8");
            };
        });
        cipher.on("end", () => {
            console.log("SUCCESSFULLY DECRYPTED!");
        });

        cipher.write(decrypted, "binary");
        cipher.end();

        return Buffer.from(encrypted);
    };
}