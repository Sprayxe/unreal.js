import { ParserException } from "../../exceptions/Exceptions";
import { FName } from "../objects/uobject/FName";
import { UnrealMap } from "../../util/UnrealMap";
import { Game } from "../versions/Game";

/**
 * UE4 Reader
 */
export class FArchive {
    /**
     * Stores the buffer data
     * @type {Buffer}
     * @public
     */
    data: Buffer // TODO please keep this in FByteArchive

    /**
     * Creates an instance
     * @param {Buffer} data Buffer to read
     * @constructor
     * @public
     */
    constructor(data?: Buffer) {
        this.data = data || Buffer.alloc(0)
    }

    /**
     * Game that is used with this reader
     * @type {number}
     * @public
     */
    game = Game.GAME_UE4(Game.LATEST_SUPPORTED_UE4_VERSION)

    /**
     * Version that is used with this reader
     * @type {number}
     * @public
     */
    ver = Game.GAME_UE4_GET_AR_VER(this.game)

    /**
     * Position of the reader
     * @type {number}
     * @protected
     */
    protected position = 0

    /**
     * Whether to use unversioned property serialization (DO NOT OVERRIDE THIS)
     * @type {boolean}
     * @public
     */
    useUnversionedPropertySerialization = false

    /**
     * Whether if this is a filter editor
     * @type {boolean}
     * @public
     */
    isFilterEditorOnly = true

    /**
     * Whether to use little endian
     * @type {boolean}
     * @public
     */
    littleEndian = true

    /**
     * Current position
     * @type {number}
     * @public
     */
    get pos(): number {
        return this.position
    }

    set pos(v: number) {
        this.position = v
    }

    /**
     * Returns this reader's size
     * @type {number}
     * @public
     */
    get size(): number {
        return this.data.length
    }

    /**
     * Whether if this reader is the the end
     * @type {boolean}
     * @public
     */
    get isAtStopper(): boolean {
        return this.pos >= this.size
    }

    /**
     * Copies to a buffer
     * @param {Buffer} b Destination
     * @param {number} off Offset
     * @param {number} len Length
     * @returns {void}
     * @public
     */
    readToBuffer(b: Buffer, off: number = 0, len: number = b.length): void {
        this.data.copy(b, off, this.position, this.position += len)
    }

    /**
     * Reads an amount of bytes and returns them
     * @param {number} num Amount to read
     * @param {boolean} copy Whether to remove these bytes from the reader's buffer (default: false)
     * @returns {Buffer} Read bytes
     * @public
     */
    readBuffer(num: number, copy: boolean = false): Buffer {
        return this.readRange(this.position, this.position += num, copy)
    }

    /**
     * Reads a range of bytes and returns them
     * @param {number} begin Where to begin
     * @param {number} end Where to end
     * @param {boolean} copy Whether to remove these bytes from the reader's buffer (default: false)
     * @returns {Buffer} Read bytes
     * @public
     */
    readRange(begin: number, end: number, copy: boolean = false): Buffer {
        if (copy) {
            return this.data.slice(begin, end)
        } else {
            return this.data.subarray(begin, end)
        }
    }

    /**
     * Reads an 8-bit integer
     * @returns {number} Result
     * @public
     */
    readInt8(): number {
        const localPos = this.position
        this.position += 1
        return this.data.readInt8(localPos)
    }

    /**
     * Reads an unsigned 8-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt8(): number {
        const localPos = this.position
        this.position += 1
        return this.data.readUInt8(localPos)
    }

    /**
     * Reads a 16-bit integer
     * @returns {number} Result
     * @public
     */
    readInt16(): number {
        const localPos = this.position
        this.position += 2
        return this.littleEndian ? this.data.readInt16LE(localPos) : this.data.readInt16BE(localPos)
    }

    /**
     * Reads an unsigned 16-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt16(): number {
        const localPos = this.position
        this.position += 2
        return this.littleEndian ? this.data.readUInt16LE(localPos) : this.data.readUInt16BE(localPos)
    }

    /**
     * Reads a 32-bit integer
     * @returns {number} Result
     * @public
     */
    readInt32(): number {
        const localPos = this.position
        this.position += 4
        return this.littleEndian ? this.data.readInt32LE(localPos) : this.data.readInt32BE(localPos)
    }

    /**
     * Reads an unsigned 32-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt32(): number {
        const localPos = this.position
        this.position += 4
        return this.littleEndian ? this.data.readUInt32LE(localPos) : this.data.readUInt32BE(localPos)
    }

    /**
     * Reads a 64-bit integer
     * @returns {bigint} Result
     * @public
     */
    readInt64(): bigint {
        const localPos = this.position
        this.position += 8
        return this.littleEndian ? this.data.readBigInt64LE(localPos) : this.data.readBigInt64BE(localPos)
    }

    /**
     * Reads an unsigned 64-bit integer
     * @returns {number} Result
     * @public
     */
    readUInt64(): bigint {
        const localPos = this.position
        this.position += 8
        return this.littleEndian ? this.data.readBigUInt64LE(localPos) : this.data.readBigUInt64BE(localPos)
    }

    /**
     * Reads a float
     * @returns {number} Result
     * @public
     */
    readFloat32(): number {
        const localPos = this.position
        this.position += 4
        return this.littleEndian ? this.data.readFloatLE(localPos) : this.data.readFloatBE(localPos)
    }

    /**
     * Reads a double
     * @returns {number} Result
     * @public
     */
    readDouble(): number {
        const localPos = this.position
        this.position += 8
        return this.littleEndian ? this.data.readDoubleLE(localPos) : this.data.readDoubleBE(localPos)
    }

    /**
     * Reads a boolean
     * @returns {boolean} Result
     * @public
     */
    readBoolean(): boolean {
        const int = this.readInt32();
        if (int !== 0 && int !== 1)
            throw new ParserException(`Invalid boolean value (${int})`, this)
        return int !== 0
    }

    /**
     * Reads a flag
     * @returns {boolean} Result
     * @public
     */
    readFlag(): boolean {
        const int = this.readUInt8()
        if (int !== 0 && int !== 1)
            throw new ParserException(`Invalid boolean value (${int})`, this)
        return int !== 0
    }

    /**
     * Reads a FString
     * @returns {string} Result
     * @public
     */
    readString(): string {
        const length = this.readInt32()
        if (length < -65536 || length > 65536)
            throw new ParserException(`Invalid String length '${length}'`, this)
        if (length < 0) {
            const utf16length = -length
            const arrLength = utf16length - 1
            const dat = []
            for (let i = 0; i < arrLength; ++i)
                dat.push(this.readUInt16())
            if (this.readUInt16() !== 0)
                throw new ParserException("Serialized FString is not null-terminated", this)
            return String(Buffer.from(dat))
        } else {
            if (length === 0) return ""
            const str = this.readBuffer(length - 1).toString("utf-8")
            if (this.readUInt8() !== 0)
                throw new ParserException("Serialized FString is not null-terminated", this)
            return str
        }
    }

    /**
     * Reads an array
     * @param {any} init Callable method for array entries
     * @param {number} length Length to read
     * @returns {Array<any>} Result
     * @example readArray((index) => new Class(index))
     * @example readArray((index) => new Class(index), 69420)
     * @public
     */
    readArray<T>(init: (index: number) => T, length?: number): T[] {
        const num = length != null ? length : this.readInt32()
        const array = new Array(num)
        for (let i = 0; i < num; i++) {
            array[i] = init(i)
        }
        return array
    }

    /**
     * Reads a map
     * @param {number} length Length to read
     * @param {any} init Callable method for map entries
     * @returns {UnrealMap<any, any>} Result
     * @example readTMap(null, (Ar) => { return { key: Ar.readFName(), value: Ar.readObject() } })
     * @example readTMap(69420, (Ar) => { return { key: Ar.readFName(), value: Ar.readObject() } })
     * @public
     */
    readTMap<K, V>(length: number = this.readInt32(), init: (it: FArchive) => Pair<K, V>): UnrealMap<K, V> {
        if (length == null) length = this.readInt32()
        const map = new UnrealMap<K, V>()
        for (let i = 0; i < length; ++i) {
            const {key, value} = init(this)
            map.set(key, value)
        }
        return map
    }

    /**
     * Reads FName
     * @returns {FName}
     * @public
     */
    readFName(): FName {
        return FName.NAME_None
    }

    /**
     * Returns FArchive info for error
     * @returns {string}
     * @public
     */
    printError(): string {
        return `FArchive Info: pos ${this.position}, stopper ${this.size}`
    }
}

export interface Pair<K, V> {
    key: K
    value: V
}

