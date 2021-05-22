import { Package } from "../../assets/Package";
import { FName } from "./FName";
import { PakPackage } from "../../assets/PakPackage";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { Utils } from "../../../util/Utils";
import { FGuid } from "../core/misc/Guid";
import { UObject } from "../../assets/exports/UObject";
import {
    VER_UE4_64BIT_EXPORTMAP_SERIALSIZES, VER_UE4_COOKED_ASSETS_IN_EDITOR_SUPPORT,
    VER_UE4_LOAD_FOR_EDITOR_GAME, VER_UE4_NON_OUTER_PACKAGE_IMPORT, VER_UE4_PRELOAD_DEPENDENCIES_IN_COOKED_EXPORTS,
    VER_UE4_TemplateIndex_IN_COOKED_EXPORTS
} from "../../versions/Versions";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";

export class FPackageIndex {
    index: number
    owner: Package = null

    get name(): FName {
        if (this.owner instanceof PakPackage) {
            return (this.owner as /*PakPackage*/ any).getResource().objectName
        } else if (typeof this.owner === "object") {
            return (this.owner as /*IoPackage*/ any).findObjectMinimal(this)?.getName()
        } else {
            return null
        }
    }

    constructor()
    constructor(Ar: FAssetArchive)
    constructor(index: number, owner?: Package)
    constructor(x?: any, y?: any) {
        if (x instanceof FAssetArchive) {
            this.index = x.readInt32()
            this.owner = x.owner
        } else if (typeof x === "number") {
            this.index = x
            this.owner = y
        } else {
            this.index = 0
        }
    }

    isImport() {
        return this.index < 0
    }

    isExport() {
        return this.index > 0
    }

    isNull() {
        return this.index === 0
    }

    toImport(): number {
        if (!this.isImport())
            throw new Error("Object is not an import.")
        return -this.index - 1
    }

    toExport(): number {
        if (!this.isExport())
            throw new Error("Object is not an export.")
        return this.index - 1
    }

    equals(other: any): boolean {
        if (this === other) return true
        if (!(other instanceof FPackageIndex)) return false

        other as FPackageIndex

        if (this.index !== other.index) return false
        return this.owner == other.owner;

    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.index)
    }

    hashCode(): number {
        let result = this.index
        result = 31 * result + (Utils.hash(`${this.owner}`) || 0) // actually index only
        return result
    }

    toString() {
        if (this.isImport()) {
            return `Import: ${this.toImport()}`
        } else if (this.isExport()) {
            return `Export: ${this.toExport()}`
        } else {
            return null
        }
    }

    load<T>() {
        return this.owner?.loadObject/*<T>*/(this)
    }
}

export abstract class FObjectResource {
    objectName: FName
    outerIndex: FPackageIndex
}

export class FObjectExport extends FObjectResource {
    classIndex: FPackageIndex
    superIndex: FPackageIndex
    templateIndex: FPackageIndex
    objectFlags: number
    serialSize: number
    serialOffset: number
    forcedExport: boolean
    notForClient: boolean
    notForServer: boolean
    packageGuid: FGuid
    packageFlags: number
    notAlwaysLoadedForEditorGame: boolean
    isAsset: boolean
    firstExportDependency: number
    serializationBeforeSerializationDependencies: number
    createBeforeSerializationDependencies: number
    serializationBeforeCreateDependencies: number
    createBeforeCreateDependencies: number
    exportObject: UObject

    constructor(Ar: FAssetArchive)
    constructor(
        classIndex: FPackageIndex,
        superIndex: FPackageIndex,
        templateIndex: FPackageIndex,
        outerIndex: FPackageIndex,
        objectName: FName,
        objectFlags: number,
        serialSize: number,
        serialOffset: number,
        forcedExport: boolean,
        notForClient: boolean,
        notForServer: boolean,
        packageGuid: FGuid,
        packageFlags: number,
        notAlwaysLoadedForEditorGame: boolean,
        isAsset: boolean,
        firstExportDependency: number,
        serializationBeforeSerializationDependencies: number,
        createBeforeSerializationDependencies: number,
        serializationBeforeCreateDependencies: number,
        createBeforeCreateDependencies: number
    )
    constructor(...params) {
        super()
        if (params[0] instanceof FAssetArchive) {
            const Ar = params[0]
            this.classIndex = new FPackageIndex(Ar)
            this.superIndex = new FPackageIndex(Ar)
            this.templateIndex = Ar.ver >= VER_UE4_TemplateIndex_IN_COOKED_EXPORTS ? new FPackageIndex(Ar) : new FPackageIndex()
            this.outerIndex = new FPackageIndex(Ar)
            this.objectName = Ar.readFName()
            this.objectFlags = Ar.readUInt32()

            if (Ar.ver < VER_UE4_64BIT_EXPORTMAP_SERIALSIZES) {
                this.serialSize = Ar.readInt32()
                this.serialOffset = Ar.readInt32()
            } else {
                this.serialSize = Number(Ar.readInt64())
                this.serialOffset = Number(Ar.readInt64())
            }

            this.forcedExport = Ar.readBoolean()
            this.notForClient = Ar.readBoolean()
            this.notForServer = Ar.readBoolean()
            this.packageGuid = new FGuid(Ar)
            this.packageFlags = Ar.readUInt32()
            this.notAlwaysLoadedForEditorGame = Ar.ver >= VER_UE4_LOAD_FOR_EDITOR_GAME ? Ar.readBoolean() : true
            this.isAsset = Ar.ver >= VER_UE4_COOKED_ASSETS_IN_EDITOR_SUPPORT ? Ar.readBoolean() : false

            if (Ar.ver >= VER_UE4_PRELOAD_DEPENDENCIES_IN_COOKED_EXPORTS) {
                this.firstExportDependency = Ar.readInt32()
                this.serializationBeforeSerializationDependencies = Ar.readInt32()
                this.createBeforeSerializationDependencies = Ar.readInt32()
                this.serializationBeforeCreateDependencies = Ar.readInt32()
                this.createBeforeCreateDependencies = Ar.readInt32()
            } else {
                this.firstExportDependency = -1
                this.serializationBeforeSerializationDependencies = 0
                this.createBeforeSerializationDependencies = 0
                this.serializationBeforeCreateDependencies = 0
                this.createBeforeCreateDependencies = 0
            }
        } else {
            this.classIndex = params[0]
            this.superIndex = params[1]
            this.templateIndex = params[2]
            this.outerIndex = params[3]
            this.objectName = params[4]
            this.objectFlags = params[5]
            this.serialSize = params[6]
            this.serialOffset = params[7]
            this.forcedExport = params[8]
            this.notForClient = params[9]
            this.notForServer = params[10]
            this.packageGuid = params[11]
            this.packageFlags = params[12]
            this.notAlwaysLoadedForEditorGame = params[13]
            this.isAsset = params[14]
            this.firstExportDependency = params[15]
            this.serializationBeforeSerializationDependencies = params[16]
            this.createBeforeSerializationDependencies = params[17]
            this.serializationBeforeCreateDependencies = params[18]
            this.createBeforeCreateDependencies = params[19]
        }
    }

    toString() {
        return this.objectName.text
    }

    serialize(Ar: FAssetArchiveWriter) {
        this.classIndex.serialize(Ar)
        this.superIndex.serialize(Ar)
        if (Ar.ver >= VER_UE4_TemplateIndex_IN_COOKED_EXPORTS) this.templateIndex.serialize(Ar)
        this.outerIndex.serialize(Ar)
        Ar.writeFName(this.objectName)
        Ar.writeUInt32(this.objectFlags)

        if (Ar.ver < VER_UE4_64BIT_EXPORTMAP_SERIALSIZES) {
            Ar.writeInt32(this.serialSize)
            Ar.writeInt32(this.serialOffset)
        } else {
            Ar.writeInt64(this.serialSize)
            Ar.writeInt64(this.serialOffset)
        }

        Ar.writeBoolean(this.forcedExport)
        Ar.writeBoolean(this.notForClient)
        Ar.writeBoolean(this.notForServer)
        this.packageGuid.serialize(Ar)
        Ar.writeUInt32(this.packageFlags)
        if (Ar.ver >= VER_UE4_LOAD_FOR_EDITOR_GAME) Ar.writeBoolean(this.notAlwaysLoadedForEditorGame)
        if (Ar.ver >= VER_UE4_COOKED_ASSETS_IN_EDITOR_SUPPORT) Ar.writeBoolean(this.isAsset)

        if (Ar.ver >= VER_UE4_PRELOAD_DEPENDENCIES_IN_COOKED_EXPORTS) {
            Ar.writeInt32(this.firstExportDependency)
            Ar.writeInt32(this.serializationBeforeSerializationDependencies)
            Ar.writeInt32(this.createBeforeSerializationDependencies)
            Ar.writeInt32(this.serializationBeforeCreateDependencies)
            Ar.writeInt32(this.createBeforeCreateDependencies)
        }
    }
}

export class FObjectImport extends FObjectResource {
    classPackage: FName
    className: FName

    constructor(Ar: FAssetArchive)
    constructor(classPackage: FName, className: FName, outerIndex: FPackageIndex, objectName: FName)
    constructor(...params) {
        super()
        if (params[0] instanceof FAssetArchive) {
            const Ar = params[0]
            this.classPackage = Ar.readFName()
            this.className = Ar.readFName()
            this.outerIndex = new FPackageIndex(Ar)
            this.objectName = Ar.readFName()
            if (Ar.ver >= VER_UE4_NON_OUTER_PACKAGE_IMPORT && !Ar.isFilterEditorOnly) {
                const packageName = Ar.readFName()
            }
        } else {
            this.classPackage = params[0]
            this.className = params[1]
            this.outerIndex = params[2]
            this.objectName = params[3]
        }
    }

    serialize(Ar: any) {
        Ar.writeFName(this.classPackage)
        Ar.writeFName(this.className)
        this.outerIndex.serialize(Ar)
        Ar.writeFName(this.objectName)
    }

    toString() {
        return this.objectName.text
    }
}