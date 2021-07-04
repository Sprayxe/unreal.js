"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFileArchive = void 0;
const fs = __importStar(require("fs"));
const FArchive_1 = require("./FArchive");
/**
 * File Reader
 * @extends {FArchive}
 */
class FFileArchive extends FArchive_1.FArchive {
    /**
     * Creates an instance
     * @param {string} path Path to the file
     * @constructor
     * @public
     */
    constructor(path) {
        super();
        this.path = path;
        this.handle = fs.openSync(path, "rs");
        this.stats = fs.fstatSync(this.handle);
    }
    /**
     * Size of the reader
     * @type {number}
     * @public
     */
    get size() {
        return this.stats.size;
    }
    /**
     * Reads a range of bytes
     * @param {number} begin Where to begin
     * @param {number} end Where to stop
     * @param {boolean} copy Whether to remove bytes from buffer
     */
    readRange(begin, end, copy = false) {
        const length = end - begin;
        const buffer = Buffer.allocUnsafe(length);
        fs.readSync(this.handle, buffer, 0, length, begin);
        return buffer;
    }
    /**
     * Reads an 8-bit integer
     * @returns {number} Result
     * @public
     */
    readInt8() {
        const data = this.readBuffer(1);
        return data.readInt8();
    }
    /**
     * Reads an unsigned 8-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt8() {
        const data = this.readBuffer(1);
        return data.readUInt8();
    }
    /**
     * Reads a 16-bit integer
     * @returns {number} Result
     * @public
     */
    readInt16() {
        const data = this.readBuffer(2);
        return this.littleEndian ? data.readInt16LE() : data.readInt16BE();
    }
    /**
     * Reads an unsigned 16-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt16() {
        const data = this.readBuffer(2);
        return this.littleEndian ? data.readUInt16LE() : data.readUInt16BE();
    }
    /**
     * Reads a 32-bit integer
     * @returns {number} Result
     * @public
     */
    readInt32() {
        const data = this.readBuffer(4);
        return this.littleEndian ? data.readInt32LE() : data.readInt32BE();
    }
    /**
     * Reads an unsigned 32-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt32() {
        const data = this.readBuffer(4);
        return this.littleEndian ? data.readUInt32LE() : data.readUInt32BE();
    }
    /**
     * Reads a 64-bit integer
     * @returns {number} Result
     * @public
     */
    readInt64() {
        const data = this.readBuffer(8);
        return this.littleEndian ? data.readBigInt64LE() : data.readBigInt64BE();
    }
    /**
     * Reads an unsigned 64-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt64() {
        const data = this.readBuffer(8);
        return this.littleEndian ? data.readBigUInt64LE() : data.readBigUInt64BE();
    }
    /**
     * Reads a float
     * @returns {number} Result
     * @public
     */
    readFloat32() {
        const data = this.readBuffer(4);
        return this.littleEndian ? data.readFloatLE() : data.readFloatBE();
    }
    /**
     * Reads a double
     * @returns {number} Result
     * @public
     */
    readDouble() {
        const data = this.readBuffer(8);
        return this.littleEndian ? data.readDoubleLE() : data.readDoubleBE();
    }
    /**
     * Returns FArchive info for error
     * @returns {string}
     * @public
     */
    printError() {
        return `FFileArchive Info: pos ${this.pos}, stopper ${this.size}, file ${this.path}`;
    }
}
exports.FFileArchive = FFileArchive;
