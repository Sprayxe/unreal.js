import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * A vector in 2-D space composed of components (X, Y) with floating point precision
 * @implements {IStructType}
 */
export declare class FVector2D implements IStructType {
    /**
     * Vector's X component
     * @type {number}
     * @public
     */
    x: number;
    /**
     * Vector's Y component
     * @type {number}
     * @public
     */
    y: number;
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @constructor
     * @public
     */
    constructor(x: number, y: number);
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
     * @returns {json} Json
     * @public
     */
    toJson(): any;
}
