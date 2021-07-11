import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FGuid } from "../core/misc/Guid";
import { FEngineVersion } from "../core/misc/EngineVersion";
import { FCompressedChunk } from "../../assets/objects/FCompressedChunk";
import { FCustomVersion } from "../core/serialization/CustomVersion";
import { EPackageFlags } from "./EPackageFlags";
import {
    VER_UE4_ADDED_PACKAGE_OWNER,
    VER_UE4_ADDED_PACKAGE_SUMMARY_LOCALIZATION_ID,
    VER_UE4_NON_OUTER_PACKAGE_IMPORT
} from "../../versions/Versions";
import { Ue4Version } from "../../versions/Game";

/**
 * FGenerationInfo
 */
export class FGenerationInfo {
    /**
     * Number of exports in the linker's ExportMap for this generation
     * @type {number}
     * @public
     */
    exportCount: number

    /**
     * Number of names in the linker's NameMap for this generation
     * @type {number}
     * @public
     */
    nameCount: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {number} exportCount Export count to use
     * @param {number} nameCount Name count to use
     * @constructor
     * @public
     */
    constructor(exportCount: number, nameCount: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.exportCount = x.readInt32()
            this.nameCount = x.readInt32()
        } else {
            this.exportCount = x
            this.nameCount = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.exportCount)
        Ar.writeInt32(this.nameCount)
    }
}

/**
 * A "table of contents" for an Unreal package file.  Stored at the top of the file.
 */
export class FPackageFileSummary {
    /**
     * tag
     * @type {number}
     * @public
     */
    tag: number

    /**
     * legacyFileVersion
     * @type {number}
     * @public
     */
    legacyFileVersion: number

    /**
     * legacyUE3Version
     * @type {number}
     * @public
     */
    legacyUE3Version: number

    /**
     * fileVersionUE4
     * @type {number}
     * @public
     */
    fileVersionUE4: number

    /**
     * fileVersionLicenseUE4
     * @type {number}
     * @public
     */
    fileVersionLicenseUE4: number

    /**
     * customVersionContainer
     * @type {Array<FCustomVersion>}
     * @public
     */
    customVersionContainer: FCustomVersion[]

    /**
     * totalHeaderSize
     * @type {number}
     * @public
     */
    totalHeaderSize: number

    /**
     * folderName
     * @type {string}
     * @public
     */
    folderName: string

    /**
     * packageFlags
     * @type {number}
     * @public
     */
    packageFlags: number

    /**
     * nameCount
     * @type {number}
     * @public
     */
    nameCount: number

    /**
     * nameOffset
     * @type {number}
     * @public
     */
    nameOffset: number

    /**
     * gatherableTextDataCount
     * @type {number}
     * @public
     */
    gatherableTextDataCount: number

    /**
     * gatherableTextDataOffset
     * @type {number}
     * @public
     */
    gatherableTextDataOffset: number

    /**
     * exportCount
     * @type {number}
     * @public
     */
    exportCount: number

    /**
     * exportOffset
     * @type {number}
     * @public
     */
    exportOffset: number

    /**
     * importCount
     * @type {number}
     * @public
     */
    importCount: number

    /**
     * importOffset
     * @type {number}
     * @public
     */
    importOffset: number

    /**
     * dependsOffset
     * @type {number}
     * @public
     */
    dependsOffset: number

    /**
     * softPackageReferencesCount
     * @type {number}
     * @public
     */
    softPackageReferencesCount: number

    /**
     * softPackageReferencesOffset
     * @type {number}
     * @public
     */
    softPackageReferencesOffset: number

    /**
     * searchableNamesOffset
     * @type {number}
     * @public
     */
    searchableNamesOffset: number

    /**
     * thumbnailTableOffset
     * @type {number}
     * @public
     */
    thumbnailTableOffset: number

    /**
     * guid
     * @type {FGuid}
     * @public
     */
    guid: FGuid

    /**
     * generations
     * @type {Array<FGenerationInfo>}
     * @public
     */
    generations: FGenerationInfo[]

    /**
     * savedByEngineVersion
     * @type {FEngineVersion}
     * @public
     */
    savedByEngineVersion: FEngineVersion

    /**
     * compatibleWithEngineVersion
     * @type {FEngineVersion}
     * @public
     */
    compatibleWithEngineVersion: FEngineVersion

    /**
     * compressionFlags
     * @type {number}
     * @public
     */
    compressionFlags: number

    /**
     * compressedChunks
     * @type {Array<FCompressedChunk>}
     * @public
     */
    compressedChunks: FCompressedChunk[]

    /**
     * packageSource
     * @type {number}
     * @public
     */
    packageSource: number

    /**
     * additionalPackagesToCook
     * @type {Array<string>}
     * @public
     */
    additionalPackagesToCook: string[]

    /**
     * assetRegistryDataOffset
     * @type {number}
     * @public
     */
    assetRegistryDataOffset: number

    /**
     * bulkDataStartOffset
     * @type {number}
     * @public
     */
    bulkDataStartOffset: number

    /**
     * worldTileInfoDataOffset
     * @type {number}
     * @public
     */
    worldTileInfoDataOffset: number

    /**
     * chunkIds
     * @type {Array<number>}
     * @public
     */
    chunkIds: number[]

    /**
     * preloadDependencyCount
     * @type {number}
     * @public
     */
    preloadDependencyCount: number

    /**
     * preloadDependencyOffset
     * @type {number}
     * @public
     */
    preloadDependencyOffset: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.tag = Ar.readUInt32()
        this.legacyFileVersion = Ar.readInt32()
        this.legacyUE3Version = Ar.readInt32()
        this.fileVersionUE4 = Ar.readInt32()
        this.fileVersionLicenseUE4 = Ar.readInt32()
        const cvConLen = Ar.readInt32()
        this.customVersionContainer = new Array(cvConLen)
        for (let i = 0; i < cvConLen; ++i) {
            this.customVersionContainer[i] = new FCustomVersion(Ar)
        }
        this.totalHeaderSize = Ar.readInt32()
        this.folderName = Ar.readString()
        this.packageFlags = Ar.readUInt32()
        if ((this.packageFlags & EPackageFlags.PKG_FilterEditorOnly) !== 0) {
            Ar.isFilterEditorOnly = true
        }
        this.nameCount = Ar.readInt32()
        this.nameOffset = Ar.readInt32()
        if (!Ar.isFilterEditorOnly) {
            if (this.fileVersionUE4 >= VER_UE4_ADDED_PACKAGE_SUMMARY_LOCALIZATION_ID) {
                const localizationId = Ar.readString()
            }
        }
        this.gatherableTextDataCount = Ar.readInt32()
        this.gatherableTextDataOffset = Ar.readInt32()
        this.exportCount = Ar.readInt32()
        this.exportOffset = Ar.readInt32()
        this.importCount = Ar.readInt32()
        this.importOffset = Ar.readInt32()
        this.dependsOffset = Ar.readInt32()
        this.softPackageReferencesCount = Ar.readInt32()
        this.softPackageReferencesOffset = Ar.readInt32()
        this.searchableNamesOffset = Ar.readInt32()
        this.thumbnailTableOffset = Ar.readInt32()
        if (Ar.game === Ue4Version.GAME_VALORANT.game) Ar.pos += 8
        this.guid = new FGuid(Ar)
        if (!Ar.isFilterEditorOnly) {
            if (this.fileVersionUE4 >= VER_UE4_ADDED_PACKAGE_OWNER) {
                const persistentGuid = new FGuid(Ar)
            }
            if (this.fileVersionUE4 >= VER_UE4_ADDED_PACKAGE_OWNER && VER_UE4_ADDED_PACKAGE_OWNER < VER_UE4_NON_OUTER_PACKAGE_IMPORT) {
                const ownerPersistentGuid = new FGuid(Ar)
            }
        }
        const genLen = Ar.readInt32()
        this.generations = new Array(genLen)
        for (let i = 0; i < genLen; ++i) {
            this.generations[i] = new FGenerationInfo(Ar)
        }
        this.savedByEngineVersion = new FEngineVersion(Ar)
        this.compatibleWithEngineVersion = new FEngineVersion(Ar)
        this.compressionFlags = Ar.readUInt32()
        const comFlagsLen = Ar.readInt32()
        this.compressedChunks = new Array(comFlagsLen)
        for (let i = 0; i < comFlagsLen; ++i) {
            this.compressedChunks[i] = new FCompressedChunk(Ar)
        }
        this.packageSource = Ar.readUInt32()
        const addPkgLen = Ar.readInt32()
        this.additionalPackagesToCook = new Array(addPkgLen)
        for (let i = 0; i < comFlagsLen; ++i) {
            this.additionalPackagesToCook[i] = Ar.readString()
        }
        this.assetRegistryDataOffset = Ar.readInt32()
        this.bulkDataStartOffset = Ar.readInt32()
        this.worldTileInfoDataOffset = Ar.readInt32()
        const chunkIdsLen = Ar.readInt32()
        this.chunkIds = new Array(chunkIdsLen)
        for (let i = 0; i < chunkIdsLen; ++i) {
            this.chunkIds[i] = Ar.readInt32()
        }
        this.preloadDependencyCount = Ar.readInt32()
        this.preloadDependencyOffset = Ar.readInt32()
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.tag)
        Ar.writeInt32(this.legacyFileVersion)
        Ar.writeInt32(this.legacyUE3Version)
        Ar.writeInt32(this.fileVersionUE4)
        Ar.writeInt32(this.fileVersionLicenseUE4)
        Ar.writeTArray(this.customVersionContainer, (it) => it.serialize(Ar))
        Ar.writeInt32(this.totalHeaderSize)
        Ar.writeString(this.folderName)
        Ar.writeUInt32(this.packageFlags)
        Ar.writeInt32(this.nameCount)
        Ar.writeInt32(this.nameOffset)
        Ar.writeInt32(this.gatherableTextDataCount)
        Ar.writeInt32(this.gatherableTextDataOffset)
        Ar.writeInt32(this.exportCount)
        Ar.writeInt32(this.exportOffset)
        Ar.writeInt32(this.importCount)
        Ar.writeInt32(this.importOffset)
        Ar.writeInt32(this.dependsOffset)
        Ar.writeInt32(this.softPackageReferencesCount)
        Ar.writeInt32(this.softPackageReferencesOffset)
        Ar.writeInt32(this.searchableNamesOffset)
        Ar.writeInt32(this.thumbnailTableOffset)
        this.guid.serialize(Ar)
        Ar.writeTArray(this.generations, (it) => it.serialize(Ar))
        this.savedByEngineVersion.serialize(Ar)
        this.compatibleWithEngineVersion.serialize(Ar)
        Ar.writeUInt32(this.compressionFlags)
        Ar.writeTArray(this.compressedChunks, (it) => it.serialize(Ar))
        Ar.writeUInt32(this.packageSource)
        Ar.writeTArray(this.additionalPackagesToCook, (it) => Ar.writeString(it))
        Ar.writeInt32(this.assetRegistryDataOffset)
        Ar.writeInt32(this.bulkDataStartOffset)
        Ar.writeInt32(this.worldTileInfoDataOffset)
        Ar.writeTArray(this.chunkIds, (it) => Ar.writeInt32(it))
        Ar.writeInt32(this.preloadDependencyCount)
        Ar.writeInt32(this.preloadDependencyOffset)
    }
}