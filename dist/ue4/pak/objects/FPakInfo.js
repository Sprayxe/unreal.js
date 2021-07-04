"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPakInfo = void 0;
const Exceptions_1 = require("../../../exceptions/Exceptions");
const FByteArchive_1 = require("../../reader/FByteArchive");
const Guid_1 = require("../../objects/core/misc/Guid");
const FFileArchive_1 = require("../../reader/FFileArchive");
const PakVersion_1 = require("../enums/PakVersion");
const Utils_1 = require("../../../util/Utils");
// source 'https://github.com/FabianFG/CUE4Parse/blob/master/CUE4Parse/UE4/Pak/Objects/FPakInfo.cs'
/**
 * OffsetsToTry
 * @enum
 */
var OffsetsToTry;
(function (OffsetsToTry) {
    OffsetsToTry[OffsetsToTry["size"] = 61] = "size";
    // Just to be sure
    OffsetsToTry[OffsetsToTry["size8_1"] = 93] = "size8_1";
    OffsetsToTry[OffsetsToTry["size8_2"] = 125] = "size8_2";
    OffsetsToTry[OffsetsToTry["size8_3"] = 157] = "size8_3";
    OffsetsToTry[OffsetsToTry["size8"] = 189] = "size8";
    OffsetsToTry[OffsetsToTry["size8a"] = 221] = "size8a";
    OffsetsToTry[OffsetsToTry["size9"] = 222] = "size9";
    //Size10 = Size8a
    OffsetsToTry[OffsetsToTry["sizeLast"] = 223] = "sizeLast";
    OffsetsToTry[OffsetsToTry["sizeMax"] = 222] = "sizeMax";
})(OffsetsToTry || (OffsetsToTry = {}));
/**
 * Gets max amount of compression methods by offset
 * @param {OffsetsToTry} offset
 * @returns {number} Max amount of compression methods
 */
function getMaxNumCompressionMethods(offset) {
    if (offset === OffsetsToTry.size8a)
        return 5;
    if (offset === OffsetsToTry.size8)
        return 4;
    if (offset === OffsetsToTry.size8_1)
        return 1;
    if (offset === OffsetsToTry.size8_2)
        return 2;
    if (offset === OffsetsToTry.size8_3)
        return 3;
    return 4;
}
/**
 * FPakInfo
 */
class FPakInfo {
    /**
     * Creates an instance using values
     * @param {FArchive} Ar UE4 Reader to use
     * @param {OffsetsToTry} offsetToTry Offset to try
     * @constructor
     * @public
     */
    constructor(Ar, offsetToTry) {
        /**
         * indexIsFrozen
         * @type {boolean}
         * @public
         */
        this.indexIsFrozen = false;
        // New FPakInfo fields
        this.encryptionKeyGuid = new Guid_1.FGuid(Ar); // PakFile_Version_EncryptionKeyGuid
        this.encryptedIndex = !!Ar.readUInt8(); // Do not replace by readFlag
        // Old FPakInfoFields
        this.magic = Ar.readUInt32();
        if (this.magic !== FPakInfo.PAK_MAGIC)
            return; // since the pak magic is not valid, return
        this.version = Ar.readInt32();
        this.indexOffset = Number(Ar.readInt64());
        this.indexSize = Number(Ar.readInt64());
        this.indexHash = Ar.readBuffer(20);
        if (this.version === PakVersion_1.EPakVersion.PakVersion_FrozenIndex) {
            const bIndexIsFrozen = Ar.readFlag();
            // used just for 4.25, so don't do any support unless it's really needed
            if (bIndexIsFrozen)
                throw new Exceptions_1.ParserException("Pak index is frozen", Ar);
        }
        if (this.version < PakVersion_1.EPakVersion.PakVersion_FNameBasedCompressionMethod) {
            this.compressionMethods = [
                "None",
                "Zlib",
                "Gzip",
                "Oodle",
                "LZ4" // TODO add support
            ];
        }
        else {
            const maxNumCompressionMethods = getMaxNumCompressionMethods(offsetToTry);
            this.compressionMethods = ["None"];
            if (this.version >= PakVersion_1.EPakVersion.PakVersion_FNameBasedCompressionMethod) {
                for (let i = 0; i < maxNumCompressionMethods; ++i) {
                    const d = Ar.readBuffer(32);
                    const str = Buffer.from(Utils_1.Utils.takeWhile(d, (it) => it !== 0)).toString("utf8");
                    if (str === "")
                        return;
                    this.compressionMethods.push(str);
                }
            }
        }
    }
    /**
     * Reads pak info
     * @param {FArchive} Ar UE4 Reader to use
     * @returns {FPakInfo} Instance
     * @public
     */
    static readPakInfo(Ar) {
        const path = Ar instanceof FFileArchive_1.FFileArchive ? Ar.path : "UNKNOWN";
        const size = Ar.size;
        const maxOffset = OffsetsToTry.sizeMax;
        if (size < maxOffset)
            throw new Exceptions_1.ParserException(`File '${path}' is too small to be a pak file`, Ar);
        Ar.pos = size - maxOffset;
        const buffer = Ar.readBuffer(maxOffset);
        const reader = new FByteArchive_1.FByteArchive(buffer);
        for (const offset of this._offsetsToTry) {
            reader.pos = reader.size - offset;
            const info = new FPakInfo(reader, offset);
            if (info.magic === this.PAK_MAGIC)
                return info;
        }
        throw new Exceptions_1.ParserException(`File '${path}' has an unknown format`, Ar);
    }
}
exports.FPakInfo = FPakInfo;
/**
 * PAK_MAGIC
 * @type {number}
 * @public
 * @static
 */
FPakInfo.PAK_MAGIC = 0x5A6F12E1;
/**
 * Offsets to try
 * @type {Array<OffsetsToTry>}
 * @private
 */
FPakInfo._offsetsToTry = [
    OffsetsToTry.size8a,
    OffsetsToTry.size8,
    OffsetsToTry.size,
    OffsetsToTry.size9,
    OffsetsToTry.size8_1,
    OffsetsToTry.size8_2,
    OffsetsToTry.size8_3
];
