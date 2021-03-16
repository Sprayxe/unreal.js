import { FArchive } from "../reader/FArchive";
import { FByteArchive } from "../reader/FByteArchive";
import { FAssetRegistryVersion, Type } from "./objects/FAssetRegistryVersion";
import { FAssetRegistryArchive, FAssetRegistryReader } from "./reader/AssetRegistryArchive";
import { ParserException } from "../../exceptions/Exceptions";
import { FNameTableArchiveReader } from "./reader/NameTableArchive";
import { FAssetData } from "./objects/FAssetData";

export class AssetRegistry {
    preallocatedAssetDataBuffer: FAssetData[]
    preallocatedDependsNodeDataBuffer: any[]
    preallocatedPackageDataBuffer: any[]
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
            throw ParserException("Cannot read states before this version")
        } else if (version.version < Type.FixedTags) {
            Ar = new FNameTableArchiveReader(this.originalAr)
        } else {
            Ar = new FAssetRegistryReader(this.originalAr)
        }


    }


}