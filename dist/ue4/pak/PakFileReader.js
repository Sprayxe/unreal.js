"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PakFileReader = void 0;
const FPakInfo_1 = require("./objects/FPakInfo");
const Aes_1 = require("../../encryption/aes/Aes");
const GameFile_1 = require("./GameFile");
const Exceptions_1 = require("../../exceptions/Exceptions");
const FByteArchive_1 = require("../reader/FByteArchive");
const FPakEntry_1 = require("./objects/FPakEntry");
const sprintf_js_1 = require("sprintf-js");
const FFileArchive_1 = require("../reader/FFileArchive");
const Utils_1 = require("../../util/Utils");
const Compression_1 = require("../../compression/Compression");
const PakVersion_1 = require("./enums/PakVersion");
const Game_1 = require("../versions/Game");
const FPakCompressedBlock_1 = require("./objects/FPakCompressedBlock");
const UnrealArray_1 = require("../../util/UnrealArray");
const collection_1 = __importDefault(require("@discordjs/collection"));
/**
 * UE4 Pak File Reader
 */
class PakFileReader {
    /**
     * Creates an instance
     * @param {string} path Path to file
     * @param {?number} game Game that is used
     * @constructor
     * @public
     */
    constructor(path, game) {
        /**
         * Aes key for pak
         * @type {?Buffer}
         * @public
         */
        this.aesKey = null;
        /**
         * Amount of encrypted files
         * @type {number}
         * @public
         */
        this.encryptedFileCount = 0;
        this.path = path;
        this.Ar = new FFileArchive_1.FFileArchive(path);
        this.Ar.game = this.game = game || Game_1.Game.GAME_UE4(Game_1.Game.LATEST_SUPPORTED_UE4_VERSION);
        this.Ar.ver = Game_1.Game.GAME_UE4_GET_AR_VER(this.game);
        this.pakInfo = FPakInfo_1.FPakInfo.readPakInfo(this.Ar);
    }
    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString() {
        return this.path;
    }
    /**
     * Whether if it is encrypted or not
     * @returns {boolean}
     * @public
     */
    isEncrypted() {
        return this.pakInfo.encryptedIndex;
    }
    /**
     * Extracts a file
     * @param {GameFile} gameFile File to extract
     * @returns {Buffer}
     * @public
     */
    extract(gameFile) {
        if (gameFile.pakFileName !== this.path)
            throw new Error(`Wrong pak file reader, required ${gameFile.pakFileName}, this is ${this.path}`);
        // If this reader is used as a concurrent reader create a clone of the main reader to
        // provide thread safety
        const exAr = this.Ar;
        exAr.pos = gameFile.pos;
        // Pak Entry is written before the file data,
        // but its the same as the one from the index, just without a name
        const tempEntry = new FPakEntry_1.FPakEntry(exAr, this.pakInfo, false);
        for (const it of tempEntry.compressionBlocks) {
            it.compressedStart += gameFile.pos;
            it.compressedEnd += gameFile.pos;
        }
        if (gameFile.isCompressed()) {
            console.debug(`${gameFile.getName()} is compressed with ${gameFile.compressionMethod}`);
            const uncompressedBuffer = Buffer.alloc(gameFile.uncompressedSize);
            let uncompressedBufferOff = 0;
            for (const block of tempEntry.compressionBlocks) {
                exAr.pos = block.compressedStart;
                let srcSize = block.compressedEnd - block.compressedStart;
                // Read the compressed block
                let compressedBuffer;
                if (gameFile.isEncrypted) {
                    // The compressed block is encrypted, align it and then decrypt
                    if (!this.aesKey) {
                        throw new Exceptions_1.ParserException("Decrypting a encrypted file requires an encryption key to be set");
                    }
                    srcSize = Utils_1.Utils.align(srcSize, Aes_1.Aes.BLOCK_SIZE);
                    const buf = exAr.readBuffer(srcSize);
                    compressedBuffer = Aes_1.Aes.decrypt(buf, this.aesKey);
                }
                else {
                    // Read the block data
                    compressedBuffer = exAr.readBuffer(srcSize);
                }
                // Calculate the uncompressed size,
                // its either just the compression block size
                // or if its the last block its the remaining data size
                const uncompressedSize = Math.min(gameFile.compressionBlockSize, gameFile.uncompressedSize - uncompressedBufferOff);
                Compression_1.Compression.uncompress(gameFile.compressionMethod, uncompressedBuffer, uncompressedBufferOff, uncompressedSize, compressedBuffer, 0, srcSize);
                uncompressedBufferOff += gameFile.compressionBlockSize;
            }
            return uncompressedBuffer;
        }
        else if (gameFile.isEncrypted) {
            console.debug(`${gameFile.getName()} is encrypted, decrypting`);
            if (this.aesKey) {
                throw new Exceptions_1.ParserException("Decrypting a encrypted file requires an encryption key to be set");
            }
            // AES is block encryption, all encrypted blocks need to be 16 bytes long,
            // fix the game file length by growing it to the next multiple of 16 bytes
            const newLength = Utils_1.Utils.align(gameFile.size, Aes_1.Aes.BLOCK_SIZE);
            const buffer = Aes_1.Aes.decrypt(exAr.readBuffer(newLength), this.aesKey);
            return buffer.subarray(0, gameFile.size);
        }
        else {
            return exAr.readBuffer(gameFile.size);
        }
    }
    /**
     * Reads index of pak
     * @returns {Map<string, GameFile>} Files
     * @public
     */
    readIndex() {
        this.encryptedFileCount = 0;
        this.Ar.pos = this.pakInfo.indexOffset;
        const indexAr = new FByteArchive_1.FByteArchive(this.readAndDecrypt(this.pakInfo.indexSize));
        let mountPoint;
        try {
            mountPoint = indexAr.readString();
        }
        catch (e) {
            throw new Exceptions_1.InvalidAesKeyException(`Given encryption key '0x${this.aesKey.toString("hex")}' is not working with '${this.path}'`);
        }
        this.mountPoint = this.fixMountPoint(mountPoint);
        const files = this.pakInfo.version >= PakVersion_1.EPakVersion.PakVersion_PathHashIndex ? this.readIndexUpdated(indexAr) : this.readIndexLegacy(indexAr);
        // Print statistics
        let stats = sprintf_js_1.sprintf("Pak \"%s\": %d files", this.path, this.files.size);
        if (this.encryptedFileCount)
            stats += sprintf_js_1.sprintf(" (%d encrypted)", this.encryptedFileCount);
        if (this.mountPoint.includes("/"))
            stats += sprintf_js_1.sprintf(", mount point: \"%s\"", this.mountPoint);
        console.info(stats + ", version %d", this.pakInfo.version);
        return files;
    }
    /**
     * Reads index of old pak
     * @returns {Map<string, GameFile>} Files
     * @public
     */
    readIndexLegacy(indexAr) {
        const fileCount = indexAr.readInt32();
        const tempMap = new Map();
        for (let i = 0; i < fileCount; i++) {
            const entry = new FPakEntry_1.FPakEntry(indexAr, this.pakInfo, true);
            const gameFile = new GameFile_1.GameFile(entry, this.mountPoint, this.path);
            if (gameFile.isEncrypted)
                this.encryptedFileCount++;
            tempMap.set(gameFile.path.toLowerCase(), gameFile);
        }
        const files = new collection_1.default();
        tempMap.forEach((it, k) => {
            if (it.isUE4Package()) {
                const uexp = tempMap.get(PakFileReader.extension(k, ".uexp"));
                if (uexp != null)
                    it.uexp = uexp;
                const ubulk = tempMap.get(PakFileReader.extension(k, ".ubulk"));
                if (ubulk != null)
                    it.uexp = ubulk;
                files.set(k, it);
            }
            else {
                if (!it.path.endsWith(".uexp") && !it.path.endsWith(".ubulk"))
                    files.set(k, it);
            }
        });
        return this.files = files;
    }
    /**
     * Reads index of new pak
     * @returns {Map<string, GameFile>} Files
     * @public
     */
    readIndexUpdated(primaryIndexAr) {
        const fileCount = primaryIndexAr.readInt32();
        primaryIndexAr.pos += 8; // PathHashSeed
        if (!primaryIndexAr.readBoolean())
            throw new Exceptions_1.ParserException("No path hash index", primaryIndexAr);
        primaryIndexAr.pos += 36; // PathHashIndexOffset (long) + PathHashIndexSize (long) + PathHashIndexHash (20 bytes)
        if (!primaryIndexAr.readBoolean())
            throw new Exceptions_1.ParserException("No directory index", primaryIndexAr);
        const directoryIndexOffset = Number(primaryIndexAr.readInt64());
        const directoryIndexSize = Number(primaryIndexAr.readInt64());
        primaryIndexAr.pos += 20; // Directory Index hash
        const encodedPakEntriesSize = primaryIndexAr.readInt32();
        const encodedPakEntries = primaryIndexAr.readBuffer(encodedPakEntriesSize);
        const encodedPakEntriesAr = new FByteArchive_1.FByteArchive(encodedPakEntries);
        if (primaryIndexAr.readInt32() < 0)
            throw new Exceptions_1.ParserException("Corrupt pak PrimaryIndex detected!", primaryIndexAr);
        this.Ar.pos = directoryIndexOffset;
        const directoryIndexAr = new FByteArchive_1.FByteArchive(this.readAndDecrypt(directoryIndexSize));
        const directoryIndexNum = directoryIndexAr.readInt32();
        const tempMap = new Map();
        for (let i = 0; i < directoryIndexNum; i++) {
            const directory = directoryIndexAr.readString();
            const filesNum = directoryIndexAr.readInt32();
            for (let j = 0; j < filesNum; j++) {
                const file = directoryIndexAr.readString();
                const path = directory + file;
                encodedPakEntriesAr.pos = directoryIndexAr.readInt32();
                const entry = this.readBitEntry(encodedPakEntriesAr);
                entry.name = path;
                if (entry.isEncrypted)
                    this.encryptedFileCount++;
                tempMap.set(path.toLowerCase(), new GameFile_1.GameFile(entry, this.mountPoint, this.path));
            }
        }
        const files = new collection_1.default();
        tempMap.forEach((it, k) => {
            if (it.isUE4Package()) {
                const uexp = tempMap.get(PakFileReader.extension(k, ".uexp"));
                if (uexp != null)
                    it.uexp = uexp;
                const ubulk = tempMap.get(PakFileReader.extension(k, ".ubulk"));
                if (ubulk != null)
                    it.uexp = ubulk;
                files.set(k, it);
            }
            else {
                if (!it.path.endsWith(".uexp") && !it.path.endsWith(".ubulk"))
                    files.set(k, it);
            }
        });
        return this.files = files;
    }
    /**
     * Reads bit entry
     * @param {FByteArchive} Ar Reader to use
     * @returns {FPakEntry} Entry
     * @private
     */
    readBitEntry(Ar) {
        // Grab the big bitfield value:
        // Bit 31 = Offset 32-bit safe?
        // Bit 30 = Uncompressed size 32-bit safe?
        // Bit 29 = Size 32-bit safe?
        // Bits 28-23 = Compression method
        // Bit 22 = Encrypted
        // Bits 21-6 = Compression blocks count
        // Bits 5-0 = Compression block size
        let compressionMethodIndex = null;
        let compressionBlockSize = null;
        let offset = null;
        let uncompressedSize = null;
        let size = null;
        let encrypted = null;
        let compressionBlocks = null;
        const value = Ar.readUInt32();
        // Filter out the CompressionMethod.
        compressionMethodIndex = (value >> 23) & 0x3f;
        // Test for 32-bit safe values. Grab it, or memcpy the 64-bit value
        // to avoid alignment exceptions on platforms requiring 64-bit alignment
        // for 64-bit variables.
        //
        // Read the Offset.
        const isOffset32BitSafe = (value & (1 << 31)) !== 0;
        offset = isOffset32BitSafe ?
            Ar.readUInt32() :
            Number(Ar.readInt64());
        // Read the UncompressedSize.
        const isUncompressedSize32BitSafe = (value & (1 << 30)) !== 0;
        uncompressedSize = isUncompressedSize32BitSafe ?
            Ar.readUInt32() :
            Number(Ar.readInt64());
        // Fill in the Size.
        if (compressionMethodIndex !== 0) {
            // Size is only present if compression is applied.
            const isSize32BitSafe = (value & (1 << 29)) !== 0;
            if (isSize32BitSafe) {
                size = Ar.readUInt32();
            }
            else {
                size = Number(Ar.readInt64());
            }
        }
        else {
            // The Size is the same thing as the UncompressedSize when
            // CompressionMethod == COMPRESS_None.
            size = uncompressedSize;
        }
        // Filter the encrypted flag.
        encrypted = (value & (1 << 22)) !== 0;
        // This should clear out any excess CompressionBlocks that may be valid in the user's
        // passed in entry.
        const compressionBlocksCount = (value >> 6) & 0xffff;
        compressionBlocks = new UnrealArray_1.UnrealArray(compressionBlocksCount, () => new FPakCompressedBlock_1.FPakCompressedBlock(0, 0));
        // Filter the compression block size or use the UncompressedSize if less that 64k.
        compressionBlockSize = 0;
        if (compressionBlocksCount > 0) {
            compressionBlockSize = uncompressedSize < 65536 ? uncompressedSize : ((value & 0x3f) << 11);
        }
        // Set bDeleteRecord to false, because it obviously isn't deleted if we are here.
        //deleted = false Not needed
        // Base offset to the compressed data
        const baseOffset = this.pakInfo.version >= PakVersion_1.EPakVersion.PakVersion_RelativeChunkOffsets ? 0 : offset;
        // Handle building of the CompressionBlocks array.
        if (compressionBlocks.length === 1 && !encrypted) {
            // If the number of CompressionBlocks is 1, we didn't store any extra information.
            // Derive what we can from the entry's file offset and size.
            const compressedBlock = compressionBlocks[0];
            compressedBlock.compressedStart = baseOffset + FPakEntry_1.FPakEntry.getSerializedSize(this.pakInfo.version, compressionMethodIndex, compressionBlocksCount);
            compressedBlock.compressedEnd = compressedBlock.compressedStart + size;
        }
        else if (compressionBlocks.length) {
            // Get the right pointer to start copying the CompressionBlocks information from.
            // Alignment of the compressed blocks
            const compressedBlockAlignment = encrypted ? Aes_1.Aes.BLOCK_SIZE : 1;
            // CompressedBlockOffset is the starting offset. Everything else can be derived from there.
            let compressedBlockOffset = baseOffset + FPakEntry_1.FPakEntry.getSerializedSize(this.pakInfo.version, compressionMethodIndex, compressionBlocksCount);
            for (const compressedBlock of compressionBlocks) {
                compressedBlock.compressedStart = compressedBlockOffset;
                compressedBlock.compressedEnd = compressedBlockOffset + Ar.readUInt32();
                const align = compressedBlock.compressedEnd - compressedBlock.compressedStart;
                compressedBlockOffset += align + compressedBlockAlignment - (align % compressedBlockAlignment);
            }
        }
        //TODO There is some kind of issue here, compression blocks are sometimes going to far by one byte
        compressionBlocks.forEach((it) => {
            it.compressedStart = it.compressedStart + offset;
            it.compressedEnd = it.compressedEnd + offset;
        });
        const entry = new FPakEntry_1.FPakEntry();
        entry.pos = offset;
        entry.size = size;
        entry.uncompressedSize = uncompressedSize;
        entry.compressionMethod = this.pakInfo.compressionMethods[compressionMethodIndex];
        entry.compressionBlocks = compressionBlocks;
        entry.isEncrypted = encrypted;
        entry.compressionBlockSize = compressionBlockSize;
        return entry;
    }
    /**
     * Replaces a file extension
     * @param {string} k Source
     * @param {string} v Replacement
     * @returns {string}
     * @private
     * @static
     */
    static extension(k, v) {
        return k.endsWith(".uasset")
            ? k.replace(".uasset", v)
            : k.replace(".umap", v);
    }
    /**
     * Reads and decrypts data
     * @param {number} num Amount of bytes to read
     * @param {boolean} isEncrypted Whether if those are encrypted
     * @returns {Buffer} Bytes
     * @private
     */
    readAndDecrypt(num, isEncrypted = this.isEncrypted()) {
        let data = this.Ar.readBuffer(num);
        if (isEncrypted) {
            const key = this.aesKey;
            if (!key)
                throw new Exceptions_1.ParserException("Reading this pak requires an encryption key");
            data = Aes_1.Aes.decrypt(data, key);
        }
        return data;
    }
    /**
     * Fixes a mount point
     * @param {string} mountPoint Current mount point
     * @returns {string}
     * @private
     */
    fixMountPoint(mountPoint) {
        let badMountPoint = false;
        if (!mountPoint.startsWith("../../.."))
            badMountPoint = true;
        else
            mountPoint = mountPoint.replace("../../..", "");
        if (mountPoint[0] !== '/' || (mountPoint.length > 1 && mountPoint[1] === '.'))
            badMountPoint = true;
        if (badMountPoint) {
            //console.warn(`Pak \"${this.path}\" has strange mount point \"${mountPoint}\", mounting to root`)
            mountPoint = "/";
        }
        if (mountPoint.startsWith('/'))
            mountPoint = mountPoint.substring(1);
        return mountPoint;
    }
    /**
     * Checks index bytes
     * @returns {Buffer} Index bytes
     * @public
     */
    indexCheckBytes() {
        this.Ar.pos = this.pakInfo.indexOffset;
        return this.Ar.readBuffer(128);
    }
    /** DO NOT USE THIS METHOD, THIS IS FOR THE LIBRARY */
    testAesKey(x, y) {
        if (!y) {
            if (Buffer.isBuffer(x)) {
                if (!this.isEncrypted())
                    return true;
                return this.testAesKey(this.indexCheckBytes(), x);
            }
            else {
                return this.testAesKey(Buffer.from(x.startsWith("0x") ? x.substring(2) : x, "hex"));
            }
        }
        else {
            x = Aes_1.Aes.decrypt(x, y);
            return this.isValidIndex(x);
        }
    }
    /**
     * Whether if pak has valid index
     * @param {Buffer} bytes Bytes to read from
     * @returns {boolean} Result
     * @public
     */
    isValidIndex(bytes) {
        const testAr = new FByteArchive_1.FByteArchive(bytes);
        const stringLength = testAr.readUInt32();
        if (stringLength > 128 || stringLength < -128)
            return false;
        // Calculate the pos of the null terminator for this string
        // Then read the null terminator byte and check whether it is actually 0
        if (stringLength === 0) {
            return testAr.readInt8() === 0;
        }
        else if (stringLength < 0) {
            // UTF16
            testAr.pos = 4 - (stringLength - 1) * 2;
            return testAr.readInt16() === 0;
        }
        else {
            // UTF8
            testAr.pos = 4 + stringLength - 1;
            return testAr.readInt8() === 0;
        }
    }
}
exports.PakFileReader = PakFileReader;
