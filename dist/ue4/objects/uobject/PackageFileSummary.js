"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPackageFileSummary = exports.FGenerationInfo = void 0;
const FArchive_1 = require("../../reader/FArchive");
const Guid_1 = require("../core/misc/Guid");
const EngineVersion_1 = require("../core/misc/EngineVersion");
const FCompressedChunk_1 = require("../../assets/objects/FCompressedChunk");
const CustomVersion_1 = require("../core/serialization/CustomVersion");
const EPackageFlags_1 = require("./EPackageFlags");
const Versions_1 = require("../../versions/Versions");
const Game_1 = require("../../versions/Game");
/**
 * FGenerationInfo
 */
class FGenerationInfo {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.exportCount = x.readInt32();
            this.nameCount = x.readInt32();
        }
        else {
            this.exportCount = x;
            this.nameCount = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt32(this.exportCount);
        Ar.writeInt32(this.nameCount);
    }
}
exports.FGenerationInfo = FGenerationInfo;
/**
 * A "table of contents" for an Unreal package file.  Stored at the top of the file.
 */
class FPackageFileSummary {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.tag = Ar.readUInt32();
        this.legacyFileVersion = Ar.readInt32();
        this.legacyUE3Version = Ar.readInt32();
        this.fileVersionUE4 = Ar.readInt32();
        this.fileVersionLicenseUE4 = Ar.readInt32();
        this.customVersionContainer = Ar.readArray(() => new CustomVersion_1.FCustomVersion(Ar));
        this.totalHeaderSize = Ar.readInt32();
        this.folderName = Ar.readString();
        this.packageFlags = Ar.readUInt32();
        if ((this.packageFlags & EPackageFlags_1.EPackageFlags.PKG_FilterEditorOnly) !== 0) {
            Ar.isFilterEditorOnly = true;
        }
        this.nameCount = Ar.readInt32();
        this.nameOffset = Ar.readInt32();
        if (!Ar.isFilterEditorOnly) {
            if (this.fileVersionUE4 >= Versions_1.VER_UE4_ADDED_PACKAGE_SUMMARY_LOCALIZATION_ID) {
                const localizationId = Ar.readString();
            }
        }
        this.gatherableTextDataCount = Ar.readInt32();
        this.gatherableTextDataOffset = Ar.readInt32();
        this.exportCount = Ar.readInt32();
        this.exportOffset = Ar.readInt32();
        this.importCount = Ar.readInt32();
        this.importOffset = Ar.readInt32();
        this.dependsOffset = Ar.readInt32();
        this.softPackageReferencesCount = Ar.readInt32();
        this.softPackageReferencesOffset = Ar.readInt32();
        this.searchableNamesOffset = Ar.readInt32();
        this.thumbnailTableOffset = Ar.readInt32();
        if (Ar.game === Game_1.Ue4Version.GAME_VALORANT.game)
            Ar.pos += 8;
        this.guid = new Guid_1.FGuid(Ar);
        if (!Ar.isFilterEditorOnly) {
            if (this.fileVersionUE4 >= Versions_1.VER_UE4_ADDED_PACKAGE_OWNER) {
                const persistentGuid = new Guid_1.FGuid(Ar);
            }
            if (this.fileVersionUE4 >= Versions_1.VER_UE4_ADDED_PACKAGE_OWNER && Versions_1.VER_UE4_ADDED_PACKAGE_OWNER < Versions_1.VER_UE4_NON_OUTER_PACKAGE_IMPORT) {
                const ownerPersistentGuid = new Guid_1.FGuid(Ar);
            }
        }
        this.generations = Ar.readArray(() => new FGenerationInfo(Ar));
        this.savedByEngineVersion = new EngineVersion_1.FEngineVersion(Ar);
        this.compatibleWithEngineVersion = new EngineVersion_1.FEngineVersion(Ar);
        this.compressionFlags = Ar.readUInt32();
        this.compressedChunks = Ar.readArray(() => new FCompressedChunk_1.FCompressedChunk(Ar));
        this.packageSource = Ar.readUInt32();
        this.additionalPackagesToCook = Ar.readArray(() => Ar.readString());
        this.assetRegistryDataOffset = Ar.readInt32();
        this.bulkDataStartOffset = Ar.readInt32();
        this.worldTileInfoDataOffset = Ar.readInt32();
        this.chunkIds = Ar.readArray(() => Ar.readInt32());
        this.preloadDependencyCount = Ar.readInt32();
        this.preloadDependencyOffset = Ar.readInt32();
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeUInt32(this.tag);
        Ar.writeInt32(this.legacyFileVersion);
        Ar.writeInt32(this.legacyUE3Version);
        Ar.writeInt32(this.fileVersionUE4);
        Ar.writeInt32(this.fileVersionLicenseUE4);
        Ar.writeTArray(this.customVersionContainer, (it) => it.serialize(Ar));
        Ar.writeInt32(this.totalHeaderSize);
        Ar.writeString(this.folderName);
        Ar.writeUInt32(this.packageFlags);
        Ar.writeInt32(this.nameCount);
        Ar.writeInt32(this.nameOffset);
        Ar.writeInt32(this.gatherableTextDataCount);
        Ar.writeInt32(this.gatherableTextDataOffset);
        Ar.writeInt32(this.exportCount);
        Ar.writeInt32(this.exportOffset);
        Ar.writeInt32(this.importCount);
        Ar.writeInt32(this.importOffset);
        Ar.writeInt32(this.dependsOffset);
        Ar.writeInt32(this.softPackageReferencesCount);
        Ar.writeInt32(this.softPackageReferencesOffset);
        Ar.writeInt32(this.searchableNamesOffset);
        Ar.writeInt32(this.thumbnailTableOffset);
        this.guid.serialize(Ar);
        Ar.writeTArray(this.generations, (it) => it.serialize(Ar));
        this.savedByEngineVersion.serialize(Ar);
        this.compatibleWithEngineVersion.serialize(Ar);
        Ar.writeUInt32(this.compressionFlags);
        Ar.writeTArray(this.compressedChunks, (it) => it.serialize(Ar));
        Ar.writeUInt32(this.packageSource);
        Ar.writeTArray(this.additionalPackagesToCook, (it) => Ar.writeString(it));
        Ar.writeInt32(this.assetRegistryDataOffset);
        Ar.writeInt32(this.bulkDataStartOffset);
        Ar.writeInt32(this.worldTileInfoDataOffset);
        Ar.writeTArray(this.chunkIds, (it) => Ar.writeInt32(it));
        Ar.writeInt32(this.preloadDependencyCount);
        Ar.writeInt32(this.preloadDependencyOffset);
    }
}
exports.FPackageFileSummary = FPackageFileSummary;
