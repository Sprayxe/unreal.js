import { GAME_UE4, GAME_UE4_GET_AR_VER, LATEST_SUPPORTED_UE4_VERSION } from "../versions/Game";
import Long from "long"
import { ParserException } from "../../exceptions/Exceptions";
import Collection from "@discordjs/collection";

export class FArchive {
    data: Buffer
    constructor(param?: Buffer) {
        this.data = param || Buffer.from(null)
    }

    game = GAME_UE4(LATEST_SUPPORTED_UE4_VERSION)
    ver = GAME_UE4_GET_AR_VER(this.game)

    offset = Long.ZERO
    useUnversionedPropertySerialization = false
    isFilterEditorOnly= true
    littleEndian: boolean

    clone(): FArchive {
        return new FArchive(this.data)
    }

    seek(pos: number) {
        return this.read(pos)
    }

    size(): number {
        return this.data.length
    }

    pos(): number {
        return this.data.byteOffset
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

    skip(n: Long): Long {
        this.offset = new Long(this.offset.toInt() + n.toInt())
        return this.offset
    }

    printError(e: string): string {
        console.log(`[ParserException] ${e}`)
        return e
    }

    read(buffer: Buffer)
    read(size: number): Buffer
    read(param: any): Buffer {
        if (Buffer.isBuffer(param)) {
            this.read(param)
            return param
        } else {
            const out = this.data.slice(this.offset.toInt(), this.offset + param)
            this.offset += param
            return out
        }
    }

    isAtStopper() {
        return this.pos() === this.size()
    }

    readInt8() {
        const localOffset = this.offset.toInt()
        this.offset = new Long(this.offset.toInt() + 1)
        return this.data.readInt8(localOffset)
    }

    readUInt8() {
        const localOffset = this.offset.toInt()
        this.offset = new Long(this.offset.toInt() + 1)
        return this.data.readUInt8(localOffset)
    }

    readInt16() {
        const localOffset = this.offset.toInt()
        this.offset = new Long(this.offset.toInt() + 2)
        return this.littleEndian ? this.data.readInt16LE(localOffset) : this.data.readInt16BE(localOffset)
    }

    readUInt16() {
        const localOffset = this.offset.toInt()
        this.offset = new Long(this.offset.toInt() + 2)
        return this.littleEndian ? this.data.readUInt16LE(localOffset) : this.data.readUInt16BE(localOffset)
    }

    readInt32() {
        const localOffset = this.offset.toInt()
        this.offset = new Long(this.offset.toInt() + 4)
        return this.littleEndian ? this.data.readInt32LE(localOffset) : this.data.readInt32BE(localOffset)
    }

    readUInt32() {
        const localOffset = this.offset.toInt()
        this.offset = new Long(this.offset.toInt() + 4)
        return this.littleEndian ? this.data.readUInt32LE(localOffset) : this.data.readUInt32BE(localOffset)
    }

    readInt64() {
        const localOffset = this.offset.toInt()
        this.offset = new Long(this.offset.toInt() + 8)
        return this.littleEndian ? this.data.readBigInt64LE(localOffset) : this.data.readBigInt64BE(localOffset)
    }

    readUInt64() {
        const localOffset = this.offset.toInt()
        this.offset = new Long(this.offset.toInt() + 8)
        return this.littleEndian ? this.data.readBigUInt64LE(localOffset) : this.data.readBigUInt64BE(localOffset)
    }

    readFloat16() {
        const localOffset = this.offset.toInt()
        this.offset = new Long(this.offset.toInt() + 2)
        return this.littleEndian ? this.data.readFloatLE(localOffset) : this.data.readFloatBE(localOffset)
    }

    readFloat32() {
        const localOffset = this.offset.toInt()
        this.offset = new Long(this.offset.toInt() + 4)
        return this.littleEndian ? this.data.readFloatLE(localOffset) : this.data.readFloatBE(localOffset)
    }

    readDouble() {
        const localOffset = this.offset.toInt()
        this.offset = new Long(this.offset.toInt() + 8)
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
}

