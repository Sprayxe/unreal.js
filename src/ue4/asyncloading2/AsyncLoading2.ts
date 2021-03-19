import { Utils } from "../../util/Utils";
import { FArchive } from "../reader/FArchive";
import { FMinimalName } from "../objects/uobject/NameTypes";
import { FPackageId } from "../objects/uobject/FPackageId";
import { FIoContainerId } from "../io/IoContainerId";
import Collection from "@discordjs/collection";
import { Pair } from "../../util/Pair";

export type FSourceToLocalizedPackageIdMap = Pair<FPackageId, FPackageId>[]
export type FCulturePackageMap = Collection<string, FSourceToLocalizedPackageIdMap>

export const INVALID_INDEX = 0
export const INDEX_BITS = 30
export const INDEX_MASK = (1 << INDEX_BITS) - 1
export const TYPE_MASK = INDEX_MASK
export const TYPE_SHIFT = INDEX_BITS

export class FMappedName {
    static create(index: number, num: number, type: FMappedName_EType): FMappedName {
        if (index > Number.MAX_VALUE)
            throw new Error("Bad name index")
        const mappedName = new FMappedName()
        mappedName.index = (Utils.ordinal(type, FMappedName_EType) << TYPE_SHIFT) | index
        mappedName.num = num
        return mappedName
    }

    static fromMinimalName(minimalName: FMinimalName) {
        const mappedName = new FMappedName()
        mappedName.index = minimalName.index.value
        mappedName.num = minimalName.num
        return mappedName
    }

    static isResolvedToMinimalName(minimalName: FMinimalName) {
        const mappedName = this.fromMinimalName(minimalName)
        return mappedName.isValid()
    }

    private index: number
    num: number

    constructor(Ar?: FArchive) {
        if (Ar) {
            this.index = Ar.readUInt32()
            this.num = Ar.readUInt32()
        }
    }

    isValid() {
        return this.index !== INVALID_INDEX && this.num !== INVALID_INDEX
    }

    getType() {
        return Object.values(FMappedName_EType)[(this.index & TYPE_MASK) >> TYPE_SHIFT]
    }

    isGlobal() {
        return ((this.index & TYPE_MASK) >> TYPE_SHIFT) !== 0
    }

    getIndex() {
        return this.index & INDEX_MASK
    }

    equals(other?: any) {
        if (this === other) return true
        if (!(other instanceof FMappedName)) return false

        other as FMappedName

        if (this.index !== other.index) return false
        return this.num === other.num
    }

    hashCode() {
        let result = Utils.hash(this.index.toString())
        result = 31 * result + Utils.hash(this.num.toString())
        return result
    }
}

export enum FMappedName_EType {
    Package = "Package",
    Container = "Container",
    Global = "Global"
}

export class FPackageStoreEntry {
    exportBundlesSize = 0
    exportCount = 0
    exportBundleCount = 0
    loadOrder = 0
    pad = 0
    importedPackages: FPackageId[]

    constructor(Ar: FArchive) {
        this.exportBundlesSize = Ar.readUInt64() as unknown as number
        this.exportCount = Ar.readInt32()
        this.exportBundleCount = Ar.readInt32()
        this.loadOrder = Ar.readUInt32()
        this.pad = Ar.readUInt32()
        this.importedPackages = this.readCArrayView(Ar, (x) => new FPackageId(x))
    }

    private readCArrayView<T>(Ar: FArchive, init: (Ar: FArchive) => T): T[] {
        const initialPos = Ar.pos
        const arrayNum = Ar.readInt32()
        const offsetToDataFromThis = Ar.readInt32()
        if (arrayNum <= 0) {
            return []
        }
        const continuePos = Ar.pos
        Ar.pos = initialPos + offsetToDataFromThis
        const result = Utils.getArray(arrayNum, () => [init(Ar)])
        Ar.pos = continuePos
        return result
    }
}


export const _INDEX_BITS = 62
export const _INDEX_MASK = (1 << _INDEX_BITS) - 1
export const _TYPE_MASK2 = _INDEX_MASK
export const _TYPE_SHIFT = _INDEX_BITS
export const INVALID = 0
export class FPackageObjectIndex {
    private typeAndId = INVALID

    constructor()
    constructor(type: FPackageObjectIndex_EType, id: number)
    constructor(Ar: FArchive)
    constructor(x?: any, y?: any) {
        if (x) {
            if (x instanceof FArchive) {
                this.typeAndId = x.readUInt64() as unknown as number
            } else {
                this.typeAndId = (Utils.ordinal(x, FPackageObjectIndex_EType) << _TYPE_SHIFT) | y
            }
        }
    }

    static generateImportHashFromObjectPath(objectPath: string) {
        return 0
    }

    static fromExportIndex(index: number) {
        return new FPackageObjectIndex(FPackageObjectIndex_EType.Export, index)
    }

    static fromScriptPath(scriptObjectPath: string) {
        return new FPackageObjectIndex(FPackageObjectIndex_EType.ScriptImport, this.generateImportHashFromObjectPath(scriptObjectPath))
    }

    static fromPackagePath(packageObjectPath: string) {
        return new FPackageObjectIndex(FPackageObjectIndex_EType.PackageImport, this.generateImportHashFromObjectPath(packageObjectPath))
    }

    isNull() {
        return this.typeAndId === INVALID
    }

    isExport() {
        return (this.typeAndId >> _TYPE_SHIFT) === Utils.ordinal(FPackageObjectIndex_EType.Export, FPackageObjectIndex_EType)
    }

    isImport() {
        return this.isScriptImport() || this.isPackageImport()
    }

    isScriptImport() {
        return (this.typeAndId >> _TYPE_SHIFT) === Utils.ordinal(FPackageObjectIndex_EType.ScriptImport, FPackageObjectIndex_EType)
    }

    isPackageImport() {
        return (this.typeAndId >> _TYPE_SHIFT) === Utils.ordinal(FPackageObjectIndex_EType.PackageImport, FPackageObjectIndex_EType)
    }

    toExport() {
        if (!this.isExport())
            throw new Error("Cannot cast an import to export.")
        return this.typeAndId
    }

    type() {
        return Object.values(FPackageObjectIndex_EType)[this.typeAndId >> TYPE_SHIFT] // custom
    }

    value() {
        return this.typeAndId & _INDEX_MASK
    }

    equals(other?: any): Boolean {
        if (this === other) return true
        if (!(other instanceof FPackageObjectIndex)) return false

        other as FPackageObjectIndex

        return this.typeAndId === other.typeAndId;
    }

    hashCode() {
        return Utils.hash(this.typeAndId.toString())
    }
}

export enum FPackageObjectIndex_EType {
    Export = "Export",
    ScriptImport = "ScriptImport",
    PackageImport = "PackageImport",
    Null = "Null"
}


export class FScriptObjectEntry {
    objectName: FMinimalName
    globalIndex: FPackageObjectIndex
    outerIndex: FPackageObjectIndex
    cdoClassIndex: FPackageObjectIndex

    constructor(Ar: FArchive, nameMap: string[]) {
        this.objectName = new FMinimalName(Ar, nameMap)
        this.globalIndex = new FPackageObjectIndex(Ar)
        this.outerIndex = new FPackageObjectIndex(Ar)
        this.cdoClassIndex = new FPackageObjectIndex(Ar)
    }
}

export class FContainerHeader {
    containerId: FIoContainerId
    packageCount = 0
    names: Buffer
    nameHashes: Buffer
    packageIds: FPackageId[]
    storeEntries: FPackageStoreEntry[]
    culturePackageMap: FCulturePackageMap
    packageRedirects: Pair<FPackageId, FPackageId>[]

    constructor(Ar: FArchive) {
        this.containerId = new FIoContainerId(Ar)
        this.packageCount = Ar.readUInt32()
        this.names = Ar.read(Ar.readInt32())
        this.nameHashes = Ar.read(Ar.readInt32())
        this.packageIds = Ar.readArray(() => new FPackageId(Ar))
        const storeEntriesNum = Ar.readInt32()
        const storeEntriesEnd = Ar.pos + storeEntriesNum
        this.storeEntries = Utils.getArray(this.packageCount, () => [Ar], FPackageStoreEntry)
        Ar.pos = storeEntriesEnd
        this.culturePackageMap = Ar.readTMap(null, () => {
            return {
                key: Ar.readString(),
                value: Ar.readArray(() => new Pair(new FPackageId(Ar), new FPackageId(Ar)))
            }
        })
        this.packageRedirects = Ar.readArray(() => new Pair(new FPackageId(Ar), new FPackageId(Ar)))
    }
}

export class FPackageSummary {
    name: FMappedName
    sourceName: FMappedName
    packageFlags: number
    cookedHeaderSize: number
    nameMapNamesOffset: number
    nameMapNamesSize: number
    nameMapHashesOffset: number
    nameMapHashesSize: number
    importMapOffset: number
    exportMapOffset: number
    exportBundlesOffset: number
    graphDataOffset: number
    graphDataSize: number
    pad: number /*= 0*/

    constructor(Ar: FArchive) {
        this.name = new FMappedName(Ar)
        this.sourceName = new FMappedName(Ar)
        this.packageFlags = Ar.readUInt32()
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

export class FExportMapEntry {
    cookedSerialOffset = 0
    cookedSerialSize = 0
    objectName: FMappedName
    outerIndex: FPackageObjectIndex
    classIndex: FPackageObjectIndex
    superIndex: FPackageObjectIndex
    templateIndex: FPackageObjectIndex
    globalImportIndex: FPackageObjectIndex
    objectFlags: number
    filterFlags: number
    //uint8 Pad[3] = {};

    constructor(Ar: FArchive) {
        this.cookedSerialOffset = Ar.readUInt64() as unknown as number
        this.cookedSerialSize = Ar.readUInt64() as unknown as number
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

export class FExportBundleHeader {
    firstEntryIndex: number
    entryCount: number

    constructor(Ar: FArchive) {
        this.firstEntryIndex = Ar.readUInt32()
        this.entryCount = Ar.readUInt32()
    }
}

export class FExportBundleEntry {
    localExportIndex: number
    commandType: EExportCommandType

    constructor(Ar: FArchive) {
        this.localExportIndex = Ar.readInt32()
        this.commandType = Object.values(EExportCommandType)[Ar.readInt32()]
    }
}

export enum EExportCommandType {
    ExportCommandType_Create = "ExportCommandType_Create",
    ExportCommandType_Serialize = "ExportCommandType_Serialize",
    ExportCommandType_Count = "ExportCommandType_Count"
}