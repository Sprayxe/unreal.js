import { UScriptStruct } from "./exports/UScriptStruct";
import { UObject } from "./exports/UObject";
import { UStruct } from "./exports/UStruct";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FPackageIndex } from "../objects/uobject/ObjectResource";
import { Locres } from "../locres/Locres";
import { Lazy } from "../../util/Lazy";
import { VersionContainer } from "../versions/VersionContainer";
import { FName } from "../objects/uobject/FName";

/**
 * UE4 Package
 * @abstract
 * @extends {UObject}
 */
export abstract class Package extends UObject {
    /**
     * Name of package file
     * @type {string}
     * @public
     */
    fileName: string

    /**
     * File provider
     * @type {FileProvider}
     * @public
     */
    provider?: FileProvider = null

    /**
     * Game which is used
     * @type {VersionContainer}
     * @public
     */
    versions: VersionContainer = this.provider?.versions || VersionContainer.DEFAULT

    /**
     * Creates an instnace
     * @param {string} fileName Name of file
     * @param {FileProvider} provider File provider
     * @param {VersionContainer} versions Game which is used
     * @constructor
     * @protected
     */
    protected constructor(fileName: string, provider: FileProvider, versions: VersionContainer) {
        super()
        this.fileName = fileName
        this.provider = provider
        this.versions = versions
    }

    /**
     * Stores lazy exports
     * @type {Array<Lazy<UObject>>}
     * @public
     */
    abstract exportsLazy: Lazy<UObject>[]

    /**
     * Returns exports
     * @type {Array<UObject>}
     * @public
     */
    get exports(): UObject[] {
        return this.exportsLazy.map(it => it.value)
    }

    /**
     * Package flags
     * @type {number}
     * @public
     */
    packageFlags = 0

    /**
     * Constructs an export from UStruct
     * @param {UStruct} struct Struct to use
     * @returns {UObject} Constructed export
     * @protected
     */
    protected static constructExport(struct: UStruct): UObject {
        let current = struct
        while (current != null) {
            const c = (current as UScriptStruct)?.structClass
            if (c) {
                const nc = new c.constructor() as UObject
                nc.clazz = struct
                return nc
            }
            current = current.superStruct?.value
        }
        const u = new UObject()
        u.clazz = struct
        return u
    }

    /**
     * Gets an export of specific type
     * @param {Function} type The class object which is either UObject or extends it
     * @returns {any} the first export of the given type
     * @throws {TypeError} if there is no export of the given type
     * @example getExportOfType(CharacterAbilityUIData)
     * @public
     */
    getExportOfType(type: Function) {
        const obj = this.getExportsOfType(type)[0]
        if (obj)
            return obj
        throw new TypeError(`Could not find export of type '${type.name}'`)
    }

    /**
     * Gets an export of specific type
     * @param {Function} type The class object which is either UObject or extends it
     * @returns {?any} the first export of the given type or null
     * @example getExportOfTypeOrNull(CharacterAbilityUIData)
     * @public
     */
    getExportOfTypeOrNull(type: Function) {
        return this.getExportsOfType(type)[0] || null
    }

    /**
     * Gets an exports of specific type
     * @param {Function} type The class object which is either UObject or extends it
     * @returns {any[]} the first export of the given type or null
     * @example getExportsOfType(CharacterAbilityUIData)
     * @public
     */
    getExportsOfType(type: Function) {
        return this.exports.filter(e => e instanceof type)
    }

    /**
     * Finds an object by index
     * @param {FPackageIndex} index Index to find
     * @returns {?any} Object or null
     * @abstract
     * @public
     */
    abstract findObject<T>(index: FPackageIndex): Lazy<T>

    /**
     * Loads an object by index
     * @param {FPackageIndex} index Index to find
     * @returns {?any} Object or null
     * @public
     */
    loadObject<T>(index: FPackageIndex) {
        return this.findObject<T>(index)?.value
    }

    /**
     * Finds an object by name
     * @param {string} objectName Name of object
     * @param {?string} className Class name of object
     * @returns {?UObject} Object or null
     * @abstract
     * @public
     */
    abstract findObjectByName(objectName: string, className?: string): Lazy<UObject>

    abstract findObjectMinimal(index?: FPackageIndex): ResolvedObject | null

    /**
     * Turns this package to json
     * @param {?Locres} locres Locres to use
     * @returns {Array<IJson>}
     * @public
     * @abstract
     */
    abstract toJson(locres?: Locres): IJson[]
}

/**
 * Represents a json result of a package
 */
export interface IJson {
    type: string,
    name: string,
    properties: any
}


/**
 * Resolved Object
 */
export abstract class ResolvedObject {
    public pkg: Package
    public exportIndex: number

    protected constructor(pkg: Package, exportIndex: number = -1) {
        this.pkg = pkg
        this.exportIndex = exportIndex
    }

    public abstract get name(): FName

    public getOuter(): ResolvedObject {
        return null
    }

    public getClazz(): ResolvedObject {
        return null
    }

    public getSuper(): ResolvedObject {
        return null
    }

    public getObject(): Lazy<UObject> {
        return null
    }

    public getFullName0(includePackageName: boolean = true, includeClassPackage: boolean = false): string {
        return this.getFullName1(includePackageName, "", includeClassPackage)
    }

    public getFullName1(includePackageName: boolean, resultString: string, includeClassPackage: boolean): string {
        if (includeClassPackage)
            resultString += this.getClazz()?.getPathName0()
        else resultString += this.getClazz()?.name
        resultString += " "
        return this.getPathName1(includePackageName, resultString)
    }

    public getPathName0(includePackageName: boolean = true): string {
        return this.getPathName1(includePackageName, "")
    }

    public getPathName1(includePackageName: boolean, resultString: string): string {
        const objOuter = this.getOuter()
        if (objOuter != null) {
            const objOuterOuter = objOuter.getOuter()
            if (objOuterOuter != null || includePackageName) {
                resultString = objOuter.getPathName1(includePackageName, resultString)
                // SUBOBJECT_DELIMITER_CHAR is used to indicate that this object's outer is not a UPackage
                resultString += objOuterOuter != null && objOuterOuter.getOuter() == null ? ":" : "."
            }
        }
        return resultString + this.name
    }
}

export class ResolvedLoadedObject extends ResolvedObject {
    public obj: UObject

    public constructor(obj: UObject) {
        super(obj instanceof Package ? obj : obj.owner)
        this.obj = obj
    }

    public get name(): FName {
        return FName.dummy(this.obj.name)
    }

    public getOuter(): ResolvedObject {
        const it = this.obj.outer
        return it != null ? new ResolvedLoadedObject(it) : null
    }

    public getClazz(): ResolvedObject {
        const it = this.obj.clazz
        return it != null ? new ResolvedLoadedObject(it) : null
    }

    public getObject(): Lazy<UObject> {
        return new Lazy<UObject>(() => this.obj)
    }
}
