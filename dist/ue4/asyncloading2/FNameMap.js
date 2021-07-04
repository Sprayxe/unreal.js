"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FNameMap = void 0;
const AsyncLoading2_1 = require("./AsyncLoading2");
const FArchive_1 = require("../reader/FArchive");
const NameBatchSerialization_1 = require("../objects/uobject/NameBatchSerialization");
const FByteArchive_1 = require("../reader/FByteArchive");
const IoDispatcher_1 = require("../io/IoDispatcher");
const FName_1 = require("../objects/uobject/FName");
const NameTypes_1 = require("../objects/uobject/NameTypes");
/**
 * FNameMap
 */
class FNameMap {
    constructor() {
        /**
         * nameEntries
         * @type {Array<string>}
         * @public
         */
        this.nameEntries = [];
        /**
         * nameMapType
         * @type {FMappedName_EType}
         * @public
         */
        this.nameMapType = AsyncLoading2_1.FMappedName_EType.Global;
    }
    /**
     * Loads global
     * @param {FileProvider} provider Provider to use
     * @returns {void}
     * @public
     */
    loadGlobal(provider) {
        if (this.nameEntries.length)
            throw new Error("Nameentries must be empty");
        const namesId = IoDispatcher_1.createIoChunkId(0n, 0, IoDispatcher_1.EIoChunkType.LoaderGlobalNames);
        const hashesId = IoDispatcher_1.createIoChunkId(0n, 0, IoDispatcher_1.EIoChunkType.LoaderGlobalNameHashes);
        const nameBuffer = provider.saveChunk(namesId);
        const hashBuffer = provider.saveChunk(hashesId);
        this.load(nameBuffer, hashBuffer, AsyncLoading2_1.FMappedName_EType.Global);
    }
    /**
     * Length
     * @type {number}
     * @public
     */
    get length() {
        return this.nameEntries.length;
    }
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    load(nameBuffer, hashBuffer, nameMapType) {
        if (nameBuffer instanceof FArchive_1.FArchive) {
            this.nameEntries = NameBatchSerialization_1.loadNameBatch(nameBuffer, hashBuffer);
            this.nameMapType = nameMapType;
        }
        else {
            this.nameEntries = NameBatchSerialization_1.loadNameBatch(new FByteArchive_1.FByteArchive(nameBuffer), new FByteArchive_1.FByteArchive(hashBuffer));
            this.nameMapType = nameMapType;
        }
    }
    /**
     * Gets name
     * @param {FMappedName} mappedName Mapped name to look for
     * @returns {FName} Name
     * @public
     * @throws {Error}
     */
    getName(mappedName) {
        if (mappedName.getType() !== this.nameMapType)
            throw new Error("FMappedName type must be equal to this type");
        if (mappedName.getIndex() > this.nameEntries.length)
            throw new Error("FMappedName index must not be bigger than this' nameEntries's index");
        const nameEntry = this.nameEntries[mappedName.getIndex()];
        return FName_1.FName.createFromDisplayId(nameEntry, mappedName.num);
    }
    /**
     * Gets minimal name
     * @param {FMappedName} mappedName Mapped name to look for
     * @returns {FMinimalName} Minimal name
     * @public
     */
    getMinimalName(mappedName) {
        if (mappedName.getType() !== this.nameMapType)
            throw new Error("FMappedName type must be equal to this type");
        if (mappedName.getIndex() > this.nameEntries.length)
            throw new Error("FMappedName index must not be bigger than this' nameEntries's index");
        return new NameTypes_1.FMinimalName(new NameTypes_1.FNameEntryId(mappedName.getIndex()), mappedName.num, this.nameEntries);
    }
}
exports.FNameMap = FNameMap;
