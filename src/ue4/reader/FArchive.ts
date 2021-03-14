import { GAME_UE4, GAME_UE4_GET_AR_VER, LATEST_SUPPORTED_UE4_VERSION } from "../versions/Game";
import Long from "long"
import { ParserException } from "../../exceptions/Exceptions";
import Collection from "@discordjs/collection";
import { FName } from "../objects/uobject/FName";

export class FArchive {
    data: Buffer
    constructor(param?: Buffer) {
        this.data = param || Buffer.alloc(0)
    }

    game = GAME_UE4(LATEST_SUPPORTED_UE4_VERSION)
    ver = GAME_UE4_GET_AR_VER(this.game)

    offset = 0
    useUnversionedPropertySerialization = false
    isFilterEditorOnly= true
    littleEndianAccessor: boolean

    get littleEndian() {
        return this.littleEndianAccessor
    }

    clone(): FArchive {
        return new FArchive(this.data)
    }

    size(): number {
        return this.data.length
    }

    pos(): number {
        return this.offset
    }

    readBuffer(size: number)
    readBuffer(buffer: Buffer)
    readBuffer(param: any): Buffer {
        if (Buffer.isBuffer(param)) {
            param.set(this.read(param.length - param.byteOffset))
            return param
        } else {
            const buffer = Buffer.alloc(param)
            this.read(buffer)
            return buffer
        }
    }

    skip(n: Long): number {
        this.offset += n.toInt()
        return this.offset
    }

    read()
    read(buffer: Buffer)
    read(size: number): Buffer
    read(param?: any): Buffer | number {
        if (param) {
            if (Buffer.isBuffer(param)) {
                this.read(param)
                return param
            } else {
                const out = this.data.slice(this.offset, this.offset + param)
                this.offset += param
                return out
            }
        } else {
            if (this.offset === this.data.length) {
                return -1
            } else {
                return this.data[this.offset] & 0xFF
            }
        }
    }

    seek(v: number) {
        return this.offset = v
    }

    isAtStopper() {
        return this.pos() === this.size()
    }

    readInt8() {
        const localOffset = this.offset
        this.offset += 1
        return this.data.readInt8(localOffset)
    }

    readUInt8() {
        const localOffset = this.offset
        this.offset += 1
        return this.data.readUInt8(localOffset)
    }

    readInt16() {
        const localOffset = this.offset
        this.offset += 2
        return this.littleEndian ? this.data.readInt16LE(localOffset) : this.data.readInt16BE(localOffset)
    }

    readUInt16() {
        const localOffset = this.offset
        this.offset += 2
        return this.littleEndian ? this.data.readUInt16LE(localOffset) : this.data.readUInt16BE(localOffset)
    }

    readInt32() {
        const localOffset = this.offset
        this.offset += 4
        return this.littleEndian ? this.data.readInt32LE(localOffset) : this.data.readInt32BE(localOffset)
    }

    readUInt32() {
        const localOffset = this.offset
        this.offset += 4
        return this.littleEndian ? this.data.readUInt32LE(localOffset) : this.data.readUInt32BE(localOffset)
    }

    readInt64() {
        const localOffset = this.offset
        this.offset += 8
        return this.littleEndian ? this.data.readBigInt64LE(localOffset) : this.data.readBigInt64BE(localOffset)
    }

    readUInt64() {
        const localOffset = this.offset
        this.offset += 8
        return this.littleEndian ? this.data.readBigUInt64LE(localOffset) : this.data.readBigUInt64BE(localOffset)
    }

    readFloat16() {
        const localOffset = this.offset
        this.offset += 2
        return this.littleEndian ? this.data.readFloatLE(localOffset) : this.data.readFloatBE(localOffset)
    }

    readFloat32() {
        const localOffset = this.offset
        this.offset += 4
        return this.littleEndian ? this.data.readFloatLE(localOffset) : this.data.readFloatBE(localOffset)
    }

    readDouble() {
        const localOffset = this.offset
        this.offset += 8
        return this.littleEndian ? this.data.readDoubleLE(localOffset) : this.data.readDoubleBE(localOffset)
    }

    readBoolean() {
        const int = this.readInt32();
        if (int !== 0 && int !== 1)
            throw ParserException(`Invalid boolean value (${int})`)
        return int !== 0
    }

    readFlag() {
        const int = this.readUInt8()
        if (int !== 0 && int !== 1)
            throw ParserException(`Invalid boolean value (${int})`)
        return int !== 0
    }

    readString() {
        const length = this.readInt32();
        if (length < -65536 || length > 65536)
            throw ParserException(`Invalid String length '${length}'`)

        if (length < 0) {
            const utf16length = -length
            const dat = new Array(utf16length - 1).push(this.readUInt16())
            if (this.readUInt16() !== 0)
                throw ParserException("Serialized FString is not null-terminated")

            return dat.toString().slice(0, utf16length - 1)
        } else {
            if (length === 0) return ""
            const str = this.readBuffer(length - 1).toString("utf-8")
            if (this.readUInt8() !== 0)
                throw ParserException("Serialized FString is not null-terminated")
            return str
        }
    }

    readArray<T>(init: (FArchive) => T) {
        return init(this)
    }

    readTArray<T>(init: (number) => T) {
        return new Array(init(this.readInt32()))
    }

    readTMap<K, V>(length: number = this.readInt32(), init: (FArchive) => Pair<K, V>): Collection<K, V> {
        const res = new Collection<K, V>()
        let i = 0
        while (i < length) {
            const { key, value } = init(this)
            res.set(key, value)
            ++i
        }
        return res
    }

    readFName() {
        return FName.NAME_None
    }
}

interface Pair<K, V> {
    key: K
    value: V
}

