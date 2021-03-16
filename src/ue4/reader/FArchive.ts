import { GAME_UE4, GAME_UE4_GET_AR_VER, LATEST_SUPPORTED_UE4_VERSION } from "../versions/Game";
import { ParserException } from "../../exceptions/Exceptions";
import Collection from "@discordjs/collection";
import { FName } from "../objects/uobject/FName";

export class FArchive {
    data: Buffer // TODO please keep this in FByteArchive

    constructor(param?: Buffer) {
        this.data = param || Buffer.alloc(0)
    }

    game = GAME_UE4(LATEST_SUPPORTED_UE4_VERSION)
    ver = GAME_UE4_GET_AR_VER(this.game)

    protected position = 0
    useUnversionedPropertySerialization = false
    isFilterEditorOnly = true
    littleEndian = true

    clone(): FArchive {
        let clone = new FArchive(this.data);
        clone.position = this.position
        clone.littleEndian = this.littleEndian
        return clone
    }

    get pos() { return this.position }

    set pos(v: number) { this.position = v }

    get size() { return this.data.length }

    isAtStopper() { return this.pos >= this.size }

    read()
    read(buffer: Buffer)
    read(size: number): Buffer
    read(param?: any): Buffer | number {
        if (param) {
            if (Buffer.isBuffer(param)) { // read(Buffer)
                this.data.copy(param, 0, this.position, this.position += param.length)
                return param.length
            } else { // read(number)
                return this.data.slice(this.position, this.position += param)
            }
        } else { // read()
            return this.isAtStopper() ? -1 : this.data[this.position++] & 0xFF;
        }
    }

    readInt8() {
        const localPos = this.position
        this.position += 1
        return this.data.readInt8(localPos)
    }

    readUInt8() {
        const localPos = this.position
        this.position += 1
        return this.data.readUInt8(localPos)
    }

    readInt16() {
        const localPos = this.position
        this.position += 2
        return this.littleEndian ? this.data.readInt16LE(localPos) : this.data.readInt16BE(localPos)
    }

    readUInt16() {
        const localPos = this.position
        this.position += 2
        return this.littleEndian ? this.data.readUInt16LE(localPos) : this.data.readUInt16BE(localPos)
    }

    readInt32() {
        const localPos = this.position
        this.position += 4
        return this.littleEndian ? this.data.readInt32LE(localPos) : this.data.readInt32BE(localPos)
    }

    readUInt32() {
        const localPos = this.position
        this.position += 4
        return this.littleEndian ? this.data.readUInt32LE(localPos) : this.data.readUInt32BE(localPos)
    }

    readInt64() {
        const localPos = this.position
        this.position += 8
        return this.littleEndian ? this.data.readBigInt64LE(localPos) : this.data.readBigInt64BE(localPos)
    }

    readUInt64() {
        const localPos = this.position
        this.position += 8
        return this.littleEndian ? this.data.readBigUInt64LE(localPos) : this.data.readBigUInt64BE(localPos)
    }

    readFloat16() {
        const localPos = this.position
        this.position += 2
        return this.littleEndian ? this.data.readFloatLE(localPos) : this.data.readFloatBE(localPos)
    }

    readFloat32() {
        const localPos = this.position
        this.position += 4
        return this.littleEndian ? this.data.readFloatLE(localPos) : this.data.readFloatBE(localPos)
    }

    readDouble() {
        const localPos = this.position
        this.position += 8
        return this.littleEndian ? this.data.readDoubleLE(localPos) : this.data.readDoubleBE(localPos)
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
            const str = this.read(length - 1).toString("utf-8")
            if (this.readUInt8() !== 0)
                throw ParserException("Serialized FString is not null-terminated")
            return str
        }
    }

    readArray<T>(init: (index) => T): T[] {
        const num = this.readInt32();
        const array = new Array(num);
        for (let i = 0; i < num; i++) {
            array[i] = init(i);
        }
        return array;
    }

    readTMap<K, V>(length: number = this.readInt32(), init: (FArchive) => Pair<K, V>): Collection<K, V> {
        const map = new Collection<K, V>()
        let i = 0
        while (i < length) {
            const { key, value } = init(this)
            map.set(key, value)
            ++i
        }
        return map
    }

    readFName() {
        return FName.NAME_None
    }
}

interface Pair<K, V> {
    key: K
    value: V
}

