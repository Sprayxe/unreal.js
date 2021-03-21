import { Package } from "./Package";
import { FPackageId } from "../objects/uobject/FPackageId";
import { FPackageStore } from "../asyncloading2/FPackageStore";
import {
    EExportCommandType,
    FExportBundleEntry,
    FExportBundleHeader,
    FExportMapEntry,
    FMappedName_EType,
    FPackageObjectIndex,
    FPackageStoreEntry,
    FPackageSummary, FScriptObjectEntry
} from "../asyncloading2/AsyncLoading2";
import { FNameMap } from "../asyncloading2/FNameMap";
import { UObject } from "./exports/UObject";
import { FArchive } from "../reader/FArchive";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FByteArchive } from "../reader/FByteArchive";
import { Utils } from "../../util/Utils";
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
import { GSuppressMissingSchemaErrors } from "../../Globals";

export class IoPackage extends Package {
    packageId: FPackageId
    globalPackageStore: FPackageStore
    summary: FPackageSummary
    nameMap: FNameMap
    importMap: FPackageObjectIndex[]
    exportMap: FExportMapEntry[]
    exportBundleHeaders: FExportBundleHeader[]
    exportBundleEntries: FExportBundleEntry[]
    graphData: FImportedPackage[]
    importedPackages: IoPackage[]
    exportsLazy: UObject[]
    bulkDataStartOffset = 0

    constructor(uasset: Buffer,
                packageId: FPackageId,
                storeEntry: FPackageStoreEntry,
                globalPackageStore: FPackageStore,
                provider: FileProvider,
                game: number = provider.game
    ) {
        super("", provider, game)
        this.packageId = packageId
        this.globalPackageStore = globalPackageStore
        const Ar = new FByteArchive(uasset)
        this.summary = new FPackageSummary(Ar)

        // Name map
        this.nameMap = new FNameMap()
        if (this.summary.nameMapNamesSize > 0) {
            const nameMapNamesData = new FByteArchive(Buffer.from(uasset, this.summary.nameMapNamesOffset, this.summary.nameMapNamesSize))
            const nameMapHashesData = new FByteArchive(Buffer.from(uasset, this.summary.nameMapHashesOffset, this.summary.nameMapHashesSize))
            this.nameMap.load(nameMapNamesData, nameMapHashesData, FMappedName_EType.Package)
        }

        const diskPackageName =  this.nameMap.getName(this.summary.name)
        this.fileName = diskPackageName.text
        this.packageFlags =  this.summary.packageFlags
        this.name =  this.fileName

        // Import map
        Ar.pos = this.summary.importMapOffset
        const importMapSize = this.summary.exportMapOffset - this.summary.importMapOffset
        const importCount = importMapSize / 8
        this.importMap = Utils.getArray(importCount, () => [Ar], FPackageObjectIndex)

        // Export map
        Ar.pos = this.summary.exportMapOffset
        const exportCount = storeEntry.exportCount
        this.exportMap = Utils.getArray(exportCount, () => [Ar], FExportMapEntry)
        this.exportsLazy = new Array<UObject>(exportCount)

        // Export bundles
        Ar.pos = this.summary.exportBundlesOffset
        const exportBundleCount = storeEntry.exportBundleCount
        this.exportBundleHeaders = Utils.getArray(exportBundleCount, () => [Ar], FExportBundleHeader)
        this.exportBundleEntries = Utils.getArray(exportCount * 2, () => [Ar], FExportBundleEntry)

        // Graph data
        Ar.pos = this.summary.graphDataOffset
        this.graphData = Ar.readArray(() => new FImportedPackage(Ar))

        // Preload dependencies
        this.importedPackages = this.graphData.map(it => provider.loadGameFile(it.importedPackageId))

        const allExportDataOffset = this.summary.graphDataOffset + this.summary.graphDataSize
        let currentExportDataOffset = allExportDataOffset
        for (const exportBundle of this.exportBundleHeaders) {
            let i = 0
            while (i < exportBundle.entryCount) {
                const entry = this.exportBundleEntries[exportBundle.firstEntryIndex + i]
                if (entry.commandType === EExportCommandType.ExportCommandType_Serialize) {
                    const localExportIndex = entry.localExportIndex
                    const exp = this.exportMap[localExportIndex]
                    const localExportDataOffset = currentExportDataOffset
                    const self = this
                    function _exportsLazy() {
                        // Create
                        const objectName = self.nameMap.getName(exp.objectName)
                        const obj = self.constructExport(self.resolveObjectIndex(exp.classIndex)?.getObject() as UStruct)
                        obj.name = objectName.text
                        obj.outer = (self.resolveObjectIndex(exp.outerIndex) as ResolvedExportObject)?.exportObject || self
                        obj.template = (self.resolveObjectIndex(exp.templateIndex) as ResolvedExportObject)?.exportObject
                        obj.flags = exp.objectFlags

                        // Serialize
                        const Ar = new FExportArchive(uasset, obj, self)
                        Ar.useUnversionedPropertySerialization = (self.packageFlags & EPackageFlags.PKG_UnversionedProperties) !== 0
                        Ar.uassetSize = exp.cookedSerialOffset - localExportDataOffset
                        Ar.bulkDataStartOffset = self.bulkDataStartOffset
                        Ar.pos = localExportDataOffset
                        const validPos = Ar.pos + exp.cookedSerialSize
                        try {
                            obj.deserialize(Ar, validPos)
                            if (validPos !== Ar.pos) {
                                console.warn(`Did not read ${obj.exportType} correctly, ${validPos - Ar.pos} bytes remaining (${obj.getPathName()})`)
                            }
                        } catch (e) {
                            if (e instanceof MissingSchemaException && !GSuppressMissingSchemaErrors) {
                                console.warn(e)
                            } else {
                                throw e
                            }
                        }
                        return obj
                    }
                    this.exportsLazy[localExportIndex] = _exportsLazy()
                    currentExportDataOffset = exp.cookedSerialSize
                }
                ++i
            }
        }
        this.bulkDataStartOffset = currentExportDataOffset
    }

    resolveObjectIndex(index: FPackageObjectIndex, throwIfNotFound: boolean = true) {
        if (!index)
            return null

        if (index.isExport()) {
            return new ResolvedExportObject(index.toExport(), this)
        } else if (index.isScriptImport()) {
            const ent = this.globalPackageStore.scriptObjectEntriesMap.get(index)
            if (ent) return new ResolvedScriptImport(ent, this)
        } else if (index.isPackageImport()) {
            for (const pkg of this.importedPackages) {
                pkg?.exportMap?.forEach((exportMapEntry, exportIndex) => {
                    if (exportMapEntry.globalImportIndex === index) {
                        return new ResolvedExportObject(exportIndex, pkg)
                    }
                })
            }
        } else if (index.isNull()) {
            return null
        }

        if (throwIfNotFound) {
            throw ParserException(
                sprintf("Missing %s import 0x%016X for package %s",
                    index.isScriptImport() ? "script" : "package",
                    index.value(),
                    this.fileName
                )
            )
        }

        return null
    }

    findObject<T>(index?: FPackageIndex): T {
        if (!index || index.isNull()) {
            return null
        } else if (index.isExport()) {
            return this.exportsLazy[index.toExport()] as unknown as T
        } else {
            const imp = this.importMap[index.toImport()]
            return (imp ? this.resolveObjectIndex(imp, false)?.getObject() : null )as unknown as T
        }
    }

    findObjectByName(objectName:string, className?:string) {
        let exportIndex = -1
        this.exportMap.find((it, k) => {
            const is = this.nameMap.getName(it.objectName).text === objectName && (className == null || this.resolveObjectIndex(it.classIndex)?.getName()?.text === className)
            if (is) exportIndex = k
            return is
        })
        return exportIndex !== -1 ? this.exportsLazy[exportIndex] : null
    }

    toJson(context: any, locres: Locres) {
        context["import_map"] = this.importMap
        context["export_map"] = this.exportMap
        context["export_properties"] = this.exports.map(it => it.toJson(context, locres))
        return context
    }

    findObjectMinimal(index?: FPackageIndex) {
        if (!index || index.isNull()) {
            return null
        } else if (index.isExport()) {
            return new ResolvedExportObject(index.toExport(), this)
        } else {
            const imp = this.importMap[index.toImport()]
            return imp ? this.resolveObjectIndex(imp, false) : null
        }
    }
}

export class FImportedPackage {
    importedPackageId: FPackageId
    externalArcs: FArc[]

    constructor(Ar: FArchive) {
        this.importedPackageId = new FPackageId(Ar)
        this.externalArcs = Ar.readArray(() => new FArc(Ar))
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

    abstract getName(): FName
    getOuter(): ResolvedObject { return null }
    getSuper(): ResolvedObject { return null }
    getObject(): UObject { return null }
}

export class ResolvedExportObject extends ResolvedObject {
    exportIndex: number
    exportMapEntry: FExportMapEntry
    exportObject: UObject

    constructor(exportIndex: number, pkg: IoPackage) {
        super(pkg)
        this.exportIndex = exportIndex
        this.exportMapEntry = pkg.exportMap[exportIndex]
        this.exportObject = pkg.exportsLazy[exportIndex]
    }

    getName() { return this.pkg.nameMap.getName(this.exportMapEntry.objectName) }
    getOuter() { return this.pkg.resolveObjectIndex(this.exportMapEntry.outerIndex) }
    getSuper() { return this.pkg.resolveObjectIndex(this.exportMapEntry.superIndex) }
    getObject() { return this.exportObject }
}

export class ResolvedScriptImport extends ResolvedObject {
    scriptImport: FScriptObjectEntry

    constructor(scriptImport: FScriptObjectEntry, pkg: IoPackage) {
        super(pkg)
        this.scriptImport = scriptImport
    }

    getName(): FName { return this.scriptImport.objectName.toName() }
    getOuter() { return this.pkg.resolveObjectIndex(this.scriptImport.outerIndex) }
    getObject(): UObject {
        const name = this.getName()
        if (name.text[0] === "E") {
            let enumValues = this.pkg.provider?.mappingsProvider?.getEnum(name)
            if (!enumValues) {
                if ((this.pkg.packageFlags & EPackageFlags.PKG_UnversionedProperties) !== 0) {
                    throw MissingSchemaException(`Unknown enum ${name}`)
                }
                enumValues = []
            }
            const enm = new UEnum()
            enm.name = name.text
            enm.names = Utils.getArray(enumValues.length, (it) => [FName.dummy(`${name}::${enumValues[it]}`, 0), it], Pair)
            return enm
        } else {
            let struct = this.pkg.provider?.mappingsProvider?.getStruct(name)
            if (!struct) {
                if ((this.pkg.packageFlags & EPackageFlags.PKG_UnversionedProperties) !== 0) {
                    throw MissingSchemaException(`Unknown struct ${name}`)
                }
                struct = new UScriptStruct(name)
            }
            return struct
        }
    }
}
