"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FByteBulkData = void 0;
const FByteBulkDataHeader_1 = require("./FByteBulkDataHeader");
const FAssetArchive_1 = require("../reader/FAssetArchive");
const EBulkDataFlags_1 = require("../enums/EBulkDataFlags");
const PayloadType_1 = require("../util/PayloadType");
const Exceptions_1 = require("../../../exceptions/Exceptions");
/**
 * FByteBulkData
 */
class FByteBulkData {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg1, arg2) {
        if (arg1 instanceof FAssetArchive_1.FAssetArchive) {
            this.header = new FByteBulkDataHeader_1.FByteBulkDataHeader(arg1);
            const bulkDataFlags = this.header.bulkDataFlags;
            this.data = Buffer.alloc(this.header.elementCount);
            if (this.header.elementCount === 0) {
                // Nothing to do here
            }
            else if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_Unused, bulkDataFlags)) {
                console.warn("Bulk with no data");
            }
            else if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_ForceInlinePayload, bulkDataFlags)) {
                console.debug(`bulk data in .uexp file (Force Inline Payload) (flags=${bulkDataFlags}, pos=${this.header.offsetInFile}, size=${this.header.sizeOnDisk})`);
                arg1.readToBuffer(this.data);
            }
            else if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_PayloadInSeperateFile, bulkDataFlags)) {
                console.debug(`bulk data in .ubulk file (Payload In Seperate File) (flags=${bulkDataFlags}, pos=${this.header.offsetInFile}, size=${this.header.sizeOnDisk})`);
                let payload;
                if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_OptionalPayload, bulkDataFlags))
                    payload = PayloadType_1.PayloadType.UPTNL;
                else if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_MemoryMappedPayload, bulkDataFlags))
                    payload = PayloadType_1.PayloadType.M_UBULK;
                else
                    payload = PayloadType_1.PayloadType.UBULK;
                const ubulkAr = arg1.getPayload(payload);
                if (ubulkAr.size > 0) {
                    ubulkAr.pos = this.header.offsetInFile;
                    ubulkAr.readToBuffer(this.data);
                }
                else { // bulk data file not found
                    this.data = Buffer.alloc(0);
                }
            }
            else if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_PayloadAtEndOfFile, bulkDataFlags)) {
                //stored in same file, but at different position
                //save archive position
                const savePos = arg1.pos;
                if (this.header.offsetInFile + this.header.elementCount <= arg1.size) {
                    arg1.pos = this.header.offsetInFile;
                    arg1.readToBuffer(this.data);
                }
                else {
                    throw new Exceptions_1.ParserException(`Failed to read PayloadAtEndOfFile, ${this.header.offsetInFile} is out of range`, arg1);
                }
                arg1.pos = savePos;
            }
        }
        else {
            this.header = arg1;
            this.data = arg2;
        }
    }
    /**
     * Whether bulk data is loaded
     * @type {boolean}
     * @public
     */
    get isBulkDataLoaded() {
        return this.data != null;
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar FAssetArchiveWriter to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        const bulkDataFlags = this.header.bulkDataFlags;
        if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_Unused, bulkDataFlags)) {
            this.header.serialize(Ar);
        }
        else if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_ForceInlinePayload, bulkDataFlags)) {
            this.header.offsetInFile = Ar.relativePos() + 28;
            this.header.elementCount = this.data.length;
            this.header.sizeOnDisk = this.data.length;
            this.header.serialize(Ar);
            Ar.write(this.data);
        }
        else if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_PayloadInSeperateFile, bulkDataFlags)) {
            const ubulkAr = Ar.getPayload(PayloadType_1.PayloadType.UBULK);
            this.header.offsetInFile = ubulkAr.relativePos();
            this.header.elementCount = this.data.length;
            this.header.sizeOnDisk = this.data.length;
            this.header.serialize(Ar);
            ubulkAr.write(this.data);
        }
        else if (EBulkDataFlags_1.EBulkDataFlags_Check(EBulkDataFlags_1.EBulkDataFlags.BULKDATA_OptionalPayload, bulkDataFlags)) {
            const ubulkAr = Ar.getPayload(PayloadType_1.PayloadType.UPTNL);
            this.header.offsetInFile = ubulkAr.relativePos();
            this.header.elementCount = this.data.length;
            this.header.sizeOnDisk = this.data.length;
            this.header.serialize(Ar);
            ubulkAr.write(this.data);
        }
        else {
            throw new Exceptions_1.ParserException(`Unsupported BulkData type ${bulkDataFlags}`, Ar);
        }
    }
}
exports.FByteBulkData = FByteBulkData;
