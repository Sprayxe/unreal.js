/// <reference types="node" />
/// <reference types="ref-napi" />
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FObjectExport, FObjectImport } from "../../objects/uobject/ObjectResource";
import { PayloadType } from "../util/PayloadType";
import { FName, FNameEntry } from "../../objects/uobject/FName";
import { WritableStreamBuffer } from "stream-buffers";
export declare class FAssetArchiveWriter extends FArchiveWriter {
    littleEndian: boolean;
    outputStream: WritableStreamBuffer;
    private _pos;
    constructor(outputStream: WritableStreamBuffer);
    pos(): number;
    nameMap: FNameEntry[];
    importMap: FObjectImport[];
    exportMap: FObjectExport[];
    private payloads;
    getPayload(type: PayloadType): FAssetArchiveWriter;
    addPayload(type: PayloadType, payload: FAssetArchiveWriter): void;
    uassetSize: number;
    uexpSize: number;
    relativePos(): number;
    toNormalPos(relativePos: number): number;
    toRelativePos(normalPos: number): number;
    writeFName(name: FName): void;
    write(b: number): any;
    write(buffer: Buffer): any;
    printError(): string;
    setupByteArrayWriter(): FByteArchiveWriter;
}
export declare class FByteArchiveWriter extends FAssetArchiveWriter {
    bos: WritableStreamBuffer;
    constructor();
    toByteArray(): Buffer;
    printError(): string;
}
