import { InvalidAesKeyException } from "../../exceptions/Exceptions";
import { ModeOfOperation } from "aes-js";
import ecb = ModeOfOperation.ecb;

/**
 * Class to handle aes encryption
 */
export class Aes {
    /**
     * Block size
     * @type {number}
     * @public
     * @static
     */
    static BLOCK_SIZE: number = 16

    /**
     * Parses an aes key string
     * @param {string} key Key to parse
     * @returns {Buffer} Key as hex buffer
     * @public
     * @static
     */
    static parseKey(key: string): Buffer {
        const data = key.startsWith("0x") ? key.substring(2) : key
        if (data.length !== 64)
            throw new InvalidAesKeyException("Given AES key is not properly formatted, needs to be exactly 32 bytes (64 characters) long")
        return Buffer.from(data, "hex")
    }

    /**
     * Decrypts a buffer
     * @param {Buffer} data Data to decrypt
     * @param {string} key Key to use for decryption
     * @returns {Buffer} Decrypted buffer
     * @public
     * @static
     */
    static decrypt(data: Buffer, key: Buffer): Buffer {
        const aesEcb = new ecb(key)
        return Buffer.from(aesEcb.decrypt(data))
    }

    /**
     * Encrypts a buffer
     * @param {Buffer} data Data to encrypt
     * @param {string} key Key to use for encryption
     * @returns {Buffer} Encrypted buffer
     * @public
     * @static
     */
    static encrypt(data: Buffer, key: Buffer): Buffer {
        const aesEcb = new ecb(key)
        return Buffer.from(aesEcb.encrypt(data))
    }
}