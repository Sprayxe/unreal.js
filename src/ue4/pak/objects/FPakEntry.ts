import { FPakCompressedBlock } from "./FPakCompressedBlock";
import { FPakInfo } from "./FPakInfo";
import { FByteArchive } from "../../reader/FByteArchive";
import { Utils } from "../../../util/Utils";
import { Aes } from "../../../encryption/aes/Aes";
import { FArchive } from "../../reader/FArchive";
import { EPakVersion } from "../enums/PakVersion";
import { UnrealArray } from "../../../util/UnrealArray";
import { Game } from "../../versions/Game";

export class FPakEntry {
    name: string
    pos: number
    size: number
    uncompressedSize: number
    compressionMethod: string
    //hash: Buffer
    compressionBlocks: FPakCompressedBlock[]
    isEncrypted: boolean
    compressionBlockSize: number

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

    constructor(Ar?: FArchive, pakInfo?: FPakInfo, inIndex?: boolean) {
        if (!Ar) return
        this.name = inIndex ? Ar.readString() : ""
        this.pos = Number(Ar.readInt64())
        this.size = Number(Ar.readInt64())
        this.uncompressedSize = Number(Ar.readInt64())
        if (pakInfo.version >= EPakVersion.PakVersion_FNameBasedCompressionMethod) {
            this.compressionMethod = pakInfo.compressionMethods[Ar.readInt32()] || Ar.game === Game.GAME_VALORANT ? "None" : "Unknown"
        } else {
            this.compressionMethod = ["None", "Unknown", "Unknown", "Unknown", "Oodle"][Ar.readInt32()] || Ar.game === Game.GAME_VALORANT ? "None" : "Unknown"
        }
        if (pakInfo.version < EPakVersion.PakVersion_NoTimestamps)
            Ar.pos += 8
        Ar.pos += 20 // hash

        this.compressionBlocks = []
        if (pakInfo.version >= EPakVersion.PakVersion_CompressionEncryption) {
            if (this.compressionMethod !== "None")
                this.compressionBlocks = Ar.readArray(() => new FPakCompressedBlock(0, 0))
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
            this.compressionBlocks.forEach((it) => {
                it.compressedStart += this.pos
                it.compressedEnd += this.pos
            })
        }
    }
}