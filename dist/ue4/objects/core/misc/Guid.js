"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FGuid = exports.EGuidFormats = void 0;
const FArchive_1 = require("../../../reader/FArchive");
const sprintf_js_1 = require("sprintf-js");
/**
 * Enumerates known GUID formats
 * @enum
 */
var EGuidFormats;
(function (EGuidFormats) {
    /**
     * 32 digits.
     *
     * For example: "00000000000000000000000000000000"
     */
    EGuidFormats["Digits"] = "Digits";
    /**
     * 32 digits separated by hyphens.
     *
     * For example: 00000000-0000-0000-0000-000000000000
     */
    EGuidFormats["DigitsWithHyphens"] = "DigitsWithHyphens";
    /**
     * 32 digits separated by hyphens and enclosed in braces.
     *
     * For example: {00000000-0000-0000-0000-000000000000}
     */
    EGuidFormats["DigitsWithHyphensInBraces"] = "DigitsWithHyphensInBraces";
    /**
     * 32 digits separated by hyphens and enclosed in parentheses.
     *
     * For example: (00000000-0000-0000-0000-000000000000)
     */
    EGuidFormats["DigitsWithHyphensInParentheses"] = "DigitsWithHyphensInParentheses";
    /**
     * Comma-separated hexadecimal values enclosed in braces.
     *
     * For example: {0x00000000,0x0000,0x0000,{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00}}
     */
    EGuidFormats["HexValuesInBraces"] = "HexValuesInBraces";
    /**
     * This format is currently used by the FUniqueObjectGuid class.
     *
     * For example: 00000000-00000000-00000000-00000000
     */
    EGuidFormats["UniqueObjectGuid"] = "UniqueObjectGuid";
    /**
     * Base64 characters with dashes and underscores instead of pluses and slashes (respectively)
     *
     * For example: AQsMCQ0PAAUKCgQEBAgADQ
     */
    EGuidFormats["Short"] = "Short";
    /**
     * Base-36 encoded, compatible with case-insensitive OS file systems (such as Windows).
     *
     * For example: 1DPF6ARFCM4XH5RMWPU8TGR0J
     */
    EGuidFormats["Base36Encoded"] = "Base36Encoded";
})(EGuidFormats = exports.EGuidFormats || (exports.EGuidFormats = {}));
/**
 * FGuid
 * @implements {IStructType}
 */
class FGuid {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        if (!params.length) {
            this.a = 0;
            this.b = 0;
            this.c = 0;
            this.d = 0;
        }
        else if (params.length === 4) {
            const x = (i) => params[i];
            this.a = x(0);
            this.b = x(1);
            this.c = x(2);
            this.d = x(3);
        }
        else {
            const x = params[0];
            if (x instanceof FArchive_1.FArchive) {
                this.a = x.readUInt32();
                this.b = x.readUInt32();
                this.c = x.readUInt32();
                this.d = x.readUInt32();
            }
            else {
                const ar = Buffer.from(x);
                this.a = ar.readIntLE(0, 1);
                this.b = ar.readIntLE(1, 1);
                this.c = ar.readIntLE(2, 1);
                this.d = ar.readIntLE(3, 1);
            }
        }
    }
    equals(other) {
        if (this === other)
            return true;
        if (!(other instanceof FGuid))
            return false;
        other;
        return ((this.a ^ other.a) | (this.b ^ other.b) | (this.c ^ other.c) | (this.d ^ other.d)) == 0;
    }
    /**
     * Provides read-only access to the GUIDs components
     * @param {number} index The index of the component to return (0...3)
     * @returns {number} The component
     */
    get(index) {
        if (index === 0)
            return this.a;
        else if (index === 1)
            return this.b;
        else if (index === 2)
            return this.c;
        else if (index === 3)
            return this.d;
        else
            throw new Error(`Index ${index} out of bounds (3).`);
    }
    /**
     * Serializes a GUID from or into an archive
     * @param {FArchiveWriter} Ar The archive to serialize into
     * @returns {void}
     */
    serialize(Ar) {
        Ar.writeUInt32(this.a);
        Ar.writeUInt32(this.b);
        Ar.writeUInt32(this.c);
        Ar.writeUInt32(this.d);
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
        this.d = 0;
    }
    /**
     * Checks whether this GUID is valid or not.
     * A GUID that has all its components set to zero is considered invalid.
     * @returns {boolean} Whether valid
     * @see invalidate
     */
    isValid() {
        return (this.a | this.b | this.c | this.d) !== 0;
    }
    /**
     * Converts this GUID to its string representation using the specified format.
     * @param {EGuidFormats} format The string format to use.
     * @returns {string} The string representation.
     */
    toString(format = EGuidFormats.Digits) {
        if (format === EGuidFormats.DigitsWithHyphens) {
            return sprintf_js_1.sprintf("%08X-%04X-%04X-%04X-%04X%08X", this.a, this.b >> 16, this.b & 0xFFFF, this.c >> 16, this.c & 0xFFFF, this.d);
        }
        else if (format === EGuidFormats.DigitsWithHyphensInBraces) {
            return sprintf_js_1.sprintf("{%08X-%04X-%04X-%04X-%04X%08X}", this.a, this.b >> 16, this.b & 0xFFFF, this.c >> 16, this.c & 0xFFFF, this.d);
        }
        else if (format === EGuidFormats.DigitsWithHyphensInParentheses) {
            return sprintf_js_1.sprintf("(%08X-%04X-%04X-%04X-%04X%08X)", this.a, this.b >> 16, this.b & 0xFFFF, this.c >> 16, this.c & 0xFFFF, this.d);
        }
        else if (format === EGuidFormats.HexValuesInBraces) {
            return sprintf_js_1.sprintf("{0x%08X,0x%04X,0x%04X,{0x%02X,0x%02X,0x%02X,0x%02X,0x%02X,0x%02X,0x%02X,0x%02X}}", this.a, this.b >> 16, this.b & 0xFFFF, this.c >> 24, (this.c >> 16) & 0xFF, (this.c >> 8) & 0xFF, this.c & 0xFF, this.d >> 24, (this.d >> 16) & 0xFF, (this.d >> 8) & 0xFF, this.d >> 0xFF);
        }
        else if (format === EGuidFormats.UniqueObjectGuid) {
            return sprintf_js_1.sprintf("%08X-%08X-%08X-%08X", this.a, this.b, this.c, this.d);
        }
        else {
            return sprintf_js_1.sprintf("%08X%08X%08X%08X", this.a, this.b, this.c, this.d);
        }
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return this.toString(EGuidFormats.DigitsWithHyphens);
    }
}
exports.FGuid = FGuid;
/**
 * Main guid
 * @type {FGuid}
 * @public
 * @static
 */
FGuid.mainGuid = new FGuid();
