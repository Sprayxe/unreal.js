import { FArchive } from "../reader/FArchive";
import { FMinimalName } from "../objects/uobject/NameTypes";
import { createFIoContainerId } from "../io/IoContainerId";
import { Pair } from "../../util/Pair";
import { CityHash } from "../../util/CityHash";
import Long from "long";
import { UnrealArray } from "../../util/UnrealArray";
import Collection from "@discordjs/collection";

export type FSourceToLocalizedPackageIdMap = Pair<bigint, bigint>[]
export type FCulturePackageMap = Collection<string, FSourceToLocalizedPackageIdMap>

export const INVALID_INDEX = ~0
export const INDEX_BITS = 30
export const INDEX_MASK = (1 << INDEX_BITS) - 1
export const TYPE_MASK = ~INDEX_MASK
export const TYPE_SHIFT = INDEX_BITS

/**
 * FMappedName
 */
export class FMappedName {
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
        mappedName.index = (type << TYPE_SHIFT) | index
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
     * Wether is resolved to minimal name
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
    index: number = INVALID_INDEX

    /**
     * Num
     * @type {number}
     * @public
     */
    num: number = INVALID_INDEX

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
     * Wether is valid
     * @returns {boolean} Result
     * @public
     */
    isValid() {
        return this.index !== INVALID_INDEX && this.num !== INVALID_INDEX
    }

    /**
     * Gets type
     * @returns {number} Type
     * @public
     */
    getType() {
        return (this.index & TYPE_MASK) >>> TYPE_SHIFT
    }

    /**
     * Wether is global
     * @returns {boolean} Result
     * @public
     */
    isGlobal() {
        return ((this.index & TYPE_MASK) >> TYPE_SHIFT) !== 0
    }

    /**
     * Gets index
     * @returns {number} Index
     * @public
     */
    getIndex() {
        return this.index & INDEX_MASK
    }

    /**
     * Wether equals another object
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
 * FPackageStoreEntry
 */
export class FPackageStoreEntry {
    /**
     * exportBundlesSize
     * @type {number}
     * @public
     */
    exportBundlesSize = 0

    /**
     * exportCount
     * @type {number}
     * @public
     */
    exportCount = 0

    /**
     * exportBundleCount
     * @type {number}
     * @public
     */
    exportBundleCount = 0

    /**
     * loadOrder
     * @type {number}
     * @public
     */
    loadOrder = 0

    /**
     * pad
     * @type {number}
     * @public
     */
    pad = 0

    /**
     * importedPackages
     * @type {Array<string>}
     * @public
     */
    importedPackages: string[]

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.exportBundlesSize = Number(Ar.readUInt64())
        this.exportCount = Ar.readInt32()
        this.exportBundleCount = Ar.readInt32()
        this.loadOrder = Ar.readUInt32()
        this.pad = Ar.readUInt32()
        this.importedPackages = this.readCArrayView(Ar, (x) => x.readUInt64().toString())
    }

    /**
     * Reads array view
     * @param {FArchive} Ar UE4 Reader to use
     * @param {any} init Method for initializing array entries
     * @returns {Array<any>}
     * @example <FPackageStoreEntry>.readCArrayView(Ar, (_Ar) => _Ar.readUInt64().toString())
     * @private
     */
    private readCArrayView<T>(Ar: FArchive, init: (Ar: FArchive) => T): T[] {
        const initialPos = Ar.pos
        const arrayNum = Ar.readInt32()
        const offsetToDataFromThis = Ar.readInt32()
        if (arrayNum <= 0) {
            return []
        }
        const continuePos = Ar.pos
        Ar.pos = initialPos + offsetToDataFromThis
        const result = new UnrealArray(arrayNum, () => init(Ar))
        Ar.pos = continuePos
        return result
    }
}

export const _INDEX_BITS = 62
export const _INDEX_MASK = (1 << _INDEX_BITS) - 1
export const _TYPE_SHIFT = _INDEX_BITS
export const INVALID = Long.fromNumber(~0)

/**
 * FPackageObjectIndex
 */
export class FPackageObjectIndex {
    /**
     * typeAndId
     * @type {number}
     * @private
     */
    private readonly typeAndId = INVALID

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
    constructor(type: FPackageObjectIndex_EType, id: Long.Long)

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
                this.typeAndId = Long.fromString(x.readUInt64().toString())
            } else {
                this.typeAndId = Long.fromNumber(x << TYPE_SHIFT).or(y)
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
    static generateImportHashFromObjectPath(objectPath: string): Long.Long {
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
        hash = hash.and(Long.fromNumber(3).shiftLeft(62))
        return hash
    }

    /**
     * Creates instance from export index
     * @param {number} index Export index
     * @returns {FPackageObjectIndex} Instance
     * @public
     */
    static fromExportIndex(index: number) {
        return new FPackageObjectIndex(FPackageObjectIndex_EType.Export, Long.fromNumber(index))
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
     * Wether is null
     * @returns {boolean} Result
     * @public
     */
    isNull() {
        return this.typeAndId === INVALID
    }

    /**
     * Wether is export
     * @returns {boolean} Result
     * @public
     */
    isExport() {
        return this.typeAndId.shru(_TYPE_SHIFT).toInt() === FPackageObjectIndex_EType.Export
    }

    /**
     * Wether is import
     * @returns {boolean} Result
     * @public
     */
    isImport() {
        return this.isScriptImport() || this.isPackageImport()
    }

    /**
     * Wether is script import
     * @returns {boolean} Result
     * @public
     */
    isScriptImport() {
        return this.typeAndId.shru(_TYPE_SHIFT).toInt() === FPackageObjectIndex_EType.ScriptImport
    }

    /**
     * Wether is package import
     * @returns {boolean} Result
     * @public
     */
    isPackageImport() {
        return this.typeAndId.shru(_TYPE_SHIFT).toInt() === FPackageObjectIndex_EType.PackageImport
    }

    /**
     * Returns export value
     * @returns {number} Export
     * @public
     */
    toExport() {
        if (!this.isExport())
            throw new Error("Cannot cast an import to export.")
        return this.typeAndId
    }

    /**
     * Returns type
     * @returns {number} type
     * @public
     */
    type() {
        return this.typeAndId.shiftRight(TYPE_SHIFT).toNumber() // custom
    }

    /**
     * Returns value
     * @returns {number} value
     * @public
     */
    value() {
        return this.typeAndId.and(_INDEX_MASK)
    }

    /**
     * Wether equals other object
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
 * FScriptObjectEntry
 */
export class FScriptObjectEntry {
    /**
     * objectName
     * @type {FMinimalName}
     * @public
     */
    objectName: FMinimalName

    /**
     * globalIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    globalIndex: FPackageObjectIndex

    /**
     * outerIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    outerIndex: FPackageObjectIndex

    /**
     * cdoClassIndex
     * @type {FPackageObjectIndex}
     * @public
     */
    cdoClassIndex: FPackageObjectIndex

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {Array<string>} nameMap Name map
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, nameMap: string[]) {
        this.objectName = new FMinimalName(Ar, nameMap)
        this.globalIndex = new FPackageObjectIndex(Ar)
        this.outerIndex = new FPackageObjectIndex(Ar)
        this.cdoClassIndex = new FPackageObjectIndex(Ar)
    }
}

/**
 * FContainerHeader
 */
export class FContainerHeader {
    /**
     * ID
     * @type {bigint}
     * @public
     */
    containerId: bigint

    /**
     * packageCount
     * @type {number}
     * @public
     */
    packageCount = 0

    /**
     * names
     * @type {Buffer}
     * @public
     */
    names: Buffer

    /**
     * nameHashes
     * @type {Buffer}
     * @public
     */
    nameHashes: Buffer

    /**
     * packageIds
     * @type {Array<bigint>}
     * @public
     */
    packageIds: bigint[]

    /**
     * storeEntries
     * @type {Array<FPackageStoreEntry>}
     * @public
     */
    storeEntries: FPackageStoreEntry[]

    /**
     * culturePackageMap
     * @type {FCulturePackageMap}
     * @public
     */
    culturePackageMap: FCulturePackageMap

    /**
     * packageRedirects
     * @type {Array<Pair<bigint, bigint>>}
     * @public
     */
    packageRedirects: Pair<bigint, bigint>[]

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.containerId = createFIoContainerId(Ar)
        this.packageCount = Ar.readUInt32()
        this.names = Ar.readBuffer(Ar.readInt32())
        this.nameHashes = Ar.readBuffer(Ar.readInt32())
        this.packageIds = Ar.readArray(() => Ar.readUInt64())
        const storeEntriesNum = Ar.readInt32()
        const storeEntriesEnd = Ar.pos + storeEntriesNum
        this.storeEntries = new UnrealArray(this.packageCount, () =>  new FPackageStoreEntry(Ar))
        Ar.pos = storeEntriesEnd
        this.culturePackageMap = Ar.readTMap(null, () => {
            return {
                key: Ar.readString(),
                value: Ar.readArray(() =>
                    new Pair(Ar.readUInt64(), Ar.readUInt64()))
            }
        })
        this.packageRedirects = Ar.readArray(() =>
            new Pair(Ar.readUInt64(), Ar.readUInt64()))
    }
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
        this.packageFlags = -~Ar.readUInt32() - 1 // TODO is this right? following original code this gives inaccurate output
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
    //uint8 Pad[3] = {};

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.cookedSerialOffset = Number(Ar.readUInt64())
        this.cookedSerialSize = Number(Ar.readUInt64())
        this.objectName = new FMappedName(Ar)
        this.outerIndex = new FPackageObjectIndex(Ar)
        this.classIndex = new FPackageObjectIndex(Ar)
        this.superIndex = new FPackageObjectIndex(Ar)
        this.templateIndex = new FPackageObjectIndex(Ar)
        this.globalImportIndex = new FPackageObjectIndex(Ar)
        this.objectFlags = Ar.readUInt32()
        this.filterFlags = Ar.readUInt8()
        Ar.pos += 3
    }
}

/**
 * FExportBundleHeader
 */
export class FExportBundleHeader {
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