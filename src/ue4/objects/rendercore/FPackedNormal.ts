import { FArchive } from "../../reader/FArchive";
import { Game } from "../../versions/Game";
import { FVector } from "../core/math/FVector";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

/** A normal vector, quantized and packed into 32-bits. */
export class FPackedNormal {
    public data: number

    public constructor(Ar: FArchive = null) {
        if (Ar != null) {
            this.data = Ar.readUInt32()
            if (Ar.game >= Game.GAME_UE4(20))
                this.data = this.data ^ 0x80808080
        }
    }

    public serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(Ar.game >= Game.GAME_UE4(20)
            ? (this.data ^ 0x80808080)
            : this.data
        )
    }

    public static fromVector(vector: FVector): FPackedNormal {
        const packed = new FPackedNormal()
        packed.data = (Math.floor((vector.x + 1) * 127.5)
            + (Math.floor((vector.y + 1) * 127.5) << 8)
            + (Math.floor((vector.z + 1) * 127.5)) << 16)
        return packed
    }

    public static fromNumber(data: number): FPackedNormal {
        const packed = new FPackedNormal()
        packed.data = data
        return packed
    }
}

/** A vector, quantized and packed into 32-bits. */
export class FPackedRGBA16N {
    public x: number
    public y: number
    public z: number
    public w: number

    public constructor(Ar: FArchive = null) {
        if (Ar != null) {
            this.x = Ar.readUInt16()
            this.y = Ar.readUInt16()
            this.z = Ar.readUInt16()
            this.w = Ar.readUInt16()
            if (Ar.game >= Game.GAME_UE4(20)) {
                this.x = this.x ^ 0x8000
                this.y = this.y ^ 0x8000
                this.z = this.z ^ 0x8000
                this.w = this.w ^ 0x8000
            }
        }
    }

    public serialize(Ar: FArchiveWriter) {
        if (Ar.game >= Game.GAME_UE4(20)) {
            Ar.writeUInt16(this.x ^ 0x8000)
            Ar.writeUInt16(this.y ^ 0x8000)
            Ar.writeUInt16(this.z ^ 0x8000)
            Ar.writeUInt16(this.w ^ 0x8000)
        } else {
            Ar.writeUInt16(this.x)
            Ar.writeUInt16(this.y)
            Ar.writeUInt16(this.z)
            Ar.writeUInt16(this.w)
        }
    }

    public toPackedNormal(): FPackedNormal {
        return FPackedNormal.fromVector(new FVector(
            (this.x - 32767.5) / 32767.5,
            (this.y - 32767.5) / 32767.5,
            (this.z - 32767.5) / 32767.5)
        )
    }

    public static from(x: number, y: number, z: number, w: number): FPackedRGBA16N {
        const packed = new FPackedRGBA16N()
        packed.x = x
        packed.y = y
        packed.z = z
        packed.w = w
        return packed
    }
}