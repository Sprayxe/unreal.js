import { ParserException } from "../../../exceptions/Exceptions";
import { FByteArchive } from "../../reader/FByteArchive";
import { FArchive } from "../../reader/FArchive";
import { FGuid } from "../../objects/core/misc/Guid";
import { FFileArchive } from "../../reader/FFileArchive";
import { EPakVersion } from "../enums/PakVersion";
import { Utils } from "../../../util/Utils";

// source 'https://github.com/FabianFG/CUE4Parse/blob/master/CUE4Parse/UE4/Pak/Objects/FPakInfo.cs'

/**
 * OffsetsToTry
 * @enum
 */
enum OffsetsToTry {
    size = /*sizeof(int)*/ 4 * 2 + /*sizeof(long)*/ 8 * 2 + 20 + /* new fields */ 1 + 16, // sizeof(FGuid)
    // Just to be sure
    size8_1 = size + 32,
    size8_2 = size8_1 + 32,
    size8_3 = size8_2 + 32,
    size8 = size8_3 + 32, // added size of CompressionMethods as char[32]
    size8a = size8 + 32, // UE4.23 - also has version 8 (like 4.22) but different pak file structure
    size9 = size8a + 1, // UE4.25

    //Size10 = Size8a

    sizeLast,
    sizeMax = sizeLast - 1
}

/**
 * Gets max amount of compression methods by offset
 * @param {OffsetsToTry} offset
 * @returns {number} Max amount of compression methods
 */
function getMaxNumCompressionMethods(offset: OffsetsToTry) {
    if (offset === OffsetsToTry.size8a)
        return 5
    if (offset === OffsetsToTry.size8)
        return 4
    if (offset === OffsetsToTry.size8_1)
        return 1
    if (offset === OffsetsToTry.size8_2)
        return 2
    if (offset === OffsetsToTry.size8_3)
        return 3
    return 4
}

/**
 * FPakInfo
 */
export class FPakInfo {
    /**
     * PAK_MAGIC
     * @type {number}
     * @public
     * @static
     */
    public static readonly PAK_MAGIC = 0x5A6F12E1

    /**
     * Offsets to try
     * @type {Array<OffsetsToTry>}
     * @private
     */
    private static readonly _offsetsToTry: OffsetsToTry[] = [
        OffsetsToTry.size8a,
        OffsetsToTry.size8,
        OffsetsToTry.size,
        OffsetsToTry.size9,

        OffsetsToTry.size8_1,
        OffsetsToTry.size8_2,
        OffsetsToTry.size8_3
    ]

    /**
     * Reads pak info
     * @param {FArchive} Ar UE4 Reader to use
     * @returns {FPakInfo} Instance
     * @public
     */
    static readPakInfo(Ar: FArchive) {
        const path = Ar instanceof FFileArchive ? Ar.path : "UNKNOWN"
        const size = Ar.size
        const maxOffset = OffsetsToTry.sizeMax
        if (size < maxOffset)
            throw new ParserException(`File '${path}' is too small to be a pak file`, Ar)

        Ar.pos = size - maxOffset
        const buffer = Ar.readBuffer(maxOffset)
        const reader = new FByteArchive(buffer)

        for (const offset of this._offsetsToTry) {
            reader.pos = reader.size - offset
            const info = new FPakInfo(reader, offset)
            if (info.magic === this.PAK_MAGIC)
                return info
        }

        throw new ParserException(`File '${path}' has an unknown format`, Ar)
    }

    /**
     * magic
     * @type {number}
     * @public
     */
    magic: number

    /**
     * encryptionKeyGuid
     * @type {FGuid}
     * @public
     */
    encryptionKeyGuid: FGuid

    /**
     * encryptedIndex
     * @type {boolean}
     * @public
     */
    encryptedIndex: boolean

    /**
     * version
     * @type {EPakVersion}
     * @public
     */
    version: EPakVersion

    /**
     * indexOffset
     * @type {number}
     * @public
     */
    indexOffset: number

    /**
     * indexSize
     * @type {number}
     * @public
     */
    indexSize: number

    /**
     * indexHash
     * @type {Buffer}
     * @public
     */
    indexHash: Buffer

    /**
     * compressionMethods
     * @type {Array<string>}
     * @public
     */
    compressionMethods: string[]

    /**
     * indexIsFrozen
     * @type {boolean}
     * @public
     */
    indexIsFrozen: boolean = false

    /**
     * Creates an instance using values
     * @param {FArchive} Ar UE4 Reader to use
     * @param {OffsetsToTry} offsetToTry Offset to try
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, offsetToTry: OffsetsToTry) {
        // New FPakInfo fields
        this.encryptionKeyGuid = new FGuid(Ar) // PakFile_Version_EncryptionKeyGuid
        this.encryptedIndex = !!Ar.readUInt8() // Do not replace by readFlag

        // Old FPakInfoFields
        this.magic = Ar.readUInt32()
        if (this.magic !== FPakInfo.PAK_MAGIC)
            return // since the pak magic is not valid, return

        this.version = Ar.readInt32()
        this.indexOffset = Number(Ar.readInt64())
        this.indexSize = Number(Ar.readInt64())
        this.indexHash = Ar.readBuffer(20)

        if (this.version === EPakVersion.PakVersion_FrozenIndex) {
            const bIndexIsFrozen = Ar.readFlag()
            // used just for 4.25, so don't do any support unless it's really needed
            if (bIndexIsFrozen)
                throw new ParserException("Pak index is frozen", Ar)
        }

        if (this.version < EPakVersion.PakVersion_FNameBasedCompressionMethod) {
            this.compressionMethods = [
                "None",
                "Zlib",
                "Gzip",
                "Oodle",
                "LZ4" // TODO add support
            ]
        } else {
            const maxNumCompressionMethods = getMaxNumCompressionMethods(offsetToTry)
            this.compressionMethods = ["None"]
            if (this.version >= EPakVersion.PakVersion_FNameBasedCompressionMethod) {
                for (let i = 0; i < maxNumCompressionMethods; ++i) {
                    const d = Ar.readBuffer(32)
                    const str = Buffer.from(Utils.takeWhile(d, (it) => it !== 0)).toString("utf8")
                    if (str === "")
                        return
                    this.compressionMethods.push(str)
                }
            }
        }
    }
}