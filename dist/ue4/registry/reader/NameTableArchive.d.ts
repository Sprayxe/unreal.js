import { FAssetRegistryArchive } from "./AssetRegistryArchive";
import { FArchive } from "../../reader/FArchive";
import { FName, FNameEntry } from "../../objects/uobject/FName";
import { FAssetData } from "../objects/FAssetData";
export declare class FNameTableArchiveReader extends FAssetRegistryArchive {
    nameMap: FNameEntry[];
    constructor(wrappedArchive: FArchive);
    clone(): FNameTableArchiveReader;
    private serializeNameMap;
    readFName(): FName;
    serializeTagsAndBundles(out: FAssetData): void;
}
