import { ParserException } from "../../exceptions/Exceptions";
import { FName } from "../objects/uobject/FName";
import { UnrealMap } from "../../util/UnrealMap";
import { VersionContainer } from "../versions/VersionContainer";

export abstract class FArchiveWriter {
    public versions = VersionContainer.DEFAULT

    public get game(): number {
        return this.versions.game
    }

    public set game(v: number) {
        this.versions.game = v
    }

    public get ver(): number {
        return this.versions.ver
    }

    public set ver(v: number) {
        this.versions.ver = v
    }

    abstract littleEndian: boolean

    abstract pos(): number

    abstract write(buffer: Buffer)
    abstract write(b: number)

    abstract printError(): string

    writeInt8(i: number) {
        const bf = Buffer.alloc(1)
        bf.writeInt8(i)
        this.write(bf)
    }

    writeUInt8(i: number) {
        const bf = Buffer.alloc(1)
        bf.writeUInt8(i)
        this.write(bf)
    }

    writeInt16(i: number) {
        const bf = Buffer.alloc(2)
        this.littleEndian ? bf.writeInt16LE(i) : bf.writeInt16BE(i)
        this.write(bf)
    }

    writeUInt16(i: number) {
        const bf = Buffer.alloc(2)
        this.littleEndian ? bf.writeUInt16LE(i) : bf.writeUInt16BE(i)
        this.write(bf)
    }

    writeInt32(i: number) {
        const bf = Buffer.alloc(4)
        this.littleEndian ? bf.writeInt32LE(i) : bf.writeInt32BE(i)
        this.write(bf)
    }

    writeUInt32(i: number) {
        const bf = Buffer.alloc(4)
        this.littleEndian ? bf.writeUInt32LE(i) : bf.writeUInt32BE(i)
        this.write(bf)
    }

    writeInt64(i: number | bigint) {
        const bf = Buffer.alloc(8)
        i = typeof i === "number" ? BigInt(i) : i
        this.littleEndian ? bf.writeBigInt64LE(i) : bf.writeBigInt64BE(i)
        this.write(bf)
    }

    writeUInt64(i: number | bigint) {
        const bf = Buffer.alloc(8)
        i = typeof i === "number" ? BigInt(i) : i
        this.littleEndian ? bf.writeBigUInt64LE(i) : bf.writeBigUInt64BE(i)
        this.write(bf)
    }

    writeFloat32(i: number) {
        const bf = Buffer.alloc(4)
        this.littleEndian ? bf.writeFloatLE(i) : bf.writeFloatBE(i)
        this.write(bf)
    }

    writeDouble(i: number) {
        const bf = Buffer.alloc(8)
        this.littleEndian ? bf.writeDoubleLE(i) : bf.writeDoubleBE(i)
        this.write(bf)
    }

    writeBoolean(i: boolean) {
        i ? this.writeInt32(1) : this.writeInt32(0)
    }

    writeFlag(i: boolean) {
        i ? this.writeInt8(1) : this.writeInt8(0)
    }

    writeString(i: string) {
        if (i.length < -65536 || i.length > 65536)
            throw new ParserException(`Invalid String length '${i.length}'`, this)
        if (i) {
            this.writeInt32(i.length + 1)
            this.write(Buffer.from(i))
            this.writeInt8(0)
        } else {
            this.writeInt32(0)
        }
    }

    writeFName(name: FName) {
    }

    writeTMapWithoutSize<K, V>(map: UnrealMap<K, V>, write: (key: K, value: V) => void) {
        map.forEach((v, k) => write(k, v))
    }

    writeTMap<K, V>(map: UnrealMap<K, V>, write: (key: K, value: V) => void) {
        this.writeInt32(map.size)
        this.writeTMapWithoutSize(map, write)
    }

    writeTArrayWithoutSize<T>(array: T[], write: (it: T) => void) {
        array.forEach((v) => write(v))
    }

    writeTArray<T>(array: T[], write: (it: T) => void) {
        this.writeInt32(array.length)
        this.writeTArrayWithoutSize(array, write)
    }
}