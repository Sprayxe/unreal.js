import { FArchive } from "./FArchive";
import Long from "long"

export class FByteArchive extends FArchive {
    data: Buffer

    constructor(data: Buffer) {
        super()
        this.data = data
    }

    set littleEndian(v: boolean) {
        this.littleEndianAccessor = v
    }

    pos(v?: number, a?: boolean): number {
        if (!v) {
            return this.offset
        } else {
            // ts-lint-ignore
            a ? this.offset += v : this.offset = v
            return this.offset
        }
    }

    clone(): FByteArchive {
        const clone = new FByteArchive(this.data)
        clone.pos(this.pos())
        return clone
    }

    seek(v: number) {
        return this.pos(v)
    }

    skip(n: Long): number {
        this.pos(n.toInt(), true)
        return n.toInt()
    }
}