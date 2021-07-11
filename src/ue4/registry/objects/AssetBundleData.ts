import { FName } from "../../objects/uobject/FName";
import { FSoftObjectPath } from "../../objects/uobject/SoftObjectPath";
import { FArchive } from "../../reader/FArchive";

/** A struct representing a single AssetBundle */
export class FAssetBundleEntry {
    /** Specific name of this bundle, should be unique for a given scope */
    bundleName: FName
    /** List of string assets contained in this bundle */
    bundleAssets: FSoftObjectPath[]

    constructor(Ar: FArchive)
    constructor(bundleName: FName, bundleAssets: FSoftObjectPath[])
    constructor(x?: any, y?: any) {
        if (x instanceof FArchive) {
            this.bundleName = x.readFName()
            const len = x.readInt32()
            this.bundleAssets = new Array(len)
            for (let i = 0; i < len; ++i) {
                this.bundleAssets[i] = new FSoftObjectPath(x)
            }
        } else {
            this.bundleName = x
            this.bundleAssets = y
        }
    }
}

/** A struct with a list of asset bundle entries. If one of these is inside a UObject it will get automatically exported as the asset registry tag AssetBundleData */
export class FAssetBundleData {
    /** List of bundles defined */
    bundles: FAssetBundleEntry[]

    constructor(Ar: FArchive)
    constructor(bundles: FAssetBundleEntry[])
    constructor(x?: any) {
        if (x instanceof FArchive) {
            const len = x.readInt32()
            this.bundles = new Array(len)
            for (let i = 0; i < len; ++i) {
                this.bundles[i] = new FAssetBundleEntry(x)
            }
        } else {
            this.bundles = x
        }
    }
}