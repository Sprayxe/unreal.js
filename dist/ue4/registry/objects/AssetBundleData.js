"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAssetBundleData = exports.FAssetBundleEntry = void 0;
const SoftObjectPath_1 = require("../../objects/uobject/SoftObjectPath");
const FArchive_1 = require("../../reader/FArchive");
/** A struct representing a single AssetBundle */
class FAssetBundleEntry {
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.bundleName = x.readFName();
            this.bundleAssets = x.readArray(() => new SoftObjectPath_1.FSoftObjectPath(x));
        }
        else {
            this.bundleName = x;
            this.bundleAssets = y;
        }
    }
}
exports.FAssetBundleEntry = FAssetBundleEntry;
/** A struct with a list of asset bundle entries. If one of these is inside a UObject it will get automatically exported as the asset registry tag AssetBundleData */
class FAssetBundleData {
    constructor(x) {
        if (x instanceof FArchive_1.FArchive) {
            this.bundles = x.readArray(() => new FAssetBundleEntry(x));
        }
        else {
            this.bundles = x;
        }
    }
}
exports.FAssetBundleData = FAssetBundleData;
