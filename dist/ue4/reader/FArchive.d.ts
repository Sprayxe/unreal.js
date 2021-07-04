/// <reference types="node" />
/// <reference types="ref-napi" />
import { FName } from "../objects/uobject/FName";
import { UnrealMap } from "../../util/UnrealMap";
/**
 * UE4 Reader
 */
export declare class FArchive {
    /**
     * Stores the buffer data
     * @type {Buffer}
     * @public
     */
    data: Buffer;
    /**
     * Creates an instance
     * @param {Buffer} data Buffer to read
     * @constructor
     * @public
     */
    constructor(data?: Buffer);
    /**
     * Game that is used with this reader
     * @type {number}
     * @public
     */
    game: number;
    /**
     * Version that is used with this reader
     * @type {number}
     * @public
     */
    ver: number;
    /**
     * Position of the reader
     * @type {number}
     * @protected
     */
    protected position: number;
    /**
     * Whether to use unversioned property serialization (DO NOT OVERRIDE THIS)
     * @type {boolean}
     * @public
     */
    useUnversionedPropertySerialization: boolean;
    /**
     * Whether if this is a filter editor
     * @type {boolean}
     * @public
     */
    isFilterEditorOnly: boolean;
    /**
     * Whether to use little endian
     * @type {boolean}
     * @public
     */
    littleEndian: boolean;
    /**
     * Current position
     * @type {number}
     * @public
     */
    get pos(): number;
    set pos(v: number);
    /**
     * Returns this reader's size
     * @type {number}
     * @public
     */
    get size(): number;
    /**
     * Whether if this reader is the the end
     * @type {boolean}
     * @public
     */
    get isAtStopper(): boolean;
    /**
     * Copies to a buffer
     * @param {Buffer} b Destination
     * @param {number} off Offset
     * @param {number} len Length
     * @returns {void}
     * @public
     */
    readToBuffer(b: Buffer, off?: number, len?: number): void;
    /**
     * Reads an amount of bytes and returns them
     * @param {number} num Amount to read
     * @param {boolean} copy Whether to remove these bytes from the reader's buffer (default: false)
     * @returns {Buffer} Read bytes
     * @public
     */
    readBuffer(num: number, copy?: boolean): Buffer;
    /**
     * Reads a range of bytes and returns them
     * @param {number} begin Where to begin
     * @param {number} end Where to end
     * @param {boolean} copy Whether to remove these bytes from the reader's buffer (default: false)
     * @returns {Buffer} Read bytes
     * @public
     */
    readRange(begin: number, end: number, copy?: boolean): Buffer;
    /**
     * Reads an 8-bit integer
     * @returns {number} Result
     * @public
     */
    readInt8(): number;
    /**
     * Reads an unsigned 8-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt8(): number;
    /**
     * Reads a 16-bit integer
     * @returns {number} Result
     * @public
     */
    readInt16(): number;
    /**
     * Reads an unsigned 16-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt16(): number;
    /**
     * Reads a 32-bit integer
     * @returns {number} Result
     * @public
     */
    readInt32(): number;
    /**
     * Reads an unsigned 32-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt32(): number;
    /**
     * Reads a 64-bit integer
     * @returns {bigint} Result
     * @public
     */
    readInt64(): bigint;
    /**
     * Reads an unsigned 64-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt64(): bigint;
    /**
     * Reads a float
     * @returns {number} Result
     * @public
     */
    readFloat32(): number;
    /**
     * Reads a double
     * @returns {number} Result
     * @public
     */
    readDouble(): number;
    /**
     * Reads a boolean
     * @returns {boolean} Result
     * @public
     */
    readBoolean(): boolean;
    /**
     * Reads a flag
     * @returns {boolean} Result
     * @public
     */
    readFlag(): boolean;
    /**
     * Reads a FString
     * @returns {string} Result
     * @public
     */
    readString(): string;
    /**
     * Reads an array
     * @param {any} init Callable method for array entries
     * @param {number} length Length to read
     * @returns {Array<any>} Result
     * @example readArray((index) => new Class(index))
     * @example readArray((index) => new Class(index), 69420)
     * @public
     */
    readArray<T>(init: (index: number) => T, length?: number): T[];
    /**
     * Reads a map
     * @param {number} length Length to read
     * @param {any} init Callable method for map entries
     * @returns {UnrealMap<any, any>} Result
     * @example readTMap(null, (Ar) => { return { key: Ar.readFName(), value: Ar.readObject() } })
     * @example readTMap(69420, (Ar) => { return { key: Ar.readFName(), value: Ar.readObject() } })
     * @public
     */
    readTMap<K, V>(length: number, init: (it: FArchive) => Pair<K, V>): UnrealMap<K, V>;
    /**
     * Reads FName
     * @returns {FName}
     * @public
     */
    readFName(): FName;
    /**
     * Returns FArchive info for error
     * @returns {string}
     * @public
     */
    printError(): string;
}
export interface Pair<K, V> {
    key: K;
    value: V;
}
