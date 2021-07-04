"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UScriptArray = void 0;
const FPropertyTag_1 = require("./FPropertyTag");
const FAssetArchive_1 = require("../reader/FAssetArchive");
const FProperty_1 = require("./FProperty");
/**
 * Script Array
 */
class UScriptArray {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        /**
         * Inner tag of this array
         * @type {?FPropertyTag}
         * @public
         */
        this.innerTag = null;
        if (x instanceof FAssetArchive_1.FAssetArchive) {
            const elementCount = x.readInt32();
            const innerType = y.innerType;
            const type = innerType.type.text;
            if (!x.useUnversionedPropertySerialization && (type === "StructProperty" || type === "ArrayProperty")) {
                this.innerTag = new FPropertyTag_1.FPropertyTag(x, false);
            }
            this.contents = new Array(elementCount);
            for (let i = 0; i < elementCount; ++i) {
                const content = FProperty_1.FProperty.readPropertyValue(x, this.innerTag?.typeData || innerType, FProperty_1.ReadType.ARRAY);
                if (content)
                    this.contents[i] = content;
                else
                    console.warn(`Failed to read array content of type ${innerType} at ${x.pos}, index ${i}`);
            }
        }
        else {
            this.innerTag = x;
            this.contents = y;
        }
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt32(this.contents.length);
        this.innerTag?.serialize(Ar, false);
        this.contents.forEach((it) => {
            FProperty_1.FProperty.writePropertyValue(Ar, it, FProperty_1.ReadType.ARRAY);
        });
    }
    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString() {
        return `UScriptArray{size=${this.contents.length}}`;
    }
}
exports.UScriptArray = UScriptArray;
