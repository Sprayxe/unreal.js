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

export class FGenerationInfo {
    /**
     * Number of exports in the linker's ExportMap for this generation.
     */
    exportCount: number

    /**
     * Number of names in the linker's NameMap for this generation.
     */
    nameCount: number

    constructor(Ar: FArchive)
    constructor(exportCount: number, nameCount: number)
    constructor(x?: any, y?: any) {
        if (x instanceof FArchive) {
            this.exportCount = x.readInt32()
            this.nameCount = x.readInt32()
        } else {
            this.exportCount = x
            this.nameCount = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.exportCount)
        Ar.writeInt32(this.nameCount)
    }
}

/**
 * A "table of contents" for an Unreal package file.  Stored at the top of the file.
 */
export class FPackageFileSummary {
    tag: number
    legacyFileVersion: number
    legacyUE3Version: number
    fileVersionUE4: number
    fileVersionLicenseUE4: number
    customVersionContainer: FCustomVersion[]
    totalHeaderSize: number
    folderName: string
    packageFlags: number
    nameCount: number
    nameOffset: number
    gatherableTextDataCount: number
    gatherableTextDataOffset: number
    exportCount: number
    exportOffset: number
    importCount: number
    importOffset: number
    dependsOffset: number
    softPackageReferencesCount: number
    softPackageReferencesOffset: number
    searchableNamesOffset: number
    thumbnailTableOffset: number
    guid: FGuid
    generations: Array<FGenerationInfo>
    savedByEngineVersion: FEngineVersion
    compatibleWithEngineVersion: FEngineVersion
    compressionFlags: number
    compressedChunks: FCompressedChunk[]
    packageSource: number
    additionalPackagesToCook: string[]
    assetRegistryDataOffset: number
    bulkDataStartOffset: number
    worldTileInfoDataOffset: number
    chunkIds: number[]
    preloadDependencyCount: number
    preloadDependencyOffset: number

    constructor(Ar: FArchive)
    constructor(
        tag: number,
        legacyFileVersion: number,
        legacyUE3Version: number,
        fileVersionUE4: number,
        fileVersionLicenseUE4: number,
        customVersionContainer: FCustomVersion[],
        totalHeaderSize: number,
        folderName: string,
        packageFlags: number,
        nameCount: number,
        nameOffset: number,
        gatherableTextDataCount: number,
        gatherableTextDataOffset: number,
        exportCount: number,
        exportOffset: number,
        importCount: number,
        importOffset: number,
        dependsOffset: number,
        softPackageReferencesCount: number,
        softPackageReferencesOffset: number,
        searchableNamesOffset: number,
        thumbnailTableOffset: number,
        guid: FGuid,
        generations: FGenerationInfo[],
        savedByEngineVersion: FEngineVersion,
        compatibleWithEngineVersion: FEngineVersion,
        compressionFlags: number,
        compressedChunks: FCompressedChunk[],
        packageSource: number,
        additionalPackagesToCook: string[],
        assetRegistryDataOffset: number,
        bulkDataStartOffset: number,
        worldTileInfoDataOffset: number,
        chunkIds: number[],
        preloadDependencyCount: number,
        preloadDependencyOffset: number
    )
    constructor(...params) {
        if (params[0] instanceof FArchive) {
            const Ar = params[0]
            this.tag = Ar.readUInt32()
            this.legacyFileVersion = Ar.readInt32()
            this.legacyUE3Version = Ar.readInt32()
            this.fileVersionUE4 = Ar.readInt32()
            this.fileVersionLicenseUE4 = Ar.readInt32()
            this.customVersionContainer = Ar.readArray(() => new FCustomVersion(Ar))
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
            this.guid = new FGuid(Ar)
            if (!Ar.isFilterEditorOnly) {
                if (this.fileVersionUE4 >= VER_UE4_ADDED_PACKAGE_OWNER) {
                    const persistentGuid = new FGuid(Ar)
                }
                if (this.fileVersionUE4 >= VER_UE4_ADDED_PACKAGE_OWNER && VER_UE4_ADDED_PACKAGE_OWNER < VER_UE4_NON_OUTER_PACKAGE_IMPORT) {
                    const ownerPersistentGuid = new FGuid(Ar)
                }
            }
            this.generations = Ar.readArray(() => new FGenerationInfo(Ar))
            this.savedByEngineVersion = new FEngineVersion(Ar)
            this.compatibleWithEngineVersion = new FEngineVersion(Ar)
            this.compressionFlags = Ar.readUInt32()
            this.compressedChunks = Ar.readArray(() => new FCompressedChunk(Ar))
            this.packageSource = Ar.readUInt32()
            this.additionalPackagesToCook = Ar.readArray(() => Ar.readString())
            this.assetRegistryDataOffset = Ar.readInt32()
            this.bulkDataStartOffset = Ar.readInt32()
            this.worldTileInfoDataOffset = Ar.readInt32()
            this.chunkIds = Ar.readArray(() => Ar.readInt32())
            this.preloadDependencyCount = Ar.readInt32()
            this.preloadDependencyOffset = Ar.readInt32()
        } else {
            this.tag = params[0]
            this.legacyFileVersion = params[1]
            this.legacyUE3Version = params[2]
            this.fileVersionUE4 = params[3]
            this.fileVersionLicenseUE4 = params[4]
            this.customVersionContainer = params[5]
            this.totalHeaderSize = params[6]
            this.folderName = params[7]
            this.packageFlags = params[8]
            this.nameCount = params[9]
            this.nameOffset = params[10]
            this.gatherableTextDataCount = params[11]
            this.gatherableTextDataOffset = params[12]
            this.exportCount = params[13]
            this.exportOffset = params[14]
            this.importCount = params[15]
            this.importOffset = params[16]
            this.dependsOffset = params[17]
            this.softPackageReferencesCount = params[18]
            this.softPackageReferencesOffset = params[19]
            this.searchableNamesOffset = params[20]
            this.thumbnailTableOffset = params[21]
            this.guid = params[22]
            this.generations = params[23]
            this.savedByEngineVersion = params[24]
            this.compatibleWithEngineVersion = params[25]
            this.compressionFlags = params[26]
            this.compressedChunks = params[27]
            this.packageSource = params[28]
            this.additionalPackagesToCook = params[29]
            this.assetRegistryDataOffset = params[30]
            this.bulkDataStartOffset = params[31]
            this.worldTileInfoDataOffset = params[32]
            this.chunkIds = params[33]
            this.preloadDependencyCount = params[34]
            this.preloadDependencyOffset = params[25]
        }
    }

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