import { FName } from "../../objects/uobject/FName";
import { FSoftObjectPath } from "../../objects/uobject/SoftObjectPath";
import { FArchive } from "../../reader/FArchive";

/**
 * A struct representing a single AssetBundle
 */
export class FAssetBundleEntry {
    /**
     * Specific name of this bundle, should be unique for a given scope
     * @type {FName}
     * @public
     */
    bundleName: FName

    /**
     * List of string assets contained in this bundle
     * @type {Array<FSoftObjectPath>}
     * @public
     */
    bundleAssets: FSoftObjectPath[]

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {FName} bundleName Bundle name to use
     * @param {Array<FSoftObjectPath>} bundleAssets Bundle assets to use
     * @constructor
     * @public
     */
    constructor(bundleName: FName, bundleAssets: FSoftObjectPath[])

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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

/**
 * A struct with a list of asset bundle entries.
 * If one of these is inside a UObject it will get automatically exported as the asset registry tag AssetBundleData
 */
export class FAssetBundleData {
    /**
     * List of bundles defined
     * @type {Array<FAssetBundleEntry>}
     * @public
     */
    bundles: FAssetBundleEntry[]

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using a value
     * @param {Array<FAssetBundleEntry>} bundles Bundles to use
     * @constructor
     * @public
     */
    constructor(bundles: FAssetBundleEntry[])

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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