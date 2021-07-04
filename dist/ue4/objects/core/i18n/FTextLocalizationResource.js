"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FTextKey = exports.FTextLocalizationResourceString = exports.FTextLocalizationResource = void 0;
const Guid_1 = require("../misc/Guid");
const FArchive_1 = require("../../../reader/FArchive");
const Exceptions_1 = require("../../../../exceptions/Exceptions");
const collection_1 = __importDefault(require("@discordjs/collection"));
/**
 * FTextLocalizationResource
 */
class FTextLocalizationResource {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * locResMagic
         * @type {FGuid}
         * @public
         */
        this.locResMagic = new Guid_1.FGuid(0x7574140E, 0xFC034A67, 0x9D90154A, 0x1B7F37C3);
        /**
         * indexNone
         * @type {number}
         * @public
         */
        this.indexNone = -1;
        const magic = new Guid_1.FGuid(Ar);
        if (!magic.equals(this.locResMagic))
            throw new Exceptions_1.ParserException("Wrong locres guid", Ar);
        this.version = Ar.readUInt8();
        this.strArrayOffset = Number(Ar.readInt64());
        if (this.strArrayOffset === this.indexNone)
            throw new Exceptions_1.ParserException("No offset found", Ar);
        // Only works for version 'optimized'
        const cOffset = Ar.pos;
        Ar.pos = this.strArrayOffset;
        const localizedStrings = Ar.readArray(() => new FTextLocalizationResourceString(Ar));
        Ar.pos = cOffset;
        Ar.readUInt32(); // entryCount
        const nameSpaceCount = Ar.readUInt32();
        this.stringData = new collection_1.default();
        for (let i = 0; i < nameSpaceCount; ++i) {
            const nameSpace = new FTextKey(Ar);
            const keyCount = Ar.readUInt32();
            const strings = new collection_1.default();
            for (let x = 0; x < keyCount; ++x) {
                const textKey = new FTextKey(Ar);
                Ar.readUInt32(); // source hash
                const stringIndex = Ar.readInt32();
                if (stringIndex > 0 && stringIndex < localizedStrings.length) {
                    strings.set(textKey.text, localizedStrings[stringIndex].data);
                }
            }
            this.stringData.set(nameSpace.text, strings);
        }
    }
}
exports.FTextLocalizationResource = FTextLocalizationResource;
/**
 * FTextLocalizationResourceString
 */
class FTextLocalizationResourceString {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.data = x.readString();
            this.refCount = x.readInt32();
        }
        else {
            this.data = x;
            this.refCount = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeString(this.data);
        Ar.writeInt32(this.refCount);
    }
}
exports.FTextLocalizationResourceString = FTextLocalizationResourceString;
/**
 * FTextKey
 */
class FTextKey {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.stringHash = x.readUInt32();
            this.text = x.readString();
        }
        else {
            this.stringHash = x;
            this.text = y;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeUInt32(this.stringHash);
        Ar.writeString(this.text);
    }
}
exports.FTextKey = FTextKey;
