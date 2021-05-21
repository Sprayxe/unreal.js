import { FPakCompressedBlock } from "./FPakCompressedBlock";
import { FPakInfo } from "./FPakInfo";
import { FByteArchive } from "../../reader/FByteArchive";
import { Utils } from "../../../util/Utils";
import { Aes } from "../../../encryption/aes/Aes";
import { FArchive } from "../../reader/FArchive";
import { EPakVersion } from "../enums/PakVersion";

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

    static decodePakEntry(Ar: FByteArchive, pakInfo: FPakInfo): FPakEntry {
        // Grab the big bitfield value:
        // Bit 31 = Offset 32-bit safe?
        // Bit 30 = Uncompressed size 32-bit safe?
        // Bit 29 = Size 32-bit safe?
        // Bits 28-23 = Compression method
        // Bit 22 = Encrypted
        // Bits 21-6 = Compression blocks count
        // Bits 5-0 = Compression block size

        let compressionMethodIndex: number = null
        let compressionBlockSize: number = null
        let offset: number = null
        let uncompressedSize: number = null
        let size: number = null
        let encrypted: boolean = null
        let compressionBlocks: FPakCompressedBlock[] = null

        const value = Ar.readUInt32()

        // Filter out the CompressionMethod.
        compressionMethodIndex = (value >> 23) & 0x3f

        // Test for 32-bit safe values. Grab it, or memcpy the 64-bit value
        // to avoid alignment exceptions on platforms requiring 64-bit alignment
        // for 64-bit variables.
        //

        // Read the Offset.
        const isOffset32BitSafe = (value & (1 << 31)) !== 0
        offset = isOffset32BitSafe ?
            Ar.readUInt32() :
            Ar.readInt64() as unknown as number

        // Read the UncompressedSize.
        const isUncompressedSize32BitSafe = (value & (1 << 30)) !== 0
        uncompressedSize = isUncompressedSize32BitSafe ?
            Ar.readUInt32() :
            Ar.readInt64() as unknown as number

        // Fill in the Size.
        if (compressionMethodIndex !== 0) {
            // Size is only present if compression is applied.
            const isSize32BitSafe = (value & (1 << 29)) !== 0
            if (isSize32BitSafe) {
                size = Ar.readUInt32()
            } else {
                size = Ar.readInt64() as unknown as number
            }
        } else {
            // The Size is the same thing as the UncompressedSize when
            // CompressionMethod == COMPRESS_None.
            size = uncompressedSize
        }

        // Filter the encrypted flag.
        encrypted = (value & (1 << 22)) !== 0

        // This should clear out any excess CompressionBlocks that may be valid in the user's
        // passed in entry.
        const compressionBlocksCount = (value >> 6) & 0xffff

        compressionBlocks = Utils.getArray(compressionBlocksCount, () => [0, 0], FPakCompressedBlock)

        // Filter the compression block size or use the UncompressedSize if less that 64k.
        compressionBlockSize = 0
        if (compressionBlocksCount > 0) {
            compressionBlockSize = uncompressedSize < 65536 ? uncompressedSize : ((value & 0x3f) << 11)
        }

        // Set bDeleteRecord to false, because it obviously isn't deleted if we are here.
        //deleted = false Not needed

        // Base offset to the compressed data
        const baseOffset = pakInfo.version >= EPakVersion.PakVersion_RelativeChunkOffsets ? 0 : offset

        // Handle building of the CompressionBlocks array.
        if (compressionBlocks.length === 1 && !encrypted) {
            // If the number of CompressionBlocks is 1, we didn't store any extra information.
            // Derive what we can from the entry's file offset and size.
            const compressedBlock = compressionBlocks[0]
            compressedBlock.compressedStart = baseOffset + FPakEntry.getSerializedSize(pakInfo.version, compressionMethodIndex, compressionBlocksCount)
            compressedBlock.compressedEnd = compressedBlock.compressedStart + size
        } else if (compressionBlocks.length) {
            // Get the right pointer to start copying the CompressionBlocks information from.

            // Alignment of the compressed blocks
            const compressedBlockAlignment = encrypted ? Aes.BLOCK_SIZE : 1

            // CompressedBlockOffset is the starting offset. Everything else can be derived from there.
            let compressedBlockOffset = baseOffset + FPakEntry.getSerializedSize(pakInfo.version, compressionMethodIndex, compressionBlocksCount)
            for (const compressedBlock of compressionBlocks) {
                compressedBlock.compressedStart = compressedBlockOffset
                compressedBlock.compressedEnd = compressedBlockOffset + Ar.readUInt32()
                const align = compressedBlock.compressedEnd - compressedBlock.compressedStart
                compressedBlockOffset += align + compressedBlockAlignment - (align % compressedBlockAlignment)
            }
        }

        //TODO There is some kind of issue here, compression blocks are sometimes going to far by one byte
        compressionBlocks.forEach((it) => {
            it.compressedStart = it.compressedStart + offset
            it.compressedEnd = it.compressedEnd + offset
        })

        const entry = new FPakEntry()
        entry.pos = offset
        entry.size = size
        entry.uncompressedSize = uncompressedSize
        entry.compressionMethod = pakInfo.compressionMethods[compressionMethodIndex]
        entry.compressionBlocks = compressionBlocks
        entry.isEncrypted = encrypted
        entry.compressionBlockSize = compressionBlockSize
        return entry
    }

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
            this.compressionMethod = pakInfo.compressionMethods[Ar.readInt32()] || "Unknown"
        } else {
            this.compressionMethod = ["None", "Zlib", "Gzip", "Custom", "Oodle"][Ar.readInt32()] || "Unknown"
        }
        if (pakInfo.version < EPakVersion.PakVersion_NoTimestamps)
            Ar.pos += 8
        Ar.pos += 20 // hash

        this.compressionBlocks = []
        if (pakInfo.version >= EPakVersion.PakVersion_CompressionEncryption) {
            if (this.compressionMethod !== "None")
                this.compressionBlocks = Ar.readArray(() => new FPakCompressedBlock())
            this.isEncrypted = Ar.readFlag()
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