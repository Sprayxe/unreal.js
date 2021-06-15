import { IJson, Package } from "./Package";
import { FPackageStore } from "../asyncloading2/FPackageStore";
import {
    EExportCommandType,
    FExportBundleEntry,
    FExportBundleHeader,
    FExportMapEntry,
    FMappedName_EType,
    FPackageObjectIndex,
    FPackageStoreEntry,
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
import { GSuppressMissingSchemaErrors } from "../../Globals";
import { UnrealArray } from "../../util/UnrealArray";
import { Lazy } from "../../util/Lazy";
import { Ue4Version } from "../versions/Game";

export class IoPackage extends Package {
    packageId: bigint
    globalPackageStore: FPackageStore
    summary: FPackageSummary
    nameMap: FNameMap
    importMap: FPackageObjectIndex[]
    exportMap: FExportMapEntry[]
    exportBundleHeaders: FExportBundleHeader[]
    exportBundleEntries: FExportBundleEntry[]
    graphData: FImportedPackage[]
    importedPackages: Lazy<IoPackage[]>
    exportsLazy: Lazy<UObject>[]
    bulkDataStartOffset = 0

    constructor(uasset: Buffer,
                packageId: bigint,
                storeEntry: FPackageStoreEntry,
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

        const diskPackageName =  this.nameMap.getName(this.summary.name)
        this.fileName = diskPackageName.text
        this.packageFlags =  this.summary.packageFlags
        this.name =  this.fileName

        // Import map
        Ar.pos = this.summary.importMapOffset
        const importMapSize = this.summary.exportMapOffset - this.summary.importMapOffset
        const importCount = importMapSize / 8
        this.importMap = new UnrealArray(importCount, () => new FPackageObjectIndex(Ar))

        // Export map
        Ar.pos = this.summary.exportMapOffset
        const exportCount = storeEntry.exportCount
        this.exportMap = new UnrealArray(exportCount, () => new FExportMapEntry(Ar))
        this.exportsLazy = new Array<Lazy<UObject>>(exportCount)

        // Export bundles
        Ar.pos = this.summary.exportBundlesOffset
        const exportBundleCount = storeEntry.exportBundleCount
        this.exportBundleHeaders = new UnrealArray(exportBundleCount, () => new FExportBundleHeader(Ar))
        this.exportBundleEntries = new UnrealArray(exportCount * 2, () => new FExportBundleEntry(Ar))

        // Graph data
        Ar.pos = this.summary.graphDataOffset
        this.graphData = Ar.readArray(() => new FImportedPackage(Ar))

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
                            if (e instanceof MissingSchemaException && !GSuppressMissingSchemaErrors) {
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

    resolveObjectIndex(index: FPackageObjectIndex, throwIfNotFound: boolean = true) {
        if (!index)
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
            return (imp ? this.resolveObjectIndex(imp, false)?.getObject() : null) as unknown as T
        }
    }

    findObjectByName(objectName:string, className?:string) {
        let exportIndex = -1
        this.exportMap.find((it, k) => {
            const is = this.nameMap.getName(it.objectName).text === objectName && (className == null || this.resolveObjectIndex(it.classIndex)?.name?.text === className)
            if (is) exportIndex = k
            return is
        })
        return exportIndex !== -1 ? this.exportsLazy[exportIndex].value : null
    }

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

    findObjectMinimal(index?: FPackageIndex) {
        if (!index || index.isNull()) {
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

    abstract get name(): FName
    getOuter(): ResolvedObject { return null }
    getSuper(): ResolvedObject { return null }
    getObject(): Lazy<UObject> { return null }
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

    get name() { return this.pkg.nameMap.getName(this.exportMapEntry.objectName) }
    getOuter() { return this.pkg.resolveObjectIndex(this.exportMapEntry.outerIndex) }
    getSuper() { return this.pkg.resolveObjectIndex(this.exportMapEntry.superIndex) }
    getObject() { return this.exportObject }
}

export class ResolvedScriptObject extends ResolvedObject {
    scriptImport: FScriptObjectEntry

    constructor(scriptImport: FScriptObjectEntry, pkg: IoPackage) {
        super(pkg)
        this.scriptImport = scriptImport
    }

    get name(): FName { return this.scriptImport.objectName.toName() }
    getOuter() { return this.pkg.resolveObjectIndex(this.scriptImport.outerIndex) }
    getObject(): Lazy<UObject> {
        return new Lazy<UObject>(() => {
            const name = this.name
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
                enm.names = new UnrealArray(enumValues.length, (it) => new Pair<FName, number>(FName.dummy(`${name}::${enumValues[it]}`), it))
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
        })
    }
}
