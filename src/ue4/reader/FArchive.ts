import { ParserException } from "../../exceptions/Exceptions";
import { FName } from "../objects/uobject/FName";
import { VersionContainer } from "../versions/VersionContainer";
import { FGuid } from "../objects/core/misc/Guid";

/**
 * Generic UE4 Reader
 * @abstract
 */
export abstract class FArchive {
    protected constructor(versions: VersionContainer = VersionContainer.DEFAULT) {
        this.versions = versions
    }

    /**
     * Contains versions
     * @type {VersionContainer}
     * @public
     */
    public versions: VersionContainer

    /**
     * Game that is used with this reader
     * @type {number}
     * @public
     */
    public get game(): number {
        return this.versions.game
    }

    public set game(v: number) {
        this.versions.game = v
    }

    /**
     * Version that is used with this reader
     * @type {number}
     * @public
     */
    public get ver(): number {
        return this.versions.ver
    }

    public set ver(v: number) {
        this.versions.ver = v
    }

    /**
     * Whether tagged property serialization is replaced by faster unversioned serialization
     * This assumes writer and reader share the same property definitions
     * @type {boolean}
     * @public
     */
    public useUnversionedPropertySerialization = false

    /**
     * Whether editor only properties are being filtered from the archive (or has been filtered)
     * @type {boolean}
     * @public
     */
    public isFilterEditorOnly = false

    /**
     * Whether to use little endian order
     * @type {boolean}
     * @public
     * @abstract
     */
    public abstract littleEndian: boolean

    /**
     * Clones this
     * @returns {FArchive} Clone
     * @public
     * @abstract
     */
    public abstract clone(): FArchive

    /**
     * Size of data
     * @type {number}
     * @public
     * @abstract
     */
    public abstract get size(): number

    /**
     * Current position
     * @type {number}
     * @public
     * @abstract
     */
    public abstract get pos(): number
    public abstract set pos(pos: number)

    /**
     * Reads to a buffer
     * @param {Buffer} b Destination
     * @param {number} off Offset
     * @param {number} len Length
     * @returns {void}
     * @public
     * @abstract
     */
    public abstract readToBuffer(b: Buffer, off?: number, len?: number): void

    /**
     * Reads an amount of bytes and returns them
     * @param {number} size Amount to read
     * @returns {Buffer} Read bytes or a byte if size not provided
     * @public
     * @abstract
     */
    public read(size: number): Buffer {
        const res = Buffer.alloc(size)
        this.readToBuffer(res)
        return res
    }

    /**
     * Reads an 8-bit integer
     * @returns {number} Result
     * @public
     */
    public readInt8(): number {
        return this.read(1).readInt8()
    }

    /**
     * Reads an unsigned 8-bit integer
     * @returns {number} Result
     * @public
     */
    public readUInt8(): number {
        return this.read(1).readUInt8()
    }

    /**
     * Reads a 16-bit integer
     * @returns {number} Result
     * @public
     */
    public readInt16(): number {
        const b = this.read(2)
        return this.littleEndian
            ? b.readInt16LE()
            : b.readInt16BE()
    }

    /**
     * Reads an unsigned 16-bit integer
     * @returns {number} Result
     * @public
     */
    public readUInt16(): number {
        const b = this.read(2)
        return this.littleEndian
            ? b.readUInt16LE()
            : b.readUInt16BE()
    }

    /**
     * Reads a 32-bit integer
     * @returns {number} Result
     * @public
     */
    public readInt32(): number {
        const b = this.read(4)
        return this.littleEndian
            ? b.readInt32LE()
            : b.readInt32BE()
    }

    /**
     * Reads an unsigned 32-bit integer
     * @returns {number} Result
     * @public
     */
    public readUInt32(): number {
        const b = this.read(4)
        return this.littleEndian
            ? b.readUInt32LE()
            : b.readUInt32BE()
    }

    /**
     * Reads a 64-bit integer
     * @returns {bigint} Result
     * @public
     */
    public readInt64(): bigint {
        const b = this.read(8)
        return this.littleEndian
            ? b.readBigInt64LE()
            : b.readBigInt64BE()
    }

    /**
     * Reads an unsigned 64-bit integer
     * @returns {bigint} Result
     * @public
     */
    public readUInt64(): bigint {
        const b = this.read(8)
        return this.littleEndian
            ? b.readBigUInt64LE()
            : b.readBigUInt64BE()
    }

    /**
     * Reads bits
     * @param {Buffer} b Buffer to read
     * @param {number} offBytes Offset to use
     * @param {number} lenBits Amount of bits to read
     * @returns {void}
     * @public
     */
    public readBits(b: Buffer, offBytes: number, lenBits: number): void {
        this.readToBuffer(b, offBytes, (lenBits + 7) / 8)
        if (lenBits % 8) {
            b[offBytes + lenBits / 8] = b[offBytes + lenBits / 8] & (1 << (lenBits & 7)) - 1
        }
    }

    /**
     * Reads a 32-bit float
     * @returns {number} Result
     * @public
     */
    public readFloat32(): number {
        const b = this.read(4)
        return this.littleEndian
            ? b.readFloatLE()
            : b.readFloatBE()
    }

    /**
     * Reads a double
     * @returns {number} Result
     * @public
     */
    public readDouble(): number {
        const b = this.read(8)
        return this.littleEndian
            ? b.readDoubleLE()
            : b.readDoubleBE()
    }

    /**
     * Reads a boolean
     * @returns {boolean} Result
     * @public
     */
    public readBoolean(): boolean {
        const int = this.readInt32()
        if (int !== 0 && int !== 1)
            throw new ParserException(`Invalid boolean value (${int})`, this)
        return int !== 0
    }

    /**
     * Reads a flag
     * @returns {boolean} Result
     * @public
     */
    public readFlag(): boolean {
        const int = this.readUInt8()
        if (int !== 0 && int !== 1)
            throw new ParserException(`Invalid boolean value (${int})`, this)
        return int !== 0
    }

    /**
     * Reads 32-bit int packed
     * @returns {number} Int
     * @public
     */
    public readIntPacked(): number {
        let value = 0
        let cnt = 0
        let more = true
        while (more) {
            let nextByte = this.readUInt8()
            more = (nextByte & 1) != 0         // Check 1 bit to see if theres more after this
            nextByte = nextByte >> 1           // Shift to get actual 7 bit value
            value += nextByte << (7 * cnt++)  // Add to total value
        }
        return value
    }

    /**
     * Reads a FString
     * @returns {string} Result
     * @public
     */
    public readString(): string {
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
            const str = this.read(length - 1).toString("utf-8")
            if (this.readUInt8() !== 0)
                throw new ParserException("Serialized FString is not null-terminated", this)
            return str
        }
    }

    /**
     * Reads FName
     * @returns {FName}
     * @public
     */
    public readFName(): FName {
        return FName.NAME_None
    }

    /**
     * Gets a custom version from guid
     * @param {FGuid} guid GUID of version to look for
     * @returns {number} Custom version
     */
    public customVersion(guid: FGuid): number {
        const ver = this.versions.customVersions
            ?.find(it => it.key.equals(guid))?.version
        return ver == null ? -1 : ver // '||' would replace 0 with -1, so check for null
    }

    /**
     * Reads a bulk array using the given callback
     * NOTICE: Lambdas usually decrease performance
     * @param {any} init Callback method to use for initiating array entries
     * @returns {any[]} Read array
     * @public
     */
    public readBulkArray<T>(init: (index: number) => T): T[] {
        const elementSize = this.readInt32()
        const elementCount = this.readInt32()
        const savePos = this.pos

        const array = new Array(elementCount)
        for (let i = 0; i < elementCount; ++i)
            array[i] = init(i)

        if (this.pos != savePos + array.length * elementSize)
            throw new ParserException(`RawArray item size mismatch: expected ${elementSize}, serialized ${(this.pos - savePos) / array.length}`)

        return array
    }

    /**
     * Reads a bulk array of bytes
     * NOTICE: Lambdas usually decrease performance
     * @returns {Buffer} Read Bytes
     * @see {readBulkArray}
     * @public
     */
    public readBulkByteArray(): Buffer {
        const elemSize = this.readInt32()
        const elemCount = this.readInt32()
        return this.read(elemCount)
    }

    /**
     * Returns FArchive info for error
     * @returns {string}
     * @public
     * @abstract
     */
    public abstract printError(): string
}