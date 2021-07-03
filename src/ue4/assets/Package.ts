import { FileProvider } from "../../fileprovider/FileProvider";
import { Ue4Version } from "../versions/Game";
import { FPackageIndex } from "../objects/uobject/ObjectResource";
import { UObject } from "./exports/UObject";
import { UStruct } from "./exports/UStruct";
import { UScriptStruct } from "./exports/UScriptStruct";
import { Locres } from "../locres/Locres";
import { Lazy } from "../../util/Lazy";

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
     * @type {Ue4Version}
     * @public
     */
    game: Ue4Version = this.provider?.game || Ue4Version.GAME_UE4_LATEST

    /**
     * Creates an instnace
     * @param {string} fileName Name of file
     * @param {FileProvider} provider File provider
     * @param {Ue4Version} game Game which is used
     * @constructor
     * @protected
     */
    protected constructor(fileName: string, provider: FileProvider, game: Ue4Version) {
        super()
        this.fileName = fileName
        this.provider = provider
        this.game = game
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
        while (current) {
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
