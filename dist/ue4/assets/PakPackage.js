"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PakPackage = void 0;
const Game_1 = require("../versions/Game");
const FName_1 = require("../objects/uobject/FName");
const Package_1 = require("./Package");
const PackageFileSummary_1 = require("../objects/uobject/PackageFileSummary");
const ObjectResource_1 = require("../objects/uobject/ObjectResource");
const FAssetArchive_1 = require("./reader/FAssetArchive");
const UObject_1 = require("./exports/UObject");
const Exceptions_1 = require("../../exceptions/Exceptions");
const EPackageFlags_1 = require("../objects/uobject/EPackageFlags");
const PayloadType_1 = require("./util/PayloadType");
const UScriptStruct_1 = require("./exports/UScriptStruct");
const ObjectTypeRegistry_1 = require("./ObjectTypeRegistry");
const FAssetArchiveWriter_1 = require("./writer/FAssetArchiveWriter");
const lodash_1 = require("lodash");
const Lazy_1 = require("../../util/Lazy");
/**
 * UE4 Pak Package
 * @extends {Package}
 */
class PakPackage extends Package_1.Package {
    /**
     * Creates an instance
     * @param {Buffer} uasset Uasset data
     * @param {?Buffer} uexp Uexp data
     * @param {?Buffer} ubulk Ubulk data
     * @param {string} name Name of package file
     * @param {?FileProvider} provider File provider
     * @param {?Ue4Version} game Game that is used
     * @constructor
     * @public
     */
    constructor(uasset, uexp = null, ubulk = null, name, provider = null, game = Game_1.Ue4Version.GAME_UE4_LATEST) {
        super(name, provider, game);
        /**
         * Pak magic
         * @type {number}
         * @protected
         */
        this.packageMagic = 0x9E2A83C1;
        /**
         * UEXP data
         * @type {?Buffer}
         * @public
         */
        this.uexp = null;
        /**
         * UBULK data
         * @type {?Buffer}
         * @public
         */
        this.ubulk = null;
        /**
         * File provider
         * @type {?FileProvider}
         * @public
         */
        this.provider = null;
        /**
         * Game that is used
         * @type {Ue4Version}
         * @public
         */
        this.game = Game_1.Ue4Version.GAME_UE4_LATEST;
        this.uasset = uasset;
        this.uexp = uexp;
        this.ubulk = ubulk;
        this.fileName = name;
        this.provider = provider;
        this.game = game;
        this.version = this.game.version;
        // init
        this.name = provider?.compactFilePath(this.fileName)?.substring(0, this.fileName.lastIndexOf(".")) || this.fileName;
        const uassetAr = new FAssetArchive_1.FAssetArchive(this.uasset, this.provider, this.fileName);
        const uexpAr = this.uexp ? new FAssetArchive_1.FAssetArchive(this.uexp, this.provider, this.fileName) : uassetAr;
        const ubulkAr = this.ubulk ? new FAssetArchive_1.FAssetArchive(this.ubulk, this.provider, this.fileName) : null;
        uassetAr.game = this.game.game;
        uassetAr.ver = this.version;
        uassetAr.owner = this;
        uexpAr.game = this.game.game;
        uexpAr.ver = this.version;
        uexpAr.owner = this;
        if (ubulkAr) {
            ubulkAr.game = this.game.game;
            ubulkAr.ver = this.version;
            ubulkAr.owner = this;
        }
        this.nameMap = [];
        this.importMap = [];
        this.exportMap = [];
        this.info = new PackageFileSummary_1.FPackageFileSummary(uassetAr);
        if (this.info.tag !== this.packageMagic)
            throw new Exceptions_1.ParserException(`Invalid uasset magic, ${this.info.tag} !== ${this.packageMagic}`, uassetAr);
        const ver = this.info.fileVersionUE4;
        if (ver > 0) {
            uassetAr.ver = ver;
            uexpAr.ver = ver;
            if (ubulkAr)
                ubulkAr.ver = ver;
        }
        this.packageFlags = this.info.packageFlags;
        uassetAr.pos = this.info.nameOffset;
        let i = 0;
        while (i < this.info.nameCount) {
            this.nameMap.push(new FName_1.FNameEntry(uassetAr));
            ++i;
        }
        uassetAr.pos = this.info.importOffset;
        let x = 0;
        while (x < this.info.importCount) {
            this.importMap.push(new ObjectResource_1.FObjectImport(uassetAr));
            ++x;
        }
        uassetAr.pos = this.info.exportOffset;
        let y = 0;
        while (y < this.info.exportCount) {
            this.exportMap.push(new ObjectResource_1.FObjectExport(uassetAr));
            ++y;
        }
        // Setup uexp reader
        if (this.uexp != null) {
            uexpAr.uassetSize = this.info.totalHeaderSize;
        }
        uexpAr.bulkDataStartOffset = this.info.bulkDataStartOffset;
        uexpAr.useUnversionedPropertySerialization = (this.packageFlags & EPackageFlags_1.EPackageFlags.PKG_UnversionedProperties) !== 0;
        // If attached also setup the ubulk reader
        if (ubulkAr != null) {
            ubulkAr.uassetSize = this.info.totalHeaderSize;
            ubulkAr.uexpSize = lodash_1.sum(this.exportMap.map(it => it.serialSize));
            uexpAr.addPayload(PayloadType_1.PayloadType.UBULK, ubulkAr);
        }
        this.exportMap.forEach((e) => {
            e.exportObject = new Lazy_1.Lazy(() => {
                const uexpAr2 = uexpAr.clone();
                uexpAr2.seekRelative(e.serialOffset);
                const validPos = (uexpAr2.pos + e.serialSize);
                const obj = Package_1.Package.constructExport(e.classIndex.load());
                obj.export = e;
                obj.name = e.objectName.text;
                obj.outer = e.outerIndex.load() || this;
                // obj.template = this.findObject(export.templateIndex)
                obj.deserialize(uexpAr2, validPos);
                if (validPos !== uexpAr2.pos) {
                    console.warn(`Did not read ${obj.exportType} correctly, ${validPos - uexpAr.pos} bytes remaining`);
                }
                else {
                    console.debug(`Successfully read ${obj.exportType} at ${uexpAr2.toNormalPos(e.serialOffset)} with size ${e.serialSize}`);
                }
                return obj;
            });
        });
    }
    /**
     * Stores lazy exports
     * @type {Array<Lazy<UObject>>}
     * @public
     */
    get exportsLazy() {
        return this.exportMap.map(it => it.exportObject);
    }
    /**
     * Finds an object by index
     * @param {?FPackageIndex} index Index to find
     * @returns {?Lazy<any>} Object or null
     * @public
     */
    findObject(index) {
        return (index === null || index.isNull()) ? null :
            index.isImport() ? this.findImport(this.importMap[index.toImport()]) :
                index.isExport() ? this.exportMap[index.toExport()]?.exportObject :
                    null;
    }
    /**
     * Loads an import
     * @param {?FObjectImport} imp Import to load
     * @returns {?UObject} Object or null
     * @public
     */
    loadImport(imp) {
        if (!imp)
            return null;
        return this.findImport(imp)?.value || null;
    }
    /**
     * Finds an import
     * @param {?FObjectImport} imp Import to load
     * @returns {?Lazy<UObject>} Object or null
     * @public
     */
    findImport(imp) {
        if (!imp)
            return null;
        if (imp.className.text === "Class") {
            return new Lazy_1.Lazy(() => {
                const structName = imp.objectName;
                let struct = this.provider?.mappingsProvider?.getStruct(structName);
                if (!struct) {
                    if ((this.packageFlags & EPackageFlags_1.EPackageFlags.PKG_UnversionedProperties) !== 0) {
                        throw new Exceptions_1.MissingSchemaException(`Unknown struct ${structName}`);
                    }
                    struct = new UScriptStruct_1.UScriptStruct(ObjectTypeRegistry_1.ObjectTypeRegistry.get(structName.text), structName);
                }
                return struct;
            });
        }
        // The needed export is located in another asset, try to load it
        if (!this.getImportObject(imp.outerIndex))
            return null;
        if (!this.provider)
            return null;
        const pkg = this.getPackage(imp.outerIndex);
        if (pkg)
            return pkg.findObjectByName(imp.objectName.text, imp.className.text);
        else
            console.warn("Failed to load referenced import");
        return null;
    }
    /**
     * Finds an object by name
     * @param {string} objectName Name of object
     * @param {?string} className Class name of object
     * @returns {?Lazy<UObject>} Object or null
     * @public
     */
    findObjectByName(objectName, className) {
        const exp = this.exportMap.find(it => {
            return it.objectName.text === objectName
                && (className == null || (this.getImportObject(it.classIndex))?.objectName?.text === className);
        });
        return exp?.exportObject;
    }
    /**
     * Gets an import object
     * @param {FPackageIndex} imp Import to find
     * @returns {?FObjectImport} Import or null
     * @public
     */
    getImportObject(imp) {
        return imp.isImport() ? this.importMap[imp.toImport()] : null;
    }
    /**
     * Gets an export object
     * @param {FPackageIndex} imp Export to find
     * @returns {?FObjectExport} Export or null
     * @public
     */
    getExportObject(imp) {
        return imp.isExport() ? this.exportMap[imp.toExport()] : null;
    }
    /**
     * Gets either export or import object
     * @param {FPackageIndex} imp Index to find
     * @returns {FObjectImport | FObjectExport | null} Object or null
     * @public
     */
    getResource(imp) {
        return this.getImportObject(imp) || this.getExportObject(imp);
    }
    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {Array<IJson>} Json
     * @public
     */
    toJson(locres) {
        const object = [];
        for (const it of this.exports) {
            if (!(it instanceof UObject_1.UObject))
                continue;
            const json = it.toJson(locres);
            object.push({
                type: it.exportType,
                name: it.name,
                properties: json
            });
        }
        return object;
    }
    /**
     * Gets a package from index
     * @param {FPackageIndex} imp Package to get
     * @returns {?Package} Package or null
     * @private
     */
    getPackage(imp) {
        const obj = this.getImportObject(imp);
        if (obj) {
            return this.provider.loadGameFile(obj.objectName.text);
        }
        return null;
    }
    /* DON'T USE THIS */
    updateHeader() {
        const uassetWriter = new FAssetArchiveWriter_1.FByteArchiveWriter();
        uassetWriter.game = this.game.game;
        uassetWriter.ver = this.version;
        uassetWriter.nameMap = this.nameMap;
        uassetWriter.importMap = this.importMap;
        uassetWriter.exportMap = this.exportMap;
        this.info.serialize(uassetWriter);
        const nameMapOffset = uassetWriter.pos();
        if (this.info.nameCount !== this.nameMap.length) {
            throw new Exceptions_1.ParserException(`Invalid name count, summary says ${this.info.nameCount} names but name map is ${this.nameMap.length} entries long`, uassetWriter);
        }
        this.nameMap.forEach((it) => it.serialize(uassetWriter));
        const importMapOffset = uassetWriter.pos();
        if (this.info.importCount !== this.importMap.length)
            throw new Exceptions_1.ParserException(`Invalid import count, summary says ${this.info.importCount} imports but import map is ${this.importMap.length} entries long`, uassetWriter);
        this.importMap.forEach((it) => it.serialize(uassetWriter));
        const exportMapOffset = uassetWriter.pos();
        if (this.info.exportCount !== this.exportMap.length)
            throw new Exceptions_1.ParserException(`Invalid export count, summary says ${this.info.exportCount} exports but export map is ${this.exportMap.length} entries long`, uassetWriter);
        this.exportMap.forEach((it) => it.serialize(uassetWriter));
        this.info.totalHeaderSize = uassetWriter.pos();
        this.info.nameOffset = nameMapOffset;
        this.info.importOffset = importMapOffset;
        this.info.exportOffset = exportMapOffset;
    }
    /* DON'T USE THIS */
    write(uassetOutputStream, uexpOutputStream, ubulkOutputStream) {
        this.updateHeader();
        const uexpWriter = this.writer(uexpOutputStream);
        uexpWriter.game = this.game.game;
        uexpWriter.ver = this.version;
        uexpWriter.uassetSize = this.info.totalHeaderSize;
        this.exports.forEach((it) => {
            const beginPos = uexpWriter.relativePos();
            it.serialize(uexpWriter);
            const finalPos = uexpWriter.relativePos();
            if (it.export) {
                it.export.serialOffset = beginPos;
                it.export.serialSize = finalPos - beginPos;
            }
        });
        uexpWriter.writeUInt32(this.packageMagic);
        const uassetWriter = this.writer(uassetOutputStream);
        uassetWriter.game = this.game.game;
        uassetWriter.ver = this.version;
        this.info.serialize(uassetWriter);
        const nameMapPadding = this.info.nameOffset - uassetWriter.pos();
        if (nameMapPadding > 0)
            uassetWriter.write(nameMapPadding);
        if (this.info.nameCount !== this.nameMap.length)
            throw new Exceptions_1.ParserException(`Invalid name count, summary says ${this.info.nameCount} names but name map is ${this.nameMap.length} entries long`, uassetWriter);
        this.nameMap.forEach((it) => it.serialize(uassetWriter));
        const importMapPadding = this.info.importOffset - uassetWriter.pos();
        if (importMapPadding > 0)
            uassetWriter.write(importMapPadding);
        if (this.info.importCount !== this.nameMap.length)
            throw new Exceptions_1.ParserException(`Invalid import count, summary says ${this.info.importCount} imports but import map is ${this.importMap.length} entries long`, uassetWriter);
        this.importMap.forEach((it) => it.serialize(uassetWriter));
        const exportMapPadding = this.info.exportOffset - uassetWriter.pos();
        if (exportMapPadding > 0)
            uassetWriter.write(exportMapPadding);
        if (this.info.exportCount !== this.exportMap.length)
            throw new Exceptions_1.ParserException(`Invalid export count, summary says ${this.info.exportCount} exports but export map is ${this.exportMap.length} entries long`, uassetWriter);
        this.exportMap.forEach((it) => it.serialize(uassetWriter));
        ubulkOutputStream?.destroy();
    }
    /* DON'T USE THIS */
    writer(outputStream) {
        const obj = new FAssetArchiveWriter_1.FAssetArchiveWriter(outputStream);
        obj.nameMap = this.nameMap;
        obj.importMap = this.importMap;
        obj.exportMap = this.exportMap;
        return obj;
    }
}
exports.PakPackage = PakPackage;
