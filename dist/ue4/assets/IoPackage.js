"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvedScriptObject = exports.ResolvedExportObject = exports.ResolvedObject = exports.FArc = exports.FImportedPackage = exports.IoPackage = void 0;
const Package_1 = require("./Package");
const AsyncLoading2_1 = require("../asyncloading2/AsyncLoading2");
const FNameMap_1 = require("../asyncloading2/FNameMap");
const UObject_1 = require("./exports/UObject");
const FByteArchive_1 = require("../reader/FByteArchive");
const FName_1 = require("../objects/uobject/FName");
const EPackageFlags_1 = require("../objects/uobject/EPackageFlags");
const Exceptions_1 = require("../../exceptions/Exceptions");
const UScriptStruct_1 = require("./exports/UScriptStruct");
const UEnum_1 = require("./exports/UEnum");
const Pair_1 = require("../../util/Pair");
const sprintf_js_1 = require("sprintf-js");
const FExportArchive_1 = require("./reader/FExportArchive");
const UnrealArray_1 = require("../../util/UnrealArray");
const Lazy_1 = require("../../util/Lazy");
const Config_1 = require("../../Config");
/**
 * UE4 I/O Package
 * @extends {Package}
 */
class IoPackage extends Package_1.Package {
    /**
     * Creates an instance
     * @param {Buffer} uasset Uasset data of package
     * @param {bigint} packageId ID of package
     * @param {FPackageStore} globalPackageStore Package store
     * @param {FileProvider} provider Instance of file provider
     * @param {Ue4Version} game Version of package
     */
    constructor(uasset, packageId, globalPackageStore, provider, game = provider.game) {
        super("", provider, game);
        /**
         * Offset start of bulk data
         * @type {number}
         * @public
         */
        this.bulkDataStartOffset = 0;
        this.packageId = packageId;
        this.globalPackageStore = globalPackageStore;
        const Ar = new FByteArchive_1.FByteArchive(uasset);
        this.summary = new AsyncLoading2_1.FPackageSummary(Ar);
        // Name map
        this.nameMap = new FNameMap_1.FNameMap();
        if (this.summary.nameMapNamesSize > 0) {
            const nameMapNamesData = new FByteArchive_1.FByteArchive(uasset.subarray(0, this.summary.nameMapNamesOffset + this.summary.nameMapNamesSize));
            nameMapNamesData.pos = this.summary.nameMapNamesOffset;
            const nameMapHashesData = new FByteArchive_1.FByteArchive(uasset.subarray(0, this.summary.nameMapHashesOffset + this.summary.nameMapHashesSize));
            nameMapHashesData.pos = this.summary.nameMapHashesOffset;
            this.nameMap.load(nameMapNamesData, nameMapHashesData, AsyncLoading2_1.FMappedName_EType.Package);
        }
        const diskPackageName = this.nameMap.getName(this.summary.name);
        this.fileName = diskPackageName.text;
        this.packageFlags = this.summary.packageFlags;
        this.name = this.fileName;
        // Import map
        Ar.pos = this.summary.importMapOffset;
        const importCount = (this.summary.exportMapOffset - this.summary.importMapOffset) / 8;
        this.importMap = new UnrealArray_1.UnrealArray(importCount, () => new AsyncLoading2_1.FPackageObjectIndex(Ar));
        // Export map
        const exportCount = (this.summary.exportBundlesOffset - this.summary.exportMapOffset) / 72;
        this.exportMap = new UnrealArray_1.UnrealArray(exportCount, () => new AsyncLoading2_1.FExportMapEntry(Ar));
        this.exportsLazy = new Array(exportCount);
        // Export bundles
        Ar.pos = this.summary.exportBundlesOffset;
        let remainingBundleEntryCount = (this.summary.graphDataOffset - this.summary.exportBundlesOffset) / 8;
        let foundBundlesCount = 0;
        const foundBundleHeaders = [];
        while (foundBundlesCount < remainingBundleEntryCount) {
            // This location is occupied by header, so it is not a bundle entry
            remainingBundleEntryCount--;
            const bundleHeader = new AsyncLoading2_1.FExportBundleHeader(Ar);
            foundBundlesCount += Math.floor(bundleHeader.entryCount);
            foundBundleHeaders.push(bundleHeader);
        }
        if (foundBundlesCount !== remainingBundleEntryCount)
            throw new Error(`foundBundlesCount (${foundBundlesCount}) !== remainingBundleEntryCount ${remainingBundleEntryCount}`);
        // Load export bundles into arrays
        this.exportBundleHeaders = foundBundleHeaders;
        this.exportBundleEntries = [];
        for (let i = 0; i < foundBundlesCount; ++i)
            this.exportBundleEntries.push(new AsyncLoading2_1.FExportBundleEntry(Ar));
        // Graph data
        Ar.pos = this.summary.graphDataOffset;
        this.graphData = Ar.readArray(() => new FImportedPackage(Ar));
        // Preload dependencies
        this.importedPackages = new Lazy_1.Lazy(() => this.graphData.map(it => provider.loadGameFile(it.importedPackageId)));
        // Populate lazy exports
        const allExportDataOffset = this.summary.graphDataOffset + this.summary.graphDataSize;
        let currentExportDataOffset = allExportDataOffset;
        for (const exportBundle of this.exportBundleHeaders) {
            for (let i = 0; i < exportBundle.entryCount; ++i) {
                const entry = this.exportBundleEntries[exportBundle.firstEntryIndex + i];
                if (entry.commandType === AsyncLoading2_1.EExportCommandType.ExportCommandType_Serialize) {
                    const localExportIndex = entry.localExportIndex;
                    const exp = this.exportMap[localExportIndex];
                    const localExportDataOffset = currentExportDataOffset;
                    this.exportsLazy[localExportIndex] = new Lazy_1.Lazy(() => {
                        // Create
                        const objectName = this.nameMap.getName(exp.objectName);
                        const obj = Package_1.Package.constructExport(this.resolveObjectIndex(exp.classIndex)?.getObject()?.value);
                        obj.name = objectName.text;
                        // TODO remove 'false' param, fix the issue
                        obj.outer = this.resolveObjectIndex(exp.outerIndex, false)?.exportObject?.value || this;
                        obj.template = this.resolveObjectIndex(exp.templateIndex, false)?.exportObject;
                        obj.flags = Math.floor(exp.objectFlags);
                        // Serialize
                        const Ar = new FExportArchive_1.FExportArchive(uasset, obj, this);
                        Ar.useUnversionedPropertySerialization = (this.packageFlags & EPackageFlags_1.EPackageFlags.PKG_UnversionedProperties) !== 0;
                        Ar.uassetSize = Math.floor(exp.cookedSerialOffset) - localExportDataOffset;
                        Ar.bulkDataStartOffset = this.bulkDataStartOffset;
                        Ar.pos = localExportDataOffset;
                        const validPos = Ar.pos + Math.floor(exp.cookedSerialSize);
                        try {
                            obj.deserialize(Ar, validPos);
                            if (validPos !== Ar.pos) {
                                console.warn(`Did not read ${obj.exportType} correctly, ${validPos - Ar.pos} bytes remaining (${obj.getPathName()})`);
                            }
                        }
                        catch (e) {
                            if (e instanceof Exceptions_1.MissingSchemaException && !Config_1.Config.GSuppressMissingSchemaErrors) {
                                console.warn(e);
                            }
                            else {
                                throw e;
                            }
                        }
                        return obj;
                    });
                    currentExportDataOffset += Math.floor(exp.cookedSerialSize);
                }
            }
        }
        this.bulkDataStartOffset = currentExportDataOffset;
    }
    /**
     * Resolves an object index
     * @param {FPackageObjectIndex} index Object index to resolve
     * @param {boolean} throwIfNotFound (default: true) Whether to throw an error if it wasn't found
     * @returns {ResolvedExportObject | ResolvedScriptObject | null} Object
     * @public
     */
    resolveObjectIndex(index, throwIfNotFound = true) {
        if (!index)
            return null;
        if (index.isExport()) {
            return new ResolvedExportObject(index.toExport().toInt(), this);
        }
        else if (index.isScriptImport()) {
            const ent = this.globalPackageStore.scriptObjectEntriesMap.get(index);
            return ent ? new ResolvedScriptObject(ent, this) : null;
        }
        else if (index.isPackageImport()) {
            for (const pkg of this.importedPackages.value) {
                for (const exportIndex in pkg?.exportMap) {
                    const exportMapEntry = pkg?.exportMap[exportIndex];
                    if (exportMapEntry.globalImportIndex.equals(index)) {
                        return new ResolvedExportObject(parseInt(exportIndex), pkg);
                    }
                }
            }
        }
        else if (index.isNull()) {
            return null;
        }
        if (throwIfNotFound) {
            throw new Exceptions_1.ParserException(sprintf_js_1.sprintf("Missing %s import 0x%016X for package %s", index.isScriptImport() ? "script" : "package", index.value(), this.fileName));
        }
        return null;
    }
    /**
     * Finds an object by FPackageIndex
     * @param {FPackageIndex} index Index to look for
     * @returns {?any} Object or null
     * @public
     */
    findObject(index) {
        if (!index || index.isNull()) {
            return null;
        }
        else if (index.isExport()) {
            return this.exportsLazy[index.toExport()];
        }
        else {
            const imp = this.importMap[index.toImport()];
            return (imp ? this.resolveObjectIndex(imp, false)?.getObject() : null);
        }
    }
    /**
     * Finds an object by name
     * @param {string} objectName Name of object
     * @param {?string} className Class name of object
     * @returns {?Lazy<UObject>} Object or null
     * @public
     */
    findObjectByName(objectName, className) {
        let exportIndex = -1;
        this.exportMap.find((it, k) => {
            const is = this.nameMap.getName(it.objectName).text === objectName && (className == null || this.resolveObjectIndex(it.classIndex)?.name?.text === className);
            if (is)
                exportIndex = k;
            return is;
        });
        return exportIndex !== -1 ? this.exportsLazy[exportIndex] : null;
    }
    /**
     * Turns this package into json
     * @param {?Locres} locres Locres to use
     * @returns {Array<IJson>} Json data
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
     * Finds an object minimal
     * @param {?FPackageIndex} index Index to look for
     * @returns {ResolvedExportObject | ResolvedScriptObject} Object
     * @public
     */
    findObjectMinimal(index) {
        if (!index || index.isNull()) {
            return null;
        }
        else if (index.isExport()) {
            return new ResolvedExportObject(index.toExport(), this);
        }
        else {
            const imp = this.importMap[index.toImport()];
            return this.resolveObjectIndex(imp, false);
        }
    }
}
exports.IoPackage = IoPackage;
class FImportedPackage {
    constructor(Ar) {
        this.importedPackageId = Ar.readUInt64();
        this.externalArcs = Ar.readArray(() => new FArc(Ar));
    }
}
exports.FImportedPackage = FImportedPackage;
class FArc {
    constructor(Ar) {
        this.fromExportBundleIndex = Ar.readInt32();
        this.toExportBundleIndex = Ar.readInt32();
    }
}
exports.FArc = FArc;
class ResolvedObject {
    constructor(pkg) {
        this.pkg = pkg;
    }
    getOuter() {
        return null;
    }
    getSuper() {
        return null;
    }
    getObject() {
        return null;
    }
}
exports.ResolvedObject = ResolvedObject;
class ResolvedExportObject extends ResolvedObject {
    constructor(exportIndex, pkg) {
        super(pkg);
        this.exportIndex = exportIndex;
        this.exportMapEntry = pkg.exportMap[exportIndex];
        this.exportObject = pkg.exportsLazy[exportIndex];
    }
    get name() {
        return this.pkg.nameMap.getName(this.exportMapEntry.objectName);
    }
    getOuter() {
        return this.pkg.resolveObjectIndex(this.exportMapEntry.outerIndex);
    }
    getSuper() {
        return this.pkg.resolveObjectIndex(this.exportMapEntry.superIndex);
    }
    getObject() {
        return this.exportObject;
    }
}
exports.ResolvedExportObject = ResolvedExportObject;
class ResolvedScriptObject extends ResolvedObject {
    constructor(scriptImport, pkg) {
        super(pkg);
        this.scriptImport = scriptImport;
    }
    get name() {
        return this.scriptImport.objectName.toName();
    }
    getOuter() {
        return this.pkg.resolveObjectIndex(this.scriptImport.outerIndex);
    }
    getObject() {
        return new Lazy_1.Lazy(() => {
            const name = this.name;
            if (name.text[0] === "E") {
                let enumValues = this.pkg.provider?.mappingsProvider?.getEnum(name);
                if (!enumValues) {
                    if ((this.pkg.packageFlags & EPackageFlags_1.EPackageFlags.PKG_UnversionedProperties) !== 0) {
                        throw new Exceptions_1.MissingSchemaException(`Unknown enum ${name}`);
                    }
                    enumValues = [];
                }
                const enm = new UEnum_1.UEnum();
                enm.name = name.text;
                enm.names = new UnrealArray_1.UnrealArray(enumValues.length, (it) => new Pair_1.Pair(FName_1.FName.dummy(`${name}::${enumValues[it]}`), it));
                return enm;
            }
            else {
                let struct = this.pkg.provider?.mappingsProvider?.getStruct(name);
                if (!struct) {
                    if ((this.pkg.packageFlags & EPackageFlags_1.EPackageFlags.PKG_UnversionedProperties) !== 0) {
                        throw new Exceptions_1.MissingSchemaException(`Unknown struct ${name}`);
                    }
                    struct = new UScriptStruct_1.UScriptStruct(name);
                }
                return struct;
            }
        });
    }
}
exports.ResolvedScriptObject = ResolvedScriptObject;
