import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";
/**
 * FPerPlatformInt
 * @implements {IStructType}
 */
export declare class FPerPlatformInt implements IStructType {
    /**
     * cooked
     * @type {boolean}
     * @public
     */
    cooked: boolean;
    /**
     * value
     * @type {number}
     * @public
     */
    value: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {boolean} cooked Whether cooked
     * @param {number} value Value to use
     * @constructor
     * @public
     */
    constructor(cooked: boolean, value: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * FPerPlatformFloat
 * @implements {IStructType}
 */
export declare class FPerPlatformFloat implements IStructType {
    /**
     * cooked
     * @type {boolean}
     * @public
     */
    cooked: boolean;
    /**
     * value
     * @type {number}
     * @public
     */
    value: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {boolean} cooked Whether cooked
     * @param {number} value Value to use
     * @constructor
     * @public
     */
    constructor(cooked: boolean, value: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
/**
 * FPerPlatformBool
 * @implements {IStructType}
 */
export declare class FPerPlatformBool implements IStructType {
    /**
     * cooked
     * @type {boolean}
     * @public
     */
    cooked: boolean;
    /**
     * value
     * @type {boolean}
     * @public
     */
    value: boolean;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {boolean} cooked Whether cooked
     * @param {boolean} value Value to use
     * @constructor
     * @public
     */
    constructor(cooked: boolean, value: boolean);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
