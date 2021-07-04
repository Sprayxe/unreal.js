import { FName } from "../../objects/uobject/FName";
import { FAssetBundleData } from "./AssetBundleData";
import { FAssetRegistryArchive } from "../reader/AssetRegistryArchive";
import { UnrealMap } from "../../../util/UnrealMap";
export declare class FAssetData {
    objectPath: FName;
    packagePath: FName;
    assetClass: FName;
    packageName: FName;
    assetName: FName;
    tagsAndValues: UnrealMap<FName, string>;
    taggedAssetBundles: FAssetBundleData;
    chunkIds: number[];
    packageFlags: number;
    constructor(Ar: FAssetRegistryArchive);
}
