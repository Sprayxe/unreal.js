/// <reference types="node" />
/// <reference types="ref-napi" />
import { FAssetRegistryExportPath, FMapHandle, FNumberedPair, FNumberlessExportPath, FNumberlessPair, FValueId } from "./AssetDataTagMap";
import { FName } from "../../objects/uobject/FName";
import { FNameEntryId } from "../../objects/uobject/NameTypes";
import { FAssetRegistryReader } from "../reader/AssetRegistryArchive";
export declare const OLD_BEGIN_MAGIC = 305419896;
export declare const BEGIN_MAGIC = 305419897;
export declare const END_MAGIC = 2271560481;
/** Stores a fixed set of values and all the key-values maps used for lookup */
export declare class FStore {
    Ar: FAssetRegistryReader;
    constructor(Ar: FAssetRegistryReader);
    pairs: FNumberedPair[];
    numberlessPairs: FNumberlessPair[];
    ansiStringOffsets: number[];
    ansiStrings: Buffer;
    wideStringOffsets: number[];
    wideStrings: Buffer;
    numberlessNames: FNameEntryId[];
    names: FName[];
    numberlessExportPaths: FNumberlessExportPath[];
    exportPaths: FAssetRegistryExportPath[];
    texts: string[];
    nameMap: string[];
    getLoadOrder(initialMagic: number): ELoadOrder;
    getAnsiString(idx: number): string;
    getWideString(idx: number): string;
}
export declare enum ELoadOrder {
    Member = "Member",
    TextFirst = "TextFirst"
}
export declare class FPartialMapHandle {
    int: number;
    bHasNumberlessKeys: boolean;
    num: number;
    pairBegin: number;
    constructor(int: number);
    makeFullHandle(store: FStore): FMapHandle;
    toInt(): number;
}
export declare class FValueHandle {
    store: FStore;
    id: FValueId;
    constructor(store: FStore, id: FValueId);
    asString(): string;
}
