"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAssetRegistryVersion = exports.Type = exports.versionGuid = void 0;
const Guid_1 = require("../../objects/core/misc/Guid");
exports.versionGuid = new Guid_1.FGuid(0x717F9EE7, 0xE9B0493A, 0x88B39132, 0x1B388107);
var Type;
(function (Type) {
    /** From before file versioning was implemented */
    Type["PreVersioning"] = "PreVersioning";
    /** The first version of the runtime asset registry to include file versioning. */
    Type["HardSoftDependencies"] = "HardSoftDependencies";
    /** Added FAssetRegistryState and support for piecemeal serialization */
    Type["AddAssetRegistryState"] = "AddAssetRegistryState";
    /** AssetData serialization format changed, versions before this are not readable */
    Type["ChangedAssetData"] = "ChangedAssetData";
    /** Removed MD5 hash from package data */
    Type["RemovedMD5Hash"] = "RemovedMD5Hash";
    /** Added hard/soft manage references */
    Type["AddedHardManage"] = "AddedHardManage";
    /** Added MD5 hash of cooked package to package data */
    Type["AddedCookedMD5Hash"] = "AddedCookedMD5Hash";
    /** Added UE::AssetRegistry::EDependencyProperty to each dependency */
    Type["AddedDependencyFlags"] = "AddedDependencyFlags";
    /**
     * Major tag format change that replaces USE_COMPACT_ASSET_REGISTRY:
     * * Target tag INI settings cooked into tag data
     * * Instead of FString values are stored directly as one of:
     *      - Narrow / wide string
     *      - [Numberless] FName
     *      - [Numberless] export path
     *      - Localized string
     * * All value types are deduplicated
     * * All key-value maps are cooked into a single contiguous range
     * * Switched from FName table to seek-free and more optimized FName batch loading
     * * Removed global tag storage, a tag map reference-counts one store per asset registry
     * * All configs can mix fixed and loose tag maps
     */
    Type["FixedTags"] = "FixedTags";
})(Type = exports.Type || (exports.Type = {}));
class FAssetRegistryVersion {
    constructor(Ar) {
        this.Ar = Ar;
        this.guid = new Guid_1.FGuid(this.Ar);
    }
    get version() {
        if (this.guid === exports.versionGuid) {
            const values = Object.values(Type);
            const v = values[this.Ar.readInt32()];
            return v ? v : this.fallback();
        }
        else {
            return this.fallback();
        }
    }
    fallback(ordinal) {
        const latest = Object.values(Type).pop();
        if (ordinal)
            console.warn(`Unknown FAssetRegistryVersion::Type with ordinal ${ordinal}, defaulting to latest supported version (${latest})`);
        return latest;
    }
}
exports.FAssetRegistryVersion = FAssetRegistryVersion;
