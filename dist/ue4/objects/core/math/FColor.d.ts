import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";
/**
 * Implements a linear color
 * @implements {IStructType}
 */
export declare class FLinearColor implements IStructType {
    /**
     * Red
     * @type {number}
     * @public
     */
    r: number;
    /**
     * Green
     * @type {number}
     * @public
     */
    g: number;
    /**
     * Blue
     * @type {number}
     * @public
     */
    b: number;
    /**
     * Alpha
     * @type {number}
     * @public
     */
    a: number;
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
     * Creates an instance using rgba values
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     * @param {number} a Alpha
     * @constructor
     * @public
     */
    constructor(r: number, g: number, b: number, a: number);
    /**
     * Quantizes the linear color and returns the result as a FColor. This bypasses the SRGB conversion
     * @returns {FColor} Quantitized instance
     * @public
     */
    quantize(): FColor;
    /**
     * Quantizes the linear color with rounding and returns the result as a FColor. This bypasses the SRGB conversion
     * @returns {FColor} Quantitized (round) instance
     * @public
     */
    quantizeRound(): FColor;
    /**
     * Quantizes the linear color and returns the result as a FColor with optional sRGB conversion and quality as goal
     * @returns {FColor} Converted instance
     * @public
     */
    toFColor(srgb: boolean): FColor;
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
/**
 * Stores a color with 8 bits of precision per channel.
 * Note: Linear color values should always be converted to gamma space before stored in an FColor, as 8 bits of precision is not enough to store linear space colors!
 * This can be done with <FLinearColor>.toFColor(true)
 * @implements {IStructType}
 */
export declare class FColor implements IStructType {
    /**
     * Red
     * @type {number}
     * @public
     */
    r: number;
    /**
     * Green
     * @type {number}
     * @public
     */
    g: number;
    /**
     * Blue
     * @type {number}
     * @public
     */
    b: number;
    /**
     * Alpha
     * @type {number}
     * @public
     */
    a: number;
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
     * Creates an instance using rgba values
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     * @param {number} a Alpha
     * @constructor
     * @public
     */
    constructor(r: number, g: number, b: number, a: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Converts this color value to a hexadecimal string
     * The format of the string is RRGGBBAA
     * @returns {string} Hexadecimal string
     * @public
     */
    toHex(): string;
    /**
     * Converts this color value to a string
     * @returns {string} The string representation
     * @public
     */
    toString(): string;
    /**
     * Gets the color in a packed int32 format packed in the order ARGB
     * @returns {number} ARGB
     * @public
     */
    toPackedARGB(): number;
    /**
     * Gets the color in a packed int32 format packed in the order ABGR
     * @returns {number} ABGR
     * @public
     */
    toPackedABGR(): number;
    /**
     * Gets the color in a packed int32 format packed in the order RGBA
     * @returns {number} RGBA
     * @public
     */
    toPackedRGBA(): number;
    /**
     * Gets the color in a packed int32 format packed in the order BGRA
     * @returns {number} BGRA
     * @public
     */
    toPackedBGRA(): number;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
}
