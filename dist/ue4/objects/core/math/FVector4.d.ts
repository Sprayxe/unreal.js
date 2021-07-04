import { FVector } from "./FVector";
import { FVector2D } from "./FVector2D";
import { FArchive } from "../../../reader/FArchive";
import { FLinearColor } from "./FColor";
import { IStructType } from "../../../assets/objects/UScriptStruct";
export declare class FVector4 implements IStructType {
    /**
     * The vector's X-component
     * @type {number}
     * @public
     */
    x: number;
    /**
     * The vector's Y-component
     * @type {number}
     * @public
     */
    y: number;
    /**
     * The vector's Z-component
     * @type {number}
     * @public
     */
    z: number;
    /**
     * The vector's W-component
     * @type {number}
     * @public
     */
    w: number;
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
     * Creates an instance using FVector and number
     * @param {FVector} vector 3D Vector to set first three components
     * @param {number} w W Coordinate
     * @constructor
     * @public
     */
    constructor(vector: FVector, w: number);
    /**
     * Creates an instance using FLinearColor
     * @param {FLinearColor} color Color used to set vector
     * @constructor
     * @public
     */
    constructor(color: FLinearColor);
    /**
     * Creates an instance using values
     * @param {number} x X Coordinate
     * @param {number} y Y Coordinate
     * @param {number} z Z Coordinate
     * @param {number} w W Coordinate
     * @constructor
     * @public
     */
    constructor(x: number, y: number, z: number, w: number);
    /**
     * Creates an instance using specified 2D vectors
     * @param {FVector2D} xy A 2D vector holding the X- and Y-components
     * @param {FVector2D} zw A 2D vector holding the Z- and W-components
     * @constructor
     * @public
     */
    constructor(xy: FVector2D, zw: FVector2D);
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
