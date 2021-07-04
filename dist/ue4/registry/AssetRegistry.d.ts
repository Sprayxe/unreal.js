/// <reference types="node" />
/// <reference types="ref-napi" />
import { FArchive } from "../reader/FArchive";
import { FAssetData } from "./objects/FAssetData";
import { FDependsNode } from "./objects/FDependsNode";
import { FAssetPackageData } from "./objects/FAssetPackageData";
export declare class AssetRegistry {
    preallocatedAssetDataBuffer: FAssetData[];
    preallocatedDependsNodeDataBuffer: FDependsNode[];
    preallocatedPackageDataBuffer: FAssetPackageData[];
    originalAr: FArchive;
    fileName: string;
    constructor(originalAr: FArchive, fileName: string);
    constructor(bytes: Buffer, fileName: string);
    private loadDependencies;
    private loadDependenciesBeforeFlags;
}
