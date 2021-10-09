import { FArchive } from "../reader/FArchive";
import { FByteArchive } from "../reader/FByteArchive";
import { FAssetRegistryVersion, Type } from "./objects/FAssetRegistryVersion";
import { FAssetRegistryArchive, FAssetRegistryReader } from "./reader/AssetRegistryArchive";
import { ParserException } from "../../exceptions/Exceptions";
import { FNameTableArchiveReader } from "./reader/NameTableArchive";
import { FAssetData } from "./objects/FAssetData";
import { FDependsNode } from "./objects/FDependsNode";
import { FAssetPackageData } from "./objects/FAssetPackageData";

export class AssetRegistry {
    preallocatedAssetDataBuffer: FAssetData[]
    preallocatedDependsNodeDataBuffer: FDependsNode[]
    preallocatedPackageDataBuffer: FAssetPackageData[]
    originalAr: FArchive
    fileName: string

    constructor(originalAr: FArchive, fileName: string)
    constructor(bytes: Buffer, fileName: string)
    constructor(x?: any, y?: any) {
        this.fileName = y
        this.originalAr = x instanceof FArchive ? x : new FByteArchive(x)
        // init
        const version = new FAssetRegistryVersion(this.originalAr)
        let Ar: FAssetRegistryArchive = null
        if (version.version < Type.RemovedMD5Hash) {
            throw new ParserException("Cannot read states before this version")
        } else if (version.version < Type.FixedTags) {
            Ar = new FNameTableArchiveReader(this.originalAr)
        } else {
            Ar = new FAssetRegistryReader(this.originalAr)
        }

        const _len1 = Ar.readInt32()
        this.preallocatedAssetDataBuffer = new Array(_len1)
        for (let i = 0; i < _len1; ++i) {
            this.preallocatedAssetDataBuffer[i] = new FAssetData(Ar)
        }

        if (version.version <= Type.AddedDependencyFlags) {
            const localNumDependsNodes = Ar.readInt32()
            this.preallocatedDependsNodeDataBuffer = new Array(localNumDependsNodes)
            for (let i = 0; i < localNumDependsNodes; ++i) {
                this.preallocatedDependsNodeDataBuffer[i] = new FDependsNode()
            }
            if (localNumDependsNodes > 0)
                this.loadDependenciesBeforeFlags(Ar, version)
        } else {
            const dependencySectionSize = Number(Ar.readInt64())
            const dependencySectionEnd = Ar.pos + dependencySectionSize
            const localNumDependsNodes = Ar.readInt32()
            this.preallocatedDependsNodeDataBuffer = new Array(localNumDependsNodes)
            for (let i = 0; i < localNumDependsNodes; ++i) {
                this.preallocatedDependsNodeDataBuffer[i] = new FDependsNode()
            }
            if (localNumDependsNodes > 0)
                this.loadDependencies(Ar)
            Ar.pos = dependencySectionEnd
        }

        const serializeHash = version.version < Type.AddedCookedMD5Hash

        const _len2 = Ar.readInt32()
        this.preallocatedPackageDataBuffer = new Array(_len2)
        for (let i = 0; i < _len2; ++i) {
            this.preallocatedPackageDataBuffer[i] = new FAssetPackageData(Ar, serializeHash)
        }
    }

    private loadDependencies(Ar: FArchive) {
        const self = this

        function getNodeFromSerializeIndex(index: number): FDependsNode {
            if (index < 0 || self.preallocatedDependsNodeDataBuffer.length < index) {
                return null
            }
            return self.preallocatedDependsNodeDataBuffer[index]
        }

        for (const dependsNode of this.preallocatedDependsNodeDataBuffer) {
            dependsNode.serializeLoad(Ar, getNodeFromSerializeIndex)
        }
    }

    private loadDependenciesBeforeFlags(Ar: FArchive, version: FAssetRegistryVersion) {
        for (const dependsNode of this.preallocatedDependsNodeDataBuffer) {
            dependsNode.serializeLoadBeforeFlags(Ar, version, this.preallocatedDependsNodeDataBuffer, this.preallocatedDependsNodeDataBuffer.length)
        }
    }
}