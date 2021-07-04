import { FAssetIdentifier } from "./FAssetIdentifier";
import BitSet from "bitset";
import { FArchive } from "../../reader/FArchive";
import { FAssetRegistryVersion } from "./FAssetRegistryVersion";
export declare const packageFlagWidth = 3;
export declare const packageFlagSetWidth: number;
export declare const manageFlagWidth = 1;
export declare const manageFlagSetWidth: number;
export declare class FDependsNode {
    /** The name of the package/object this node represents */
    identifier: FAssetIdentifier;
    packageDependencies: FDependsNode[];
    nameDependencies: FDependsNode[];
    manageDependencies: FDependsNode[];
    referencers: FDependsNode[];
    packageFlags: BitSet;
    manageFlags: BitSet;
    serializeLoad(Ar: FArchive, getNodeFromSerializeIndex: (n: number) => FDependsNode): void;
    serializeLoadBeforeFlags(Ar: FArchive, version: FAssetRegistryVersion, preallocatedDependsNodeDataBuffer: FDependsNode[], numDependsNodes: number): void;
}
