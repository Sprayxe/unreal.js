"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EExportCommandType = exports.FExportBundleEntry = exports.FExportBundleHeader = exports.FExportMapEntry = exports.FPackageSummary = exports.FContainerHeader = exports.FScriptObjectEntry = exports.FPackageObjectIndex_EType = exports.FPackageObjectIndex = exports.INVALID = exports._TYPE_SHIFT = exports._INDEX_MASK = exports._INDEX_BITS = exports.FPackageStoreEntry = exports.FMappedName_EType = exports.FMappedName = exports.TYPE_SHIFT = exports.TYPE_MASK = exports.INDEX_MASK = exports.INDEX_BITS = exports.INVALID_INDEX = void 0;
const FArchive_1 = require("../reader/FArchive");
const NameTypes_1 = require("../objects/uobject/NameTypes");
const IoContainerId_1 = require("../io/IoContainerId");
const Pair_1 = require("../../util/Pair");
const CityHash_1 = require("../../util/CityHash");
const long_1 = __importDefault(require("long"));
const UnrealArray_1 = require("../../util/UnrealArray");
exports.INVALID_INDEX = ~0;
exports.INDEX_BITS = 30;
exports.INDEX_MASK = (1 << exports.INDEX_BITS) - 1;
exports.TYPE_MASK = ~exports.INDEX_MASK;
exports.TYPE_SHIFT = exports.INDEX_BITS;
/**
 * FMappedName
 */
class FMappedName {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * Index
         * @type {number}
         * @public
         */
        this.index = exports.INVALID_INDEX;
        /**
         * Num
         * @type {number}
         * @public
         */
        this.num = exports.INVALID_INDEX;
        if (Ar) {
            this.index = Ar.readUInt32();
            this.num = Ar.readUInt32();
        }
    }
    /**
     * Creates an instance
     * @param {number} index Index to use
     * @param {number} num Number to use
     * @param {FMappedName_EType} type Type of FMappedName
     * @returns {FMappedName} Instance
     * @public
     * @static
     */
    static create(index, num, type) {
        if (index > 2147483647)
            throw new Error("Bad name index");
        const mappedName = new FMappedName();
        mappedName.index = (type << exports.TYPE_SHIFT) | index;
        mappedName.num = num;
        return mappedName;
    }
    /**
     * Creates an instance from FMinimalName
     * @param {FMinimalName} minimalName Minimal name to use
     * @returns {FMappedName}
     * @public
     */
    static fromMinimalName(minimalName) {
        const mappedName = new FMappedName();
        mappedName.index = minimalName.index.value;
        mappedName.num = minimalName.num;
        return mappedName;
    }
    /**
     * Whether is resolved to minimal name
     * @param {FMinimalName} minimalName Minimal name to check
     * @returns {boolean}
     * @public
     */
    static isResolvedToMinimalName(minimalName) {
        const mappedName = this.fromMinimalName(minimalName);
        return mappedName.isValid();
    }
    /**
     * Whether is valid
     * @returns {boolean} Result
     * @public
     */
    isValid() {
        return this.index !== exports.INVALID_INDEX && this.num !== exports.INVALID_INDEX;
    }
    /**
     * Gets type
     * @returns {number} Type
     * @public
     */
    getType() {
        return (this.index & exports.TYPE_MASK) >>> exports.TYPE_SHIFT;
    }
    /**
     * Whether is global
     * @returns {boolean} Result
     * @public
     */
    isGlobal() {
        return ((this.index & exports.TYPE_MASK) >> exports.TYPE_SHIFT) !== 0;
    }
    /**
     * Gets index
     * @returns {number} Index
     * @public
     */
    getIndex() {
        return this.index & exports.INDEX_MASK;
    }
    /**
     * Whether equals another object
     * @param {?any} other Object to check
     * @returns {boolean}
     * @public
     */
    equals(other) {
        if (this === other)
            return true;
        if (!(other instanceof FMappedName))
            return false;
        other;
        if (this.index !== other.index)
            return false;
        return this.num === other.num;
    }
}
exports.FMappedName = FMappedName;
/**
 * FMappedName_EType
 * @enum
 */
var FMappedName_EType;
(function (FMappedName_EType) {
    FMappedName_EType[FMappedName_EType["Package"] = 0] = "Package";
    FMappedName_EType[FMappedName_EType["Container"] = 1] = "Container";
    FMappedName_EType[FMappedName_EType["Global"] = 2] = "Global";
})(FMappedName_EType = exports.FMappedName_EType || (exports.FMappedName_EType = {}));
/**
 * FPackageStoreEntry
 */
class FPackageStoreEntry {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * exportBundlesSize
         * @type {number}
         * @public
         */
        this.exportBundlesSize = 0;
        /**
         * exportCount
         * @type {number}
         * @public
         */
        this.exportCount = 0;
        /**
         * exportBundleCount
         * @type {number}
         * @public
         */
        this.exportBundleCount = 0;
        /**
         * loadOrder
         * @type {number}
         * @public
         */
        this.loadOrder = 0;
        /**
         * pad
         * @type {number}
         * @public
         */
        this.pad = 0;
        this.exportBundlesSize = Number(Ar.readUInt64());
        this.exportCount = Ar.readInt32();
        this.exportBundleCount = Ar.readInt32();
        this.loadOrder = Ar.readUInt32();
        this.pad = Ar.readUInt32();
        this.importedPackages = this.readCArrayView(Ar, (x) => x.readUInt64().toString());
    }
    /**
     * Reads array view
     * @param {FArchive} Ar UE4 Reader to use
     * @param {any} init Method for initializing array entries
     * @returns {Array<any>}
     * @example <FPackageStoreEntry>.readCArrayView(Ar, (_Ar) => _Ar.readUInt64().toString())
     * @private
     */
    readCArrayView(Ar, init) {
        const initialPos = Ar.pos;
        const arrayNum = Ar.readInt32();
        const offsetToDataFromThis = Ar.readInt32();
        if (arrayNum <= 0) {
            return [];
        }
        const continuePos = Ar.pos;
        Ar.pos = initialPos + offsetToDataFromThis;
        const result = new UnrealArray_1.UnrealArray(arrayNum, () => init(Ar));
        Ar.pos = continuePos;
        return result;
    }
}
exports.FPackageStoreEntry = FPackageStoreEntry;
exports._INDEX_BITS = 62;
exports._INDEX_MASK = (1 << exports._INDEX_BITS) - 1;
exports._TYPE_SHIFT = exports._INDEX_BITS;
exports.INVALID = long_1.default.fromNumber(~0);
/**
 * FPackageObjectIndex
 */
class FPackageObjectIndex {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        /**
         * typeAndId
         * @type {number}
         * @private
         */
        this.typeAndId = exports.INVALID;
        if (x) {
            if (x instanceof FArchive_1.FArchive) {
                this.typeAndId = long_1.default.fromString(x.readUInt64().toString());
            }
            else {
                this.typeAndId = long_1.default.fromNumber(x << exports.TYPE_SHIFT).or(y);
            }
        }
    }
    /**
     * Generates import hash from object path
     * @param {string} objectPath Object path to hash
     * @returns {Long} Hash
     * @public
     * @static
     */
    static generateImportHashFromObjectPath(objectPath) {
        const fullImportPath = objectPath.split("");
        fullImportPath.forEach((c, i) => {
            if (c === "." || c === ":") {
                fullImportPath[i] = "/";
            }
            else {
                fullImportPath[i] = c.toLowerCase();
            }
        });
        const data = Buffer.from(fullImportPath.join(""), "utf16le");
        let hash = CityHash_1.CityHash.cityHash64(data, 0, data.length).toUnsigned();
        hash = hash.and(long_1.default.fromNumber(3).shiftLeft(62));
        return hash;
    }
    /**
     * Creates instance from export index
     * @param {number} index Export index
     * @returns {FPackageObjectIndex} Instance
     * @public
     */
    static fromExportIndex(index) {
        return new FPackageObjectIndex(FPackageObjectIndex_EType.Export, long_1.default.fromNumber(index));
    }
    /**
     * Creates instance from script path
     * @param {string} scriptObjectPath Script object path
     * @returns {FPackageObjectIndex} Instance
     * @public
     */
    static fromScriptPath(scriptObjectPath) {
        return new FPackageObjectIndex(FPackageObjectIndex_EType.ScriptImport, this.generateImportHashFromObjectPath(scriptObjectPath));
    }
    /**
     * Creates instance from package path
     * @param {string} packageObjectPath Package objectPath path
     * @returns {FPackageObjectIndex} Instance
     * @public
     */
    static fromPackagePath(packageObjectPath) {
        return new FPackageObjectIndex(FPackageObjectIndex_EType.PackageImport, this.generateImportHashFromObjectPath(packageObjectPath));
    }
    /**
     * Whether is null
     * @returns {boolean} Result
     * @public
     */
    isNull() {
        return this.typeAndId === exports.INVALID;
    }
    /**
     * Whether is export
     * @returns {boolean} Result
     * @public
     */
    isExport() {
        return this.typeAndId.shru(exports._TYPE_SHIFT).toInt() === FPackageObjectIndex_EType.Export;
    }
    /**
     * Whether is import
     * @returns {boolean} Result
     * @public
     */
    isImport() {
        return this.isScriptImport() || this.isPackageImport();
    }
    /**
     * Whether is script import
     * @returns {boolean} Result
     * @public
     */
    isScriptImport() {
        return this.typeAndId.shru(exports._TYPE_SHIFT).toInt() === FPackageObjectIndex_EType.ScriptImport;
    }
    /**
     * Whether is package import
     * @returns {boolean} Result
     * @public
     */
    isPackageImport() {
        return this.typeAndId.shru(exports._TYPE_SHIFT).toInt() === FPackageObjectIndex_EType.PackageImport;
    }
    /**
     * Returns export value
     * @returns {number} Export
     * @public
     */
    toExport() {
        if (!this.isExport())
            throw new Error("Cannot cast an import to export.");
        return this.typeAndId;
    }
    /**
     * Returns type
     * @returns {number} type
     * @public
     */
    type() {
        return this.typeAndId.shiftRight(exports.TYPE_SHIFT).toNumber(); // custom
    }
    /**
     * Returns value
     * @returns {number} value
     * @public
     */
    value() {
        return this.typeAndId.and(exports._INDEX_MASK);
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
        if (!(other instanceof FPackageObjectIndex))
            return false;
        other;
        return this.value().toString() === other.value().toString();
    }
}
exports.FPackageObjectIndex = FPackageObjectIndex;
/**
 * FPackageObjectIndex_EType
 * @enum
 */
var FPackageObjectIndex_EType;
(function (FPackageObjectIndex_EType) {
    FPackageObjectIndex_EType[FPackageObjectIndex_EType["Export"] = 0] = "Export";
    FPackageObjectIndex_EType[FPackageObjectIndex_EType["ScriptImport"] = 1] = "ScriptImport";
    FPackageObjectIndex_EType[FPackageObjectIndex_EType["PackageImport"] = 2] = "PackageImport";
    FPackageObjectIndex_EType[FPackageObjectIndex_EType["Null"] = 3] = "Null";
})(FPackageObjectIndex_EType = exports.FPackageObjectIndex_EType || (exports.FPackageObjectIndex_EType = {}));
/**
 * FScriptObjectEntry
 */
class FScriptObjectEntry {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {Array<string>} nameMap Name map
     * @constructor
     * @public
     */
    constructor(Ar, nameMap) {
        this.objectName = new NameTypes_1.FMinimalName(Ar, nameMap);
        this.globalIndex = new FPackageObjectIndex(Ar);
        this.outerIndex = new FPackageObjectIndex(Ar);
        this.cdoClassIndex = new FPackageObjectIndex(Ar);
    }
}
exports.FScriptObjectEntry = FScriptObjectEntry;
/**
 * FContainerHeader
 */
class FContainerHeader {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * packageCount
         * @type {number}
         * @public
         */
        this.packageCount = 0;
        this.containerId = IoContainerId_1.createFIoContainerId(Ar);
        this.packageCount = Ar.readUInt32();
        this.names = Ar.readBuffer(Ar.readInt32());
        this.nameHashes = Ar.readBuffer(Ar.readInt32());
        this.packageIds = Ar.readArray(() => Ar.readUInt64());
        const storeEntriesNum = Ar.readInt32();
        const storeEntriesEnd = Ar.pos + storeEntriesNum;
        this.storeEntries = new UnrealArray_1.UnrealArray(this.packageCount, () => new FPackageStoreEntry(Ar));
        Ar.pos = storeEntriesEnd;
        this.culturePackageMap = Ar.readTMap(null, () => {
            return {
                key: Ar.readString(),
                value: Ar.readArray(() => new Pair_1.Pair(Ar.readUInt64(), Ar.readUInt64()))
            };
        });
        this.packageRedirects = Ar.readArray(() => new Pair_1.Pair(Ar.readUInt64(), Ar.readUInt64()));
    }
}
exports.FContainerHeader = FContainerHeader;
/**
 * FPackageSummary
 */
class FPackageSummary {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.name = new FMappedName(Ar);
        this.sourceName = new FMappedName(Ar);
        this.packageFlags = -~Ar.readUInt32() - 1; // TODO is this right? following original code this gives inaccurate output
        this.cookedHeaderSize = Ar.readUInt32();
        this.nameMapNamesOffset = Ar.readInt32();
        this.nameMapNamesSize = Ar.readInt32();
        this.nameMapHashesOffset = Ar.readInt32();
        this.nameMapHashesSize = Ar.readInt32();
        this.importMapOffset = Ar.readInt32();
        this.exportMapOffset = Ar.readInt32();
        this.exportBundlesOffset = Ar.readInt32();
        this.graphDataOffset = Ar.readInt32();
        this.graphDataSize = Ar.readInt32();
        this.pad = Ar.readInt32();
    }
}
exports.FPackageSummary = FPackageSummary;
/**
 * FExportMapEntry
 */
class FExportMapEntry {
    //uint8 Pad[3] = {};
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * cookedSerialOffset
         * @type {number}
         * @public
         */
        this.cookedSerialOffset = 0;
        /**
         * cookedSerialSize
         * @type {number}
         * @public
         */
        this.cookedSerialSize = 0;
        this.cookedSerialOffset = Number(Ar.readUInt64());
        this.cookedSerialSize = Number(Ar.readUInt64());
        this.objectName = new FMappedName(Ar);
        this.outerIndex = new FPackageObjectIndex(Ar);
        this.classIndex = new FPackageObjectIndex(Ar);
        this.superIndex = new FPackageObjectIndex(Ar);
        this.templateIndex = new FPackageObjectIndex(Ar);
        this.globalImportIndex = new FPackageObjectIndex(Ar);
        this.objectFlags = Ar.readUInt32();
        this.filterFlags = Ar.readUInt8();
        Ar.pos += 3;
    }
}
exports.FExportMapEntry = FExportMapEntry;
/**
 * FExportBundleHeader
 */
class FExportBundleHeader {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.firstEntryIndex = Ar.readUInt32();
        this.entryCount = Ar.readUInt32();
    }
}
exports.FExportBundleHeader = FExportBundleHeader;
/**
 * FExportBundleEntry
 */
class FExportBundleEntry {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.localExportIndex = Ar.readInt32();
        this.commandType = Ar.readInt32();
    }
}
exports.FExportBundleEntry = FExportBundleEntry;
/**
 * EExportCommandType
 * @enum
 */
var EExportCommandType;
(function (EExportCommandType) {
    EExportCommandType[EExportCommandType["ExportCommandType_Create"] = 0] = "ExportCommandType_Create";
    EExportCommandType[EExportCommandType["ExportCommandType_Serialize"] = 1] = "ExportCommandType_Serialize";
    EExportCommandType[EExportCommandType["ExportCommandType_Count"] = 2] = "ExportCommandType_Count";
})(EExportCommandType = exports.EExportCommandType || (exports.EExportCommandType = {}));
