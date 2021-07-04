import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
/**
 * Represents an UE4 FQuat
 * @implements {IStructType}
 */
export declare class FQuat implements IStructType {
    /**
     * X Value
     * @type {number}
     * @public
     */
    x: number;
    /**
     * Y Value
     * @type {number}
     * @public
     */
    y: number;
    /**
     * Z Value
     * @type {number}
     * @public
     */
    z: number;
    /**
     * W Value
     * @type {number}
     * @public
     */
    w: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using XYZW values
     * @param {number} x X value
     * @param {number} y Y value
     * @param {number} z Z value
     * @param {number} w W value
     * @constructor
     * @public
     */
    constructor(x: number, y: number, z: number, w: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
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
