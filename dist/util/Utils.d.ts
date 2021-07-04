/// <reference types="node" />
/// <reference types="ref-napi" />
export declare class Utils {
    static clamp(self: number, min: number, max: number): number;
    static pathAppend(str1: string, str2: string, strLength?: number): string;
    static isAligned(value: number, alignment: number): boolean;
    static alignBigInt(value: bigint, alignment: bigint): number;
    static align(value: number, alignment: number): number;
    static repeat(times: number, action: (n: number) => void): void;
    static toRadians(angdeg: number): number;
    static takeWhile(buf: Buffer, filter: (byte: number) => boolean): Buffer;
    static takeWhileStr(str: string, filter: (char: string) => boolean): string;
}
