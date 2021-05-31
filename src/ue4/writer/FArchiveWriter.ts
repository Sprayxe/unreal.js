import { ParserException } from "../../exceptions/Exceptions";
import { FName } from "../objects/uobject/FName";
import { UnrealMap } from "../../util/UnrealMap";
import { Game } from "../versions/Game";

// lol fix this, its shit lmfaoo
export abstract class FArchiveWriter {
    game = Game.GAME_UE4(Game.LATEST_SUPPORTED_UE4_VERSION)
    ver = Game.GAME_UE4_GET_AR_VER(this.game)
    abstract littleEndian: boolean
    abstract pos(): number

    abstract write(buffer: Buffer)
    abstract write(b: number)

    abstract printError(): string

    writeInt8(i: number) {
        this.write(Buffer.from([i]))
    }
    writeUInt8(i: number) {
        this.write(i)
    }

    writeInt16(i: number) {
        const bf = Buffer.alloc(2)
        bf.set([i])
        this.write(bf)
    }
    writeUInt16(i: number) {
        this.writeInt16(i)
    }

    writeInt32(i : number) {
        const bf = Buffer.alloc(4)
        bf.set([i])
        this.write(bf)
    }
    writeUInt32(i: number) {
        this.writeInt32(i)
    }

    writeInt64(i : number) {
        const bf = Buffer.alloc(8)
        bf.set([i])
        this.write(bf)
    }
    writeUInt64(i: number) {
        this.writeInt64(i)
    }

    writeFloat32(i : number) {
        const bf = Buffer.alloc(4)
        bf.set([i])
        this.write(bf)
    }

    writeDouble(i : number) {
        const bf = Buffer.alloc(8)
        bf.set([i])
        this.write(bf)
    }

    writeBoolean(i: boolean) {
        i ? this.writeInt32(1) : this.writeInt32(0)
    }

    writeFlag(i : boolean) {
        i ? this.writeInt8(1) : this.writeInt8(0)
    }

    writeString(i: string) {
        if (i.length < -65536 || i.length > 65536)
            throw ParserException(`Invalid String length '${i.length}'`)

        if (i) {
            this.writeInt32(i.length + 1)
            this.write(Buffer.from(i))
            this.writeInt8(0)
        } else {
            this.writeInt32(0)
        }
    }

    writeFName(name: FName) {}

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