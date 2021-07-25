import { FByteBulkDataHeader } from "./FByteBulkDataHeader";
import { FAssetArchive } from "../reader/FAssetArchive";
import { EBulkDataFlags, EBulkDataFlags_Check } from "../enums/EBulkDataFlags";
import { PayloadType } from "../util/PayloadType";
import { ParserException } from "../../../exceptions/Exceptions";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { Config } from "../../../Config";

/**
 * FByteBulkData
 */
export class FByteBulkData {
    /**
     * Header of this FByteBulkData
     * @type {FByteBulkDataHeader}
     * @public
     */
    public header: FByteBulkDataHeader

    /**
     * Data of this FByteBulkData
     * @type {Buffer}
     * @public
     */
    public data: Buffer

    /**
     * Whether bulk data is loaded
     * @type {boolean}
     * @public
     */
    get isBulkDataLoaded() {
        return this.data != null
    }

    /**
     * Creates an instance using FAssetArchive
     * @param {FAssetArchive} Ar FAssetArchive to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive)

    /**
     * Creates an instance using FByteBulkDataHeader and Buffer
     * @param {FByteBulkDataHeader} header
     * @param {Buffer} data
     * @constructor
     * @public
     */
    constructor(header: FByteBulkDataHeader, data: Buffer)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg1: any, arg2?: any) {
        if (arg1 instanceof FAssetArchive) {
            this.header = new FByteBulkDataHeader(arg1)
            const bulkDataFlags = this.header.bulkDataFlags
            this.data = Buffer.alloc(this.header.elementCount)
            if (this.header.elementCount === 0) {
                // Nothing to do here
            } else if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_Unused, bulkDataFlags)) {
                if (Config.GDebug) console.warn("Bulk with no data")
            } else if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_ForceInlinePayload, bulkDataFlags)) {
                if (Config.GDebug) console.debug(`bulk data in .uexp file (Force Inline Payload) (flags=${bulkDataFlags}, pos=${this.header.offsetInFile}, size=${this.header.sizeOnDisk})`)
                arg1.readToBuffer(this.data)
            } else if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_PayloadInSeperateFile, bulkDataFlags)) {
                if (Config.GDebug) console.debug(`bulk data in .ubulk file (Payload In Seperate File) (flags=${bulkDataFlags}, pos=${this.header.offsetInFile}, size=${this.header.sizeOnDisk})`)
                let payload: PayloadType
                if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_OptionalPayload, bulkDataFlags))
                    payload = PayloadType.UPTNL
                else if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_MemoryMappedPayload, bulkDataFlags))
                    payload = PayloadType.M_UBULK
                else
                    payload = PayloadType.UBULK;
                const ubulkAr = arg1.getPayload(payload)
                if (ubulkAr.size > 0) {
                    ubulkAr.pos = this.header.offsetInFile
                    ubulkAr.readToBuffer(this.data)
                } else { // bulk data file not found
                    this.data = Buffer.alloc(0)
                }
            } else if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_PayloadAtEndOfFile, bulkDataFlags)) {
                //stored in same file, but at different position
                //save archive position
                const savePos = arg1.pos
                if (this.header.offsetInFile + this.header.elementCount <= arg1.size) {
                    arg1.pos = this.header.offsetInFile
                    arg1.readToBuffer(this.data)
                } else {
                    throw new ParserException(`Failed to read PayloadAtEndOfFile, ${this.header.offsetInFile} is out of range`, arg1)
                }
                arg1.pos = savePos
            }
        } else {
            this.header = arg1
            this.data = arg2
        }
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar FAssetArchiveWriter to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        const bulkDataFlags = this.header.bulkDataFlags
        if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_Unused, bulkDataFlags)) {
            this.header.serialize(Ar)
        } else if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_ForceInlinePayload, bulkDataFlags)) {
            this.header.offsetInFile = Ar.relativePos() + 28
            this.header.elementCount = this.data.length
            this.header.sizeOnDisk = this.data.length
            this.header.serialize(Ar)
            Ar.write(this.data)
        } else if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_PayloadInSeperateFile, bulkDataFlags)) {
            const ubulkAr = Ar.getPayload(PayloadType.UBULK)
            this.header.offsetInFile = ubulkAr.relativePos()
            this.header.elementCount = this.data.length
            this.header.sizeOnDisk = this.data.length
            this.header.serialize(Ar)
            ubulkAr.write(this.data)
        } else if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_OptionalPayload, bulkDataFlags)) {
            const ubulkAr = Ar.getPayload(PayloadType.UPTNL)
            this.header.offsetInFile = ubulkAr.relativePos()
            this.header.elementCount = this.data.length
            this.header.sizeOnDisk = this.data.length
            this.header.serialize(Ar)
            ubulkAr.write(this.data)
        } else {
            throw new ParserException(`Unsupported BulkData type ${bulkDataFlags}`, Ar)
        }
    }
}