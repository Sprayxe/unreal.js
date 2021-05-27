/*
 * Copyright (C) 2012 tamtam180
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import * as Long from "long"
export type long = Long.Long

/**
 * @author tamtam180 - kirscheless at gmail.com
 * @author modified by amrsatrio
 * @author ported by Sprayxe
 * @see <a href="https://opensource.googleblog.com/2011/04/introducing-cityhash.html">https://opensource.googleblog.com/2011/04/introducing-cityhash.html</a>
 * @see <a href="https://github.com/google/cityhash">https://github.com/google/cityhash</a>
 */
export class CityHash {
    // Some primes between 2^63 and 2^64 for various uses.
    private static readonly k0 = Long.fromString("14097894508562428199", true)
    private static readonly k1 = Long.fromString("13011662864482103923", true)
    private static readonly k2 = Long.fromString("11160318154034397263", true)

    private static toLongLE(b: Buffer, i: number): long {
        return Long.fromNumber((b[i + 7]), true).shiftLeft(56)
            .add(Long.fromNumber((b[i + 6] & 255), true).shiftLeft(48))
            .add(Long.fromNumber((b[i + 5] & 255), true).shiftLeft(40))
            .add(Long.fromNumber((b[i + 4] & 255), true).shiftLeft(32))
            .add(Long.fromNumber((b[i + 3] & 255), true).shiftLeft(24))
            .add(Long.fromNumber((b[i + 2] & 255), true).shiftLeft(16))
            .add(Long.fromNumber((b[i + 1] & 255), true).shiftLeft(8))
            .add(b[i] & 255)
    }

    private static toIntLE(b: Buffer, i: number) {
        return (((b[i + 3] & 255) << 24) + ((b[i + 2] & 255) << 16) + ((b[i + 1] & 255) << 8) + (b[i] & 255));
    }

    private static bswap64(value: long): long {
        const b1 = value.and(0xff)
        const b2 = (value.shiftRight(8)).and(0xff)
        const b3 = (value.shiftRight(16)).and(0xff)
        const b4 = (value.shiftRight(24)).and(0xff)
        const b5 = (value.shiftRight(32)).and(0xff)
        const b6 = (value.shiftRight(40)).and(0xff)
        const b7 = (value.shiftRight(48)).and(0xff)
        const b8 = (value.shiftRight(56)).and(0xff)
        return (b1.shiftLeft(56))
            .or(b2.shiftLeft(48))
            .or(b3.shiftLeft(40))
            .or(b4.shiftLeft(32))
            .or(b5.shiftLeft(24))
            .or(b6.shiftLeft(16))
            .or(b7.shiftLeft(8))
            .or(b8)
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
    private static rotate(val: long, shift: number): long {
        // Avoid shifting by 64: doing so yields an undefined result.
        return shift === 0 ? val : val.shiftRightUnsigned(shift).or((val.shiftLeft(64 - shift)))
    }

    private static shiftMix(val: long): long {
        return val.xor(val.shiftRightUnsigned(47))
    }

    private static hashLen16(u: long, v: long): Long.Long {
        return this.cityHash128to64(u, v)
    }

    private static hashLen16Mul(u: long, v: long, mul: long) {
        // Murmur-inspired hashing.
        let a = u.xor(v).multiply(mul)
        a = a.xor(a.shiftRightUnsigned(47))
        let b = v.xor(a).multiply(mul)
        b = b.xor(b.shiftRightUnsigned(47))
        b = b.multiply(mul)
        return b
    }

    private static hashLen0to16(s: Buffer, pos: number, len: number): long {
        if (len > 8) {
            const mul = this.k2.add(len * 2)
            const a = this.fetch64(s, pos).add(this.k2)
            const b = this.fetch64(s, pos + len - 8)
            const c = this.rotate(b, 37).multiply(mul).add(a)
            const d = (this.rotate(a, 25).add(b)).multiply(mul)
            return this.hashLen16Mul(c, d, mul)
        }
        if (len >= 4) {
            const mul = this.k2.add(len * 2)
            const a = this.fetch32(s, pos)
            return this.hashLen16Mul(Long.fromNumber(len + (a << 3), true), Long.fromNumber(this.fetch32(s, pos + len - 4), true), mul)
        }
        if (len > 0) {
            const a = s[pos] & 0xFF
            const b = s[pos + (len >>> 1)] & 0xFF
            const c = s[pos + len - 1] & 0xFF
            const y = a + (b << 8)
            const z = len + (c << 2)
            return this.shiftMix(this.k2.multiply(y).xor(this.k0.multiply(z))).multiply(this.k2)
        }
        return this.k2
    }

    /**
     * This probably works well for 16-byte strings as well, but it may be overkill
     * in that case.
     */
    private static hashLen17to32(s: Buffer, pos: number, len: number): long {
        const mul = this.k2.add(len * 2)
        const a = this.fetch64(s, pos).multiply(this.k1)
        const b = this.fetch64(s, pos + 8)
        const c = this.fetch64(s, pos + len - 8).multiply(mul)
        const d = this.fetch64(s, pos + len - 16).multiply(this.k2)
        return this.hashLen16Mul(this.rotate(a.add(b), 43).add(this.rotate(c, 30).add(d)),
            a.add(this.rotate(b.add(this.k2), 18)).add(c), mul)
    }

    /**
     * Return a 16-byte hash for 48 bytes.  Quick and dirty.
     * Callers do best to use "random-looking" values for a and b.
     */
    private static weakHashLen32WithSeeds0(
        w: long, x: long, y: long, z: long, a: long, b: long
    ): long[] {
        a = a.add(w)
        b = this.rotate(b.add(a).add(z), 21)
        const c = a
        a = a.add(x)
        a = a.add(y)
        b = b.add(this.rotate(a, 44))
        return [a.add(z), b.add(c)]
    }

    /**
     * Return a 16-byte hash for s[0] ... s[31], a, and b.  Quick and dirty.
     */
    private static weakHashLen32WithSeeds1(s: Buffer, pos: number, a: long, b: long): long[] {
        return this.weakHashLen32WithSeeds0(
            this.fetch64(s, pos),
            this.fetch64(s, pos + 8),
            this.fetch64(s, pos + 16),
            this.fetch64(s, pos + 24),
            a,
            b
        )
    }

    /**
     * Return an 8-byte hash for 33 to 64 bytes.
     */
    private static hashLen33to64(s: Buffer, pos: number, len: number): long {
        const mul = this.k2.add(len * 2)
        let a = this.fetch64(s, pos).multiply(this.k2)
        let b = this.fetch64(s, pos + 8)
        const c = this.fetch64(s, pos + len - 24)
        const d = this.fetch64(s, pos + len - 32)
        const e = this.fetch64(s, pos + 16).multiply(this.k2)
        const f = this.fetch64(s, pos + 24).multiply(9)
        const g = this.fetch64(s, pos + len - 8)
        const h = this.fetch64(s, pos + len - 16).multiply(mul)
        const u = this.rotate(a.add(g).xor(d), 43).add(this.rotate(b, 30).add(c).multiply(9))
        const v = a.add(g).xor(d).add(f).add(1)
        const w = this.bswap64(u.add(v).multiply(mul)).add(h)
        const x = this.rotate(e.add(f), 42).add(c)
        const y = this.bswap64(v.add(w).multiply(mul).add(g)).multiply(mul)
        const z = e.add(f).add(c)
        a = this.bswap64(x.add(z).multiply(mul).add(y)).add(b)
        b = this.shiftMix(z.add(a).multiply(mul).add(d).add(h)).multiply(mul)
        return b.add(x)
    }

    /**
     * Hash function for a byte array.
     */
    public static cityHash64(s: Buffer, pos: number, len: number): long {
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
        let y = this.fetch64(s, pos + len - 16).add(this.fetch64(s, pos + len - 56))
        let z = this.hashLen16(this.fetch64(s, pos + len - 48).add(len), this.fetch64(s, pos + len - 24))
        let v = this.weakHashLen32WithSeeds1(s, pos + len - 64, Long.fromNumber(len, true), z)
        let w = this.weakHashLen32WithSeeds1(s, pos + len - 32, y.add(this.k1), x)
        x = x.multiply(this.k1).add(this.fetch64(s, pos))

        // Decrease len to the nearest multiple of 64, and operate on 64-byte chunks.
        len = (len - 1) & (~63)
        do {
            x = this.rotate(x.add(y).add(v[0]).add(this.fetch64(s, pos + 8)), 37).multiply(this.k1)
            y = this.rotate(y.add(v[1]).add(this.fetch64(s, pos + 48)), 42).multiply(this.k1)
            x = x.xor(w[1])
            y = y.add(v[0].add(this.fetch64(s, pos + 40)))
            z = this.rotate(z.add(w[0]), 33).multiply(this.k1)
            v = this.weakHashLen32WithSeeds1(s, pos, v[1].multiply(this.k1), x.add(w[0]))
            w = this.weakHashLen32WithSeeds1(s, pos + 32, z.add(w[1]), y.add(this.fetch64(s, pos + 16)))
            { const swap = z; z = x; x = swap }
            pos += 64
            len -= 64
        } while (len !== 0)

        return this.hashLen16(this.hashLen16(v[0], w[0]).add(this.shiftMix(y).multiply(this.k1)).add(z),
            this.hashLen16(v[1], w[1]).add(x))
    }

    /**
     * Hash function for a byte array.  For convenience, a 64-bit seed is also
     * hashed into the result.
     */
    public static cityHash64WithSeed(s: Buffer, pos: number, len: number, seed: long): long {
        return this.cityHash64WithSeeds(s, pos, len, this.k2, seed)
    }

    public static cityHash64WithSeeds(s: Buffer, pos: number, len: number, seed0: long, seed1: long): long {
        return this.hashLen16(this.cityHash64(s, pos, len).subtract(seed0), seed1)
    }

    /**
     * Hash function for a byte array.  Most useful in 32-bit binaries.
     */
    public static cityHash32(s: Buffer, pos: number, len: number): long {
        return Long.fromNumber(-1)
    }

    /**
     * Hash 128 input bits down to 64 bits of output.
     * This is intended to be a reasonably good hash function.
     */
    public static cityHash128to64(u: long, v: long): long {
        const kMul = Long.fromString("11376068507788127593", true)
        let a = u.xor(v).multiply(kMul)
        a = a.xor(a.shiftRightUnsigned(47))
        let b = v.xor(a).multiply(kMul)
        b = b.xor(b.shiftRightUnsigned(47))
        b = b.multiply(kMul)
        return b
    }
}