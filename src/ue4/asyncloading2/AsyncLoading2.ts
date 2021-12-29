import { FArchive } from "../reader/FArchive";
import { FMinimalName } from "../objects/uobject/NameTypes";
import { CityHash } from "../../util/CityHash";
import Long from "long";
import { Game } from "../versions/Game";
import { FPackageFileVersion } from "../versions/ObjectVersion";
import { FCustomVersion } from "../objects/core/serialization/CustomVersion";

export class FPackageImportReference {
    public importedPackageIndex: number
    public importedPublicExportHashIndex: number

    public constructor(importedPackageIndex: number, importedPublicExportHashIndex: number) {
        this.importedPackageIndex = importedPackageIndex
        this.importedPublicExportHashIndex = importedPublicExportHashIndex
    }
}

/**
 * FMappedName
 */
export class FMappedName {
    public static readonly INVALID_INDEX = ~0
    public static readonly INDEX_BITS = 30
    public static readonly INDEX_MASK = (1 << FMappedName.INDEX_BITS) - 1
    public static readonly TYPE_MASK = ~FMappedName.INDEX_MASK
    public static readonly TYPE_SHIFT = FMappedName.INDEX_BITS

    /**
     * Creates an instance
     * @param {number} index Index to use
     * @param {number} num Number to use
     * @param {FMappedName_EType} type Type of FMappedName
     * @returns {FMappedName} Instance
     * @public
     * @static
     */
    static create(index: number, num: number, type: FMappedName_EType): FMappedName {
        if (index > 2147483647)
            throw new Error("Bad name index")
        const mappedName = new FMappedName()
        mappedName.index = (type << FMappedName.TYPE_SHIFT) | index
        mappedName.num = num
        return mappedName
    }

    /**
     * Creates an instance from FMinimalName
     * @param {FMinimalName} minimalName Minimal name to use
     * @returns {FMappedName}
     * @public
     */
    static fromMinimalName(minimalName: FMinimalName) {
        const mappedName = new FMappedName()
        mappedName.index = minimalName.index.value
        mappedName.num = minimalName.num
        return mappedName
    }

    /**
     * Whether is resolved to minimal name
     * @param {FMinimalName} minimalName Minimal name to check
     * @returns {boolean}
     * @public
     */
    static isResolvedToMinimalName(minimalName: FMinimalName) {
        const mappedName = this.fromMinimalName(minimalName)
        return mappedName.isValid()
    }

    /**
     * Index
     * @type {number}
     * @public
     */
    index: number = FMappedName.INVALID_INDEX

    /**
     * Num
     * @type {number}
     * @public
     */
    num: number = FMappedName.INVALID_INDEX

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar?: FArchive) {
        if (Ar) {
            this.index = Ar.readUInt32()
            this.num = Ar.readUInt32()
        }
    }

    /**
     * Whether is valid
     * @returns {boolean} Result
     * @public
     */
    isValid() {
        return this.index !== FMappedName.INVALID_INDEX && this.num !== FMappedName.INVALID_INDEX
    }

    /**
     * Gets type
     * @returns {number} Type
     * @public
     */
    getType() {
        return (this.index & FMappedName.TYPE_MASK) >>> FMappedName.TYPE_SHIFT
    }

    /**
     * Whether is global
     * @returns {boolean} Result
     * @public
     */
    isGlobal() {
        return ((this.index & FMappedName.TYPE_MASK) >> FMappedName.TYPE_SHIFT) !== 0
    }

    /**
     * Gets index
     * @returns {number} Index
     * @public
     */
    getIndex() {
        return this.index & FMappedName.INDEX_MASK
    }

    /**
     * Whether equals another object
     * @param {?any} other Object to check
     * @returns {boolean}
     * @public
     */
    equals(other?: any) {
        if (this === other) return true
        if (!(other instanceof FMappedName)) return false

        other as FMappedName

        if (this.index !== other.index) return false
        return this.num === other.num
    }
}

/**
 * FMappedName_EType
 * @enum
 */
export enum FMappedName_EType {
    Package,
    Container,
    Global
}

/**
 * FPackageObjectIndex
 */
export class FPackageObjectIndex {
    public static readonly INDEX_BITS: Long = Long.fromNumber(62, true)
    public static readonly INDEX_MASK: Long = Long.UONE.shl(FPackageObjectIndex.INDEX_BITS).sub(Long.UONE)
    public static readonly TYPE_SHIFT: Long = FPackageObjectIndex.INDEX_BITS
    public static readonly INVALID: Long = Long.UZERO.not()

    /**
     * typeAndId
     * @type {Long}
     * @private
     */
    private readonly typeAndId: Long = FPackageObjectIndex.INVALID

    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using values
     * @param {FPackageObjectIndex_EType} type Type of object index
     * @param {Long} id Id of object index
     * @constructor
     * @public
     */
    constructor(type: FPackageObjectIndex_EType, id: Long)

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any) {
        if (x) {
            if (x instanceof FArchive) {
                this.typeAndId = Long.fromString(x.readUInt64().toString(), true)
            } else {
                this.typeAndId = Long.fromNumber(x, true).shl(FPackageObjectIndex.TYPE_SHIFT).or(y)
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
    static generateImportHashFromObjectPath(objectPath: string): Long {
        const fullImportPath = objectPath.split("")
        fullImportPath.forEach((c, i) => {
            if (c === "." || c === ":") {
                fullImportPath[i] = "/"
            } else {
                fullImportPath[i] = c.toLowerCase()
            }
        })
        const data = Buffer.from(fullImportPath.join(""), "utf16le")
        let hash = CityHash.cityHash64(data, 0, data.length).toUnsigned()
        hash = hash.and(Long.fromNumber(3).shl(62).not())
        return hash
    }

    /**
     * Creates instance from export index
     * @param {number} index Export index
     * @returns {FPackageObjectIndex} Instance
     * @public
     */
    static fromExportIndex(index: number) {
        return new FPackageObjectIndex(FPackageObjectIndex_EType.Export, Long.fromNumber(index, true))
    }

    /**
     * Creates instance from script path
     * @param {string} scriptObjectPath Script object path
     * @returns {FPackageObjectIndex} Instance
     * @public
     */
    static fromScriptPath(scriptObjectPath: string) {
        return new FPackageObjectIndex(FPackageObjectIndex_EType.ScriptImport, this.generateImportHashFromObjectPath(scriptObjectPath))
    }

    /**
     * Creates instance from package path
     * @param {string} packageObjectPath Package objectPath path
     * @returns {FPackageObjectIndex} Instance
     * @public
     */
    static fromPackagePath(packageObjectPath: string) {
        return new FPackageObjectIndex(FPackageObjectIndex_EType.PackageImport, this.generateImportHashFromObjectPath(packageObjectPath))
    }

    /**
     * Whether is null
     * @returns {boolean} Result
     * @public
     */
    isNull() {
        return this.typeAndId.equals(FPackageObjectIndex.INVALID)
    }

    /**
     * Whether is export
     * @returns {boolean} Result
     * @public
     */
    isExport() {
        return this.typeAndId
            .shru(FPackageObjectIndex.TYPE_SHIFT)
            .toInt() === FPackageObjectIndex_EType.Export
    }

    /**
     * Whether is import
     * @returns {boolean} Result
     * @public
     */
    isImport() {
        return this.isScriptImport() || this.isPackageImport()
    }

    /**
     * Whether is script import
     * @returns {boolean} Result
     * @public
     */
    isScriptImport() {
        return this.typeAndId
            .shru(FPackageObjectIndex.TYPE_SHIFT)
            .toInt()  === FPackageObjectIndex_EType.ScriptImport
    }

    /**
     * Whether is package import
     * @returns {boolean} Result
     * @public
     */
    isPackageImport() {
        return this.typeAndId
            .shru(FPackageObjectIndex.TYPE_SHIFT)
            .toInt() === FPackageObjectIndex_EType.PackageImport
    }

    /**
     * Returns export value
     * @returns {number} Export
     * @public
     */
    toExport() {
        if (!this.isExport())
            throw new Error("Cannot cast an import to export.")
        return this.typeAndId.toUnsigned()
    }

    /**
     * Turns object into package import reference
     * @returns {FPackageImportReference} Object
     * @public
     */
    toPackageImportRef(): FPackageImportReference {
        const importedPackageIndex = this.typeAndId
            .and(FPackageObjectIndex.INDEX_MASK)
            .shr(32)
            .toUnsigned().toInt()
        const exportHash = this.typeAndId.toUnsigned().toInt()
        return new FPackageImportReference(importedPackageIndex, exportHash)
    }

    /**
     * Returns type
     * @returns {number} type
     * @public
     */
    type() {
        return this.typeAndId.shr(FPackageObjectIndex.TYPE_SHIFT).toInt() // custom
    }

    /**
     * Returns value
     * @returns {number} value
     * @public
     */
    value() {
        return this.typeAndId.and(FPackageObjectIndex.INDEX_MASK).toNumber()
    }

    /**
     * Whether equals other object
     * @param {?any} other Object to check
     * @returns {boolean} Result
     * @public
     */
    equals(other?: any): boolean {
        if (this === other) return true
        if (!(other instanceof FPackageObjectIndex)) return false
        other as FPackageObjectIndex
        return this.value().toString() === other.value().toString()
    }
}


/**
 * FZenPackageVersioningInfo
 */
export class FZenPackageVersioningInfo {
    public version: number
    public packageVersion: FPackageFileVersion
    public licenseeVersion: number
    public customVersions: FCustomVersion[]

    constructor(Ar: FArchive) {
        this.version = Ar.readInt32()
        this.packageVersion = new FPackageFileVersion(Ar)
        this.licenseeVersion = Ar.readInt32()
        const customVersionsLen = Ar.readInt32()
        this.customVersions = new Array(customVersionsLen)
        for (let i = 0; i < customVersionsLen; ++i)
            this.customVersions[i] = new FCustomVersion(Ar)
    }
}

/**
 * FZenPackageSummary
 */
export class FZenPackageSummary {
    public bHasVersioningInfo: boolean
    public headerSize: number
    public name: FMappedName
    public packageFlags: number
    public cookedHeaderSize: number
    public importedPublicExportHashesOffset: number
    public importMapOffset: number
    public exportMapOffset: number
    public exportBundleEntriesOffset: number
    public graphDataOffset: number

    constructor(Ar: FArchive) {
        this.bHasVersioningInfo = Ar.readBoolean()
        this.headerSize = Ar.readUInt32()
        this.name = new FMappedName(Ar)
        this.packageFlags = Ar.readUInt32()
        this.cookedHeaderSize = Ar.readUInt32()
        this.importedPublicExportHashesOffset = Ar.readInt32()
        this.importMapOffset = Ar.readInt32()
        this.exportMapOffset = Ar.readInt32()
        this.exportBundleEntriesOffset = Ar.readInt32()
        this.graphDataOffset = Ar.readInt32()
    }
}

/**
 * FPackageObjectIndex_EType
 * @enum
 */
export enum FPackageObjectIndex_EType {
    Export,
    ScriptImport,
    PackageImport,
    Null
}

/**
 * FPackageSummary
 */
export class FPackageSummary {
    /**
     * Name
     * @type {FMappedName}
     * @public
     */
    name: FMappedName

    /**
     * sourceName
     * @type {FMappedName}
     * @public
     */
    sourceName: FMappedName

    /**
     * packageFlags
     * @type {number}
     * @public
     */
    packageFlags: number

    /**
     * cookedHeaderSize
     * @type {number}
     * @public
     */
    cookedHeaderSize: number

    /**
     * nameMapNamesOffset
     * @type {number}
     * @public
     */
    nameMapNamesOffset: number

    /**
     * nameMapNamesSize
     * @type {number}
     * @public
     */
    nameMapNamesSize: number

    /**
     * nameMapHashesOffset
     * @type {number}
     * @public
     */
    nameMapHashesOffset: number

    /**
     * nameMapHashesSize
     * @type {number}
     * @public
     */
    nameMapHashesSize: number

    /**
     * importMapOffset
     * @type {number}
     * @public
     */
    importMapOffset: number

    /**
     * exportMapOffset
     * @type {number}
     * @public
     */
    exportMapOffset: number

    /**
     * exportBundlesOffset
     * @type {number}
     * @public
     */
    exportBundlesOffset: number

    /**
     * graphDataOffset
     * @type {number}
     * @public
     */
    graphDataOffset: number

    /**
     * graphDataSize
     * @type {number}
     * @public
     */
    graphDataSize: number

    /**
     * pad
     * @type {number}
     * @public
     */
    pad: number /*= 0*/

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.name = new FMappedName(Ar)
        this.sourceName = new FMappedName(Ar)
        this.packageFlags = -~Ar.readUInt32() - 1 // TODO is this right? following original code gives inaccurate output
        this.cookedHeaderSize = Ar.readUInt32()
        this.nameMapNamesOffset = Ar.readInt32()
        this.nameMapNamesSize = Ar.readInt32()
        this.nameMapHashesOffset = Ar.readInt32()
        this.nameMapHashesSize = Ar.readInt32()
        this.importMapOffset = Ar.readInt32()
        this.exportMapOffset = Ar.readInt32()
        this.exportBundlesOffset = Ar.readInt32()
        this.graphDataOffset = Ar.readInt32()
        this.graphDataSize = Ar.readInt32()
        this.pad = Ar.readInt32()
    }
}

/**
 * FExportMapEntry
 */
export class FExportMapEntry {
    public static readonly SIZE = 72

    /**
     * cookedSerialOffset
     * @type {number}
     * @public
     */
    cookedSerialOffset = 0

    /**
     * cookedSerialSize
     * @type {number}
     * @public
     */
    cookedSerialSize = 0

    /**
     * objectName
     * @type {FMappedName}
     * @public
     */
    objectName: FMappedName

    /**
     * outerIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    outerIndex: FPackageObjectIndex

    /**
     * classIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    classIndex: FPackageObjectIndex

    /**
     * superIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    superIndex: FPackageObjectIndex

    /**
     * templateIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    templateIndex: FPackageObjectIndex

    /**
     * globalImportIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    globalImportIndex: FPackageObjectIndex

    /**
     * publicExportHash
     * @type {bigint}
     * @public
     */
    publicExportHash: bigint

    /**
     * objectFlags
     * @type {number}
     * @public
     */
    objectFlags: number

    /**
     * filterFlags
     * @type {number}
     * @public
     */
    filterFlags: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        const start = Ar.pos
        this.cookedSerialOffset = Number(Ar.readUInt64())
        this.cookedSerialSize = Number(Ar.readUInt64())
        this.objectName = new FMappedName(Ar)
        this.outerIndex = new FPackageObjectIndex(Ar)
        this.classIndex = new FPackageObjectIndex(Ar)
        this.superIndex = new FPackageObjectIndex(Ar)
        this.templateIndex = new FPackageObjectIndex(Ar)
        if (Ar.game >= Game.GAME_UE5_BASE) {
            this.globalImportIndex = new FPackageObjectIndex()
            this.publicExportHash = Ar.readInt64()
        } else {
            this.globalImportIndex = new FPackageObjectIndex(Ar)
            this.publicExportHash = 0n
        }
        this.objectFlags = Ar.readUInt32()
        this.filterFlags = Ar.readUInt8()
        Ar.pos = start + FExportMapEntry.SIZE
    }
}

/**
 * FExportBundleHeader
 */
export class FExportBundleHeader {
    /**
     * serialOffset
     * @type {number}
     * @public
     */
    serialOffset: bigint

    /**
     * firstEntryIndex
     * @type {number}
     * @public
     */
    firstEntryIndex: number

    /**
     * entryCount
     * @type {number}
     * @public
     */
    entryCount: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.serialOffset = Ar.game >= Game.GAME_UE5_BASE ? Ar.readUInt64() : 0xFFFFFFFFFFFFFFFFn
        this.firstEntryIndex = Ar.readUInt32()
        this.entryCount = Ar.readUInt32()
    }
}

/**
 * FExportBundleEntry
 */
export class FExportBundleEntry {
    /**
     * localExportIndex
     * @type {number}
     * @public
     */
    localExportIndex: number

    /**
     * commandType
     * @type {EExportCommandType}
     * @public
     */
    commandType: EExportCommandType

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.localExportIndex = Ar.readInt32()
        this.commandType = Ar.readInt32()
    }
}

/**
 * EExportCommandType
 * @enum
 */
export enum EExportCommandType {
    ExportCommandType_Create,
    ExportCommandType_Serialize,
    ExportCommandType_Count
}