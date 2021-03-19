import { Package } from "./Package";
import { FPackageId } from "../objects/uobject/FPackageId";
import { FPackageStore } from "../asyncloading2/FPackageStore";
import {
    FExportBundleEntry,
    FExportBundleHeader,
    FExportMapEntry,
    FMappedName_EType,
    FPackageObjectIndex,
    FPackageStoreEntry,
    FPackageSummary
} from "../asyncloading2/AsyncLoading2";
import { FNameMap } from "../asyncloading2/FNameMap";
import { UObject } from "./exports/UObject";
import { FArchive } from "../reader/FArchive";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FByteArchive } from "../reader/FByteArchive";
import { Utils } from "../../util/Utils";

export class IoPackage extends Package {
    packageId: FPackageId
    globalPackageStore: FPackageStore
    summary: FPackageSummary
    nameMap: FNameMap
    importMap: FPackageObjectIndex[]
    exportMap: FExportMapEntry[]
    exportBundleHeaders: FExportBundleHeader[]
    exportBundleEntries: FExportBundleHeader[]
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

        // TODO Populate lazy exports
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