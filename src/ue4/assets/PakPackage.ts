import { FileProvider } from "../../fileprovider/FileProvider";
import { FName, FNameEntry } from "../objects/uobject/FName";
import { IJson, Package, ResolvedLoadedObject, ResolvedObject } from "./Package";
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
import { FAssetArchiveWriter, FByteArchiveWriter } from "./writer/FAssetArchiveWriter";
import { WritableStreamBuffer } from "stream-buffers";
import { sum } from "lodash"
import { Lazy } from "../../util/Lazy";
import { Config } from "../../Config";
import { VersionContainer } from "../versions/VersionContainer";
import { UEnum } from "./exports/UEnum";
import { Pair } from "../../util/Pair";

/**
 * UE4 Pak Package
 * @extends {Package}
 */
export class PakPackage extends Package {
    /**
     * Pak magic
     * @type {number}
     * @protected
     */
    protected packageMagic = 0x9E2A83C1

    /**
     * UASSET data
     * @type {Buffer}
     * @public
     */
    uasset: Buffer

    /**
     * UEXP data
     * @type {?Buffer}
     * @public
     */
    uexp?: Buffer = null

    /**
     * UBULK data
     * @type {?Buffer}
     * @public
     */
    ubulk?: Buffer = null

    /**
     * Name of package file
     * @type {string}
     * @public
     */
    fileName: string

    /**
     * File provider
     * @type {?FileProvider}
     * @public
     */
    provider?: FileProvider = null

    /**
     * Information about package
     * @type {FPackageFileSummary}
     * @public
     */
    info: FPackageFileSummary

    /**
     * Name map
     * @type {Array<FNameEntry>}
     * @public
     */
    nameMap: FNameEntry[]

    /**
     * Import map
     * @type {Array<FObjectImport>}
     * @public
     */
    importMap: FObjectImport[]

    /**
     * Export map
     * @type {Array<FObjectExport>}
     * @public
     */
    exportMap: FObjectExport[]

    /**
     * Stores lazy exports
     * @type {Array<Lazy<UObject>>}
     * @public
     */
    get exportsLazy() {
        return this.exportMap.map(it => it.exportObject)
    }

    /**
     * Creates an instance
     * @param {Buffer} uasset Uasset data
     * @param {?Buffer} uexp Uexp data
     * @param {?Buffer} ubulk Ubulk data
     * @param {string} name Name of package file
     * @param {?FileProvider} provider File provider
     * @param {?VersionContainer} versions Game that is used
     * @constructor
     * @public
     */
    constructor(uasset: Buffer, uexp: Buffer = null, ubulk: Buffer = null, name: string, provider: FileProvider = null, versions: VersionContainer = VersionContainer.DEFAULT) {
        super(name, provider, versions)
        this.uasset = uasset
        this.uexp = uexp
        this.ubulk = ubulk
        this.fileName = name
        this.provider = provider
        // init
        this.name = provider?.compactFilePath(this.fileName)?.substring(0, this.fileName.lastIndexOf(".")) || this.fileName
        const uassetAr = new FAssetArchive(this.uasset, this.provider, this.fileName)
        const uexpAr = this.uexp ? new FAssetArchive(this.uexp, this.provider, this.fileName) : uassetAr
        const ubulkAr = this.ubulk ? new FAssetArchive(this.ubulk, this.provider, this.fileName) : null

        uassetAr.versions = versions
        uassetAr.owner = this

        uexpAr.versions = versions
        uexpAr.owner = this

        if (ubulkAr) {
            ubulkAr.versions = versions
            ubulkAr.owner = this
        }

        this.nameMap = []
        this.importMap = []
        this.exportMap = []

        this.info = new FPackageFileSummary(uassetAr)
        if (this.info.tag !== this.packageMagic)
            throw new ParserException(`Invalid uasset magic, ${this.info.tag} !== ${this.packageMagic}`, uassetAr)

        const ver = this.info.fileVersionUE4
        if (ver > 0) { // TODO
            uassetAr.ver = ver
            uexpAr.ver = ver
            if (ubulkAr)
                ubulkAr.ver = ver
        }
        this.packageFlags = this.info.packageFlags

        uassetAr.pos = this.info.nameOffset
        let i = 0
        while (i < this.info.nameCount) {
            this.nameMap.push(new FNameEntry(uassetAr))
            ++i
        }

        uassetAr.pos = this.info.importOffset
        let x = 0
        while (x < this.info.importCount) {
            this.importMap.push(new FObjectImport(uassetAr))
            ++x
        }

        uassetAr.pos = this.info.exportOffset
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
            ubulkAr.uexpSize = sum(this.exportMap.map(it => it.serialSize))
            uexpAr.addPayload(PayloadType.UBULK, ubulkAr)
        }

        this.exportMap.forEach((e) => {
            e.exportObject = new Lazy<UObject>(() => {
                const uexpAr2 = uexpAr.clone()
                uexpAr2.seekRelative(e.serialOffset)
                const validPos = (uexpAr2.pos + e.serialSize)
                const obj = Package.constructExport(e.classIndex.load())
                obj.export = e
                obj.name = e.objectName.text
                obj.outer = e.outerIndex.load() || this
                // obj.template = this.findObject(export.templateIndex)
                obj.deserialize(uexpAr2, validPos)
                if (validPos !== uexpAr2.pos) {
                    console.warn(`Did not read ${obj.exportType} correctly, ${validPos - uexpAr.pos} bytes remaining`)
                } else {
                    if (Config.GDebug) console.debug(`Successfully read ${obj.exportType} at ${uexpAr2.toNormalPos(e.serialOffset)} with size ${e.serialSize}`)
                }
                return obj
            })
        })
    }

    /**
     * Finds an object by index
     * @param {?FPackageIndex} index Index to find
     * @returns {?Lazy<any>} Object or null
     * @public
     */
    findObject<T>(index?: FPackageIndex): Lazy<T> {
        return (index === null || index.isNull()) ? null :
            index.isImport() ? this.findImport(this.importMap[index.toImport()]) as any :
                index.isExport() ? this.exportMap[index.toExport()]?.exportObject as any :
                    null
    }

    /**
     * Loads an import
     * @param {?FObjectImport} imp Import to load
     * @returns {?UObject} Object or null
     * @public
     */
    loadImport(imp?: FObjectImport) {
        if (!imp) return null
        return this.findImport(imp)?.value || null
    }

    /**
     * Finds an import
     * @param {?FObjectImport} imp Import to load
     * @returns {?Lazy<UObject>} Object or null
     * @public
     */
    findImport(imp?: FObjectImport): Lazy<UObject> {
        if (!imp) return null
        if (imp.className.text === "Class") {
            return new Lazy<UObject>(() => {
                const structName = imp.objectName
                let struct = this.provider?.mappingsProvider?.getStruct(structName)
                if (!struct) {
                    if ((this.packageFlags & EPackageFlags.PKG_UnversionedProperties) !== 0) {
                        throw new MissingSchemaException(`Unknown struct ${structName}`)
                    }
                    struct = new UScriptStruct(ObjectTypeRegistry.get(structName.text), structName)
                }
                return struct
            })
        }
        // The needed export is located in another asset, try to load it
        if (!this.getImportObject(imp.outerIndex)) return null
        if (!this.provider) return null
        const pkg = this.getPackage(imp.outerIndex)
        if (pkg) return pkg.findObjectByName(imp.objectName.text, imp.className.text)
        else console.warn("Failed to load referenced import")
        return null
    }

    /**
     * Finds an object by name
     * @param {string} objectName Name of object
     * @param {?string} className Class name of object
     * @returns {?Lazy<UObject>} Object or null
     * @public
     */
    findObjectByName(objectName: string, className?: string): Lazy<UObject> {
        const exp = this.exportMap.find(it => {
            return it.objectName.text === objectName
                && (className == null || (this.getImportObject(it.classIndex))?.objectName?.text === className)
        })
        return exp?.exportObject
    }

    public findObjectMinimal(index?: FPackageIndex): ResolvedObject | null {
        if (index == null || index.isNull() == null)
            return null
        if (index.isImport())
            return this.resolveImport(index)
        return new ResolvedExportObject(index.toExport(), this)
    }

    public resolveImport(importIndex: FPackageIndex): ResolvedObject {
        const imp = this.importMap[importIndex.toImport()]
        let outerMostIndex = importIndex
        let outerMostImport: FObjectImport
        while (true) {
            outerMostImport = this.importMap[outerMostIndex.toImport()]
            if (outerMostImport.outerIndex.isNull())
                break
            outerMostIndex = outerMostImport.outerIndex
        }

        outerMostImport = this.importMap[outerMostIndex.toImport()]
        // We don't support loading script packages, so just return a fallback
        if (outerMostImport.objectName.text.startsWith("/Script/")) {
            return new ResolvedImportObject(imp, this)
        }

        const importPackage = this.provider?.loadGameFile(outerMostImport.objectName.text) as PakPackage
        if (importPackage == null) {
            console.warn("Missing native package (%s) for import of %s in %s.", outerMostImport.objectName, imp.objectName, this.name)
            return new ResolvedImportObject(imp, this)
        }

        let outer: string = null
        if (outerMostIndex != imp.outerIndex && imp.outerIndex.isImport()) {
            //var outerImport = importMap[import.outerIndex.toImport()]
            outer = this.resolveImport(imp.outerIndex).getPathName0()
            /*if (outer == null) {
                console.warn("Missing outer for import of ({}): {} in {} was not found, but the package exists.", name, outerImport.objectName, importPackage.getFullName())
                return ResolvedImportObject(import, this)
            }*/
        }

        const impPkgLen = importPackage.exportMap.length
        for (let i = 0; i < impPkgLen; ++i) {
            const exp = importPackage.exportMap[i]
            if (exp.objectName != exp.objectName)
            continue
            const thisOuter = importPackage.findObjectMinimal(exp.outerIndex)
            if (thisOuter?.getPathName0() == outer)
                return new ResolvedExportObject(i, importPackage)
        }

        console.warn("Missing import of (%s): %s in %s was not found, but the package exists.", this.name, imp.objectName, importPackage.getFullName0())
        return new ResolvedImportObject(imp, this)
    }

    /**
     * Gets an import object
     * @param {FPackageIndex} imp Import to find
     * @returns {?FObjectImport} Import or null
     * @public
     */
    getImportObject(imp: FPackageIndex): FObjectImport {
        return imp.isImport() ? this.importMap[imp.toImport()] : null
    }

    /**
     * Gets an export object
     * @param {FPackageIndex} imp Export to find
     * @returns {?FObjectExport} Export or null
     * @public
     */
    getExportObject(imp: FPackageIndex): FObjectExport {
        return imp.isExport() ? this.exportMap[imp.toExport()] : null
    }

    /**
     * Gets either export or import object
     * @param {FPackageIndex} imp Index to find
     * @returns {FObjectImport | FObjectExport | null} Object or null
     * @public
     */
    getResource(imp: FPackageIndex) {
        return this.getImportObject(imp) || this.getExportObject(imp)
    }

    /**
     * Turns this into json
     * @param {?Locres} locres Locres to use
     * @returns {Array<IJson>} Json
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
     * Gets a package from index
     * @param {FPackageIndex} imp Package to get
     * @returns {?Package} Package or null
     * @private
     */
    private getPackage(imp: FPackageIndex) {
        const obj = this.getImportObject(imp)
        if (obj) {
            return this.provider.loadGameFile(obj.objectName.text)
        }
        return null
    }

    /* DON'T USE THIS */
    updateHeader() {
        const uassetWriter = new FByteArchiveWriter()
        uassetWriter.versions = this.versions
        uassetWriter.nameMap = this.nameMap
        uassetWriter.importMap = this.importMap
        uassetWriter.exportMap = this.exportMap
        this.info.serialize(uassetWriter)

        const nameMapOffset = uassetWriter.pos()
        if (this.info.nameCount !== this.nameMap.length) {
            throw new ParserException(
                `Invalid name count, summary says ${this.info.nameCount} names but name map is ${this.nameMap.length} entries long`, uassetWriter)
        }

        this.nameMap.forEach((it) => it.serialize(uassetWriter))
        const importMapOffset = uassetWriter.pos()
        if (this.info.importCount !== this.importMap.length)
            throw new ParserException(
                `Invalid import count, summary says ${this.info.importCount} imports but import map is ${this.importMap.length} entries long`, uassetWriter)
        this.importMap.forEach((it) => it.serialize(uassetWriter))

        const exportMapOffset = uassetWriter.pos()
        if (this.info.exportCount !== this.exportMap.length)
            throw new ParserException(
                `Invalid export count, summary says ${this.info.exportCount} exports but export map is ${this.exportMap.length} entries long`, uassetWriter)
        this.exportMap.forEach((it) => it.serialize(uassetWriter))

        this.info.totalHeaderSize = uassetWriter.pos()
        this.info.nameOffset = nameMapOffset
        this.info.importOffset = importMapOffset
        this.info.exportOffset = exportMapOffset
    }

    /* DON'T USE THIS */
    write(uassetOutputStream: WritableStreamBuffer, uexpOutputStream: WritableStreamBuffer, ubulkOutputStream?: WritableStreamBuffer) {
        this.updateHeader()

        const uexpWriter = this.writer(uexpOutputStream)
        uexpWriter.versions = this.versions
        uexpWriter.uassetSize = this.info.totalHeaderSize
        this.exports.forEach((it) => {
            const beginPos = uexpWriter.relativePos()
            it.serialize(uexpWriter)
            const finalPos = uexpWriter.relativePos()
            if (it.export) {
                it.export.serialOffset = beginPos
                it.export.serialSize = finalPos - beginPos
            }
        })

        uexpWriter.writeUInt32(this.packageMagic)
        const uassetWriter = this.writer(uassetOutputStream)
        uassetWriter.versions = this.versions
        this.info.serialize(uassetWriter)

        const nameMapPadding = this.info.nameOffset - uassetWriter.pos()
        if (nameMapPadding > 0)
            uassetWriter.write(nameMapPadding)
        if (this.info.nameCount !== this.nameMap.length)
            throw new ParserException(
                `Invalid name count, summary says ${this.info.nameCount} names but name map is ${this.nameMap.length} entries long`, uassetWriter)
        this.nameMap.forEach((it) => it.serialize(uassetWriter))

        const importMapPadding = this.info.importOffset - uassetWriter.pos()
        if (importMapPadding > 0)
            uassetWriter.write(importMapPadding)
        if (this.info.importCount !== this.nameMap.length)
            throw new ParserException(
                `Invalid import count, summary says ${this.info.importCount} imports but import map is ${this.importMap.length} entries long`, uassetWriter)
        this.importMap.forEach((it) => it.serialize(uassetWriter))

        const exportMapPadding = this.info.exportOffset - uassetWriter.pos()
        if (exportMapPadding > 0)
            uassetWriter.write(exportMapPadding)
        if (this.info.exportCount !== this.exportMap.length)
            throw new ParserException(
                `Invalid export count, summary says ${this.info.exportCount} exports but export map is ${this.exportMap.length} entries long`, uassetWriter)
        this.exportMap.forEach((it) => it.serialize(uassetWriter))

        ubulkOutputStream?.destroy()
    }

    /* DON'T USE THIS */
    writer(outputStream: WritableStreamBuffer) {
        const obj = new FAssetArchiveWriter(outputStream)
        obj.nameMap = this.nameMap
        obj.importMap = this.importMap
        obj.exportMap = this.exportMap
        return obj
    }
}

class ResolvedExportObject extends ResolvedObject {
    public export: FObjectExport

    public constructor(exportIndex: number, pkg: PakPackage) {
        super(pkg, exportIndex)
        this.export = pkg.exportMap[exportIndex]
    }

    public get name(): FName {
        return this.export.objectName
    }

    public getOuter(): ResolvedObject {
        return this.pkg.findObjectMinimal(this.export.outerIndex) || new ResolvedLoadedObject(this.pkg)
    }

    public getClazz(): ResolvedObject {
        return this.pkg.findObjectMinimal(this.export.classIndex)
    }

    public getSuper(): ResolvedObject {
        return this.pkg.findObjectMinimal(this.export.superIndex)
    }

    public getObject(): Lazy<UObject> {
        return this.export.exportObject
    }
}

/** Fallback if we cannot resolve the export in another package */
class ResolvedImportObject extends ResolvedObject {
    public _import: FObjectImport

    public constructor(_import: FObjectImport, pkg: PakPackage) {
        super(pkg)
        this._import = _import
    }

    public get name(): FName {
        return this._import.objectName
    }

    public getOuter(): ResolvedObject {
        return this.pkg.findObjectMinimal(this._import.outerIndex)
    }

    public getClazz(): ResolvedObject {
        return new ResolvedLoadedObject(new UScriptStruct(this._import.className))
    }

    public getObject(): Lazy<UObject> {
        return new Lazy<UObject>(() => {
            const n = this._import.className.text
            const _n = this._import.objectName
            if (n === "Class" || n === "ScripStruct")
                return this.pkg.provider?.mappingsProvider?.getStruct(_n)
            if (n === "Enum") {
                const enumValues = this.pkg.provider?.mappingsProvider?.getEnum(_n)
                if (enumValues != null) {
                    const enm = new UEnum()
                    enm.name = _n.text
                    enm.names = new Array(enumValues.length)
                    for (let i = 0; i < enumValues.length; ++i) {
                        enm.names[i] = new Pair<FName, number>(FName.dummy(`${_n}::${enumValues[i]}`), i)
                    }
                    return enm
                } else return null
            }
        })
    }
}