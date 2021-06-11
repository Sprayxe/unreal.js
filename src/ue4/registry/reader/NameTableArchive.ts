import { FAssetRegistryArchive } from "./AssetRegistryArchive";
import { FArchive } from "../../reader/FArchive";
import { ParserException } from "../../../exceptions/Exceptions";
import { FName, FNameEntry } from "../../objects/uobject/FName";
import { FAssetData } from "../objects/FAssetData";
import { FAssetBundleData } from "../objects/AssetBundleData";

export class FNameTableArchiveReader extends FAssetRegistryArchive {
    nameMap: FNameEntry[]

    constructor(wrappedArchive: FArchive) {
        super(wrappedArchive)

    }

    clone() {
        const clone = new FNameTableArchiveReader(this.wrappedAr)
        clone.nameMap = this.nameMap
        return clone
    }

    private serializeNameMap(): FNameEntry[] {
        const nameOffset = this.wrappedAr.readInt64()
        if (nameOffset > this.wrappedAr.size)
            throw ParserException(`This Name Table was corrupted. Name Offset $nameOffset > Size ${this.size}`)
        if (nameOffset > 0) {
            const originalOffset = this.wrappedAr.pos
            // We already verified that nameOffset isn't bigger than our archive so it's safe to cast to int
            this.wrappedAr.pos = Number(nameOffset)
            const nameCount = this.wrappedAr.readInt32()
            if (nameCount < 0)
                throw ParserException(`Negative name count offset in name table: ${nameCount}`)

            const minFNameEntrySize = 4 // sizeof(int32)
            const maxReservation = this.size - this.pos / minFNameEntrySize
            const nameMap = new Array<FNameEntry>(Math.min(nameCount, maxReservation))

            let x = 0
            while (x < nameCount)
                nameMap.push(new FNameEntry(this.wrappedAr))

            this.wrappedAr.pos = originalOffset
            return nameMap
        }
        return []
    }

    readFName(): FName {
        const nameIndex = this.readInt32()
        const extraIndex = this.readInt32()
        if (this.nameMap[nameIndex])
            return new FName(this.nameMap, nameIndex, extraIndex)
        else
            throw ParserException(`FName could not be read, requested index $nameIndex, name map size ${this.nameMap.length}`)
    }

    serializeTagsAndBundles(out: FAssetData) {
        // This is actually a FAssetDataTagMapSharedView which just contains a FAssetDataTagMap
        // which is just a TSortedMap<FName, FString>
        out.tagsAndValues = this.readTMap(this.readInt32(), () => {
            return {
                key: this.readFName(),
                value: this.readString()
            }
        })
        out.taggedAssetBundles = new FAssetBundleData([])
    }
}