import { FPakCompressedBlock } from "./FPakCompressedBlock";
import { FPakInfo } from "./FPakInfo";
import { FArchive } from "../../reader/FArchive";
import { EPakVersion } from "../enums/PakVersion";
import { Game } from "../../versions/Game";

/**
 * FPakEntry
 */
export class FPakEntry {
    /**
     * name
     * @type {string}
     * @public
     */
    name: string

    /**
     * pos
     * @type {number}
     * @public
     */
    pos: number

    /**
     * size
     * @type {number}
     * @public
     */
    size: number

    /**
     * uncompressedSize
     * @type {number}
     * @public
     */
    uncompressedSize: number

    /**
     * compressionMethod
     * @type {string}
     * @public
     */
    compressionMethod: string

    //hash: Buffer

    /**
     * compressionBlocks
     * @type {Array<FPakCompressedBlock>}
     * @public
     */
    compressionBlocks: FPakCompressedBlock[]

    /**
     * isEncrypted
     * @type {boolean}
     * @public
     */
    isEncrypted: boolean

    /**
     * compressionBlockSize
     * @type {number}
     * @public
     */
    compressionBlockSize: number

    /**
     * Calculates serialized size from specified values
     * @param {?number} version Version to use
     * @param {?number} compressionMethod Compression method to use
     * @param {?number} compressionBlocksCount Compression block count to use
     * @returns {number} Calculated size
     * @public
     * @static
     */
    static getSerializedSize(version: number, compressionMethod: number = 0, compressionBlocksCount: number = 0): number {
        let serializedSize = /*this.pos*/ 8 + /*this.size*/ 8 + /*this.uncompressedSize*/ 8 + /*this.hash*/ 20
        serializedSize += 4

        if (version >= EPakVersion.PakVersion_CompressionEncryption) {
            serializedSize += /*this.isEncrypted*/ 1 + /*this.compressionBlockSize*/ 4
            if (compressionMethod !== 0) {
                serializedSize += /*FPakCompressedBlock*/ 8 * 2 * compressionBlocksCount + /*int32*/ 4
            }
        }
        if (version < EPakVersion.PakVersion_NoTimestamps) {
            serializedSize += /*timestamp*/ 8
        }

        return serializedSize
    }

    /**
     * Creates an instance using values
     * @param {?FArchive} Ar UE4 Reader to use
     * @param {?FPakInfo} pakInfo Pak info
     * @param {?boolean} inIndex Whether in index
     * @constructor
     * @public
     */
    constructor(Ar?: FArchive, pakInfo?: FPakInfo, inIndex?: boolean) {
        if (!Ar) return
        this.name = inIndex ? Ar.readString() : ""
        this.pos = Number(Ar.readInt64())
        this.size = Number(Ar.readInt64())
        this.uncompressedSize = Number(Ar.readInt64())
        if (pakInfo.version >= EPakVersion.PakVersion_FNameBasedCompressionMethod) {
            const int = Ar.readInt32()
            this.compressionMethod = pakInfo.compressionMethods[int] || (Ar.game === Game.GAME_VALORANT ? "None" : "Unknown")
        } else {
            this.compressionMethod = ["None", undefined, undefined, undefined, "Oodle"][Ar.readInt32()] || (Ar.game === Game.GAME_VALORANT ? "None" : "Unknown")
        }
        if (pakInfo.version < EPakVersion.PakVersion_NoTimestamps)
            Ar.pos += 8
        Ar.pos += 20 // hash

        this.compressionBlocks = []
        if (pakInfo.version >= EPakVersion.PakVersion_CompressionEncryption) {
            if (this.compressionMethod !== "None")
                this.compressionBlocks = Ar.readArray(() => new FPakCompressedBlock(Ar))
            this.isEncrypted = Ar.readFlag()
            //Looks like Valorant sets the encryption flag to false although inis are encrypted
            if (Ar.game === Game.GAME_VALORANT && this.name.endsWith(".ini"))
                this.isEncrypted = true
            //Note: This is not how it works in UE, default is Int8 but Fortnite uses Int32.
            // This project was originally intended to be used only with Fortnite, that's why it is twisted like that
            //compressionBlockSize = if (Ar.game == GAME_VALORANT)
            //    Ar.readInt8().toInt()
            //else
            // Ar.readInt32()
            this.compressionBlockSize = Ar.readInt32()
        }
        if (pakInfo.version >= EPakVersion.PakVersion_RelativeChunkOffsets) {
            for (const it of this.compressionBlocks) {
                it.compressedStart += this.pos
                it.compressedEnd += this.pos
            }
        }
    }
}