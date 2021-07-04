"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FByteBulkDataHeader = void 0;
const FAssetArchive_1 = require("../reader/FAssetArchive");
const EBulkDataFlags_1 = require("../enums/EBulkDataFlags");
const Versions_1 = require("../../versions/Versions");
class FByteBulkDataHeader {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        const arg = args[0];
        if (arg instanceof FAssetArchive_1.FAssetArchive) {
            this.bulkDataFlags = arg.readInt32();
            if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_Size64Bit, this.bulkDataFlags)) {
                this.elementCount = Number(arg.readInt64());
                this.sizeOnDisk = Number(arg.readInt64());
            }
            else {
                this.elementCount = arg.readInt32();
                this.sizeOnDisk = arg.readInt32();
            }
            this.offsetInFile = arg.ver >= Versions_1.VER_UE4_BULKDATA_AT_LARGE_OFFSETS ? Number(arg.readInt64()) : arg.readInt32();
            if (!EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_NoOffsetFixUp, this.bulkDataFlags)) {
                this.offsetInFile += arg.bulkDataStartOffset;
            }
            if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_BadDataVersion, this.bulkDataFlags)) {
                arg.pos += 2; // const dummyValue = Ar.readUInt16()
                this.bulkDataFlags &= ~EBulkDataFlags_1.EBulkDataFlags.BULKDATA_BadDataVersion;
            }
        }
        else {
            this.bulkDataFlags = arg;
            this.elementCount = args[1];
            this.sizeOnDisk = args[2];
            this.offsetInFile = args[3];
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar FArchiveWriter to use
     * @public
     */
    serialize(Ar) {
        Ar.writeInt32(this.bulkDataFlags);
        if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_Size64Bit, this.bulkDataFlags)) {
            Ar.writeInt64(this.elementCount);
            Ar.writeInt64(this.sizeOnDisk);
        }
        else {
            Ar.writeInt32(this.elementCount);
            Ar.writeInt32(this.sizeOnDisk);
        }
        Ar.writeInt64(this.offsetInFile);
    }
    /**
     * Converts this to json
     * @returns {object} json
     * @public
     */
    toJson() {
        const bulkDataFlag = Object.keys(EBulkDataFlags_1.EBulkDataFlags).find(e => EBulkDataFlags_1.EBulkDataFlags[e] === this.bulkDataFlags);
        return {
            bulkDataFlag: bulkDataFlag,
            elementCount: this.elementCount,
            sizeOnDisk: this.sizeOnDisk,
            offsetInFile: this.offsetInFile
        };
    }
}
exports.FByteBulkDataHeader = FByteBulkDataHeader;
