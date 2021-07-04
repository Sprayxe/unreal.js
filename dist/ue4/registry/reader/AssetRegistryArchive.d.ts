import { FArchiveProxy } from "../../reader/FArchiveProxy";
import { FArchive } from "../../reader/FArchive";
import { FAssetData } from "../objects/FAssetData";
import { FStore } from "../objects/AssetDataTagMapSerializationDetails";
import { FName } from "../../objects/uobject/FName";
export declare abstract class FAssetRegistryArchive extends FArchiveProxy {
    constructor(wrappedAr: FArchive);
    abstract serializeTagsAndBundles(out: FAssetData): any;
}
export declare const ASSET_REGISTRY_NUMBERED_NAME_BIT = 2147483648;
export declare class FAssetRegistryReader extends FAssetRegistryArchive {
    names: string[];
    tags: FStore;
    constructor(inner: FArchive);
    clone(): FAssetRegistryReader;
    readFName(): FName;
    serializeTagsAndBundles(out: FAssetData): void;
    private loadTags;
}
