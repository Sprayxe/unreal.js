import { IJson, Package } from "./Package";
import { FPackageStore } from "../asyncloading2/FPackageStore";
import {
    EExportCommandType,
    FExportBundleEntry,
    FExportBundleHeader,
    FExportMapEntry,
    FMappedName_EType,
    FPackageObjectIndex,
    FPackageSummary,
    FScriptObjectEntry
} from "../asyncloading2/AsyncLoading2";
import { FNameMap } from "../asyncloading2/FNameMap";
import { UObject } from "./exports/UObject";
import { FArchive } from "../reader/FArchive";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FByteArchive } from "../reader/FByteArchive";
import { FName } from "../objects/uobject/FName";
import { EPackageFlags } from "../objects/uobject/EPackageFlags";
import { MissingSchemaException, ParserException } from "../../exceptions/Exceptions";
import { UScriptStruct } from "./exports/UScriptStruct";
import { UEnum } from "./exports/UEnum";
import { Pair } from "../../util/Pair";
import { sprintf } from "sprintf-js";
import { UStruct } from "./exports/UStruct";
import { FExportArchive } from "./reader/FExportArchive";
import { FPackageIndex } from "../objects/uobject/ObjectResource";
import { Locres } from "../locres/Locres";
import { Lazy } from "../../util/Lazy";
import { Ue4Version } from "../versions/Game";
import { Config } from "../../Config";

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
     * Package Summary
     * @type {FPackageSummary}
     * @public
     */
    summary: FPackageSummary

    /**
     * Name Map
     * @type {FNameMap}
     * @public
     */
    nameMap: FNameMap

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
     * Graph Data
     * @type {Array<FImportedPackage>}
     * @public
     */
    graphData: FImportedPackage[]

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
     * @param {FPackageStore} globalPackageStore Package store
     * @param {FileProvider} provider Instance of file provider
     * @param {Ue4Version} game Version of package
     */
    constructor(uasset: Buffer,
                packageId: bigint,
                globalPackageStore: FPackageStore,
                provider: FileProvider,
                game: Ue4Version = provider.game
    ) {
        super("", provider, game)
        this.packageId = packageId
        this.globalPackageStore = globalPackageStore
        const Ar = new FByteArchive(uasset)
        this.summary = new FPackageSummary(Ar)

        // Name map
        this.nameMap = new FNameMap()
        if (this.summary.nameMapNamesSize > 0) {
            const nameMapNamesData = new FByteArchive(uasset.subarray(0, this.summary.nameMapNamesOffset + this.summary.nameMapNamesSize))
            nameMapNamesData.pos = this.summary.nameMapNamesOffset
            const nameMapHashesData = new FByteArchive(uasset.subarray(0, this.summary.nameMapHashesOffset + this.summary.nameMapHashesSize))
            nameMapHashesData.pos = this.summary.nameMapHashesOffset
            this.nameMap.load(nameMapNamesData, nameMapHashesData, FMappedName_EType.Package)
        }

        const diskPackageName = this.nameMap.getName(this.summary.name)
        this.fileName = diskPackageName.text
        this.packageFlags = this.summary.packageFlags
        this.name = this.fileName

        // Import map
        Ar.pos = this.summary.importMapOffset
        const importCount = (this.summary.exportMapOffset - this.summary.importMapOffset) / 8
        this.importMap = new Array(importCount)
        for (let i = 0; i < importCount; ++i) {
            this.importMap[i] = new FPackageObjectIndex(Ar)
        }

        // Export map
        const exportCount = (this.summary.exportBundlesOffset - this.summary.exportMapOffset) / 72
        this.exportMap = new Array(exportCount)
        for (let i = 0; i < exportCount; ++i) {
            this.exportMap[i] = new FExportMapEntry(Ar)
        }
        this.exportsLazy = new Array<Lazy<UObject>>(exportCount)

        // Export bundles
        Ar.pos = this.summary.exportBundlesOffset
        let remainingBundleEntryCount = (this.summary.graphDataOffset - this.summary.exportBundlesOffset) / 8
        let foundBundlesCount = 0
        const foundBundleHeaders = []
        while (foundBundlesCount < remainingBundleEntryCount) {
            // This location is occupied by header, so it is not a bundle entry
            remainingBundleEntryCount--
            const bundleHeader = new FExportBundleHeader(Ar)
            foundBundlesCount += Math.floor(bundleHeader.entryCount)
            foundBundleHeaders.push(bundleHeader)
        }
        if (foundBundlesCount !== remainingBundleEntryCount)
            throw new Error(`foundBundlesCount (${foundBundlesCount}) !== remainingBundleEntryCount ${remainingBundleEntryCount}`)

        // Load export bundles into arrays
        this.exportBundleHeaders = foundBundleHeaders
        this.exportBundleEntries = new Array(foundBundlesCount)
        for (let i = 0; i < foundBundlesCount; ++i)
            this.exportBundleEntries[i] = new FExportBundleEntry(Ar)

        // Graph data
        Ar.pos = this.summary.graphDataOffset
        const graphDataLen = Ar.readInt32()
        this.graphData = new Array(graphDataLen)
        for (let i = 0; i < graphDataLen; ++i) {
            this.graphData[i] = new FImportedPackage(Ar)
        }

        // Preload dependencies
        this.importedPackages = new Lazy<IoPackage[]>(() => this.graphData.map(it => provider.loadGameFile(it.importedPackageId)))

        // Populate lazy exports
        const allExportDataOffset = this.summary.graphDataOffset + this.summary.graphDataSize
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
                        // TODO remove 'false' param, fix the issue
                        obj.outer = (this.resolveObjectIndex(exp.outerIndex, false) as ResolvedExportObject)?.exportObject?.value || this
                        obj.template = (this.resolveObjectIndex(exp.templateIndex, false) as ResolvedExportObject)?.exportObject
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
                                console.warn(`Did not read ${obj.exportType} correctly, ${validPos - Ar.pos} bytes remaining (${obj.getPathName()})`)
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
        if (index == null)
            return null

        if (index.isExport()) {
            return new ResolvedExportObject(index.toExport().toInt(), this)
        } else if (index.isScriptImport()) {
            const ent = this.globalPackageStore.scriptObjectEntriesMap.get(index)
            return ent ? new ResolvedScriptObject(ent, this) : null
        } else if (index.isPackageImport()) {
            for (const pkg of this.importedPackages.value) {
                for (const exportIndex in pkg?.exportMap) {
                    const exportMapEntry = pkg?.exportMap[exportIndex]
                    if (exportMapEntry.globalImportIndex.equals(index)) {
                        return new ResolvedExportObject(parseInt(exportIndex), pkg)
                    }
                }
            }
        } else if (index.isNull()) {
            return null
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
    findObject<T>(index?: FPackageIndex): T {
        if (!index || index.isNull()) {
            return null
        } else if (index.isExport()) {
            return this.exportsLazy[index.toExport()] as unknown as T
        } else {
            const imp = this.importMap[index.toImport()]
            return (imp ? this.resolveObjectIndex(imp, false)?.getObject() : null) as unknown as T
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

export abstract class ResolvedObject {
    pkg: IoPackage

    constructor(pkg: IoPackage) {
        this.pkg = pkg
    }

    abstract get name(): FName

    getOuter(): ResolvedObject {
        return null
    }

    getSuper(): ResolvedObject {
        return null
    }

    getObject(): Lazy<UObject> {
        return null
    }
}

export class ResolvedExportObject extends ResolvedObject {
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
        return this.pkg.nameMap.getName(this.exportMapEntry.objectName)
    }

    getOuter() {
        return this.pkg.resolveObjectIndex(this.exportMapEntry.outerIndex)
    }

    getSuper() {
        return this.pkg.resolveObjectIndex(this.exportMapEntry.superIndex)
    }

    getObject() {
        return this.exportObject
    }
}

export class ResolvedScriptObject extends ResolvedObject {
    scriptImport: FScriptObjectEntry

    constructor(scriptImport: FScriptObjectEntry, pkg: IoPackage) {
        super(pkg)
        this.scriptImport = scriptImport
    }

    get name(): FName {
        return this.scriptImport.objectName.toName()
    }

    getOuter() {
        return this.pkg.resolveObjectIndex(this.scriptImport.outerIndex)
    }

    getObject(): Lazy<UObject> {
        return new Lazy<UObject>(() => {
            const name = this.name
            if (name.text[0] === "E") {
                let enumValues = this.pkg.provider?.mappingsProvider?.getEnum(name)
                if (!enumValues) {
                    if ((this.pkg.packageFlags & EPackageFlags.PKG_UnversionedProperties) !== 0) {
                        throw new MissingSchemaException(`Unknown enum ${name}`)
                    }
                    enumValues = []
                }
                const enm = new UEnum()
                enm.name = name.text
                enm.names = new Array(enumValues.length)
                for (let i = 0; i < enumValues.length; ++i) {
                    enm.names[i] = new Pair<FName, number>(FName.dummy(`${name}::${enumValues[i]}`), i)
                }
                return enm
            } else {
                let struct = this.pkg.provider?.mappingsProvider?.getStruct(name)
                if (!struct) {
                    if ((this.pkg.packageFlags & EPackageFlags.PKG_UnversionedProperties) !== 0) {
                        throw new MissingSchemaException(`Unknown struct ${name}`)
                    }
                    struct = new UScriptStruct(name)
                }
                return struct
            }
        })
    }
}
