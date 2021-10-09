import { Package } from "../../assets/Package";
import { FName } from "./FName";
import { PakPackage } from "../../assets/PakPackage";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FGuid } from "../core/misc/Guid";
import { UObject } from "../../assets/exports/UObject";
import {
    VER_UE4_64BIT_EXPORTMAP_SERIALSIZES,
    VER_UE4_COOKED_ASSETS_IN_EDITOR_SUPPORT,
    VER_UE4_LOAD_FOR_EDITOR_GAME,
    VER_UE4_NON_OUTER_PACKAGE_IMPORT,
    VER_UE4_PRELOAD_DEPENDENCIES_IN_COOKED_EXPORTS,
    VER_UE4_TemplateIndex_IN_COOKED_EXPORTS
} from "../../versions/Versions";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";
import { IoPackage } from "../../assets/IoPackage";
import { Lazy } from "../../../util/Lazy";

/**
 * FPackageIndex
 */
export class FPackageIndex {
    /**
     * index
     * @type {number}
     * @public
     */
    index: number

    /**
     * Owner
     * @type {Package}
     * @public
     */
    owner: Package = null

    /**
     * Name
     * @type {FName}
     * @public
     */
    get name(): FName {
        let name;
        if (this.owner instanceof PakPackage) {
            name = (this.owner as PakPackage).getResource(this)?.objectName
        } else if (this.owner instanceof IoPackage) {
            const n = (this.owner as IoPackage).findObjectMinimal(this)
            name = n?.name
        }
        return name || FName.NAME_None
    }

    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive)

    /**
     * Creates instance using values
     * @param {number} index Index to use
     * @param {?Package} owner Package to use
     * @constructor
     * @public
     */
    constructor(index: number, owner?: Package)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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

    /**
     * Whether is import
     * @returns {boolean} Result
     * @public
     */
    isImport() {
        return this.index < 0
    }

    /**
     * Whether is export
     * @returns {boolean} Result
     * @public
     */
    isExport() {
        return this.index > 0
    }

    /**
     * Whether is null
     * @returns {boolean} Result
     * @public
     */
    isNull() {
        return this.index === 0
    }

    /**
     * Turns this to import
     * @returns {number} Import value
     * @public
     */
    toImport(): number {
        if (!this.isImport())
            throw new Error("Object is not an import.")
        return -this.index - 1
    }

    /**
     * Turns this to export
     * @returns {number} Export value
     * @public
     */
    toExport(): number {
        if (!this.isExport())
            throw new Error("Object is not an export.")
        return this.index - 1
    }

    /**
     * Whether equals other object
     * @param {?any} other Object to check
     * @returns {boolean} Result
     * @public
     */
    equals(other: any): boolean {
        if (this === other) return true
        if (!(other instanceof FPackageIndex)) return false

        other as FPackageIndex

        if (this.index !== other.index) return false
        return this.owner == other.owner;

    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.index)
    }

    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        if (this.isImport()) {
            return `Import: ${this.toImport()}`
        } else if (this.isExport()) {
            return `Export: ${this.toExport()}`
        } else {
            return null
        }
    }

    /**
     * Loads object (WARNING: MIGHT BE RECURSIVE, TRY TO AVOID THIS)
     * @returns {UObject} Object
     * @public
     */
    load<T extends UObject>(): T {
        return this.owner?.loadObject<T>(this)
    }
}

/**
 * FObjectResource
 * @abstract
 */
export abstract class FObjectResource {
    /**
     * objectName
     * @type {FName}
     * @public
     */
    objectName: FName

    /**
     * outerIndex
     * @type {FPackageIndex}
     * @public
     */
    outerIndex: FPackageIndex
}

/**
 * FObjectExport
 * @extends {FObjectResource}
 */
export class FObjectExport extends FObjectResource {
    /**
     * classIndex
     * @type {FPackageIndex}
     * @public
     */
    classIndex: FPackageIndex

    /**
     * superIndex
     * @type {FPackageIndex}
     * @public
     */
    superIndex: FPackageIndex

    /**
     * templateIndex
     * @type {FPackageIndex}
     * @public
     */
    templateIndex: FPackageIndex

    /**
     * objectFlags
     * @type {number}
     * @public
     */
    objectFlags: number

    /**
     * serialSize
     * @type {number}
     * @public
     */
    serialSize: number

    /**
     * serialOffset
     * @type {number}
     * @public
     */
    serialOffset: number

    /**
     * forcedExport
     * @type {boolean}
     * @public
     */
    forcedExport: boolean

    /**
     * notForClient
     * @type {boolean}
     * @public
     */
    notForClient: boolean

    /**
     * notForServer
     * @type {boolean}
     * @public
     */
    notForServer: boolean

    /**
     * packageGuid
     * @type {FGuid}
     * @public
     */
    packageGuid: FGuid

    /**
     * packageFlags
     * @type {number}
     * @public
     */
    packageFlags: number

    /**
     * notAlwaysLoadedForEditorGame
     * @type {boolean}
     * @public
     */
    notAlwaysLoadedForEditorGame: boolean

    /**
     * isAsset
     * @type {boolean}
     * @public
     */
    isAsset: boolean

    /**
     * firstExportDependency
     * @type {number}
     * @public
     */
    firstExportDependency: number

    /**
     * serializationBeforeSerializationDependencies
     * @type {number}
     * @public
     */
    serializationBeforeSerializationDependencies: number

    /**
     * createBeforeSerializationDependencies
     * @type {number}
     * @public
     */
    createBeforeSerializationDependencies: number

    /**
     * serializationBeforeCreateDependencies
     * @type {number}
     * @public
     */
    serializationBeforeCreateDependencies: number

    /**
     * createBeforeCreateDependencies
     * @type {number}
     * @public
     */
    createBeforeCreateDependencies: number

    /**
     * exportObject
     * @type {Lazy<UObject>}
     * @public
     */
    exportObject: Lazy<UObject>

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
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

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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

    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.objectName.text
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
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

/**
 * FObjectImport
 * @extends {FObjectResource}
 */
export class FObjectImport extends FObjectResource {
    /**
     * classPackage
     * @type {FName}
     * @public
     */
    classPackage: FName

    /**
     * className
     * @type {FName}
     * @public
     */
    className: FName

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive)

    /**
     * Creates an instance using values
     * @param {FName} classPackage Class package to use
     * @param {FName} className Class name to use
     * @param {FPackageIndex} outerIndex Outer index to use
     * @param {FName} objectName Object name to use
     * @constructor
     * @public
     */
    constructor(classPackage: FName, className: FName, outerIndex: FPackageIndex, objectName: FName)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeFName(this.classPackage)
        Ar.writeFName(this.className)
        this.outerIndex.serialize(Ar)
        Ar.writeFName(this.objectName)
    }

    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.objectName.text
    }
}