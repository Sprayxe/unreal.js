import { FArchive } from "../../../reader/FArchive";
import { sprintf } from "sprintf-js";
import { Utils } from "../../../../util/Utils";
import { IStructType } from "../../../assets/objects/UScriptStruct";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

/**
 * Enumerates known GUID formats
 * @enum
 */
export enum EGuidFormats {
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
export class FGuid implements IStructType {
    /**
     * Main guid
     * @type {FGuid}
     * @public
     * @static
     */
    static mainGuid = new FGuid()

    /**
     * Holds the first component
     * @type {number}
     * @public
     */
    a: number

    /**
     * Holds the second component
     * @type {number}
     * @public
     */
    b: number

    /**
     * Holds the third component
     * @type {number}
     * @public
     */
    c: number

    /**
     * Holds the fourth component
     * @type {number}
     * @public
     */
    d: number

    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {number} a A value
     * @param {number} b B value
     * @param {number} c C value
     * @param {number} d D value
     * @constructor
     * @public
     */
    constructor(a: number, b: number, c: number, d: number)

    /**
     * Creates an instance using a hex string
     * @param {string} hexString HEX string to use
     * @constructor
     * @public
     */
    constructor(hexString: string)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        if (!params.length) {
            this.a = 0
            this.b = 0
            this.c = 0
            this.d = 0
        } else if (params.length === 4) {
            const x = (i: number) => params[i]
            this.a = x(0)
            this.b = x(1)
            this.c = x(2)
            this.d = x(3)
        } else {
            const x = params[0]
            if (x instanceof FArchive) {
                this.a = x.readUInt32()
                this.b = x.readUInt32()
                this.c = x.readUInt32()
                this.d = x.readUInt32()
            } else {
                const ar = Buffer.from(x)
                this.a = ar.readIntLE(0, 1)
                this.b = ar.readIntLE(1, 1)
                this.c = ar.readIntLE(2, 1)
                this.d = ar.readIntLE(3, 1)
            }
        }
    }

    equals(other: any) {
        if (this === other) return true
        if (!(other instanceof FGuid)) return false

        other as FGuid

        return ((this.a ^ other.a) | (this.b ^ other.b) | (this.c ^ other.c) | (this.d ^ other.d)) == 0
    }

    /**
     * Provides read-only access to the GUIDs components
     * @param {number} index The index of the component to return (0...3)
     * @returns {number} The component
     */
    get(index: number) {
        if (index === 0)
            return this.a
        else if (index === 1)
            return this.b
        else if (index === 2)
            return this.c
        else if (index === 3)
            return this.d
        else
            throw new Error(`Index ${index} out of bounds (3).`)
    }

    /**
     * Serializes a GUID from or into an archive
     * @param {FArchiveWriter} Ar The archive to serialize into
     * @returns {void}
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.a)
        Ar.writeUInt32(this.b)
        Ar.writeUInt32(this.c)
        Ar.writeUInt32(this.d)
    }

    /**
     * Invalidates the GUID
     * @returns {void}
     * @see isValid
     */
    invalidate() {
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.d = 0
    }

    /**
     * Checks whether this GUID is valid or not.
     * A GUID that has all its components set to zero is considered invalid.
     * @returns {boolean} Whether valid
     * @see invalidate
     */
    isValid() {
        return (this.a | this.b | this.c | this.d) !== 0
    }

    /**
     * Converts this GUID to its string representation using the specified format.
     * @param {EGuidFormats} format The string format to use.
     * @returns {string} The string representation.
     */
    toString(format: EGuidFormats = EGuidFormats.Digits) {
        if (format === EGuidFormats.DigitsWithHyphens) {
            return sprintf("%08X-%04X-%04X-%04X-%04X%08X",
                this.a,
                this.b >> 16,
                this.b & 0xFFFF,
                this.c >> 16,
                this.c & 0xFFFF,
                this.d
            )
        } else if (format === EGuidFormats.DigitsWithHyphensInBraces) {
            return sprintf("{%08X-%04X-%04X-%04X-%04X%08X}",
                this.a,
                this.b >> 16,
                this.b & 0xFFFF,
                this.c >> 16,
                this.c & 0xFFFF,
                this.d
            )
        } else if (format === EGuidFormats.DigitsWithHyphensInParentheses) {
            return sprintf("(%08X-%04X-%04X-%04X-%04X%08X)",
                this.a,
                this.b >> 16,
                this.b & 0xFFFF,
                this.c >> 16,
                this.c & 0xFFFF,
                this.d
            )
        } else if (format === EGuidFormats.HexValuesInBraces) {
            return sprintf("{0x%08X,0x%04X,0x%04X,{0x%02X,0x%02X,0x%02X,0x%02X,0x%02X,0x%02X,0x%02X,0x%02X}}",
                this.a,
                this.b >> 16,
                this.b & 0xFFFF,
                this.c >> 24,
                (this.c >> 16) & 0xFF,
                (this.c >> 8) & 0xFF,
                this.c & 0xFF,
                this.d >> 24,
                (this.d >> 16) & 0xFF,
                (this.d >> 8) & 0xFF,
                this.d >> 0xFF
            )
        } else if (format === EGuidFormats.UniqueObjectGuid) {
            return sprintf("%08X-%08X-%08X-%08X",
                this.a,
                this.b,
                this.c,
                this.d
            )
        } else {
            return sprintf("%08X%08X%08X%08X",
                this.a,
                this.b,
                this.c,
                this.d
            )
        }
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return this.toString(EGuidFormats.DigitsWithHyphens)
    }
}