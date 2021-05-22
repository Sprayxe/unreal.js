import { FArchiveProxy } from "../../reader/FArchiveProxy";
import { FArchive } from "../../reader/FArchive";
import { FAssetData } from "../objects/FAssetData";
import { FPartialMapHandle, FStore, FValueHandle } from "../objects/AssetDataTagMapSerializationDetails";
import { loadNameBatch } from "../../objects/uobject/NameBatchSerialization";
import { FName } from "../../objects/uobject/FName";
import { NAME_NO_NUMBER_INTERNAL } from "../../objects/uobject/NameTypes";
import { ParserException } from "../../../exceptions/Exceptions";
import { FAssetBundleData } from "../objects/AssetBundleData";
import { UnrealMap } from "../../../util/UnrealMap";

export abstract class FAssetRegistryArchive extends FArchiveProxy {
    constructor(wrappedAr: FArchive) {
        super(wrappedAr)
    }
    abstract serializeTagsAndBundles(out: FAssetData)
}

export const ASSET_REGISTRY_NUMBERED_NAME_BIT = 0x80000000

export class FAssetRegistryReader extends FAssetRegistryArchive {
    names: string[]
    tags: FStore

    constructor(inner: FArchive) {
        super(inner)
        this.names = loadNameBatch(inner)
        this.tags = new FStore(this)
    }

    clone() {
        const clone = new FAssetRegistryReader(this.wrappedAr)
        clone.names = this.names
        clone.tags = this.tags
        return clone
    }

    readFName(): FName {
        let index = this.readUInt32()
        let number = NAME_NO_NUMBER_INTERNAL

        if ((index & ASSET_REGISTRY_NUMBERED_NAME_BIT) > 0) {
            index -= ASSET_REGISTRY_NUMBERED_NAME_BIT
            number = this.readInt32()
        }

        if (index >= 0 && index < this.names.length) {
            return FName.dummy(this.names[index], number)
        } else {
            throw ParserException(`FName could not be read, requested index ${index}, name map size ${this.names.length}`)
        }
    }

    serializeTagsAndBundles(out: FAssetData) {
        out.tagsAndValues = this.loadTags()
        out.taggedAssetBundles = new FAssetBundleData(this)
    }

    private loadTags(): UnrealMap<FName, string> {
        const mapHandle = this.readUInt64()
        const out = new UnrealMap<FName, string>()
        new FPartialMapHandle(Number(mapHandle)).makeFullHandle(this.tags).forEachPair((it) => {
            out[it.key] = new FValueHandle(this.tags, it.value).asString()
        })
        return out
    }
 }