"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FNameTableArchiveReader = void 0;
const AssetRegistryArchive_1 = require("./AssetRegistryArchive");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const FName_1 = require("../../objects/uobject/FName");
const AssetBundleData_1 = require("../objects/AssetBundleData");
class FNameTableArchiveReader extends AssetRegistryArchive_1.FAssetRegistryArchive {
    constructor(wrappedArchive) {
        super(wrappedArchive);
    }
    clone() {
        const clone = new FNameTableArchiveReader(this.wrappedAr);
        clone.nameMap = this.nameMap;
        return clone;
    }
    serializeNameMap() {
        const nameOffset = this.wrappedAr.readInt64();
        if (nameOffset > this.wrappedAr.size)
            throw new Exceptions_1.ParserException(`This Name Table was corrupted. Name Offset ${nameOffset} > Size ${this.size}`, this);
        if (nameOffset > 0) {
            const originalOffset = this.wrappedAr.pos;
            // We already verified that nameOffset isn't bigger than our archive so it's safe to cast to int
            this.wrappedAr.pos = Number(nameOffset);
            const nameCount = this.wrappedAr.readInt32();
            if (nameCount < 0)
                throw new Exceptions_1.ParserException(`Negative name count offset in name table: ${nameCount}`, this);
            const minFNameEntrySize = 4; // sizeof(int32)
            const maxReservation = this.size - this.pos / minFNameEntrySize;
            const nameMap = new Array(Math.min(nameCount, maxReservation));
            let x = 0;
            while (x < nameCount)
                nameMap.push(new FName_1.FNameEntry(this.wrappedAr));
            this.wrappedAr.pos = originalOffset;
            return nameMap;
        }
        return [];
    }
    readFName() {
        const nameIndex = this.readInt32();
        const extraIndex = this.readInt32();
        if (this.nameMap[nameIndex])
            return new FName_1.FName(this.nameMap, nameIndex, extraIndex);
        else
            throw new Exceptions_1.ParserException(`FName could not be read, requested index $nameIndex, name map size ${this.nameMap.length}`, this);
    }
    serializeTagsAndBundles(out) {
        // This is actually a FAssetDataTagMapSharedView which just contains a FAssetDataTagMap
        // which is just a TSortedMap<FName, FString>
        out.tagsAndValues = this.readTMap(this.readInt32(), () => {
            return {
                key: this.readFName(),
                value: this.readString()
            };
        });
        out.taggedAssetBundles = new AssetBundleData_1.FAssetBundleData([]);
    }
}
exports.FNameTableArchiveReader = FNameTableArchiveReader;
