"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FObjectImport = exports.FObjectExport = exports.FObjectResource = exports.FPackageIndex = void 0;
const FName_1 = require("./FName");
const PakPackage_1 = require("../../assets/PakPackage");
const FAssetArchive_1 = require("../../assets/reader/FAssetArchive");
const Guid_1 = require("../core/misc/Guid");
const Versions_1 = require("../../versions/Versions");
const IoPackage_1 = require("../../assets/IoPackage");
/**
 * FPackageIndex
 */
class FPackageIndex {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        /**
         * Owner
         * @type {Package}
         * @public
         */
        this.owner = null;
        if (x instanceof FAssetArchive_1.FAssetArchive) {
            this.index = x.readInt32();
            this.owner = x.owner;
        }
        else if (typeof x === "number") {
            this.index = x;
            this.owner = y;
        }
        else {
            this.index = 0;
        }
    }
    /**
     * Name
     * @type {FName}
     * @public
     */
    get name() {
        let name;
        if (this.owner instanceof PakPackage_1.PakPackage) {
            name = this.owner.getResource(this).objectName;
        }
        else if (this.owner instanceof IoPackage_1.IoPackage) {
            const n = this.owner.findObjectMinimal(this);
            name = n?.name;
        }
        return name || FName_1.FName.NAME_None;
    }
    /**
     * Whether is import
     * @returns {boolean} Result
     * @public
     */
    isImport() {
        return this.index < 0;
    }
    /**
     * Whether is export
     * @returns {boolean} Result
     * @public
     */
    isExport() {
        return this.index > 0;
    }
    /**
     * Whether is null
     * @returns {boolean} Result
     * @public
     */
    isNull() {
        return this.index === 0;
    }
    /**
     * Turns this to import
     * @returns {number} Import value
     * @public
     */
    toImport() {
        if (!this.isImport())
            throw new Error("Object is not an import.");
        return -this.index - 1;
    }
    /**
     * Turns this to export
     * @returns {number} Export value
     * @public
     */
    toExport() {
        if (!this.isExport())
            throw new Error("Object is not an export.");
        return this.index - 1;
    }
    /**
     * Whether equals other object
     * @param {?any} other Object to check
     * @returns {boolean} Result
     * @public
     */
    equals(other) {
        if (this === other)
            return true;
        if (!(other instanceof FPackageIndex))
            return false;
        other;
        if (this.index !== other.index)
            return false;
        return this.owner == other.owner;
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt32(this.index);
    }
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        if (this.isImport()) {
            return `Import: ${this.toImport()}`;
        }
        else if (this.isExport()) {
            return `Export: ${this.toExport()}`;
        }
        else {
            return null;
        }
    }
    /**
     * Loads object (WARNING: MIGHT BE RECURSIVE, TRY TO AVOID THIS)
     * @returns {UObject} Object
     * @public
     */
    load() {
        return this.owner?.loadObject(this);
    }
}
exports.FPackageIndex = FPackageIndex;
/**
 * FObjectResource
 * @abstract
 */
class FObjectResource {
}
exports.FObjectResource = FObjectResource;
/**
 * FObjectExport
 * @extends {FObjectResource}
 */
class FObjectExport extends FObjectResource {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        super();
        if (params[0] instanceof FAssetArchive_1.FAssetArchive) {
            const Ar = params[0];
            this.classIndex = new FPackageIndex(Ar);
            this.superIndex = new FPackageIndex(Ar);
            this.templateIndex = Ar.ver >= Versions_1.VER_UE4_TemplateIndex_IN_COOKED_EXPORTS ? new FPackageIndex(Ar) : new FPackageIndex();
            this.outerIndex = new FPackageIndex(Ar);
            this.objectName = Ar.readFName();
            this.objectFlags = Ar.readUInt32();
            if (Ar.ver < Versions_1.VER_UE4_64BIT_EXPORTMAP_SERIALSIZES) {
                this.serialSize = Ar.readInt32();
                this.serialOffset = Ar.readInt32();
            }
            else {
                this.serialSize = Number(Ar.readInt64());
                this.serialOffset = Number(Ar.readInt64());
            }
            this.forcedExport = Ar.readBoolean();
            this.notForClient = Ar.readBoolean();
            this.notForServer = Ar.readBoolean();
            this.packageGuid = new Guid_1.FGuid(Ar);
            this.packageFlags = Ar.readUInt32();
            this.notAlwaysLoadedForEditorGame = Ar.ver >= Versions_1.VER_UE4_LOAD_FOR_EDITOR_GAME ? Ar.readBoolean() : true;
            this.isAsset = Ar.ver >= Versions_1.VER_UE4_COOKED_ASSETS_IN_EDITOR_SUPPORT ? Ar.readBoolean() : false;
            if (Ar.ver >= Versions_1.VER_UE4_PRELOAD_DEPENDENCIES_IN_COOKED_EXPORTS) {
                this.firstExportDependency = Ar.readInt32();
                this.serializationBeforeSerializationDependencies = Ar.readInt32();
                this.createBeforeSerializationDependencies = Ar.readInt32();
                this.serializationBeforeCreateDependencies = Ar.readInt32();
                this.createBeforeCreateDependencies = Ar.readInt32();
            }
            else {
                this.firstExportDependency = -1;
                this.serializationBeforeSerializationDependencies = 0;
                this.createBeforeSerializationDependencies = 0;
                this.serializationBeforeCreateDependencies = 0;
                this.createBeforeCreateDependencies = 0;
            }
        }
        else {
            this.classIndex = params[0];
            this.superIndex = params[1];
            this.templateIndex = params[2];
            this.outerIndex = params[3];
            this.objectName = params[4];
            this.objectFlags = params[5];
            this.serialSize = params[6];
            this.serialOffset = params[7];
            this.forcedExport = params[8];
            this.notForClient = params[9];
            this.notForServer = params[10];
            this.packageGuid = params[11];
            this.packageFlags = params[12];
            this.notAlwaysLoadedForEditorGame = params[13];
            this.isAsset = params[14];
            this.firstExportDependency = params[15];
            this.serializationBeforeSerializationDependencies = params[16];
            this.createBeforeSerializationDependencies = params[17];
            this.serializationBeforeCreateDependencies = params[18];
            this.createBeforeCreateDependencies = params[19];
        }
    }
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.objectName.text;
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.classIndex.serialize(Ar);
        this.superIndex.serialize(Ar);
        if (Ar.ver >= Versions_1.VER_UE4_TemplateIndex_IN_COOKED_EXPORTS)
            this.templateIndex.serialize(Ar);
        this.outerIndex.serialize(Ar);
        Ar.writeFName(this.objectName);
        Ar.writeUInt32(this.objectFlags);
        if (Ar.ver < Versions_1.VER_UE4_64BIT_EXPORTMAP_SERIALSIZES) {
            Ar.writeInt32(this.serialSize);
            Ar.writeInt32(this.serialOffset);
        }
        else {
            Ar.writeInt64(this.serialSize);
            Ar.writeInt64(this.serialOffset);
        }
        Ar.writeBoolean(this.forcedExport);
        Ar.writeBoolean(this.notForClient);
        Ar.writeBoolean(this.notForServer);
        this.packageGuid.serialize(Ar);
        Ar.writeUInt32(this.packageFlags);
        if (Ar.ver >= Versions_1.VER_UE4_LOAD_FOR_EDITOR_GAME)
            Ar.writeBoolean(this.notAlwaysLoadedForEditorGame);
        if (Ar.ver >= Versions_1.VER_UE4_COOKED_ASSETS_IN_EDITOR_SUPPORT)
            Ar.writeBoolean(this.isAsset);
        if (Ar.ver >= Versions_1.VER_UE4_PRELOAD_DEPENDENCIES_IN_COOKED_EXPORTS) {
            Ar.writeInt32(this.firstExportDependency);
            Ar.writeInt32(this.serializationBeforeSerializationDependencies);
            Ar.writeInt32(this.createBeforeSerializationDependencies);
            Ar.writeInt32(this.serializationBeforeCreateDependencies);
            Ar.writeInt32(this.createBeforeCreateDependencies);
        }
    }
}
exports.FObjectExport = FObjectExport;
/**
 * FObjectImport
 * @extends {FObjectResource}
 */
class FObjectImport extends FObjectResource {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        super();
        if (params[0] instanceof FAssetArchive_1.FAssetArchive) {
            const Ar = params[0];
            this.classPackage = Ar.readFName();
            this.className = Ar.readFName();
            this.outerIndex = new FPackageIndex(Ar);
            this.objectName = Ar.readFName();
            if (Ar.ver >= Versions_1.VER_UE4_NON_OUTER_PACKAGE_IMPORT && !Ar.isFilterEditorOnly) {
                const packageName = Ar.readFName();
            }
        }
        else {
            this.classPackage = params[0];
            this.className = params[1];
            this.outerIndex = params[2];
            this.objectName = params[3];
        }
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeFName(this.classPackage);
        Ar.writeFName(this.className);
        this.outerIndex.serialize(Ar);
        Ar.writeFName(this.objectName);
    }
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.objectName.text;
    }
}
exports.FObjectImport = FObjectImport;
