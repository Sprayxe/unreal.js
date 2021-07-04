"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAssetRegistryReader = exports.ASSET_REGISTRY_NUMBERED_NAME_BIT = exports.FAssetRegistryArchive = void 0;
const FArchiveProxy_1 = require("../../reader/FArchiveProxy");
const AssetDataTagMapSerializationDetails_1 = require("../objects/AssetDataTagMapSerializationDetails");
const NameBatchSerialization_1 = require("../../objects/uobject/NameBatchSerialization");
const FName_1 = require("../../objects/uobject/FName");
const NameTypes_1 = require("../../objects/uobject/NameTypes");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const AssetBundleData_1 = require("../objects/AssetBundleData");
const UnrealMap_1 = require("../../../util/UnrealMap");
class FAssetRegistryArchive extends FArchiveProxy_1.FArchiveProxy {
    constructor(wrappedAr) {
        super(wrappedAr);
    }
}
exports.FAssetRegistryArchive = FAssetRegistryArchive;
exports.ASSET_REGISTRY_NUMBERED_NAME_BIT = 0x80000000;
class FAssetRegistryReader extends FAssetRegistryArchive {
    constructor(inner) {
        super(inner);
        this.names = NameBatchSerialization_1.loadNameBatch(inner);
        this.tags = new AssetDataTagMapSerializationDetails_1.FStore(this);
    }
    clone() {
        const clone = new FAssetRegistryReader(this.wrappedAr);
        clone.names = this.names;
        clone.tags = this.tags;
        return clone;
    }
    readFName() {
        let index = this.readUInt32();
        let number = NameTypes_1.NAME_NO_NUMBER_INTERNAL;
        if ((index & exports.ASSET_REGISTRY_NUMBERED_NAME_BIT) > 0) {
            index -= exports.ASSET_REGISTRY_NUMBERED_NAME_BIT;
            number = this.readInt32();
        }
        if (index >= 0 && index < this.names.length) {
            return FName_1.FName.dummy(this.names[index], number);
        }
        else {
            throw new Exceptions_1.ParserException(`FName could not be read, requested index ${index}, name map size ${this.names.length}`, this);
        }
    }
    serializeTagsAndBundles(out) {
        out.tagsAndValues = this.loadTags();
        out.taggedAssetBundles = new AssetBundleData_1.FAssetBundleData(this);
    }
    loadTags() {
        const mapHandle = this.readUInt64();
        const out = new UnrealMap_1.UnrealMap();
        new AssetDataTagMapSerializationDetails_1.FPartialMapHandle(Number(mapHandle)).makeFullHandle(this.tags).forEachPair((it) => {
            out[it.key] = new AssetDataTagMapSerializationDetails_1.FValueHandle(this.tags, it.value).asString();
        });
        return out;
    }
}
exports.FAssetRegistryReader = FAssetRegistryReader;
