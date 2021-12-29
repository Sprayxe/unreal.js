import { IJson, Package, ResolvedLoadedObject, ResolvedObject } from "./Package";
import { FPackageStore, FScriptObjectEntry } from "../asyncloading2/FPackageStore";
import {
    EExportCommandType,
    FExportBundleEntry,
    FExportBundleHeader,
    FExportMapEntry,
    FMappedName_EType,
    FPackageObjectIndex,
    FPackageSummary,
    FZenPackageSummary,
    FZenPackageVersioningInfo
} from "../asyncloading2/AsyncLoading2";
import { FNameMap } from "../asyncloading2/FNameMap";
import { UObject } from "./exports/UObject";
import { FArchive } from "../reader/FArchive";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FByteArchive } from "../reader/FByteArchive";
import { FName } from "../objects/uobject/FName";
import { EPackageFlags } from "../objects/uobject/EPackageFlags";
import { MissingSchemaException, ParserException } from "../../exceptions/Exceptions";
import { UEnum } from "./exports/UEnum";
import { Pair } from "../../util/Pair";
import { sprintf } from "sprintf-js";
import { UStruct } from "./exports/UStruct";
import { FExportArchive } from "./reader/FExportArchive";
import { FPackageIndex } from "../objects/uobject/ObjectResource";
import { Locres } from "../locres/Locres";
import { Lazy } from "../../util/Lazy";
import { Config } from "../../Config";
import { VersionContainer } from "../versions/VersionContainer";
import { FFilePackageStoreEntry } from "../io/IoContainerHeader";
import { Game } from "../versions/Game";

/**
 * UE4 I/O Package
 * @extends {Package}
 */
export class IoPackage extends Package {
    /**
     * Package ID
     * @type {bigint}
     * @public
     */
    packageId: bigint

    /**
     * Package Store
     * @type {FPackageStore}
     * @public
     */
    globalPackageStore: FPackageStore

    /**
     * Name Map
     * @type {FNameMap}
     * @public
     */
    nameMap: FNameMap

    /**
     * Imported Export Hashes
     * @type {Array<bigint>}
     * @public
     */
    importedPublicExportHashes?: bigint[] = null

    /**
     * Import Map
     * @type {Array<FPackageObjectIndex>}
     * @public
     */
    importMap: FPackageObjectIndex[]

    /**
     * Export Map
     * @type {Array<FExportMapEntry>}
     * @public
     */
    exportMap: FExportMapEntry[]

    /**
     * Export Bundle Headers
     * @type {Array<FExportBundleHeader>}
     * @public
     */
    exportBundleHeaders: FExportBundleHeader[]

    /**
     * Export Bundle Entries
     * @type {Array<FExportBundleEntry>}
     * @public
     */
    exportBundleEntries: FExportBundleEntry[]

    /**
     * Imported Packages
     * @type {Lazy<Array<IoPackage>>}
     * @public
     */
    importedPackages: Lazy<IoPackage[]>

    /**
     * Lazy Exports
     * @type {Array<Lazy<UObject>>}
     * @public
     */
    exportsLazy: Lazy<UObject>[]

    /**
     * Offset start of bulk data
     * @type {number}
     * @public
     */
    bulkDataStartOffset = 0

    /**
     * Creates an instance
     * @param {Buffer} uasset Uasset data of package
     * @param {bigint} packageId ID of package
     * @param {FFilePackageStoreEntry} storeEntry Store entry
     * @param {FPackageStore} globalPackageStore Package store
     * @param {FileProvider} provider Instance of file provider
     * @param {VersionContainer} versions Version of package
     */
    constructor(uasset: Buffer,
                packageId: bigint,
                storeEntry: FFilePackageStoreEntry,
                globalPackageStore: FPackageStore,
                provider: FileProvider,
                versions: VersionContainer = provider.versions
    ) {
        super("", provider, versions)
        this.packageId = packageId
        this.globalPackageStore = globalPackageStore
        const Ar = new FByteArchive(uasset, versions)

        let allExportDataOffset: number

        if (versions.game >= Game.GAME_UE5_BASE) {
            const summary = new FZenPackageSummary(Ar)
            if (summary.bHasVersioningInfo) {
                const versioningInfo = new FZenPackageVersioningInfo(Ar)
                if (!versions.explicitVer) {
                    versions.ver = versioningInfo.packageVersion.value
                    versions.customVersions = versioningInfo.customVersions
                }
            }

            // Name map
            this.nameMap = new FNameMap()
            this.nameMap.load(Ar, FMappedName_EType.Package)

            const diskPackageName = this.nameMap.getName(summary.name)
            this.fileName = diskPackageName.text
            this.packageFlags = summary.packageFlags
            this.name = this.fileName

            // Imported public export hashes
            Ar.pos = summary.importedPublicExportHashesOffset
            const importedPublicExportHashesLen = (summary.importMapOffset - summary.importedPublicExportHashesOffset) / 8
            this.importedPublicExportHashes = new Array(importedPublicExportHashesLen)
            for (let i = 0; i < importedPublicExportHashesLen; ++i)
                this.importedPublicExportHashes[i] = Ar.readInt64()

            // Import map
            Ar.pos = summary.importMapOffset
            const importCount = (summary.exportMapOffset - summary.importMapOffset) / 8
            this.importMap = new Array(importCount)
            for (let i = 0; i < importCount; ++i)
                this.importMap[i] = new FPackageObjectIndex(Ar)

            // Export map
            Ar.pos = summary.exportMapOffset
            const exportCount = storeEntry.exportCount //(summary.exportBundleEntriesOffset - summary.exportMapOffset) / FExportMapEntry.SIZE
            this.exportMap = new Array(exportCount)
            for (let i = 0; i < exportCount; ++i)
                this.exportMap[i] = new FExportMapEntry(Ar)
            this.exportsLazy = new Array(exportCount)

            // Export bundle entries
            Ar.pos = summary.exportBundleEntriesOffset
            const exportBundleEntriesLen = exportCount * 2
            this.exportBundleEntries = new Array(exportBundleEntriesLen)
            for (let i = 0; i < exportBundleEntriesLen; ++i)
                this.exportBundleEntries[i] = new FExportBundleEntry(Ar)

            // Export bundle headers
            Ar.pos = summary.graphDataOffset
            const exportBundleHeadersLen = storeEntry.exportBundleCount
            this.exportBundleHeaders = new Array(exportBundleHeadersLen)
            for (let i = 0; i < exportBundleHeadersLen; ++i)
                this.exportBundleHeaders[i] = new FExportBundleHeader(Ar)

            allExportDataOffset = summary.headerSize
        } else {
            const summary = new FPackageSummary(Ar)

            // Name map
            this.nameMap = new FNameMap()
            if (summary.nameMapNamesSize > 0) {
                const nameMapNamesData = new FByteArchive(uasset.subarray(0, summary.nameMapNamesOffset + summary.nameMapNamesSize))
                nameMapNamesData.pos = summary.nameMapNamesOffset
                const nameMapHashesData = new FByteArchive(uasset.subarray(0, summary.nameMapHashesOffset + summary.nameMapHashesSize))
                nameMapHashesData.pos = summary.nameMapHashesOffset
                this.nameMap.load(nameMapNamesData, nameMapHashesData, FMappedName_EType.Package)
            }

            const diskPackageName = this.nameMap.getName(summary.name)
            this.fileName = diskPackageName.text
            this.packageFlags = summary.packageFlags
            this.name = this.fileName

            // Import map
            Ar.pos = summary.importMapOffset
            const importCount = (summary.exportMapOffset - summary.importMapOffset) / 8
            this.importMap = new Array(importCount)
            for (let i = 0; i < importCount; ++i)
                this.importMap[i] = new FPackageObjectIndex(Ar)

            // Export map
            Ar.pos = summary.exportMapOffset
            const exportCount = storeEntry.exportCount //(summary.exportBundlesOffset - summary.exportMapOffset) / FExportMapEntry.SIZE
            this.exportMap = new Array(exportCount)
            for (let i = 0; i < exportCount; ++i)
                this.exportMap[i] = new FExportMapEntry(Ar)
            this.exportsLazy = new Array(exportCount)

            // Export bundles
            Ar.pos = summary.exportBundlesOffset
            const exportBundleHeadersLen = storeEntry.exportBundleCount
            this.exportBundleHeaders = new Array(exportBundleHeadersLen)
            for (let i = 0; i < exportBundleHeadersLen; ++i)
                this.exportBundleHeaders[i] = new FExportBundleHeader(Ar)

            const exportBundleEntriesLen = exportCount * 2
            this.exportBundleEntries = new Array(exportBundleEntriesLen)
            for (let i = 0; i < exportBundleEntriesLen; ++i)
                this.exportBundleEntries[i] = new FExportBundleEntry(Ar)

            allExportDataOffset = summary.graphDataOffset + summary.graphDataSize
        }

        // Preload dependencies
        const importedPackageIds = storeEntry.importedPackages
        this.importedPackages = new Lazy<IoPackage[]>(() => importedPackageIds.map(it => provider.loadGameFile(it)))

        // Populate lazy exports
        let currentExportDataOffset = allExportDataOffset
        for (const exportBundle of this.exportBundleHeaders) {
            for (let i = 0; i < exportBundle.entryCount; ++i) {
                const entry = this.exportBundleEntries[exportBundle.firstEntryIndex + i]
                if (entry.commandType === EExportCommandType.ExportCommandType_Serialize) {
                    const localExportIndex = entry.localExportIndex
                    const exp = this.exportMap[localExportIndex]
                    const localExportDataOffset = currentExportDataOffset
                    this.exportsLazy[localExportIndex] = new Lazy<UObject>(() => {
                        // Create
                        const objectName = this.nameMap.getName(exp.objectName)
                        const obj = Package.constructExport(this.resolveObjectIndex(exp.classIndex)?.getObject()?.value as UStruct)
                        obj.name = objectName.text
                        const objOuter = this.resolveObjectIndex(exp.outerIndex)
                        obj.outer = (objOuter instanceof ResolvedExportObject ? objOuter?.exportObject?.value : null) || this
                        const objTemplate = this.resolveObjectIndex(exp.templateIndex)
                        obj.template = objTemplate instanceof ResolvedExportObject ? objTemplate?.exportObject : null
                        obj.flags = Math.floor(exp.objectFlags)

                        // Serialize
                        const Ar = new FExportArchive(uasset, obj, this)
                        Ar.useUnversionedPropertySerialization = (this.packageFlags & EPackageFlags.PKG_UnversionedProperties) !== 0
                        Ar.uassetSize = Math.floor(exp.cookedSerialOffset) - localExportDataOffset
                        Ar.bulkDataStartOffset = this.bulkDataStartOffset
                        Ar.pos = localExportDataOffset
                        const validPos = Ar.pos + Math.floor(exp.cookedSerialSize)
                        try {
                            obj.deserialize(Ar, validPos)
                            if (validPos !== Ar.pos) {
                                console.warn(`Did not read ${obj.exportType} correctly, ${validPos - Ar.pos} bytes remaining (${obj.getPathName0()})`)
                            }
                        } catch (e) {
                            if (e instanceof MissingSchemaException && !Config.GSuppressMissingSchemaErrors) {
                                console.warn(e)
                            } else {
                                throw e
                            }
                        }
                        return obj
                    })
                    currentExportDataOffset += Math.floor(exp.cookedSerialSize)
                }
            }
        }
        this.bulkDataStartOffset = currentExportDataOffset
    }

    /**
     * Resolves an object index
     * @param {FPackageObjectIndex} index Object index to resolve
     * @param {boolean} throwIfNotFound (default: true) Whether to throw an error if it wasn't found
     * @returns {ResolvedExportObject | ResolvedScriptObject | null} Object
     * @public
     */
    resolveObjectIndex(index: FPackageObjectIndex, throwIfNotFound: boolean = true) {
        if (index == null || index.isNull())
            return null

        if (index.isExport()) {
            return new ResolvedExportObject(index.toExport().toInt(), this)
        } else if (index.isScriptImport()) {
            const ent = this.globalPackageStore.scriptObjectEntries.get(index)
            return ent ? new ResolvedScriptObject(ent, this) : null
        } else if (index.isPackageImport()) {
            const localProvider = this.provider
            if (localProvider != null) {
                const localImportedPublicExportHashes = this.importedPublicExportHashes
                if (localImportedPublicExportHashes != null) {
                    const packageImportRef = index.toPackageImportRef()
                    const pkg = this.importedPackages.value[packageImportRef.importedPackageIndex]
                    if (pkg != null) {
                        const pkgExpLen = pkg.exportMap.length
                        for (let exportIndex = 0; exportIndex < pkgExpLen; ++exportIndex) {
                            const exportMapEntry = pkg.exportMap[exportIndex]
                            if (exportMapEntry.publicExportHash === localImportedPublicExportHashes[packageImportRef.importedPublicExportHashIndex]) {
                                return new ResolvedExportObject(exportIndex, pkg)
                            }
                        }
                    }
                } else {
                    for (const pkg of this.importedPackages.value) {
                        for (const exportIndex in pkg?.exportMap) {
                            const exportMapEntry = pkg?.exportMap[exportIndex]
                            if (exportMapEntry.globalImportIndex?.equals(index)) {
                                return new ResolvedExportObject(parseInt(exportIndex), pkg)
                            }
                        }
                    }
                }
            }
        }

        if (throwIfNotFound) {
            throw new ParserException(
                sprintf("Missing %s import 0x%016X for package %s",
                    index.isScriptImport() ? "script" : "package",
                    index.value(),
                    this.fileName
                )
            )
        }

        return null
    }

    /**
     * Finds an object by FPackageIndex
     * @param {FPackageIndex} index Index to look for
     * @returns {?any} Object or null
     * @public
     */
    findObject<T>(index?: FPackageIndex): Lazy<T> {
        if (index == null || index.isNull()) {
            return null
        } else if (index.isExport()) {
            return this.exportsLazy[index.toExport()] as any
        } else {
            const imp = this.importMap[index.toImport()]
            return (imp ? this.resolveObjectIndex(imp, false)?.getObject() : null) as any
        }
    }

    /**
     * Finds an object by name
     * @param {string} objectName Name of object
     * @param {?string} className Class name of object
     * @returns {?Lazy<UObject>} Object or null
     * @public
     */
    findObjectByName(objectName: string, className?: string) {
        objectName = objectName.toLowerCase()
        className = className?.toLowerCase()
        let exportIndex = -1
        for (let k = 0; k < this.exportMap.length; ++k) {
            const it = this.exportMap[k]
            const name = this.nameMap.getName(it.objectName)
            const obj = name.text.toLowerCase() === objectName
                && (className == null || this.resolveObjectIndex(it.classIndex, false)?.name?.text?.toLowerCase() === className)
            if (obj) exportIndex = k
        }
        return exportIndex !== -1 ? this.exportsLazy[exportIndex] : null
    }

    /**
     * Turns this package into json
     * @param {?Locres} locres Locres to use
     * @returns {Array<IJson>} Json data
     * @public
     */
    toJson(locres?: Locres): IJson[] {
        const object = []
        for (const it of this.exports) {
            if (!(it instanceof UObject)) continue
            const json = it.toJson(locres)
            object.push({
                type: it.exportType,
                name: it.name,
                properties: json
            })
        }
        return object
    }

    /**
     * Finds an object minimal
     * @param {?FPackageIndex} index Index to look for
     * @returns {ResolvedExportObject | ResolvedScriptObject} Object
     * @public
     */
    findObjectMinimal(index?: FPackageIndex): ResolvedExportObject | ResolvedScriptObject {
        if (index == null || index.isNull()) {
            return null
        } else if (index.isExport()) {
            return new ResolvedExportObject(index.toExport(), this)
        } else {
            const imp = this.importMap[index.toImport()]
            return this.resolveObjectIndex(imp, false)
        }
    }
}

export class FImportedPackage {
    importedPackageId: bigint
    externalArcs: FArc[]

    constructor(Ar: FArchive) {
        this.importedPackageId = Ar.readUInt64()
        const len = Ar.readInt32()
        this.externalArcs = new Array(len)
        for (let i = 0; i < len; ++i) {
            this.externalArcs[i] = new FArc(Ar)
        }
    }
}

export class FArc {
    fromExportBundleIndex: number
    toExportBundleIndex: number

    constructor(Ar: FArchive) {
        this.fromExportBundleIndex = Ar.readInt32()
        this.toExportBundleIndex = Ar.readInt32()
    }
}

class ResolvedExportObject extends ResolvedObject {
    exportIndex: number
    exportMapEntry: FExportMapEntry
    exportObject: Lazy<UObject>

    constructor(exportIndex: number, pkg: IoPackage) {
        super(pkg)
        this.exportIndex = exportIndex
        this.exportMapEntry = pkg.exportMap[exportIndex]
        this.exportObject = pkg.exportsLazy[exportIndex]
    }

    get name() {
        return (this.pkg as IoPackage).nameMap.getName(this.exportMapEntry.objectName)
    }

    getOuter() {
        return (this.pkg as IoPackage).resolveObjectIndex(this.exportMapEntry.outerIndex) || new ResolvedLoadedObject(this.pkg)
    }

    getClazz() {
        return (this.pkg as IoPackage).resolveObjectIndex(this.exportMapEntry.classIndex)
    }

    getSuper() {
        return (this.pkg as IoPackage).resolveObjectIndex(this.exportMapEntry.superIndex)
    }

    getObject() {
        return this.exportObject
    }
}

class ResolvedScriptObject extends ResolvedObject {
    scriptImport: FScriptObjectEntry

    constructor(scriptImport: FScriptObjectEntry, pkg: IoPackage) {
        super(pkg)
        this.scriptImport = scriptImport
    }

    get name(): FName {
        return this.scriptImport.objectName.toName()
    }

    getOuter() {
        return (this.pkg as IoPackage).resolveObjectIndex(this.scriptImport.outerIndex)
    }

    getObject(): Lazy<UObject> {
        return new Lazy<UObject>(() => {
            const name = this.name
            const struct = this.pkg.provider?.mappingsProvider?.getStruct(name)
            if (struct != null) {
                return struct
            } else {
                const enumValues = this.pkg.provider?.mappingsProvider?.getEnum(name);
                if (enumValues != null) {
                    const enm = new UEnum()
                    enm.name = name.text
                    enm.names = new Array(enumValues.length)
                    for (let i = 0; i < enumValues.length; ++i) {
                        enm.names[i] = new Pair<FName, number>(FName.dummy(`${name}::${enumValues[i]}`), i)
                    }
                    return enm
                } else return null
            }
        })
    }
}
