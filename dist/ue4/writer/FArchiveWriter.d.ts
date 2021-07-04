/// <reference types="node" />
/// <reference types="ref-napi" />
import { FName } from "../objects/uobject/FName";
import { UnrealMap } from "../../util/UnrealMap";
export declare abstract class FArchiveWriter {
    game: number;
    ver: number;
    abstract littleEndian: boolean;
    abstract pos(): number;
    abstract write(buffer: Buffer): any;
    abstract write(b: number): any;
    abstract printError(): string;
    writeInt8(i: number): void;
    writeUInt8(i: number): void;
    writeInt16(i: number): void;
    writeUInt16(i: number): void;
    writeInt32(i: number): void;
    writeUInt32(i: number): void;
    writeInt64(i: number): void;
    writeUInt64(i: number): void;
    writeFloat32(i: number): void;
    writeDouble(i: number): void;
    writeBoolean(i: boolean): void;
    writeFlag(i: boolean): void;
    writeString(i: string): void;
    writeFName(name: FName): void;
    writeTMapWithoutSize<K, V>(map: UnrealMap<K, V>, write: (key: K, value: V) => void): void;
    writeTMap<K, V>(map: UnrealMap<K, V>, write: (key: K, value: V) => void): void;
    writeTArrayWithoutSize<T>(array: T[], write: (it: T) => void): void;
    writeTArray<T>(array: T[], write: (it: T) => void): void;
}
