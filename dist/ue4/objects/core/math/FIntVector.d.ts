import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
export declare class FIntVector implements IStructType {
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
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using XYZ values
     * @param {number} x X value
     * @param {number} y Y value
     * @param {number} z Z value
     * @constructor
     * @public
     */
    constructor(x: number, y: number, z: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString(): string;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
