import { FMappedName_EType, FMappedName } from "./AsyncLoading2";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FArchive } from "../reader/FArchive";
import { loadNameBatch } from "../objects/uobject/NameBatchSerialization";
import { FByteArchive } from "../reader/FByteArchive";
import { EIoChunkType, FIoChunkId } from "../io/IoDispatcher";
import { FName } from "../objects/uobject/FName";
import { FMinimalName, FNameEntryId } from "../objects/uobject/NameTypes";

export class FNameMap {
    nameEntries: string[] = []
    nameMapType = FMappedName_EType.Global

    loadGlobal(provider: FileProvider ) {
        if (!this.nameEntries.length)
            throw new Error("Nameentries must not be empty")

        const namesId = new FIoChunkId(0, 0, EIoChunkType.LoaderGlobalNames)
        const hashesId = new FIoChunkId(0, 0, EIoChunkType.LoaderGlobalNameHashes)

        const nameBuffer = provider.saveChunk(namesId)
        const hashBuffer = provider.saveChunk(hashesId)

        this.load(nameBuffer, hashBuffer, FMappedName_EType.Global)
    }

    size() {
        return this.nameEntries.length
    }

    load(nameBuffer: Buffer, hashBuffer: Buffer, nameMapType: FMappedName_EType)
    load(nameBuffer: FArchive, hashBuffer: FArchive, nameMapType: FMappedName_EType)
    load(nameBuffer: any, hashBuffer: any, nameMapType: FMappedName_EType) {
        if (nameBuffer instanceof FArchive) {
            this.nameEntries = loadNameBatch(nameBuffer, hashBuffer)
            this.nameMapType = nameMapType
        } else {
            this.nameEntries = loadNameBatch(new FByteArchive(nameBuffer), new FByteArchive(hashBuffer))
            this.nameMapType = nameMapType
        }
    }

    getName(mappedName: FMappedName): FName {
        if (mappedName.getType() !== this.nameMapType)
            throw new Error("FMappedName type must be equal to this type")
        if (mappedName.getIndex() > this.nameEntries.length)
            throw new Error("FMappedName index must not be bigger than this' nameEntries's index")
        const nameEntry = this.nameEntries[mappedName.getIndex()]
        return FName.createFromDisplayId(nameEntry, mappedName.num)
    }

    getNameOrNull(mappedName: FMappedName): FName {
        if (mappedName.getType() !== this.nameMapType)
            throw new Error("FMappedName type must be equal to this type")
        const index = mappedName.getIndex()
        if (index < this.nameEntries.length) {
            const nameEntry = this.nameEntries[mappedName.getIndex()]
            return FName.createFromDisplayId(nameEntry, mappedName.num)
        }
        return null
    }

    getMinimalName(mappedName: FMappedName): FMinimalName {
        if (mappedName.getType() !== this.nameMapType)
            throw new Error("FMappedName type must be equal to this type")
        if (mappedName.getIndex() > this.nameEntries.length)
            throw new Error("FMappedName index must not be bigger than this' nameEntries's index")
        return new FMinimalName(new FNameEntryId(mappedName.getIndex()), mappedName.num, this.nameEntries)
    }
}