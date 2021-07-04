/// <reference types="node" />
/// <reference types="ref-napi" />
/**
 * Class to handle aes encryption
 */
export declare class Aes {
    /**
     * Block size
     * @type {number}
     * @public
     * @static
     */
    static BLOCK_SIZE: number;
    /**
     * Parses an aes key string
     * @param {string} key Key to parse
     * @returns {Buffer} Key as hex buffer
     * @public
     * @static
     */
    static parseKey(key: string): Buffer;
    /**
     * Decrypts a buffer
     * @param {Buffer} data Data to decrypt
     * @param {string} key Key to use for decryption
     * @returns {Buffer} Decrypted buffer
     * @public
     * @static
     */
    static decrypt(data: Buffer, key: Buffer): Buffer;
    /**
     * Encrypts a buffer
     * @param {Buffer} data Data to encrypt
     * @param {string} key Key to use for encryption
     * @returns {Buffer} Encrypted buffer
     * @public
     * @static
     */
    static encrypt(data: Buffer, key: Buffer): Buffer;
}
