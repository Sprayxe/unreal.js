/// <reference types="node" />
/// <reference types="ref-napi" />
import { TypeMappingsProvider } from "./TypeMappingsProvider";
import { FArchive } from "../../reader/FArchive";
/**
 * Type mappings provider which uses usmap
 * @extends {TypeMappingsProvider}
 */
export declare class UsmapTypeMappingsProvider extends TypeMappingsProvider {
    /**
     * File magic
     * @type {number}
     * @static
     * @readonly
     * @public
     */
    static readonly FILE_MAGIC = 12484;
    /**
     * Loads a farchive instance
     * @private
     * @readonly
     */
    private readonly load;
    /**
     * Creates an instance using a buffer
     * @param {Buffer} file
     * @constructor
     * @public
     */
    constructor(file: Buffer);
    /**
     * Creates an instnace using an farchive method
     * @param {() => FArchive} load
     * @constructor
     * @public
     */
    constructor(load: () => FArchive);
    /**
     * Reloads mappings
     * @returns {boolean} Whether if it was successful or not
     * @public
     */
    reload(): boolean;
    /**
     * Reads compressed usmap
     * @param {FArchive} Ar FArchive to use
     * @returns {Buffer}
     * @protected
     */
    protected readCompressedUsmap(Ar: FArchive): Buffer;
    /**
     * Deserializes property data
     * @param {FUsmapNameTableArchive} FArchive to use
     * @returns {PropertyType}
     * @private
     */
    private deserializePropData;
    /**
     * Parses data
     * @param {FUsmapNameTableArchive} FArchive to use
     * @returns {void}
     * @private
     */
    private parseData;
}
