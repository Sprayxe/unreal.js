/// <reference types="node" />
/// <reference types="ref-napi" />
export declare class BufferStream {
    protected buf: Buffer;
    protected pos: number;
    protected count: number;
    protected mark: number;
    constructor(buf: Buffer, offset?: number, length?: number);
    read(): number;
    read(amount: number): number;
    read(b: Buffer, off?: number, len?: number): number;
    readAllBytes(): Buffer;
    readNBytes(b: Buffer, off: number, len: number): number;
    skip(n: number): number;
    get available(): number;
    private getBit;
}
