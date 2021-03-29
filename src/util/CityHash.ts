export class CityHash {
    private static k0 = 0xc3a5c85c97cb3127
    private static k1 = 0xb492b66fbe98f273
    private static k2 = 0x9ae16a3b2f90404f

    private static toLongLE(b: Buffer, i: number) {
        return ((b[i + 7] << 56) +
            ((b[i + 6] & 255) << 48) +
            ((b[i + 5] & 255) << 40) +
            ((b[i + 4] & 255) << 32) +
            ((b[i + 3] & 255) << 24) +
            ((b[i + 2] & 255) << 16) +
            ((b[i + 1] & 255) << 8) +
            (b[i] & 255))
    }

    private static toIntLE(b: Buffer, i: number) {
        return (((b[i + 3] & 255) << 24) + ((b[i + 2] & 255) << 16) + ((b[i + 1] & 255) << 8) + (b[i] & 255))
    }

    private static bswap64(value: number) {
        const b1 = value & 0xff;
        const b2 = (value >> 8) & 0xff;
        const b3 = (value >> 16) & 0xff;
        const b4 = (value >> 24) & 0xff;
        const b5 = (value >> 32) & 0xff;
        const b6 = (value >> 40) & 0xff;
        const b7 = (value >> 48) & 0xff;
        const b8 = (value >> 56) & 0xff;
        return b1 << 56 | b2 << 48 | b3 << 40 | b4 << 32 | b5 << 24 | b6 << 16 | b7 << 8 | b8
    }

    private static fetch64(s: Buffer, pos: number) {
        return this.toLongLE(s, pos)
    }

    private static fetch32(s: Buffer, pos: number) {
        return this.toIntLE(s, pos)
    }

    /**
     * Bitwise right rotate.  Normally this will compile to a single
     * instruction, especially if the shift is a manifest constant.
     */
    private static rotate(val: number, shift: number) {
        // Avoid shifting by 64: doing so yields an undefined result.
        return shift === 0 ? val : ((val >>> shift) | (val << (64 - shift)))
    }

    private static shiftMix(val: number) { return val ^ (val >>> 47) }

    private static hashLen16(u: number, v: number) {  return this.cityHash128to64(u, v) }

    private static hashLen16WithMul(u: number, v: number, mul: number) {
        // Murmur-inspired hashing.
        let a = (u ^ v) * mul
        a ^= (a >>> 47)
        let b = (v ^ a) * mul
        b ^= (b >>> 47)
        b *= mul
        return b
    }

    private static hashLen0to16(s: Buffer, pos: number, len: number) {
        if (len > 8) {
            const mul = this.k2 + len * 2
            const a = this.fetch64(s, pos) + this.k2
            const b = this.fetch64(s, pos + len - 8)
            const c = this.rotate(b, 37) * mul + a
            const d = (this.rotate(a, 25) + b) * mul
            return this.hashLen16WithMul(c, d, mul)
        }
        if (len >= 4) {
            const mul = this.k2 + len * 2
            const a = this.fetch32(s, pos)
            return this.hashLen16WithMul(len + (a << 3), this.fetch32(s, pos + len - 4), mul)
        }
        if (len > 0) {
            const a = s[pos] & 0xFF
            const b = s[pos + (len >>> 1)] & 0xFF
            const c = s[pos + len - 1] & 0xFF
            const y = a + (b << 8)
            const z = len + (c << 2)
            return this.shiftMix(y * this.k2 ^ z * this.k0) * this.k2
        }
        return this.k2
    }

    public static hashLen17to32(s: Buffer, pos: number, len: number) {
        const mul = this.k2 + len * 2
        const a = this.fetch64(s, pos) * this.k1
        const b = this.fetch64(s, pos + 8)
        const c = this.fetch64(s, pos + len - 8) * mul
        const d = this.fetch64(s, pos + len - 16) * this.k2
        return this.hashLen16WithMul(this.rotate(a + b, 43) + this.rotate(c, 30) + d,
            a + this.rotate(b + this.k2, 18) + c, mul)
    }

    private static weakHashLen32WithMaxSeeds(
        w: number, x: number, y: number, z: number, a: number, b: number
    ) {
        a += w;
        b = this.rotate(b + a + z, 21);
        const c = a;
        a += x;
        a += y;
        b += this.rotate(a, 44);
        return [a + z, b + c];
    }

    private static weakHashLen32WithSeeds(
        s: Buffer, pos: number, a: number, b: number
    ) {
        return this.weakHashLen32WithMaxSeeds(
            this.fetch64(s, pos),
            this.fetch64(s, pos + 8),
            this.fetch64(s, pos + 16),
            this.fetch64(s, pos + 24),
            a,
            b
        )
    }

    private static hashLen33to64(s: Buffer, pos: number, len: number) {
        const mul = this.k2 + len * 2
        let a = this.fetch64(s, pos) * this.k2
        let b = this.fetch64(s, pos + 8)
        const c = this.fetch64(s, pos + len - 24)
        const d = this.fetch64(s, pos + len - 32)
        const e = this.fetch64(s, pos + 16) * this.k2
        const f = this.fetch64(s, pos + 24) * 9
        const g = this.fetch64(s, pos + len - 8)
        const h = this.fetch64(s, pos + len - 16) * mul
        const u = this.rotate(a + g, 43) + (this.rotate(b, 30) + c) * 9
        const v = ((a + g) ^ d) + f + 1
        const w = this.bswap64((u + v) * mul) + h
        const x = this.rotate(e + f, 42) + c
        const y = (this.bswap64((v + w) * mul) + g) * mul
        const z = e + f + c
        a = this.bswap64((x + z) * mul + y) + b
        b = this.shiftMix((z + a) * mul + d + h) * mul
        return b + x
    }

    public static cityHash64(s: Buffer, pos: number, len: number) {
        if (len <= 32) {
            if (len <= 16) {
                return this.hashLen0to16(s, pos, len)
            } else {
                return this.hashLen17to32(s, pos, len)
            }
        } else if (len <= 64) {
            return this.hashLen33to64(s, pos, len)
        }

        // For strings over 64 bytes we hash the end first, and then as we
        // loop we keep 56 bytes of state: v, w, x, y, and z.
        let x = this.fetch64(s, pos + len - 40)
        let y = this.fetch64(s, pos + len - 16) + this.fetch64(s, pos + len - 56)
        let z = this.hashLen16(this.fetch64(s, pos + len - 48) + len, this.fetch64(s, pos + len - 24))
        let v = this.weakHashLen32WithSeeds(s, pos + len - 64, len, z)
        let w = this.weakHashLen32WithSeeds(s, pos + len - 32, y + this.k1, x)
        x = x * this.k1 + this.fetch64(s, pos)

        // Decrease len to the nearest multiple of 64, and operate on 64-byte chunks.
        // Decrease len to the nearest multiple of 64, and operate on 64-byte chunks.
        len = (len - 1) & (~63)
        do {
            x = this.rotate(x + y + v[0] + this.fetch64(s, pos + 8), 37) * this.k1
            y = this.rotate(y + v[1] + this.fetch64(s, pos + 48), 42) * this.k1
            x ^= w[1]
            y += v[0] + this.fetch64(s, pos + 40)
            z = this.rotate(z + w[0], 33) * this.k1
            v = this.weakHashLen32WithSeeds(s, pos, v[1] * this.k1, x + w[0])
            w = this.weakHashLen32WithSeeds(s, pos + 32, z + w[1], y + this.fetch64(s, pos + 16))
            { const swap = z; z = x; x = swap; }
            pos += 64
            len -= 64
        } while (len != 0)


        return this.hashLen16(this.hashLen16(v[0], w[0]) + this.shiftMix(y) * this.k1 + z,
            this.hashLen16(v[1], w[1]) + x)
    }

    public static cityHash64WithSeed(s: Buffer, pos: number, len: number, seed: number) {
        return this.cityHash64WithSeeds(s, pos, len, this.k2, seed)
    }

    public static cityHash64WithSeeds(s: Buffer, pos: number, len: number, seed0: number, seed1: number) {
        return this.hashLen16(this.cityHash64(s, pos, len) - seed0, seed1)
    }

    public static cityHash32(s: Buffer, pos: number, len: number) { return -1 }

    public static cityHash128to64(u: number, v: number) {
        // Murmur-inspired hashing.
        const kMul = 0x9ddfea08eb382d69
        let a = (u ^ v) * kMul
        a ^= (a >>> 47)
        let b = (v ^ a) * kMul
        b ^= (b >>> 47)
        b *= kMul
        return b
    }
}