import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FGuid } from "../core/misc/Guid";
import { FEngineVersion } from "../core/misc/EngineVersion";
import { FCompressedChunk } from "../../assets/objects/FCompressedChunk";
import { FCustomVersion } from "../core/serialization/CustomVersion";
/**
 * FGenerationInfo
 */
export declare class FGenerationInfo {
    /**
     * Number of exports in the linker's ExportMap for this generation
     * @type {number}
     * @public
     */
    exportCount: number;
    /**
     * Number of names in the linker's NameMap for this generation
     * @type {number}
     * @public
     */
    nameCount: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} exportCount Export count to use
     * @param {number} nameCount Name count to use
     * @constructor
     * @public
     */
    constructor(exportCount: number, nameCount: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
/**
 * A "table of contents" for an Unreal package file.  Stored at the top of the file.
 */
export declare class FPackageFileSummary {
    /**
     * tag
     * @type {number}
     * @public
     */
    tag: number;
    /**
     * legacyFileVersion
     * @type {number}
     * @public
     */
    legacyFileVersion: number;
    /**
     * legacyUE3Version
     * @type {number}
     * @public
     */
    legacyUE3Version: number;
    /**
     * fileVersionUE4
     * @type {number}
     * @public
     */
    fileVersionUE4: number;
    /**
     * fileVersionLicenseUE4
     * @type {number}
     * @public
     */
    fileVersionLicenseUE4: number;
    /**
     * customVersionContainer
     * @type {Array<FCustomVersion>}
     * @public
     */
    customVersionContainer: FCustomVersion[];
    /**
     * totalHeaderSize
     * @type {number}
     * @public
     */
    totalHeaderSize: number;
    /**
     * folderName
     * @type {string}
     * @public
     */
    folderName: string;
    /**
     * packageFlags
     * @type {number}
     * @public
     */
    packageFlags: number;
    /**
     * nameCount
     * @type {number}
     * @public
     */
    nameCount: number;
    /**
     * nameOffset
     * @type {number}
     * @public
     */
    nameOffset: number;
    /**
     * gatherableTextDataCount
     * @type {number}
     * @public
     */
    gatherableTextDataCount: number;
    /**
     * gatherableTextDataOffset
     * @type {number}
     * @public
     */
    gatherableTextDataOffset: number;
    /**
     * exportCount
     * @type {number}
     * @public
     */
    exportCount: number;
    /**
     * exportOffset
     * @type {number}
     * @public
     */
    exportOffset: number;
    /**
     * importCount
     * @type {number}
     * @public
     */
    importCount: number;
    /**
     * importOffset
     * @type {number}
     * @public
     */
    importOffset: number;
    /**
     * dependsOffset
     * @type {number}
     * @public
     */
    dependsOffset: number;
    /**
     * softPackageReferencesCount
     * @type {number}
     * @public
     */
    softPackageReferencesCount: number;
    /**
     * softPackageReferencesOffset
     * @type {number}
     * @public
     */
    softPackageReferencesOffset: number;
    /**
     * searchableNamesOffset
     * @type {number}
     * @public
     */
    searchableNamesOffset: number;
    /**
     * thumbnailTableOffset
     * @type {number}
     * @public
     */
    thumbnailTableOffset: number;
    /**
     * guid
     * @type {FGuid}
     * @public
     */
    guid: FGuid;
    /**
     * generations
     * @type {Array<FGenerationInfo>}
     * @public
     */
    generations: FGenerationInfo[];
    /**
     * savedByEngineVersion
     * @type {FEngineVersion}
     * @public
     */
    savedByEngineVersion: FEngineVersion;
    /**
     * compatibleWithEngineVersion
     * @type {FEngineVersion}
     * @public
     */
    compatibleWithEngineVersion: FEngineVersion;
    /**
     * compressionFlags
     * @type {number}
     * @public
     */
    compressionFlags: number;
    /**
     * compressedChunks
     * @type {Array<FCompressedChunk>}
     * @public
     */
    compressedChunks: FCompressedChunk[];
    /**
     * packageSource
     * @type {number}
     * @public
     */
    packageSource: number;
    /**
     * additionalPackagesToCook
     * @type {Array<string>}
     * @public
     */
    additionalPackagesToCook: string[];
    /**
     * assetRegistryDataOffset
     * @type {number}
     * @public
     */
    assetRegistryDataOffset: number;
    /**
     * bulkDataStartOffset
     * @type {number}
     * @public
     */
    bulkDataStartOffset: number;
    /**
     * worldTileInfoDataOffset
     * @type {number}
     * @public
     */
    worldTileInfoDataOffset: number;
    /**
     * chunkIds
     * @type {Array<number>}
     * @public
     */
    chunkIds: number[];
    /**
     * preloadDependencyCount
     * @type {number}
     * @public
     */
    preloadDependencyCount: number;
    /**
     * preloadDependencyOffset
     * @type {number}
     * @public
     */
    preloadDependencyOffset: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
