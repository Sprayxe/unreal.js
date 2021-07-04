import { FileProvider } from "../../fileprovider/FileProvider";
import { Ue4Version } from "../versions/Game";
import { FPackageIndex } from "../objects/uobject/ObjectResource";
import { UObject } from "./exports/UObject";
import { UStruct } from "./exports/UStruct";
import { Locres } from "../locres/Locres";
import { Lazy } from "../../util/Lazy";
/**
 * UE4 Package
 * @abstract
 * @extends {UObject}
 */
export declare abstract class Package extends UObject {
    /**
     * Name of package file
     * @type {string}
     * @public
     */
    fileName: string;
    /**
     * File provider
     * @type {FileProvider}
     * @public
     */
    provider?: FileProvider;
    /**
     * Game which is used
     * @type {Ue4Version}
     * @public
     */
    game: Ue4Version;
    /**
     * Creates an instnace
     * @param {string} fileName Name of file
     * @param {FileProvider} provider File provider
     * @param {Ue4Version} game Game which is used
     * @constructor
     * @protected
     */
    protected constructor(fileName: string, provider: FileProvider, game: Ue4Version);
    /**
     * Stores lazy exports
     * @type {Array<Lazy<UObject>>}
     * @public
     */
    abstract exportsLazy: Lazy<UObject>[];
    /**
     * Returns exports
     * @type {Array<UObject>}
     * @public
     */
    get exports(): UObject[];
    /**
     * Package flags
     * @type {number}
     * @public
     */
    packageFlags: number;
    /**
     * Constructs an export from UStruct
     * @param {UStruct} struct Struct to use
     * @returns {UObject} Constructed export
     * @protected
     */
    protected static constructExport(struct: UStruct): UObject;
    /**
     * Gets an export of specific type
     * @param {Function} type The class object which is either UObject or extends it
     * @returns {any} the first export of the given type
     * @throws {TypeError} if there is no export of the given type
     * @example getExportOfType(CharacterAbilityUIData)
     * @public
     */
    getExportOfType(type: Function): UObject;
    /**
     * Gets an export of specific type
     * @param {Function} type The class object which is either UObject or extends it
     * @returns {?any} the first export of the given type or null
     * @example getExportOfTypeOrNull(CharacterAbilityUIData)
     * @public
     */
    getExportOfTypeOrNull(type: Function): UObject;
    /**
     * Gets an exports of specific type
     * @param {Function} type The class object which is either UObject or extends it
     * @returns {any[]} the first export of the given type or null
     * @example getExportsOfType(CharacterAbilityUIData)
     * @public
     */
    getExportsOfType(type: Function): UObject[];
    /**
     * Finds an object by index
     * @param {FPackageIndex} index Index to find
     * @returns {?any} Object or null
     * @abstract
     * @public
     */
    abstract findObject<T>(index: FPackageIndex): Lazy<T>;
    /**
     * Loads an object by index
     * @param {FPackageIndex} index Index to find
     * @returns {?any} Object or null
     * @public
     */
    loadObject<T>(index: FPackageIndex): T;
    /**
     * Finds an object by name
     * @param {string} objectName Name of object
     * @param {?string} className Class name of object
     * @returns {?UObject} Object or null
     * @abstract
     * @public
     */
    abstract findObjectByName(objectName: string, className?: string): Lazy<UObject>;
    /**
     * Turns this package to json
     * @param {?Locres} locres Locres to use
     * @returns {Array<IJson>}
     * @public
     * @abstract
     */
    abstract toJson(locres?: Locres): IJson[];
}
/**
 * Represents a json result of a package
 */
export interface IJson {
    type: string;
    name: string;
    properties: any;
}
