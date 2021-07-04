"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aes = void 0;
const Exceptions_1 = require("../../exceptions/Exceptions");
const aes_js_1 = require("aes-js");
var ecb = aes_js_1.ModeOfOperation.ecb;
/**
 * Class to handle aes encryption
 */
class Aes {
    /**
     * Parses an aes key string
     * @param {string} key Key to parse
     * @returns {Buffer} Key as hex buffer
     * @public
     * @static
     */
    static parseKey(key) {
        const data = key.startsWith("0x") ? key.substring(2) : key;
        if (data.length !== 64)
            throw new Exceptions_1.InvalidAesKeyException("Given AES key is not properly formatted, needs to be exactly 32 bytes (64 characters) long");
        return Buffer.from(data, "hex");
    }
    /**
     * Decrypts a buffer
     * @param {Buffer} data Data to decrypt
     * @param {string} key Key to use for decryption
     * @returns {Buffer} Decrypted buffer
     * @public
     * @static
     */
    static decrypt(data, key) {
        const aesEcb = new ecb(key);
        return Buffer.from(aesEcb.decrypt(data));
    }
    /**
     * Encrypts a buffer
     * @param {Buffer} data Data to encrypt
     * @param {string} key Key to use for encryption
     * @returns {Buffer} Encrypted buffer
     * @public
     * @static
     */
    static encrypt(data, key) {
        const aesEcb = new ecb(key);
        return Buffer.from(aesEcb.encrypt(data));
    }
}
exports.Aes = Aes;
/**
 * Block size
 * @type {number}
 * @public
 * @static
 */
Aes.BLOCK_SIZE = 16;
