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
        if (!Buffer.isBuffer(encrypted) || !Buffer.isBuffer(key))
            throw new AesError("Argument 'encrypted' and 'key' must be a buffer!");

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
        if (!Buffer.isBuffer(decrypted) || !Buffer.isBuffer(key))
            throw new AesError("Argument 'encrypted' and 'key' must be a buffer!").m;

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
