"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FColor = exports.FLinearColor = void 0;
const FArchive_1 = require("../../../reader/FArchive");
const sprintf_js_1 = require("sprintf-js");
const Utils_1 = require("../../../../util/Utils");
/**
 * Implements a linear color
 * @implements {IStructType}
 */
class FLinearColor {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg1, arg2, arg3, arg4) {
        if (arg1 instanceof FArchive_1.FArchive) {
            this.r = arg1.readFloat32();
            this.g = arg1.readFloat32();
            this.b = arg1.readFloat32();
            this.a = arg1.readFloat32();
        }
        else if (arg1 != null && arg2 != null) {
            this.r = arg1;
            this.g = arg2;
            this.b = arg3;
            this.a = arg4;
        }
        else {
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
        }
    }
    /**
     * Quantizes the linear color and returns the result as a FColor. This bypasses the SRGB conversion
     * @returns {FColor} Quantitized instance
     * @public
     */
    quantize() {
        return new FColor(Utils_1.Utils.clamp(this.r * 255, 0, 255), Utils_1.Utils.clamp(this.g * 255, 0, 255), Utils_1.Utils.clamp(this.b * 255, 0, 255), Utils_1.Utils.clamp(this.a * 255, 0, 255));
    }
    /**
     * Quantizes the linear color with rounding and returns the result as a FColor. This bypasses the SRGB conversion
     * @returns {FColor} Quantitized (round) instance
     * @public
     */
    quantizeRound() {
        return new FColor(Utils_1.Utils.clamp(Math.round(this.r * 255), 0, 255), Utils_1.Utils.clamp(Math.round(this.g * 255), 0, 255), Utils_1.Utils.clamp(Math.round(this.b * 255), 0, 255), Utils_1.Utils.clamp(Math.round(this.a * 255), 0, 255));
    }
    /**
     * Quantizes the linear color and returns the result as a FColor with optional sRGB conversion and quality as goal
     * @returns {FColor} Converted instance
     * @public
     */
    toFColor(srgb) {
        let floatR = Utils_1.Utils.clamp(this.r, 0.0, 1.0);
        let floatG = Utils_1.Utils.clamp(this.g, 0.0, 1.0);
        let floatB = Utils_1.Utils.clamp(this.b, 0.0, 1.0);
        const floatA = Utils_1.Utils.clamp(this.a, 0.0, 1.0);
        if (srgb) {
            floatR = floatR <= 0.0031308 ? floatR * 12.92 : Math.pow(floatR, 1.0 / 2.4) * 1.055 - 0.055;
            floatG = floatG <= 0.0031308 ? floatG * 12.92 : Math.pow(floatG, 1.0 / 2.4) * 1.055 - 0.055;
            floatB = floatB <= 0.0031308 ? floatB * 12.92 : Math.pow(floatB, 1.0 / 2.4) * 1.055 - 0.055;
        }
        return new FColor(floatR * 255.999, floatG * 255.999, floatB * 255.999, floatA * 255.999);
    }
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return `(R=${this.r},G=${this.g},B=${this.b},A=${this.a})`;
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
        };
    }
}
exports.FLinearColor = FLinearColor;
/**
 * Stores a color with 8 bits of precision per channel.
 * Note: Linear color values should always be converted to gamma space before stored in an FColor, as 8 bits of precision is not enough to store linear space colors!
 * This can be done with <FLinearColor>.toFColor(true)
 * @implements {IStructType}
 */
class FColor {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg1, arg2, arg3, arg4) {
        if (arg1 instanceof FArchive_1.FArchive) {
            this.r = arg1.readUInt8();
            this.g = arg1.readUInt8();
            this.b = arg1.readUInt8();
            this.a = arg1.readUInt8();
        }
        else if (arg1 != null && arg2 != null) {
            this.r = arg1;
            this.g = arg2;
            this.b = arg3;
            this.a = arg4;
        }
        else {
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeUInt8(this.r);
        Ar.writeUInt8(this.g);
        Ar.writeUInt8(this.b);
        Ar.writeUInt8(this.a);
    }
    /**
     * Converts this color value to a hexadecimal string
     * The format of the string is RRGGBBAA
     * @returns {string} Hexadecimal string
     * @public
     */
    toHex() {
        return sprintf_js_1.sprintf("%02X%02X%02X%02X", this.r, this.g, this.b, this.a);
    }
    /**
     * Converts this color value to a string
     * @returns {string} The string representation
     * @public
     */
    toString() {
        return `(R=${this.r},G=${this.g},B=${this.b},A=${this.a})`;
    }
    /**
     * Gets the color in a packed int32 format packed in the order ARGB
     * @returns {number} ARGB
     * @public
     */
    toPackedARGB() {
        return (this.a << 24) | (this.r << 16) | (this.g << 8) | (this.b << 0);
    }
    /**
     * Gets the color in a packed int32 format packed in the order ABGR
     * @returns {number} ABGR
     * @public
     */
    toPackedABGR() {
        return (this.a << 24) | (this.r << 16) | (this.g << 8) | (this.b << 0);
    }
    /**
     * Gets the color in a packed int32 format packed in the order RGBA
     * @returns {number} RGBA
     * @public
     */
    toPackedRGBA() {
        return (this.r << 24) | (this.r << 16) | (this.b << 8) | (this.b << 0);
    }
    /**
     * Gets the color in a packed int32 format packed in the order BGRA
     * @returns {number} BGRA
     * @public
     */
    toPackedBGRA() {
        return (this.b << 24) | (this.r << 16) | (this.r << 8) | (this.b << 0);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
        };
    }
}
exports.FColor = FColor;
