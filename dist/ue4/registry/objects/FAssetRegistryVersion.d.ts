import { FGuid } from "../../objects/core/misc/Guid";
import { FArchive } from "../../reader/FArchive";
export declare const versionGuid: FGuid;
export declare enum Type {
    /** From before file versioning was implemented */
    PreVersioning = "PreVersioning",
    /** The first version of the runtime asset registry to include file versioning. */
    HardSoftDependencies = "HardSoftDependencies",
    /** Added FAssetRegistryState and support for piecemeal serialization */
    AddAssetRegistryState = "AddAssetRegistryState",
    /** AssetData serialization format changed, versions before this are not readable */
    ChangedAssetData = "ChangedAssetData",
    /** Removed MD5 hash from package data */
    RemovedMD5Hash = "RemovedMD5Hash",
    /** Added hard/soft manage references */
    AddedHardManage = "AddedHardManage",
    /** Added MD5 hash of cooked package to package data */
    AddedCookedMD5Hash = "AddedCookedMD5Hash",
    /** Added UE::AssetRegistry::EDependencyProperty to each dependency */
    AddedDependencyFlags = "AddedDependencyFlags",
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
    FixedTags = "FixedTags"
}
export declare class FAssetRegistryVersion {
    Ar: FArchive;
    constructor(Ar: FArchive);
    guid: FGuid;
    get version(): Type;
    private fallback;
}
