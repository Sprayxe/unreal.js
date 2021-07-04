"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const Game_1 = require("../versions/Game");
const UObject_1 = require("./exports/UObject");
/**
 * UE4 Package
 * @abstract
 * @extends {UObject}
 */
class Package extends UObject_1.UObject {
    /**
     * Creates an instnace
     * @param {string} fileName Name of file
     * @param {FileProvider} provider File provider
     * @param {Ue4Version} game Game which is used
     * @constructor
     * @protected
     */
    constructor(fileName, provider, game) {
        super();
        /**
         * File provider
         * @type {FileProvider}
         * @public
         */
        this.provider = null;
        /**
         * Game which is used
         * @type {Ue4Version}
         * @public
         */
        this.game = this.provider?.game || Game_1.Ue4Version.GAME_UE4_LATEST;
        /**
         * Package flags
         * @type {number}
         * @public
         */
        this.packageFlags = 0;
        this.fileName = fileName;
        this.provider = provider;
        this.game = game;
    }
    /**
     * Returns exports
     * @type {Array<UObject>}
     * @public
     */
    get exports() {
        return this.exportsLazy.map(it => it.value);
    }
    /**
     * Constructs an export from UStruct
     * @param {UStruct} struct Struct to use
     * @returns {UObject} Constructed export
     * @protected
     */
    static constructExport(struct) {
        let current = struct;
        while (current) {
            const c = current?.structClass;
            if (c) {
                const nc = new c.constructor();
                nc.clazz = struct;
                return nc;
            }
            current = current.superStruct?.value;
        }
        const u = new UObject_1.UObject();
        u.clazz = struct;
        return u;
    }
    /**
     * Gets an export of specific type
     * @param {Function} type The class object which is either UObject or extends it
     * @returns {any} the first export of the given type
     * @throws {TypeError} if there is no export of the given type
     * @example getExportOfType(CharacterAbilityUIData)
     * @public
     */
    getExportOfType(type) {
        const obj = this.getExportsOfType(type)[0];
        if (obj)
            return obj;
        throw new TypeError(`Could not find export of type '${type.name}'`);
    }
    /**
     * Gets an export of specific type
     * @param {Function} type The class object which is either UObject or extends it
     * @returns {?any} the first export of the given type or null
     * @example getExportOfTypeOrNull(CharacterAbilityUIData)
     * @public
     */
    getExportOfTypeOrNull(type) {
        return this.getExportsOfType(type)[0] || null;
    }
    /**
     * Gets an exports of specific type
     * @param {Function} type The class object which is either UObject or extends it
     * @returns {any[]} the first export of the given type or null
     * @example getExportsOfType(CharacterAbilityUIData)
     * @public
     */
    getExportsOfType(type) {
        return this.exports.filter(e => e instanceof type);
    }
    /**
     * Loads an object by index
     * @param {FPackageIndex} index Index to find
     * @returns {?any} Object or null
     * @public
     */
    loadObject(index) {
        return this.findObject(index)?.value;
    }
}
exports.Package = Package;
