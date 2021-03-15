import { FileProvider } from "../../fileprovider/FileProvider";
import { Ue4Version } from "../versions/Game";
import { FNameEntry } from "../objects/uobject/FNameEntry";
import { Package } from "./Package";
import { FPackageFileSummary } from "../objects/uobject/PackageFileSummary";
import { FObjectExport, FObjectImport, FPackageIndex } from "../objects/uobject/ObjectResource";
import { FAssetArchive } from "./reader/FAssetArchive";
import { UObject } from "./exports/UObject";
import { MissingSchemaException, ParserException } from "../../exceptions/Exceptions";
import { EPackageFlags } from "../objects/uobject/EPackageFlags";
import { PayloadType } from "./util/PayloadType";
import { UScriptStruct } from "./exports/UScriptStruct";
import { ObjectTypeRegistry } from "./ObjectTypeRegistry";
import { Locres } from "../locres/Locres";
import { FByteArchiveWriter } from "./writer/FAssetArchiveWriter";

export class PakPackage extends Package {
    protected packageMagic = 0x9E2A83C1
    uasset: Buffer
    uexp?: Buffer = null
    ubulk?: Buffer = null
    fileName: string
    provider?: FileProvider = null
    game: number = Ue4Version.GAME_UE4_LATEST
    version: number

    info: FPackageFileSummary
    nameMap: FNameEntry[]
    importMap: FObjectImport[]
    exportMap: FObjectExport[]

    get exportsLazy() {
        return this.exportMap.map(it => it.exportObject)
    }

    constructor(uasset: Buffer, uexp: Buffer = null, ubulk: Buffer = null, name: string, provider: FileProvider = null, game: number = Ue4Version.GAME_UE4_LATEST) {
        super(name, provider, game)
        this.uasset = uasset
        this.uexp = uexp
        this.ubulk = ubulk
        this.fileName = name
        this.provider = provider
        this.game = game
        this.version = new Ue4Version(this.game).version
        // init
        this.name = provider?.compactFilePath(this.fileName)?.substring(0, this.fileName.lastIndexOf(".")) || this.fileName
        const uassetAr = new FAssetArchive(this.uasset, this.provider, this.fileName)
        const uexpAr = this.uexp ? new FAssetArchive(this.uexp, this.provider, this.fileName) : uassetAr
        const ubulkAr = this.ubulk ? new FAssetArchive(this.ubulk, this.provider, this.fileName) : null

        uassetAr.game = this.game
        uassetAr.ver = this.version
        uassetAr.owner = this
        uexpAr.game = this.game
        uexpAr.ver = this.version
        uexpAr.owner = this
        if (ubulkAr) {
            ubulkAr.game = this.game
            ubulkAr.ver = this.version
            ubulkAr.owner = this
        }

        this.nameMap = []
        this.importMap = []
        this.exportMap = []

        this.info = new FPackageFileSummary(uassetAr)
        if (this.info.tag !== this.packageMagic)
            throw ParserException(`Invalid uasset magic, ${this.info.tag} != ${this.packageMagic}`)

        const ver = this.info.fileVersionUE4
        if (ver > 0) {
            uassetAr.ver = ver
            uexpAr.ver = ver
            if (ubulkAr)
                ubulkAr.ver = ver
        }
        this.packageFlags = this.info.packageFlags

        uassetAr.seek(this.info.nameOffset)
        let i = 0
        while (i < this.info.nameCount) {
            this.nameMap.push(new FNameEntry(uassetAr))
            ++i
        }

        uassetAr.seek(this.info.importOffset)
        let x = 0
        while (x < this.info.importCount) {
            this.importMap.push(new FObjectImport(uassetAr))
            ++x
        }

        uassetAr.seek(this.info.exportOffset)
        let y = 0
        while (y < this.info.exportCount) {
            this.exportMap.push(new FObjectExport(uassetAr))
            ++y
        }

        // Setup uexp reader
        if (this.uexp != null) {
            uexpAr.uassetSize = this.info.totalHeaderSize
        }
        uexpAr.bulkDataStartOffset = this.info.bulkDataStartOffset
        uexpAr.useUnversionedPropertySerialization = (this.packageFlags & EPackageFlags.PKG_UnversionedProperties) !== 0

        // If attached also setup the ubulk reader
        if (ubulkAr != null) {
            ubulkAr.uassetSize = this.info.totalHeaderSize
            ubulkAr.uexpSize = eval(this.exportMap.map(it => it.serialSize.toInt()).join("+"))
            uexpAr.addPayload(PayloadType.UBULK, ubulkAr)
        }

        this.exportMap.forEach((e) => {
            const parse = () => {
                const uexpAr2 = uexpAr.clone()
                uexpAr2.seekRelative(e.serialOffset.toInt())
                const validPos = (uexpAr2.pos() + e.serialSize.toInt())
                const obj = this.constructExport(e.classIndex.load())
                obj.export = e
                obj.name = e.objectName.text
                obj.outer = e.outerIndex.load() || this
                // obj.template = this.findObject(export.templateIndex)
                obj.deserialize(uexpAr2, validPos)
                if (validPos !== uexpAr2.pos()) {
                    console.warn(`Did not read ${obj.exportType} correctly, ${validPos - uexpAr.pos()} bytes remaining`)
                } else {
                    console.debug(`Successfully read ${obj.exportType} at ${uexpAr2.toNormalPos(e.serialOffset.toInt())} with size ${e.serialSize}`)
                }
                return obj
            }
            e.exportObject = parse()
        })
    }

    findObject(index?: FPackageIndex) {
        return index === null || index.isNull() ? null :
            index.isImport() ? this.findImport(this.importMap[index.toImport()]) :
            index.isExport() ? this.exportMap[index.toExport()]?.exportObject :
            null
    }

    loadImport(imp?: FObjectImport) {
       if (!imp) return null
       const loaded = this.findImport(imp) || null
       return loaded
    }

    findImport(imp?: FObjectImport): UObject {
        if (!imp) return null
        if (imp.className.text === "Class") {
            const lazy = () => {
                const structName = imp.objectName
                let struct = this.provider?.mappingsProvider?.getStruct(structName)
                if (!struct) {
                    if ((this.packageFlags & EPackageFlags.PKG_UnversionedProperties) !== 0) {
                        throw MissingSchemaException(`Unknown struct ${structName}`)
                    }
                    struct = new UScriptStruct(ObjectTypeRegistry.get(structName.text), structName)
                }
                return struct
            }
            return lazy()
        }
        // The needed export is located in another asset, try to load it
        if (!this.getImportObject(imp.outerIndex)) return null
        if (!this.provider) return null
        const pkg = this.getPackage(imp.outerIndex)
        if (pkg) return pkg.findObjectByName(imp.objectName.text, imp.className.text)
        else console.warn("Failed to load referenced import")
        return null
    }

    findObjectByName(objectName:string, className?:string): UObject {
        const exp = this.exportMap.find(it => {
            return it.objectName.text === objectName && (className == null || (this.getImportObject(it.classIndex))?.objectName?.text === className)
        })
        return exp?.exportObject
    }

    getImportObject(imp: FPackageIndex) {
        return imp.isImport() ? this.importMap[imp.toImport()] : null
    }

    getExportObject(imp: FPackageIndex) {
        return imp.isExport() ? this.importMap[imp.toExport()] : null
    }

    getResource(imp: FPackageIndex) {
        return this.getImportObject(imp) || this.getExportObject(imp)
    }

    toJson(context: any, locres: Locres) {
        return {
            import_map: this.importMap,
            export_map: this.exportMap,
            export_properties: this.exports.map((it) => {
                if (it instanceof UObject)
                    return it.toJson(context, locres)
            })
        }
    }

    private getPackage(imp: FPackageIndex) {
        const obj = this.getImportObject(imp)
        if (obj) {
            return this.provider.loadGameFile(obj.objectName.text)
        }
        return null
    }

    updateHeader() {
        const uassetWriter = new FByteArchiveWriter()
        uassetWriter.game = this.game
        uassetWriter.ver = this.version
        uassetWriter.nameMap = this.nameMap
        uassetWriter.importMap = this.importMap
        uassetWriter.exportMap = this.exportMap
        this.info.serialize(uassetWriter)

        const nameMapOffset = uassetWriter.pos()
        if (this.info.nameCount !== this.nameMap.length) {
            throw ParserException(`Invalid name count, summary says ${this.info.nameCount} names but name map is ${this.nameMap.length} entries long`)
        }

        this.nameMap.forEach((it) => it.serialize(uassetWriter))
        const importMapOffset = uassetWriter.pos()
        if (this.info.importCount !== this.importMap.length)
            throw ParserException(`Invalid import count, summary says ${this.info.importCount} imports but import map is ${this.importMap.length} entries long`)
        this.importMap.forEach((it) => it.serialize(uassetWriter))

        const exportMapOffset = uassetWriter.pos()
        if (this.info.exportCount !== this.exportMap.length)
            throw ParserException("Invalid export count, summary says ${info.exportCount} exports but export map is ${exportMap.size} entries long")
        this.exportMap.forEach((it) => it.serialize(uassetWriter))

        this.info.totalHeaderSize = uassetWriter.pos()
        this.info.nameOffset = nameMapOffset
        this.info.importOffset = importMapOffset
        this.info.exportOffset = exportMapOffset
    }
}