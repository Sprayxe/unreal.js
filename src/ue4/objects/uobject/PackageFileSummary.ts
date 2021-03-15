import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FGuid } from "../core/misc/Guid";
import { FEngineVersion } from "../core/misc/EngineVersion";
import { FCompressedChunk } from "../../assets/objects/FCompressedChunk";
import { FCustomVersion } from "../core/serialization/CustomVersion";
import { EPackageFlags } from "./EPackageFlags";
import { VER_UE4_ADDED_PACKAGE_OWNER, VER_UE4_ADDED_PACKAGE_SUMMARY_LOCALIZATION_ID } from "../../versions/Versions";

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
            this.customVersionContainer = Ar.readTArray(() => new FCustomVersion(Ar))
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
                if (this.fileVersionUE4 in VER_UE4_ADDED_PACKAGE_OWNER until VER_UE4_NON_OUTER_PACKAGE_IMPORT) {
                    const ownerPersistentGuid = new FGuid(Ar)
                }
            }
            this.generations = Ar.readTArray(() => new FGenerationInfo(Ar))
            this.savedByEngineVersion = new FEngineVersion(Ar)
            this.compatibleWithEngineVersion = new FEngineVersion(Ar)
            this.compressionFlags = Ar.readUInt32()
            this.compressedChunks = Ar.readTArray(() => new FCompressedChunk(Ar))
            this.packageSource = Ar.readUInt32()
            this.additionalPackagesToCook = Ar.readTArray(() => Ar.readString())
            this.assetRegistryDataOffset = Ar.readInt32()
            this.bulkDataStartOffset = Ar.readInt32()
            this.worldTileInfoDataOffset = Ar.readInt32()
            this.chunkIds = Ar.readTArray(() => Ar.readInt32())
            this.preloadDependencyCount = Ar.readInt32()
            this.preloadDependencyOffset = Ar.readInt32()
        } else {

        }
    }
}