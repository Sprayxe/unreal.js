/// <reference types="node" />
/// <reference types="ref-napi" />
import * as Long from "long";
export declare type long = Long.Long;
/**
 * @author tamtam180 - kirscheless at gmail.com
 * @author modified by amrsatrio
 * @author ported by Sprayxe
 * @see <a href="https://opensource.googleblog.com/2011/04/introducing-cityhash.html">https://opensource.googleblog.com/2011/04/introducing-cityhash.html</a>
 * @see <a href="https://github.com/google/cityhash">https://github.com/google/cityhash</a>
 */
export declare class CityHash {
    private static readonly k0;
    private static readonly k1;
    private static readonly k2;
    private static toLongLE;
    private static toIntLE;
    private static bswap64;
    private static fetch64;
    private static fetch32;
    /**
     * Bitwise right rotate.  Normally this will compile to a single
     * instruction, especially if the shift is a manifest constant.
     */
    private static rotate;
    private static shiftMix;
    private static hashLen16;
    private static hashLen16Mul;
    private static hashLen0to16;
    /**
     * This probably works well for 16-byte strings as well, but it may be overkill
     * in that case.
     */
    private static hashLen17to32;
    /**
     * Return a 16-byte hash for 48 bytes.  Quick and dirty.
     * Callers do best to use "random-looking" values for a and b.
     */
    private static weakHashLen32WithSeeds0;
    /**
     * Return a 16-byte hash for s[0] ... s[31], a, and b.  Quick and dirty.
     */
    private static weakHashLen32WithSeeds1;
    /**
     * Return an 8-byte hash for 33 to 64 bytes.
     */
    private static hashLen33to64;
    /**
     * Hash function for a byte array.
     */
    static cityHash64(s: Buffer, pos: number, len: number): long;
    /**
     * Hash function for a byte array.  For convenience, a 64-bit seed is also
     * hashed into the result.
     */
    static cityHash64WithSeed(s: Buffer, pos: number, len: number, seed: long): long;
    static cityHash64WithSeeds(s: Buffer, pos: number, len: number, seed0: long, seed1: long): long;
    /**
     * Hash function for a byte array.  Most useful in 32-bit binaries.
     */
    static cityHash32(s: Buffer, pos: number, len: number): long;
    /**
     * Hash 128 input bits down to 64 bits of output.
     * This is intended to be a reasonably good hash function.
     */
    static cityHash128to64(u: long, v: long): long;
}
