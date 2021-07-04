import { FName } from "../../objects/uobject/FName";
import { FArchive } from "../../reader/FArchive";
import { FNameEntryId } from "../../objects/uobject/NameTypes";
import { StringBuilder } from "../../../util/StringBuilder";
import { FPartialMapHandle, FStore } from "./AssetDataTagMapSerializationDetails";
export declare class FAssetRegistryExportPath {
    _class: FName;
    _object: FName;
    _package: FName;
    constructor(_class: FName, _object: FName, _package: FName);
    constructor(Ar: FArchive);
    toString(): string;
    toString(out: StringBuilder): any;
    toName(): FName;
    isEmpty(): boolean;
}
export declare class FValueId {
    type: EValueType;
    index: number;
    constructor(type: EValueType, index: number);
    constructor(Ar: FArchive);
    constructor(int: number);
}
export declare class FNumberedPair {
    key: FName;
    value: FValueId;
    constructor(key: FName, value: FValueId);
    constructor(Ar: FArchive);
}
export declare class FNumberlessPair {
    key: FNameEntryId;
    value: FValueId;
    constructor(key: FNameEntryId, value: FValueId);
    constructor(Ar: FArchive);
}
export declare class FNumberlessExportPath {
    _class: FNameEntryId;
    _object: FNameEntryId;
    _package: FNameEntryId;
    _names: string[];
    constructor(_class: FNameEntryId, _object: FNameEntryId, _package: FNameEntryId, _names: string[]);
    constructor(Ar: FArchive, names: string[]);
    makeNumberedPath(): FAssetRegistryExportPath;
    toString(): any;
    toString(out: StringBuilder): any;
    toName(): FName;
}
export declare class FMapHandle {
    partialHandle: FPartialMapHandle;
    store: FStore;
    bHasNumberlessKeys: boolean;
    num: number;
    pairBegin: number;
    constructor(partialHandle: FPartialMapHandle, store: FStore);
    getNumberedView(): FNumberedPair[];
    getNumberlessView(): FNumberlessPair[];
    forEachPair(fn: (FNumberedPair: any) => void): void;
}
export declare enum EValueType {
    AnsiString = "AnsiString",
    WideString = "WideString",
    NumberlessName = "NumberlessName",
    Name = "Name",
    NumberlessExportPath = "NumberlessExportPath",
    ExportPath = "ExportPath",
    LocalizedText = "LocalizedText"
}
