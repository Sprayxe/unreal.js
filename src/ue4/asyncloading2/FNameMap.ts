import { FMappedName, FMappedName_EType } from "./AsyncLoading2";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FArchive } from "../reader/FArchive";
import { loadNameBatch } from "../objects/uobject/NameBatchSerialization";
import { FByteArchive } from "../reader/FByteArchive";
import { createIoChunkId, EIoChunkType } from "../io/IoDispatcher";
import { FName } from "../objects/uobject/FName";
import { FMinimalName, FNameEntryId } from "../objects/uobject/NameTypes";

/**
 * FNameMap
 */
export class FNameMap {
    /**
     * nameEntries
     * @type {Array<string>}
     * @public
     */
    nameEntries: string[] = []

    /**
     * nameMapType
     * @type {FMappedName_EType}
     * @public
     */
    nameMapType = FMappedName_EType.Global

    /**
     * Loads global
     * @param {FileProvider} provider Provider to use
     * @returns {void}
     * @public
     */
    loadGlobal(provider: FileProvider) {
        if (this.nameEntries.length)
            throw new Error("Nameentries must be empty")

        const namesId = createIoChunkId(0n, 0, EIoChunkType.LoaderGlobalNames)
        const hashesId = createIoChunkId(0n, 0, EIoChunkType.LoaderGlobalNameHashes)

        const nameBuffer = provider.saveChunk(namesId)
        const hashBuffer = provider.saveChunk(hashesId)

        this.load(nameBuffer, hashBuffer, FMappedName_EType.Global)
    }

    /**
     * Length
     * @type {number}
     * @public
     */
    get length() {
        return this.nameEntries.length
    }

    /**
     * Loads name entries
     * @param {Buffer} nameBuffer Name buffer
     * @param {Buffer} hashBuffer Hash buffer
     * @param {FMappedName_EType} nameMapType Type
     * @returns {void}
     * @public
     */
    load(nameBuffer: Buffer, hashBuffer: Buffer, nameMapType: FMappedName_EType)

    /**
     * Loads name entries
     * @param {FArchive} nameBuffer UE4 Reader
     * @param {FArchive} hashBuffer UE4 Reader
     * @param {FMappedName_EType} nameMapType Type
     * @returns {void}
     * @public
     */
    load(nameBuffer: FArchive, hashBuffer: FArchive, nameMapType: FMappedName_EType)

    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    load(nameBuffer: any, hashBuffer: any, nameMapType: FMappedName_EType) {
        if (nameBuffer instanceof FArchive) {
            this.nameEntries = loadNameBatch(nameBuffer, hashBuffer)
            this.nameMapType = nameMapType
        } else {
            this.nameEntries = loadNameBatch(new FByteArchive(nameBuffer), new FByteArchive(hashBuffer))
            this.nameMapType = nameMapType
        }
    }

    /**
     * Gets name
     * @param {FMappedName} mappedName Mapped name to look for
     * @returns {FName} Name
     * @public
     * @throws {Error}
     */
    getName(mappedName: FMappedName): FName {
        if (mappedName.getType() !== this.nameMapType)
            throw new Error("FMappedName type must be equal to this type")
        if (mappedName.getIndex() > this.nameEntries.length)
            throw new Error("FMappedName index must not be bigger than this' nameEntries's index")
        const nameEntry = this.nameEntries[mappedName.getIndex()]
        return FName.createFromDisplayId(nameEntry, mappedName.num)
    }

    /**
     * Gets minimal name
     * @param {FMappedName} mappedName Mapped name to look for
     * @returns {FMinimalName} Minimal name
     * @public
     */
    getMinimalName(mappedName: FMappedName): FMinimalName {
        if (mappedName.getType() !== this.nameMapType)
            throw new Error("FMappedName type must be equal to this type")
        if (mappedName.getIndex() > this.nameEntries.length)
            throw new Error("FMappedName index must not be bigger than this' nameEntries's index")
        return new FMinimalName(new FNameEntryId(mappedName.getIndex()), mappedName.num, this.nameEntries)
    }
}