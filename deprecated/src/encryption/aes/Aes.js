const crypto = require("crypto");
const { AesError } = require("../../errors/Exceptions");

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

        const data = key.startsWith("0x") ? key.substring(2) : key;
        if (data.size !== 32)
            throw new AesError("Given AES key is not properly formatted, needs to be exactly 32 bytes long").m;

        return crypto.scryptSync(data, "salt", 32);
    };

    /**
     * - Decrypts a buffer
     * @param {Buffer} encrypted 
     * @param {Buffer} key 
     * @returns {Buffer} Decrypted buffer
     */
    decrypt(encrypted, key) {
        if (!Buffer.isBuffer(encrypted))
            throw new AesError("Argument 'encrypted' and 'key' must be a buffer!");

        if (typeof key === "string") {
            key = this.parseKey(key);
        };

        encrypted = Buffer.from(encrypted, "base64").toString("binary");
        const iv = Buffer.alloc(this.BLOCK_SIZE);
        const algorithm = "aes-256-cbc";
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        let decrypted = decipher.update(encrypted);
        decrypted += decipher.final();

        return decrypted;
    };

    /**
     * - Encrypts a buffer
     * @param {Buffer} decrypted 
     * @param {Buffer} key 
     * @returns {Buffer} Encrypted buffer
     */
    encrypt(decrypted, key) {
        if (!Buffer.isBuffer(decrypted))
            throw new AesError("Argument 'encrypted' and 'key' must be a buffer!").m;

        if (typeof key === "string") {
            key = this.parseKey(key);
        };

        const iv = Buffer.alloc(this.BLOCK_SIZE);
        const algorithm = "aes-256-cbc";
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(decrypted);
        encrypted += cipher.final();

        encrypted = Buffer.from(encrypted, "binary").toString("base64");
        return Buffer.from(encrypted);
    };
};

module.exports = AES;
