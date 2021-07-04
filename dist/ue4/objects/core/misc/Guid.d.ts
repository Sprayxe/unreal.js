import { FArchive } from "../../../reader/FArchive";
import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
/**
 * Enumerates known GUID formats
 * @enum
 */
export declare enum EGuidFormats {
    /**
     * 32 digits.
     *
     * For example: "00000000000000000000000000000000"
     */
    Digits = "Digits",
    /**
     * 32 digits separated by hyphens.
     *
     * For example: 00000000-0000-0000-0000-000000000000
     */
    DigitsWithHyphens = "DigitsWithHyphens",
    /**
     * 32 digits separated by hyphens and enclosed in braces.
     *
     * For example: {00000000-0000-0000-0000-000000000000}
     */
    DigitsWithHyphensInBraces = "DigitsWithHyphensInBraces",
    /**
     * 32 digits separated by hyphens and enclosed in parentheses.
     *
     * For example: (00000000-0000-0000-0000-000000000000)
     */
    DigitsWithHyphensInParentheses = "DigitsWithHyphensInParentheses",
    /**
     * Comma-separated hexadecimal values enclosed in braces.
     *
     * For example: {0x00000000,0x0000,0x0000,{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00}}
     */
    HexValuesInBraces = "HexValuesInBraces",
    /**
     * This format is currently used by the FUniqueObjectGuid class.
     *
     * For example: 00000000-00000000-00000000-00000000
     */
    UniqueObjectGuid = "UniqueObjectGuid",
    /**
     * Base64 characters with dashes and underscores instead of pluses and slashes (respectively)
     *
     * For example: AQsMCQ0PAAUKCgQEBAgADQ
     */
    Short = "Short",
    /**
     * Base-36 encoded, compatible with case-insensitive OS file systems (such as Windows).
     *
     * For example: 1DPF6ARFCM4XH5RMWPU8TGR0J
     */
    Base36Encoded = "Base36Encoded"
}
/**
 * FGuid
 * @implements {IStructType}
 */
export declare class FGuid implements IStructType {
    /**
     * Main guid
     * @type {FGuid}
     * @public
     * @static
     */
    static mainGuid: FGuid;
    /**
     * Holds the first component
     * @type {number}
     * @public
     */
    a: number;
    /**
     * Holds the second component
     * @type {number}
     * @public
     */
    b: number;
    /**
     * Holds the third component
     * @type {number}
     * @public
     */
    c: number;
    /**
     * Holds the fourth component
     * @type {number}
     * @public
     */
    d: number;
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {number} a A value
     * @param {number} b B value
     * @param {number} c C value
     * @param {number} d D value
     * @constructor
     * @public
     */
    constructor(a: number, b: number, c: number, d: number);
    /**
     * Creates an instance using a hex string
     * @param {string} hexString HEX string to use
     * @constructor
     * @public
     */
    constructor(hexString: string);
    equals(other: any): boolean;
    /**
     * Provides read-only access to the GUIDs components
     * @param {number} index The index of the component to return (0...3)
     * @returns {number} The component
     */
    get(index: number): number;
    /**
     * Serializes a GUID from or into an archive
     * @param {FArchiveWriter} Ar The archive to serialize into
     * @returns {void}
     */
    serialize(Ar: FArchiveWriter): void;
    /**
     * Invalidates the GUID
     * @returns {void}
     * @see isValid
     */
    invalidate(): void;
    /**
     * Checks whether this GUID is valid or not.
     * A GUID that has all its components set to zero is considered invalid.
     * @returns {boolean} Whether valid
     * @see invalidate
     */
    isValid(): boolean;
    /**
     * Converts this GUID to its string representation using the specified format.
     * @param {EGuidFormats} format The string format to use.
     * @returns {string} The string representation.
     */
    toString(format?: EGuidFormats): string;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
