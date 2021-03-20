import { FName } from "../../objects/uobject/FName";
import { FAssetBundleData } from "./AssetBundleData";
import { FAssetRegistryArchive } from "../reader/AssetRegistryArchive";
import { UnrealMap } from "../../../util/UnrealMap";

export class FAssetData {
    objectPath: FName
    packagePath: FName
    assetClass: FName
    packageName: FName
    assetName: FName
    tagsAndValues = new UnrealMap<FName, string>()
    taggedAssetBundles: FAssetBundleData
    chunkIds: number[]
    packageFlags: number

    constructor(Ar: FAssetRegistryArchive) {
        // Serialize out the asset info
        this.objectPath = Ar.readFName()
        this.packagePath = Ar.readFName()
        this.assetClass = Ar.readFName()

        // These are derived from ObjectPath, we manually serialize them because they get pooled
        this.packageName = Ar.readFName()
        this.assetName = Ar.readFName()

        Ar.serializeTagsAndBundles(this)

        this.chunkIds = Ar.readArray(() => Ar.readInt32())
        this.packageFlags = Ar.readUInt32()
    }
}